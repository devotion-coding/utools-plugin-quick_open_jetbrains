// 插件功能选项
let features = {
    all: {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                callbackSetList([
                    {
                        title: '这是标题',
                        description: '这是描述',
                        icon: '' // 图标(可选)
                    },
                    {
                        title: '这是标题',
                        description: '这是描述',
                        icon: '' // 图标(可选)
                    },
                    {
                        title: '这是标题',
                        description: '这是描述',
                        icon: '' // 图标(可选)
                    }
                ])
            },
            search: (action, searchWord, callbackSetList) => {
                callbackSetList([
                    {
                        title: '这是标题',
                        description: '这是描述',
                        icon: '', // 图标
                        url: 'https://yuanliao.info'
                    }
                ])
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
window.exports = {
    ...features
}

// 初始化
window.initHelper.init()