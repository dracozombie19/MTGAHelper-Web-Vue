/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { API_URL } from "@/common/config";
import * as constants from '@/common/constants';

export const ApiService = {

  sendAjax (url, method, body, contentType, callback) {
    console.log(method, url);
      const xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function onreadystatechange() {
          if (xmlhttp.readyState === XMLHttpRequest.DONE) {
              callback(xmlhttp.status, xmlhttp.response);
          }
      };

      xmlhttp.open(method, API_URL + url, true);

      if (contentType === null) {
          contentType = 'application/json';
      }

      if (method === 'POST') {
          if (contentType !== false) {
              xmlhttp.setRequestHeader('Content-Type', contentType);
          }
      }

      if (contentType !== false) {
          body = JSON.stringify(body);
          xmlhttp.setRequestHeader('Content-Type', contentType);
      }
      xmlhttp.send(body);
  },
  axiosResponseHandler(response) {
    return {status: constants.success, data: response.data};
  },
  axiosErrorHandler(error) {
      return {status: constants.error, data: error};
  },
  sendAjaxGet (url) {
      return Vue.axios.get(API_URL + url)
        .then(this.axiosResponseHandler)
        .catch(this.axiosErrorHandler);
  },
  sendAjaxPost (url, body) {
      return Vue.axios.post(API_URL + url, body)
        .then(this.axiosResponseHandler)
        .catch(this.axiosErrorHandler);
  },
  sendAjaxPatch (url, body, contentType, callback) {
      this.sendAjax(url, 'PATCH', body, contentType, callback);
  },
  sendAjaxPut (url, body, contentType, callback) {
      this.sendAjax(url, 'PUT', body, contentType, callback);
  },
  sendAjaxDelete (url, body, contentType, callback) {
      this.sendAjax(url, 'DELETE', body, contentType, callback);
  },
  goToURL(url, prependApiUrl) {
    window.location.href = (prependApiUrl ? API_URL : '') + url;
  }
};

export default ApiService;
