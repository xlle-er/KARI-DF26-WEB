# 浏览器能力矩阵

**语言 / Language:** [简体中文](#简体中文) · [English](#english)

## 简体中文

> 本文保留原版本功能/自动验收基线；当前正式发布、构建号和维护者真机确认见[统一验证记录](https://github.com/xlle-er/KARI-DF26/blob/main/docs/validation.md)。历史“待测”不代表最新总体验收状态。

运行时探测优先，浏览器品牌仅用于人工验收分组。

| 能力 | Chromium / Chrome / Edge | Firefox | Safari / WebKit |
|---|---|---|---|
| 响应式页面、配置、眼睛 | 自动矩阵 + 人工 | 自动矩阵 + 人工 | WebKit 自动；真实 Safari 待测 |
| AudioWorklet、麦克风 | 受信任安全上下文、用户权限 | 同左，实际路由待测 | 同左，真机中断/路由待测 |
| 相机与前后镜头 | 安全上下文、设备权限 | 同左 | 同左；iOS 真机方向待测 |
| BLE | 依运行时 `navigator.bluetooth` 和安全上下文 | 通常不提供，显示说明 | 通常不提供，显示说明 |
| 本机 LAN | 仅已配置且可访问的桥接/设备；受 CORS、混合内容、局域网权限限制 | 同左 | 同左 |
| 本地检测 | Worker + OffscreenCanvas + WASM 能力；固定图实际推理通过 | 界面/降级已测；实际推理性能待测 | 界面/降级已测；真机推理性能待测 |
| 本地唤醒 | 单线程 WASM SIMD；固定中英样本实际推理通过 | 能力及性能不足时保留手动唤醒 | 同左；真机误触发/耗电待测 |
| 全屏与方向锁定 | 能力探测，可拒绝 | 能力探测，可拒绝 | 支持范围有限；不作为页面适配失败 |
| PWA / 缓存 | 本地原子更新/离线检查 + 人工 | 浏览器提供的能力 | 安装/音频后台策略需真实 Safari 验收 |

不依赖浏览器扩展；远端后端不等于手机所在局域网的桥接器。WebKit 自动化不等同于真实 iPhone Safari。

## English

Runtime feature detection takes precedence; browser names group manual acceptance. The pending labels below describe the original automation baseline. See [current validation](https://github.com/xlle-er/KARI-DF26/blob/main/docs/validation.md) for later maintainer confirmation.

| Capability | Chromium / Chrome / Edge | Firefox | Safari / WebKit |
| --- | --- | --- | --- |
| Responsive UI/settings/eyes | Automated matrix + manual | Automated matrix + manual | WebKit automation; real Safari separate |
| AudioWorklet/microphone | Trusted secure context and permission | Same; physical routes separate | Same; device interruptions/routes separate |
| Camera/lens | Secure context/device permission | Same | Same; iPhone orientation separate |
| BLE | Runtime navigator.bluetooth + secure context | Usually absent; show explanation | Usually absent; show explanation |
| Local LAN | Configured reachable bridge/device; CORS, mixed-content, local-network restrictions | Same | Same |
| Detection | Worker/OffscreenCanvas/WASM; real fixed-image inference passed | UI/fallback tested; performance separate | UI/fallback tested; real-device performance separate |
| Wake | Single-thread WASM SIMD; fixed bilingual inference passed | Manual wake if unsupported/slow | Same; device false wakes/power separate |
| Fullscreen/orientation lock | Feature-detected, may be denied | Feature-detected, may be denied | Limited support; denial is not a layout failure |
| PWA/cache | Local atomic-update/offline checks + manual | Available browser facilities | Real Safari installation/audio background policy separate |

No browser extension is required. A remote backend is not a bridge on the phone's LAN. WebKit automation is not a real iPhone Safari test.
