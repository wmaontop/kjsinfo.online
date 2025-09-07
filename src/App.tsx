import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Briefcase } from 'lucide-react';

function App() {
  const [showEnter, setShowEnter] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
          <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-4 animate-pulse tracking-wider">
            CLICK
          </h1>
          <p className="text-2xl md:text-3xl text-white font-light tracking-widest opacity-80">
            TO ENTER
          </p>
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
            <div className="w-1 h-16 bg-white mx-auto mb-8 opacity-80"></div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              wma
            </h1>
            
            <div className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              <p>
                Cybersecurity Pro, HTML, CSS, CPP, C#, JS, Python, Node JS, 
                TypeScript, Pterodactyl Panel, Degrees In Networking + Backend 
                Dev, Cybersecurity, Have Fun.
              </p>
            </div>
            
            {/* Location and Work Info */}
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
          </div>
        </div>
      </div>
      
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 z-20">
        <a
          href="https://discord.gg/v5kY4MK99d"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform duration-300 hover:scale-110 hover:brightness-110"
        >
          <img
            src="/assets/images/rightwing.gif"
            alt="Discord"
            className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </a>
      </div>
      
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 z-20">
        <a
          href="https://discord.gg/v5kY4MK99d"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform duration-300 hover:scale-110 hover:brightness-110"
        >
          <img
            src="/assets/images/leftwing.gif"
            alt="Discord"
            className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </a>
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
