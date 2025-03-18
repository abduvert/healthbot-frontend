import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const authProviders = {
  email: async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential.user;
  },
};

export const signupUser = async (provider, credentials) => {
  if (!authProviders[provider]) {
    throw new Error(`Auth provider '${provider}' is not supported.`);
  }
  return authProviders[provider](credentials);
};