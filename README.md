# 从零构建vue3+vite+ts项目
## 创建项目
使用pnpm进行创建，如果未安装pnpm执行下面的命令全局安装
```shell
npm i -g pnpm
```
```shell
# 创建 命名为vite-vue-demo
pnpm create vite vite-vue-demo -- --template vue-ts
```
```shell
# 根据指引安装依赖并启动项目
cd vite-vue-demo
pnpm i
pnpm dev
```
## 配置eslint
为了保证团队内代码风格统一，使用eslint对代码进行校验和格式化
### 安装eslint
```shell
pnpm add eslint -D
```
### 初始化eslint
使用eslint的命令行工具帮助我们生成eslint的规范文件
```shell
pnpm eslint --init

? How would you like to use ESLint? ... 
> To check syntax, find problems, and enforce code style # 检查语法和查找错误并强制保持风格

? What type of modules does your project use? ... # 使用的模块规范
> JavaScript modules (import/export)

? Which framework does your project use? ... # 项目使用的框架
> Vue.js

? Does your project use TypeScript? » Yes # 使用ts

? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection) # 代码运行的环境
√ Browser # 浏览器

? How would you like to define a style for your project? ... # 喜欢什么代码风格
> Use a popular style guide # 使用一个流行的代码风格

? Which style guide do you want to follow? ... # 使用哪种流行的风格
> Standard: https://github.com/standard/standard # 我们选择Standard 目前最多使用且简洁的，后面我们可以自己定义符合团队的风格

? What format do you want your config file to be in? ... # 配置文件的类型
> JavaScript

eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 @typescript-eslint/parser@latest
? Would you like to install them now? » Yes # 选择立即安装相关依赖 

? Which package manager do you want to use? ... # 使用哪个包管理器
> pnpm
```
命令执行完成后会在跟目录下生成.eslintrc.cjs文件，我们可以在这个文件里定制代码风格，我们在这个文件中将对vue代码风格的检查设置为官方推荐的最严格模式
```cjs
// .eslintrc.cjs
extends: [
  - 'plugin:vue/vue3-essential', 
  + 'plugin:vue/vue3-strongly-recommended',
    'standard'
],
```
### 配置vscode对eslint的支持
1. 安装eslint的扩展
2. 启用eslint的检查，点击文件-首选项-设置-扩展-Eslint，找到Eslint > Format:Enable把它勾选上
### 检查eslint配置是否成功
我们在main.ts里写一段不符合规范的代码，发现有红线报错表明eslint配置成功了
```ts
// src/main.ts
const a = 10  // 报错提示我们定义了变量但未使用
```
### 在package.json文件中的script中添加lint脚本
现在又有一个了问题：文件这么多，我要一个一个文件的去看、去修改吗？为了能够快速将所有文件都格式化成统一风格，我们在package.json里增加一个脚本
```json
"scripts": {
    "lint": "eslint src/**/*.{js,jsx,vue,ts,tsx} --fix",
},
```
### 设置保存自动格式化代码
找到文件-首选项-设置，搜索format on save，将它勾选上，点击打开一个vue文件，鼠标右键，点击使用...格式化文档，点击配置默认格式化程序，选择Eslint，其他类型的文件（如：js/ts）同样的操作，设置完成后，编辑一段代码，保存时代码就会格式化成符合eslint风格代码了
## 配置stylelint
Stylelint 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格
### 安装依赖
+ stylelint - Stylelint 本体
+ stylelint-config-standard - Stylelint官方推荐规则
+ stylelint-config-rational-order - 对 CSS 声明进行排序
+ stylelint-order - 使用stylelint-config-rational-order 时依赖的模块
+ stylelint-config-html - 解析 vue 文件
+ postcss-html - 使用 stylelint-config-html 依赖的模块
+ postcss-scss - 对 scss 文件进行解析
```shell
pnpm add stylelint stylelint-config-standard stylelint-config-rational-order stylelint-order stylelint-config-prettier stylelint-config-html postcss-html postcss-scss -D
```
### 添加 StyleLint 配置文件
在根目录添加一个 .stylelintrc.cjs 文件，内容如下：
```cjs
module.exports = {
    root: true,
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-config-html/vue' // 需要放在最后一位
    ],
    defaultSeverity: 'warning',
    plugins: ['stylelint-order'],
    rules: {
        'no-empty-source': null,
        'selector-class-pattern': null
    },
    overrides: [
        {
            files: ['*.vue', '**/*.vue'],
            rules: {
                'selector-pseudo-class-no-unknown': [
                    true,
                    {
                        ignorePseudoClasses: ['deep', 'global']
                    }
                ],
                'selector-pseudo-element-no-unknown': [
                    true,
                    {
                        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
                    }
                ]
            }
        }
    ]
}

```
在根目录添加一个.stylelintignore 文件，内容如下：
```
public
dist
```
### 启用
安装Styleint扩展，在设置中添加如下代码，并设置tab键为两个空格
```json
"stylelint.validate": [
    "css",
    "scss",
    "postcss",
    "vue"
],
"editor.tabSize": 2,
```
在package.json增加命令
```json
"scripts": {
    "lint:style": "stylelint src/**/*.{css,scss,vue,html} --fix",
},
```
## 配置husky
husky是Git Hook工具，为git提供一系列钩子函数，在提交前（pre-commit）、提交消息（commit-msg）等钩子触发时可以为我们执行一些脚本。我们可以使用 husky 工具来进行代码提交前的自动格式化，以及 commit message 的校验。以防止不符合规范风格的代码进入到远程仓库（团队内的成员未使用vscode或未配置eslit）
### commit前代码格式化
执行下面的命令可直接生成husky + lint-staged配置，lint-staged
是对 git 暂存区文件进行 lint 检查的工具
```shell
# 这一步会自动安装并配置husky，所以不用再单独安装husky了
npx mrm@2 lint-staged
```
修改package.json的lint-staged配置
```json
"lint-staged": {
  "*.{js,ts,jsx,tsx}": "pnpm lint",
  "*.vue": [
    "pnpm lint:style",
    "pnpm lint"
  ],
  "*.{scss,css}": "pnpm lint:style"
}
```
测试，在main.ts文件定义一个变量不使用，使其不符合规范，使用git commit时会报错，删除这个变量，重新推送成功
```ts
// main.ts增加未使用变量
const test = 1
```
```git
git add .
git commit -m "init config"  // error  'test' is assigned a value but never used  no-unused-vars
```

