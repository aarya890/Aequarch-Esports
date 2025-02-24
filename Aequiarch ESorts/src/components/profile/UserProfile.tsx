import React from 'react';
import { Trophy, Star, Award, Medal, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import WalletCard from '../WalletCard';

const UserProfile: React.FC = () => {
  const { profile } = useAuthStore();

  if (!profile) return null;

  const achievements = [
    {
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      title: 'Tournament Victor',
      description: 'Won first place in a tournament',
    },
    {
      icon: <Star className="w-6 h-6 text-purple-400" />,
      title: 'Rising Star',
      description: 'Participated in 10 tournaments',
    },
    {
      icon: <Award className="w-6 h-6 text-blue-400" />,
      title: 'Sharpshooter',
      description: 'Achieved 100+ kills in tournaments',
    },
    {
      icon: <Medal className="w-6 h-6 text-green-400" />,
      title: 'Team Leader',
      description: 'Led team to victory',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
              {profile.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.username}</h2>
              <p className="text-gray-400">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">
                {profile.total_tournaments}
              </p>
              <p className="text-sm text-gray-400">Tournaments</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-400">
                ${profile.total_winnings}
              </p>
              <p className="text-sm text-gray-400">Total Winnings</p>
            </div>
          </div>

          {profile.player && (
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xl font-bold">{profile.player.stats.kills}</p>
                  <p className="text-sm text-gray-400">Kills</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xl font-bold">{profile.player.stats.wins}</p>
                  <p className="text-sm text-gray-400">Wins</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xl font-bold">
                    {profile.player.stats.matchesPlayed}
                  </p>
                  <p className="text-sm text-gray-400">Matches</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xl font-bold">
                    {((profile.player.stats.kills / profile.player.stats.deaths) || 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">K/D Ratio</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wallet */}
        <div className="lg:col-span-2">
          {profile.wallet && (
            <WalletCard
              wallet={profile.wallet}
              onDeposit={() => {}}
              onWithdraw={() => {}}
            />
          )}

          {/* Achievements */}
          <div className="glass-effect rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold mb-6">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg"
                >
                  <div className="p-3 bg-white/10 rounded-lg">
                    {achievement.icon}
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;