import React, { useState, useEffect } from 'react';
import { Clock, Users, Trophy, Gamepad2 } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TournamentStats {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-05-01T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    const timeLeft: TimeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats: TournamentStats[] = [
    { icon: <Users className="w-5 h-5" />, value: '250', label: 'players' },
    { icon: <Trophy className="w-5 h-5" />, value: '140', label: 'matches' },
    { icon: <Gamepad2 className="w-5 h-5" />, value: '430', label: 'games' },
  ];

  return (
    <div className="glass-effect p-8 rounded-2xl animate-on-scroll fade-in delay-300">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Paragon Orlando 2024</h2>
        <p className="text-gray-400">17th & 18th January • Rosen Plaza Hotel International Drive</p>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">Early Registration Ends In</h3>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center glass-effect p-4 rounded-xl">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-400 capitalize">{unit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 glass-effect rounded-xl">
            <div className="flex justify-center mb-2 text-blue-400">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;