// components/Loading.js
export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-32 h-16">
          {/* First Wave */}
          <div className="absolute top-0 left-0 w-full h-8 bg-yellow-500 rounded-t-full animate-wave1"></div>
          {/* Second Wave */}
          <div className="absolute top-4 left-0 w-full h-8 bg-yellow-600 rounded-t-full animate-wave2"></div>
        </div>
      </div>
    );
  }
  