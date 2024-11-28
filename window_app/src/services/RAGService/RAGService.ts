import BaseService from '../baseService';
import type { GetAssistansResponse, SendMessagePayload, SendMessageResponse } from './@types';

export default class RAGService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async getAssistans() {
    const res = await this.request<GetAssistansResponse>('/chats');
    return res;
  }

  public async sendMessage(id: string, payload: SendMessagePayload) {
    const res = await this.request<SendMessageResponse>(`/chats/${id}/completions`, {
      method: this.methods.POST,
      body: payload
    });
    return res;
  }
}
