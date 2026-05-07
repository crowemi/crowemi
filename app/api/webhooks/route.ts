import crypto from "node:crypto";

import { getConfig } from "../../lib/config";

function verify(body: string, signature: string | null, secret: string): boolean {
  if (!signature) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature.length !== expected.length) {
    return false;
  }

  const encoder = new TextEncoder();
  return crypto.timingSafeEqual(
    encoder.encode(signature),
    encoder.encode(expected)
  );
}

export async function POST(request: Request) {
  try {
    const config = getConfig();
    const rawBody = await request.text();
    // const signature = request.headers.get("x-signature");

    // const verified = verify(rawBody, signature, config.notion.secret);
    // if (!verified) {
    //   return new Response("Invalid signature", { status: 401 });
    // }

    const body = JSON.parse(rawBody);
    console.log("Received webhook:", body);
    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}