# Split Deployment

**语言 / Language:** [简体中文](#简体中文) · [English](#english)

## English

KARI is deployed as two roles:

- Frontend: Netlify serves `frontend/`.
- Backend: EC2 runs `backend/server.js` for API and Gemini Live relay only.

## Frontend

Deploy the repo to Netlify with `netlify.toml`.

Set `frontend/runtime-config.js`:

```js
window.KARI_RUNTIME_CONFIG = {
  backendBaseUrl: "https://api.example.com"
};
```

The frontend serves:

- `index.html`
- browser JavaScript/CSS
- firmware files
- ESP Web Tools

The frontend still handles:

- camera/mic capture
- audio playback
- Web Bluetooth body control
- firmware upload over Web Serial
- browser-local tool execution

## Backend

Run `backend/server.js` on EC2.

Recommended backend environment:

```bash
PORT=3000
SERVE_FRONTEND=false
PUBLIC_BACKEND_BASE_URL=https://api.example.com
GEMINI_LIVE_ENABLED=true
GEMINI_LIVE_ALLOW_PUBLIC_RELAY=true
GEMINI_API_KEY=...
```

The backend serves:

- `/api/config`
- `/api/gemini-live/session`
- `/api/gemini-live/relay`
- local brain endpoints if enabled
- `/api/local-models/manifest.json` and versioned model/runtime/license resources from `backend/local-resources/`

The backend does not handle:

- Bluetooth body control
- firmware upload
- frontend static asset traffic

## Caddy Reverse Proxy

Example `Caddyfile`:

```caddyfile
api.example.com {
  reverse_proxy localhost:3000
}
```

Run Node with PM2 or systemd, and keep EC2 security group inbound rules limited to SSH from your IP plus HTTP/HTTPS.

## Web 1.3.0 resources

Models and inference runtimes deploy with the Node backend. Keep `backend/local-resources/` with the service and allow the configured frontend origin to download these public assets. Inference remains in the browser, with SHA-256 verification and browser caching. Netlify only carries the interface, Worker bridge and small configuration/catalog files. See [Web 1.3.0](web-1.3.0/README.md) for pinned versions and validation. Deploy the compatible backend/resources before enabling the new frontend in production.

## 简体中文

KARI 分为两个部署角色：Netlify 静态托管 frontend/；EC2 运行 backend/server.js 提供 API 和 Gemini Live 中继。它们不改变手机对本地机器人连接的权限边界。

### 前端

使用 netlify.toml 部署仓库。在 frontend/runtime-config.js 配置：

```js
window.KARI_RUNTIME_CONFIG = {
  backendBaseUrl: "https://api.example.com"
};
```

前端提供 index.html、浏览器 JS/CSS、固件和 ESP Web Tools。相机/麦克风采集、播放、Web Bluetooth 控制、Web Serial 上传与浏览器工具执行仍在客户端。

### 后端

在 EC2 运行 backend/server.js。环境变量示例（密钥仅在服务端设置，不提交仓库）：

```bash
PORT=3000
SERVE_FRONTEND=false
PUBLIC_BACKEND_BASE_URL=https://api.example.com
GEMINI_LIVE_ENABLED=true
GEMINI_LIVE_ALLOW_PUBLIC_RELAY=true
GEMINI_API_KEY=...
```

接口包括 /api/config、/api/gemini-live/session、/api/gemini-live/relay，以及启用时的本地 brain 接口。后端不操作手机蓝牙、不烧录固件，也不承担前端静态流量。

### 反向代理

Caddyfile 示例：

```caddyfile
api.example.com {
  reverse_proxy localhost:3000
}
```

用 PM2 或 systemd 管理 Node。EC2 安全组仅开放来源受限的 SSH 及 HTTP/HTTPS。示例域名需替换为自己的域名；公网 AI 中继的授权、限流和账户额度需按实际部署配置。

### Web 1.3.0 资源

模型与推理运行库随 Node 后端的 backend/local-resources/ 部署，公开 /api/local-models/manifest.json 和版本化模型/运行库/许可文件，允许配置的前端来源下载。浏览器校验 SHA-256 并缓存，推理仍在本地。Netlify 只承载界面、Worker 桥接及小配置/目录。先部署兼容后端和资源，再启用新前端；固定版本和验证见 [Web 1.3.0](web-1.3.0/README.md)。
