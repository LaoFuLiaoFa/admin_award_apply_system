<!--
    * @FileDescription: 登录页面。
    * @Author: 作者信息
    * @Date: 2024年1月22日
    * @LastEditors: 蒋雯绘
    * @LastEditTime: 2024年1月22日
-->
<template>
  <a-config-provider :theme="{token: {colorPrimary: '#02509b'}}">
    <div>
      <a-layout class="main">
        <a-layout-header class="header">
          <div class="logo-div">
            <img src="@/assets/images/logo-font.png" alt="成都东软学院logo图片" class="logo" />
          </div>
        </a-layout-header>
        <a-layout class="all-content">
          <a-row>
            <a-col :span="12">
              <div class="left-content">
                <div class="left-box">
                  <p class="h1">成都东软学院</p>
                  <p class="h2">学生学院奖项信息填报系统</p>
                  <p class="h3">建议使用谷歌浏览器</p>
                </div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="right-content">
                <div class="right-box">
                  <div class="change">
                    <p class="recompose">登录</p>
                  </div>
                  <a-divider style="height: 1px; background-color: #005746" soild />

                  <div>
                    <a-form :model="formState" name="basic" :wrapper-col="{span: 19, offset: 3}" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                      <a-form-item name="useraccount">
                        <a-row>
                          <a-input class="input" v-model:value="formState.useraccount" placeholder="请输入学号" />
                        </a-row>
                      </a-form-item>
                      <a-form-item name="password">
                        <a-row>
                          <a-input-password class="input1" v-model:value="formState.password" placeholder="请输入密码" />
                        </a-row>
                      </a-form-item>
                    </a-form>
                  </div>
                  <a-button type="primary" class="submit" @click="logIn">登录</a-button>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import {JWHLoginRequest} from '@/service/login/login';
import {message} from 'ant-design-vue';
import {reactive} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const state = reactive({
  checked: true
});

interface FormState {
  useraccount: string;
  repassword: string;
  password: string;
  email: string;
  code: string;
}

const formState = reactive<FormState>({
  useraccount: '',
  repassword: '',
  password: '',
  email: '',
  code: ''
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

/**
 * @description 点击登录按钮。
 * @param null
 * @method post
 */
async function logIn() {
  // console.log(formState.useraccount)
  // console.log(formState.password)
  const loginResult = await JWHLoginRequest(formState.useraccount, formState.password);
  console.log(loginResult);
  if (loginResult.code == 200) {
    // console.log(loginResult.data)
    localStorage.setItem('LOGIN_TOKEN', loginResult.data.access_Token);
    router.push('/MatchStar');
    // 根据judge选择页面登录
    if(loginResult.data.judge=="学习之星与进步之星"){
      router.push('/LearningProgress');
    }else if(loginResult.data.judge=="竞赛之星"){
      router.push('/ResearchStar');
    }else if(loginResult.data.judge=="科研之星"){
      router.push('/ResearchStar');
    }else if(loginResult.data.judge=="双创之星"){
      router.push('/DoubleStar');
    };
    message.success(`${loginResult.msg}`);
  } else {
    message.warning(`${loginResult.msg}`);
  }
}

</script>

<style scoped>
@import url('@/assets/css/login.css');
</style>
