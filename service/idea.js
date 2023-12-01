const {readFileSync} = require('fs')
const parseXml = require("xml2js").parseString



// todo 多系统适配

// toolbox 配置文件路经
let toolBoxConfigPath = global_config.MACOS_TOOLBOX_CONFIG_PATH + "";
// toolbox state.json 文件路径
let toolBoxStateFile = toolBoxConfigPath + "state.json";


// 读 state.json文件内容
let stateFile = readFileSync(toolBoxStateFile);
parseXml(stateFile, function (err, result) {
    var json = JSON.stringify(result);
    console.log(json);
});


function read_IDEA_recentProjects() {

}