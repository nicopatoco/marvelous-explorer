import { generateMD5, now, oneDay } from './utils'

describe('Utility Functions', () => {
  test('generateMD5 produces a correct MD5 hash', () => {
    const input = 'Test String'
    const output = generateMD5(input)
    expect(output).toBe('bd08ba3c982eaad768602536fb8e1184')
  })

  test('now returns a timestamp close to Date.now()', () => {
    const timestamp = now()
    const realTimestamp = Date.now()
    expect(timestamp).toBeCloseTo(realTimestamp, -2) // Allowing some leeway
  })

  test('oneDay returns milliseconds in one day', () => {
    expect(oneDay()).toBe(24 * 60 * 60 * 1000)
  })
})
