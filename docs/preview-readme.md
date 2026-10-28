# KARI Web 1.3.0 preview / 本地预览

**语言 / Language:** [简体中文](#简体中文) · [English](#english)

## 简体中文

本机预览：http://localhost:3163 。独立副本运行 `bash START_PREVIEW.sh`；端口占用时用 `PORT=3164 bash START_PREVIEW.sh`。需要 Node.js 22+，首次运行安装后端依赖需联网。

- `FEATURES.md`：功能和部署。模型与运行库随后端部署，在浏览器本地推理。
- `PHONE-ACCEPTANCE.md`、`CAPABILITIES.md`：验收范围与浏览器限制；当前维护者确认见 https://github.com/xlle-er/KARI-DF26/blob/main/docs/validation.md 。
- `SOURCE-MANIFEST.json`、`SHA256SUMS`、`MODEL-MANIFEST.json`：版本与源码/资源校验。

仅保留环境变量模板，排除凭据、用户数据、依赖目录和缓存。副本启动或自动检查不替代真实云端、车轮或长期功耗测试。本文件由 `docs/preview-readme.md` 生成；修改两种语言后再打包。

## English

Local preview: http://localhost:3163 . Run `bash START_PREVIEW.sh` in the independent package; if occupied, use `PORT=3164 bash START_PREVIEW.sh`. Requires Node.js 22+ and network access for the initial backend dependency install.

- `FEATURES.md`: features/deployment. Models and runtimes deploy with the backend, while inference stays in the browser.
- `PHONE-ACCEPTANCE.md`, `CAPABILITIES.md`: acceptance scope/browser limits. Current maintainer confirmation: https://github.com/xlle-er/KARI-DF26/blob/main/docs/validation.md .
- `SOURCE-MANIFEST.json`, `SHA256SUMS`, `MODEL-MANIFEST.json`: version/source/resource verification.

Only environment templates remain; credentials, user data, installed dependencies and caches are excluded. Starting the preview or passing automation does not establish cloud, wheel or sustained-power acceptance. Generated from `docs/preview-readme.md`; update both languages before repackaging.
