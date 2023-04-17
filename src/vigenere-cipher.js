const { NotImplementedError } = require('../extensions/index.js')

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.reverse = !direct
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  }

  encrypt(str, key) {
    if (!str || !key) {
      throw new Error('Incorrect arguments!')
    }
    let keyIndex = 0
    const encrypted = str.split('').map((char) => {
      if (!this.alphabet.includes(char.toLowerCase())) {
        return char
      }
      const charIndex = this.alphabet.indexOf(char.toLowerCase())
      const keyCharIndex = this.alphabet.indexOf(key[keyIndex].toLowerCase())
      keyIndex = (keyIndex + 1) % key.length
      const encryptedIndex = (charIndex + keyCharIndex) % this.alphabet.length
      return this.alphabet[encryptedIndex]
    })

    return this.reverse ? encrypted.reverse().join('').toUpperCase() : encrypted.join('').toUpperCase()
  }

  decrypt(str, key) {
    if (!str || !key) {
      throw new Error('Incorrect arguments!')
    }
    let keyIndex = 0
    const decrypted = str.split('').map((char) => {
      if (!this.alphabet.includes(char.toLowerCase())) {
        return char
      }
      const charIndex = this.alphabet.indexOf(char.toLowerCase())
      const keyCharIndex = this.alphabet.indexOf(key[keyIndex].toLowerCase())
      keyIndex = (keyIndex + 1) % key.length
      const decryptedIndex = (charIndex - keyCharIndex + this.alphabet.length) % this.alphabet.length

      return this.alphabet[decryptedIndex]
    })

    return this.reverse ? decrypted.reverse().join('').toUpperCase() : decrypted.join('').toUpperCase()
  }
}

module.exports = {
  VigenereCipheringMachine,
}
