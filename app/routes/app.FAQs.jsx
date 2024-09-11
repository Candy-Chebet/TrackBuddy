import React from 'react';

export default function FAQs() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{  fontSize: '18px', textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>Frequently Asked Questions</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>How do I track my package?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
            To track your package, simply enter your tracking number in the search bar and click the "Search" button. The app will retrieve the latest information about your package, including its current status, estimated delivery date, and location.
          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>What carriers are supported by the app?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
            The app supports a wide range of carriers, including FedEx, USPS, 
            UPS, DHL, TNT, Royal Mail, and more. The list of supported carriers 
            is regularly updated to include new ones.
          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>What information will I see after tracking my package?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
            After entering a valid tracking number, you'll see details such as the tracking number, carrier, current status, estimated delivery date, service type, and package weight. Additionally, you'll have access to a map showing the package's current location and a history of its tracking events.
          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>Why can't I find my tracking number?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
          If you can't find your tracking number, double-check to ensure that you entered it correctly. 
          If the problem persists, it's possible that the tracking information is not yet available or the number is invalid. 
          Contact the carrier for further assistance.
          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>Can I see the history of my package's journey?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
          Yes, the app provides a detailed history of your package's journey, including the dates, times, 
          descriptions of each event, and the locations where those events occurred.
          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>How accurate is the estimated delivery date?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
          The estimated delivery date is provided by the carrier and is based on various factors, 
          including the package's current location and transit conditions. While it's generally accurate, unforeseen circumstances 
          like weather or customs delays may affect the actual delivery date.
          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>Why is the package location map not showing up?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
             If the package location map is not displaying, it could be due to
              an issue with the locations on zour computer or a lack of location data from the carrier. 
              Ensure that your browser has access to the internet and that location is turned on.

          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>What should I do if my package is delayed?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
          If your package is delayed, check the latest status updates 
          provided by the carrier in the app. You can also contact the carrier 
          directly for more detailed information and assistance.

          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>Is my tracking information secure?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
            Yes, your tracking information is secure. The app does not store personal information 
            and only retrieves the necessary tracking data to display the package's status. 
            We take your privacy seriously and ensure that your data is handled securely.
          </p>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', color: '#007bff', marginBottom: '10px' }}>Can I track packages internationally?</h2>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.5' }}>
          Yes, the app supports international package tracking for most major carriers. 
          You can track packages shipped internationally, 
          but be aware that some carriers may have limited tracking updates for cross-border shipments.
          </p>
        </li>
      </ul>
    </div>
  );
}


