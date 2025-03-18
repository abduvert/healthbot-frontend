import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const signupWithEmail = async (name, email, password) => {
  try {
    // Create user on the client-side
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with name
    await updateProfile(user, { displayName: name });

    return user;
  } catch (error) {
    console.error('Signup failed:', error.message);
    throw error;
  }
};
