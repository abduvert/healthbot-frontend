import { NextResponse } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

// mock response 
  const mockResponses = {
    "hello": "Hi there! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "what is your name": "I'm a chatbot created to assist you!",
    "bye": "Goodbye! Have a great day!",
  };

//   if you dont provide a predefined message
  const reply = mockResponses[message.toLowerCase()] || "I'm not sure how to respond to that. Can you rephrase?";

  return NextResponse.json({ reply });
}
