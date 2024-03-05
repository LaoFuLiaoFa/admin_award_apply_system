<!--
    * @FileDescription: 页面的头部组件。
    * @Author: 李思佳
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <a-row justify="space-around" align="middle">
    <a-col :span="12">
      <div class="logo-div">
        <img src="@/assets/images/logo-font.png" alt="成都东软学院logo图片" class="logo" />
      </div>
    </a-col>
    <a-col :span="12" style="text-align: right">
      <a-tooltip title="退出登录">
        <a-button @click="handleExitClick" shape="circle" :icon="h(PoweroffOutlined)" size="large"></a-button>
      </a-tooltip>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import {h} from 'vue';
import {PoweroffOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import router from '@/routers';

function handleExitClick() {
  message.success('退出系统成功,欢迎您下次登录!');
  router.push('/LogIn');
}
</script>

<style scoped>
.logo-div {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
}
.logo {
  height: 50px;
}
</style>
