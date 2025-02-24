import React from 'react';
import { Trophy } from 'lucide-react';

const TournamentLeaderboard = () => {
  const leaderboardData = [
    { rank: 1, team: 'Nova Esports', points: 2850, prize: '$50,000' },
    { rank: 2, team: 'Team Soul', points: 2720, prize: '$25,000' },
    { rank: 3, team: 'Godlike', points: 2680, prize: '$10,000' },
    { rank: 4, team: 'TSM Entity', points: 2590, prize: '$5,000' },
    { rank: 5, team: 'Guild Esports', points: 2485, prize: '$2,500' },
  ];

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Team</th>
              <th className="px-6 py-4 text-right">Points</th>
              <th className="px-6 py-4 text-right">Prize</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((team) => (
              <tr
                key={team.rank}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {team.rank === 1 && (
                      <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                    )}
                    #{team.rank}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{team.team}</td>
                <td className="px-6 py-4 text-right">{team.points}</td>
                <td className="px-6 py-4 text-right text-green-400">
                  {team.prize}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TournamentLeaderboard;