'use client'
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function ChatList({ setCurrentChatId }) {
  const [chats, setChats] = useState([]);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      const chatsRef = collection(db, "users", user.uid, "chats");
      const querySnapshot = await getDocs(chatsRef);
      const fetchedChats = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(fetchedChats);
    };

    fetchChats();
  }, [user]);

  const handleChatClick = (chatId) => {
    setCurrentChatId(chatId);
  };

  return (
    <div className="w-64 p-4 bg-gray-100 h-full">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className="cursor-pointer p-2 hover:bg-gray-300 rounded-md"
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
