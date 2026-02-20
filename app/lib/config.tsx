export interface FirestoreConfig {
  projectId: string
  clientEmail: string
  privateKey: string
}

export interface AppConfig {
  firestore: FirestoreConfig
}

/**
 * Parses base64-encoded JSON config from CONFIG.
 * Expected JSON keys: project_id, client_email, private_key.
 */
export function getConfig(): AppConfig {
  const raw = process.env.CONFIG
  if (!raw) {
    throw new Error('CONFIG environment variable is not set')
  }

  const decoded = Buffer.from(raw, 'base64').toString('utf-8')

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(decoded)
  } catch {
    throw new Error('CONFIG is not valid base64-encoded JSON')
  }

  const projectId = parsed.project_id
  const clientEmail = parsed.client_email
  const privateKey = parsed.private_key

  if (
    typeof projectId !== 'string' ||
    typeof clientEmail !== 'string' ||
    typeof privateKey !== 'string'
  ) {
    throw new Error(
      'CONFIG JSON must contain project_id, client_email, and private_key as strings'
    )
  }

  return {
    firestore: {
      projectId,
      clientEmail,
      privateKey,
    },
  }
}