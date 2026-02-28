
import { NextRequest, NextResponse } from 'next/server'
import { getConfig } from '@/lib/config'
import { createHmac } from 'crypto'
import { getPage, getPageBlocks } from '@/lib/notion'
import { uploadFromUrl } from '@/lib/storage'
import { renderBlocks } from '@/lib/notion-renderer'
import { setDocument } from '@/lib/firestore'

// Helper to recursively process blocks and upload images
async function processBlockImages(block: any, pageId: string, bucket: string | undefined): Promise<any> {
  if (!block) return null;

  // Handle blocks that contain other blocks (e.g., lists, columns)
  if (block.type && block.children) {
    block.children = await Promise.all(block.children.map((child: any) => processBlockImages(child, pageId, bucket)));
    return block;
  }

  // Handle image blocks
  if (block.type === 'image' && block.image?.type === 'file' && block.image.file?.url) {
    const notionUrl = block.image.file.url;
    const gcsUrl = await uploadFromUrl(notionUrl, pageId, block.id); // Use block.id for path generation
    return {
      ...block,
      image: {
        ...block.image,
        type: 'file', // Keep type as file
        file: {
          ...block.image.file,
          url: gcsUrl, // Replace with GCS URL
        },
      },
    };
  }

  // Handle other block types that might contain nested structures or image-like properties
  // This is a simplified example; a robust solution would traverse all possible nested structures.
  // For example, blocks like 'column_list', 'toggle', 'bulleted_list', 'numbered_list', etc.

  return block; // Return block as is if not an image or if no changes needed
}

// Enhanced function to process all blocks and upload images
async function processImagesInBlocks(blocks: any[], pageId: string, bucket: string | undefined): Promise<any[]> {
  console.log(\`Processing images for page ${pageId}...\`);
  const processedBlocks = await Promise.all(blocks.map(block => processBlockImages(block, pageId, bucket)));
  return processedBlocks;
}


async function processNotionPage(pageId: string, databaseId: string, bucket: string | undefined) {
  try {
    const page = await getPage(pageId);
    if (!page || page.parent?.type !== 'database_id' || page.parent.database_id !== databaseId) {
      console.log(`Skipping page ${pageId}: not from the target database.`);
      return;
    }

    // Upload cover image if exists
    let coverGcsUrl: string | null = null;
    if (page.cover && page.cover.type === 'external' && page.cover.external?.url) {
      try {
        coverGcsUrl = await uploadFromUrl(page.cover.external.url, pageId, 'cover');
      } catch (error) {
        console.error(`Failed to upload cover image for page ${pageId}:`, error);
      }
    } else if (page.cover && page.cover.type === 'file' && page.cover.file?.url) {
      try {
        coverGcsUrl = await uploadFromUrl(page.cover.file.url, pageId, 'cover');
      } catch (error) {
        console.error(`Failed to upload cover image for page ${pageId}:`, error);
      }
    }

    const blocks = await getPageBlocks(pageId);
    const processedBlocks = await processImagesInBlocks(blocks, pageId, bucket);
    const htmlContent = await renderBlocks(processedBlocks);

    const postData = {
      id: pageId, // Use Notion page ID as Firestore document ID
      title: page.properties.title?.title[0]?.plain_text || 'Untitled',
      author: page.properties.Author?.people?.[0]?.name || 'Anonymous', // Map from Notion 'Author' (People) property
      date: page.properties.Date?.date?.start ? new Date(page.properties.Date.date.start).toISOString().split('T')[0] : new Date().toISOString().split('T')[0], // Map from Notion 'Date' property
      blurb: page.properties.Description?.rich_text?.[0]?.plain_text || '', // Map from Notion 'Description' (Rich Text) property
      image: coverGcsUrl, // Use GCS URL for cover image
      tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [], // Map from Notion 'Tags' (Multi Select) property
      content: htmlContent,
      updatedAt: new Date(), // This will be overwritten by serverTimestamp in setDocument if available
    };

    console.log('Setting document in Firestore for page:', pageId);
    await setDocument('posts', pageId, postData);
    console.log('Successfully processed and stored page:', pageId);

  } catch (error) {
    console.error('Error processing Notion page:', pageId, error);
    // Consider returning an error response if processing fails critically
    // or implement a retry mechanism. For now, log and continue.
  }
}

export async function POST(request: NextRequest) {
  const { notionWebhookVerificationToken } = await getConfig();
  const secretToken = process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN || notionWebhookVerificationToken; // Fallback for local dev
  const bucketName = process.env.GCS_BUCKET_NAME || (await getConfig()).firestore?.gcsBucket; // Get GCS bucket from config or env

  // 1. Verification Step
  const verificationToken = request.nextUrl.searchParams.get('verification_token');
  if (verificationToken && verificationToken === secretToken) {
    return NextResponse.json({ verification_token: verificationToken });
  }

  // 2. Signature Validation
  const signature = request.headers.get('x-notion-signature');
  const rawBody = await request.text();

  // Only enforce validation if a secret token is configured
  if (secretToken) {
    if (!signature) {
      console.error('Missing Notion signature header. Rejecting request.');
      return new NextResponse('Missing signature header', { status: 401 });
    }

    const hmac = createHmac('sha256', secretToken);
    const computedSignature = `sha256=${hmac.update(rawBody).digest('hex')}`;

    if (signature !== computedSignature) {
      console.error('Invalid signature');
      return new NextResponse('Invalid signature', { status: 401 });
    }
    // If signature is valid, proceed
  } else {
    // If no secret token is configured, log a warning and skip validation
    console.warn('No Notion secret token configured. Skipping signature validation.');
  }

  // 3. Event Handling
  try {
    const event = JSON.parse(rawBody);
    const { type, id, properties } = event; // Assuming event structure

    if (type === 'page.created' || type === 'page.content_updated' || type === 'page.properties_updated') {
      const pageId = id;
      const { notion } = await getConfig();
      // Filter by databaseId here or within processNotionPage
      if (event.parent?.database_id === notion.databaseId) {
        // Process asynchronously to return 200 quickly
        processNotionPage(pageId, notion.databaseId, bucketName).catch(console.error);
        return NextResponse.json({ message: 'Processing page event...' });
      } else {
        console.log('Skipping event for non-target database:', event.parent?.database_id);
        return NextResponse.json({ message: 'Skipping event for non-target database' });
      }
    } else if (type === 'page.deleted') {
      const pageId = id;
      console.log('Handling page deletion:', pageId);
      // Implement deletion logic for Firestore document
      await deleteDocument('posts', pageId); // Assuming deleteDocument is available
      return NextResponse.json({ message: 'Processing page deletion...' });
    }

    return NextResponse.json({ message: 'Unhandled event type' });

  } catch (error) {
    console.error('Error processing webhook event:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
