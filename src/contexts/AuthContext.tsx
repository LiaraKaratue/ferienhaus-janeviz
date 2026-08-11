import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Parameters<typeof AuthContext.Provider>[0]['value']['user']>(null);
  const [session, setSession] = useState<Parameters<typeof AuthContext.Provider>[0]['value']['session']>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        checkUserRole(user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserRole(session.user.id);
      } else {
        setIsAdmin(false);
        setIsGuest(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRole = async (userId: string) => {
    if (!supabase) return;

    // Check if user is admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .single();
    
    setIsAdmin(!!adminData);

    // Check if user has guest access
    const { data: guestData } = await supabase
      .from('guest_access')
      .select('id')
      .eq('user_id', userId)
      .gt('access_expires_at', new Date().toISOString())
      .limit(1);
    
    setIsGuest((guestData ?? []).length > 0);
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: new Error('Database not available') };
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  };

  const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
    if (!supabase) return { error: new Error('Database not available') };
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isGuest, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
