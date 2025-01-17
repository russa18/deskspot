import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons from react-icons

const StarRatings = ({ rating }) => {
  const totalStars = 5; // Total number of stars

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const currentStar = index + 1; // 1-based index for stars
        if (currentStar <= Math.floor(rating)) {
          return <FaStar key={index} className="text-yellow-400 text-sm" />; // Full star
        } else if (currentStar === Math.ceil(rating) && rating % 1 !== 0) {
          return (
            <FaStarHalfAlt key={index} className="text-yellow-400 text-sm" />
          ); // Half star
        } else {
          return <FaRegStar key={index} className="text-gray-400 text-sm" />; // Empty star
        }
      })}
    </div>
  );
};

export default StarRatings;
