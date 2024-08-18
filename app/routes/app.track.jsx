import { useFetcher, useLoaderData } from "@remix-run/react";
import { Box, Card, Layout, Page, BlockStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getStoredData, storeData } from "../data/packageData";

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState('');
  // const [trackingData, setTrackingData] = useState(null);
  const handleTrackPackage = async () => {
    try {
      const response = useLoaderData();
      console.log('Raw Response:', response);
      if (response.data && response.data.event === "TRACKING_UPDATED") {
        const data = response.data.data;

        const extractedData = {
          number: data.number,
          carrier: data.carrier,
          packagestatus: data.track_info.latest_status.status,
          current_location: data.track_info.latest_event.location,
          estimated_delivery_date: {
            from: data.track_info.time_metrics.estimated_delivery_date.from,
            to: data.track_info.time_metrics.estimated_delivery_date.to
          },
          service_type: data.track_info.misc_info.service_type,
          weight: data.track_info.misc_info.weight_raw,
          packageHistory: getPackageHistory(data.track_info.tracking.providers[0].events)
        };
        console.log('Extracted Data:', extractedData);
        setTrackingData(extractedData);
        setError(''); // Clear any previous errors

        // Fetch coordinates for the current location
      //   const coordinates = await geocodeAddress(extractedData.current_location);
      //   if (coordinates) {
      //     setCoordinates(coordinates);
      //   }
      // } else {
      //   throw new Error('Unexpected response format');
      // }
      } catch (error) {
        console.error('Error:', error);
        setError(`Error tracking package: ${error.message}`);
    }
    }
  }
};

const getPackageHistory = (events) => {
return events.map((event) => ({
  date: event.time_iso.split('T')[0],
  time: event.time_iso.split('T')[1].split('-')[0],
  description: event.description,
  location: event.location,
})).reverse();
};

  // const handleTrackPackage = () => {
  //   fetcher.submit({}, { method: "POST" });  // Trigger the action when "Track Package" is clicked
  // };

  return (
    <Page>
      <TitleBar title="Track Package" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <div className="search-section">
                <input
                  type="text"
                  className="tracking-input"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  disabled={isLoading}  // Disable the input while loading
                />
                <button onClick={handleTrackPackage} disabled={isLoading}>
                  {isLoading ? "Tracking..." : "Track Package"}
                </button>
              </div>
              {trackingData && (
                <div className="content">
                  <div className="tracking-info">
                    <h3>Tracking Information: </h3>
                    <p>Tracking Number: {trackingData.number} </p>
                    <p>Courier: {trackingData.carrier}</p>
                    <p>Package Status: {trackingData.packagestatus}</p>
                    <p>Current Package Location: {trackingData.current_location}</p>
                    <p>Service Type: {trackingData.service_type} </p>
                    <p>Package Weight: {trackingData.weight} </p>
                    <p>Estimated Delivery Date: { JSON.stringify(trackingData.estimated_delivery_date) }</p>
                  </div>
                  <div className="package-history">
                    <h3>Package History: </h3>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Location</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {trackingData.packageHistory.map((event, index) => (
                            <TableRow key={index}>
                              <TableCell>{event.date}</TableCell>
                              <TableCell>{event.time}</TableCell>
                              <TableCell>{event.description}</TableCell>
                              <TableCell>{event.location}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
             </div>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );


// function Code({ children }) {
//   return (
//     <Box
//       as="span"
//       padding="025"
//       paddingInlineStart="100"
//       paddingInlineEnd="100"
//       background="bg-surface-active"
//       borderWidth="025"
//       borderColor="border"
//       borderRadius="100"
//     >
//       <code>{children}</code>
//     </Box>
//   );
// }

export async function loader() {
  const packageData = getStoredData();
  return packageData;
}

export async function action({ request }) {
  // const url = "https://webhook.site/08105868-f5bc-4494-9fce-47ba85003b8d/request/latest/raw";
  
  const response = {
    date: new Date().toISOString(),
    ...request.body
  };
  // const fetchedData = await response.json();
  

  packageData.push(response);
  await storeData(packageData);

  return redirect('/track');
}
