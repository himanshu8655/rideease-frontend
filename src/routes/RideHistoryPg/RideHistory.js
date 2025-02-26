import React, { useEffect, useState } from "react";
import RideHistoryCard from "../../components/RideHistoryCard";
import { useNavigate } from "react-router-dom";
import { getRideHistory } from "../../service/RideService";

const RideHistory = () => {
  const [rideHistoryList, setRideHistoryList] = useState([]); // State to store ride history
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const getStatus = (status) => {
    if (status == 0) {
      return "Ride Not Started";
    }
    if (status == 1) {
      return "Ride In Progress";
    }
    if (status == 2) {
      return "Ride Ended";
    }
  };
  // Fetch ride history data on component mount
  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const data = await getRideHistory(sessionStorage.getItem("userId"));
        setRideHistoryList(data); // Set fetched data to state
      } catch (err) {
        setError("Failed to load ride history"); // Set error message
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchRideHistory();
  }, []);

  const handleReview = (rideId) => {
    navigate(`/write-review/${rideId}`);
  };

  // Render loading, error, or ride history list
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Ride History</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {rideHistoryList.map((ride) => (
          <RideHistoryCard
            key={ride.ride_id}
            ride_id={ride.ride_id}
            carpool_owner_id={ride.carpool_owner}
            status={getStatus(ride.is_active)} // Modify based on your status logic
            total_seats={ride.seat_available}
            start_location={`Lat: ${ride.start_location.coordinates[1]}, Long: ${ride.start_location.coordinates[0]}`} // Example, modify as needed
            end_location={`Lat: ${ride.end_location.coordinates[1]}, Long: ${ride.end_location.coordinates[0]}`} // Example, modify as needed
            commuter_id={ride.commuter_id}
            message_id={ride._id} // Modify this if necessary
            onWriteReview={handleReview}
          />
        ))}
      </div>
    </div>
  );
};

export default RideHistory;
