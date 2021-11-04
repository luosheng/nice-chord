import { Accidental, Pitch } from './pitch'

test('pitch creation', () => {
  const pitch = new Pitch('C', 4)
  expect(pitch.tune).toBe('C')
  expect(pitch.octave).toBe(4)
  expect(pitch.toString()).toBe('C4')
})

test('pitch creation with accidentail', () => {
  const pitchSharp = new Pitch('C', 4, Accidental.Sharp)
  expect(pitchSharp.toString()).toBe('C♯4')

  const pitchFlat = new Pitch('C', 4, Accidental.Flat)
  expect(pitchFlat.toString()).toBe('C♭4')
})

test('pitch decomposition', () => {
  const pitch = Pitch.fromString('C4')
  expect(pitch.tune).toBe('C')
  expect(pitch.octave).toBe(4)
})
