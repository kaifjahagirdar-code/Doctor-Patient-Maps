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

const MapDoctor = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDX48WJWX3C91wFttuvWg1Yz-CbPRkm844", 
  });

  const [marker, setMarker] = useState(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
  });

  const handleMapClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.address || !marker) {
      alert("Please fill in all fields and select a location.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/doctors/add", {
        name: form.name,
        address: form.address,
        lat: marker.lat,
        lng: marker.lng,
      });
      alert("✅ Doctor added successfully!");
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div>
      <h2>Doctor: Add Clinic Location</h2>
      <input
        type="text"
        placeholder="Doctor Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="Clinic Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <br /><br />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      <br />
      <button onClick={handleSubmit}>Submit Doctor</button>
    </div>
  );
};

export default MapDoctor;
