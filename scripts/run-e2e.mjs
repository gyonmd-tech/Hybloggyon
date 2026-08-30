import './load-env.mjs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const HOST = '127.0.0.1';
const PORT = Number.parseInt(process.env.E2E_PORT || '3100', 10);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://${HOST}:${PORT}`;
const STARTUP_TIMEOUT_MS = 120_000;

const nodeBin = process.execPath;
const nextBin = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const playwrightBin = fileURLToPath(
  new URL('../node_modules/@playwright/test/cli.js', import.meta.url),
);

const server = spawn(nodeBin, [nextBin, 'start', '-H', HOST, '-p', String(PORT)], {
  detached: process.platform !== 'win32',
  env: process.env,
  stdio: 'inherit',
  windowsHide: true,
});

let serverExited = false;
server.once('exit', () => {
  serverExited = true;
});

async function waitForServer() {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;

  while (Date.now() < deadline) {
    if (serverExited) {
      throw new Error('Server Next.js berhenti sebelum siap menerima koneksi.');
    }

    try {
      const response = await fetch(`${BASE_URL}/admin/login`, { redirect: 'manual' });
      if (response.status > 0) return;
    } catch {
      // Server masih melakukan boot.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Server tidak siap dalam ${STARTUP_TIMEOUT_MS / 1000} detik.`);
}

async function stopServer() {
  if (serverExited) return;

  if (process.platform === 'win32') {
    await new Promise((resolve) => {
      const killer = spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], {
        stdio: 'ignore',
        windowsHide: true,
      });
      killer.once('exit', resolve);
      killer.once('error', resolve);
    });
    return;
  }

  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    return;
  }

  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);

  if (!serverExited) {
    try {
      process.kill(-server.pid, 'SIGKILL');
    } catch {
      // Proses sudah berhenti di antara pemeriksaan dan penghentian paksa.
    }
  }
}

let exitCode = 1;

try {
  await waitForServer();

  exitCode = await new Promise((resolve, reject) => {
    const runner = spawn(
      nodeBin,
      [playwrightBin, 'test', ...process.argv.slice(2)],
      {
        env: {
          ...process.env,
          E2E_MANAGED_SERVER: '1',
          PLAYWRIGHT_BASE_URL: BASE_URL,
        },
        stdio: 'inherit',
        windowsHide: true,
      },
    );

    runner.once('error', reject);
    runner.once('exit', (code) => resolve(code ?? 1));
  });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
} finally {
  await stopServer();
}

process.exit(exitCode);
