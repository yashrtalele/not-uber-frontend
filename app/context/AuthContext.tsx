import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onSignup?: (username: string, password: string) => Promise<any>;
  onSignin?: (username: string, password: string) => Promise<any>;
  onSignout?: () => Promise<any>;
}

export const API_URL = 'http://localhost:3000';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: any) {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: false });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('authToken');
      console.log('stored: ', token);
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);
  const signup = useCallback(async (username: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/user/signup`, { username, password });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  }, []);

  const signin = useCallback(async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/user/signin/`, {
        username,
        password,
      });
      console.log('🚀 ~ file: AuthContext.tsx:signin ~ result: ', result);
      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync('authToken', result.data.token);
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  }, []);

  const signout = useCallback(async () => {
    await SecureStore.deleteItemAsync('authToken');
    await axios.get(`${API_URL}/user/signout/`);
    setAuthState({ token: null, authenticated: false });
    delete axios.defaults.headers.common.Authorization;
  }, []);

  const value = useMemo(
    () => ({
      onSignup: signup,
      onSignin: signin,
      onSignout: signout,
      authState,
    }),
    [signup, signin, signout, authState],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
