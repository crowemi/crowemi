import { Storage } from '@google-cloud/storage';
import axios from 'axios';
import crypto from 'crypto';
import path from 'path';

// --- Configuration ---
// Retrieve GCS bucket name from environment variable or config
// IMPORTANT: Ensure GCS_BUCKET_NAME is set in your environment or config.ts
// If not set, this function will log a warning and return the original URL.
const bucketName = process.env.GCS_BUCKET_NAME || process.env.CONFIG_GCS_BUCKET; // Assuming CONFIG_GCS_BUCKET could be a fallback from config

let storageClient: Storage | null = null;

function getStorageClient(): Storage {
  if (!storageClient) {
    // If running on GCP (e.g., Cloud Run), the client can infer credentials automatically.
    // For local development, ensure GOOGLE_APPLICATION_CREDENTIALS environment variable is set
    // to the path of your service account key file.
    storageClient = new Storage();
  }
  return storageClient;
}

// --- Helper Functions ---

/**
 * Generates a safe filename for GCS, using a hash of the URL and the original extension.
 */
async function generateGcsPath(url: string, pageId: string, blockId: string): Promise<string> {
  const parsedUrl = new URL(url);
  const extension = path.extname(parsedUrl.pathname) || '.jpg'; // Default to .jpg if no extension
  const filenameHash = crypto.createHash('md5').update(url).digest('hex');
  // Structure: posts/{pageId}/{blockId/cover}_{hash}{ext}
  // Using blockId for block images, and a generic 'cover' for page covers
  const objectName = `posts/${pageId}/${blockId === 'cover' ? 'cover' : blockId}_${filenameHash}${extension}`;
  return objectName;
}

/**
 * Downloads an image from a URL.
 */
async function downloadImage(url: string): Promise<{ data: Buffer; contentType: string | null }> {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    const contentType = response.headers['content-type'];
    return { data: Buffer.from(response.data), contentType: contentType || null };
  } catch (error: any) {
    console.error(`Failed to download image from ${url}:`, error.message);
    throw error;
  }
}

/**
 * Uploads a file buffer to Google Cloud Storage.
 * @param buffer - The file content as a buffer.
 * @param gcsPath - The desired path in the GCS bucket.
 * @param contentType - The MIME type of the file.
 * @returns The public URL of the uploaded file.
 */
async function uploadToGcs(buffer: Buffer, gcsPath: string, contentType: string | null): Promise<string> {
  if (!bucketName) {
    throw new Error('GCS bucket name is not configured.');
  }

  const storage = getStorageClient();
  const bucket = storage.bucket(bucketName);

  const file = bucket.file(gcsPath);

  try {
    await file.save(buffer, {
      metadata: {
        contentType: contentType || 'application/octet-stream', // Default to octet-stream if not known
      },
    });

    // Make the file publicly accessible (ensure bucket policy allows this or configure ACLs)
    await file.makePublic();

    // Return the public URL
    return `https://storage.googleapis.com/${bucketName}/${gcsPath}`;
  } catch (error: any) {
    console.error(`Failed to upload file to GCS at ${gcsPath}:`, error.message);
    throw error;
  }
}

// --- Main Exported Function ---

/**
 * Downloads an image from a URL and uploads it to Google Cloud Storage.
 *
 * @param url - The URL of the image to upload.
 * @param pageId - The Notion page ID, used for organizing uploads in GCS.
 * @param blockId - The Notion block ID, used for organizing uploads in GCS.
 * @returns A Promise that resolves with the public URL of the uploaded image in GCS,
 *          or the original URL if upload fails or is not configured.
 */
export async function uploadFromUrl(url: string, pageId: string, blockId: string): Promise<string> {
  if (!bucketName) {
    console.warn('GCS bucket name is not configured. Skipping image upload and returning original URL:', url);
    return url;
  }

  try {
    const { data, contentType } = await downloadImage(url);
    const gcsPath = await generateGcsPath(url, pageId, blockId);
    const publicUrl = await uploadToGcs(data, gcsPath, contentType);
    console.log(`Successfully uploaded image to GCS: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error(`Failed to upload image for URL ${url}. Returning original URL.`, error);
    return url; // Fallback to original URL on error
  }
}
