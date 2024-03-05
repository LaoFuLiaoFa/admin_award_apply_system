<!--
    * @FileDescription: 竞赛之星页面。
    * @Author: 李雪茹
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <div class="top">
    <a-input-search v-model:value="inputValue" placeholder="请输入内容" style="width: 200px" @search="onSearch" />
    <a-dropdown class="right">
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1"> 名单 </a-menu-item>
          <a-menu-item key="2"> 证书 </a-menu-item>
        </a-menu>
      </template>
      <a-button>
        导出竞赛之星
        <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>
  <a-spin tip="正在加载，请稍候..." :spinning="spinning">
    <a-table :columns="columns" :data-source="filteredData" :pagination="false" class="responsive-table" bordered>
      <template #bodyCell="{column, record}">
        <template v-if="column.dataIndex === 'url'">
          <a-button type="link" @click="showUrl">点击查看</a-button>
          <a-modal v-model:open="openUrl" title="佐证材料" :footer="null" centered>
            <a>{{ record.url }}</a>
          </a-modal>
        </template>
        <template v-if="column.dataIndex === 'state'">
          <div v-for="tag in record.state" :key="tag" :style="{color: tag === '1' ? 'green' : tag === '2' ? 'red' : 'black'}">
            {{ tag === '1' ? '已通过' : tag === '2' ? '未通过' : '未审核' }}
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operate'">
          <span>
            <template v-for="action in record.state" :key="action">
              <!-- 状态为0 —— 未审核 -->
              <div v-if="action === '0'">
                <!-- 通过 -->
                <a-button ghost type="primary" style="border-color: green; border-radius: 25px; color: #fff; background-color: green"> 通 过 </a-button>
                <!-- 未通过 -->
                <a-button ghost type="primary" danger style="border-radius: 25px; margin-left: 3%"> 未 通 过 </a-button>
              </div>
              <!-- 状态为1 —— 已审核通过 -->
              <div v-else-if="action === '1'">
                <a-button type="text" style="color: green" @click="showCertificate">查看证书</a-button>
              </div>
              <!-- 状态为2 —— 已审核不通过 -->
              <div v-else-if="action === '2'">
                <a-button type="text" style="color: red" @click="showCertificate">查看驳回理由</a-button>
              </div>
              <a-modal v-model:open="openCertificate" title="查看详情" :ok-button-props="{disabled: true}" :cancel-button-props="{disabled: true}">
                <p>balbala</p>
              </a-modal>
            </template>
          </span>
        </template>
      </template>
    </a-table>
  </a-spin>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {DownOutlined} from '@ant-design/icons-vue';
import {message, type MenuProps} from 'ant-design-vue';
import {LXRgetCompetition} from '@/service/main/match-star';

const inputValue = ref<string>('');
// 定义加载状态
const spinning = ref<boolean>(true);

type DataType = {
  grade: string;
  major: string;
  class: string;
  name: string;
  cname: string;
  time: string;
  url: string;
  state: string[];
  operate: string[];
};

/**
 * @description 定义表头。
 */
const columns = [
  {
    title: '年级',
    dataIndex: 'grade',
    align: 'center',
    key: 'grade'
  },
  {
    title: '专业',
    dataIndex: 'major',
    align: 'center',
    key: 'major'
  },
  {
    title: '班级',
    dataIndex: 'class',
    align: 'center',
    key: 'class'
  },
  {
    title: '姓名',
    dataIndex: 'stuname',
    align: 'center',
    key: 'name'
  },
  {
    title: '竞赛名称',
    dataIndex: 'entryname',
    align: 'center',
    key: 'entryname'
  },
  {
    title: '报名时间',
    dataIndex: 'signuptime',
    align: 'center',
    key: 'signuptime'
  },
  {
    title: '佐证材料',
    dataIndex: 'url',
    align: 'center',
    key: 'url'
  },
  {
    title: '状态',
    dataIndex: 'state',
    align: 'center',
    key: 'state'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    align: 'center',
    key: 'operate'
  }
];

// let data = ref([]);
// const filteredData = ref<Array<DataType>>(data);
let filteredData = ref([]);
/**
 * @description 请求竞赛之星数据。
 */
const getData = async () => {
  const loginResult = await LXRgetCompetition();
  console.log(loginResult);
  if (loginResult.code) {
    filteredData.value = loginResult.data;
    spinning.value = false;
  } else {
    message.warning(`${loginResult.msg}`);
  }
};
getData();

/**
 * @description 佐证材料相关。
 */
const openUrl = ref<boolean>(false);
const showUrl = () => {
  openUrl.value = true;
};

/**
 * @description 查看证书相关。
 */
const openCertificate = ref<boolean>(false);
const showCertificate = () => {
  openCertificate.value = true;
};

const onSearch = () => {
  // filteredData.value = data.filter((item) => {
  //   const searchString = inputValue.value.toLocaleLowerCase();
  //   return item.major.includes(searchString) || item.name.includes(searchString) || item.cname.includes(searchString) || item.state.join(', ').includes(searchString);
  // });
};
const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
</script>

<style scoped>
.top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
}
@media (min-width: 768px) {
  .top {
    flex-direction: row;
  }
}
@media (max-width: 768px) {
  .right {
    width: 200px;
    margin-top: 5px;
  }
  .responsive-table {
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>
