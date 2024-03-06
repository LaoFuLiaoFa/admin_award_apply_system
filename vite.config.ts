import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
//缺少插件：
// 如果没有配置 @vitejs/plugin-vue 插件和 unplugin-vue-components 插件，
// 那么在项目中无法使用 Vue 单文件组件以及自动注册 Vue 组件的功能。
// 这可能会导致开发过程中需要手动注册每个 Vue 组件，增加了开发的工作量和复杂度。

// 缺少解析规则：
// 如果没有配置模块解析规则，那么在项目中可能无法使用别名来引用模块和文件，
// 需要使用相对路径或绝对路径来引用，这可能会导致代码的可读性较差，且在重构或调整项目结构时会比较麻烦。

// 不支持 Ant Design Vue 组件：
// 如果没有配置解析器为 Ant Design Vue 解析器，并禁用将样式作为 CSS 导入的选项，
// 那么在项目中可能无法直接使用 Ant Design Vue 组件，或者在使用时需要额外的配置和处理来支持样式的导入和管理
