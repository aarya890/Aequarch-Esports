import React from 'react';
import { format } from 'date-fns';
import { Trophy, Users, Calendar, Gamepad2 } from 'lucide-react';
import type { Tournament } from '../types/tournament';

interface TournamentCardProps {
  tournament: Tournament;
  onRegister: (tournamentId: string) => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onRegister }) => {
  const statusColors = {
    UPCOMING: 'text-blue-400',
    ONGOING: 'text-green-400',
    COMPLETED: 'text-gray-400'
  };

  return (
    <div className="glass-effect rounded-xl overflow-hidden">
      <div className="relative h-48">
        <img
          src={tournament.game === 'BGMI' 
            ? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
            : 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80'
          }
          alt={tournament.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white mb-1">{tournament.title}</h3>
          <span className={`text-sm font-medium ${statusColors[tournament.status]}`}>
            {tournament.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5 text-blue-400" />
            <span>{tournament.game}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span>{tournament.format}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span>{format(new Date(tournament.startDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-blue-400" />
            <span>${tournament.prizePool.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span>Entry Fee</span>
            <span className="font-medium">${tournament.entryFee}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Teams</span>
            <span className="font-medium">
              {tournament.registeredTeams}/{tournament.maxTeams}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(tournament.registeredTeams / tournament.maxTeams) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => onRegister(tournament.id)}
          disabled={tournament.status !== 'UPCOMING' || tournament.registeredTeams >= tournament.maxTeams}
          className="w-full mt-6 btn-neon disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {tournament.status === 'UPCOMING' 
            ? tournament.registeredTeams >= tournament.maxTeams 
              ? 'Tournament Full'
              : 'Register Now'
            : tournament.status === 'ONGOING'
              ? 'View Matches'
              : 'View Results'
          }
        </button>
      </div>
    </div>
  );
};

export default TournamentCard;