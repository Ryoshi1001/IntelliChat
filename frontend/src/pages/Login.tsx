import { useState } from "react";
import RippleGrid from "../components/RippleGrid";
import { ChevronLeft } from "lucide-react";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
  };

  return (
    <div className="min-h-screen relative bg-[var(--bgdark)] flex items-center justify-center max-sm:flex-col sm:justify-evenly">
      {/* Soft blurred background shapes for consistency */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      {/* bg image */}
      <div className="absolute opacity-10 z-0 inset-0 bgimage bg-[url('/logo.png')] bg-no-repeat bg-center bg-contain"></div>

      <div
        style={{ position: "absolute", height: "500px", overflow: "hidden" }}
      >
        <RippleGrid
          enableRainbow={false}
          gridColor="#2A66FF"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div>

      {/* hero content */}
      {/* left side of screen/flex */}
      <img src={"/logo.png"} alt="" className="max-w-[250px] opacity-80" />

      {/* right side of screen/flex */}
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="flex flex-col textlight
      gap-4 bg-white/4 backdrop-blur-md border border-white/20 hover:bg-white/8 text-white px-8 py-4 rounded-2xl text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/2
      "
      >
        <h2 className="flex gap-2 items-center justify-between">
          {currState}
          {isDataSubmitted && (
            <ChevronLeft
              onClick={() => setIsDataSubmitted(false)}
              className="max-w-8 textgray cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded-lg text-sm outline-none"
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
              className="border p-2 rounded-lg text-sm outline-none"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="border p-2 rounded-lg text-sm outline-none"
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            name="bio"
            id="bio"
            className="textlight text-sm border rounded-lg outline-none p-2"
            placeholder="Provide your bio"
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="gradient1 rounded-lg py-2 px-1 text-base cursor-pointer"
        >
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex gap-2">
          <input type="checkbox" required />
          <p className="text-xs font-light">
            Agree to the terms of use & privacy policy
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currState === "Sign Up" ? (
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="textblue cursor-pointer pl-1"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="textblue cursor-pointer pl-1"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
