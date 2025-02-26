import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "./CarPool.css";
import { createRide, searchRide } from "../../service/RideService";
import { Alert } from "../../components/Alert";

const containerStyle = {
  width: "100vw",
  height: "100vh",
  position: "relative",
};
const MAPS_API = process.env.REACT_APP_MAPS_API;

const CarPool = () => {
  const user_type = sessionStorage.getItem("user_type");
  const [start, setStart] = useState({ lat: null, lng: null });
  const [end, setEnd] = useState({ lat: null, lng: null });
  const [mapCenter, setMapCenter] = useState(
    JSON.parse(sessionStorage.getItem("mapCenter")) || { lat: 40.7113, lng: -74.0052 }
  );
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API,
    libraries: ["places"],
  });

  useEffect(() => {
    sessionStorage.setItem("mapCenter", JSON.stringify(mapCenter));
  }, [mapCenter]);

  const handlePlaceSelected = (place, type) => {
    if (!place || !place.geometry) {
      console.warn("Invalid place or geometry missing");
      return;
    }

    const location = place.geometry.location;
    const coordinates = { lat: location.lat(), lng: location.lng() };

    if (type === "start") {
      setStart(coordinates);
    } else if (type === "end") {
      setEnd(coordinates);
    }

    setMapCenter(coordinates);
  };

  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };

  const handleIncrement = () => {
    if (value < 5) setValue(value + 1);
  };

  const handleSearchRide = async () => {
    if (!start.lat || !end.lat) {
      Alert.error("Select start and end location");
    } else {
      user_type === "commuter" ? joinCarPool() : createCarPool();
    }
  };

  const joinCarPool = async () => {
    try {
      const res = await searchRide(start.lat, start.lng, end.lat, end.lng, value);
      console.log(res.data);
      if (typeof res.data === "string") {
        Alert.error(res.data);
      } else {
        Alert.success("Ride found Successfully");
        navigate("/active-ride");
      }
    } catch (error) {
      Alert.error("Error joining ride");
    }
  };

  const createCarPool = async () => {
    try {
      const res = await createRide(start.lat, start.lng, end.lat, end.lng, value);
      Alert.success(res.message);
      navigate("/active-ride");
    } catch (error) {
      Alert.error("Error creating ride");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        key={JSON.stringify(mapCenter)} // Forces remount only when mapCenter changes
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
      >
        {start.lat && <Marker position={start} />}
        {end.lat && <Marker position={end} />}
      </GoogleMap>

      <div className="form-container">
        <Autocomplete
          onPlaceChanged={() =>
            handlePlaceSelected(window.autocompleteStart.getPlace(), "start")
          }
          onLoad={(autocomplete) => (window.autocompleteStart = autocomplete)}
        >
          <input
            type="text"
            placeholder="Enter Start Location"
            className="input-field"
          />
        </Autocomplete>

        <Autocomplete
          onPlaceChanged={() =>
            handlePlaceSelected(window.autocompleteEnd.getPlace(), "end")
          }
          onLoad={(autocomplete) => (window.autocompleteEnd = autocomplete)}
        >
          <input
            type="text"
            placeholder="Enter End Location"
            className="input-field"
          />
        </Autocomplete>

        {sessionStorage.getItem("user_type") != "commuter" ? (
          <div className="seat-selection">
            <label>No of Seats</label>
            <div className="seat-controls">
              <button onClick={handleDecrement}>-</button>
              <p>{value}</p>
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>
        ) : null}

        <button className="search-button" onClick={handleSearchRide}>
          {sessionStorage.getItem("user_type") == "commuter" ? "Join Ride" : "Create Ride"}
        </button>
      </div>
    </div>
  );
};

export default CarPool;
