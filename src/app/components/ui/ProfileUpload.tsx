"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ProfileUploadProps {
  initialImage?: string | null;
  onChange: (file: File | null) => void;
  className?: string;
}

export default function ProfileUpload({ initialImage, onChange, className = '' }: ProfileUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center">
        <div 
          className={`relative group flex justify-center items-center border-2 ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'} ${preview ? 'border-opacity-50' : ''} border-dashed rounded-full h-24 w-24 overflow-hidden cursor-pointer transition-all hover:border-purple-500`}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {preview ? (
            <>
              <Image 
                src={preview} 
                alt="Profile preview" 
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </>
          ) : (
            <>
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-700">Profile Photo</div>
          <div className="mt-1 flex space-x-2">
            <button 
              type="button" 
              onClick={triggerFileInput}
              className="text-xs text-purple-600 hover:text-purple-500"
            >
              {preview ? 'Change' : 'Upload'}
            </button>
            {preview && (
              <button 
                type="button" 
                onClick={handleRemove}
                className="text-xs text-gray-600 hover:text-gray-500"
              >
                Remove
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            JPG, PNG or GIF. 1MB max.
          </p>
        </div>
      </div>
    </div>
  );
} 