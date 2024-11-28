import BaseService from '../baseService';

import type { CreateWindowPayload, CreateWindowResponse, UploadFileResponse } from '../RAGService/@types';

export default class APIService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async uploadFile(payload: FormData, params: URLSearchParams) {
    const res = await this.request<UploadFileResponse>('/documents/new', {
      method: this.methods.POST,
      body: payload,
      params
    });
    return res;
  }

  public async createWindow(payload: CreateWindowPayload) {
    const res = await this.request<CreateWindowResponse>('/assistant_window/', {
      method: this.methods.POST,
      body: payload
    });
    return res;
  }

  public async updateWindow(payload: CreateWindowPayload, id: string) {
    const res = await this.request<CreateWindowResponse>('/assistant_window/' + id, {
      method: this.methods.PATCH,
      body: payload
    });
    return res;
  }
}
