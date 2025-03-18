'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { googleAuth } from '@/lib/on-boarding/google/auth';

const OnBoarding = () => {
  const router = useRouter();

  
  const handleGoogleSignIn = async () => {
    try {
      const user = await googleAuth();
      console.log(user.email);
      router.push("/chat");
    } catch (error) {
      console.error("Google Sign-In failed.");
    }
  };

  const handleSignUp = () => {
    router.push("/auth/signup");
  }

  const handleSignIn = () => {
    router.push("/auth/signin");
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-md p-6 text-center shadow-md bg-white rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Welcome to HealthBot</h1>
        <p className="text-gray-600 mb-6">Sign in to continue</p>
        
        <div className="flex flex-col gap-4">
          <Button onClick={handleSignUp} variant="default" className="w-full cursor-pointer">Sign Up</Button>
          <Button onClick={handleSignIn} variant="outline" className="w-full cursor-pointer">Login</Button>
          <Button onClick={handleGoogleSignIn} className="w-full bg-[#4285F4] hover:bg-[#357AE8] text-white cursor-pointer">
            Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnBoarding;
