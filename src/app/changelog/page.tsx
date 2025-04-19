'use client'

import { motion } from 'framer-motion'
import Navbar from '@/app/components/Navbar'

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
  // Simplified changelog data with only two most recent updates
  const changelogItems: ChangelogItem[] = [
    {
      version: "1.4.0",
      date: "April 19, 2025",
      title: "Authentication System (Beta)",
      description: "Introducing user accounts and authentication for enhanced file management and sharing capabilities. Currently in beta while we fine-tune the experience.",
      tags: [
        { name: "Feature", color: "bg-green-500" },
        { name: "Beta", color: "bg-orange-500" }
      ],
      highlights: [
        "User registration and login with email/password",
        "Social authentication with GitHub and Google",
        "Persistent file storage for logged-in users",
        "Enhanced security with JWT and secure session management",
        "Custom profile settings and visibility controls"
      ]
    },
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
      ]
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
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative pl-6 md:pl-8">
            {/* Timeline items - showing only two most recent updates */}
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
  const betaTag = item.tags.find(tag => tag.name === "Beta");
  
  return (
    <motion.div 
      id={`v${item.version}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >      
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
                    <svg className="w-4 h-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 