'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="py-6 px-4 bg-white border-t border-purple-100 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
              FileSwift
            </Link>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-500 text-sm">Fast, secure file sharing</span>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-purple-600 text-sm">
              About
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-purple-600 text-sm">
              Help
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-purple-600 text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-purple-600 text-sm">
              Terms
            </Link>
            <a href="https://github.com/imsurajj/FileSwift/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 text-sm">
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-purple-50 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} FileSwift • Built with <span className="text-red-500">♥</span> by Suraj
        </div>
      </div>
    </footer>
  )
}

export default Footer 