'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { truncate } from 'node:fs';
import { usePathname } from 'next/navigation';

// Developer settings
const ENABLE_AUTH = true; // Authentication is enabled by default for production

export default function Navbar() {
  const { data: session, status, update } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  
  // Check if we're on a dashboard page
  const isDashboardPage = pathname?.startsWith('/dashboard');

  // For developer mode
  const authStatus = ENABLE_AUTH ? status : (session ? 'authenticated' : 'unauthenticated');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };
  
  // Handle hover for profile menu
  const handleProfileMouseEnter = () => {
    if (profileHoverTimeoutRef.current) {
      clearTimeout(profileHoverTimeoutRef.current);
      profileHoverTimeoutRef.current = null;
    }
    setShowProfileMenu(true);
  };

  const handleProfileMouseLeave = () => {
    profileHoverTimeoutRef.current = setTimeout(() => {
      setShowProfileMenu(false);
    }, 300);
  };

  // Handle authentication (with developer toggle)
  const handleSignOut = () => {
    if (ENABLE_AUTH) {
      signOut({ callbackUrl: '/' });
    }
    setShowProfileMenu(false);
  };

  // Listen for session update events from settings page
  useEffect(() => {
    const handleSessionUpdate = async () => {
      // Update session data to ensure the navbar shows the latest info
      console.log("Session update detected - refreshing session data");
      await update();
    };

    window.addEventListener('session-update', handleSessionUpdate);
    return () => {
      window.removeEventListener('session-update', handleSessionUpdate);
    };
  }, [update]);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current && 
        profileButtonRef.current && 
        !profileMenuRef.current.contains(event.target as Node) && 
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (profileHoverTimeoutRef.current) {
        clearTimeout(profileHoverTimeoutRef.current);
      }
    };
  }, []);

  // Variants for hamburger menu animation
  const topLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 7 }
  };
  
  const middleLineVariants = {
    closed: { opacity: 1, width: "100%" },
    open: { opacity: 0, width: "0%" }
  };
  
  const bottomLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -7 }
  };

  // Styles for disabled auth elements
  const disabledAuthStyle = !ENABLE_AUTH ? { 
    opacity: 0.6, 
    cursor: 'not-allowed',
    position: 'relative' as const
  } : {};

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/favicon.svg" 
                alt="FileSwift Logo" 
                width={32} 
                height={32} 
                className="mr-2"
              />
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                File<span className="text-purple-600">Swift</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop menu */}
          <motion.nav 
            className="hidden md:flex space-x-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            {isDashboardPage && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link 
                  href="/" 
                  className="text-gray-500 hover:text-purple-600 px-2 py-2 text-sm font-medium transition-colors focus:outline-none"
                >
                  Home
                </Link>
              </motion.div>
            )}

            {!isDashboardPage && authStatus === 'authenticated' && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link 
                  href="/dashboard" 
                  className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </motion.div>
            )}

            {/* Auth Button */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="relative ml-2"
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
              style={disabledAuthStyle}
            >
              {/* Only show profile on non-dashboard pages */}
              {authStatus === 'loading' ? (
                <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
                  Loading...
                </div>
              ) : authStatus === 'authenticated' && !isDashboardPage ? (
                <div className="relative">
                  <button 
                    ref={profileButtonRef}
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-1 focus:outline-none group"
                    aria-expanded={showProfileMenu}
                    aria-haspopup="true"
                    style={!ENABLE_AUTH ? { cursor: 'not-allowed' } : {}}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border border-purple-200 transition-all duration-200 group-hover:ring-2 group-hover:ring-purple-300">
                      {session?.user?.image ? (
                        <Image 
                          src={session.user.image} 
                          alt={session.user.name || 'User'} 
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium text-purple-700">
                          {session?.user?.name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                      {session?.user?.name || 'User'}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 group-hover:text-purple-600 ${showProfileMenu ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <div 
                      ref={profileMenuRef}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 transition-opacity duration-300 ease-in-out"
                      onMouseEnter={handleProfileMouseEnter}
                      onMouseLeave={handleProfileMouseLeave}
                      style={!ENABLE_AUTH ? { opacity: 0.6 } : {}}
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500 truncate mt-1">{session?.user?.email}</p>
                      </div>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={() => setShowProfileMenu(false)}
                        style={!ENABLE_AUTH ? { cursor: 'not-allowed' } : {}}
                      >
                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none"
                        style={!ENABLE_AUTH ? { cursor: 'not-allowed' } : {}}
                      >
                        <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : authStatus === 'authenticated' && isDashboardPage ? (
                // Just show a sign out button on dashboard pages
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 focus:outline-none"
                  style={!ENABLE_AUTH ? { cursor: 'not-allowed' } : {}}
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href={ENABLE_AUTH ? "/auth/signin" : "#"}
                  onClick={(e) => {
                    if (!ENABLE_AUTH) {
                      e.preventDefault();
                    }
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                  style={!ENABLE_AUTH ? { cursor: 'not-allowed' } : {}}
                >
                  Sign in
                </Link>
              )}
            </motion.div>
          </motion.nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col items-center justify-around">
                <motion.span
                  className="w-full h-0.5 bg-gray-800 rounded-full transform-gpu"
                  variants={topLineVariants}
                  animate={isMenuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <motion.span
                  className="w-full h-0.5 bg-gray-800 rounded-full transform-gpu"
                  variants={middleLineVariants}
                  animate={isMenuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <motion.span
                  className="w-full h-0.5 bg-gray-800 rounded-full transform-gpu"
                  variants={bottomLineVariants}
                  animate={isMenuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </div>
            </button>
          </div>
        </div>
        </div>

        {/* Mobile menu */}
        <motion.div 
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b border-gray-200">
          {isDashboardPage && (
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          )}
          
          {!isDashboardPage && authStatus === 'authenticated' && (
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-b border-gray-200" style={!ENABLE_AUTH ? { opacity: 0.6 } : {}}>
          {/* Don't show profile in mobile menu when on dashboard pages */}
          {authStatus === 'authenticated' && !isDashboardPage ? (
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center">
                  {session?.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-medium text-purple-700">
                      {session?.user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{session?.user?.name}</div>
                <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
              </div>
            </div>
          ) : authStatus !== 'authenticated' ? (
            <div className="px-4">
              <Link
                href={ENABLE_AUTH ? "/auth/signin" : "#"}
                onClick={(e) => {
                  if (!ENABLE_AUTH) {
                    e.preventDefault();
                  }
                  setIsMenuOpen(false);
                }}
                className="block text-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                style={!ENABLE_AUTH ? { cursor: 'not-allowed' } : {}}
              >
                Sign in
              </Link>
            </div>
          ) : null}
          {authStatus === 'authenticated' && (
            <div className="mt-3 px-2 space-y-1">
              {!isDashboardPage && (
                <Link
                  href="/dashboard/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                  style={!ENABLE_AUTH ? { cursor: 'not-allowed' } : {}}
                >
                  Settings
                </Link>
              )}
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 focus:outline-none"
                style={!ENABLE_AUTH ? { cursor: 'not-allowed' } : {}}
              >
                Sign out
              </button>
            </div>
          )}
          </div>
        </motion.div>
    </motion.header>
  );
} 