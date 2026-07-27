import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Local mock auth for UI demos.
 * Later this swaps to Cognito (JWT stored on device).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady] = useState(true);

  const signIn = useCallback(async (email: string, _password: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes('@')) {
      throw new Error('Enter a valid email address.');
    }
    setUser({
      id: 'local-demo-user',
      email: trimmed,
      displayName: trimmed.split('@')[0] || 'Reader',
    });
  }, []);

  const signUp = useCallback(
    async (email: string, _password: string, displayName: string) => {
      const trimmed = email.trim().toLowerCase();
      const name = displayName.trim();
      if (!trimmed.includes('@')) {
        throw new Error('Enter a valid email address.');
      }
      if (name.length < 2) {
        throw new Error('Display name should be at least 2 characters.');
      }
      setUser({
        id: 'local-demo-user',
        email: trimmed,
        displayName: name,
      });
    },
    [],
  );

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isReady, signIn, signUp, signOut }),
    [user, isReady, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
