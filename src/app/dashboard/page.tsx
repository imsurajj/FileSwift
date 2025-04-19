"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    recentFiles: 12,
    sharedFiles: 5,
    documents: 25,
    images: 18,
    videos: 5,
    other: 8
  });
  
  // Mock recent files data
  const recentFiles = [
    { id: 1, name: "Project Presentation.pptx", size: "4.2 MB", type: "presentation", updatedAt: "2 hours ago", thumbnail: "/thumbnails/presentation.png" },
    { id: 2, name: "Financial Report Q2.xlsx", size: "1.8 MB", type: "spreadsheet", updatedAt: "Yesterday", thumbnail: "/thumbnails/spreadsheet.png" },
    { id: 3, name: "Meeting Notes.docx", size: "0.5 MB", type: "document", updatedAt: "3 days ago", thumbnail: "/thumbnails/document.png" },
    { id: 4, name: "Product Mockup.png", size: "2.7 MB", type: "image", updatedAt: "1 week ago", thumbnail: "/thumbnails/image.png" },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      {/* Header with minimal greeting */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome, {session?.user?.name?.split(' ')[0] || 'User'}</p>
        </div>
        <div>
          <button className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Upload File
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 uppercase">Documents</p>
              <p className="text-xl font-bold text-gray-900">{stats.documents}</p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 uppercase">Images</p>
              <p className="text-xl font-bold text-gray-900">{stats.images}</p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: "32%" }}></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 uppercase">Videos</p>
              <p className="text-xl font-bold text-gray-900">{stats.videos}</p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "9%" }}></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 uppercase">Other</p>
              <p className="text-xl font-bold text-gray-900">{stats.other}</p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-gray-500 h-1.5 rounded-full" style={{ width: "14%" }}></div>
          </div>
        </div>
      </div>
      
      {/* Recent Files Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="font-medium text-gray-800">Recent Files</h2>
          <Link href="/dashboard/files" className="text-sm text-purple-600 font-medium hover:text-purple-800">View All</Link>
        </div>
        
        {isLoading ? (
          <div className="p-4">
            {Array(4).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex items-center p-2 mb-2 animate-pulse">
                <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-1/6 bg-gray-100 rounded"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentFiles.map((file) => (
              <li key={file.id} className="hover:bg-gray-50 transition-colors">
                <div className="flex items-center p-4">
                  <Image
                    className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                    src={file.thumbnail}
                    alt=""
                    width={48}
                    height={48}
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">{file.size}</span>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-300"></span>
                      <span className="text-xs text-gray-500">{file.updatedAt}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Download">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Share">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors" title="More options">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 