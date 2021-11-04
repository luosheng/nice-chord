export type Tune = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
export type Octave = number

export class Pitch {
  constructor(public readonly tune: Tune, public readonly octave: Octave) { }

  toString(): string {
    return `${this.tune}${this.octave}`
  }
}
