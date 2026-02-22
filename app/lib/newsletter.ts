'use server'

import { addDocument, queryDocuments } from './firestore'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SubscribeResult =
  | { success: true }
  | { success: false; error: string }

function sanitizeEmail(rawEmail: string): string {
  return rawEmail.trim().toLowerCase()
}

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

export async function subscribe(email: string): Promise<SubscribeResult> {
  const sanitizedEmail = sanitizeEmail(email)

  if (!isValidEmail(sanitizedEmail)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    const existing = await queryDocuments<{ email: string }>(
      'Newsletter',
      'email',
      sanitizedEmail
    )

    if (existing.length > 0) {
      return { success: false, error: 'This email is already subscribed.' }
    }

    await addDocument('Newsletter', {
      email: sanitizedEmail,
      subscribedAt: new Date().toISOString(),
    })

    return { success: true }
  } catch {
    return {
      success: false,
      error: 'Something went wrong while subscribing. Please try again.',
    }
  }
}
