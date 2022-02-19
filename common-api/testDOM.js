// 回流次数
const domA = document.querySelector('#a');
domA.height = domA.getBoundingClientRect().height + 1;

const domB = document.querySelector('#b');
domB.height = domB.getBoundingClientRect().height + 1;

const domC = document.querySelector('#c');
domC.height = domC.getBoundingClientRect().height + 1;
