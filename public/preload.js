const {initService} = require('./service/init_service')
const features = require("./service/features")



// 挂载utools 选项列表
window.exports = {
    ...features.features
}

// 初始化
initService.init()








