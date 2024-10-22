'use strict';

import utils from '@bundle:com.example.index_test1/entry/ets/components/lib/utils';
import buildURL from '@bundle:com.example.index_test1/entry/ets/components/lib/helpers/buildURL';
import InterceptorManager from '@bundle:com.example.index_test1/entry/ets/components/lib/core/InterceptorManager';
import dispatchRequest from '@bundle:com.example.index_test1/entry/ets/components/lib/core/dispatchRequest';
import mergeConfig from '@bundle:com.example.index_test1/entry/ets/components/lib/core/mergeConfig';
import buildFullPath from '@bundle:com.example.index_test1/entry/ets/components/lib/core/buildFullPath';
import validator from '@bundle:com.example.index_test1/entry/ets/components/lib/helpers/validator';
import AxiosHeaders from '@bundle:com.example.index_test1/entry/ets/components/lib/core/AxiosHeaders';
const validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */

class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */


  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    if (config && config.sslCertificateManager) {
      console.warn('[tpc].[axios]sslCertificateManager Takes effect only in axios for httpclient');
    }

    if (config && config.client) {
      console.warn('[tpc].[axios]sslCertificateManager Takes effect only in axios for httpclient');
    }

    if (config && config.dns) {
      console.warn('[tpc].[axios]dns Takes effect only in axios for httpclient');
    }

    if (config && config.eventListener) {
      console.warn('[tpc].[axios]eventListener Takes effect only in axios for httpclient');
    }

    if (config && config.async) {
      console.warn('[tpc].[axios]async Takes effect only in axios for httpclient');
    }

    if (config && config.cache) {
      console.warn('[tpc].[axios]cache Takes effect only in axios for httpclient');
    }

    if (config && config.cacheControl) {
      console.warn('[tpc].[axios]cacheControl Takes effect only in axios for httpclient');
    }

    if (config && config.addHeaderKey) {
      console.warn('[tpc].[axios]addHeaderKey Takes effect only in axios for httpclient');
    }

    if (config && config.addHeaderValue) {
      console.warn('[tpc].[axios]addHeaderValue Takes effect only in axios for httpclient');
    }

    const {
      transitional,
      paramsSerializer,
      headers
    } = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer !== undefined) {
      validator.assertOptions(paramsSerializer, {
        encode: validators.function,
        serialize: validators.function
      }, true);
    } // Set config.method


    config.method = (config.method || this.defaults.method || 'get').toLowerCase();
    let contextHeaders; // Flatten headers

    contextHeaders = headers && utils.merge(headers.common, headers[config.method]);
    contextHeaders && utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], method => {
      delete headers[method];
    });
    config.headers = AxiosHeaders.concat(contextHeaders, headers); // filter out skipped interceptors

    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];

      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }

} // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});
export default Axios;