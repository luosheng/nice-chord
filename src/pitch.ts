export type Tune = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
export type Octave = number
export enum Accidental {
  None = '',
  Sharp = '♯',
  Flat = '♭',
}

const DISTANCE = {
  'C': 0,
  'D': 2,
  'E': 4,
  'F': 5,
  'G': 7,
  'A': 9,
  'B': 11,
}

export class Pitch {

  private static standard: Pitch

  constructor(
    public readonly tune: Tune,
    public readonly octave: Octave,
    public readonly accidental = Accidental.None
  ) { }

  static get Standard(): Pitch {
    if (!Pitch.standard) {
      Pitch.standard = new Pitch('A', 4)
    }
    return Pitch.standard
  }

  static fromString(str: string): Pitch {
    const [tune, octave] = str.split('')
    return new Pitch(tune as Tune, parseInt(octave))
  }

  protected getIndex(): number {
    const i = DISTANCE[this.tune]
    let offset: number
    switch (this.accidental) {
      case Accidental.Sharp:
        offset = 1
        break
      case Accidental.Flat:
        offset = -1
        break
      default:
        offset = 0
        break
    }
    return i + offset + 12 * (this.octave - 1)
  }

  distanceFrom(pitch: Pitch): number {
    return this.getIndex() - pitch.getIndex()
  }

  toString(): string {
    return `${this.tune}${this.accidental}${this.octave}`
  }
}
