
import forge from 'node-forge'
import fs from 'fs'
import path from 'path'

/**
 * 文件加密 openssl enc -des3 -in input.txt -out input.enc
 * @param {String} sourceFile   源文件
 * @param {String} password     密码
 */
export function encrypt(sourceFile, password) {
  let input = fs.readFileSync(sourceFile, { encoding: 'binary' })

  // 3DES key and IV sizes
  let keySize = 24
  let ivSize = 8

  // get derived bytes
  // Notes:
  // 1. If using an alternative hash (eg: "-md sha1") pass
  //   "forge.md.sha1.create()" as the final parameter.
  // 2. If using "-nosalt", set salt to null.
  let salt = forge.random.getBytesSync(8)
  // let md = forge.md.sha1.create(); // "-md sha1"
  let derivedBytes = forge.pbe.opensslDeriveBytes(password, salt, keySize + ivSize/*, md*/)
  let buffer = forge.util.createBuffer(derivedBytes)
  let key = buffer.getBytes(keySize)
  let iv = buffer.getBytes(ivSize)

  let cipher = forge.cipher.createCipher('3DES-CBC', key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(input, 'binary'));
  cipher.finish();

  let output = forge.util.createBuffer();

  // if using a salt, prepend this to the output:
  if (salt !== null) {
    // (add to match openssl tool output)
    output.putBytes('Salted__')
    output.putBytes(salt)
  }
  output.putBuffer(cipher.output)

  fs.writeFileSync(path.join(path.dirname(sourceFile), path.basename(sourceFile, path.extname(sourceFile)), '.enc'), output.getBytes(), { encoding: 'binary' })
}

/**
 * 文件解密 openssl enc -d -des3 -in input.enc -out input.dec.txt
 * @param {String} sourceFile  源文件
 * @param {String} password    密码
 */
export function decrypt(sourceFile, password) {
  let input = fs.readFileSync(sourceFile, { encoding: 'binary' })

  // parse salt from input
  input = forge.util.createBuffer(input, 'binary')
  // skip "Salted__" (if known to be present)
  input.getBytes('Salted__'.length)
  // read 8-byte salt
  let salt = input.getBytes(8)

  // Note: if using "-nosalt", skip above parsing and use
  // let salt = null;

  // 3DES key and IV sizes
  let keySize = 24
  let ivSize = 8

  let derivedBytes = forge.pbe.opensslDeriveBytes(password, salt, keySize + ivSize)
  let buffer = forge.util.createBuffer(derivedBytes)
  let key = buffer.getBytes(keySize)
  let iv = buffer.getBytes(ivSize)

  let decipher = forge.cipher.createDecipher('3DES-CBC', key)
  decipher.start({ iv: iv })
  decipher.update(input)
  let result = decipher.finish() // check 'result' for true/false

  fs.writeFileSync(path.join(path.dirname(sourceFile), path.basename(sourceFile, path.extname(sourceFile)), '.txt'), decipher.output.getBytes(), { encoding: 'binary' })
}