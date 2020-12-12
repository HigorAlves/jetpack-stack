export type State = {
  message: string
  people: string[]
}

export enum Types {
  CHANGE_TEXT = 'CHANGE_TEXT',
  UPDATE_PEOPLE = 'UPDATE_PEOPLE'
}

export type Payload = {
  [Types.CHANGE_TEXT]: {
    message: string
  }
  [Types.UPDATE_PEOPLE]: {
    people: string[]
  }
}

export type Selector = {
  getMessage(): string
  countPeople(): number
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>]
