const {initService} = require('./init_service')
const {exec} = require('child_process');


/**
 * 搜索
 * @param channel
 * @param search
 */
function search(channel, search) {
    console.info("init_data", initService.recentProjects)

    // 获取列表
    let recentProjectList = [];
    switch (channel) {
        case "IntelliJ IDEA Ultimate":
        case "DataGrip":
        case "Writerside":
            recentProjectList = initService.recentProjects[channel]
            break
        default:
            // all
            Object.keys(initService.recentProjects).forEach(key => {
                initService.recentProjects[key].forEach(item => {
                    recentProjectList.push(item)
                })
            })
    }
    console.info("recentProjectList", recentProjectList)

    // 查询对应数据
    if (search && search !== '') {
        let tmpRecentProjectList = []
        for (let i = 0; i < recentProjectList.length; i++) {
            let item = recentProjectList[i];
            if (item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                tmpRecentProjectList.push(item)
            }
        }
        recentProjectList = tmpRecentProjectList;
    }

    // 排序
    recentProjectList = recentProjectList.sort((o, n) => {
        return n.projectOpenTimestamp - o.projectOpenTimestamp
    })

    // 补充必要数据
    recentProjectList.forEach(item => {
        item.title = item.name
        item.description = item.path
    })
    return recentProjectList
}

/**
 * 从应用打开项目
 * @param channel
 * @param path
 */
function launchProjectFromApp(channel, path) {
    let channel_info = initService.channels[channel];

    // exec(channel_info.launchCommand + " " + path,(err, stdout, stderr)=> {
    //     console.info({"launch app": {err, stdout, stderr}})
    // })

    exec(`"${channel_info.launchCommand}"` + " " + path ,(err, stdout, stderr)=> {
        console.info({"launch app": {err, stdout, stderr}})
    })
}

exports.features = {
    all: {
        mode: "list",
        args: {
            // 进入插件应用时调用
            enter: (action, callbackSetList) => {
                // 每次进入时重新扫描项目列表
                initService.init()
                let recentProjectList = search("", "")
                console.info(recentProjectList)
                callbackSetList(recentProjectList)
            },
            search: (action, searchWord, callbackSetList) => {
                let recentProjectList = search("", searchWord)
                console.info(recentProjectList)
                callbackSetList(recentProjectList)
            },

            select: (action, itemData, callbackSetList) => {
                window.utools.hideMainWindow()
                launchProjectFromApp(itemData.channel, itemData.path)
                // window.utools.outPlugin()
            },
            placeholder: "搜索项目（支持模糊匹配）"
        }
    }
}
