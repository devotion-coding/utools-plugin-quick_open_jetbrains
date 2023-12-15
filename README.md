<h1 align="center">
    utools-plugin-quick_open_jetbrains
</h1>

<p align="center">
🛠️utools 快开 jetbrains 产品最近项目的工具
</p>

## 功能特性

- 支持由 ToolBox 安装的 JetBrains 家族应用快速打开
- 支持MacOS 、Windows、linux
- 内置默认路径，无需设置，即开即用
- 插件基于 ToolBox 应用下 **state.json** 文件去推导其他应用安装路径和recentProjects.xml位置。
  -  windows下默认文件路径：%APPDATA%/JetBrains/Toolbox/state.json
  -  macOS下默认文件路径：~/Library/Application\ Support/JetBrains/Toolbox/state.json

## 安装

- 应用市场安装 
  - 打开插件应用市场搜索 **JetBrains Quick Open**
  
![应用市场安装](doc_resource%2F78dfg765df65g7ds5.png)

- upx文件离线安装  
  - 从 <a href="https://github.com/devotion-coding/utools-plugin-quick_open_jetbrains/releases"> releases </a> 下载 upx 安装
  - 复制安装包，utools搜索框中粘贴，安装插件

![离线包安装](doc_resource%2F67fd6gh78df6g8d6.png)

- 自编译安装
  - 下载源码，修改后通过 utools 开发者工具重新打包、安装

![离线打包](doc_resource%2Fd6f7gad687g6df8g68d.png)

## 快速开始

- 快速打开 ToolBox 下所有最近项目列表
  - 功能关键字
    - JetBrains
    - history
    - kk
    - jetHistory

![使用演示](doc_resource%2F7gds78g687ds6g8sd6g9.png)

- 注： 
  - 功能关键字不区分大小写。
  - 插件在macOS 下已验证通过以下应用，如其他应用有使用问题，请踢我
    - IntelliJ IDEA Ultimate.app
    - CLion Nova.app
    - GoLand.app
    - RustRover.app
    - DataGrip.app
    - Writerside.app

## Todo list

- [x] 验证windows 下功能稳定性
- [x] 优化logo展示逻辑，期望读取本地安装目录中的logo文件


## License
<a href="https://github.com/devotion-coding/utools-plugin-quick_open_jetbrains/blob/main/LICENSE">Apache License 2.0</a> Copyright (c) 2023 <a href="https://github.com/devotion-coding">devotion-coding</a>

