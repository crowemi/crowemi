import { Firestore } from '@google-cloud/firestore'

import { getConfig } from './config'

let firestoreInstance: Firestore | null = null

function getFirestore(): Firestore {
  if (!firestoreInstance) {
    const { firestore } = getConfig()
    firestoreInstance = new Firestore({
      projectId: firestore.projectId,
      credentials: {
        client_email: firestore.clientEmail,
        private_key: firestore.privateKey,
      },
    })
  }

  return firestoreInstance
}

export async function queryDocuments<T extends Record<string, unknown>>(
  collection: string,
  field: string,
  value: unknown
): Promise<Array<T & { id: string }>> {
  const snapshot = await getFirestore()
    .collection(collection)
    .where(field, '==', value)
    .get()

  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }))
}

export async function addDocument(
  collection: string,
  data: Record<string, unknown>
): Promise<string> {
  const ref = await getFirestore().collection(collection).add(data)
  return ref.id
}

export async function getDocument<T extends Record<string, unknown>>(
  collection: string,
  id: string
): Promise<(T & { id: string }) | null> {
  const doc = await getFirestore().collection(collection).doc(id).get()
  if (!doc.exists) {
    return null
  }

  return { id: doc.id, ...(doc.data() as T) }
}

export async function updateDocument(
  collection: string,
  id: string,
  data: Record<string, unknown>
): Promise<void> {
  await getFirestore().collection(collection).doc(id).update(data)
}

export async function deleteDocument(
  collection: string,
  id: string
): Promise<void> {
  await getFirestore().collection(collection).doc(id).delete()
}