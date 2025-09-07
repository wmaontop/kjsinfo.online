import React, { useEffect, useRef, useState } from "react";
import { MapPin, Briefcase } from "lucide-react";

const DISCORD_USER_ID = "1405692760446599238";

export default function App() {
  const [showEnter, setShowEnter] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (showMain && videoRef.current) {
      videoRef.current.volume = 0.3;
    }
  }, [showMain]);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowEnter(false);
      setShowMain(true);
      if (videoRef.current) videoRef.current.play().catch(() => {});
    }, 800);
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

      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 animate-fade-in">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <div className="w-1 h-16 bg-white mx-auto mb-8 opacity-80" />
            <div className="flex items-center justify-center mb-6 space-x-3">
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                wma
              </h1>
              <LanyardBadge />
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
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>online</span>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />
      </div>
    </div>
  );
}

function LanyardBadge() {
  const [d, setD] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function f() {
      try {
        const res = await fetch(`https://lanyard.cnrad.dev/api/${DISCORD_USER_ID}`);
        const json = await res.json();
        if (mounted) setD(json.data);
      } catch {}
    }
    f();
    const t = setInterval(f, 15000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  if (!d) {
    return (
      <div className="flex items-center space-x-2 bg-transparent">
        <div className="w-6 h-6 rounded-full bg-white/20" />
      </div>
    );
  }

  const statusColor =
    d.discord_status === "online"
      ? "bg-green-400"
      : d.discord_status === "idle"
      ? "bg-yellow-400"
      : d.discord_status === "dnd"
      ? "bg-red-500"
      : "bg-gray-500";

  const activity =
    Array.isArray(d.activities) && d.activities.length > 0
      ? d.activities[0].state || d.activities[0].name || d.activities[0].details || ""
      : "";

  const avatarUrl = d.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${d.discord_user.avatar}.png?size=128`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;

  return (
    <a
      href={`https://discord.com/users/${DISCORD_USER_ID}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center space-x-3 bg-transparent rounded-xl px-2 py-1"
    >
      <div className="relative">
        <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-1 ring-black ${statusColor}`}
          title={d.discord_status}
        />
      </div>

      <div className="flex flex-col items-start text-left text-white/90 leading-tight">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-sm md:text-base">
            {d.discord_user.username}
          </span>
          <span className="text-xs text-white/60">#{d.discord_user.discriminator}</span>
          <div className="relative group">
            <img
              src="/assets/images/gun.gif"
              alt="badge"
              className="w-6 h-6 md:w-7 md:h-7 rounded-sm ml-1"
            />
            <div className="pointer-events-none absolute left-1/2 transform -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <img
                src="/assets/images/wmaontop.png"
                alt="WMAONTOP"
                className="w-28 h-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="text-xs text-white/50 mt-0.5 max-w-xs truncate">
          {activity || "Not doing anything right now"}
        </div>
      </div>
    </a>
  );
}
