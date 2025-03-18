'use client'
import Chat from "./chat/page";
import GoogleSignInButton from "./custom-components/google_auth";
import Script from "next/script";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    script.async = true;
    script.onload = () => {
      console.log("Square SDK loaded");
    };
    document.body.appendChild(script);
  }, []);
  
  return (
    <main>
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Square SDK loaded!")}
      />
      <GoogleSignInButton />
    </main>
  );
}
