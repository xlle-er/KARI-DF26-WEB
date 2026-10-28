import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root = path.resolve(import.meta.dirname, '..');
const brand = path.join(root, 'branding');
const tool = '/Applications/Xcode.app/Contents/Applications/Icon Composer.app/Contents/Executables/ictool';
const raster = path.join(root, 'scripts/render-icon.swift');
for (const appearance of ['Default', 'Dark']) {
  execFileSync(tool, [path.join(brand, 'AppIcon.icon'), '--export-image', '--output-file',
    path.join(brand, `icon-${appearance.toLowerCase()}-rounded.png`), '--platform', 'iOS',
    '--rendition', appearance, '--width', '1024', '--height', '1024', '--scale', '1',
    '--design-generation', '26'], {stdio: 'inherit'});
}
const render = (output, size, mode = 'opaque', scale = '1') => execFileSync('swift', [raster,
  path.join(brand, 'icon-default-rounded.png'), output, String(size), mode, scale], {stdio:'inherit'});
render(path.join(root, 'icon.png'), 1024);
render(path.join(brand, 'launcher-foreground.png'), 1024, 'foreground', '0.80');
const icons = path.join(root, 'frontend/icons');
fs.mkdirSync(icons, {recursive:true});
for (const size of [32, 180, 192, 512]) render(path.join(icons, `icon-${size}.png`), size);
fs.copyFileSync(path.join(icons, 'icon-512.png'), path.join(icons, 'maskable-512.png'));
const inner = name => fs.readFileSync(path.join(brand,'AppIcon.icon/Assets',name),'utf8')
  .replace(/^.*?<title>.*?<\/title>/s,'').replace(/<\/svg>\s*$/,'');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="KARI app icon"><defs><clipPath id="rounded"><rect width="1024" height="1024" rx="224"/></clipPath></defs><g clip-path="url(#rounded)"><rect width="1024" height="1024" fill="#F8FAFD"/>${inner('KARI-Grid.svg')}${inner('KARI-Mark.svg')}</g></svg>\n`;
fs.writeFileSync(path.join(brand,'icon-rounded.svg'),svg);
for (const name of ['icon.svg','icon-192.svg','maskable-icon.svg']) {
  fs.writeFileSync(path.join(icons,name),name.startsWith('maskable') ? svg.replace('rx="224"','rx="0"') : svg);
}
const docs = path.join(root, 'docs/assets');
fs.mkdirSync(docs, {recursive:true});
fs.copyFileSync(path.join(brand,'icon-default-rounded.png'),path.join(docs,'app-icon-rounded.png'));
console.log('Exported KARI icons using Apple Icon Composer and Core Graphics.');
