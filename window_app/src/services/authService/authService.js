import BaseService from '../baseService';
export default class AuthService extends BaseService {
    constructor(proxy, version) {
        super(proxy, version);
    }
    async getTokens() {
        const res = await this.request('/auth/token');
        return res;
    }
    async getWindow(id) {
        const res = await this.request('/assistant_window/' + id);
        return res;
    }
    async getAllWindows() {
        const res = await this.request('/assistant_window/');
        return res;
    }
}
