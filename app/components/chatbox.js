'use client';

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase"; // Make sure this is where your Firebase instance is set up
import { signOut as firebaseSignOut } from "firebase/auth"; // Import the signOut function from Firebase
import { useRouter } from "next/navigation";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); 
  const chatContainerRef = useRef(null);
  const sendButtonRef = useRef(null);
  const router = useRouter()

  const user = auth.currentUser; 

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      sendButtonRef.current?.click(); 
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);  
      router.back()
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <Card className="w-full max-w-4xl h-full p-4 relative">
        {/* Sign out button at the top right */}
        <Button
          onClick={handleSignOut}
          className="absolute top-4 right-4 text-sm"
        >
          Sign Out
        </Button>

        <CardContent className="space-y-3 flex flex-col h-full">
          {/* Display user's name */}
          <h1 className="text-2xl font-bold text-center">
            {user ? `Hello, ${user.displayName || user.email}` : "Welcome"}
          </h1>
          
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 rounded-lg flex flex-col space-y-2"
          >
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-xl max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-gray-400 text-white self-end"
                    : "text-black self-start"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="self-start text-black px-4 py-2"
              >
                Bot is typing...
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={loading}
              ref={sendButtonRef}
            >
              {loading ? "..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
