import BaseService from '../baseService';
export default class APIService extends BaseService {
    constructor(proxy, version) {
        super(proxy, version);
    }
    async uploadFile(payload, params) {
        const res = await this.request('/documents/new', {
            method: this.methods.POST,
            body: payload,
            params
        });
        return res;
    }
    async createWindow(payload) {
        const res = await this.request('/assistant_window/', {
            method: this.methods.POST,
            body: payload
        });
        return res;
    }
    async updateWindow(payload, id) {
        const res = await this.request('/assistant_window/' + id, {
            method: this.methods.PATCH,
            body: payload
        });
        return res;
    }
}
