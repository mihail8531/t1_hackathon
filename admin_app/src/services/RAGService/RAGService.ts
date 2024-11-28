import BaseService from '../baseService';

import type { GetAllModelsResponse } from './@types';

export default class RAGService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async getAllModels() {
    const res = await this.request<GetAllModelsResponse>('/llm/list');
    return res;
  }
}
