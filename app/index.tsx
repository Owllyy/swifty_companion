import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useAuth } from '../src/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Se connecter avec 42" onPress={() => login()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});