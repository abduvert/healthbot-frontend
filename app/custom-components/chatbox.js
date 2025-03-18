'use client';

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase"; // Firebase instance and db
import { signOut as firebaseSignOut } from "firebase/auth"; // Firebase sign out
import { useRouter } from "next/navigation";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore"; // Firebase Firestore imports

export default function ChatBox({ currentChatId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const chatContainerRef = useRef(null);
  const sendButtonRef = useRef(null);
  const router = useRouter();

  const user = auth.currentUser;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!currentChatId) return; // Early return if no current chat
    const messagesRef = collection(db, "users", user.uid, "chats", currentChatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc")); // Query to order messages by timestamp
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => doc.data());
      setMessages(fetchedMessages);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [currentChatId]);

  const sendMessage = async () => {
    if (!input.trim() || !currentChatId) return;

    // User message
    const userMessage = {
      sender: "user",
      text: input,
    };

    const messagesRef = collection(db, "users", user.uid, "chats", currentChatId, "messages");
    await addDoc(messagesRef, userMessage); // Save the user message

    setInput("");
    setLoading(true);

    // Send to the backend (assuming it calls an AI for a response)
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = {
      sender: "bot",
      text: data.reply,
      timestamp: new Date(),
    };

    await addDoc(messagesRef, botMessage); // Save the bot's reply message
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      sendButtonRef.current?.click(); // Trigger button click on Enter
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth); // Sign out user
      router.back();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handlePayments = async()=>{
    try {
      router.push('/checkout');
    } catch (error) {
      console.error("Error making a payment:", error.message);
      
    }
  }

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <Card className="w-full max-w-4xl h-full p-4 relative">
        {/* Pay button at the top right */}
        <Button onClick={handlePayments} className="absolute cursor-pointer text-sm">
          Pay
        </Button>
        {/* Sign out button at the top right */} 
        <Button onClick={handleSignOut} className="absolute cursor-pointer top-4 right-4 text-sm">
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
                  msg.sender === "user" ? "bg-gray-400 text-white self-end" : "text-black self-start"
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
            <Button onClick={sendMessage} disabled={loading} ref={sendButtonRef}>
              {loading ? "..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
