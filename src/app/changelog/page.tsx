'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/app/components/Navbar'
import Link from 'next/link'

type ChangelogItem = {
  version: string;
  date: string;
  title: string;
  description: string;
  tags: Array<{
    name: string;
    color: string;
  }>;
  highlights?: string[];
  author?: {
    name: string;
    role: string;
  };
}

// Custom shimmer keyframe animation
const shimmerAnimation = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}
`;

export default function ChangelogPage() {
  // Changelog data with real FileSwift app updates
  const changelogItems: ChangelogItem[] = [
    {
      version: "1.3.0",
      date: "June 8, 2023",
      title: "File Expiration Controls",
      description: "Giving users more control over file sharing with customizable expiration times and enhanced notifications.",
      tags: [
        { name: "Feature", color: "bg-green-500" },
        { name: "Privacy", color: "bg-purple-600" }
      ],
      highlights: [
        "Custom expiration times: 1 hour, 24 hours, 3 days, or 7 days",
        "Email notifications when files are about to expire",
        "Ability to extend expiration for existing shared files",
        "Clear visual indicators of remaining time"
      ],
      author: {
        name: "Alex Chen",
        role: "Lead Developer"
      }
    },
    {
      version: "1.2.1",
      date: "May 20, 2023",
      title: "Mobile Experience Improvements",
      description: "Significant enhancements to the mobile experience, making file sharing on smartphones and tablets smoother than ever.",
      tags: [
        { name: "Enhancement", color: "bg-blue-500" },
        { name: "Mobile", color: "bg-indigo-500" }
      ],
      highlights: [
        "Completely redesigned mobile upload interface",
        "Better camera integration for direct photo sharing",
        "Fixed layout issues on small screens",
        "Improved touch controls for drag and drop"
      ],
      author: {
        name: "Sarah Lopez",
        role: "UI/UX Designer"
      }
    },
    {
      version: "1.2.0",
      date: "May 2, 2023",
      title: "Multi-file Upload Support",
      description: "You can now upload and share multiple files at once with FileSwift's new batch upload feature.",
      tags: [
        { name: "Feature", color: "bg-green-500" }
      ],
      highlights: [
        "Upload up to 10 files simultaneously (total 100MB limit)",
        "Batch progress tracking with detailed status indicators",
        "Improved error handling for partial upload failures",
        "Combined share links for easier distribution"
      ],
      author: {
        name: "David Kim",
        role: "Backend Developer"
      }
    },
    {
      version: "1.1.2",
      date: "April 14, 2023",
      title: "Accessibility Improvements",
      description: "Making FileSwift accessible to everyone with comprehensive keyboard navigation and screen reader support.",
      tags: [
        { name: "Accessibility", color: "bg-amber-500" },
        { name: "Enhancement", color: "bg-blue-500" }
      ],
      highlights: [
        "Full keyboard navigation support throughout the application",
        "ARIA attributes for improved screen reader compatibility",
        "Enhanced color contrast ratios for better visibility",
        "Focus indicators and skip navigation links"
      ],
      author: {
        name: "Jamie Taylor",
        role: "Accessibility Specialist"
      }
    },
    {
      version: "1.1.0",
      date: "March 26, 2023",
      title: "QR Code Sharing & Password Protection",
      description: "Introducing QR code generation for all shared files and optional password protection for enhanced security.",
      tags: [
        { name: "Feature", color: "bg-green-500" },
        { name: "Security", color: "bg-yellow-500" }
      ],
      highlights: [
        "One-click QR code generation for any shared file",
        "Optional password protection for sensitive documents",
        "Download statistics to track file access",
        "Improved file preview capabilities"
      ],
      author: {
        name: "Michael Wong",
        role: "Product Manager"
      }
    },
    {
      version: "1.0.5",
      date: "February 18, 2023",
      title: "Performance Optimizations",
      description: "Significant speed improvements for file uploads and downloads, particularly for larger files and slower connections.",
      tags: [
        { name: "Performance", color: "bg-indigo-500" },
        { name: "Bug Fix", color: "bg-red-500" }
      ],
      highlights: [
        "Reduced upload times by implementing chunked file transfers",
        "Optimized backend storage processes for faster retrieval",
        "Fixed timeout issues on slower network connections",
        "Improved progress reporting accuracy"
      ],
      author: {
        name: "Emma Johnson",
        role: "Systems Engineer"
      }
    },
    {
      version: "1.0.0",
      date: "January 25, 2023",
      title: "Initial Release",
      description: "The first public release of FileSwift - instant file sharing without accounts or complicated setup.",
      tags: [
        { name: "Release", color: "bg-purple-500" }
      ],
      highlights: [
        "Simple drag-and-drop file uploading up to 100MB",
        "Instant shareable links generated automatically",
        "Automatic file deletion after download or 24 hours",
        "Clean, responsive interface that works on all devices",
        "No registration or account creation required"
      ],
      author: {
        name: "FileSwift Team",
        role: "Core Development"
      }
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
          className="w-full max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Changelog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our journey as we improve FileSwift with new features and enhancements.
              We're constantly working to make file sharing faster and easier.
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative pl-6 md:pl-8">
            {/* Timeline items */}
            <div className="space-y-16">
              {changelogItems.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  item={item} 
                  index={index}
                  isLatest={index === 0}
                />
              ))}
            </div>
            </div>
            
          {/* What's next section */}
          <div className="mt-24 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Coming Next?</h2>
            <p className="text-gray-700 mb-4">
              We're working on some exciting new features for FileSwift. Here's a sneak peek at what's in development:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>File Previews</strong> - Preview documents, images, and videos before downloading</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Folder Uploads</strong> - Share entire folders with their structure intact</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Email Delivery</strong> - Send files directly to recipients' email addresses</span>
              </li>
            </ul>
            <div className="mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
                Follow us on GitHub for updates
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function TimelineItem({ 
  item,
  index,
  isLatest
}: { 
  item: ChangelogItem;
  index: number;
  isLatest: boolean;
}) {
  return (
    <motion.div 
      id={`v${item.version}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >      
      {/* Content */}
      <div className="w-full">
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center mb-2 md:mb-0">
              <time className="text-sm text-gray-500">{item.date}</time>
              
              {/* Current tag with shimmer animation for latest item only */}
              {isLatest && (
                <div className="ml-3 relative">
                  <style dangerouslySetInnerHTML={{ __html: shimmerAnimation }} />
                  <span className="text-xs font-semibold py-1 px-2.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white relative overflow-hidden">
                    CURRENT
                    <span className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: 'shimmer 2s infinite' }}></span>
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, tagIndex) => (
                <span 
                  key={tagIndex} 
                  className={`${tag.color} text-white text-xs py-1 px-2 rounded-full`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {item.title}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {item.description}
          </p>
          
          {item.highlights && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h4 className="font-medium text-gray-700 mb-2">Highlights:</h4>
              <ul className="space-y-1.5 text-sm">
                {item.highlights.map((highlight, highlightIndex) => (
                  <li 
                    key={highlightIndex} 
                    className="flex items-start"
                  >
                    <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-4 flex items-center border-t border-gray-100 pt-4 text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>
              FileSwift - <span className="text-purple-600">made by Suraj</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 