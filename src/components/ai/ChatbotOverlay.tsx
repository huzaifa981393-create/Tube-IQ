import React, { useState, useRef, useEffect } from 'react';
import { useTubeIQStore } from '../../store/useStore';
import { askChatbot, buildChannelContext } from '../../services/ai';
import { 
  X, 
  Send, 
  Brain, 
  MessageCircle, 
  ChevronDown,
  Sparkles,
  RefreshCw,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function ChatbotOverlay() {
  const { 
    isChatOpen, 
    setChatOpen, 
    chatMessages, 
    addChatMessage, 
    channel, 
    videos, 
    analytics 
  } = useTubeIQStore();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping || !channel || !analytics) return;

    const userMsg = { role: 'user' as const, content: text };
    addChatMessage(userMsg);
    setInput('');
    setIsTyping(true);

    try {
      const systemContext = buildChannelContext(channel, videos, analytics);
      // History should only be message list, not the whole state
      const history = chatMessages.map(m => ({ role: m.role, content: m.content }));
      
      const answer = await askChatbot(text, history, systemContext);
      addChatMessage({ role: 'assistant', content: answer });
    } catch (err) {
      toast.error('Could not connect to AI advisor.');
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "My channel ki growth kaise improve karoon?",
    "Mera best performing video kyun chala?",
    "Mujhe kya content banana chahiye?",
    "Meri CTR improve kaise karoon?"
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setChatOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary-blue text-white rounded-full flex items-center justify-center shadow-[0_4px_30px_rgba(59,130,246,0.4)] z-30"
      >
        <Brain size={28} />
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 h-[85%] bg-surface border-t border-white/10 rounded-t-[32px] z-[60] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-border-subtle shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue">
                    <Brain size={22} />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-white text-base">Tube IQ AI</h3>
                    <p className="text-[10px] text-text3 font-mono uppercase tracking-widest">Growth Advisor • Pro</p>
                  </div>
                </div>
                <button 
                    onClick={() => setChatOpen(false)}
                    className="p-2 bg-surface2 rounded-full text-text2 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Body */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
              >
                {chatMessages.length === 0 && (
                   <div className="py-8 space-y-6">
                      <div className="text-center space-y-2">
                        <Sparkles size={32} className="mx-auto text-primary-blue/40" />
                        <h4 className="text-lg font-syne font-bold text-white">How can I help you grow?</h4>
                        <p className="text-sm text-text3">Ask anything about your channel stats or content strategy.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                         {quickQuestions.map((q, i) => (
                           <button 
                             key={i} 
                             onClick={() => handleSend(q)}
                             className="p-4 bg-surface2 border border-border-subtle rounded-2xl text-left text-sm text-text2 hover:text-white hover:border-primary-blue/30 transition-all flex items-center justify-between group"
                           >
                             {q}
                             <ChevronDown size={14} className="-rotate-90 text-text3 group-hover:text-primary-blue transition-colors" />
                           </button>
                         ))}
                      </div>
                   </div>
                )}

                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary-blue text-white rounded-tr-none shadow-lg' 
                        : 'bg-surface2 text-text1 border border-border-subtle rounded-tl-none'
                    }`}>
                      {msg.content}
                      {msg.role === 'assistant' && (
                         <button 
                            onClick={() => {
                                navigator.clipboard.writeText(msg.content);
                                toast.success('Copied to clipboard');
                            }}
                            className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] text-text3 font-bold uppercase tracking-widest hover:text-white transition-colors"
                         >
                            <Copy size={10} /> Copy Advice
                         </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-surface2 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-text3 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-text3 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-text3 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-border-subtle bg-surface shrink-0 pb-10">
                <div className="relative flex items-center bg-surface2 rounded-2xl border border-border-subtle group focus-within:border-primary-blue/50 transition-all shadow-inner">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask IQ assistant..."
                    className="flex-1 h-14 bg-transparent pl-5 pr-14 text-sm outline-none text-white"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className={`absolute right-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      input.trim() && !isTyping ? 'bg-primary-blue text-white' : 'bg-surface text-text3'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
