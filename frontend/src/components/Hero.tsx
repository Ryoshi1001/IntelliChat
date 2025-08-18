import RippleGrid from "./RippleGrid";

const Hero = () => {
  return (
    <div className="h-screen relative bg-[var(--bgdark)] flex items-center justify-center">
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
      <div className="flex flex-col items-center gap-8 px-4">
        <div className="text-[#fff] text-3xl lg:text-5xl text-wrap text-center font-bold z-50">
          Welcome to IntelliChat with Chat Assist
        </div>
        <div className="flex flex-row flex-wrap gap-8 items-center justify-center z-50">
          <button className="gradient2 py-2 px-8 rounded-full text-[#fff] font-semibold cursor-pointer hover:scale-105 transition-all duration-300 ">
            SignUp
          </button>
          <button className="gradient1 opacity-80 py-2 px-8 rounded-full text-[#fff] font-semibold cursor-pointer hover:scale-105 transition-all duration-300 ">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
