import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [mobile, setMobile] = useState();
  const [isMenu, setIsmenu] = useState(false);

  const user = useAuthStore((state) => state.user);
  const { fetchUserDetails, userData } = useAuthStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [openProfile, setOpenProfile] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // console.log(isAuthenticated);
  useEffect(() => {
    if (user?.uid) {
      fetchUserDetails(user.uid);
    }
  }, [user?.uid]);

  useEffect(() => {
    const checkScreenSize = () => {
      setMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    return () => {};
  }, []);

  function showMenu() {
    setIsmenu(!isMenu);
  }
  function profileClicking() {
    setOpenProfile((prev) => !prev);
  }
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenProfile(false); // Close the menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Logout failed:", error.message);
    }
  };
  return (
    <div className="  w-full">
      <nav className="max-w-screen-xl m-auto flex justify-between items-center py-2 px-[1rem] sm:px-[5rem] text-white shadow-lg">
        <Link to="/" className="">
          <img
            src={"/images/logo-2-removebg.png"}
            alt="deskspot "
            className="h-14 w-14 object-contain mx-auto"
            loading="lazy"
          />
          <p className="text-center font-bold">
            Desk<span className="text-[#039e53]">Spot</span>
          </p>
        </Link>

        {/* 
        <div className={mobile ? `hidden ` : `flex gap-5`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-purple-100 underline underline-offset-2 font-bold"
                : "hover:text-red-200 hover:underline underline-offset-2 "
            }
          >
            Home
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive
                ? "text-purple-100 underline underline-offset-2 font-bold"
                : "hover:text-red-200 hover:underline underline-offset-2 "
            }
          >
            About us
          </NavLink>
        </div> */}
        <div className="flex items-center gap-5">
          {isAuthenticated ? (
            <>
              <span> {user?.displayName || userData[0]?.username}</span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className=" font-bold outline-1 rounded-lg hover:bg-[#039e53] hover:border-transparent border-white border px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="register"
                className=" font-bold outline-1 rounded-lg bg-[#039e53] hover:border-transparent border-[#039e53] hover:bg-[#039e53a0] border px-4 py-2 shadow-md"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <div
                className="relative rounded-full w-[3rem] h-[3rem] flex justify-center items-center hover:cursor-pointer transition-all duration-300 ease-in-out border border-transparent hover:border-white hover:border-2"
                title="profile"
                onClick={profileClicking}
              >
                <img
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "/images/profile-placeholder.webp"
                  }
                  alt="profile"
                  className="rounded-full w-[3rem] h-[3rem] object-fill"
                />
              </div>
              <div
                className={`${
                  openProfile
                    ? "flex flex-col absolute right-0 md:right-auto w-max bg-green-400  rounded-lg top-[4rem] z-50"
                    : "hidden"
                }`}
              >
                <Link
                  to="/my-profile"
                  className="bg-gray-600 p-4 hover:bg-gray-400 rounded-t-lg"
                  onClick={profileClicking}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    profileClicking();
                  }}
                  className="p-4 bg-red-600 hover:bg-red-400 rounded-b-lg"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
