import { Link, useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import { useState } from "react";

import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneno, setPhoneno] = useState("");

  const { loginWithGoogle, register, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (!email || !password || !username || !phoneno) {
      toast.error("All fields are required");
      return;
    }

    if (!validatePhone(phoneno)) {
      toast.error("Invalid phone number. Must be 10 digits.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    await register(email, password, username, phoneno);

    if (!error) {
      toast.success("Registered successfully");
      navigate("/", { replace: true });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      
      await loginWithGoogle(username, phoneno);

      if (!error) {
        toast.success("Google login successful!");
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error("Error during Google login:", err.message);
     }
  };

  // Email validation helper
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Phone number validation helper
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 sm:p-8">
      <div className="h-full">
        <img
          src="/images/login.jpg"
          alt="register"
          className="w-full object-cover sm:rounded-lg"
        />
      </div>
      <div
        className="bg-[#313131] p-4 sm:p-8 rounded-lg text-white"
       
      >
        <h2 className="text-2xl my-4 font-bold">Register</h2>
      
      <form  onSubmit={handleRegister}>
        <InputField
          inpLabel="Username"
          inpType="text"
          value={username}
          func={(e) => setUsername(e.target.value)}
        />
        <InputField
          inpLabel="Phone number"
          inpType="tel"
          value={phoneno}
          func={(e) => setPhoneno(e.target.value)}
        />
        <InputField
          inpLabel="Email"
          inpType="email"
          value={email}
          func={(e) => setEmail(e.target.value)}
        />
        <InputField
          inpLabel="Password"
          inpType="password"
          value={password}
          func={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          disabled={loading}
          className="bg-[#039e53] hover:bg-green-500 transition-colors p-2 rounded-lg text-white font-bold text-sm w-full"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        </form>
        <p className="mt-2">
          Already have an account?
          <Link
            to="/login"
            className="text-green-500 ms-2 underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>

        <div className="text-center my-4 border-b-2 pb-4 border-green-500">
          Or
        </div>

        <button
          type="button"
          className="google-button mx-auto flex items-center justify-center gap-2 p-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition-colors text-black"
          onClick={handleGoogleLogin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 262"
            className="h-6 w-6"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
