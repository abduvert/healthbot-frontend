'use client'
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image"; // To use Google logo for styling

const GoogleSignIn = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in: ", user);
      
      // Redirect to the chat page after successful login
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
        {/* <Image 
          src="/google-logo.webp" 
          alt="Google logo" 
          width={24} 
          height={24} 
        /> */}
        <span className="font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignIn;
