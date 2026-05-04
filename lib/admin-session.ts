import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

function signPayload(payloadB64url: string, secret: string) {
  return createHmac("sha256", secret).update(payloadB64url).digest("base64url");
}

/** Signed token: base64url(json).hmac — valid ~8h by default */
export function createAdminToken(secret: string, ttlMs = 8 * 60 * 60 * 1000) {
  const exp = Date.now() + ttlMs;
  const payload = Buffer.from(JSON.stringify({ exp }), "utf8").toString(
    "base64url",
  );
  const sig = signPayload(payload, secret);
  return `${payload}.${sig}`;
}

export function verifyAdminToken(token: string | undefined, secret: string) {
  if (!token?.length || !secret) return false;
  const dot = token.indexOf(".");
  if (dot < 1 || dot === token.length - 1) return false;
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expectedSig = signPayload(payloadB64, secret);
  if (sig.length !== expectedSig.length) return false;
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig)))
      return false;
  } catch {
    return false;
  }
  try {
    const json = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as { exp?: number };
    if (typeof json.exp !== "number" || Date.now() > json.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export function secretsEqual(provided: string, secret: string) {
  if (!provided.length || !secret.length || provided.length !== secret.length)
    return false;
  try {
    return timingSafeEqual(Buffer.from(provided, "utf8"), Buffer.from(secret, "utf8"));
  } catch {
    return false;
  }
}
