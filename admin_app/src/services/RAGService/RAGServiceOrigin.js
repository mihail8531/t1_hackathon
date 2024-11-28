import BaseService from '../baseService';
export default class RAGService extends BaseService {
    constructor(proxy, version) {
        super(proxy, version);
    }
    async getDatasets() {
        const res = await this.request('/datasets');
        return res;
    }
    async setDataset(payload) {
        const res = await this.request('/datasets', {
            method: this.methods.POST,
            body: payload
        });
        return res;
    }
    async createAssistant(payload) {
        const res = await this.request('/chats', {
            method: this.methods.POST,
            body: payload
        });
        return res;
    }
}
