import * as fs from 'fs'
import * as path from 'path'

export interface FirestoreConfig {
  projectId: string
  clientEmail: string
  privateKey: string
}

export interface NotionConfig {
  apiKey: string
  databaseId: string
}

export interface AppConfig {
  firestore: FirestoreConfig
  notion: NotionConfig
}

function requireString(
  obj: Record<string, unknown>,
  key: string
): string {
  const value = obj[key]
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Config must contain "${key}" as a non-empty string`)
  }
  return value
}

function loadRawConfig(): Record<string, unknown> {
  const raw = process.env.CONFIG
  if (raw) {
    try {
      const decoded = Buffer.from(raw, 'base64').toString('utf-8')
      return JSON.parse(decoded) as Record<string, unknown>
    } catch {
      throw new Error('CONFIG is not valid base64-encoded JSON')
    }
  }

  const filePath = path.resolve(process.cwd(), '.secrets/config.json')
  try {
    const contents = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(contents) as Record<string, unknown>
  } catch {
    throw new Error(
      'CONFIG environment variable is not set and .secrets/config.json was not found'
    )
  }
}

export function getConfig(): AppConfig {
  const parsed = loadRawConfig()

  if (parsed.firestore || parsed.notion) {
    const firestoreObj = (parsed.firestore as Record<string, unknown>) ?? {}
    const notionObj = (parsed.notion as Record<string, unknown>) ?? {}

    return {
      firestore: {
        projectId: requireString(firestoreObj, 'project_id'),
        clientEmail: requireString(firestoreObj, 'client_email'),
        privateKey: requireString(firestoreObj, 'private_key'),
      },
      notion: {
        apiKey: requireString(notionObj, 'api_key'),
        databaseId: requireString(notionObj, 'database_id'),
      },
    }
  }

  return {
    firestore: {
      projectId: requireString(parsed, 'project_id'),
      clientEmail: requireString(parsed, 'client_email'),
      privateKey: requireString(parsed, 'private_key'),
    },
    notion: {
      apiKey: requireString(parsed, 'notion_api_key'),
      databaseId: requireString(parsed, 'notion_database_id'),
    },
  }
}
