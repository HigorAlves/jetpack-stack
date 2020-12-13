import api from 'services/api/api'

type Method = 'post' | 'get'

export const mockApiInstance = ({
  method,
  status,
  data
}: {
  method: Method
  status: number
  data: unknown
}): void => {
  jest
    .spyOn(api, method)
    .mockImplementation(() => Promise.resolve({ status, data }))
}
