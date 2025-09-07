import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Briefcase } from 'lucide-react';

function App() {
  const [showEnter, setShowEnter] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const DISCORD_ID = '1405692760446599238';
  const DISCORD_INVITE = 'https://discord.gg/v5kY4MK99d';
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
      videoRef.current.volume = 0.3;
    }
  }, [showMain]);

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
              <div className="flex space-x-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src="/assets/images/gun.gif"
                      alt="Badge"
                      className="w-12 h-12 cursor-pointer"
                    />
                    <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      WMA
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              <p>
                Cybersecurity Pro, HTML, CSS, CPP, C#, JS, Python, Node JS,
                TypeScript, Pterodactyl Panel, Degrees In Networking + Backend
                Dev, Cybersecurity, Have Fun.
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

            {/* Embedded Lanyard Status */}
            <div className="flex justify-center mb-6">
              <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                <img
                  src={DISCORD_STATUS_IMG}
                  alt="Discord Status"
                  className="rounded-xl shadow-lg"
                />
              </a>
            </div>

            {/* Wings under status */}
            <div className="flex justify-center space-x-4 mt-4">
              <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                <img
                  src="/assets/images/leftwing.gif"
                  alt="Left Wing"
                  className="w-12 h-12 transition-transform duration-300 hover:scale-110"
                />
              </a>
              <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                <img
                  src="/assets/images/rightwing.gif"
                  alt="Right Wing"
                  className="w-12 h-12 transition-transform duration-300 hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-4 right-4 text-white text-sm opacity-60 z-20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>online</span>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
      </div>
    </div>
  );
}

export default App;
