'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

// Configuration options to enable/disable features
const HELP_PAGE_CONFIG = {
  enableChat: false, // Set to false to disable the chat popup button
}

export default function HelpPage() {
  const [chatOpen, setChatOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Define FAQs outside the render function
                    const faqs = [
                      {
                        question: "How does FileSwift work?",
                        answer: "FileSwift allows you to quickly share files with others without requiring an account. Files are temporarily stored on our servers and automatically deleted after being downloaded or within 24 hours."
                      },
                      {
                        question: "Is there a file size limit?",
                        answer: "Yes, the current file size limit is 100MB per file. This helps us maintain a fast and reliable service for everyone."
                      },
                      {
                        question: "How long are my files stored?",
                        answer: "Files are automatically deleted after being downloaded or within 24 hours of upload, whichever comes first."
                      },
                      {
                        question: "Is my data secure?",
                        answer: "We take security seriously. Files are transferred using secure connections and stored temporarily. We do not analyze or access the content of your files."
                      },
                      {
                        question: "Do I need to create an account?",
                        answer: "No, FileSwift is designed to be used without an account. Just upload your files and share the generated link with your recipients."
                      },
                      {
                        question: "Can I password protect my files?",
                        answer: "Yes, you can add password protection to your shared files for additional security. Recipients will need the password to download the files."
                      },
                      {
                        question: "How many files can I share at once?",
                        answer: "You can share up to 10 files in a single share link. If you need to share more, you can create multiple share links."
                      },
                      {
                        question: "Is FileSwift free to use?",
                        answer: "Yes, FileSwift is completely free for personal use. We may introduce premium features in the future, but the core functionality will always remain free."
                      }
                    ];
                    
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Help & Support</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get help with FileSwift or contact our support team using the methods below</p>
          </div>
          
          {/* Shimmering Note Banner */}
          <div className="w-4/5 mx-auto mb-6">
            <div className="bg-purple-600 rounded-lg shadow-md relative overflow-hidden text-white">
              <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
                <div className="absolute -inset-[10px] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-45deg] animate-shimmer"></div>
              </div>
              <div className="flex items-center z-10 relative p-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="relative">
                    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                  </div>
                </div>
                <p className="font-medium">We're providing email support only for now due to some technical issues with our chat system.</p>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="space-y-10 mb-12">
            {/* Contact Info - Direct on page without card */}
            <div className="w-4/5 mx-auto border border-purple-200 p-6 rounded-xl">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center">
                  <div className="mr-5 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-700 mb-1">Email Us</p>
                    <a href="mailto:support@fileswift.app" className="text-purple-900 font-semibold hover:text-purple-600 transition-colors">
                      Email Updating Soon..
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-5 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-700 mb-1">Live Chat Support</p>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="text-purple-900">Reply within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                <div className="flex items-center">
                  <div className="mr-4 text-purple-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-purple-800">
                    Use the chat button in the bottom right corner for immediate assistance.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQs Section - Direct on page without card */}
            <div className="w-4/5 mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">Find answers to common questions about FileSwift and how it works</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                      <FaqItem 
                        key={index} 
                        question={faq.question} 
                        answer={faq.answer} 
                        isOpen={openFaqIndex === index}
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Chat Button and Chat Popup */}
      <>
      <button
          onClick={() => HELP_PAGE_CONFIG.enableChat && setChatOpen(true)}
          className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-colors z-50 ${
            HELP_PAGE_CONFIG.enableChat ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 opacity-90 pointer-events-none cursor-not-allowed'
          }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
      
        <AnimatePresence>
          {chatOpen && HELP_PAGE_CONFIG.enableChat && (
            <ChatPopup onClose={() => setChatOpen(false)} />
          )}
        </AnimatePresence>
      </>
    </div>
  )
}

function FaqItem({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors"
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <div className={`w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg 
            className="w-5 h-5 text-purple-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          className="px-6 py-4 bg-gray-50 text-gray-600 border-t border-gray-200"
          >
              <p className="leading-relaxed">{answer}</p>
          </motion.div>
        )}
    </div>
  )
}

// Chat Popup Component
function ChatPopup({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{type: 'bot' | 'user', content: string}>>([
    { type: 'bot', content: 'Hello! How can I help you today?' }
  ])
  const [isMini, setIsMini] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userMessage.trim()) return
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { type: 'user', content: userMessage }])
    
    // Save message and clear input
    const currentMessage = userMessage
    setMessage(currentMessage)
    setUserMessage('')
    
    // Show typing animation
    setIsTyping(true)
    
    // After delay, show response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Thank you for your message. Could you please provide your name and email so we can get back to you?' 
      }])
      setIsTyping(false)
    }, 1000)
  }
  
  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email) {
      setError('Please provide both your name and email')
      return
    }
    
    // Show typing animation
    setIsTyping(true)
    
    // Prepare form data
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('category', 'chat')
    formData.append('message', message)
    formData.append('notifyEmail', 'iamsurajbro946@gmail.com')
    
    // Call the API endpoint
    try {
      const response = await fetch('/api/help/contact', { 
        method: 'POST', 
        body: formData 
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }
      
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          type: 'bot', 
          content: `Thanks ${name}! Your message has been sent. We'll get back to you at ${email} as soon as possible.` 
        }])
        setIsTyping(false)
        setSubmitted(true)
      }, 1000)
      
      setError('')
    } catch (err) {
      console.error('Chat error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
      setIsTyping(false)
    }
  }
  
  const toggleMiniMode = () => {
    setIsMini(!isMini)
  }
  
  const showInfoForm = chatMessages.length >= 3 && 
    chatMessages[chatMessages.length - 1].type === 'bot' && 
    chatMessages[chatMessages.length - 1].content.includes('provide your name and email');
  
  const showNewChatButton = submitted;
  
  // Quick reply questions
  const quickReplies = [
    "How do I share files?",
    "What's the file size limit?",
    "How long are files stored?",
    "How secure is the service?"
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-24 right-6 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-200 w-[380px]"
      style={{ maxWidth: 'calc(100vw - 32px)', maxHeight: '80vh' }}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-purple-600 text-white">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">Chat with Support</h3>
            <div className="flex items-center text-xs">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
              <span>We typically reply in 24 hours</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={toggleMiniMode} className="p-1 mr-1 hover:bg-purple-700 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M16 4h4m0 0v4m0-4l-5 5m5 6v4m0 0h-4m4 0l-5-5" />
            </svg>
          </button>
          <button onClick={onClose} className="p-1 hover:bg-purple-700 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mx-4 mt-3 p-2 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}
      
      <div className="h-[320px] overflow-y-auto p-4 bg-gray-50">
        <div>
          {chatMessages.map((msg, index) => (
            <motion.div 
              key={`msg-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              )}
              
              <div className={`rounded-lg p-3 shadow-sm max-w-[80%] ${
                msg.type === 'user' 
                  ? 'bg-purple-100 text-gray-800 ml-2' 
                  : 'bg-white text-gray-800'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {!chatMessages.length && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => {
                  setUserMessage(reply)
                  setTimeout(() => {
                    const fakeEvent = { preventDefault: () => {} } as React.FormEvent
                    handleChatSubmit(fakeEvent)
                  }, 100)
                }}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs rounded-full transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {!showInfoForm && !showNewChatButton && (
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message here..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
              required
            />
            <button
              type="submit"
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}
      
      {showInfoForm && (
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmitInfo} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                required
              />
              <input
                type="email"
                placeholder="Your Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      
      {showNewChatButton && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button
            onClick={() => {
              setName('')
              setEmail('')
              setMessage('')
              setChatMessages([{ type: 'bot', content: 'Hello! How can I help you today?' }])
              setSubmitted(false)
              setError('')
            }}
            className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Start New Chat
          </button>
        </div>
      )}
    </motion.div>
  )
}