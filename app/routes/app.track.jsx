import { Form, useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getStoredData } from "../data/packageData";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Table from "./Table";
import styles from "./trackUpdate.css?url";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = async () => {
  const extractedData = await getStoredData();

  if (extractedData.packageData.length > 0) {
    const firstPackage = extractedData.packageData[0];
    return json({ firstPackage });
  } else {
    console.error('No data found in packageData.');
  }
};

export async function action({ request }) {
  const formData = await request.formData();
  const value = Object.fromEntries(formData).trackingNumber;
  const extractedData = await getStoredData();
  const firstPackage = extractedData.packageData[0];

  if (firstPackage.data.number === value) {
    return json({ firstPackage });
  } else {
    console.error('Tracking number not found.');
    return json({ error: 'Tracking number not found.' });
  }
}

export default function handleTrackPackage() {
  const { firstPackage } = useLoaderData();
  const fetcher = useFetcher();

  const getPackageHistory = (events) => {
    return events.map((event) => ({
      date: event.time_iso.split('T')[0],
      time: event.time_iso.split('T')[1].split('-')[0],
      description: event.description,
      location: event.location,
    })).reverse();
  };

  const packageHistory = fetcher.data?.firstPackage
    ? getPackageHistory(fetcher.data.firstPackage.data.track_info.tracking.providers[0].events)
    : null;

  const header = [
    { children: "Date", key: "date" },
    { children: "Time", key: "time" },
    { children: "Description", key: "description" },
    { children: "Location", key: "location", className: "text-right" },
  ];

  const mapStyles = {        
    height: "400px",
    width: "100%"
  };

  const coordinates = firstPackage.data.track_info.latest_event.address.coordinates;
  const defaultCenter = coordinates && coordinates.latitude && coordinates.longitude
    ? {
        lat: coordinates.latitude,
        lng: coordinates.longitude
      }
    : {
        lat: 37.7749, // Default to San Francisco's coordinates if null
        lng: -122.4194
      };

  return (
    <div id="trackUpdate">
      <fetcher.Form method="post">
        <input type="text" name="trackingNumber" placeholder="Enter Tracking Number" /> {" "}
        <button type="submit">Search</button>
      </fetcher.Form>

      {fetcher.data?.firstPackage && (
        <div className="package-content">
          <div className="package-card">
            <h1>Package Updates</h1>
            <div>
              <h2>Tracking Number: {fetcher.data.firstPackage.data.number}</h2>
              <p>Carrier: {fetcher.data.firstPackage.data.carrier}</p>
              <p>Status: {fetcher.data.firstPackage.data.track_info.latest_status.status}</p>
              <p>Estimated Delivery Date: From { 
                fetcher.data.firstPackage.data.track_info.time_metrics.estimated_delivery_date.from } 
                to { 
                fetcher.data.firstPackage.data.track_info.time_metrics.estimated_delivery_date.to }
              </p>
              <p>Service Type: {fetcher.data.firstPackage.data.track_info.misc_info.service_type}</p>
              <p>Weight: {fetcher.data.firstPackage.data.track_info.misc_info.weight_raw}</p>
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <div className="map-card">
              <div className="map-header">Package Location</div>
              <LoadScript googleMapsApiKey={import.meta.env.REACT_GOOGLEMAP_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={defaultCenter}
                >
                  {coordinates && coordinates.latitude && coordinates.longitude && (
                    <Marker position={defaultCenter} />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>

            {packageHistory && (
              <div className="tableContainer">
                <Table
                  td colspan="6"
                  header={header}
                  body={packageHistory.map((event, index) => (
                    <tr key={index}>
                      <td className="font-medium">{event.date}</td>
                      <td>{event.time}</td>
                      <td>{event.description}</td>
                      <td className="text-right">{event.location}</td>
                    </tr>
                  ))}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
