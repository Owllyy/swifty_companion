import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

const CLIENT_ID = 'u-s4t2ud-2a656995e76401b0747a6bc0b746e20e6107d71f198648399c528e04b89ccb1c';
const CLIENT_SECRET = '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';
const TOKEN_ENDPOINT = 'https://api.intra.42.fr/oauth/token';
const discovery = {
  authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
};

interface AuthContextValue {
  accessToken: string | null;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth');
  return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['public'],
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  useEffect(() => {
    const exchangeCode = async (code: string) => {
      try {
        const tokenResponse = await fetch(TOKEN_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: makeRedirectUri(),
          }),
        });

        const tokens = await tokenResponse.json();
        if (!tokenResponse.ok) throw new Error("Échec de l'échange du code");

        setAccessToken(tokens.access_token);
        router.replace('/search');

      } catch (e) {
        console.error("Erreur lors de l'échange du code", e);
      }
    };

    if (response?.type === 'success') {
      const { code } = response.params;
      exchangeCode(code);
    }
  }, [response]);
  
  const login = () => {
    if (request) {
      promptAsync();
    }
  };

  const logout = async () => {
    setAccessToken(null);
    router.replace('/');
  };
  
  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};