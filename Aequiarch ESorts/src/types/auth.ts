import { Player, Wallet } from './tournament';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface UserProfile extends User {
  player?: Player;
  wallet?: Wallet;
  total_tournaments: number;
  total_winnings: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}