export function isFunction(target) {
  return typeof target === 'function';
}

export function isArray(target) {
  // return Object.prototype.toString.call(target) === '[object Array]';
  return Array.isArray(target);
}

export function isBoolean(target) {
  return typeof target === 'boolean';
}

export function isString(target) {
  return typeof target === 'string';
}

export function isNumber(target) {
  return typeof target === 'number';
}

export function isObject(target) {
  return target && typeof target === 'object';
}

export function isNull(target) {
  return typeof target === 'object' && !target;
}

export function isUndefined(target) {
  return typeof target === 'undefined';
}

export function getImageSize(url, needImage = false) {
  let image = new Image();
  image.src = url;
  // 跨域问题
  // 对此元素的 CORS 请求将不设置凭据标志。
  image.crossOrigin = 'Anonymous';
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const imageInfo = { width: image.naturalWidth, height: image.naturalHeight };

      if (needImage) {
        resolve({ ...imageInfo, image });
      } else {
        image = null;
        resolve(imageInfo);
      }
    };

    image.onerror = (err) => reject(err);
  });
}


