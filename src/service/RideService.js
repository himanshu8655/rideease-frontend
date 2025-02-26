import axios from "axios";
import { use } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const searchRide = async (startLat, startLng, endLat, endLng) => {
  try {
    const response = await axios.post(`${API_URL}/hopin/joincarpool`, {
      uid: sessionStorage.getItem("userId"),
      start_lat: startLat,
      start_long: startLng,
      end_lat: endLat,
      end_long: endLng,
    });

    if (response.data) {
      console.log("Ride search results:", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to search for a ride."
      );
    } else {
      console.error("Request error:", error.message);
      throw new Error(
        "Unable to process your request. Please try again later."
      );
    }
  }
};

export const createRide = async (
  startLat,
  startLng,
  endLat,
  endLng,
  noOfSeats
) => {
  try {
    const response = await axios.post(`${API_URL}/hopin/carpool`, {
      uid: sessionStorage.getItem("userId"),
      start_lat: startLat,
      start_long: startLng,
      end_lat: endLat,
      end_long: endLng,
      no_of_seats: noOfSeats,
    });

    if (response.data) {
      console.log("Ride search results:", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to search for a ride."
      );
    } else {
      console.error("Request error:", error.message);
      throw new Error(
        "Unable to process your request. Please try again later."
      );
    }
  }
};


export const writeReview = async (ride_id, rating, description) => {
  try {
    const response = await axios.post(`${API_URL}/hopin/review`, {
      ride_id: parseInt(ride_id),
      rating: rating,
      user_id: parseInt(sessionStorage.getItem("userId")),
      description: description
    });
    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred while submitting the review.' };
  }
};

export const fetchActiveRide = async () => {
  try {
    const response = await axios.post(`${API_URL}/hopin/activeride`, {
      uid: sessionStorage.getItem("userId"),
    });

    if (response.data) {
      console.log("Active ride details:", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to fetch active ride details."
      );
    } else {
      console.error("Request error:", error.message);
      throw new Error(
        "Unable to process your request. Please try again later."
      );
    }
  }
};

export const updateRideStatus = async (rideStatus, rideId) => {
  try {
    const response = await axios.post(`${API_URL}/hopin/ridestatus`, {
      ride_status: rideStatus,
      ride_id: rideId,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.success) {
      console.log("Ride status updated:", response.data.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to update ride status."
      );
    } else {
      console.error("Request error:", error.message);
      throw new Error(
        "Unable to process your request. Please try again later."
      );
    }
  }
};


export const getRideHistory = async (uid) => {
  console.log(uid)
  try {
    const response = await axios.post(`${API_URL}/hopin/ridehistory`, {
      uid: uid
    });
    return response.data.data; // Returns the data from the API
  } catch (error) {
    console.error("Error fetching ride history:", error.message);
    throw error; // Propagate error for handling in components
  }
};