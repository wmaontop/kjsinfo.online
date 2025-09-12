import React, { useState, useEffect, useRef } from "react";
import { MapPin, Briefcase, Volume2, VolumeX, ChevronDown } from "lucide-react";

function InfoMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-30">
      {/* Info button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-black bg-opacity-40 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-opacity-70 transition flex items-center gap-1"
      >
        Info
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="mt-2 bg-black bg-opacity-80 rounded-lg shadow-lg p-2 space-y-1">
          <a
            href="https://cutz.lol/cutz"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-white text-sm hover:bg-white hover:text-black transition"
          >
            cutz.lol/cutz
          </a>
          <a
            href="https://guns.lol/wma"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-white text-sm hover:bg-white hover:text-black transition"
          >
            guns.lol/wma
          </a>
        </div>
      )}
    </div>
  );
}

function App() {
  const [showEnter, setShowEnter] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const videoRef = useRef<HTMLVideoElement>(null);

  const DISCORD_ID = "1405692760446599238";
  const DISCORD_STATUS_IMG = `https://lanyard.cnrad.dev/api/${DISCORD_ID}?bg=0000&hideTag=true`;

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowEnter(false);
      setShowMain(true);
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    }, 800);
  };

  useEffect(() => {
    if (showMain && videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [showMain, volume]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const copySpotify = async () => {
    try {
      await navigator.clipboard.writeText("https://pornhub.com");
      alert("no nigga die!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (showEnter) {
    return (
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center cursor-pointer transition-opacity duration-800 z-50 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleEnter}
      >
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 tracking-wider">
            CLICK
          </h1>
        </div>
      </div>
    );
  }

  if (!showMain) return null;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted={false}
        loop
        playsInline
      >
        <source src="/assets/video/gunslol.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Info menu */}
      <InfoMenu />

      {/* Online indicator */}
      <div className="fixed top-14 left-4 text-white text-sm opacity-60 z-20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>online</span>
        </div>
      </div>

      {/* Volume controls */}
      <div className="fixed top-4 right-4 z-30 group">
        <div
          className="bg-black bg-opacity-40 rounded-full p-2 cursor-pointer hover:bg-opacity-60 transition"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="text-white" />
          ) : (
            <Volume2 className="text-white" />
          )}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 cursor-pointer"
          />
        </div>
      </div>

      {/* Main content (profile, links, etc.) */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 animate-fade-in">
        {/* ... your profile + badges + social links here ... */}
      </div>

      {/* Bottom fade line */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
      </div>
    </div>
  );
}

export default App;
