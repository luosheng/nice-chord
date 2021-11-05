export type Tune = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
export type Octave = number
export enum Accidental {
  None = '',
  Sharp = '♯',
  Flat = '♭',
}
export type Interval = number

const INTERVALS: Record<Tune, Interval> = {
  'C': 0,
  'D': 2,
  'E': 4,
  'F': 5,
  'G': 7,
  'A': 9,
  'B': 11,
}

const PITCH_PATTERN = /^([A-G])([#♯b♭]?)(\d)$/

const STANDARD_FREQUENCY = 440
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

  static parse(str: string): Pitch {
    const match = PITCH_PATTERN.exec(str)
    if (!match) {
      throw new Error(`Invalid pitch: ${str}`)
    }
    let accidental: string = match[2]
    if (accidental === '#') {
      accidental = Accidental.Sharp
    } else if (accidental === 'b') {
      accidental = Accidental.Flat
    }
    return new Pitch(match[1] as Tune, parseInt(match[3]), accidental as Accidental)
  }

  static fromIndex(index: number): Pitch {
    const octave = Math.floor(index / 12)
    const mod = index % 12
    const intervalKeys = Object.keys(INTERVALS) as Tune[]
    const tuneIndex = mod === 11 ? intervalKeys.length : intervalKeys.findIndex(key => INTERVALS[key] > mod)
    const tune = intervalKeys[tuneIndex - 1]
    const interval = INTERVALS[tune]
    const accidental = interval === mod ? Accidental.None : Accidental.Sharp
    return new Pitch(tune, octave, accidental)
  }

  protected getIndex(): number {
    const i = INTERVALS[this.tune]
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
    return i + offset + 12 * this.octave
  }

  intervalFrom(pitch: Pitch): Interval {
    return this.getIndex() - pitch.getIndex()
  }

  addInterval(interval: Interval): Pitch {
    return Pitch.fromIndex(this.getIndex() + interval)
  }

  get frequency(): number {
    return STANDARD_FREQUENCY * Math.pow(2, this.intervalFrom(Pitch.Standard) / 12)
  }

  toString(): string {
    return `${this.tune}${this.accidental}${this.octave}`
  }
}
