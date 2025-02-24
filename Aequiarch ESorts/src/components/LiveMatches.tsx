import React from 'react';

const LiveMatches = () => {
  const matches = [
    {
      id: 1,
      team1: 'Nova Esports',
      team2: 'Team Soul',
      game: 'BGMI',
      viewers: '45.2K',
      score: '2 - 1',
    },
    {
      id: 2,
      team1: 'Total Gaming',
      team2: 'Guild Esports',
      game: 'Free Fire',
      viewers: '32.8K',
      score: '1 - 1',
    },
    {
      id: 3,
      team1: 'Godlike',
      team2: 'TSM Entity',
      game: 'BGMI',
      viewers: '28.4K',
      score: '0 - 0',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match) => (
        <div
          key={match.id}
          className="relative backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-red-500/10 rounded-xl" />
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <span className="text-red-500">● LIVE</span>
              <span className="text-gray-400">{match.viewers} watching</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="text-center flex-1">
                <p className="font-bold text-lg">{match.team1}</p>
              </div>
              <div className="text-center px-4">
                <p className="text-2xl font-bold text-blue-400">{match.score}</p>
                <p className="text-sm text-gray-400">{match.game}</p>
              </div>
              <div className="text-center flex-1">
                <p className="font-bold text-lg">{match.team2}</p>
              </div>
            </div>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              Watch Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveMatches;