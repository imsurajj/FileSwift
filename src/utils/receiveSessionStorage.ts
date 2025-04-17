// Store active receive sessions in memory
// In a production app, you would use a database
export const activeSessions: Record<string, { createdAt: number }> = {};

// Register a new receive session
export const registerSession = (sessionId: string): void => {
  activeSessions[sessionId] = {
    createdAt: Date.now()
  };
};

// Remove a receive session
export const removeSession = (sessionId: string): boolean => {
  if (activeSessions[sessionId]) {
    delete activeSessions[sessionId];
    return true;
  }
  return false;
};

// Check if a session exists
export const sessionExists = (sessionId: string): boolean => {
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
} 