import { Pitch } from './pitch'

test('pitch creation', () => {
  const pitch = new Pitch('C', 4)
  expect(pitch.tune).toBe('C')
  expect(pitch.octave).toBe(4)
  expect(pitch.toString()).toBe('C4')
})
