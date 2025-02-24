import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-32">
        <div className="max-w-3xl">
          <img 
            src="https://i.imgur.com/XYZ123.png" 
            alt="Aequiarch Esports" 
            className="w-32 h-32 mb-8 animate-float"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#0066ff] to-[#0044ff]">
              Aequiarch Esports
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Join the ultimate gaming tournaments and prove your skills in BGMI and Free Fire.
            Compete with the best players worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-neon flex items-center justify-center">
              Register Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300">
              View Tournaments
            </button>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
};

export default HeroSection;