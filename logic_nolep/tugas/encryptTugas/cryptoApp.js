import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto';

// AES-GCM (Symmetric Encryption)
const algorithm = 'aes-256-gcm'

// Hash secretKey/password to 32 bytes long hash
const getValidKey = key => createHash('sha256').update(key).digest();

// Encrypt using symmetric Encryption and signing
export function encrypt(text, userPassword){
    // ENCRYPT
    const iv = randomBytes(12) // create Inititalization Vector
    const cipher = createCipheriv(algorithm, getValidKey(userPassword), iv)
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const authTag =  cipher.getAuthTag().toString('hex') // authetication

    const encyptedBundle = `${iv.toString('hex')}:${authTag}:${encrypted}`

    return encyptedBundle
}

export function decrypt(bundle, userPassword){
    // DECRYPT
    const [ivHex, authTagHex, data] = bundle.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    const decipher = createDecipheriv(algorithm, getValidKey(userPassword), iv)

    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}
