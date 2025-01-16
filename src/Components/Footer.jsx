import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className=" text-white border-t-2 border-[#039e53] px-[1rem] sm:px-[5rem] py-6 grid grid-cols-1 sm:grid-cols-5 gap-4 sm:flex sm:justify-between max-w-screen-xl w-full ">
      <Link to="/">
        <img
          src="/images/logo-2-removebg.png"
          alt="deskspot logo"
          className="w-20 h-20 object-contain"
          loading="lazy"
        />
        <p className="sm:text-center font-bold ms-2 sm:ms-0">
          Desk<span className="text-[#039e53]">Spot</span>
        </p>
      </Link>
      <div className="sm:col-span-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <ul className="flex flex-col gap-y-2">
            <Link
              to="about"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              About us
            </Link>
            <Link
              to="/"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              Careers
            </Link>
            <Link
              to="/"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              Home
            </Link>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <Link
              to="/"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              Help center
            </Link>
            <Link
              to="/"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              Report issue
            </Link>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <Link
              to="/"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              Privacy policy
            </Link>
            <Link
              to="/"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              Terms & conditions
            </Link>
            <Link
              to="/"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              Fraud alert
            </Link>
            <Link
              to="/"
              className="hover:text-green-300 hover:underline hover:underline-offset-2"
            >
              Trust & safety
            </Link>
          </ul>

          <ul className="flex gap-2 ">
            <Link to="/">
              <FaInstagram className="w-6 h-6 hover:scale-110" />
            </Link>
            <Link to="/">
              <FaFacebookF className="w-6 h-6 hover:scale-110" />
            </Link>
            <Link to="/">
              <FaLinkedin className="w-6 h-6 hover:scale-110" />
            </Link>
            <Link to="/">
              <FaXTwitter className="w-6 h-6 hover:scale-110" />
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
}
