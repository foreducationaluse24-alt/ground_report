import crypto from "crypto";

export function contentHashing(content: string) {
  return crypto.createHash("sha256").update(content).digest("hex");
}
