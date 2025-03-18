import { auth, GoogleAuthProvider, signInWithPopup } from '@/lib/firebase';

export const googleAuth = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
