<!--
    * @FileDescription: 布局页面。
    * @Author: 李思佳
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <a-layout class="main">
    <a-layout-header class="header">
      <HeaderMenu />
    </a-layout-header>
    <a-layout-content class="main-content">
      <a-layout class="main-content-layout">
        <RouterView />
      </a-layout>
    </a-layout-content>
    <a-layout-footer class="footer">
      <a-divider plain class="footer-divider"><span class="footer-font">Copyright © 2024 成都东软学院. 京ICP备10214630号</span></a-divider>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
// 导入组件
import HeaderMenu from '@/components/mains/main-page/HeaderMenu.vue';
</script>

<style scoped>
.main {
  min-height: 100%;
  background-image: url('../../assets/images/back9.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.header {
  background: #02509b;
  position: fixed;
  z-index: 99;
  width: 100%;
}

.main-content {
  display: flex;
  margin-top: 64px;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  padding: 3% 3% 0 3%;
}

.main-content-layout {
  flex: 1;
  padding: 3%;
  background: #ffffff;
  border-radius: 15px;
}

.main-content-sider {
  background: #fff;
}

.main-content-layout-content {
  padding: 0 3%;
}

.footer {
  text-align: center;
  padding: 0 3%;
  background: transparent;
}

.footer-divider {
  border-color: #fff;
}

.footer-font {
  color: #fff;
}
</style>
