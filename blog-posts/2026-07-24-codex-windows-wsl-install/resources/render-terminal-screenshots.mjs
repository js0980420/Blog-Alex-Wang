import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outDir = new URL('../images/', import.meta.url);
await mkdir(outDir, { recursive: true });

const shots = [
  {
    file: '01-wsl-environment.png',
    title: 'WSL 環境確認｜2026-07-24 實測',
    lines: [
      ['prompt', '$ uname -a'],
      ['text', 'Linux Alex 6.6.87.2-microsoft-standard-WSL2 #1 SMP PREEMPT_DYNAMIC'],
      ['text', 'Thu Jun 5 18:30:46 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux'],
      ['prompt', '$ echo $WSL_DISTRO_NAME'],
      ['text', 'Ubuntu-24.04'],
      ['prompt', '$ code --version'],
      ['text', '1.130.0'],
      ['text', '1b6a188127eeaf9194f945eb6eb89a657e93c54c'],
      ['text', 'x64'],
      ['prompt', '$ node --version && npm --version'],
      ['text', 'v24.11.0'],
      ['text', '11.6.1'],
    ],
  },
  {
    file: '02-vscode-extension-detected.png',
    title: 'VS Code 擴充套件確認｜2026-07-24 實測',
    lines: [
      ['prompt', '$ code --list-extensions --show-versions | sort | rg -i openai'],
      ['success', 'openai.chatgpt@26.721.30844'],
    ],
  },
  {
    file: '03-codex-clean-install.png',
    title: 'Codex CLI 隔離安裝｜2026-07-24 實測',
    lines: [
      ['prompt', '$ install_root=/tmp/codex-article-clean-install'],
      ['prompt', '$ mkdir -p "$install_root/home" "$install_root/bin"'],
      ['prompt', '$ curl -fsSL https://chatgpt.com/codex/install.sh | \\'],
      ['prompt', '  CODEX_HOME="$install_root/home" CODEX_INSTALL_DIR="$install_root/bin" \\'],
      ['prompt', '  CODEX_NON_INTERACTIVE=1 sh'],
      ['info', '==> Installing Codex CLI'],
      ['info', '==> Detected platform: Linux (x64)'],
      ['info', '==> Resolved version: 0.145.0'],
      ['info', '==> Detected existing npm-managed Codex at'],
      ['info', '    /home/js0980420/.nvm/versions/node/v24.11.0/bin/codex'],
      ['warning', 'WARNING: Multiple managed Codex installs can be ambiguous because PATH order'],
      ['warning', 'decides which one runs.'],
      ['info', '==> Downloading Codex CLI'],
      ['info', '==> Installing standalone package to'],
      ['info', '    /tmp/codex-article-clean-install/home/packages/standalone/releases/'],
      ['info', '    0.145.0-x86_64-unknown-linux-musl'],
      ['warning', 'WARNING: proceeding, even though we could not create PATH aliases:'],
      ['warning', 'Refusing to create helper binaries under temporary dir "/tmp"'],
      ['warning', '(codex_home: AbsolutePathBuf("/tmp/codex-article-clean-install/home"))'],
      ['info', '==> Current terminal: export PATH="/tmp/codex-article-clean-install/bin:$PATH"'],
      ['info', '    && codex'],
      ['info', '==> Future terminals: open a new terminal and run: codex'],
      ['info', '==> PATH was added to /home/js0980420/.bashrc'],
      ['success', 'Codex CLI 0.145.0 installed successfully.'],
    ],
  },
  {
    file: '04-codex-version-check.png',
    title: 'Codex CLI 版本驗證｜2026-07-24 實測',
    lines: [
      ['prompt', '$ /tmp/codex-article-clean-install/bin/codex --version'],
      ['success', 'codex-cli 0.145.0'],
      ['text', ''],
      ['prompt', '$ which codex'],
      ['text', '/home/js0980420/.nvm/versions/node/v24.11.0/bin/codex'],
      ['prompt', '$ codex --version'],
      ['text', 'codex-cli 0.144.6'],
    ],
  },
  {
    file: '09-codex-windows-isolated-install.png',
    title: 'Codex CLI｜Windows PowerShell 隔離安裝實測',
    lines: [
      ['prompt', 'PS> $env:CODEX_HOME="$env:LOCALAPPDATA\\OpenAI\\Codex-Isolated"'],
      ['prompt', 'PS> $env:CODEX_INSTALL_DIR="$env:LOCALAPPDATA\\Programs\\OpenAI\\Codex-Isolated\\bin"'],
      ['prompt', 'PS> $env:CODEX_NON_INTERACTIVE="1"'],
      ['prompt', 'PS> irm https://chatgpt.com/codex/install.ps1 | iex'],
      ['info', '==> Installing Codex CLI'],
      ['info', '==> Detected platform: Windows (x64)'],
      ['info', '==> Resolved version: 0.145.0'],
      ['info', '==> Downloading Codex CLI'],
      ['info', '==> PATH updated for future PowerShell sessions.'],
      ['info', '==> Current PowerShell session: codex'],
      ['info', '==> Future PowerShell windows: open a new PowerShell window and run: codex'],
      ['success', 'Codex CLI 0.145.0 installed successfully.'],
      ['prompt', 'PS> & "$env:CODEX_INSTALL_DIR\\codex.exe" --version'],
      ['success', 'codex-cli 0.145.0'],
      ['text', 'CODEX_HOME (User): C:\\Users\\js098\\AppData\\Local\\OpenAI\\Codex-Isolated'],
      ['text', 'PATH first entry: ...\\Programs\\OpenAI\\Codex-Isolated\\bin'],
    ],
  },
];

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const colors = {
  prompt: '#7dd3fc',
  text: '#e5e7eb',
  success: '#86efac',
  info: '#c4b5fd',
  warning: '#fbbf24',
  dim: '#94a3b8',
};

for (const shot of shots) {
  const width = 1400;
  const height = 190 + shot.lines.length * 54;
  const body = shot.lines
    .map(
      ([kind, line], index) =>
        `<text x="76" y="${172 + index * 54}" fill="${colors[kind]}" font-size="27">${escapeXml(line)}</text>`,
    )
    .join('\n');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" rx="28" fill="#0f172a"/>
      <rect width="100%" height="78" rx="28" fill="#1e293b"/>
      <circle cx="42" cy="39" r="10" fill="#fb7185"/>
      <circle cx="72" cy="39" r="10" fill="#fbbf24"/>
      <circle cx="102" cy="39" r="10" fill="#4ade80"/>
      <text x="700" y="49" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="25">${escapeXml(shot.title)}</text>
      <g font-family="DejaVu Sans Mono, monospace">${body}</g>
    </svg>`;
  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(outDir.pathname, shot.file));
}

console.log(`Generated ${shots.length} terminal record images in ${outDir.pathname}`);
