# DeepLX Serverless

[English](./README_en.md) | 简体中文

DeepLX 免费翻译API**腾讯云函数部署版**，与[原项目DeepLX](https://github.com/OwO-Network/DeepLX)的区别在于**利用了云函数的请求IP不固定的特性，极大程度上避免了`429`请求太频繁报错**

感谢原项目[OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX)提供的灵感，这是本项目的坚实基础

## Usage | 用法

### Prerequisites | 你需要准备什么

- 一台电脑或平板
- 一个腾讯旗下的账号或者手机号

### Deploy | 部署

#### Tencent Cloud | 腾讯云

在 [https://cloud.tencent.com/](https://cloud.tencent.com/) 注册账号

进入云函数控制台：[https://console.cloud.tencent.com/scf/list](https://console.cloud.tencent.com/scf/list)

依次点击【新建】->【从头开始】，然后按照以下配置，**没写出来的就不用管，使用默认设置**

- 函数类型：Web函数
- 函数名称：deeplx（名字随便取）
- 地域：任意（国内也可直连）
- 运行环境：Nodejs 16.13（或者更高的版本）
- 高级配置:
    - 内存：64M
    - 执行超时时间：60 秒
    - 请求多并发：5 并发（个人体验下来，2个都行）
- 日志配置 -> 日志投递：启用（可以选择不开，开的话一个月应该几分钱）
- 函数代码：本地上传zip包（[点我下载 ZIP 包](https://github.com/LegendLeo/deeplx-serverless/releases/download/v1.0.0/dist.zip)）
- 触发器配置（这里可能要创建一个新的触发器）：
    - 默认触发器
    - 触发别名/版本：默认流量
    - 请求方法：ANY
    - 发布环境：发布
    - 鉴权方法：免鉴权

此时已部署完成，可以点击“完成”按钮，进入【函数管理】，点击【函数代码】，往下拉，找到【访问路径】并复制后续使用

#### Vercel | 部署到 Vercel

现已支持部署到 Vercel，请点击下方按钮进行一键部署（经测试，稳定性不如腾讯云，容易出现429错误）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLegendLeo%2Fdeeplx-serverless)

### How to use | 如何使用

建议搭配浏览器插件沉浸式翻译一同使用，使用的时候需要把访问路径里的 `/release` 部分替换为翻译路径`translate`

例如：`https://service-aaaaa.gz.apigw.tencentcs.com/release/` 改为：`https://service-aaaaa.gz.apigw.tencentcs.com/translate`

请求示例：

``` bash
curl --location 'https://service-aaaaa.gz.apigw.tencentcs.com/translate' \
--header 'Content-Type: application/json' \
--data '{
    "text": "你好，世界",
    "source_lang": "zh",
    "target_lang": "en"
}'
```

响应示例：

``` json
{
  "code": 200,
  "message": "success",
  "data": "Hello, world.",
  "source_lang": "zh",
  "target_lang": "en",
  "alternatives": ["Hello, World.", "Hello, world!", "Hi, world."]
}
```

#### 沉浸式翻译设置

1. 在浏览器上安装最新的 [沉浸式翻译](https://github.com/immersive-translate/immersive-translate/releases)。
2. 点击左下角的 "开发者设置"。启用测试版实验功能。
3. 翻译服务选中 `DeepLX(beta)`
3. 设置 URL 为刚才获取的访问路径（需带translate）。

![沉浸式翻译](https://github.com/LegendLeo/deeplx-serverless/assets/25115173/d3affe2b-9e99-4d5c-bc8c-cd67e70d0368)

## 自托管

尽管本项目是专为 serverless 适配的方案，但是也能使用自己提供服务器进行部署

``` bash
# linux/macos 下
git clone https://github.com/LegendLeo/deeplx-serverless

# 安装 NVM (Node 版本管理器)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Node.js LTS版本
nvm install 20

# 确认版本
node -v # should print `v20.11.1`

# 确认版本
npm -v # should print `10.2.4`

cd deeplx-serverless
npm install

# 守护进程
sudo apt install screen

# 创建守护进程
screen -S 进程名（随便取）

# 运行完后可关闭终端
cd deeplx-serverless
npm run start

# 随便哪个终端检查进程
screen -ls
```
