# Nuxt3 项目

## 项目描述

Nuxt 脚手架项目

## 为什么用它
首先 是vue配套的服务端渲染框架,上手快 ,其次 语法为最新的vue3+vite +ts等
nuxt网站:https://nuxt.com/ 中文站：https://nuxt.com.cn/
nuxt相关技术博客链接:
https://juejin.cn/post/7236635191379509308;
https://juejin.cn/post/7037336504418435103;

## 技术栈

Nuxt3.0 + Vite + Ant-Design-Vue (可换成element plus) + TypeScript + pinia + vue3

## 项目运行

```bash
  # 拷贝项目
  git clone [项目仓库地址]
  # 安装依赖
  pnpm i
  # 运行
  pnpm serve

```

## 目录结构

```bash
Nuxt3
├── .husky                        # Git hooks 工具配置
├── .vscode                       # vscode配置
├── doc                           # 项目文档
├── build                         # 工程化构建相关配置
├── src
│   ├── api                       # 接口请求服务管理
│   │  └── modules                # 接口模块
│   ├── assets                    # 工程化处理的静态资源
│   ├── components                # 项目组件
│   ├── composables               # 响应式共享状态
│   ├── enums                     # 枚举管理
│   ├── layouts                   # 布局组件
│   ├── middleware                # 路由中间件
│   ├── pages                     # 页面视图
│   ├── plugins                   # 项目公共插件
│   ├── public                    # 不需要工程化处理的静态资源
│   ├── store                     # 状态管理
│   ├── utils                     # 静态工具函数
│   └── app.vue                   # 入口页面
├── .commitlintrc.json            # git提交规范检查配置
├── .editorconfig                 # 编辑器配置
├── .env                          # 环境变量(默认/开发环境)
├─  .env.local                    # 本地环境变量
├── .env.pre                      # 预发布环境变量
├── .env.prod                     # 生产环境变量
├── .env.test                     # 测试环境变量
├── .eslintignore                 # eslint忽略文件检查的配置
├── .eslintrc.js                  # eslint代码规范检查配置
├── .gitignore                    # git仓库提交忽略配置
├── .lintstagedrc.js              # git提交代码规范检查配置
├── .ls-lint.yml                  # 文件命名检查配置
├── .prettierignore               # prettier忽略格式化的配置
├── .prettierrc.js                # prettier格式化配置
├── .stylelintignore              # 样式规范忽略检查的配置
├── .stylelintrc.js               # 样式规范检查配置
├── nuxt.config.ts                # Vite 构建配置入口
├── package.json                  # 项目包管理文件
├── pnpm-lock.yaml                # pnpm包版本管理锁定
├── postcss.config.js             # postcss配置
├── README.md                     # 项目说明
├── tailwind.config.js            # tailwind配置
└── tsconfig.json                 # TS编译的配置
```
