"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleStartCreating = () => {
    router.push("/registration");
  };

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden relative bg-slate-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-50" />

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(15,23,42,0.1))] animate-pulse" />

      {/* Interactive floating orbs */}
      <div className="absolute inset-0">
        {mounted && (
          <>
            <div
              className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 blur-xl opacity-20 animate-float"
              style={{
                transform: `translate(${mousePosition.x * 20}px, ${
                  mousePosition.y * 20
                }px)`,
                transition: "transform 0.3s ease-out",
              }}
            />
            <div
              className="absolute h-40 w-40 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-20 animate-float animation-delay-2000"
              style={{
                right: "25%",
                top: "25%",
                transform: `translate(${mousePosition.x * -15}px, ${
                  mousePosition.y * -15
                }px)`,
                transition: "transform 0.3s ease-out",
              }}
            />
            <div
              className="absolute h-48 w-48 rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 blur-xl opacity-20 animate-float animation-delay-4000"
              style={{
                left: "15%",
                bottom: "20%",
                transform: `translate(${mousePosition.x * 25}px, ${
                  mousePosition.y * 25
                }px)`,
                transition: "transform 0.3s ease-out",
              }}
            />
          </>
        )}
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />

      {/* Glass effect container */}
      <div className="relative z-10 w-full max-w-4xl mx-4">
        <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Create your account and get started today
          </p>
          <button
            onClick={handleStartCreating}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Start Creating Account
          </button>
        </div>
      </div>

      {/* Subtle particle effect */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 bg-white rounded-full opacity-20 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
      </div>
    </main>
  );
};

export default Home;
