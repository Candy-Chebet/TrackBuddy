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
export default function HandleTrackPackage() {
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
    <div id="trackUpdate" className="trackbuddz">
      <div className="search-container">
        <fetcher.Form method="post">
          <input
            type="text"
            name="trackingNumber"
            placeholder="Enter Tracking Number"
          />
          <button type="submit" className="search-button">Search</button>
        </fetcher.Form>
      </div>

      {fetcher.data?.firstPackage && (
        <div className="main-container">
          <div className="sidebar">
            <ul>
              <li><a href="#package-updates">Package Updates</a></li>
              <li><a href="#package-map-location">Package Map Location</a></li>
              <li><a href="#package-history">Package History</a></li>
            </ul>
          </div>

          <div className="content-area">
            <div id="package-updates" className="package-card">
              <h1>Package Updates</h1>
              <table>
                <tbody>
                  <tr>
                    <th>Tracking Number:</th>
                    <td>{fetcher.data.firstPackage.data.number}</td>
                  </tr>
                  <tr>
                    <th>Carrier:</th>
                    <td>{fetcher.data.firstPackage.data.carrier}</td>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <td>{fetcher.data.firstPackage.data.track_info.latest_status.status}</td>
                  </tr>
                  <tr>
                    <th>Estimated Delivery Date:</th>
                    <td>
                      From {fetcher.data.firstPackage.data.track_info.time_metrics.estimated_delivery_date.from} 
                      to {fetcher.data.firstPackage.data.track_info.time_metrics.estimated_delivery_date.to}
                    </td>
                  </tr>
                  <tr>
                    <th>Service Type:</th>
                    <td>{fetcher.data.firstPackage.data.track_info.misc_info.service_type}</td>
                  </tr>
                  <tr>
                    <th>Weight:</th>
                    <td>{fetcher.data.firstPackage.data.track_info.misc_info.weight_raw}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="package-map-location" className="map-card">
              <div className="map-header">Package Map Location</div>
              <LoadScript googleMapsApiKey="AIzaSyAvIl5eiNPKQd6qVGm5DGmT22gD1K37YdQ">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={14}
                  center={defaultCenter}
                >
                  {coordinates && coordinates.latitude && coordinates.longitude && (
                    <Marker position={defaultCenter} icon="../assets/location.png" />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>

            <div id="package-history" className="tableContainer">
              <h1>Package History</h1>
              {packageHistory && (
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
