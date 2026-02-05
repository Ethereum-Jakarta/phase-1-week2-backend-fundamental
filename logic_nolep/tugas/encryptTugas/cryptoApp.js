import { generateKeyPairSync, createSign, createVerify, createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto';

const algorithm = 'aes-256-cbc'

// Hash secretKey/password to 32 bytes long hash
const getValidKey = key => createHash('sha256').update(key).digest();

// Encrypt using symmetric Encryption and signing
export function encrypt(text, userPassword){
    // generate private and public key
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding : {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding : {
            type: 'pkcs8',
            format: 'pem',
            cipher: algorithm,
            passphrase: userPassword
        }
    })

    // ENCRYPT
    // create Inititalization Vector
    const iv = randomBytes(16)
    const cipher = createCipheriv(algorithm, getValidKey(userPassword), iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const encyptedBundle = iv.toString('hex') + ':' + encrypted

    // SIGNING
    const signer = createSign('sha256');
    signer.update(encyptedBundle)
    const signature = signer.sign({ key: privateKey, passphrase: userPassword}, 'hex')

    return {
        encryptedText : encyptedBundle,
        signature : signature,
        publicKey :  publicKey
    }
}

export function decrypt(bundle, userPassword){
    const { encryptedText, signature, publicKey} = bundle;

    // VERIFY SIGNATURE
    const verifier = createVerify('sha256');
    verifier.update(encryptedText)
    const isVerified = verifier.verify(publicKey, signature, 'hex')

    if(!isVerified){
        throw new Error("SECURITY ALERT: Signature is invalid!")
    }

    // DECRYPT
    const [ivHex, data] = encryptedText.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const decipher = createDecipheriv(algorithm, getValidKey(userPassword), iv)

    let decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}
