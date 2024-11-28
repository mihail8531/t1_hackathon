import BaseService from '../baseService';

import type { GetTokensResponse } from './@types';
import type { GetWindowResponse } from '../RAGService/@types';

export default class AuthService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async getTokens() {
    const res = await this.request<GetTokensResponse>('/auth/token');
    return res;
  }

  public async getWindow(id: number) {
    const res = await this.request<GetWindowResponse>('/assistant_window/' + id);
    return res;
  }
}
