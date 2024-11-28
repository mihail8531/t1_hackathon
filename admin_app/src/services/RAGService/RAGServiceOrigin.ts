import BaseService from '../baseService';
import type { GetDatasetsResponse, SetDatasetResponse } from './@types';

export default class RAGService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async getDatasets() {
    const res = await this.request<GetDatasetsResponse>('/datasets');
    return res;
  }

  public async setDataset(payload: { name: string }) {
    const res = await this.request<SetDatasetResponse>('/datasets', {
      method: this.methods.POST,
      body: payload
    });
    return res;
  }

  public async createAssistant(payload: { dataset_ids: string[]; name: string }) {
    const res = await this.request<SetDatasetResponse>('/chats', {
      method: this.methods.POST,
      body: payload
    });
    return res;
  }
}
