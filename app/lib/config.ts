export interface FirestoreConfig {
  projectId: string
  clientEmail: string
  privateKey: string
}

export interface NotionConfig {
  apiKey: string
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

  let parsed: Record<string, unknown>
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf-8')
    parsed = JSON.parse(decoded) as Record<string, unknown>
  } catch {
    throw new Error('CONFIG is not valid base64-encoded JSON')
  }

  const readString = (key: string): string => {
    const value = parsed[key]
    if (typeof value !== 'string' || value.length === 0) {
      throw new Error(`CONFIG JSON must contain ${key} as a non-empty string`)
    }
    return value
  }

  return {
    firestore: {
      projectId: readString('project_id'),
      clientEmail: readString('client_email'),
      privateKey: readString('private_key'),
    },
    notion: {
      apiKey: readString('notion_api_key'),
    },
  }
}