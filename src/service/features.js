const {initService} = require('./init_service')


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
            if (item.name.indexOf(search) > -1) {
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
        item.icon = getLogo(item.channel)
    })
    return recentProjectList
}

function getLogo(channel) {

    switch (channel) {
        case "DataGrip":
            return "./logo/dataGrid_logo.png"
        case "IntelliJ IDEA Ultimate":
            return "./logo/ij_logo.png"
        case "Writerside":
            return "./logo/writerside.png"
        case "CLion":
            return "./logo/cl_logo.png"
        default:

    }

}

exports.features = {
    all: {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
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
                const url = itemData.url
                require('electron').shell.openExternal(url)
                window.utools.outPlugin()
            },
            placeholder: "搜索"
        }
    }
}