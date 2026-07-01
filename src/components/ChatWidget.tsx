import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2, Bot, User, Sparkles, SendHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage, ProfileData } from "../types";

interface ChatWidgetProps {
  profile: ProfileData | null;
}

const SUGGESTIONS = [
  "What projects has Faysal built?",
  "What is his experience?",
  "How can I contact him?",
  "What services does he offer?"
];

// Simple, high-fidelity custom markdown renderer to ensure React 19 compatibility and speed
function formatMessage(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    let cleanLine = line.trim();

    // Check if it's a list item
    const isListItem = cleanLine.startsWith("- ") || cleanLine.startsWith("* ");
    if (isListItem) {
      cleanLine = cleanLine.substring(2);
    }

    // Parse bold text **bold**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(cleanLine)) !== null) {
      if (match.index > lastIndex) {
        parts.push(cleanLine.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="font-semibold text-white">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < cleanLine.length) {
      parts.push(cleanLine.substring(lastIndex));
    }

    // Render as a list item or paragraph
    if (isListItem) {
      return (
        <li key={i} className="ml-4 list-disc text-sm text-gray-300 leading-relaxed my-1">
          {parts.length > 0 ? parts : cleanLine}
        </li>
      );
    }

    if (cleanLine === "") {
      return <div key={i} className="h-2" />;
    }

    return (
      <p key={i} className="text-sm text-gray-300 leading-relaxed my-1">
        {parts.length > 0 ? parts : cleanLine}
      </p>
    );
  });
}

export default function ChatWidget({ profile }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hello! 👋 I'm **Faysal's AI Assistant**.

I can help you explore Faysal Ahmed's work experience, browse his featured projects like **Faysal TV**, view his services, or provide his direct **WhatsApp** and contact links!

How can I assist you today?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Show notification badge if closed and new message received
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map entire history for server
      const chatHistory = [...messages, userMsg].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: data.reply,
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error(data.error || "Failed to fetch response");
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `⚠️ Sorry, I ran into an issue connecting to my brain.

Please ensure the **GEMINI_API_KEY** is set in the Secrets panel, or contact Faysal directly at **01736705156** or **fa2626813@gmail.com**.`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <div id="ai-assistant-widget" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-[calc(100vw-2rem)] sm:w-[400px] h-[75vh] sm:h-[550px] max-h-[600px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-900 to-indigo-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center border border-sky-400/40">
                    <Bot className="w-5 h-5 text-sky-400 animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm flex items-center gap-1.5">
                    Faysal's Assistant
                    <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  </h3>
                  <p className="text-xs text-slate-300">Online • Live Assistant</p>
                </div>
              </div>
              <button
                id="btn-close-chat"
                onClick={handleOpenToggle}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.role === "user"
                        ? "bg-indigo-600/30 border-indigo-500/30 text-indigo-400"
                        : "bg-sky-950 border-sky-900 text-sky-400"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
                  </div>

                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-slate-200 text-sm ${
                      msg.role === "user"
                        ? "bg-indigo-600/20 border border-indigo-500/20 rounded-tr-none"
                        : "bg-slate-900/90 border border-slate-800/80 rounded-tl-none"
                    }`}
                  >
                    <div className="space-y-1">{formatMessage(msg.content)}</div>
                    <span className="text-[10px] text-slate-500 mt-1 block text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-950 border border-sky-900 flex items-center justify-center shrink-0 text-sky-400">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800/80 px-4 py-3 rounded-2xl rounded-tl-none text-slate-400 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                    <span className="text-xs">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 border-t border-slate-900 bg-slate-950/80 space-y-1.5">
                <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">Suggested questions</p>
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {SUGGESTIONS.map((s, index) => (
                    <button
                      key={index}
                      id={`btn-suggestion-${index}`}
                      onClick={() => handleSendMessage(s)}
                      className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-full transition-all text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              id="chat-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-800/80 bg-slate-900 flex gap-2"
            >
              <input
                id="chat-input-field"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Faysal's projects, experience..."
                disabled={isLoading}
                className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all disabled:opacity-50"
              />
              <button
                id="btn-chat-send"
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white p-2 rounded-xl transition-all disabled:opacity-40"
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        id="btn-toggle-chat"
        onClick={handleOpenToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer relative border border-sky-400/20 hover:from-sky-400 hover:to-indigo-500 transition-all"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            {hasNewMessage && (
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 border border-slate-950 flex items-center justify-center animate-bounce" />
            )}
          </div>
        )}
      </motion.button>
    </div>
  );
}
