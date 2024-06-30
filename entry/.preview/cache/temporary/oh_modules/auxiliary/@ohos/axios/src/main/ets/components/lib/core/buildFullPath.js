'use strict';

import isAbsoluteURL from '@bundle:com.example.index_test1/entry/ets/components/lib/helpers/isAbsoluteURL';
import combineURLs from '@bundle:com.example.index_test1/entry/ets/components/lib/helpers/combineURLs';
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */

export default function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
}