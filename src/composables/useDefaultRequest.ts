import { UseFetchOptions } from 'nuxt/app';
// import { RouteLocationRaw } from 'vue-router';
import { ResultEnum } from '~/enums/interface';

interface DefaultResult<T = any> {
  code: number;
  data: T;
  msg: string;
  success: boolean;
}

type UrlType = string | Request | Ref<string | Request> | (() => string | Request);

type HttpOption<T> = UseFetchOptions<DefaultResult<T>>;

interface RequestConfig<T = any> extends HttpOption<T> {
  // 忽略拦截，不走拦截，拥有 responseData，且 code !== 0 的情况下，直接返回 responseData，
  // 但是若无 responseData， 不设置 ignoreGlobalErrorMessage 也会报错
  ignoreCatch?: boolean;

  // 忽略全局错误提示，走拦截，但是任何情况下都不会提示错误信息
  ignoreGlobalErrorMessage?: boolean;
}

const request = async <T>(
  url: UrlType,
  params: any,
  options: RequestConfig<T>
): Promise<DefaultResult<T> | T> => {
  const headers = useRequestHeaders(['cookie']);
  const method = ((options?.method || 'GET') as string).toUpperCase();

  const runtimeConfig = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const { $message, $login } = nuxtApp;
  const { apiBaseUrl } = runtimeConfig.public;
  const baseURL = `${apiBaseUrl}/mall/api`;

  // 处理用户信息过期
  const hanlerTokenOverdue = async () => {
    const { _route } = nuxtApp;
    await $login(_route?.fullPath);
  };

  // 处理报错异常
  const handlerError = (msg = '服务异常') => {
    if (process.server) {
      showError({ message: msg, statusCode: 500 });
    } else {
      $message.error(msg);
    }
  };

  const { data, error } = await useFetch(url, {
    baseURL,
    headers,
    credentials: 'include',
    params: method === 'GET' ? params : undefined,
    body: method === 'POST' ? JSON.stringify(params) : undefined,
    ...options,
  });

  const responseData = data.value as DefaultResult<T>;
  const { ignoreCatch, ignoreGlobalErrorMessage } = options; // 忽略全局

  if (error.value || !responseData) {
    if (!ignoreGlobalErrorMessage) handlerError();
    return Promise.reject(error.value || '服务响应失败，请稍后重试');
  } else {
    const { code, data: result, msg } = responseData;
    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS || !code) {
      return result;
    }
    if (!ignoreCatch) {
      // 接口请求错误，统一处理
      switch (code) {
        case ResultEnum.TOKEN_OVERDUE: // 登录信息过期，去登录
          // 用户信息过期
          await hanlerTokenOverdue();
        default:
          if (!ignoreGlobalErrorMessage) handlerError(msg);
          return Promise.reject(msg || '服务响应失败，请稍后重试');
      }
    }
  }

  return responseData;
};

// 自动导出
export const useDefaultRequest = {
  get: <T>(url: UrlType, params?: any, option?: RequestConfig<T>) => {
    return request<T>(url, params, { method: 'get', ...option });
  },
  post: <T>(url: UrlType, params?: any, option?: RequestConfig<T>) => {
    return request<T>(url, params, { method: 'post', ...option });
  },
};
