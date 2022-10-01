const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const vite = require('vite');
const axios = require('axios');

const ROOT_DIR = path.resolve(__dirname, '../');
const FIGMA_ENTRY = 'src/figma/index.ts';
const OUT_NAME = 'figma';
const OUT_FILENAME = 'figma.js';
const HMR_HOST = '127.0.0.1';
const HMR_PORT = 3000;
const URL = `http://${HMR_HOST}:${HMR_PORT}`;

async function dev() {
  const targetHTMLPath = path.resolve(ROOT_DIR, 'dist/index.html');
  buildMainCode();
  await startDevServer();
  genIndexHtml(targetHTMLPath);
}

async function buildMainCode() {
  const config = vite.defineConfig({
    configFile: false, // 关闭默认使用的配置文件
    build: {
      emptyOutDir: false, // 不要清空 dist 目录
      lib: { // 使用库模式构建
        entry: path.resolve(ROOT_DIR, FIGMA_ENTRY),
        name: OUT_NAME,
        formats: ['es'],
        fileName: () => OUT_FILENAME,
      },
      sourcemap: 'inline',
      watch: {},
    },
  });
  return vite.build(config);
}

async function startDevServer() {
  const config = vite.defineConfig({
    configFile: path.resolve(ROOT_DIR, 'vite.config.ts'),
    root: ROOT_DIR,
    server: {
      hmr: {
        host: HMR_HOST, // 必须加上这个，否则 HMR 会报错
      },
      port: HMR_PORT,
    },
    build: {
      emptyOutDir: false, // 不要清空 dist 目录
      watch: {}, // 使用 watch 模式
    }
  });
  const server = await vite.createServer(config);
  await server.listen()

  server.printUrls()
}

async function genIndexHtml(targetHTMLPath) {
  const htmlContent = await getHTMLfromDevServer();
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;

  const base = document.createElement('base');
  base.setAttribute('href', URL);
  dom.window.document.head.insertBefore(base, document.head.firstChild);

  const result = dom.serialize();
  fs.writeFileSync(targetHTMLPath, result);
}

async function getHTMLfromDevServer() {
  const rsp = await axios.get(`${URL}/index.html`);
  return rsp.data;
}

dev();