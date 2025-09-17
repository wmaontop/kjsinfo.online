import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Briefcase,
  Volume2,
  VolumeX,
  ChevronDown,
  Github,
  DiscIcon,
  Send,
  Music,
  Link,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function InfoMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-30">
      <button
        onClick={() => setOpen(!open)}
        className="bg-black bg-opacity-40 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-opacity-70 transition flex items-center gap-1"
      >
        Info
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

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

function useLiveData() {
  const [data, setData] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      time: i,
      requests: Math.floor(Math.random() * 100),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint = {
          time: prev.length,
          requests: Math.floor(Math.random() * 100),
        };
        return [...prev.slice(-19), newPoint];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return data;
}

function LiveRequestsGraph() {
  const data = useLiveData();
  return (
    <div className="flex flex-col items-center mb-6 bg-blue-900 rounded-xl p-4 w-full max-w-lg mx-auto shadow-lg">
      <h2 className="text-white text-lg mb-2 font-semibold">kjsinfo.online Live Requests</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#1e3a8a", borderRadius: 8, border: "none" }} />
          <Line type="monotone" dataKey="requests" stroke="#00BFFF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
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

  const DISCORD_ID = "1415042756409299155";
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
      await navigator.clipboard.writeText(
        "https://open.spotify.com/user/2t9ikdd3z7c3fslt880low0mx?si=2ee584b890134e5c"
      );
      alert("Spotify profile copied!");
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

      <InfoMenu />

      <div className="fixed top-14 left-4 text-white text-sm opacity-60 z-20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>online</span>
        </div>
      </div>

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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 animate-fade-in">
        <div className="text-center max-w-4xl">
          <div className="flex justify-center mb-4">
            <img
              src="/assets/images/pfp.png"
              alt="wma Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            wma
          </h1>

          <div className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            <p>
              Cybersecurity Pro, HTML, CSS, CPP, C#, JS, Python, Node JS,
              TypeScript, Pterodactyl Panel, Degrees In Networking + Backend
              Dev, Cybersecurity, Have Fun. OWNER/Dev in P-Tools
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-gray-400 mb-12">
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Ohio</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase size={16} />
              <span>Cybersecurity</span>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src={DISCORD_STATUS_IMG}
              alt="Discord Status"
              className="rounded-xl shadow-lg pointer-events-none"
            />
          </div>

          <LiveRequestsGraph />

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="https://github.com/wmaontop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-200 transition"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://discord.gg/74HVz9sqGy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-700 transition"
            >
              <DiscIcon size={18} /> Discord
            </a>
            <a
              href="https://t.me/wmaongunslol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-sky-600 transition"
            >
              <Send size={18} /> Telegram
            </a>
            <button
              onClick={copySpotify}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-600 transition"
            >
              <Music size={18} /> Spotify
            </button>
            <a
              href="https://konect.gg/wma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-800 transition"
            >
              <Link size={18} /> Konect
            </a>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
      </div>
    </div>
  );
}

export default App;
