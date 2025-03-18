import { getAuth, sendEmailVerification } from "firebase/auth";
import { auth, signInWithEmailAndPassword } from '@/lib/firebase';

export const signInUser = async (email, password) => {
  try {
    // Authenticate the user using Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error('Sign-in failed:', error.message);
    throw error;
  }
};


export const resendEmailVerification = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      await sendEmailVerification(user);
      return { success: true, message: 'Verification email sent! Check your inbox.' };
    } else {
      return { success: false, message: 'No authenticated user found. Please sign in first.' };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Failed to send verification email.' };
  }
};

