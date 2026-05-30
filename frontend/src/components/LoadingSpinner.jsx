export default function LoadingSpinner({ message = "Thinking..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#121214]/40 border border-zinc-800/80 rounded-2xl backdrop-blur-md shadow-xl transition-all duration-300">
      {/* Outer Spinning Orbit Ring */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-500/10 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-purple-500 border-r-purple-500 rounded-full animate-spin"></div>
      </div>
      
      {/* Dynamic Messaging Block */}
      <h3 className="text-sm font-bold text-white tracking-wide animate-pulse m-0">
        {message}
      </h3>
      <p className="text-xs text-zinc-500 mt-1 max-w-[240px]">
        Processing algorithmic array vectors via remote LLM parameters.
      </p>
    </div>
  );
}