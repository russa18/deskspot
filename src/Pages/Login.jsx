import { useState } from "react";
import InputField from "../Components/InputField";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loginWithGoogle, error, loading } = useAuthStore(); // Zustand store actions and state
  const navigate = useNavigate();

  // Email/password login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    const success = await login(email, password);

    if (success) {
      navigate("/", { replace: true });
      toast.success("Logged in successfully");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      if (!error) {
        toast.success("Google login successful!");
        navigate("/", { replace: true }); // Navigate to the homepage
      }
    } catch (err) {
      toast.error("Error during Google login:", err.message);
    }
  };

  // Email validation helper
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 sm:p-8">
      {/* Left Side Image */}
      <div className="h-full">
        <img
          src="/images/login.jpg"
          alt="login"
          className="w-full object-cover sm:rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="bg-[#313131] p-4 sm:p-8 md:p-12 rounded-lg text-white">
        <h2 className="text-2xl my-4 font-bold">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Input Fields */}
          <InputField
            inpLabel="Email"
            inpType="email"
            func={(e) => setEmail(e.target.value)}
          />
          <InputField
            inpLabel="Password"
            inpType="password"
            func={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#039e53] hover:bg-green-500 transition-colors p-2 rounded-lg text-white font-bold text-sm w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-2">
          {`Don't have an account?`}
          <Link
            to="/register"
            className="text-green-500 ms-2 underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>

        {/* Divider */}
        <div className="text-center my-4 border-b-2 pb-4 border-green-500">
          Or
        </div>

        {/* Google Login Button */}
        <button
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

export default Login;
