/* istanbul ignore file */

export type State = {
  repositories: Repository[]
  error: string | null
  loading: boolean
}

export enum Types {
  GET_REPOSITORIES = 'github/GET_REPOSITORIES',
  GET_REPOSITORIES_SUCCESS = 'github/GET_REPOSITORIES_SUCCESS',
  GET_REPOSITORIES_ERROR = 'github/GET_REPOSITORIES_ERROR',
  ENABLE_LOADING = 'github/ENABLE_LOADING',
  DISABLE_LOADING = 'github/DISABLE_LOADING',
  CLEAR_ERROR = 'github/CLEAR_ERROR'
}

export type Payload = {
  [Types.GET_REPOSITORIES]: null
  [Types.GET_REPOSITORIES_SUCCESS]: Repository[]
  [Types.GET_REPOSITORIES_ERROR]: string
  [Types.ENABLE_LOADING]: null
  [Types.DISABLE_LOADING]: null
  [Types.CLEAR_ERROR]: null
}

export type Selector = {
  getRepositories(): Repository[]
  hasError(): string | null
  isLoading(): boolean
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>]
