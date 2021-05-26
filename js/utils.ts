import { ChangeEvent } from 'react';

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
