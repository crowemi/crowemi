export interface FirestoreConfig {
  projectId: string
  clientEmail: string
  privateKey: string
}

export interface NotionConfig {
  secret: string
}

export interface AppConfig {
  firestore: FirestoreConfig
  notion: NotionConfig
}

export function getConfig(): AppConfig {
  const raw = process.env.CONFIG
  if (!raw) {
    throw new Error('CONFIG environment variable is not set')
  }

  const decoded = Buffer.from(raw, 'base64').toString('utf-8')

  let config: AppConfig
  try {
    config = JSON.parse(decoded)
  } catch {
    throw new Error('CONFIG is not valid base64-encoded JSON')
  }

  return config
    
}