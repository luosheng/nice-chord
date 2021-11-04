export type Tune = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
export type Octave = number

export class Pitch {
  constructor(public readonly tune: Tune, public readonly octave: Octave) { }

  static fromString(str: string): Pitch {
    const [tune, octave] = str.split('')
    return new Pitch(tune as Tune, parseInt(octave))
  }

  toString(): string {
    return `${this.tune}${this.octave}`
  }
}
