var HTTPMethods;
(function (HTTPMethods) {
    HTTPMethods["GET"] = "GET";
    HTTPMethods["POST"] = "POST";
    HTTPMethods["PATCH"] = "PATCH";
    HTTPMethods["PUT"] = "PUT";
    HTTPMethods["DELETE"] = "DELETE";
    HTTPMethods["OPTIONS"] = "OPTIONS";
    HTTPMethods["CONNECT"] = "CONNECT";
    HTTPMethods["HEAD"] = "HEAD";
    HTTPMethods["TRACE"] = "TRACE";
})(HTTPMethods || (HTTPMethods = {}));
export default class BaseService {
    headers = {};
    proxy;
    version;
    methods;
    constructor(api = '', version = '') {
        this.proxy = api;
        this.version = version;
        this.methods = HTTPMethods;
    }
    async request(path, options = {}) {
        try {
            /* Подготовка переметров запроса */
            const safeParams = (() => {
                if (!options.params)
                    return;
                if (typeof options.params === 'string')
                    return options.params;
                else if (options.params instanceof URLSearchParams)
                    return options.params.toString();
                else if (options.params instanceof Object) {
                    const result = {};
                    for (const key in options.params)
                        result[key] = options.params[key]?.toString();
                    return new URLSearchParams(result).toString();
                }
            })();
            const url = this.proxy + this.version + path + (options.params ? '?' + safeParams : '');
            const body = (() => {
                if (options.body instanceof FormData || options.body instanceof Blob)
                    return options.body;
                switch (typeof options.body) {
                    case 'string':
                        return options.body;
                    case 'object':
                        return JSON.stringify(options.body);
                    case 'number':
                    case 'bigint':
                    case 'boolean':
                        return options.body.toString();
                    default:
                        return undefined;
                }
            })();
            const headers = {
                ...this.headers,
                ...options.headers
            };
            if (typeof body === 'string')
                headers['Content-Type'] = 'application/json';
            const requestConfig = {
                headers,
                mode: options.mode,
                cache: options.cache,
                method: options.method ?? this.methods.GET,
                body: options.method === this.methods.GET || options.method === this.methods.HEAD ? undefined : body
            };
            /* Запрос */
            const res = await fetch(url, requestConfig);
            if (res.ok && res.status === 204)
                return { success: true, status: res.status, data: { success: true } };
            /* Обработка данных в зависимости от формата */
            const contentType = res.headers.get('content-type');
            const contentLength = res.headers.get('content-length');
            if (res.ok && contentLength === '0')
                return { success: true, status: res.status, data: { success: true } };
            if (res.ok && contentType) {
                const data = await (async () => {
                    if (/^image\//.test(contentType)) {
                        const blob = await res.blob();
                        return URL.createObjectURL(blob);
                    }
                    else if (/json/.test(contentType)) {
                        return await res.json();
                    }
                    else if (/^text\//.test(contentType)) {
                        return await res.text();
                    }
                    else
                        return { success: true };
                })();
                return { success: Boolean(data), status: res.status, data };
            }
            const data = await (async () => {
                if (!contentType)
                    return { success: true };
                else if (/json/.test(contentType))
                    return await res.json();
                else if (/^text\//.test(contentType))
                    return await res.text();
            })();
            return {
                success: false,
                data: data,
                status: res.status,
                message: `Ошибка ${res.status}: ${res.statusText}`
            };
        }
        catch (err) {
            console.log('FETCHING ERROR: ', err);
            return {
                success: false,
                data: null,
                status: 0,
                message: err instanceof Error ? err.message : 'Неизвестная ошибка'
            };
        }
    }
    setHeader(key, value) {
        this.headers[key] = value;
    }
    removeHeader(key) {
        if (key in this.headers)
            delete this.headers[key];
    }
}
