import axios from 'axios'

export const fetcher = <T>(url: string): Promise<T> =>
  axios.get(url).then(res => res.data)
