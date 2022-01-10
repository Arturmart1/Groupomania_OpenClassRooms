const AesEncryption = require('aes-encryption')

const aes = new AesEncryption()
aes.setSecretKey(process.env.ENCRYPT_KEY)

const encrypted = aes.encrypt('some-plain-text')
const decrypted = aes.decrypt(encrypted)

console.log('encrypted >>>>>>', encrypted)
console.log('decrypted >>>>>>', decrypted)


module.exports = AesEncryption;