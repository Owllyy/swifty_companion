
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function AuthCallbackScreen() {
  const { code } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {code ? (
        <View style={styles.codeContainer}>
          <Text style={styles.label}>Connexion réussie !</Text>
          <Text style={styles.label}>Voici votre code temporaire :</Text>
          <Text style={styles.codeText}>{String(code)}</Text>
        </View>
      ) : (
        <View>
          <Text>En attente du code...</Text>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  codeContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  codeText: {
    marginTop: 10,
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#d63384',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
});

// curl -F grant_type=authorization_code \
// -F client_id=u-s4t2ud-2a656995e76401b0747a6bc0b746e20e6107d71f198648399c528e04b89ccb1c \
// -F client_secret=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 \
// -F code=72a6a5afbf5eefdaf47745eb8e9e2a276ca0caa080c8116be48c77376cc6ebb3 \
// -F redirect_uri=swiftycompanion://auth \
// -X POST https://api.intra.42.fr/oauth/token

// curl  -H "Authorization: Bearer 9580590f28b054de0c40bc77994e11b752011bee6cce35b425b846662d86d6aa" "https://api.intra.42.fr/v2/users/lmaurin-"