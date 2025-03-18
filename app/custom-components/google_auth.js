'use client'
import {useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const GoogleSignIn = () => {
  const router = useRouter();
  const [locale, setLocale] = useState(null);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userLocale = user.providerData[0].language;

      console.log("User signed in: ", user);
      setLocale(userLocale);  
      console.log(locale);
      router.push("/chat"); 
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-center mb-2">Welcome to Chatbot</h1>
      <p className="text-lg text-center mb-6">Sign in with Google to continue</p>

      <button
        onClick={handleSignIn}
        className="flex items-center justify-center gap-3 bg-[#4285F4] text-white rounded-lg py-3 px-6 shadow-lg hover:bg-[#357AE8] transition-all duration-300 ease-in-out"
      >
        <span className="font-medium cursor-pointer">Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignIn;
