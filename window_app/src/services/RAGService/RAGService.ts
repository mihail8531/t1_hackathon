import BaseService from '../baseService';
import { GetAssistansResponse, SendMessagePayload, SendMessageResponse } from './@types';

const headers = { Authorization: 'Bearer ragflow-IxODljYzgwYWNkZTExZWY4N2QyMDI0Mm' };

export default class RAGService extends BaseService {
  constructor(proxy: string, version?: string) {
    super(proxy, version);
  }

  public async getAssistans() {
    const res = await this.request<GetAssistansResponse>('chats/', {
      headers
    });
    return res;
  }

  public async sendMessage(id: string, payload: SendMessagePayload) {
    const res = await this.request<SendMessageResponse>(`chats/${id}/completions`, {
      headers,
      method: this.methods.POST,
      body: payload
    });
    return res;
  }
}
