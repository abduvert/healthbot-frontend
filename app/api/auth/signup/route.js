import admin from '@/lib/firebase-admin'; // Firebase Admin SDK should be initialized here
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ success: false, error: 'No token provided' }, { status: 400 });
    }

    // Verify Firebase token using Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    return NextResponse.json({
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || '',
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  }
}
