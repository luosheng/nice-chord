export type Tune = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
export type Octave = number
export enum Accidental {
  None = '',
  Sharp = '♯',
  Flat = '♭',
}

export class Pitch {
  constructor(
    public readonly tune: Tune,
    public readonly octave: Octave,
    public readonly accidental = Accidental.None
  ) { }

  static fromString(str: string): Pitch {
    const [tune, octave] = str.split('')
    return new Pitch(tune as Tune, parseInt(octave))
  }

  toString(): string {
    return `${this.tune}${this.accidental}${this.octave}`
  }
}
