'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/app/components/Navbar'

export default function AboutPage() {
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
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">About FileSwift</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fast, secure file sharing made simple. Share files with anyone, anywhere.
            </p>
          </div>
          
          {/* Main content */}
          <div className="space-y-12 mb-12 w-4/5 mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                FileSwift was created with a simple goal: to make sharing files as easy and secure as possible. We believe that technology should simplify your life, not complicate it.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Our service allows you to quickly share files with others without requiring an account. Files are temporarily stored on our secure servers and automatically deleted after being downloaded or within 24 hours, ensuring your data remains private.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="bg-purple-50 p-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Fast</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Upload and share your files in seconds with our optimized infrastructure.
                  </p>
                </div>

                <div className="bg-purple-50 p-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All files are encrypted in transit and at rest. We prioritize your privacy.
                  </p>
                </div>

                <div className="bg-purple-50 p-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Simple</h3>
                  <p className="text-gray-700 leading-relaxed">
                    No accounts required. Just drag, drop, and share with a link.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Team</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We're a small, passionate team of developers and designers who love creating intuitive, user-friendly software. Our backgrounds span across web development, security, and UX design.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                FileSwift began as a side project to solve our own file-sharing frustrations, but quickly grew as we realized how many people needed a simpler solution than what was available.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We're committed to keeping FileSwift free for personal use while continuously improving the service based on user feedback.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 