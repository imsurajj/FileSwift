// IndexedDB utilities for storing files in browser
const DB_NAME = 'FileSwiftDB'
const STORE_NAME = 'files'
const DB_VERSION = 1

export interface StoredFile {
    id: string
    sessionId: string
    name: string
    type: string
    size: number
    data: ArrayBuffer
    timestamp: number
}

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
                store.createIndex('sessionId', 'sessionId', { unique: false })
            }
        }
    })
}

export async function saveFile(sessionId: string, file: File): Promise<StoredFile> {
    const db = await openDB()
    const arrayBuffer = await file.arrayBuffer()

    const storedFile: StoredFile = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sessionId,
        name: file.name,
        type: file.type,
        size: file.size,
        data: arrayBuffer,
        timestamp: Date.now()
    }

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.add(storedFile)

        request.onsuccess = () => resolve(storedFile)
        request.onerror = () => reject(request.error)
    })
}

export async function getFilesBySession(sessionId: string): Promise<StoredFile[]> {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const index = store.index('sessionId')
        const request = index.getAll(sessionId)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export async function downloadFile(storedFile: StoredFile) {
    const blob = new Blob([storedFile.data], { type: storedFile.type || 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = storedFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
