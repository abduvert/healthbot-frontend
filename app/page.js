'use client'
import Script from "next/script";
import { useEffect } from "react";
import OnBoarding from "./auth/on-boarding/page";

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
      <OnBoarding />
    </main>
  );
}
