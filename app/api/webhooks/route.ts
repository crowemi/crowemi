import crypto from "node:crypto";

import { getConfig } from "../../lib/config";


function verify(body: string, signature: string | null): boolean {
  if (!signature) {
    return false;
  }
  
  const expected = `sha256=${crypto.createHmac("sha256", getConfig().notion.secret).update(body).digest("hex")}`
  const encoder = new TextEncoder();
  const expectedBytes = encoder.encode(expected);
  const signatureBytes = encoder.encode(signature);

  if (signatureBytes.length !== expectedBytes.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBytes, signatureBytes);
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    const signature = request.headers.get("X-Notion-Signature");

    const verified = verify(raw, signature);
    if (!verified) {
      return new Response("Invalid signature", { status: 401 });
    }

    const body = JSON.parse(raw);
    console.log("Received webhook:", body);
    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}