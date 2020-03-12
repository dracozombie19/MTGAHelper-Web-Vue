import {
    API_URL
} from "./common/config.js";

export const ApiService = {

    sendAjax: function (url, method, body, contentType, callback) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                callback(xmlhttp.status, xmlhttp.responseText);
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
    sendAjaxGet: function (url, callback) {
        this.sendAjax(url, 'GET', null, null, callback);
    },
    sendAjaxPost: function (url, body, contentType, callback) {
        this.sendAjax(url, 'POST', body, contentType, callback);
    },
    sendAjaxPatch: function (url, body, contentType, callback) {
        this.sendAjax(url, 'PATCH', body, contentType, callback);
    },
    sendAjaxPut: function (url, body, contentType, callback) {
        this.sendAjax(url, 'PUT', body, contentType, callback);
    },
    sendAjaxDelete: function (url, body, contentType, callback) {
        this.sendAjax(url, 'DELETE', body, contentType, callback);
    }
};

export default ApiService;