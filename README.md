# Figma Plugin With Vue 3 + TypeScript + Vite + Tailwind

> CODE.FUN —— UI 设计稿智能生成源代码
>
>一键将 Figma、Sketch、PSD 转换为 VUE、React、小程序、uni-app 等多种代码  
>
>https://code.fun



## 目录结构
1. VUE 的代码放在 src/ui 下面
2. Figma 的代码放在 src/figma 下面

## 快速开始
1. 编译代码 npm run dev 或者 npm run build 皆可，输出目录都是 dist
2. 安装 Figma Desktop 版本
3. 在菜单找到 Plugin 菜单项，导入插件，导入时选中根目录的 manifest.json 文件即可（需要 dist 目录已经存在）
4. 导入成功后，在 Plugin 栏目运行即可

## 发布
1. 执行 npm run build，输出 dist 目录
2. 执行 npm run zip，直接打包 manifest.json 和 dist

Figma Plugin 需要依赖 manifest.json，已经在 manifest.json 中配置好指向 dist 中的相关文件，发布时不需要手动移动 manifest.json，直接执行 npm run zip 打包即可

## 遗留问题
1. npm run build 打包后，svg 资源无法被内联到 index.html 中，所以必须起一个资源服务器才行，这个是由于 vite 打包工具不支持内联 svg, png 资源没有这个问题
2. npm run dev 调试模式下，没有以上问题