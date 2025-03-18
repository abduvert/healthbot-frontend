'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signInUser, resendEmailVerification } from '@/lib/on-boarding/signin/auth';
import { onAuthStateChanged, reload } from 'firebase/auth';

const SignInPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotVerified, setEmailNotVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await reload(user); 
        if (user.emailVerified) {
          router.push('/chat');
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailNotVerified(false);
    setLoading(true);

    try {
      const userCredential = await signInUser(formData.email, formData.password);
      const user = userCredential.user;

      if (user && user.emailVerified) {
        console.log("User logged in", user);
        router.push('/chat');
      } else {
        setError('Please verify your email before logging in.');
        setEmailNotVerified(true);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleResendVerification = async () => {
    const result = await resendEmailVerification();
    setError(result.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg p-10 bg-gray-800 text-white rounded-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="pl-12 bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="pl-12 pr-12 bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-right text-sm text-blue-500 hover:underline cursor-pointer" 
              onClick={() => router.push('/auth/forgotpassword')}>
              Forgot Password?
            </p>


            {error && <p className="text-red-500 text-sm">{error}</p>}

            {emailNotVerified && (
              <p className="text-yellow-500 text-sm">
                Didn't receive a verification email?{' '}
                <span
                  onClick={handleResendVerification}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Resend Email
                </span>
              </p>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Don't have an account?{' '}
              <span 
                onClick={() => router.push('/')} 
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
