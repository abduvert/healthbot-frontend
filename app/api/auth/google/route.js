import admin from '@/lib/firebase-admin'; 

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) return new Response(JSON.stringify({ error: "No token provided" }), { status: 400 });

    // Verify token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    return new Response(JSON.stringify({
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
    }), { status: 200 });
  } catch (error) {
    console.error("Error verifying Google Sign-In token:", error);
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
