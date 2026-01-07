
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, MinusCircle } from 'lucide-react';
import { chatWithPatrickAI } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hey! I'm Patrick's AI twin. Ask me anything about community operations, systems, or how I work." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatWithPatrickAI(userMessage, []);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm not sure how to answer that. Maybe email Patrick?" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I hit a technical snag. Try again in a minute?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] p-4 bg-emerald-700 text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-emerald-700 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Patrick AI</h3>
                <div className="flex items-center text-xs text-emerald-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-300 mr-1 animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-emerald-100 hover:text-white transition-colors">
              <MinusCircle size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-stone-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs ${
                    msg.role === 'user' ? 'bg-slate-200 text-slate-700' : 'bg-emerald-700 text-white'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 shadow-sm border border-stone-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-emerald-700" />
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-stone-100 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask something..."
                className="flex-grow p-2 text-sm bg-stone-100 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
