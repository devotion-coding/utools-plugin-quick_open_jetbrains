const fs = require('fs')
const {globalData} = require('../config/global_data')


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
    init() {
        this.#init_config();
        this.#init_recentProjects();
    }

    /**
     * 初始化配置
     */
    #init_config() {

        console.info("home:" + utools.getPath("home"))
        globalData.MACOS_TOOLBOX_CONFIG_PATH = globalData.MACOS_TOOLBOX_CONFIG_PATH.replace("$HOME", utools.getPath("home"));
        globalData.WINDOWS_TOOLBOX_CONFIG_PATH = globalData.WINDOWS_TOOLBOX_CONFIG_PATH.replace("$HOME", utools.getPath("home"));

        if (utools.isWindows()) {
            //windows平台
            globalData.default_placeholder = "目前只支持mac，其他系统适配陆续开发中... ..."
            globalData.OS = "Windows"
            return
        } else if (utools.isMacOS()) {
            //mac
            globalData.config_path = globalData.MACOS_TOOLBOX_CONFIG_PATH;
            globalData.STATE_JSON = globalData.STATE_JSON.replace("$CONFIG_PATH", globalData.config_path);
            globalData.OS = "Mac"
        } else if (utools.isLinux()) {
            //Linux平台
            globalData.default_placeholder = "目前只支持mac，其他系统适配陆续开发中... ..."
            globalData.OS = "Linux"
            return;
        }
        console.info("当前系统：" + globalData.OS)

        // 加载channels
        let fileData = fs.readFileSync(globalData.STATE_JSON);
        fileData = JSON.parse(fileData);
        fileData.tools.forEach(item => {
            this.channels[item.displayName] = item
        })
        console.info({"channels": this.channels})
    }

    /**
     * 初始化项目列表
     */
    #init_recentProjects() {
        Object.keys(this.channels).forEach(displayName => {
            let channel = this.channels[displayName]
            console.info({channel})
            this.recentProjects[displayName] = []
            let channelId = channel.channelId;
            let channelFile = globalData.config_path + "/channels/" + channelId + ".json";
            console.info(channelFile)
            let channelFileData = fs.readFileSync(channelFile);
            channelFileData = JSON.parse(channelFileData);
            console.info(channelFileData)
            let ideaConfigPath = channelFileData.tool.extensions[0].defaultConfigDirectories["idea.config.path"];
            ideaConfigPath = ideaConfigPath.replace("$HOME", utools.getPath("home"))
            console.info(ideaConfigPath)

            let recentProjectsFile = ideaConfigPath + "/options/recentProjects.xml"
            console.info({recentProjectsFile})

            // 判断文件是否存在
            if (!fs.existsSync(recentProjectsFile)) {
                console.info("文件不存在:" + recentProjectsFile)
                return
            }

            let recentProjectsFileData = fs.readFileSync(recentProjectsFile);
            console.info("recentProjectsFileData from file:" + recentProjectsFileData.toString())

            recentProjectsFileData = this.parse_xml(recentProjectsFile)
            console.info("recentProjectsFileData by parse:" + recentProjectsFileData)


            // recentProjectsFileData = xmlparser,toJson(recentProjectsFileData)
            // xmlparser.toJson(recentProjectsFileData)
        })
    }

    parse_xml(xmlStr) {
        var xmldoc = new XMLDocument()

        xmldoc.async = false;
        xmldoc.load(xmlStr)

        var root = xmldoc.documentElement;
        console.info("parse_xml", root)
    }
}

exports.initService = new InitService();