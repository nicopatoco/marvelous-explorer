import crypto from 'crypto'

// Function to generate MD5 hash
export function generateMD5(input: string) {
  return crypto.createHash('md5').update(input).digest('hex')
}

export function now() {
  return Date.now()
}

export function oneDay() {
  return 24 * 60 * 60 * 1000 // Milliseconds in one day
}
