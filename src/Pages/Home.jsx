import { useEffect, useState } from "react";
import SearchBox from "../Components/SearchBox";
// import workspacedata from "../workspacedata";
import SpaceCard from "../Components/SpaceCard";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase-config";
import useStore from "../store/useStore";
import Spinner from "../Components/Spinner";

const Home = () => {
  // const [placeholder, setPlaceholder] = useState("Location");
  const [searchTxt, setSearchTxt] = useState("");
  const [searchSpace, setSearchSpace] = useState([]);
  const [foundNo, setFoundNo] = useState(null);
  const [searched, setSearched] = useState(false);
  const { spaces, fetchSpaces, loading, error } = useStore();

  // Fetch spaces when the component mounts
  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const searchFn = () => {
    const filteredSpaces = spaces.filter(
      (space) =>
        space.location.some((loc) =>
          loc.toLowerCase().includes(searchTxt.toLowerCase())
        ) || space.name.toLowerCase().includes(searchTxt.toLowerCase())
    );

    setSearched(true);
    setSearchSpace(filteredSpaces);

    const timeoutId = setTimeout(() => {
      setFoundNo(filteredSpaces.length);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  if (loading)
    return (
      <div className="flex justify-center my-[10rem] w-full">
        {" "}
        <Spinner />
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  // const [workspace, setWorkspace] = useState([]);

  // const workspaceCollectionRef = collection(db, "workspaces");

  // useEffect(() => {
  //   const getWorkspaceData = async () => {
  //     try {
  //       const data = await getDocs(workspaceCollectionRef);
  //       const workspacedata = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       console.log(workspacedata);

  //       setWorkspace(workspacedata);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };
  //   getWorkspaceData();
  // }, []);

  return (
    <div className="home max-w-screen-xl m-auto  p-4 sm:p-8 ">
      <div className="relative w-full">
        <div className="absolute inset-0   flex flex-col items-center md:justify-center p-4">
          <h1 className="text-white text-4xl my-4 font-bold bg-green-500 p-4 bg-opacity-80">
            Explore the best co-working spaces near you !
          </h1>

          <div className="flex w-full max-w-[500px]">
            <SearchBox
              txtFunc={(e) => setSearchTxt(e.target.value)}
              searchFn={searchFn}
            />
          </div>
          <p className="text-white">
            {searchTxt === "" ? "" : `${foundNo} workspaces found`}{" "}
          </p>
          <h2 className="text-white text-2xl my-4">
            Find your perfect work space Today !
          </h2>
        </div>
        <img
          src="/images/home-header-2.jpg"
          alt=""
          className="h-[80vh] md:h-[50vh] w-full object-cover sm:rounded-lg"
          loading="lazy"
        />
      </div>

      <div className="popular-section  py-8 rounded-lg ">
        <div className="flex mb-8">
          <h3 className="text-3xl text-white font-bold me-8">
            {searched && searchTxt.length > 0
              ? "Search Results.."
              : "All Workspaces"}
          </h3>
          {/* <h4 className="text-3xl text-white ">Your city</h4> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* {searched
            ? searchSpace?.map((space) => (
                <SpaceCard data={space} key={space.id} id={space.id} />
              ))
            : spaces.map((space) => (
                <SpaceCard data={space} key={space.id} id={space.id} />
              ))} */}

          {loading ? (
            <div className="flex flex-col items-center justify-center my-[5rem] w-full">
              <Spinner />
              <div className="text-white">Loading Spaces...</div>
            </div>
          ) : searched && searchSpace.length === 0 ? (
            <p className="col-span-4 text-white text-center">
              No results found
            </p>
          ) : (
            (searched ? searchSpace : spaces)?.map((space) => (
              <SpaceCard data={space} key={space.id} id={space.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
