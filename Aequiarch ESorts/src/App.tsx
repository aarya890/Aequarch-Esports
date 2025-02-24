import React, { useEffect } from 'react';
import { Trophy, Users, Gamepad2, Flame, ArrowRight } from 'lucide-react';
import TournamentLeaderboard from './components/TournamentLeaderboard';
import LiveMatches from './components/LiveMatches';
import FeaturedTournaments from './components/FeaturedTournaments';
import HeroSection from './components/HeroSection';
import ParticleBackground from './components/ParticleBackground';
import CountdownTimer from './components/CountdownTimer';
import { initScrollAnimations } from './utils/scrollAnimations';

function App() {
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-red-900/10 pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=1920&q=80')] opacity-5 mix-blend-overlay pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="https://i.imgur.com/XYZ123.png" 
                alt="Aequiarch Esports" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#0066ff]">
                Aequiarch Esports
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#tournaments" className="hover:text-blue-400 transition-colors">Tournaments</a>
              <a href="#leaderboard" className="hover:text-blue-400 transition-colors">Leaderboard</a>
              <a href="#matches" className="hover:text-blue-400 transition-colors">Live Matches</a>
              <button className="btn-neon">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />

        {/* Countdown Timer */}
        <section className="relative py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              <CountdownTimer />
            </div>
          </div>
        </section>

        {/* Featured Games Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll fade-in">
              Featured Tournaments
            </h2>
            <div className="animate-on-scroll slide-up delay-200">
              <FeaturedTournaments />
            </div>
          </div>
        </section>

        {/* Live Matches */}
        <section className="relative py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll fade-in">
              Live Matches
            </h2>
            <div className="animate-on-scroll slide-up delay-200">
              <LiveMatches />
            </div>
          </div>
        </section>

        {/* Tournament Leaderboard */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll fade-in">
              Tournament Leaderboard
            </h2>
            <div className="animate-on-scroll scale-up delay-200">
              <TournamentLeaderboard />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center animate-on-scroll fade-in">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src="https://i.imgur.com/XYZ123.png" 
                alt="Aequiarch Esports" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold">Aequiarch Esports</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;