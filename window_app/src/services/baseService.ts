type IResponse<T> = T extends null
  ? { success: false; data: T; status: number; message: string }
  : { success: true; data: T; status: number };

enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  CONNECT = 'CONNECT',
  HEAD = 'HEAD',
  TRACE = 'TRACE'
}

type RawQuery = Record<string, string | number | boolean> | string | URLSearchParams;

type RequestOptions = Partial<{
  method: HTTPMethods;
  headers: Record<string, string>;
  isRefresh: boolean;
  body: unknown;
  params: RawQuery;
  mode: RequestMode;
  cache: RequestCache;
}>;

export default abstract class BaseService {
  private readonly root;
  private readonly proxy;
  private readonly version;
  protected readonly methods;

  constructor(api = '', version = '') {
    this.proxy = api;
    this.version = version;
    this.methods = HTTPMethods;

    this.root = import.meta.url.replace(/^(.*:\d*)(.*)/, '$1');
  }

  protected async request<T>(path: string, options: RequestOptions = {}): Promise<IResponse<T | null>> {
    try {
      /* Подготовка переметров запроса */
      const safeParams = (() => {
        if (!options.params) return;

        if (typeof options.params === 'string') return options.params;
        else if (options.params instanceof URLSearchParams) return options.params.toString();
        else if (options.params instanceof Object) {
          const result: Record<string, string> = {};
          for (const key in options.params) result[key] = options.params[key]?.toString();

          return new URLSearchParams(result).toString();
        }
      })();

      const url = this.proxy + this.version + path + (options.params ? '?' + safeParams : '');

      const body = (() => {
        if (options.body instanceof FormData || options.body instanceof Blob) return options.body;

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

      const headers: Record<string, string> = {
        ...options.headers
      };

      if (typeof body === 'string') headers['Content-Type'] = 'application/json';

      const requestConfig: RequestInit = {
        headers,
        mode: options.mode,
        cache: options.cache,
        method: options.method ?? this.methods.GET,
        body: options.method === this.methods.GET || options.method === this.methods.HEAD ? undefined : body
      };

      /* Запрос */
      const res = await fetch(url, requestConfig);

      if (res.ok && res.status === 204)
        return { success: true, status: res.status, data: { success: true } } as IResponse<T>;

      /* Обработка данных в зависимости от формата */
      const contentType = res.headers.get('content-type');
      const contentLength = res.headers.get('content-length');

      if (res.ok && contentLength === '0')
        return { success: true, status: res.status, data: { success: true } } as IResponse<T>;

      if (res.ok && contentType) {
        const data = await (async () => {
          if (/^image\//.test(contentType)) {
            const blob = await res.blob();
            return URL.createObjectURL(blob);
          } else if (/json/.test(contentType)) {
            return await res.json();
          } else if (/^text\//.test(contentType)) {
            return await res.text();
          } else return { success: true };
        })();

        return { success: Boolean(data), status: res.status, data } as IResponse<T>;
      }

      const data = await (async () => {
        if (!contentType) return { success: true };
        else if (/json/.test(contentType)) return await res.json();
        else if (/^text\//.test(contentType)) return await res.text();
      })();

      return {
        success: false,
        data: data,
        status: res.status,
        message: `Ошибка ${res.status}: ${res.statusText}`
      } as IResponse<null>;
    } catch (err) {
      console.log('FETCHING ERROR: ', err);
      return {
        success: false,
        data: null,
        status: 0,
        message: err instanceof Error ? err.message : 'Неизвестная ошибка'
      } as IResponse<null>;
    }
  }
}
