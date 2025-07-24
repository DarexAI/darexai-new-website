import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  Mic, 
  X, 
  Minimize2,
  Maximize2,
  User,
  Bot,
  Code,
  Copy,
  Check
} from 'lucide-react';
import Button from './Button';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'code' | 'file';
  metadata?: any;
}

interface ChatInterfaceProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onSendMessage?: (message: string) => void;
  messages?: Message[];
  isTyping?: boolean;
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen = false,
  onToggle,
  onSendMessage,
  messages = [],
  isTyping = false,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 p-4 bg-gradient-primary rounded-full shadow-glow-purple hover:shadow-glow-blue transition-all duration-300 z-50 ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>
    );
  }

  return (
    <motion.div
      className={`fixed bottom-6 right-6 w-96 glass-card shadow-glass z-50 ${className}`}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? 'auto' : '500px'
      }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-glass-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-white">AI Assistant</h3>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            icon={isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            icon={<X className="w-4 h-4" />}
          />
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-xs ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-3 rounded-glass ${
                        message.sender === 'user'
                          ? 'bg-gradient-primary text-white'
                          : 'glass text-gray-100'
                      }`}
                    >
                      {message.type === 'code' ? (
                        <div className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <Code className="w-4 h-4" />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(message.content, message.id)}
                              icon={
                                copiedMessageId === message.id ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )
                              }
                            />
                          </div>
                          <pre className="text-sm bg-dark-card p-2 rounded overflow-x-auto">
                            <code>{message.content}</code>
                          </pre>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                    <div className={`flex items-center mt-1 space-x-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      {message.sender === 'ai' && (
                        <Bot className="w-3 h-3 text-gray-500" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-3 h-3 text-gray-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="glass p-3 rounded-glass">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-glass-border">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 glass rounded-glass text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue text-sm"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={<Paperclip className="w-4 h-4" />}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
                icon={<Mic className={`w-4 h-4 ${isRecording ? 'text-error-red' : ''}`} />}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                icon={<Send className="w-4 h-4" />}
              />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ChatInterface;