import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { AuthState, User, UserProfile } from '../types/auth';

interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      set({ user: data.user as User });
      await get().loadProfile();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      set({ loading: true, error: null });
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw authError;

      const { error: profileError } = await supabase.from('profiles').insert({
        user_id: authData.user!.id,
        username,
      });
      if (profileError) throw profileError;

      set({ user: authData.user as User });
      await get().loadProfile();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, profile: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  loadProfile: async () => {
    try {
      const user = get().user;
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          player:players(*),
          wallet:wallets(*),
          achievements(*)
        `)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      set({ profile: data as UserProfile });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateProfile: async (data: Partial<UserProfile>) => {
    try {
      const user = get().user;
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', user.id);

      if (error) throw error;
      await get().loadProfile();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    useAuthStore.setState({ 
      user: session.user as User,
      loading: false 
    });
    useAuthStore.getState().loadProfile();
  } else {
    useAuthStore.setState({ 
      user: null, 
      profile: null,
      loading: false 
    });
  }
});