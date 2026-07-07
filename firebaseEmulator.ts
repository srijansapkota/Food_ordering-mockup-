import { Platform } from 'react-native';
import { getAuth, connectAuthEmulator } from '@react-native-firebase/auth';
import { getFirestore, connectFirestoreEmulator } from '@react-native-firebase/firestore';

if (__DEV__) {
  const LAN_IP = "192.168.1.120"
  const host = LAN_IP

  connectAuthEmulator(getAuth(), `http://${host}:9099`);
  connectFirestoreEmulator(getFirestore(), host, 8080);

  console.log(`🔥 Connected to Firebase emulators at ${host}`);
}