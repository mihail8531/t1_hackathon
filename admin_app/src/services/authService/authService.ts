import BaseService from '../baseService';

import type { GetTokensResponse } from './@types';

export default class AuthService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async getTokens() {
    const res = await this.request<GetTokensResponse>('/token');
    return res;
  }
}
