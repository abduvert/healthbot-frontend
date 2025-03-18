'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Check your inbox.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg text-white">
        <h2 className="text-center text-2xl font-bold">Reset Password</h2>
        <Input type="email" placeholder="Enter your email" 
               onChange={(e) => setEmail(e.target.value)}
               className="mt-4 bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500" />
        {message && <p className="text-sm text-yellow-400 mt-2">{message}</p>}
        <Button onClick={handleReset} className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
          Send Reset Link
        </Button>
        <p className="text-center text-sm text-gray-400 mt-4">
          <span onClick={() => router.push('/auth/signin')} className="text-blue-500 hover:underline cursor-pointer">
            Back to Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
