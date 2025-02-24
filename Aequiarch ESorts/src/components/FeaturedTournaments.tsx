import React from 'react';
import { Calendar, Users, Trophy } from 'lucide-react';

const FeaturedTournaments = () => {
  const tournaments = [
    {
      id: 1,
      title: 'BGMI Pro League',
      prize: '$100,000',
      date: 'March 15-20, 2024',
      teams: '32',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    },
    {
      id: 2,
      title: 'Free Fire World Series',
      prize: '$75,000',
      date: 'April 5-10, 2024',
      teams: '24',
      image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {tournaments.map((tournament) => (
        <div
          key={tournament.id}
          className="group relative overflow-hidden rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="absolute inset-0">
            <img
              src={tournament.image}
              alt={tournament.title}
              className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>
          
          <div className="relative p-6">
            <h3 className="text-2xl font-bold mb-2">{tournament.title}</h3>
            <p className="text-3xl font-bold text-blue-400 mb-4">
              {tournament.prize}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">{tournament.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">{tournament.teams} Teams</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Pro League</span>
              </div>
            </div>
            
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Register Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedTournaments;