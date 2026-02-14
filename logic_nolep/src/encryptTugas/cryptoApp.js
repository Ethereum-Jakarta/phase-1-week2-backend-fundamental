let crypto;

try {
  crypto = await import("node:crypto");
} catch (error) {
  console.error("crypto support is disabled!");
}

const algorithm = "aes-256-cbc";

function getKey(key) {
  return crypto.createHash("sha256").update(key).digest();
}

export function encrypt(text, key) {
  //code
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, getKey(key), iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(encryptedText, key) {
  //code
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, getKey(key), iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
