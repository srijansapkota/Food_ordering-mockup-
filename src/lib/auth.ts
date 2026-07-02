import auth  from "@react-native-firebase/auth";

const handleSignup = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log('User signed up:', userCredential.user);
  } catch (error) {
    console.error('Signup error:', error);
  }
};
export default handleSignup;

export const handleSignin = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('User signed in:', userCredential.user);
  } catch (error) {
    console.error('Signin error:', error);
  }
};

export const handleSignout = async () => {
  try {
    await auth().signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Signout error:', error);
  }
};