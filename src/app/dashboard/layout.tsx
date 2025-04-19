"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

// Define sidebar navigation items
const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Files", href: "/dashboard/files", icon: FolderIcon },
  { name: "Shared", href: "/dashboard/shared", icon: ShareIcon },
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
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Close sidebar when changing routes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="mt-2 text-sm text-gray-500">
                Select the plan that best fits your needs
              </p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Free Plan */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900">Free</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">Free</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">50 GB of storage</p>
                  
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">50 GB storage</span>
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
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      disabled
                    >
                      Current Plan
                    </button>
                  </div>
                </div>
                
                {/* Premium Plan */}
                <div className="border border-purple-200 bg-purple-50 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0">
                    <div className="text-xs font-semibold tracking-wide text-white transform translate-x-2 -translate-y-1 bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-md">
                      Most Popular
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white opacity-10 overflow-hidden">
                    <div className="absolute inset-0 w-1/3 -ml-[100%] h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[45deg] animate-shine"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-purple-800">Premium</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-2xl font-bold text-purple-800">$9</span>
                      <span className="ml-1 text-sm text-purple-600">/monthly</span>
                    </div>
                    <p className="mt-1 text-sm text-purple-700">500 GB of storage</p>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-700">500 GB storage</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-700">5 GB file size limit</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-700">Priority support</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 flex-shrink-0 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-purple-700">No ads</span>
                      </li>
                    </ul>
                    
                    <div className="mt-8">
                      <button 
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={() => setShowUpgradeModal(false)}
                      >
                        Choose Premium
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Enterprise Plan */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">$29</span>
                    <span className="ml-1 text-sm text-gray-500">/monthly</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">2 TB of storage</p>
                  
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
                      <span className="text-sm text-gray-600">24/7 support</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">Team sharing</span>
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
                      className="w-full flex justify-center py-2 px-4 border border-purple-600 rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => setShowUpgradeModal(false)}
                    >
                      Choose Enterprise
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        
      <div className="flex">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex-shrink-0 px-4">
              <p className="text-lg font-semibold text-gray-900">Dashboard</p>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            {/* Storage Usage in Sidebar */}
            <div className="px-4 mt-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {/* Compact Storage Card */}
                <div className="p-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-800">Storage</h3>
                    <span className="text-xs font-medium bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">41%</span>
                  </div>
                  
                  <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                    <div className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full" style={{ width: "41%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>20.5 GB used</span>
                    <span>50 GB total</span>
                  </div>
                </div>
                
                {/* Upgrade Button */}
                <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 p-3 relative overflow-hidden rounded-b-lg">
                  {/* Shiny Effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -inset-y-1/2 -left-1/2 w-1/2 h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-20 skew-x-[30deg] animate-shine"></div>
                  </div>
                  
                  <div className="relative z-10 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-white text-xs font-semibold">UPGRADE NOW</span>
                      </div>
                      <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded">40% OFF</span>
                    </div>
                    
                    <p className="text-white/90 text-xs mb-2.5">Unlock premium features and increase your storage to 500GB</p>
                    
                    <button 
                      onClick={() => setShowUpgradeModal(true)}
                      className="w-full bg-white hover:bg-white/90 text-purple-700 text-xs font-semibold py-1.5 px-3 rounded flex items-center justify-center transition-all duration-200 shadow-sm"
                    >
                      <span className="mr-1.5">View Plans</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Help & Support Link */}
              <Link 
                href="/help" 
                className="flex items-center mt-4 text-sm text-gray-500 hover:text-gray-700 px-2 py-1.5"
              >
                <QuestionIcon className="w-4 h-4 mr-2" />
                Help & Support
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile sidebar */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity ease-linear duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white transition ease-in-out duration-300 transform">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <p className="text-lg font-semibold text-gray-900">Dashboard</p>
              <button
                type="button"
                className="-mr-2 rounded-md p-2 text-gray-500 hover:text-gray-600 focus:outline-none"
                onClick={() => setIsSidebarOpen(false)}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pt-5 pb-4">
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-6 w-6 ${
                          isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Storage Usage in Mobile Sidebar */}
              <div className="px-4 mt-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  {/* Compact Storage Card */}
                  <div className="p-3 relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-800">Storage</h3>
                      <span className="text-xs font-medium bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">41%</span>
                    </div>
                    
                    <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                      <div className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full" style={{ width: "41%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>20.5 GB used</span>
                      <span>50 GB total</span>
                    </div>
                  </div>
                  
                  {/* Upgrade Button */}
                  <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 p-3 relative overflow-hidden rounded-b-lg">
                    {/* Shiny Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -inset-y-1/2 -left-1/2 w-1/2 h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-20 skew-x-[30deg] animate-shine"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1.5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="text-white text-xs font-semibold">UPGRADE NOW</span>
                        </div>
                        <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded">40% OFF</span>
                      </div>
                      
                      <p className="text-white/90 text-xs mb-2.5">Unlock premium features and increase your storage to 500GB</p>
                      
                      <button 
                        onClick={() => {
                          setShowUpgradeModal(true);
                          setIsSidebarOpen(false);
                        }}
                        className="w-full bg-white hover:bg-white/90 text-purple-700 text-xs font-semibold py-1.5 px-3 rounded flex items-center justify-center transition-all duration-200 shadow-sm"
                      >
                        <span className="mr-1.5">View Plans</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
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
        <main className="flex-1 md:ml-64 pt-4 md:pt-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
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
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
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

function UserGroupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
} 