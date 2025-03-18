'use client'
import { useState } from "react";
import ChatBox from "../custom-components/chatbox";
import ChatList from "../custom-components/chatlist";

export default function Chat() {
  const [currentChatId, setCurrentChatId] = useState(null);

  return (
    <main>
      {/* <ChatList setCurrentChatId={setCurrentChatId} /> */}
      <ChatBox currentChatId={currentChatId}/>
    </main>
  );
}
