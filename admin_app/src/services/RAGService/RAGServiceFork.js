import BaseService from '../baseService';
export default class RAGService extends BaseService {
    constructor(proxy, version) {
        super(proxy, version);
    }
    async getAllModels() {
        const res = await this.request('/llm/list');
        return res;
    }
    async getUserModels() {
        const res = await this.request('/user/tenant_info');
        return res;
    }
    async setUserModels(payload) {
        const res = await this.request('/user/set_tenant_info', {
            method: this.methods.POST,
            body: payload
        });
        return res;
    }
    async setAPIKey(payload) {
        const res = await this.request('/llm/set_api_key', {
            method: this.methods.POST,
            body: payload
        });
        return res;
    }
    async runDocument(payload) {
        const res = await this.request('/document/run', {
            method: this.methods.POST,
            body: payload
        });
        return res;
    }
}
