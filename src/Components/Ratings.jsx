import React from "react";
import spaceReviewsStore from "../store/spaceReviewsStore";

const Ratings = () => {
  const { rating, setRating } = spaceReviewsStore(); // Get the rating and setRating from the store

  return (
    <div className="rating">
      {[5, 4, 3, 2, 1].map((star) => (
        <React.Fragment key={star}>
          <input
            type="radio"
            id={`star-${star}`}
            name="star-radio"
            value={star}
            checked={rating === star}
            onChange={() => setRating(star)} // Set rating when clicked
          />
          <label htmlFor={`star-${star}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                pathLength="360"
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
              ></path>
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Ratings;
