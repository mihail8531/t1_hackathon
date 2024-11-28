import BaseService from '../baseService';

import type { GetAllModelsResponse, GetUserModelsResponse, SetAPIKeyPayload, SetUserModelsPayload } from './@types';

export default class RAGService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async getAllModels() {
    const res = await this.request<GetAllModelsResponse>('/llm/list');
    return res;
  }

  public async getUserModels() {
    const res = await this.request<GetUserModelsResponse>('/user/tenant_info');
    return res;
  }

  public async setUserModels(payload: SetUserModelsPayload) {
    const res = await this.request('/user/tenant_info', {
      method: this.methods.POST,
      body: payload
    });
    return res;
  }

  public async setAPIKey(payload: SetAPIKeyPayload) {
    const res = await this.request<GetAllModelsResponse>('/llm/set_api_key', {
      method: this.methods.POST,
      body: payload
    });
    return res;
  }
}
