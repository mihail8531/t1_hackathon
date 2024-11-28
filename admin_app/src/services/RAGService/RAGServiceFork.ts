import BaseService from '../baseService';

import type {
  GetAllModelsResponse,
  GetUserModelsResponse,
  SetAPIKeyPayload,
  SetUserModelsPayload,
  SetUserModelsResponse
} from './@types';

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
    const res = await this.request<SetUserModelsResponse>('/user/set_tenant_info', {
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

  public async runDocument(payload: { doc_ids: string[]; run: 1 }) {
    const res = await this.request<any>('/document/run', {
      method: this.methods.POST,
      body: payload
    });
    return res;
  }
}
