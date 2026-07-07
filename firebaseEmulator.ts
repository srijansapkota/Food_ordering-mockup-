import { Platform } from 'react-native';
import { getAuth, connectAuthEmulator } from '@react-native-firebase/auth';
import { getFirestore, connectFirestoreEmulator } from '@react-native-firebase/firestore';

if (__DEV__) {
  const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

  connectAuthEmulator(getAuth(), `http://${host}:9099`);
  connectFirestoreEmulator(getFirestore(), host, 8080);

  console.log(`🔥 Connected to Firebase emulators at ${host}`);
}