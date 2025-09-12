import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Briefcase, Volume2, VolumeX } from 'lucide-react';

function App() {
  const [showEnter, setShowEnter] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const videoRef = useRef<HTMLVideoElement>(null);

  const DISCORD_ID = '1405692760446599238';
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
          fadeOut ? 'opacity-0' : 'opacity-100'
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 animate-fade-in">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/images/pfp.png"
                alt="wma Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center justify-center mb-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                wma
              </h1>
              <div className="flex space-x-3">
                <div className="relative group">
                  <img
                    src="/assets/images/gun.gif"
                    alt="Gun Badge"
                    className="w-8 h-8 cursor-pointer"
                  />
                  <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    WMA
                  </span>
                </div>
                <div className="relative group">
                  <img
                    src="/assets/images/gif.gif"
                    alt="Rich Badge"
                    className="w-8 h-8 cursor-pointer"
                  />
                  <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    RICH
                  </span>
                </div>
                <div className="relative group">
                  <img
                    src="/assets/images/verified.png"
                    alt="Verified Badge"
                    className="w-8 h-8 cursor-pointer"
                  />
                  <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Verified
                  </span>
                </div>
                <div className="relative group">
                  <img
                    src="/assets/images/premium.png"
                    alt="Premium Badge"
                    className="w-8 h-8 cursor-pointer"
                  />
                  <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Premium
                  </span>
                </div>
                <div className="relative group">
                  <img
                    src="/assets/images/staff.png"
                    alt="Staff Badge"
                    className="w-8 h-8 cursor-pointer"
                  />
                  <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Staff
                  </span>
                </div>
              </div>
            </div>

            <div className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
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

            <div className="flex justify-center items-center space-x-4 mt-4">
              <img
                src="/assets/images/leftwing.gif"
                alt="Left Wing"
                className="w-12 h-12 transition-transform duration-300 hover:scale-110"
              />

<div className="flex space-x-4 items-center">
  <a href="https://discord.gg/bSNU3HhVek" target="_blank" rel="noopener noreferrer">
    <img
      src="/assets/images/disc.png"
      alt="Discord 1"
      className="w-10 h-10 hover:scale-110 transition-transform"
    />
  </a>

  <a href="https://discord.gg/v5kY4MK99d" target="_blank" rel="noopener noreferrer">
    <img
      src="/assets/images/disc.png"
      alt="Discord 2"
      className="w-10 h-10 hover:scale-110 transition-transform"
    />
  </a>

  <button onClick={copySpotify}>
    <img
      src="/assets/images/spotify.png"
      alt="Spotify"
      className="w-10 h-10 hover:scale-110 transition-transform"
    />
  </button>

  <a href="https://t.me/wmaongunslol" target="_blank" rel="noopener noreferrer">
    <img
      src="/assets/images/telegram.png"
      alt="Telegram"
      className="w-10 h-10 hover:scale-110 transition-transform"
    />
  </a>

  <a href="https://konect.gg/wma" target="_blank" rel="noopener noreferrer">
    <img
      src="/assets/images/b8e8bcf1f99a31dfd9acee872c250196-removebg-preview.png"
      alt="Konect 1"
      className="w-10 h-10 hover:scale-110 transition-transform"
    />
  </a>

  <a href="https://github.com/DevKj-InfiniteHosting" target="_blank" rel="noopener noreferrer">
    <img
      src="/assets/images/208930f3644c3d523e40657dc8ec638e-removebg-preview.png"
      alt="Konect 2"
      className="w-10 h-10 hover:scale-110 transition-transform"
    />
  </a>
</div>
              <img
                src="/assets/images/rightwing.gif"
                alt="Right Wing"
                className="w-12 h-12 transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function InfoMenu() {
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


      {/* Online indicator */}
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
          {isMuted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
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

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
      </div>
    </div>
  );
}

export default App;
