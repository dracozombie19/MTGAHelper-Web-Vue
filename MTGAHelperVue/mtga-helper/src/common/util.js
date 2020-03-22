export default {
    setObjectInCache(objectName, object) {
        if (object === undefined) {
            sessionStorage.removeItem(objectName);
        } else {
            sessionStorage.setItem(objectName, JSON.stringify(object));
        }
    },
    getObjectFromCache(objectName) {
        let obj = sessionStorage.getItem(objectName);

        if (obj === undefined) {
            obj = null;
        } else {
            obj = JSON.parse(obj);
        }

        return obj;
    },
    setObjectInLocalCache(objectName, object) {
        if (object === undefined) {
            localStorage.removeItem(objectName);
        } else {
            localStorage.setItem(objectName, JSON.stringify(object));
        }
    },
    getObjectFromLocalCache(objectName) {
        let obj = localStorage.getItem(objectName);

        if (obj === undefined) {
            obj = null;
        } else {
            obj = JSON.parse(obj);
        }

        return obj;
    }
};
