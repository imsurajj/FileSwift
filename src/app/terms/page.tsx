'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/app/components/Navbar'

export default function TermsPage() {
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
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using FileSwift.
            </p>
          </div>
          
          {/* Main content */}
          <div className="w-4/5 mx-auto mb-12">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm text-gray-500 mb-6">Last updated: April 18, 2025</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using FileSwift ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Description of Service</h2>
                <p className="text-gray-700 leading-relaxed">
                  FileSwift is a temporary file sharing service that allows users to upload and share files with others through unique links. Files are automatically deleted from our servers after they are downloaded or within 24 hours of upload, whichever comes first.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">User Responsibilities</h2>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  As a user of FileSwift, you agree to:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                  <li>Comply with all applicable laws and regulations while using our service</li>
                  <li>Respect the intellectual property and privacy rights of others</li>
                  <li>Not upload or share any illegal, harmful, or prohibited content</li>
                  <li>Not attempt to bypass any security features or limitations of the service</li>
                  <li>Not use the service for spamming, phishing, or spreading malware</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Prohibited Content</h2>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  You may not upload or share content that:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                  <li>Is illegal, obscene, defamatory, threatening, or invasive of privacy</li>
                  <li>Infringes on intellectual property rights of others</li>
                  <li>Contains malware, viruses, or malicious code</li>
                  <li>Violates or encourages the violation of any law or regulation</li>
                </ul>
                <p className="text-gray-700 mt-3 leading-relaxed">
                  We reserve the right to remove any content that we deem inappropriate and to terminate access for users who violate these terms.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  FileSwift and its original content, features, and functionality are owned by FileSwift and are protected by international copyright, trademark, and other intellectual property laws. You retain all rights to the files you upload, but you grant us a limited license to store and transmit these files as necessary to provide the service.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your use of FileSwift is also governed by our Privacy Policy, which can be found on our <a href="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">Privacy page</a>. By using the Service, you consent to the collection and use of information as described in the Privacy Policy.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  To the maximum extent permitted by law, FileSwift shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. This includes but is not limited to loss of data, profits, or business opportunities.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to indemnify and hold harmless FileSwift, its employees, and affiliates from any claims, damages, or expenses arising from your use of the service or violation of these Terms.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Modifications to the Service</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify or discontinue the service, temporarily or permanently, with or without notice. We are not liable to you or any third party for any modifications, suspensions, or discontinuations of the service.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may revise these Terms at any time by updating this page. It is your responsibility to review these Terms periodically for changes. Your continued use of the service after the posting of revised Terms means you accept and agree to the changes.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms, please contact us at <a href="mailto:terms@fileswift.app" className="text-purple-600 hover:text-purple-800 font-medium">terms@fileswift.app</a>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 