"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bot, User, Send, X, Copy, Download, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const api = `AIzaSyBr0gKsyL5W4ECCKezISxxrb9Lrey9bM5E`
const genAI = new GoogleGenerativeAI(api!);

const SYSTEM_CONTEXT = `
    I am your AI Tutor, ready to help with any relevant queries.
    I am only reddy for the studies related only.
    If any query is not related to studies then I will not be able to help you.
    if not then reply like this "I will only help related to studies".
`;

const BANNED_WORDS = ["profanity", "abusive", "inappropriate", "banned"];

export default function AISupportAssistant() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem("aiChatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("aiChatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const containsBannedWords = (text) => {
    return BANNED_WORDS.some((word) => text.toLowerCase().includes(word));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (containsBannedWords(input)) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, your message contains inappropriate content. Please refrain from using banned words/phrases.",
        },
      ]);
      setInput("");
      return;
    }

    try {
      const userMessage = {
        role: "user",
        content: input.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: SYSTEM_CONTEXT }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Understood. I am your AI Assistant, ready to help with any relevant queries.",
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 1000,
          topP: 1.0,
        },
      });

      const result = await chat.sendMessage(input.trim());
      const response = await result.response;

      const botMessage = {
        role: "assistant",
        content: response.text(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const exportChat = () => {
    const chatHistory = messages
      .map((msg) => `${msg.role === "user" ? "You" : "AI"}: ${msg.content}`)
      .join("\n\n");
    const blob = new Blob([chatHistory], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat-history.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! 👋\n\nI'm your AI Assistant. How can I help you today?",
      },
    ]);
    localStorage.removeItem("aiChatMessages");
  };

  if (!isMounted) {
    return <div className="chat-widget-placeholder">Loading chat...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex pt-24 items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Personal AI Tutor</h3>
            <p className="text-sm text-gray-500">Online | Ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportChat}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            title="Export Chat"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={resetChat}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            title="Reset Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 mb-18">
        <div className="w-full mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.role === "assistant"
                    ? "bg-white border border-gray-200 shadow-sm"
                    : "bg-blue-50 border border-blue-100"
                }`}
              >
                <div className="prose max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                {message.role === "assistant" && (
                  <div className="flex gap-2 mt-2 ">
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy to Clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-[70%] p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className=" absolute bottom-0 w-full p-6 bg-white border-t border-gray-200 shadow-sm">
        <form
          onSubmit={handleSendMessage}
          className="w-full mx-auto flex gap-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-gray-50 placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}