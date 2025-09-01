import { useContext, useState } from "react";
import RippleGrid from "../components/RippleGrid";
import { ChevronLeft } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext)!;

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen max-sm:pb-10 max-sm:pt-4 max-sm:px-4 relative bg-primary flex items-center justify-center max-sm:flex-col sm:justify-evenly overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated background gradients */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-500/15 via-blue-600/8 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/5 via-cyan-500/5 to-indigo-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Logo background overlay */}
      <div className="absolute opacity-5 z-0 inset-0 bg-[url('/logo.svg')] bg-no-repeat bg-center bg-contain"></div>

      {/* Enhanced Ripple Grid */}
      <div
        className="absolute inset-0 z-10"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <RippleGrid
          enableRainbow={false}
          gridColor="rgba(20, 114, 192, 0.4)"
          rippleIntensity={0.08}
          gridSize={12}
          gridThickness={1}
          mouseInteraction={true}
          mouseInteractionRadius={1.5}
          opacity={0.4}
        />
      </div>

      {/* Logo Section */}
      <div className="relative z-20 flex flex-col items-center max-sm:mb-8">
        <div className="relative">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-2xl rounded-full transform scale-110"></div>
          <img
            src="/logo.svg"
            alt="AI Chat Logo"
            className="relative max-w-[280px] opacity-90 filter drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Welcome text */}
        <div className="mt-6 text-center fade-in">
          <h1 className="text-2xl font-bold text-primary bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Welcome to IntelliChat with Chat Assist *
          </h1>
          <p className="max-sm:text-[#fff]! text-tertiary mt-2 text-sm">
            Connect and communicate seemlessly with AI
          </p>
        </div>
      </div>

      {/* Enhanced Form Container */}
      <form
        onSubmit={onSubmitHandler}
        className="relative z-20 flex flex-col gap-5 glass-card p-8 w-full max-w-md mx-4 transition-all duration-500 hover:glass-card-hover slide-up"
      >
        {/* Form Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-primary bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {currState}
          </h2>
          {isDataSubmitted && (
            <ChevronLeft
              onClick={() => setIsDataSubmitted(false)}
              className="w-6 h-6 text-muted hover:text-accent cursor-pointer transition-colors duration-200 hover:scale-110"
            />
          )}
        </div>

        {/* Progress indicator for Sign up */}
        {currState === "Sign up" && (
          <div className="flex gap-2 mb-4">
            <div
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                !isDataSubmitted ? "surface-primary" : "bg-[#fff]"
              }`}
            ></div>
            <div
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                isDataSubmitted ? "surface-primary" : "surface-primary"
              }`}
            ></div>
          </div>
        )}

        {/* Form Fields */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            className="glass-input p-4 rounded-xl text-sm outline-none transition-all duration-300 sm:placeholder:text-[#fff]!"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              className="glass-input p-4 rounded-xl text-sm outline-none transition-all duration-300 sm:placeholder:text-[#fff]!"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="glass-input p-4 rounded-xl text-sm outline-none transition-all duration-300 sm:placeholder:text-[#fff]!"
              required
              minLength={6}
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            name="bio"
            id="bio"
            className="glass-input text-sm rounded-xl outline-none p-4 resize-none transition-all duration-300 sm:placeholder:text-[#fff]!"
            placeholder="Tell us about yourself (optional)"
          ></textarea>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary py-4 px-6 text-base font-semibold transition-all duration-300 mt-2"
        >
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mt-2">
          <input
            type="checkbox"
            required
            className="mt-1 w-4 h-4 text-accent bg-surface-primary border-primary rounded focus:ring-accent focus:ring-2"
          />
          <p className="text-xs text-tertiary leading-relaxed">
            I agree to the{" "}
            <span className="text-accent hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-accent hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>

        {/* Toggle Auth State */}
        <div className="flex items-center justify-center pt-4 border-t border-primary">
          {currState === "Sign up" ? (
            <p className="text-sm text-secondary">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="text-accent hover:text-blue-400 cursor-pointer font-medium hover:underline transition-colors duration-200"
              >
                Sign in here
              </span>
            </p>
          ) : (
            <p className="text-sm text-secondary">
              Don't have an account?{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className="text-accent hover:text-blue-400 cursor-pointer font-medium hover:underline transition-colors duration-200"
              >
                Create one
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
