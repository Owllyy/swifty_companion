import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../src/AuthContext';

export default function AppLayout() {
  const {accessToken} = useAuth();
  
  if (!accessToken) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }}/>;
}