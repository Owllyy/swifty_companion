import { Stack } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { AuthProvider } from '../src/AuthContext';

WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}