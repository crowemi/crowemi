export interface StorageConfig {
  bucketName: string
}

export interface FirestoreConfig {
  databaseId: string
}

export interface GcpConfig {
  projectId: string
  storage: StorageConfig
  firestore: FirestoreConfig
}

export interface NotionConfig {
  apiKey: string
  databaseId: string
}

export interface AppConfig {
  gcp: GcpConfig
  notion: NotionConfig
}

export function getConfig(): AppConfig {
  const raw = process.env.CONFIG
  if (!raw) {
    throw new Error('CONFIG environment variable is not set')
  }

  const decoded = Buffer.from(raw, 'base64').toString('utf-8')

  return JSON.parse(decoded) as AppConfig

}2