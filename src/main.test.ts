import { Accidental, Pitch } from './main'

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
  const pitch = Pitch.parse('C4')
  expect(pitch.tune).toBe('C')
  expect(pitch.octave).toBe(4)

  const pitchWithAccidental = Pitch.parse('Cb4')
  expect(pitchWithAccidental.tune).toBe('C')
  expect(pitchWithAccidental.octave).toBe(4)
  expect(pitchWithAccidental.accidental).toBe(Accidental.Flat)
})

test('pitch interval', () => {
  const pitch1 = Pitch.parse('A4')
  const pitch2 = Pitch.parse('C5')
  expect(pitch2.intervalFrom(pitch1)).toBe(3)
})

test('pitch standard', () => {
  expect(Pitch.Standard.toString()).toBe('A4')
})

test('pitch frequency', () => {
  expect(Pitch.Standard.frequency).toBe(440)
  expect(Pitch.parse('C4').frequency).toBeCloseTo(261.6255653005986)
  expect(new Pitch('C', 4, Accidental.Sharp).frequency).toBeCloseTo(277.18263097687225)
  expect(Pitch.parse('C5').frequency).toBeCloseTo(523.2511306011972)
})
