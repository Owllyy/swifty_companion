import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

const discovery = {
  authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
};

WebBrowser.maybeCompleteAuthSession();

export default function GetAuthentificationCode() {
  const router = useRouter();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'u-s4t2ud-2a656995e76401b0747a6bc0b746e20e6107d71f198648399c528e04b89ccb1c',
      scopes: ['public'],
      redirectUri: makeRedirectUri()
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      router.replace({
        pathname: '/auth',
        params: { code: code },
      });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Lancer la connexion 42"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});