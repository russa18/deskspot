import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import StarRatings from "../Components/StarRatings";
import ReviewCard from "../Components/ReviewCard";
import Ratings from "../Components/Ratings";
import { useParams } from "react-router-dom";
import useStore from "../store/useStore";
import useReviewPost from "../store/spaceReviewsStore";
import useAuthStore from "../store/authStore";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";

const SpaceDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { spaces, fetchSpaces } = useStore();
  const { user, addToFavWorkspace } = useAuthStore();

  const [review, setReview] = useState("");

  const [sortOption, setSortOption] = useState("all");

  const [space, setSpace] = useState(null);
  const { id: spaceId } = useParams(); // Assuming you're using route params
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    reviews,
    fetchReviews,
    postReviews,
    rating,
    setRating,
    loading,
    error,
  } = useReviewPost();

  const sortedReviews = [...reviews]
    .filter((r) => r.workspaceId === spaceId)
    .sort((a, b) => {
      if (sortOption === "most recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOption === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0; // For "all", keep the order unchanged
    });

  const handlePostReview = async (e) => {
    e.preventDefault();

    if (!review.trim()) {
      toast.error("Review cannot be empty.");
      return;
    }
    // Get the selected rating from the Zustand store
    let selectedRating = rating;

    if (selectedRating === null) {
      toast.error("Please select a rating.");
      return;
    }
    await postReviews(
      spaceId,
      review,
      user?.uid, // Pass userId from Zustand auth store
      user?.displayName || user?.email, // Pass username from Zustand auth store
      [], // Optional review images
      rating, // Default rating (adjust based on your app's UI logic)
      user?.photoURL // Pass profile image if available
    );
    toast.success("review posted");
    setReview(""); // Reset review input after successful post
    setRating(null);
  };

  const addFavorites = async () => {
    await addToFavWorkspace(spaceId, user?.uid);
    setIsFavorite(true);
    toast.success("Added to Favorites");
  };

  const checkFavoriteStatus = async () => {
    // console.log(user?.favWorkspace);

    if (!user?.favWorkspace) return false;
    const favoriteStatus = user.favWorkspace.includes(spaceId);
    console.log(favoriteStatus);

    setIsFavorite(favoriteStatus); // Set the state
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, user]);

  useEffect(() => {
    if (!spaces.length) {
      fetchSpaces(); // Fetch spaces if Zustand store is empty
    } else {
      const fetchedSpace = spaces.find((space) => space.id === spaceId);
      if (fetchedSpace) {
        setSpace(fetchedSpace);
      }
    }
  }, [spaces, spaceId, fetchSpaces]);

  useEffect(() => {
    if (!space && spaces.length) {
      const fetchedSpace = spaces.find((space) => space.id === spaceId);
      setSpace(fetchedSpace || null);
    }
  }, [space, spaces, spaceId]);

  if (loading)
    return (
      <div className="flex justify-center my-[10rem] w-full">
        {" "}
        <Spinner />
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!space) return <p>Space not found!</p>;

  return (
    <div className="text-white pb-8">
      <div className="relative">
        <div className="md:absolute top-2 right-2 z-10 flex justify-between p-2">
          <div className="flex flex-col me-4">
            <StarRatings rating={space.rating} />
            <p className="mb-4">${space.price}/h</p>
          </div>
          {/* <button  onClick={addFavorites}>fav</button> */}

          <div className={` ${user?.email ? "  rating" : "hidden"}`}>
            <input
              type="radio"
              id={`favorite`}
              name="favorite-radio"
              value=""
              onChange={addFavorites} // Set rating when clicked
              checked={isFavorite}
            />
            <label htmlFor={`favorite`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  pathLength="360"
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                ></path>
              </svg>
            </label>
          </div>
        </div>
        <img
          src="/images/home-header.jpg"
          alt="header"
          className="sm:h-[500px] w-full rounded-t-lg blur-sm object-cover hidden sm:block"
          loading="lazy"
        />

        <div className="sm:absolute top-[10%] left-[5%] px-4 md:max-w-[80%]">
          <h2 className="text-4xl sm:text-8xl font-bold mb-2">{space.name}</h2>
          <h4 className="text-lg">
            {space.location[0]} | {space.location[1]}
          </h4>
          <div className="mt-4 py-4 md:p-4 rounded-lg bg-black/20 backdrop-blur-sm text-white sm:w-[80%]">
            {space.longDescription}
          </div>

          <div className="mt-4 w-full max-w-[600px] flex flex-wrap">
            {space &&
            Array.isArray(space.amenities) &&
            space.amenities.length > 0 ? (
              space.amenities.map((amenity, i) => (
                <span
                  className="bg-green-500 font-bold p-2 px-4 rounded-lg m-2"
                  key={i}
                >
                  {amenity}
                </span>
              ))
            ) : (
              <span>No amenities available</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8 px-8">
        <div className="rounded-lg h-fit">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, FreeMode, Navigation, Thumbs]}
            className="mySwiper2  h-[50%]"
          >
            {space.images.map((img, i) => (
              <SwiperSlide className="h-full" key={i}>
                <img
                  src={`${img}`}
                  className="h-full w-full object-fill"
                  alt="swiper"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {space.images.map((img, i) => (
              <SwiperSlide className="h-full" key={i}>
                <img
                  src={`${img}`}
                  className="h-[150px] w-full object-fill"
                  alt="swiper"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="py-4 mt-2 sm:mt-8 ">
          <h5 className="text-2xl sm:text-4xl font-bold mb-4">{space.name}</h5>
          <p className="text-2xl mb-4">
            {space.location[0]} | {space.location[1]}
          </p>
          <div className="mb-4">
            <StarRatings rating={space.rating} />
            {/* Dynamic stars based on rating */}
          </div>
          <p className="mb-4">${space.price}/h</p>
          {/* <p className="mb-4">more details</p>
          <p className="mb-4">more details</p>
          <p className="mb-4">more details</p> */}

          <div className="flex   gap-4">
            <div>
              <button
                className="bg-[#039e53] hover:bg-green-500 transition-colors p-4 rounded-lg text-white font-bold text-sm"
                onClick={() => {
                  toast.info("Map functionality will be implemented here!");
                }}
              >
                View on Map
              </button>
            </div>

            <button
              className="booknow-button"
              onClick={() => {
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

      <div className="px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <h5 className="text-4xl">Customer Reviews</h5>

          {/* //sort by */}
          <div className="flex justify-between md:justify-end items-center my-4 sm:my-0 ">
            <p>Sort reviews by -</p>
            <select
              className="text-black ms-4 px-4 py-2 rounded-md"
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
            >
              <option value="all">All</option>
              <option value="most recent">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <form
          onSubmit={handlePostReview}
          className={` ${
            user?.email
              ? "flex flex-col items-center md:flex-row my-4  md:justify-end"
              : "hidden"
          }`}
        >
          <Ratings />

          <div className="messageBox mt-2 !w-full md:!w-fit">
            <div className="fileUploadWrapper">
              <label htmlFor="file">
                <svg
                  viewBox="0 0 337 337"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="168.5"
                    cy="168.5"
                    r="158.5"
                    fill="none"
                    stroke="#6c6c6c"
                    strokeWidth="20"
                  ></circle>
                  <path
                    d="M167.759 79V259"
                    stroke="#6c6c6c"
                    strokeWidth="25"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M79 167.138H259"
                    stroke="#6c6c6c"
                    strokeWidth="25"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <span className="tooltip">Add an image</span>
              </label>
              <input name="file" id="file" type="file" />
            </div>

            <input
              id="messageInput"
              type="text"
              placeholder="Write a review"
              required
              value={review} // Bind the input value to the state
              onChange={(e) => setReview(e.target.value)} // Update state on change
            />
            <button id="sendButton" type="submit">
              <svg
                viewBox="0 0 664 663"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                  fill="none"
                ></path>
                <path
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                  stroke="#6c6c6c"
                  strokeWidth="33.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>

          {/* <input
            type="text"
            placeholder="Write a review"
            className="w-full max-w-[500px] p-2 bg-black  text-sm border-b-2 "
          />
          <button className="bg-[#039e53] hover:bg-green-500 transition-colors px-10  text-white font-bold text-sm">
            Post
          </button> */}
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          {/* {reviews?.map((review) => (
            <ReviewCard data={review} id={review.id} key={review.id} />
          ))} */}

          {sortedReviews.length > 0 ? (
            sortedReviews.map((review, i) => (
              <ReviewCard data={review} id={i} key={i} />
            ))
          ) : (
            <p>No reviews available for this workspace.</p>
          )}
          {/* <ReviewCard
            username="Rushikesh"
            profileImg="/src/assets/images/person1.webp"
            rating="5"
            desc="i loved it"
            reviewImg={["/src/assets/images/work1.jpg"]}
          /> */}

          {/* <ReviewCard
            username="lady"
            profileImg="/src/assets/images/person2.webp"
            rating="3"
            desc="its ok"
            reviewImg={[
              "/src/assets/images/work1.jpg",
              "/src/assets/images/work2.jpg",
              "/src/assets/images/work3.jpg",
            ]}
          />
          <ReviewCard
            username="person3"
            profileImg="/src/assets/images/person3.webp"
            rating="1.5"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum soluta sint fuga amet maiores iste qui tenetur repellendus dolorem cupiditate accusantium quis ratione, voluptas nam saepe quibusdam vel dignissimos fugit hic nostrum."
            reviewImg={[
              "/src/assets/images/work1.jpg",
              "/src/assets/images/work2.jpg",
            ]}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
