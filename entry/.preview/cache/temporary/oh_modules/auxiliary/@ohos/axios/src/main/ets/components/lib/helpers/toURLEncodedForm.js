'use strict';

import utils from '@bundle:com.example.index_test1/entry/ets/components/lib/utils';
import toFormData from '@bundle:com.example.index_test1/entry/ets/components/lib/helpers/toFormData';
import platform from '@bundle:com.example.index_test1/entry/ets/components/lib/platform/index';
export default function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function (value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}