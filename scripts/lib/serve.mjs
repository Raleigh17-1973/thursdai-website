// Starts the built Next.js app (`next start`) for post-build checks, or reuses
// BASE_URL when one is given. Requires `next build` to have run first.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');

async function waitForServer(baseUrl, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(baseUrl, { redirect: 'manual' });
      if (res.status < 500) return;
    } catch {
      // not listening yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${baseUrl} did not become ready within ${timeoutMs}ms`);
}

export async function startServer() {
  if (process.env.BASE_URL) {
    return { baseUrl: process.env.BASE_URL.replace(/\/+$/, ''), stop: () => {} };
  }
  if (!existsSync(path.join(ROOT, '.next', 'BUILD_ID'))) {
    throw new Error('No production build found. Run `npm run build` first.');
  }

  const port = process.env.PORT ?? '3199';
  const nextBin = path.join(ROOT, 'node_modules', 'next', 'dist', 'bin', 'next');
  const child = spawn(process.execPath, [nextBin, 'start', '-p', port], {
    cwd: ROOT,
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  const stop = () => {
    if (!child.killed) child.kill();
  };
  process.on('exit', stop);

  const baseUrl = `http://localhost:${port}`;
  try {
    await waitForServer(baseUrl, 60_000);
  } catch (err) {
    stop();
    throw err;
  }
  return { baseUrl, stop };
}

export async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.text();
}
