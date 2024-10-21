<h1 align="center">
    utools-plugin-quick_open_jetbrains
</h1>

<p align="center">
🛠️utools 快开 jetbrains 产品最近项目的工具
</p>

## 功能特性

- 支持JetBrains IDE 全家桶应用快速打开
- 支持MacOS 、Windows、linux
- 内置默认路径，无需设置，即开即用
- 插件通过扫描本机应用列表读取应用安装路径和recentProjects.xml位置。

-------------

- 注：
    - 插件功能验证均基于JetBrains 全家桶最新版本验证通过 ，历史版本可能存在兼容问题。

## 安装

- 应用市场安装
    - 打开插件应用市场搜索 **JetBrains IDE 快开**

![应用市场安装](doc_resource/search_plugin.png)

- upx文件离线安装
    - 从 <a href="https://github.com/devotion-coding/utools-plugin-quick_open_jetbrains/releases"> releases </a> 下载
      upx 安装
    - 复制安装包，utools搜索框中粘贴，安装插件

![离线包安装](doc_resource/install_by_upx.png)

- 自编译安装
    - 下载源码
    - 进入项目，进入public目录，执行 npm i 安装依赖
    - 通过 utools 开发者工具重新打包、安装

![离线打包](doc_resource/install_by_build.png)

## 快速开始

- 输入关键字唤起插件
    - 插件功能关键字
        - IDE
        - JetBrains
        - history
        - kk
        - jetHistory
- 输入项目名称开始搜索
- 通过上下键选择项目后回车，即可打开项目

![使用演示](doc_resource/use.png)

-------------

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

- [x] 【Feature】支持MacOs下 JetBrains 全家桶快速打开
- [x] 【Optimize】优化logo展示逻辑，期望读取本地安装目录中的logo文件
- [x] 【Feature】 支持Windows下 JetBrains 全家桶快速打开
- [x] 【Feature】 支持非JetBrains ToolBox 安装的 全家桶快速打开

## 参考

- <a href='https://zhuanlan.zhihu.com/p/642605255'>通过Node.js 获取电脑安装的软件</a>
  - github : https://github.com/Xutaotaotao/get-installed-apps.git

## License

<a href="https://github.com/devotion-coding/utools-plugin-quick_open_jetbrains/blob/main/LICENSE">Apache License 2.0</a>
Copyright (c) 2023 <a href="https://github.com/devotion-coding">devotion-coding</a>

