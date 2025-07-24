import React from "react";
import MapDoctor from "./components/MapDoctor";
import MapPatient from "./components/MapPatient";

function App() {
  return (
    <div>
      <h1>Doctor-Patient Location App</h1>
      <MapDoctor />
      <hr />
      <MapPatient />
    </div>
  );
}

export default App;
