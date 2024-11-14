# kuaidi100-sdk

[快递 100API 开放平台](https://api.kuaidi100.com)

- [企业管理后台](https://api.kuaidi100.com/manager/)
- [文档中心](https://api.kuaidi100.com/document/)
- [调试工具](https://api.kuaidi100.com/debug-tool/)

## Usage

创建并配置 _.env_ 文件

```bash
cp .env.sample .env
```

```text
PORT=3000
TOKEN=CHANGE_ME # 访问凭证，简单的权限控制
KEY=YOUR_KUAIDI100_KEY # 快递100的 key
SECRET=YOUR_KUAIDI100_SECRET # 快递100的 secret

```

启动服务

```bash
# 开发环境
pnpm start:dev
# 生产、测试环境
pnpm start
```
