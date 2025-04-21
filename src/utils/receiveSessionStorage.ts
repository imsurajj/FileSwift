// Store active receive sessions in memory
// In a production app, you would use a database
export const activeSessions: Record<string, { createdAt: number }> = {};

// For persistence in serverless environment
const STORAGE_KEY = 'fileswift_active_sessions';

// Initialize from localStorage if in browser environment
const initializeSessionsFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const storedSessions = localStorage.getItem(STORAGE_KEY);
      if (storedSessions) {
        const parsedSessions = JSON.parse(storedSessions);
        Object.keys(parsedSessions).forEach(key => {
          activeSessions[key] = parsedSessions[key];
        });
      }
    } catch (error) {
      console.error('Error initializing sessions from storage:', error);
    }
  }
};

// Save sessions to localStorage
const saveSessionsToStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeSessions));
    } catch (error) {
      console.error('Error saving sessions to storage:', error);
    }
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  initializeSessionsFromStorage();
}

// Register a new receive session
export const registerSession = (sessionId: string): void => {
  activeSessions[sessionId] = {
    createdAt: Date.now()
  };
  saveSessionsToStorage();
};

// Remove a receive session
export const removeSession = (sessionId: string): boolean => {
  if (activeSessions[sessionId]) {
    delete activeSessions[sessionId];
    saveSessionsToStorage();
    return true;
  }
  return false;
};

// Check if a session exists
export const sessionExists = (sessionId: string): boolean => {
  // Re-initialize from storage to ensure latest data
  if (typeof window !== 'undefined') {
    initializeSessionsFromStorage();
  }
  return !!activeSessions[sessionId];
};

// Clean up old sessions (older than 1 hour)
const HOUR_MS = 60 * 60 * 1000;

// Only run cleanup interval on the server - not during prerendering
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    Object.keys(activeSessions).forEach(key => {
      if (now - activeSessions[key].createdAt > HOUR_MS) {
        delete activeSessions[key];
      }
    });
  }, HOUR_MS);
} else {
  // Browser-side cleanup
  setInterval(() => {
    const now = Date.now();
    let hasChanges = false;
    
    Object.keys(activeSessions).forEach(key => {
      if (now - activeSessions[key].createdAt > HOUR_MS) {
        delete activeSessions[key];
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      saveSessionsToStorage();
    }
  }, 60000); // Check every minute in the browser
} 