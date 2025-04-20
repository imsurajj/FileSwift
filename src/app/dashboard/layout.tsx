"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Navbar from "../components/Navbar";

// Define sidebar navigation items
const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Files", href: "/dashboard/files", icon: FolderIcon },
  { name: "Shared", href: "/dashboard/shared", icon: ShareIcon },
  { name: "Account", href: "/dashboard/account", icon: UserIcon },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("account");

  // Close sidebar when changing routes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Toggle desktop sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header with close button */}
            <div className="relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              
              {/* Glossy effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full -mt-10 -ml-10"></div>
              
              {/* Content */}
              <div className="p-6 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <svg className="w-6 h-6 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Upgrade to Premium
                    </h2>
                    <p className="mt-2 text-white/80">
                      Choose the plan that best fits your needs
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className="bg-white/10 hover:bg-white/20 rounded-full p-1.5 text-white transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" 
                    style={{ animation: 'shine 3s infinite ease-in-out' }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Free Plan */}
                <div className="border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-gray-50 to-transparent -mt-10 -mr-10 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">Free</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">$0</span>
                    <span className="ml-1 text-sm text-gray-500">/month</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Perfect for getting started</p>
                  
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">5 GB storage</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">100 MB file size limit</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">Standard support</span>
                    </li>
                  </ul>
                  
                  <div className="mt-8">
                    <button
                      className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      disabled
                    >
                      Current Plan
                    </button>
                  </div>
                </div>
                
                {/* Premium Plan */}
                <div className="border-2 border-purple-200 bg-gradient-to-b from-purple-50 to-white rounded-xl p-6 relative overflow-hidden shadow-lg transform scale-105 z-10">
                  {/* Popular badge */}
                  <div className="absolute top-0 right-0">
                    <div className="text-xs font-semibold text-white transform translate-x-2 -translate-y-1 bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 rounded-bl-lg shadow-md flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 4.707A1 1 0 0116.414 6l-1.414 1.414-.707.707a1 1 0 01-1.414-1.414l.707-.707L15 4.586 13.414 3l-.707.707a1 1 0 01-1.414-1.414L12 1.586l.707-.707A1 1 0 0113.414 1z" clipRule="evenodd" />
                      </svg>
                      POPULAR
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute right-0 bottom-0 h-36 w-36 bg-gradient-to-tl from-purple-100 to-transparent -mb-12 -mr-12 rounded-full"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-purple-700 flex items-center">
                      <svg className="w-5 h-5 mr-1.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Premium
                    </h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-2xl font-bold text-purple-700">$9</span>
                      <span className="ml-1 text-sm text-purple-500">/month</span>
                    </div>
                    <p className="mt-1 text-sm text-purple-600">Best value for professionals</p>
                    
                    <div className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-purple-600" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Save 20% with annual billing
                      </span>
                    </div>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-800 font-medium">500 GB storage</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-800 font-medium">5 GB file size limit</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-800 font-medium">Priority support 24/7</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-800 font-medium">No ads</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-800 font-medium">Advanced file sharing</span>
                      </li>
                    </ul>
                    
                    <div className="mt-8">
                      <button 
                        className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-150"
                        onClick={() => setShowUpgradeModal(false)}
                      >
                        Choose Premium
                        <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Enterprise Plan */}
                <div className="border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-gray-50 to-transparent -mt-10 -mr-10 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">$29</span>
                    <span className="ml-1 text-sm text-gray-500">/month</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">For larger teams and businesses</p>
                  
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">2 TB storage</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">10 GB file size limit</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">24/7 priority support</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">Team collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">Advanced security</span>
                    </li>
                  </ul>
                  
                  <div className="mt-8">
                    <button 
                      className="w-full flex justify-center py-2.5 px-4 border border-indigo-600 rounded-lg shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      onClick={() => setShowUpgradeModal(false)}
                    >
                      Choose Enterprise
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Additional features list */}
              <div className="mt-10 border-t border-gray-200 pt-6">
                <h3 className="text-base font-semibold text-gray-800 mb-4">All Premium & Enterprise plans include:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-purple-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">Enhanced security and encryption</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-purple-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">Faster upload and download speeds</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-purple-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    <span className="text-sm text-gray-600">File version history</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-purple-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        
      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              
              {/* Glossy effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full -mt-10 -ml-10"></div>
              
              {/* Content */}
              <div className="p-6 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <CogIcon className="w-6 h-6 mr-2" />
                      Settings
                    </h2>
                    <p className="mt-2 text-white/80">
                      Manage your account and preferences
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowSettingsModal(false)}
                    className="bg-white/10 hover:bg-white/20 rounded-full p-1.5 text-white transition-colors"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <div className="px-6 flex overflow-x-auto hide-scrollbar space-x-8">
                <button
                  onClick={() => setActiveSettingsTab("account")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeSettingsTab === "account"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } transition-colors duration-150`}
                >
                  Account
                </button>
                <button
                  onClick={() => setActiveSettingsTab("profile")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeSettingsTab === "profile"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } transition-colors duration-150`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveSettingsTab("billing")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeSettingsTab === "billing"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } transition-colors duration-150`}
                >
                  Billing
                </button>
                <button
                  onClick={() => setActiveSettingsTab("notifications")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeSettingsTab === "notifications"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } transition-colors duration-150`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveSettingsTab("security")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeSettingsTab === "security"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } transition-colors duration-150`}
                >
                  Security
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 200px)" }}>
              {activeSettingsTab === "account" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                  <p className="mt-1 text-sm text-gray-500 mb-6">Update your account information</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg py-2.5 px-3 bg-white text-gray-900 transition-all duration-150"
                          placeholder="Your name"
                          defaultValue={session?.user?.name || ''}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg py-2.5 px-3 bg-white text-gray-900 transition-all duration-150"
                          placeholder="Your email"
                          defaultValue={session?.user?.email || ''}
                        />
                        <p className="mt-1 text-xs text-gray-500">We'll never share your email with anyone else.</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        className="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSettingsTab === "profile" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
                  <p className="mt-1 text-sm text-gray-500 mb-6">This information will be displayed publicly</p>
                  
                  <div>
                    <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-xl shadow-sm mr-5 border-2 border-white">
                        {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">Profile Photo</p>
                        <p className="text-xs text-gray-500 mt-0.5">This will be displayed on your profile</p>
                      </div>
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                      >
                        Change
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <div>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg py-2.5 px-3 resize-none bg-white text-gray-900 transition-all duration-150"
                            placeholder="Write a few sentences about yourself."
                          />
                          <p className="mt-1 text-xs text-gray-500">Brief description for your profile.</p>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <div>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg py-2.5 px-3 bg-white text-gray-900 transition-all duration-150"
                            placeholder="City, Country"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          className="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="ml-3 inline-flex justify-center py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSettingsTab === "billing" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
                  <p className="mt-1 text-sm text-gray-500 mb-6">Manage your payment methods and billing history</p>
                  
                  <div>
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-gray-900">Current Plan</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="font-medium">Free Plan</p>
                        <p className="mt-1 text-gray-500 text-xs">5 GB storage limit</p>
                      </div>
                      <div className="mt-3 flex">
                        <button
                          type="button"
                          onClick={() => {
                            setShowSettingsModal(false);
                            setShowUpgradeModal(true);
                          }}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                        >
                          <span>Upgrade plan</span>
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6">
                      <h4 className="text-base font-medium text-gray-900 mb-2">Payment method</h4>
                      <p className="text-sm text-gray-500 mb-3">No payment method added</p>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                      >
                        <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add payment method
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                      <h4 className="text-base font-medium text-gray-900 mb-2">Billing history</h4>
                      <p className="text-sm text-gray-500 mb-3">No billing history available</p>
                      <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        View all invoices
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSettingsTab === "notifications" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                  <p className="mt-1 text-sm text-gray-500 mb-6">Manage how and when we contact you</p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Email Notifications</h4>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="file_shares"
                            name="file_shares"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded transition-colors"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="file_shares" className="font-medium text-gray-700">
                            File shares
                          </label>
                          <p className="text-gray-500 text-xs mt-0.5">Get notified when someone shares a file with you.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded transition-colors"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">
                            Comments
                          </label>
                          <p className="text-gray-500 text-xs mt-0.5">Get notified when someone comments on your files.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="updates"
                            name="updates"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded transition-colors"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="updates" className="font-medium text-gray-700">
                            Product updates
                          </label>
                          <p className="text-gray-500 text-xs mt-0.5">Receive product updates and newsletter.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Preferences</h4>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Notification frequency</label>
                        <select 
                          className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg text-gray-900 transition-colors"
                          defaultValue="immediate"
                        >
                          <option value="immediate">Immediate</option>
                          <option value="daily">Daily digest</option>
                          <option value="weekly">Weekly digest</option>
                          <option value="none">Turn off</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500">How often would you like to receive notifications?</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        className="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSettingsTab === "security" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                  <p className="mt-1 text-sm text-gray-500 mb-6">Manage your password and account security</p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Change Password</h4>
                      
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div>
                          <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg py-2.5 px-3 bg-white text-gray-900 transition-all duration-150"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div>
                          <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg py-2.5 px-3 bg-white text-gray-900 transition-all duration-150"
                            placeholder="••••••••"
                          />
                          <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters.</p>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div>
                          <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg py-2.5 px-3 bg-white text-gray-900 transition-all duration-150"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="button"
                          className="inline-flex justify-center py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Not Enabled
                        </span>
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                        >
                          Enable
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg border border-red-200 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium text-red-800">Delete Account</h4>
                          <p className="mt-1 text-sm text-red-700">
                            Permanently delete your account and all your data.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-150"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
        
      <div className="flex">
        {/* Sidebar for desktop */}
        <div className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:pt-16 bg-white border-r border-gray-200 transition-all duration-300 ${
            isCollapsed ? 'md:w-16' : 'md:w-64'
          }`}
        >
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex items-center justify-between px-4 mb-2">
              {!isCollapsed && <p className="text-lg font-semibold text-gray-900">Dashboard</p>}
              <button 
                onClick={toggleSidebar}
                className="p-1.5 rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100"
              >
                {isCollapsed ? (
                  <ChevronRightIcon className="h-5 w-5" />
                ) : (
                  <ChevronLeftIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <nav className={`mt-2 flex-1 px-2 space-y-1 ${isCollapsed ? 'px-1' : 'px-2'}`}>
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center ${isCollapsed ? 'justify-center' : ''} py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } ${isCollapsed ? 'px-2' : 'px-2'}`}
                    title={isCollapsed ? item.name : ""}
                  >
                    <item.icon
                      className={`flex-shrink-0 h-5 w-5 ${
                        isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-600"
                      } ${isCollapsed ? '' : 'mr-3'}`}
                      aria-hidden="true"
                    />
                    {!isCollapsed && item.name}
                  </Link>
                );
              })}
            </nav>
            
            {/* Upgrade Button */}
            <div className="px-4 mt-6 mb-4">
              {isCollapsed ? (
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="mx-auto w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white relative overflow-hidden hover:shadow-md transition-shadow duration-300"
                  title="Upgrade"
                >
                  {/* Glossy effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/20 to-transparent z-0"></div>
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
                  
                  {/* Icon */}
                  <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-7-7" />
                  </svg>
                  
                  {/* Enhanced shining animation */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12" 
                      style={{ animation: 'shine 1.5s infinite ease-in-out' }}
                    ></div>
                  </div>
                </button>
              ) : (
                /* Animated upgrade button with enhanced shine */
                <button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full py-2.5 px-3 rounded-lg shadow-sm font-medium text-xs transition-all duration-200 group hover:shadow-md relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600"></div>
                  
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg animate-pulse"></div>
                  
                  {/* Glossy effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                  
                  {/* Top highlight */}
                  <div className="absolute top-0 left-4 right-4 h-[1px] bg-white/50"></div>
                  
                  {/* Enhanced shining animation */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12" 
                      style={{ animation: 'shine 1.5s infinite ease-in-out' }}
                    ></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center text-white">
                    <svg className="w-4 h-4 mr-1.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Upgrade with 20% off
                  </div>
                </button>
              )}
              
              {/* Add the shine animation */}
              <style jsx global>{`
                @keyframes shine {
                  0% {
                    left: -100%;
                  }
                  100% {
                    left: 100%;
                  }
                }
                
                @media (max-width: 768px) {
                  .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                }
              `}</style>
            </div>
            
            {/* User profile section at bottom with hover dropdown */}
            {!isCollapsed && (
              <div className="px-3 pt-3 pb-3 border-t border-gray-100 mt-auto relative">
                <div className="mb-1 flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 relative">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium text-sm">
                        {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session?.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session?.user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowSettingsModal(true)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                    aria-label="User settings"
                  >
                    <CogIcon className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Help & Support link after profile */}
                <Link
                  href="/help"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <QuestionIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-purple-600 mr-3"
                    aria-hidden="true"
                  />
                  Help & Support
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile sidebar */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity ease-linear duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 flex flex-col max-w-[280px] w-full bg-white shadow-2xl transition ease-in-out duration-300 transform overflow-hidden">
            {/* Mobile header with blur effect */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
              <p className="text-base font-semibold text-gray-900">Dashboard</p>
              <button
                type="button"
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto py-2 px-2">
              {/* Navigation */}
              <div className="space-y-1 mb-4">
                <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Main</p>
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-600"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              
              {/* Storage section */}
              <div className="pb-3 mb-4">
                <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Storage</p>
                <div className="mx-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700">Storage used</span>
                    <span className="text-xs font-medium text-purple-600">24%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">1.2 GB used</span>
                    <span className="text-gray-500">5 GB total</span>
                  </div>
                </div>
              </div>
              
              {/* Upgrade Button for Mobile */}
              <button 
                onClick={() => {
                  setShowUpgradeModal(true);
                  setIsSidebarOpen(false);
                }}
                className="w-full mx-3 py-2 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 rounded-lg shadow-sm font-medium text-sm relative transition-all duration-150 hover:shadow-md flex items-center justify-center overflow-hidden"
              >
                {/* Enhanced shine effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12" 
                    style={{ animation: 'shine 1.5s infinite ease-in-out' }}
                  ></div>
                </div>
                
                <svg className="w-4 h-4 mr-2 text-yellow-300 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="relative z-10">Upgrade with 20% off</span>
              </button>
              
              {/* User dropdown in mobile menu */}
              <div className="px-3 pt-4 pb-2 mt-4 relative border-t border-gray-100">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 relative">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium text-sm">
                        {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session?.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session?.user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowSettingsModal(true)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                    aria-label="User settings"
                  >
                    <CogIcon className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Help & Support link after profile in mobile menu */}
                <Link href="/help" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <QuestionIcon className="mr-2 h-5 w-5 text-gray-500" />
                  Help & Support
                </Link>
                
                {/* Settings popup for mobile */}
                {showSettingsModal && (
                  <div className="mt-2 bg-white rounded-lg shadow-md border border-gray-100 py-1">
                    <Link href="/dashboard/upgrade" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <svg className="mr-2 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Upgrade to Pro
                    </Link>
                    
                    <Link href="/dashboard/account" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <UserIcon className="mr-2 h-4 w-4 text-gray-500" />
                      Account
                    </Link>
                    
                    <Link href="/dashboard/billing" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Billing
                    </Link>
                    
                    <Link href="/dashboard/notifications" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Notifications
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'} pt-4 md:pt-6 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

// Add new chevron icons
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

// Icon components
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CogIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function StorageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
      />
    </svg>
  );
}

function QuestionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function UserGroupIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
} 