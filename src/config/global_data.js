/**
 * 全局配置
 * @type {{STATE_JSON: string, WINDOWS_TOOLBOX_CONFIG_PATH: string, default_placeholder: string, MACOS_TOOLBOX_CONFIG_PATH: string, config_path: string}}
 */
class GlobalData {
    // mac config path
    MACOS_TOOLBOX_CONFIG_PATH = "$HOME/Library/Application Support/JetBrains/Toolbox"

    // window config path
    WINDOWS_TOOLBOX_CONFIG_PATH = "$HOME/Library/Application Support/JetBrains/Toolbox"

    // 最终使用的config path
    config_path = ""

    // state.json  path
    STATE_JSON = "$CONFIG_PATH/state.json"

    // 默认的搜索框提示
    default_placeholder = "搜索"

    // 操作系统
    OS = "UN_KNOW"
}

exports.globalData = new GlobalData();