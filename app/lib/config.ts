import * as fs from 'fs'
import * as path from 'path'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

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

function decodeBase64Json(raw: string): Record<string, unknown> {
  const decoded = Buffer.from(raw, 'base64').toString('utf-8')
  return JSON.parse(decoded) as Record<string, unknown>
}

async function loadFromGcpSecret(): Promise<string> {
  const client = new SecretManagerServiceClient()
  const [secret] = await client.accessSecretVersion({
    name: 'CONFIG/versions/latest',
  })
  const payload = secret.payload?.data
  if (!payload) {
    throw new Error('GCP secret CONFIG has no payload')
  }
  return typeof payload === 'string'
    ? payload
    : Buffer.from(payload).toString('utf-8')
}

let cachedConfig: AppConfig | null = null

async function loadRawConfig(): Promise<Record<string, unknown>> {
  const raw = process.env.CONFIG
  if (raw) {
    try {
      return decodeBase64Json(raw)
    } catch {
      throw new Error('CONFIG env var is not valid base64-encoded JSON')
    }
  }

  const filePath = path.resolve(process.cwd(), '.secrets/config.json')
  try {
    const contents = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(contents) as Record<string, unknown>
  } catch {
    // fall through to GCP Secret Manager
  }

  try {
    const secretValue = await loadFromGcpSecret()
    return decodeBase64Json(secretValue)
  } catch (err) {
    throw new Error(
      `Config not found: CONFIG env var not set, .secrets/config.json missing, and GCP secret lookup failed (${err instanceof Error ? err.message : err})`
    )
  }
}

function parseConfig(parsed: Record<string, unknown>): AppConfig {
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

export async function getConfig(): Promise<AppConfig> {
  if (cachedConfig) return cachedConfig

  const parsed = await loadRawConfig()
  cachedConfig = parseConfig(parsed)
  return cachedConfig
}
