const fs = require('fs')
const {globalData} = require('../config/global_data')
const {getInstalledApps} = require('../utils/getApps/index')


/**
 * 初始化服务
 */
class InitService {

    // 软件列表
    channels = {}

    // 最近打开项目列表
    recentProjects = {}

    /**
     * 初始化入口
     */
    async init() {
        await this.#init_config();
        await this.#init_recentProjects();
    }

    /**
     * 初始化配置
     */
    async #init_config() {

        let targetAppNameList = ["IntelliJ IDEA", "PyCharm", "PhpStorm", "GoLand", "Rider", "CLion", "RustRover", "WebStorm", "RubyMine", "DataGrip", "ReSharper", "Fleet", "Aqua"]
        await getInstalledApps()
            .then(appList => {
                // console.log(appList)
                appList = appList
                    .filter(app =>
                        app.appName
                    )
                    .filter(app =>
                        app.appIdentifier && !app.appIdentifier.startsWith("{")
                    )
                console.debug("appList:")
                console.debug(appList)
                // 找到目标应用
                let targetAppList = []
                for (const app of appList) {
                    for (let targetAppName of targetAppNameList) {
                        if (app.appName.indexOf(targetAppName) >= 0) {
                            targetAppList.push(app)
                            break
                        }
                    }
                }

                // 构建应用信息
                for (let targetApp of targetAppList) {

                    let appName = '';
                    let installLocation = '';
                    let appInfoFilePath = '';
                    let dataDirectoryName = '';
                    let launchCommand = '';
                    let logo_path = '';
                    if (utools.isWindows()) {
                        // windows
                        appName = targetApp.appName;
                        installLocation = targetApp.InstallLocation
                        appInfoFilePath = installLocation + '/product-info.json'
                        if(!fs.existsSync(appInfoFilePath)){
                            console.debug("product-info.json文件不存在:" + appInfoFilePath)
                            continue
                        }
                        let appInfoFileData = fs.readFileSync(appInfoFilePath);
                        appInfoFileData = JSON.parse(appInfoFileData)
                        dataDirectoryName = appInfoFileData.dataDirectoryName;
                        launchCommand = targetApp.DisplayIcon
                        logo_path = utools.getFileIcon(launchCommand)
                    } else {
                        // mac
                        appName = targetApp.appName + ".app";
                        installLocation = targetApp.app_dir + "/" + appName;
                        appInfoFilePath = installLocation + "/Contents/Resources/product-info.json"
                        if(!fs.existsSync(appInfoFilePath)){
                            console.debug("product-info.json文件不存在:" + appInfoFilePath)
                            continue
                        }
                        let appInfoFileData = fs.readFileSync(appInfoFilePath);
                        appInfoFileData = JSON.parse(appInfoFileData)
                        dataDirectoryName = appInfoFileData.dataDirectoryName;
                        launchCommand = installLocation + "/Contents/MacOS/" + appInfoFileData.launch[0].launcherPath.replace("../MacOS/", "");
                        logo_path = utools.getFileIcon(installLocation)
                    }

                    let channelInfo = {
                        "displayName": appName,
                        "installLocation": installLocation,
                        "dataDirectoryName": dataDirectoryName,
                        "launchCommand": launchCommand,
                        "logo_path": logo_path
                    };
                    this.channels[appName] = channelInfo
                }
                console.debug("channels:")
                console.debug(this.channels)
            })
    }

    /**
     * 初始化项目列表
     */
    #init_recentProjects() {
        console.debug("初始化最近项目列表")
        Object.keys(this.channels).forEach(displayName => {
            let channel = this.channels[displayName]

            let recentProjectList = []
            this.recentProjects[displayName] = recentProjectList;

            let recentProjectsFile = utools.getPath("appData").replace("\ ", " ") + "/JetBrains/" + channel.dataDirectoryName + "/options/recentProjects.xml"
            console.debug("recentProjectsFile: " + recentProjectsFile)

            // 判断文件是否存在
            if (!fs.existsSync(recentProjectsFile)) {
                console.debug("文件不存在:" + recentProjectsFile)
                return
            }

            let recentProjectsFileData = fs.readFileSync(recentProjectsFile);
            recentProjectsFileData = recentProjectsFileData.toString()
            recentProjectsFileData = recentProjectsFileData.replaceAll("$USER_HOME$", "~")
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(recentProjectsFileData, "text/xml");

            let xml_entry = xmlDoc.getElementsByName("additionalInfo")[0].getElementsByTagName("map")[0].getElementsByTagName("entry")

            for (let index = 0; index < xml_entry.length; index++) {
                let entry = xml_entry.item(index)

                let activationTimestamp = 0;
                let projectOpenTimestamp = 0;
                let optionList = entry.getElementsByTagName("value")[0].getElementsByTagName("RecentProjectMetaInfo")[0].getElementsByTagName("option")
                for (let i = 0; i < optionList.length; i++) {
                    let option = optionList.item(i)
                    let atr_name = option.getAttribute("name");
                    let atr_value = option.getAttribute("value");
                    if (atr_name === 'activationTimestamp') {
                        activationTimestamp = atr_value
                    } else if (atr_name === 'projectOpenTimestamp') {
                        projectOpenTimestamp = atr_value
                    }
                }

                if (utools.isWindows() && entry.getAttribute("key").startsWith("~")) {
                    entry.setAttribute("key", entry.getAttribute("key").replace("~", utools.getPath("home")))
                }

                recentProjectList[index] = {
                    "channel": displayName,
                    "icon": channel.logo_path,
                    "path": entry.getAttribute("key"),
                    "name": entry.getAttribute("key").substring(entry.getAttribute("key").lastIndexOf("/") + 1),
                    "activationTimestamp": activationTimestamp,
                    "projectOpenTimestamp": projectOpenTimestamp
                };
            }
        })
        console.debug("初始化完成", this.recentProjects)
    }
}

exports.initService = new InitService();