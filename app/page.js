import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2c5364] rounded-full mix-blend-soft-light opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0f2027] rounded-full mix-blend-soft-light opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-[#203a43] rounded-full mix-blend-soft-light opacity-20 animate-pulse delay-500"></div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 flex-grow relative z-10">
        <div className="flex flex-col gap-6 items-center justify-center text-white p-8 lg:p-12">
          {/* Main Heading with Animation */}
          <div className="text-center space-y-4">
            <h1 className={`text-4xl lg:text-6xl font-bold ${poppins.className} leading-tight`}>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                The Ultimate URL Shortener
              </span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Description with Enhanced Styling */}
          <div className="max-w-2xl text-center space-y-6">
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
              Tired of URL shorteners that track your every move or demand endless sign-ups? 
              We get it. That's why we've built the most straightforward URL shortener in the world.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="font-semibold">No Tracking</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <span className="font-semibold">Instant Shortening</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🔒</span>
                </div>
                <span className="font-semibold">Zero Sign-Ups</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">👑</span>
                </div>
                <span className="font-semibold">Your Control</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section with Enhanced Styling */}
        <div className="flex items-center justify-center p-8 lg:p-12 relative">
          <div className="relative w-full max-w-2xl h-96 lg:h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl backdrop-blur-sm border border-white/10"></div>
            <Image 
              className="object-contain mix-blend-luminosity opacity-90 hover:opacity-100 transition-opacity duration-300 p-4"
              alt="Modern URL shortening illustration"
              src={"/vector.jpg"}
              fill={true}
              priority
            />
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="text-white text-center py-6 relative z-10 border-t border-white/10 backdrop-blur-sm">
        <div className="container mx-auto">
          <p className="text-lg font-semibold">Designed by Rohan Yadav</p>
          <p className="text-gray-300 mt-2">Privacy-First URL Shortening Solution</p>
        </div>
      </footer>
    </main>
  );
}