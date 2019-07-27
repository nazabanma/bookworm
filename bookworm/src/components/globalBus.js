// ==================================================      组件间引用     ======================================================= -->

import Vue from 'vue';
export const globalBus = new Vue();

// function imgCutApart(imgArr) {
//     console.log(imgArr);
//     let Imgarry = imgArr.split(";");

//     return Imgarry[0];
// };

// export default {
//     imgCutApart
// };

// Vue.prototype.imgCutApart = imgCutApart;