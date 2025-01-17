import StarRatings from "./StarRatings";

const ReviewCard = ({ data, id }) => {
  if (!data) {
    return <>No reviews</>;
  }
  return (
    <div className="p-4 bg-[#313131] rounded-lg flex flex-row" key={id}>
      <div className=" basis-1/5">
        <div
          className="relative rounded-sm  sm:w-[5rem] sm:h-[5rem] flex justify-center items-center  mx-auto"
          title="profile"
        >
          {/* <img
            src={data?.profileImg}
            alt={`${data?.username} profile`}
            className="rounded-sm sm:w-[5rem] sm:h-[5rem] object-fill"
          /> */}
          {
            <img
              loading="lazy"
              src={
                data?.profileImg
                  ? data?.profileImg
                  : "/images/profile-placeholder.webp"
              }
              alt={`${data?.username}'s profile`}
              className="rounded-sm sm:w-[5rem] sm:h-[5rem] object-fill"
              onError={(e) => {
                e.target.src = "/images/profile-placeholder.webp";
              }}
            />
          }
        </div>
      </div>
      <div className="basis-4/5 ms-2">
        <div className="flex flex-col">
          <div>
            <p>{data?.username}</p>
            <StarRatings rating={data?.rating} />
          </div>

          <p className="my-4 text-sm">{data?.review}</p>

          <div className="grid grid-cols-2 gap-4">
            {data?.reviewImages?.map((img, i) => (
              <img
                src={img}
                alt="reviews"
                className="  object-contain"
                key={i}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
