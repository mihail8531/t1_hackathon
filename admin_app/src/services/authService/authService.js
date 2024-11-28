import BaseService from '../baseService';
export default class AuthService extends BaseService {
    constructor(proxy, version) {
        super(proxy, version);
    }
    async getTokens() {
        const res = await this.request('/token');
        return res;
    }
}
