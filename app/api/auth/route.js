// app/api/auth/google-signin/route.js
import { auth, GoogleAuthProvider, signInWithPopup } from '../../../lib/firebase';

export async function POST() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    return new Response(JSON.stringify({ error: "Failed to sign in with Google" }), { status: 500 });
  }
}
