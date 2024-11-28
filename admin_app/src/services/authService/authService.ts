import BaseService from '../baseService';

export default class AuthService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async get() {
    const res = await this.request('/llm/list');
    return res;
  }
}
