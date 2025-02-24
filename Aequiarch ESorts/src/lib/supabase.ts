import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getTournaments = async () => {
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .order('startDate', { ascending: true });

  if (error) throw error;
  return data;
};

export const createTournament = async (tournament: Omit<Tournament, 'id'>) => {
  const { data, error } = await supabase
    .from('tournaments')
    .insert(tournament)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateMatch = async (matchId: string, result: MatchResult[]) => {
  const { data, error } = await supabase
    .from('matches')
    .update({ results: result, status: 'COMPLETED' })
    .eq('id', matchId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getWallet = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*, transactions(*)')
    .eq('userId', userId)
    .single();

  if (error) throw error;
  return data;
};