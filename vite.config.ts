import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
  ElementPlusResolver,
  TDesignResolver,
} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: "vue-next",
        }),
        ElementPlusResolver(),
      ],
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: "vue-next",
        }),
        ElementPlusResolver(),
      ],
    }),
  ],
  json: {
    // 是否支持从 .json 文件中进行按名导入
    namedExports: true,
    // 若设置为 true, 导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好
    // 尤其是当 JSON 文件较大时
    // 开启此项， 则会禁用按名导入
    stringify: false,
  },
  // 打包配置
  build: {
    lib: {
      entry: "src/packages/index.ts", // 设置入口文件
      name: "json-form", // 起个名字，安装、引入用
      fileName: (format) => `json-form.${format}.js`, // 打包后的文件名
    },
    sourcemap: true, // 输出.map文件
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "tdesign-vue-next", "ant-design-vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "tdesign-vue-next": "tdesign-vue-next",
          "ant-design-vue": "ant-design-vue",
        },
      },
    },
  },
});
