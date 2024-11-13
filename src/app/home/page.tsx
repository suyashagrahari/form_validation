// app/users/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { User, Particle } from "@/types/home.types";
const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
      }))
    );

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://form-validation-backend-5y8x.onrender.com/api/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-50" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(15,23,42,0.1))] animate-pulse" />

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

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />

      <h1 className="text-4xl font-bold mt-10 mb-6 text-white z-10">
        User Cards
      </h1>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl">
        {users.map((user: User) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          particles.map((particle, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 bg-white rounded-full opacity-20 animate-twinkle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
              }}
            />
          ))}
      </div>
    </main>
  );
};

export default UsersPage;
