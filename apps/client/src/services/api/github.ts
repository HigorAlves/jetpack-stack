import { AxiosResponse } from 'axios'

import api from './api'

export const getOrganizationRepositories = async (
  organizationName: string
): Promise<AxiosResponse<Repository[]>> =>
  api.get<Repository[]>(`/orgs/${organizationName}/repos`)
