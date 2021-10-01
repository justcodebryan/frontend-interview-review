import { ChangeEvent } from 'react';

export async function getImageSize(
  url: string,
  width: number,
  height: number,
  needImage: boolean = false
) {
  // 获取图片链接地址
  // const URL = window.URL || window.webkitURL;
  // 在内存中创建一个图片对象
  let img = new Image();
  img.src = url;
  // 解决跨域问题
  img.crossOrigin = 'anonymous';
  return new Promise((resolve, reject) => {
    // 用图片对象去加载链接
    img.onload = () => {
      const imageInfo = { width: img.naturalWidth, height: img.naturalHeight };
      if (needImage) {
        resolve({...imageInfo, img});
      } else {
        img = null;
        resolve(imageInfo);
      }
    };
    img.onerror = e => reject(e);
  });
}

function checkFileSize(
  file: RcFile,
  width: number,
  height: number
) {
  return new Promise((resolve, reject) => {
    const URL = window.URL || window.webkitURL;
    const img = new Image();
    img.onload = () => {
      let valid = img.width === width && img.height === height;

      if (valid) {
        resolve(true);
      } else {
        reject(false);
      }
    };
    img.src = URL.createObjectURL(file);
  }).then(
    () => {
      return file;
    },
    () => {
      message.error(`请上传图片尺寸宽度为 ${width}px 的图片。`);
      return Upload.LIST_IGNORE;
    }
  );
}

export function getValueOnlyFromEvent(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim();
}

// 输入数字
export function getNumberOnlyFromEvent(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/\D/g, '');
}

// 输入中文和英文
export function getChineseAndEnglishOnlyFromEvent(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[^A-Za-z\u4e00-\u9fa5]/g, '');
}

// 输入大小写字母、数字、下划线
export function getUpperCaseAndNumFromEvent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[^\w_]/g, '');
}
   
// 输入小写字母、数字、下划线
export function getLowerCaseAndNumFromEvent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[^\w_]/g, '');
}
    
// 输入数字和点
export function getNumAndDotFromEvent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[^\d.]/g, '');
}

// 输入中文
export function getChineseOnlyFromEvent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[^\u4e00-\u9fa5]/g, '');
}
    
// 输入中文、数字、英文
export function getChinesAndEnglishAndNumFromEvent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[^\w\u4E00-\u9FA5]/g, '');
}
    
// 输入数字和字母
export function getEnglistAndNumFromEvent(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[\W]/g, '');
}
    
// 只能输入英文字母和数字,不能输入中文
export function getInitialAndNumFromEvent(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[^\w\.\/]/ig, '');
}  

// 只能输入数字和英文
export function getEngAndNumFromEvent(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return event.target.value.trim().replace(/[^\d|chun]/g, '');
}  

