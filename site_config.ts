export default {
    // VitePress 站点基本配置,必填，允许留空
    site_name: "My Awesome Site",
    site_description: "这是一个使用 VitePress 构建的文档站点。",
    site_url: "/",
    author: 'ZYK',
    
    // 首页配置
    home:{
        mainTitle:"My Awesome Site",
        subTitles:['世界上只有一种英雄主义','那就是在认清生活的真相后','依然热爱生活'],//打字机效果的副标题，使用字符串列表
    },
    background:'',
    // 侧边简介卡
    avatar: "https://resource-un4.pages.dev/article/yjtp.webp",
    name: 'ZYK',
    position: '老大',
    bio: '红红火火恍恍惚惚',
    socialLinks: [
      {
        name: 'GitHub',
        icon: 'fa-brands fa-github',
        url: 'https://github.com/126242/'
      }
    ],
    footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2025-present My Awesome Site'
    },
    // 即将完成的配置
    nav: [
        { text: '首页', link: '/' },
        { text: '指南', link: '/guide/' },
    ],
    sidebar: {
        '/guide/': [
            {
                text: '指南',
                items: [
                    { text: '介绍', link: '/guide/introduction' },
                    { text: '安装', link: '/guide/installation' }
                ]
            }
        ]
    },
}