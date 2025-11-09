import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MapPin, Bookmark, Wifi, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";

import { featuredPlaces } from "../data/mockData";



export default function ChatPage({ navigate }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'ai',
      message: "Hi! I'm LocalLens AI, your personal discovery buddy 🌟 I can help you find hidden gems, suggest places based on your mood, and answer questions about your area. What are you looking for today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOffline] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        {
          message: "I found some amazing spots for you! Here are my top recommendations based on what you're looking for:",
          suggestions: featuredPlaces.slice(0, 3)
        },
        {
          message: "Based on your preferences, I think you'll love these peaceful cafes perfect for studying:",
          suggestions: featuredPlaces.filter(p => p.category === 'cafe' || p.category === 'study').slice(0, 2)
        },
        {
          message: "Here are some hidden gems that match your vibe! These places are local favorites:",
          suggestions: featuredPlaces.slice(3, 6)
        }
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: randomResponse.message,
        timestamp: new Date(),
        suggestions: randomResponse.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedPrompts = [
    "Suggest a peaceful café for studying",
    "Show me romantic rooftop spots",
    "Find hidden art galleries nearby",
    "Where can I work remotely with good wifi?"
  ];

  return (
    <div className="fixed inset-0 pt-24 md:pt-32 pb-24 md:pb-4 px-4">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-t-2xl shadow-lg p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500">
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-white">LocalLens AI</h2>
                <p className="text-gray-500 dark:text-gray-400">Your Travel Buddy</p>
              </div>
            </div>

            <Badge variant={isOffline ? "destructive" : "secondary"} className="gap-1">
              {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
              {isOffline ? "Offline Mode" : "Online"}
            </Badge>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-green-50/50 to-blue-50/50 dark:from-slate-900/50 dark:to-slate-800/50 p-4 md:p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500">
                        <div className="w-full h-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </Avatar>
                      <span className="text-gray-600 dark:text-gray-400">LocalLens AI</span>
                    </div>
                  )}

                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-green-500 to-blue-500 text-white ml-auto'
                      : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-md'
                  }`}>
                    <p>{message.message}</p>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((place) => (
                        <motion.div
                          key={place.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Card className="p-3 cursor-pointer hover:shadow-lg transition-all bg-white dark:bg-slate-800 border-0">
                            <div className="flex gap-3">
                              <img
                                src={place.image}
                                alt={place.name}
                                className="w-20 h-20 object-cover rounded-xl"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-gray-900 dark:text-white mb-1">{place.name}</h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                                  {place.description}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => navigate('/map')}
                                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl h-8"
                                  >
                                    <MapPin className="w-3 h-3 mr-1" />
                                    Open in Map
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-xl h-8"
                                  >
                                    <Bookmark className="w-3 h-3 mr-1" />
                                    Save
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Avatar className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500">
                <Sparkles className="w-4 h-4 text-white" />
              </Avatar>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-md">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-3">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(prompt)}
                  className="rounded-xl"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-b-2xl shadow-lg p-4 md:p-6 border-t border-gray-200 dark:border-700">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about local spots..."
              className="rounded-2xl border-2 focus:border-green-400 dark:focus:border-green-400"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
