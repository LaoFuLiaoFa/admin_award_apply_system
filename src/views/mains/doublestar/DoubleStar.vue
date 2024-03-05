<!--
    * @FileDescription: 双创之星页面。
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
        导出双创之星
        <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>
  <a-table :columns="columns" :data-source="filteredData" :pagination="false" class="responsive-table" bordered>
    <template #bodyCell="{column, record}">
      <template v-if="column.dataIndex === 'materials'">
        <a>{{ record.materials }}</a>
      </template>
      <template v-else-if="column.dataIndex === 'state'">
        <a v-for="tag in record.state" :key="tag" :style="{color: tag === '已通过' ? 'green' : tag === '未通过' ? 'red' : 'black'}">{{ tag }}</a>
      </template>
      <template v-else-if="column.dataIndex === 'operate'">
        <span>
          <template v-for="action in record.operate" :key="action">
            <a v-if="action === '查看证书' || action === '查看驳回理由'" :style="{color: action === '查看证书' ? 'green' : 'red'}">
              {{ action }}
            </a>
            <a-tag v-else :color="action === '通过' ? 'green' : 'red'">
              {{ action }}
            </a-tag>
          </template>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {DownOutlined} from '@ant-design/icons-vue';
import type {MenuProps} from 'ant-design-vue';
const inputValue = ref<string>('');
type DataType = {
  key: string;
  grade: string;
  major: string;
  class: string;
  name: string;
  companyname: string;
  vp: string;
  ranking: string;
  signuptime: string;
  scale: string;
  materials: string;
  state: string[];
  operate: string[];
};
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
    dataIndex: 'name',
    align: 'center',
    key: 'name'
  },
  {
    title: '注册公司名称',
    dataIndex: 'companyname',
    align: 'center',
    key: 'companyname'
  },
  {
    title: '实体/虚体',
    dataIndex: 'vp',
    align: 'center',
    key: 'vp'
  },
  {
    title: '申报人排名',
    dataIndex: 'ranking',
    align: 'center',
    key: 'ranking'
  },
  {
    title: '注册时间',
    dataIndex: 'signuptime',
    align: 'center',
    key: 'signuptime'
  },
  {
    title: '公司规模',
    dataIndex: 'scale',
    align: 'center',
    key: 'scale'
  },
  {
    title: '佐证材料',
    dataIndex: 'materials',
    align: 'center',
    key: 'materials'
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
const data = [
  {
    key: '1',
    grade: '2023级',
    major: '软件工程',
    class: '1',
    name: '李四',
    companyname: 'Tb',
    vp: '实体',
    ranking: '22',
    signuptime: '2024/1/1',
    scale: '一般',
    materials: '点击查看',
    state: ['未审批'],
    operate: ['通过', '未通过']
  },
  {
    key: '2',
    grade: '2023级',
    major: '软件工程',
    class: '1',
    name: '李四',
    companyname: 'Tb',
    vp: '实体',
    ranking: '22',
    signuptime: '2024/1/1',
    scale: '一般',
    materials: '点击查看',
    state: ['已通过'],
    operate: ['查看证书']
  },
  {
    key: '3',
    grade: '2023级',
    major: '软件工程',
    class: '1',
    name: '李四',
    companyname: 'Tb',
    vp: '虚体',
    ranking: '22',
    signuptime: '2024/1/1',
    scale: '一般',
    materials: '点击查看',
    state: ['未通过'],
    operate: ['查看驳回理由']
  },
  {
    key: '4',
    grade: '2023级',
    major: '软件工程',
    class: '1',
    name: '李四',
    companyname: 'Tb',
    vp: '实体',
    ranking: '22',
    signuptime: '2024/1/1',
    scale: '一般',
    materials: '点击查看',
    state: ['未审批'],
    operate: ['查看驳回理由']
  }
];
const filteredData = ref<Array<DataType>>(data);
const onSearch = () => {
  filteredData.value = data.filter((item) => {
    const searchString = inputValue.value.toLocaleUpperCase();
    return (
      item.grade.includes(searchString) ||
      item.major.includes(searchString) ||
      item.name.toLowerCase().includes(searchString) ||
      item.companyname.toLowerCase().includes(searchString) ||
      item.vp.toLowerCase().includes(searchString) ||
      item.ranking.toString().includes(searchString) ||
      item.scale.toLowerCase().includes(searchString) ||
      item.state.join(', ').toLowerCase().includes(searchString)
    );
  });
};
const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
@media (max-width: 768px) {
  .top {
    flex-direction: column;
  }
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
