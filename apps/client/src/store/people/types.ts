/* istanbul ignore file */

export type State = {
  message: string
  people: string[]
}

export enum Types {
  CHANGE_TEXT = 'people/CHANGE_TEXT',
  UPDATE = 'people/UPDATE'
}

export type Payload = {
  [Types.CHANGE_TEXT]: {
    message: string
  }
  [Types.UPDATE]: {
    people: string[]
  }
}

export type Selector = {
  getMessage(): string
  countPeople(): number
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>]
