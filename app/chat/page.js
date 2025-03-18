'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatBox from "../custom-components/chatbox";
import ChatList from "../custom-components/chatlist";
import { useAuth } from "../context/auth";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const [currentChatId, setCurrentChatId] = useState(null);
  const user = useAuth();
  const router = useRouter();

  return (
    <main>
      {user ? (
        <ChatBox currentChatId={currentChatId} />
      ) : (
        <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
          <p className="mb-4 text-lg">Login to continue</p>
          <Button 
            onClick={() => router.push("/login")}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Go to Login
          </Button>
        </div>
      )}
    </main>
  );
}
