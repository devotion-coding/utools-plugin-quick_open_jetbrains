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

/**
 * 获取logo
 * @param channel
 * @returns {string}
 */
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

/**
 * 从应用打开项目
 * @param channel
 * @param path
 */
function launchProjectFromApp(channel, path) {
    let channel_info = initService.channels[channel];
    let launchCommand = channel_info.installLocation + "/" + channel_info.launchCommand;
    launchCommand = launchCommand.replaceAll(" ", '\\ ');
    console.info({"launchCommand": launchCommand})
    exec(launchCommand + " " + path, (err, stdout, stderr) => {
        console.info({"launch app": {err, stdout, stderr}})
    })

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
                launchProjectFromApp(itemData.channel, itemData.path)
                window.utools.outPlugin()
            },
            placeholder: "搜索"
        }
    },
    idea: {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                let recentProjectList = search("IntelliJ IDEA Ultimate", "")
                console.info(recentProjectList)
                callbackSetList(recentProjectList)
            },
            search: (action, searchWord, callbackSetList) => {
                let recentProjectList = search("IntelliJ IDEA Ultimate", searchWord)
                console.info(recentProjectList)
                callbackSetList(recentProjectList)
            },

            select: (action, itemData, callbackSetList) => {
                window.utools.hideMainWindow()
                launchProjectFromApp(itemData.channel, itemData.path)
                window.utools.outPlugin()
            },
            placeholder: "搜索"
        }
    },
    data_grip: {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                let recentProjectList = search("DataGrip", "")
                console.info(recentProjectList)
                callbackSetList(recentProjectList)
            },
            search: (action, searchWord, callbackSetList) => {
                let recentProjectList = search("DataGrip", searchWord)
                console.info(recentProjectList)
                callbackSetList(recentProjectList)
            },

            select: (action, itemData, callbackSetList) => {
                window.utools.hideMainWindow()
                launchProjectFromApp(itemData.channel, itemData.path)
                window.utools.outPlugin()
            },
            placeholder: "搜索"
        }
    }
}