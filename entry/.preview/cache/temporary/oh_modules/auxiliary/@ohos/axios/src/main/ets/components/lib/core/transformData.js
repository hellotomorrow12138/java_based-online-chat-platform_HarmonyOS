'use strict';

import utils from '@bundle:com.example.index_test1/entry/ets/components/lib/utils';
import defaults from '@bundle:com.example.index_test1/entry/ets/components/lib/defaults/index';
import AxiosHeaders from '@bundle:com.example.index_test1/entry/ets/components/lib/core/AxiosHeaders';
/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */

export default function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders.from(context.headers);
  let data = context.data;
  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });
  headers.normalize();
  return data;
}