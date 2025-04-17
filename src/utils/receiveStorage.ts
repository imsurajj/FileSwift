// In-memory storage for received files
// In a production app, you would use a database
const receivedFilesMap: Record<string, Array<{ fileName: string, url: string, timestamp: string }>> = {};

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
};

export const getReceivedFiles = (
  sessionId: string
): Array<{ fileName: string, url: string, timestamp: string }> => {
  return receivedFilesMap[sessionId] || [];
};

export const clearReceivedFiles = (sessionId: string): void => {
  delete receivedFilesMap[sessionId];
}; 