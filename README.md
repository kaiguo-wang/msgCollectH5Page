# 前言
本项目是利用业余时间开发完成的简单版，加深一下对各技术知识点的实操积累经验。基于 vue-cli3.x + axios 构建多页面应用的H5移动端物流信息采集网站，采用前后端分离技术，项目中用到的API接口是第三方API接口，让前端开发人员独立于后端进行开发。由于涉及微信页面，建议使用[微信web开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)进行页面开发。

前端人员也可以开发API接口，推荐几个模拟数据的工具，注册账号，查看官网文档：
* mockjs官网 [http://mockjs.com/](http://mockjs.com/)
* yapi官网 [http://yapi.demo.qunar.com/](http://yapi.demo.qunar.com/)
* easy-mock官网 [https://easy-mock.com/docs](https://easy-mock.com/docs)


# 项目架构
```
│—vue.config.js               // webpack配置
│—vue.util.js                 // 打包多页面配置
├─src
│  ├─assets
│  │  ├─scss
│  │        reset.scss        // 重置样式文件
|  |        utils.scss        // 公共样式文件
|  └─util
│  │    axios.js              // 封装axios方法
│  |    lib.js                // 全局注册方法
│  ├─components
│  │     timeAddress          // 时间，省市区选择组件
|  |          api.js          // 获取数据接口
|  |          index.vue       // 组件模块
|  |
|  |_config.js                // 环境地址配置
|  |
|  |
│  └─pages
│      |
│      |
│      └─msgCollect                   // 功能模块
│              api                    // 功能模块api文件夹
|                  index              // 对应页面的api文件夹
|                       index.js      
│              module                 // 功能模块文件夹
│                   index             // 首页
                        index.html
                        index.js
                        index.vue
                        index.scss
                    msgDetail         // 详情页面
                        index.html
                        index.js
                        index.vue
                        index.scss
                    successPage       // 提交成功页面
                        index.html
                        index.js
                        index.vue
                        index.scss    
└─static                              // 存放静态资源文件夹，本项目暂时不用

```


# 技术栈
 * vue2.6
 * axios
 * webpack
 * ES6/7
 * flex
 * rem
 
# 功能模块
* 采集首页
* 时间、地址选择组件
* 采集提交成功页面
* 已采集信息查询

# 下载安装依赖
```
git clone https://github.com/kaiguo-wang/msgCollectH5Page.git
cd msgCollectH5Page
npm install 或 yarn
```

## 开发模式
```
npm run serve
```
运行之后，访问地址：http://localhost:8090/msgCollect/module/index/index.html?monthCardNo=7878787878

## 生产环境打包
```
npm run build
```
