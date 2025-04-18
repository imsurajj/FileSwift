'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/app/components/Navbar'

export default function PrivacyPage() {
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
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how we collect, use, and protect your information.
            </p>
          </div>
          
          {/* Main content */}
          <div className="space-y-8 mb-12">
            <div className="w-4/5 mx-auto border border-purple-200 p-6 rounded-xl bg-white">
              <div className="max-w-3xl mx-auto">
                <p className="text-sm text-gray-500 mb-6">Last updated: April 18, 2025</p>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Introduction</h2>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    FileSwift ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and file sharing service.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using FileSwift, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Information We Collect</h2>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Files You Upload</h3>
                    <p className="text-gray-700 leading-relaxed">
                      When you use our service to share files, we temporarily store these files on our servers. These files are automatically deleted either after they are downloaded or within 24 hours of upload, whichever comes first.
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Data</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We collect anonymous usage data such as browser type, device information, and pages visited. This helps us improve our service and troubleshoot issues. This data does not personally identify you.
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We use cookies to enhance your experience on our site. These are small files stored on your device that help our website function properly. You can set your browser to refuse cookies, but this may limit some functionality.
                    </p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">How We Use Your Information</h2>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                    <li>To provide and maintain our service</li>
                    <li>To detect and prevent technical issues or abuse</li>
                    <li>To analyze usage patterns and improve our service</li>
                    <li>To communicate with you if you contact us directly</li>
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Data Security</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate security measures to protect your data. Files are encrypted in transit and at rest. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Your Rights</h2>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                    <li>The right to access information we have about you</li>
                    <li>The right to request deletion of your data</li>
                    <li>The right to opt out of certain data collection</li>
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Third-Party Services</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may use third-party services such as analytics providers and hosting services. These third parties may collect information sent by your browser as part of a web page request. They have their own privacy policies addressing how they use such information.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Children's Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our service is not intended for use by children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe we have collected information from a child under 13, please contact us.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@fileswift.app" className="text-purple-600 hover:text-purple-800 font-medium">privacy@fileswift.app</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 