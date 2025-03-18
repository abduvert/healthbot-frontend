// src/app/signup/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signupUser } from '@/lib/auth';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const user = await signupUser(formData.name, formData.email, formData.password);
      if (user) {
        router.push('/chat');
      } else {
        setError('Please verify your email before logging in.');
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg p-10 bg-gray-800 text-white rounded-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                className="pl-12 bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="pl-12 pr-12 bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{' '}
              <span 
                onClick={() => router.push('/auth/signin')} 
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
