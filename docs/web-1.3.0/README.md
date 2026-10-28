# Web 1.3.0 本地验收版

**语言 / Language:** [简体中文](#简体中文) · [English](#english)

## 简体中文

> 本文保留原版本功能/自动验收基线；当前正式发布、构建号和维护者真机确认见[统一验证记录](https://github.com/xlle-er/KARI-DF26/blob/main/docs/validation.md)。历史“待测”不代表最新总体验收状态。

本次只更新 Web DF26。用户已授权在最终自动核验通过后直接推送 DF26。推送与部署状态以交付目录发布记录为准；真实手机项目独立记录，不创建额外 Release。

## 已实现

| 部分 | 入口与行为 |
|---|---|
| 响应式界面 | 机器人、人格、视觉、设置；手机底栏、中屏和桌面侧栏、短横屏紧凑侧栏；中央播放为操作 |
| 陪伴 | 隐藏配置页面；原始眼睛；点按唤出控制层；右上角停止仅随控制层显示；输入聚焦期间保留控件 |
| 机器人 | 保留 BLE/LAN、别名与设备管理、方向校准、配网和 OTA；遥控弹层支持按住、摇杆及失焦停止 |
| 人格 | 身份、八项人格、行为和语言风格；保存、重置；严格人格 JSON 和跨端通用陪伴 JSON；失败不覆盖 |
| 通用配置 | schemaVersion=1，profile/behavior/idle/wake，与两移动端默认配置往返一致；安全边界强制开启 |
| Web 备份 | 与通用配置区分；包括高级本地参数，排除服务密钥、设备凭据及设备标识；导入前完整校验 |
| 行为 | 唯一自动入口；6 表情、11 身体场景；权重、冷却、状态和倍率；身体待机默认关闭 |
| Web 高级参数 | 保留旧调参和单次测试；可选高级间隔覆盖通用间隔；平衡/反向混合参数影响下一场景配对，仍受冷却及运动许可限制 |
| Life Engine | 保留原实现，改为单调时间差；后台暂停、不补算衰减；每次新陪伴重置；不以检测框推断距离/障碍/身份 |
| 主动 AI | 思考/表达独立且默认关闭；默认 2 次/分钟、串行；表达至少 60 秒；仅允许白名单场景建议，过期结果丢弃 |
| 本地检测 | MediaPipe Tasks Vision 0.10.32，EfficientDet-Lite0 int8；Worker、单任务、最高 10 Hz，默认关闭 |
| 实验跟随 | 明确选目标和参考面积；14% 横向阈值，面积比 0.8/0.95 滞回，150 ms 脉冲，300 ms 过期取消；不自动倒车、换目标或恢复 |
| 离线唤醒 | sherpa-onnx 2.0.0 单线程 SIMD WASM；中英预设；共享 AudioWorklet 16 kHz 采集；默认关闭，仅 Gemini Live |
| 唤醒交接 | 等待无 Live/音视频上行；约 1 秒预录、连接缓冲最多 8 秒；Live 确认准备后一次顺序交接；溢出整段清空并提示重说 |
| 错误恢复 | 组件失败保留陪伴，显示原因和重试；后台/中断立即停止媒体，恢复需明确操作 |
| 模型与运行库 | **随后端部署**；按需下载、SHA-256 校验、Cache API 缓存、取消、释放和清理；推理仍在浏览器 |
| PWA | 新资源完整校验后等待用户；确认后先停止再更新；缓存界面和已下载本地能力可离线，云端 AI 不可离线 |
| 诊断 | 500 事件、100 决策、最多每秒更新；场景、唤醒、缓冲、跟随、运动来源及播放队列；脱敏导出 |

## 本地启动

需要 Node.js 22 或以上。在仓库根目录：

```sh
npm ci
npm --prefix backend ci
npm test
npm run check
npm run build
PORT=3163 npm start
```

桌面预览：`http://localhost:3163`。本次生成的截图、预览副本、自动结果和校验位于项目根 `output/web/1.3.0/`。

手机麦克风、相机与 Web Bluetooth 需要受信任 HTTPS 等浏览器条件。普通局域网 HTTP 不能代替 HTTPS 验收；当前没有创建公网预览或生产部署。

## 资源构建与部署

- 前端：`frontend/`，继续由 Netlify 静态托管；保留既有眼睛与模块结构。
- 后端：原 Node 服务及 `backend/local-resources/`，模型/运行库/许可一起部署。
- 下载清单：`GET /api/local-models/manifest.json`；资源：`GET /api/local-models/models/...`、`vendor/...`、`licenses/...`。
- 前端通过现有 `runtime-config.js` 的后端地址取资源；下载接口公开且支持 CORS，无需向浏览器交付 AI 密钥。
- 普通陪伴不预取模型。没有缓存的模型无法在离线时首次启用；已有完整缓存可在后端暂不可达时加载。
- `npm run resources` 使用已纳入仓库的资源并重建检测 Worker/哈希清单；相邻 Android 仓库存在时可同步同一份模型。没有相邻仓库也可复用当前资源。
- `bash scripts/build-wake-wasm.sh` 重新编译引擎：sherpa 源码归档校验固定，Emscripten 4.0.23 固定；在项目临时目录安装工具链，剥除本机源目录路径；不修改全局 shell 配置。
- 资源 SHA-256、引擎版本、模型组合及许可见后端资源清单。WASM 不依赖跨源隔离，不创建第二套录音器。

用户已授权自动核验通过后直接推送 DF26。生产上线仍应先部署兼容旧页面的后端及模型，核对资源下载/CORS/Live 中继，再上线前端；保留上一版前后端和资源清单用于整体回滚。推送源码本身不代表后端资源已部署。

## 自动结果与实际能力边界

自动测试的数字和浏览器版本以交付目录的 JSON 报告为准。真实模型测试采用固定合成中英文音频及 Google 示例猫狗图片；没有录制用户环境音。浏览器自动化、假机器人及假 PCM 测试不能代替真机听辨、真实车轮观察和温升验收。

当前本地后端未配置真实 Gemini/第三方 AI 密钥。云端端到端对话和真实网络环境恢复需在配置服务后的 HTTPS 验收环境验证；本次自动化不会冒充这一部分已通过。

## 参考与许可

- MediaPipe 官方 Web Object Detector：<https://developers.google.com/edge/mediapipe/solutions/vision/object_detector/web_js>
- sherpa 2.0.0 官方 WASM 构建：<https://github.com/k2-fsa/sherpa-onnx/blob/v2.0.0/build-wasm-simd-kws.sh>
- 中英模型卡：<https://modelscope.cn/models/pkufool/icefall-kws-zipformer-zh-en-3M-2025-12-20>
- 固定视觉图片：<https://storage.googleapis.com/mediapipe-tasks/object_detector/cat_and_dog.jpg>
- Web Bluetooth 能力边界：<https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API>

引擎、模型和 MediaPipe 使用各自 Apache-2.0 条款，ONNX Runtime 使用 MIT；具体第三方许可和声明随 `backend/local-resources/licenses/` 提供。原始眼睛、动作与其他既有代码保留原许可。

## English

This document records the Web 1.3.0 implementation/acceptance baseline. Current KARI stable publication and maintainer-confirmed physical tests are recorded in the [unified validation log](https://github.com/xlle-er/KARI-DF26/blob/main/docs/validation.md). Historical automation is not a substitute for on-device testing.

### Implemented

| Area | Entry and behavior |
| --- | --- |
| Responsive UI | Robot, Personality, Vision, Settings; phone bottom bar, medium/desktop sidebar, compact short-landscape sidebar; center play is an action |
| Companion | Hides setup, preserves original eyes, tap reveals controls; upper-right stop follows controls; focused input keeps controls visible |
| Robot | BLE/LAN, aliases/device management, direction calibration, provisioning, OTA; remote supports hold/joystick and blur stop |
| Personality | Identity, eight traits, behavior and language style; save/reset; strict personality and cross-platform companion JSON; failure preserves values |
| Shared config | schemaVersion=1 profile/behavior/idle/wake round-trips with mobile defaults; safety constraints remain enabled |
| Web backup | Separate from shared config; advanced local values without keys/device credentials/IDs; validate fully before importing |
| Behavior | One automation entry; 6 expressions/11 body scenes, weights/cooldowns/states/multipliers; body idle off by default |
| Advanced settings | Existing tuning and one-shot tests; optional intervals override shared ranges; balanced/reverse pairing affects the next candidate but respects cooldown/permission |
| Life Engine | Existing engine uses monotonic elapsed time; background pauses without catch-up; resets each new session; boxes do not imply distance/obstacles/identity |
| Proactive AI | Thought/expression separately off; thought serialized, default 2/minute; expression at least 60 s apart; allowlisted scene suggestions only; stale results discarded |
| Detection | MediaPipe Tasks Vision 0.10.32, EfficientDet-Lite0 int8; Worker, one inference at a time, at most 10 Hz; off by default |
| Experimental follow | Explicit target and reference area; 14% horizontal threshold, area hysteresis 0.8/0.95, 150 ms pulses, 300 ms expiry; no automatic reverse/retarget/resume |
| Offline wake | sherpa-onnx 2.0.0 single-thread SIMD WASM, bilingual presets, shared AudioWorklet 16 kHz; off by default, Gemini Live only |
| Wake handoff | No Live/media uplink while waiting; about 1 s pre-roll and max 8 s connection buffer; one ordered transfer after readiness; overflow clears all and requests repetition |
| Recovery | Component failures preserve companionship with reasons/retry; background/interruption stops media, explicit resume |
| Models/runtimes | Deploy with backend; on-demand download, SHA-256, Cache API, cancel/release/clear; inference stays in browser |
| PWA | Fully verify new resources, wait for confirmation, stop before switching; cached UI/local models work offline, cloud AI does not |
| Diagnostics | 500 events/100 decisions, at most 1 Hz; scenes/wake/buffers/follow/motion owners/playback; redacted export |

### Run locally

Node.js 22 or later, at repository root:

```sh
npm ci
npm --prefix backend ci
npm test
npm run check
npm run build
PORT=3163 npm start
```

Desktop preview: `http://localhost:3163`. Historical preview/screenshots/results were under `output/web/1.3.0/`; current packaging writes `output/release/`. These outputs are local, not source-controlled production deployment evidence.

Phone microphone, camera and Web Bluetooth require browser support, permission and a trusted secure context. Ordinary LAN HTTP is not equivalent to HTTPS acceptance. A source push alone does not establish frontend/backend production deployment.

### Resources and deployment

- `frontend/` is the Netlify static role, retaining eyes/modules. The Node backend deploys with `backend/local-resources/`, including models, runtimes and licenses.
- Manifest: `GET /api/local-models/manifest.json`; assets: models/..., vendor/... and licenses/... under `/api/local-models/`.
- `runtime-config.js` points to the backend. Public resource endpoints support CORS and expose no AI keys.
- Ordinary companionship does not prefetch models. First offline use requires prior caching; fully cached resources can work while the backend is unavailable.
- `npm run resources` rebuilds detection Worker/hashes from committed resources, optionally synchronizing a sibling Android model; a sibling is not required when committed assets exist.
- `bash scripts/build-wake-wasm.sh` pins the sherpa source archive/checksum and Emscripten 4.0.23, installs into project temporary directories, strips local paths, and leaves global shell configuration alone.
- Backend manifests record resource SHA-256, engine/model versions and licenses. WASM does not need cross-origin isolation or a second recorder.

Deploy compatible backend/resources first; check downloads, CORS and the Live relay, then deploy frontend. Keep previous frontend/backend/manifests for coordinated rollback. Source publication is not proof of backend resource deployment.

### Automated results and limits

Counts/browser versions belong to the original JSON reports. Model tests used fixed synthetic bilingual audio and Google's example cat/dog image, not user ambient recordings. Browser automation, fake robots and fake PCM cannot establish listening quality, wheel direction or thermals.

The original local backend had no real Gemini/third-party keys; cloud conversation and recovery require configured HTTPS acceptance. Read current validation separately from this historical automation scope.

### References and licenses

- [MediaPipe Web Object Detector](https://developers.google.com/edge/mediapipe/solutions/vision/object_detector/web_js)
- [sherpa 2.0.0 WASM build](https://github.com/k2-fsa/sherpa-onnx/blob/v2.0.0/build-wasm-simd-kws.sh)
- [Bilingual model card](https://modelscope.cn/models/pkufool/icefall-kws-zipformer-zh-en-3M-2025-12-20)
- [Fixed vision fixture](https://storage.googleapis.com/mediapipe-tasks/object_detector/cat_and_dog.jpg)
- [Web Bluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)

Engines/model/MediaPipe carry their Apache-2.0 terms, ONNX Runtime MIT; exact notices ship in `backend/local-resources/licenses/`. Original eyes/actions/other existing code retain their own licenses.
