import api from 'services/api/api'

type Method = 'post' | 'get'

export const failedAPIResponse = ({ method }: { method: Method }): void => {
  const error = 'Network Error'

  jest
    .spyOn(api, method)
    .mockImplementation(() => Promise.reject(new Error(error)))
}
