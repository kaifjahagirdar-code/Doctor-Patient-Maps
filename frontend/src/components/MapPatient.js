import React, { useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const MapPatient = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDX48WJWX3C91wFttuvWg1Yz-CbPRkm844", 
  });

  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState(center);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctors/nearby?lat=${location.lat}&lng=${location.lng}`
      );
      setDoctors(res.data);
    } catch (err) {
      console.error("❌ Error fetching nearby doctors:", err);
    }
  };

  const handleMapClick = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div>
      <h2>Patient: Find Nearby Doctors</h2>
      <p>Click on the map to select your location</p>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={13}
        onClick={handleMapClick}
      >
        {/* Patient marker */}
        <Marker position={location} />

        {/* Doctor markers */}
        {doctors.map((doc, index) => (
          <Marker
            key={index}
            position={{
              lat: doc.location.coordinates[1],
              lng: doc.location.coordinates[0],
            }}
            label={doc.name}
          />
        ))}
      </GoogleMap>

      <br />
      <button onClick={handleSearch}>Search Nearby Doctors</button>
    </div>
  );
};

export default MapPatient;
