// In-memory storage for received files
// In a production app, you would use a database
const receivedFilesMap: Record<string, Array<{ fileName: string, url: string, timestamp: string }>> = {};

// For persistence in serverless environment
const STORAGE_KEY = 'fileswift_received_files';

// Initialize from localStorage if in browser environment
const initializeFilesFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const storedFiles = localStorage.getItem(STORAGE_KEY);
      if (storedFiles) {
        const parsedFiles = JSON.parse(storedFiles);
        Object.keys(parsedFiles).forEach(key => {
          receivedFilesMap[key] = parsedFiles[key];
        });
      }
    } catch (error) {
      console.error('Error initializing files from storage:', error);
    }
  }
};

// Save files to localStorage
const saveFilesToStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(receivedFilesMap));
    } catch (error) {
      console.error('Error saving files to storage:', error);
    }
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  initializeFilesFromStorage();
}

export const storeReceivedFile = (
  sessionId: string,
  fileName: string,
  url: string
): void => {
  if (!receivedFilesMap[sessionId]) {
    receivedFilesMap[sessionId] = [];
  }
  
  receivedFilesMap[sessionId].push({
    fileName,
    url,
    timestamp: new Date().toISOString()
  });
  
  saveFilesToStorage();
};

export const getReceivedFiles = (
  sessionId: string
): Array<{ fileName: string, url: string, timestamp: string }> => {
  // Refresh from storage to ensure latest data
  if (typeof window !== 'undefined') {
    initializeFilesFromStorage();
  }
  return receivedFilesMap[sessionId] || [];
};

export const clearReceivedFiles = (sessionId: string): void => {
  if (receivedFilesMap[sessionId]) {
    delete receivedFilesMap[sessionId];
    saveFilesToStorage();
  }
}; 