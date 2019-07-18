function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

// export function imageUtil(e) {
//     const imageSize = {};
//     console.log('e: ' + e);
//     const originalWidth = e.detail.width; //图片原始宽
//     const originalHeight = e.detail.height; //图片原始高
//     const originalScale = originalHeight / originalWidth; //图片高宽比
//     console.log('originalWidth: ' + originalWidth)
//     console.log('originalHeight: ' + originalHeight)
//         //获取屏幕宽高
//     wx.getSystemInfo({
//         success: function(res) {
//             const windowWidth = res.windowWidth;
//             const windowHeight = res.windowHeight;
//             const windowscale = windowHeight / windowWidth; //屏幕高宽比
//             console.log('windowWidth: ' + windowWidth)
//             console.log('windowHeight: ' + windowHeight)
//             if (originalScale < windowscale) { //图片高宽比小于屏幕高宽比
//                 //图片缩放后的宽为屏幕宽
//                 imageSize.imageWidth = windowWidth;
//                 imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
//             } else { //图片高宽比大于屏幕高宽比
//                 //图片缩放后的高为屏幕高
//                 imageSize.imageHeight = windowHeight;
//                 imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
//             }

//         }
//     })
//     console.log('缩放后的宽: ' + imageSize.imageWidth)
//     console.log('缩放后的高: ' + imageSize.imageHeight)
//     return `${imageSize} `;
// }

// module.exports = {
//     imageUtil: imageUtil
//         // '对外方法名':'本地方法名'
// }
export default {
    formatNumber,
    formatTime,
}