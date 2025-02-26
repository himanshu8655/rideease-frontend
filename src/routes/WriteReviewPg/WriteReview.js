import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { writeReview } from "../../service/RideService";
import { Alert } from "../../components/Alert";

const WriteReview = () => {
  const { rideId } = useParams();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await writeReview(rideId, rating, description);
      navigate('/ratings')
      if (response.success) {
        Alert.success(response.message);
      } else {
        Alert.error(response.message || "Failed to submit review.");
      }
    } catch (error) {
      Alert.error("An error occurred while submitting the review.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
      <h2>Write a Review for Ride {rideId}</h2>

      {/* Description Input */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="description" style={{ display: "block", marginBottom: "0.5rem" }}>
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          placeholder="Write your review here..."
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Rating Stars */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>Rating:</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              style={{
                cursor: "pointer",
                color: value <= rating ? "#FFD700" : "#ccc",
              }}
              onClick={() => setRating(value)}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>

      {/* Response Message */}
      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default WriteReview;
