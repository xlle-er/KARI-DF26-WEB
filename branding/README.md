# KARI 图标 / KARI icon

此目录保存已确认的 KARI 原创字形和 Apple Icon Composer 分层源文件：蓝色 K 逆时针旋转 45°，背景采用与字形定位线对齐的非等距格纹。它替代此前的占位图标和机器人脸图标；其他项目素材的来源和许可不变。图标与商标权利保留，不授予额外商标许可。

This directory contains the approved original KARI artwork and layered Apple Icon Composer source: a blue K rotated 45° counterclockwise over an unequally spaced construction grid aligned with the letter. It replaces the former placeholder and robot-face icons. Provenance and licensing of other project assets remain unchanged. Artwork and trademark rights are reserved; no additional trademark license is granted.

在装有 Xcode / Icon Composer 的 macOS 上运行 `node scripts/build-icons.mjs`，然后运行 `npm run build`，刷新图标、PWA 资源清单和缓存版本。脚本使用本仓库内的源文件，不依赖相邻仓库。

On macOS with Xcode / Icon Composer installed, run `node scripts/build-icons.mjs`, then `npm run build` to refresh icons, the PWA resource manifest, and its cache version. The script uses this repository's own sources and does not depend on sibling repositories.

`icon-default-rounded.png` 和 `icon-dark-rounded.png` 是带透明圆角的文档预览；仓库根目录 `icon.png` 是不带透明通道的客户端兼容版本；`launcher-foreground.png` 是带安全留白的 Android 前景图层。iOS 直接编译 `AppIcon.icon`，获得系统外观及旧版系统兼容图标。

`icon-default-rounded.png` and `icon-dark-rounded.png` are transparent rounded documentation previews. The root `icon.png` is an opaque compatibility image; `launcher-foreground.png` is the Android foreground with safe padding. iOS compiles `AppIcon.icon` directly for system appearances and backward-compatible icons.
