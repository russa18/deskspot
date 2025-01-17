import { useNavigate } from "react-router-dom";
import StarRatings from "./StarRatings";
import { toast } from "react-toastify";

const SpaceCard = ({ data, id }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/space-detail/${id}`, { state: { data } });
  };
  return (
    <div
      className="rounded-lg bg-[#313131] cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={data.profileImg}
          alt={data.name}
          className="w-full h-[15rem]  md:h-[10rem] rounded-t-lg object-cover"
          loading="lazy"
        />
        <div className="flex justify-between flex-col sm:flex-row sm:justify-between absolute bottom-0 w-full p-2 bg-opacity-50 bg-black text-white font-bold ">
          <p className="  p-1 rounded-lg">${data.price}/h</p>
          <div className="  p-1 rounded-lg flex items-center">
            <StarRatings rating={data.rating} />
            <span className="ms-2">{data.rating} </span>
          </div>
        </div>
      </div>
      <div className="p-4 text-white">
        <p className="text-xl">
          {data.name} | <span className="text-sm">{data.location[0]}</span>
        </p>
        <p className="text-sm">{data.shortDescription}</p>

        <div className="flex items-center justify-between   my-2  mt-5">
          <button
            className="bg-[#039e53] hover:bg-green-500 transition-colors p-2 px-4 rounded-lg text-white font-bold text-sm  "
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from propagating to the card's onClick
              navigate(`/space-detail/${id}`, { state: { data } });
            }}
          >
            View
          </button>

          <button
            className="booknow-button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent propagation
              toast.info("Booking functionality will be implemented here!");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              ></path>
            </svg>

            <div className="booknow-text">Book now</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
