/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { API_URL } from "@/common/config";

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
    console.log(response);
    return {status: 'success', data: response.data};
  },
  axiosErrorHandler(error) {
      return {status: 'error', data: error};
  },
  sendAjaxGet (url) {
      console.log('GET', url);
      return Vue.axios.get(API_URL + url)
        .then(this.axiosResponseHandler)
        .catch(this.axiosErrorHandler);
  },
  sendAjaxPost (url, body, contentType, callback) {
      this.sendAjax(url, 'POST', body, contentType, callback);
  },
  sendAjaxPatch (url, body, contentType, callback) {
      this.sendAjax(url, 'PATCH', body, contentType, callback);
  },
  sendAjaxPut (url, body, contentType, callback) {
      this.sendAjax(url, 'PUT', body, contentType, callback);
  },
  sendAjaxDelete (url, body, contentType, callback) {
      this.sendAjax(url, 'DELETE', body, contentType, callback);
  }
};

export default ApiService;
