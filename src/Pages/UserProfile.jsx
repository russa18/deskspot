import { useEffect, useState, useMemo } from "react";
import useReviewPost from "../store/spaceReviewsStore";
import useAuthStore from "../store/authStore";
import Spinner from "../Components/Spinner";
import useStore from "../store/useStore";
import StarRatings from "../Components/StarRatings";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { reviews, fetchReviews, loading } = useReviewPost();
  const { user, fetchUserDetails, userData } = useAuthStore();
  const [favWorkspaceIds, setFavWorkspaceIds] = useState([]);
  const [favWorkspaces, setFavWorkspaces] = useState([]);
  const [reviewedWs, setReviewedWs] = useState([]);
  const { spaces } = useStore();
  const navigate = useNavigate();

  // Memoize reviews filtered by user ID
  const myReviewsList = useMemo(
    () => reviews.filter((review) => review?.userId === user?.uid),
    [reviews, user?.uid]
  );

  // Fetch user details and reviews when user is available
  useEffect(() => {
    if (user?.uid) {
      fetchUserDetails(user.uid);
      fetchReviews(); // Fetch reviews when user details are available
    }
  }, [user?.uid, fetchReviews]);

  // Set favorite workspaces IDs based on userData
  useEffect(() => {
    if (user?.uid && userData.length > 0) {
      const filteredWorkspacesIds = userData
        .filter((currUser) => currUser.userId === user.uid)
        .map((user) => user.favWorkspace); // Extract only the favWorkspace property

      setFavWorkspaceIds(filteredWorkspacesIds.flat()); // Ensure the result is a flat array of IDs
    }
  }, [userData, user?.uid]);

  // Filter spaces based on favWorkspaceIds
  useEffect(() => {
    const filteredWorkspaces = favWorkspaceIds.map(
      (favWorkspaceId) => spaces.filter((space) => space.id === favWorkspaceId) // filter the spaces to find matches
    );

    // Flatten the array to avoid nested arrays
    setFavWorkspaces(filteredWorkspaces.flat());
  }, [favWorkspaceIds, spaces]);

  // Get workspaces associated with the user's reviews
  useEffect(() => {
    const reviewedWorkspaces = myReviewsList
      .map((review) => spaces.find((space) => space.id === review.workspaceId))
      .filter(Boolean);
    setReviewedWs(reviewedWorkspaces);
  }, [myReviewsList, spaces]);

  return (
    <div>
      <div className="relative h-[200px] md:h-[300px] mb-[5rem]">
        <img
          src="/src/assets/images/home-header.jpg"
          alt="cover "
          className="h-[150px] md:h-[200px] w-full object-cover rounded-md"
        />

        <div className="absolute  bottom-[5%] left-1/2 transform -translate-x-1/2 rounded-full w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem]">
          <img
            src={`${
              user?.photoURL
                ? user?.photoURL
                : "/images/profile-placeholder.webp"
            }`}
            alt="profile pic"
            className="rounded-full w-full h-full object-cover"
          />

          <p className="text-white text-center my-4 text-3xl font-bold">
            {user?.displayName ? user?.displayName : userData[0]?.username}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 my-12 border-t-2 pt-[5rem]">
        <div className="text-white w-[300px] max-w-[500px] ms-auto bg-gray-500 me-12 p-8 rounded-md mb-4">
          <div className="text-center text-2xl font-bold">Favorites</div>

          <div className="grid grid-cols-1 gap-4 overflow-y-auto h-[500px] p-[1rem]">
            {favWorkspaces.length > 0 ? (
              favWorkspaces?.map((fav, i) => {
                return (
                  <div
                    className="rounded-lg bg-[#313131] cursor-pointer hover:shadow-lg transition-shadow max-h-max"
                    key={i}
                    onClick={() => navigate(`/space-detail/${fav.id}`)}
                  >
                    <div className="relative">
                      <img
                        src={fav.profileImg}
                        alt={fav.name}
                        className="w-full h-[8rem] rounded-t-lg object-cover"
                      />
                      <div className="flex justify-between flex-col w-full p-2   text-white  ">
                        <p className="  p-1 rounded-lg">${fav.price}/h</p>
                        <div className="  p-1 rounded-lg flex items-center">
                          <StarRatings rating={fav.rating} />

                          <span className="ms-2">{fav.rating} </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 text-white">
                      <p className="text-xl">
                        {fav.name} |{" "}
                        <span className="text-sm">{fav.location[0]}</span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-white text-center">No Favorites</p>
            )}
          </div>
        </div>

        <div className="max-w-[500px] w-full p-4">
          <h2 className="text-4xl text-white">My Reviews</h2>
          <div className="my-8 overflow-y-auto h-[500px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center my-[10rem] w-full">
                <Spinner />
                <div className="text-white">Loading Reviews...</div>
              </div>
            ) : myReviewsList?.length > 0 ? (
              myReviewsList?.map((review, i) => (
                <div key={i} className="my-4 w-full max-w-[500px] text-white px-4">
                  <div className="p-4 bg-[#313131] rounded-lg flex flex-row">
                    <div className=" basis-1/5">
                      <div
                        className="relative rounded-sm  sm:w-[5rem] sm:h-[5rem] flex justify-center items-center  mx-auto"
                        title="profile"
                      >
                        {
                          
                          <img
                            src={(reviewedWs.find((ws) => ws.id === review.workspaceId) ?.profileImg || "/images/profile-placeholder.webp") }

                            alt={`${review?.username}'s profile`}
                            className="rounded-sm sm:w-[5rem] sm:h-[5rem] object-fill"
                          />
                        }

                      </div>
                    </div>
                    <div className="basis-4/5 ms-2">
                      <div className="flex flex-col">
                        <div>
                          {reviewedWs.find((ws) => ws.id === review.workspaceId)
                            ?.name || " "}
                          <StarRatings rating={review?.rating} />
                        </div>

                        <p className="my-4 text-sm">{review?.review}</p>

                        <div className="grid grid-cols-2 gap-4">
                          {review?.reviewImages?.map((img, i) => (
                            <img
                              src={img}
                              alt="reviews"
                              className="  object-contain"
                              key={i}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">{`You haven't reviewed any space yet`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
