const os = require('os');
const {readFileSync} = require('fs')
const parseXml = require("xml2js").parseString
var jp = require('jsonpath');

class InitHelper {

    // 软件列表
    channels = {}

    // 最近打开项目列表
    recentProjects = {}

    /**
     * 初始化
     */
    init() {
        this.init_global_config();
        this.init_recentProjects()
    }

    /**
     * 初始化全局变量
     */
    init_global_config() {
        if (os.type() === 'Windows_NT') {
            //windows平台
            global_config.default_placeholder = "目前只支持mac，其他系统适配陆续开发中... ..."
            return
        } else if (os.type() === 'Darwin') {
            //mac
            global_config.config_path = global_config.MACOS_TOOLBOX_CONFIG_PATH;
            global_config.STATE_JSON = global_config.STATE_JSON.replace("$CONFIG_PATH", global_config.config_path);
            global_config.os = "MAC";
        } else if (os.type() === 'Linux') {
            //Linux平台
            global_config.default_placeholder = "目前只支持mac，其他系统适配陆续开发中... ..."
            return;
        }

        // 加载channels
        let fileData = readFileSync(global_config.STATE_JSON);
        fileData = JSON.parse(fileData);
        let tools = jp.query(fileData, "tools")
        tools.for(item => {
            this.channels[item.displayName] = item
        })
    }

    /**
     * 初始化最近使用项目
     */
    init_recentProjects() {
        this.channels.for((displayName, channel) => {
            this.recentProjects[displayName] = []

            let channelId = channel.channelId;
            let channelFile = global_config.config_path + "channels/" + channelId + +".json";
            let channelFileData = readFileSync(global_config.STATE_JSON);
            channelFileData = JSON.parse(channelFileData);
            let recentProjectsFilenames = jp.query(channelFileData, `channel.history.toolBuilds.tool.intelliJProperties.recentProjectsFilenames`)
            let ideaConfigPath = jp.query(channelFileData, "channel.history.toolBuilds.build.intelliJProperties.defaultConfigDirectories")["idea.config.path"]
            recentProjectsFilenames.for(recentProjectsFilename => {
                let file = ideaConfigPath + "/options/" + recentProjectsFilename + ".xml"
                let fileData = readFileSync(file);
                parseXml(fileData, function (err, result) {
                    var json = JSON.stringify(result);
                    console.log(json);
                });
            })
        })
    }
}

window.initHelper = new InitHelper();
