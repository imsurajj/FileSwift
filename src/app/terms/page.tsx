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
          <div className="space-y-8 mb-12">
            <div className="w-4/5 mx-auto border border-purple-200 p-6 rounded-xl bg-white">
              <div className="max-w-3xl mx-auto">
                <p className="text-sm text-gray-500 mb-6">Last updated: April 18, 2025</p>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">1. Agreement to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing or using FileSwift, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">2. Description of Service</h2>
                  <p className="text-gray-700 leading-relaxed">
                    FileSwift provides temporary file sharing services. Files uploaded to our service are stored temporarily and are automatically deleted after being downloaded or within 24 hours of upload, whichever comes first.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">3. User Responsibilities</h2>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    When using FileSwift, you agree to:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not upload or share illegal, harmful, or infringing content</li>
                    <li>Not use our service to distribute malware or other harmful software</li>
                    <li>Not attempt to disrupt or compromise the security of our service</li>
                    <li>Not use our service for spamming or harassment</li>
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">4. Prohibited Content</h2>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    You may not use FileSwift to upload, share, or distribute:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                    <li>Content that infringes on intellectual property rights</li>
                    <li>Illegal or unlawful content</li>
                    <li>Malware, viruses, or other harmful software</li>
                    <li>Content that violates the privacy or publicity rights of others</li>
                    <li>Content that promotes illegal activities</li>
                    <li>Content that is defamatory, obscene, or offensive</li>
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">5. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed">
                    FileSwift and its content, features, and functionality are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of our service without our prior written consent.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">6. Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your use of FileSwift is also governed by our Privacy Policy, which can be found <a href="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">here</a>.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">7. Limitation of Liability</h2>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    FileSwift and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, including but not limited to data loss, system failure, or service interruption.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We do not guarantee that files will be available for the full 24-hour period or that the service will be uninterrupted or error-free.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">8. Indemnification</h2>
                  <p className="text-gray-700 leading-relaxed">
                    You agree to indemnify and hold harmless FileSwift and its operators from any claims, damages, liabilities, costs, or expenses arising from your use of the service or your violation of these terms.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">9. Modifications to Service</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue FileSwift, temporarily or permanently, at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">10. Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update these Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page. Your continued use of FileSwift after any changes indicates your acceptance of the revised Terms.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">11. Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">12. Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about these Terms, please contact us at <a href="mailto:terms@fileswift.app" className="text-purple-600 hover:text-purple-800 font-medium">terms@fileswift.app</a>.
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