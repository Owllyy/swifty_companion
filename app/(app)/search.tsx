import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../src/AuthContext';

interface User {
  login: string;
  displayname: string;
  email: string;
  image: {
    link: string;
  };
}

export default function SearchScreen() {
  const { accessToken } = useAuth();

  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foundUser, setFoundUser] = useState<User | null>(null);

  const handleSearch = async () => {
    if (!username.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un pseudonyme.');
      return;
    }
    if (!accessToken) {
      Alert.alert('Erreur', 'Vous n\'êtes pas authentifié.');
      return;
    }

    setIsLoading(true);
    setFoundUser(null);

    try {
      const response = await fetch(`https://api.intra.42.fr/v2/users/${username.trim().toLowerCase()}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 404) {
        Alert.alert('Introuvable', `L'utilisateur "${username}" n'a pas été trouvé.`);
        return;
      }
      if (!response.ok) {
        throw new Error('Une erreur réseau est survenue.');
      }
      
      const userData: User = await response.json();
      setFoundUser(userData);

    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'La recherche a échoué.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rechercher un utilisateur</Text>
      <TextInput
        style={styles.input}
        placeholder="Pseudonyme de l'utilisateur"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Rechercher" onPress={handleSearch} disabled={isLoading} />

      {isLoading && <ActivityIndicator style={styles.loader} size="large" />}

      {foundUser && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Utilisateur trouvé :</Text>
          <Text>Login: {foundUser.login}</Text>
          <Text>Nom: {foundUser.displayname}</Text>
          <Text>Email: {foundUser.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  loader: { marginTop: 20 },
  resultContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});