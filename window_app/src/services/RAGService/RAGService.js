import BaseService from '../baseService';
export default class RAGService extends BaseService {
    constructor(proxy, version) {
        super(proxy, version);
    }
    async getAssistans() {
        const res = await this.request('/chats');
        return res;
    }
    async sendMessage(id, payload) {
        const res = await this.request(`/chats/${id}/completions`, {
            method: this.methods.POST,
            body: payload
        });
        return res;
    }
}
