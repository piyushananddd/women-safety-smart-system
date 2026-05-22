import React, { useState } from "react";
import "./pathfinder.css";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

function PathfinderPage() {
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const handleSearch = async () => {
    if (!startPoint || !destination) {
      alert("Please enter both locations");
      return;
    }

    try {
      const response = await fetch(
        "https://women-safety-backend-z8h9.onrender.com/analyze-route",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startPoint,
            destination,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      setRouteData(data);

      console.log(import.meta.env.VITE_ORS_API_KEY)
     
      const geoStart = await axios.get(
        `https://api.openrouteservice.org/geocode/search?api_key=${import.meta.env.VITE_ORS_API_KEY}&text=${startPoint}`,
      );

      const geoEnd = await axios.get(
        `https://api.openrouteservice.org/geocode/search?api_key=${import.meta.env.VITE_ORS_API_KEY}&text=${destination}`,
      );

      const startCoords = geoStart.data.features[0].geometry.coordinates;

      const endCoords = geoEnd.data.features[0].geometry.coordinates;

      const routeResponse = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          coordinates: [startCoords, endCoords],
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_ORS_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );


      console.log(routeResponse.data)



     if (
  routeResponse.data.features &&
  routeResponse.data.features.length > 0
) {

  const coords =
    routeResponse.data.features[0].geometry.coordinates.map(
      (coord) => [coord[1], coord[0]]
    );

  setRouteCoordinates(coords);

  setShowResult(true);

} else {

  alert("No route found");

}
    } catch (error) {
        console.log(error.response)
      console.log(error);
      alert("Route API failed")
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white p-6">
      <div className="max-w-md mx-auto bg-[#111827] rounded-3xl p-6 shadow-2xl border border-[#1F2937]">
        <div className="mb-6">
          <span className="bg-purple-600/20 text-purple-400 px-4 py-1 rounded-full text-sm">
            PATHFINDER AI
          </span>

          <h1 className="text-4xl font-bold mt-4">Find Your Safest Path</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-400">CURRENT LOCATION</label>

            <input
              type="text"
              placeholder="Select Start Point"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="w-full mt-2 bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">FINAL DESTINATION</label>

            <input
              type="text"
              placeholder="Select Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full mt-2 bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-xl py-4 font-semibold text-lg"
          >
            GET SAFEST ROUTE
          </button>
        </div>

        {showResult && (
          <div className="mt-8 bg-[#0F172A] rounded-2xl p-5 border border-[#1E293B]">
            <div className="flex justify-between items-center mb-5">
              <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 text-2xl">
                ⚠️
              </div>

              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  ⚡
                </div>

                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  🌙
                </div>

                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  🚨
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-600/20 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">HUMAN COUNT</p>

                <h2 className="text-4xl font-bold text-purple-400 mt-2">
                  {routeData?.dangerScore}
                </h2>
              </div>

              <div className="bg-cyan-500/20 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">VEHICLES</p>

                <h2 className="text-4xl font-bold text-cyan-400 mt-2">18</h2>
              </div>

              <div className="bg-yellow-500/20 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">LIGHT LEVEL</p>

                <h2 className="text-4xl font-bold text-yellow-400 mt-2">
                  GOOD
                </h2>
              </div>

              <div className="bg-green-500/20 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">THREAT LEVEL</p>

                <h2 className="text-3xl font-bold text-green-400 mt-2">
                  {routeData?.threatLevel}
                </h2>
              </div>
            </div>

            <div className="mt-6 bg-green-500/10 border border-green-500 rounded-xl p-4 text-green-400 font-semibold text-center">
              {routeData?.safeRoute
                ? "✅ Safe Path Suggested"
                : "⚠️ Unsafe Route Detected"}
            </div>
          </div>
        )}



        {routeCoordinates.length > 0 && (
          <div className="map-section mt-6">
            <MapContainer
              center={routeCoordinates[0] || [28.6139, 77.209]}
              zoom={13}
              scrollWheelZoom={true}
              className="map-container"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* START MARKER */}
              {routeCoordinates.length > 0 && (
                <Marker position={routeCoordinates[0]}>
                  <Popup>Start Point</Popup>
                </Marker>
              )}

              {/* END MARKER */}
              {routeCoordinates.length > 0 && (
                <Marker
                  position={routeCoordinates[routeCoordinates.length - 1]}
                >
                  <Popup>Destination</Popup>
                </Marker>
              )}

              {/* REAL ROAD ROUTE */}
              <Polyline positions={routeCoordinates} color="lime" weight={5} />
            </MapContainer>
          </div>
        )}


      </div>
    </div>
  );
}

export default PathfinderPage;
