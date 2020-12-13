import api from './api'

describe('api service', () => {
  it('should be return a singleton API instance', () => {
    expect(typeof api).toBe('function')
    expect(api.defaults.baseURL).toBe(process.env.REACT_APP_API)
    expect(api.defaults.timeout).toBe(3000)
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
  })
})
