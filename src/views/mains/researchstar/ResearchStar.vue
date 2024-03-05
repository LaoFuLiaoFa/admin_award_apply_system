<!--
    * @FileDescription: 科研之星页面。
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
        导出科研之星
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
  scitype: string;
  sciname: string;
  scigrade: string;
  signuptime: string;
  ranking: string;
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
    title: '项目类别',
    dataIndex: 'scitype',
    align: 'center',
    key: 'scitype'
  },
  {
    title: '项目名称/软著名称/期刊名称',
    dataIndex: 'sciname',
    align: 'center',
    key: 'sciname'
  },
  {
    title: '项目级别/颁发单位/论文名称',
    dataIndex: 'scigrade',
    align: 'center',
    key: 'scigrade'
  },
  {
    title: '立项时间/获批时间/发表时间',
    dataIndex: 'signuptime',
    align: 'center',
    key: 'signuptime'
  },
  {
    title: '排名/总人数',
    dataIndex: 'ranking',
    align: 'center',
    key: 'ranking'
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
    scitype: '院级',
    sciname: '2024年版本1.0',
    scigrade: '中',
    signuptime: '2024/1/22',
    ranking: '23',
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
    scitype: '省级',
    sciname: '2024年版本2.0',
    scigrade: '大',
    signuptime: '2024/1/25',
    ranking: '13',
    materials: '点击查看',
    state: ['已通过'],
    operate: ['查看证书']
  },
  {
    key: '3',
    grade: '2023级',
    major: '商务管理',
    class: '1',
    name: '王五',
    scitype: '院级',
    sciname: '2024年版本3.0',
    scigrade: '小',
    signuptime: '2024/1/22',
    ranking: '6',
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
    scitype: '院级',
    sciname: '2024年版本4.0',
    scigrade: '中',
    signuptime: '2024/1/22',
    ranking: '12',
    materials: '点击查看',
    state: ['未审批'],
    operate: ['查看驳回理由']
  }
];
const filteredData = ref<Array<DataType>>(data);
const onSearch = () => {
  filteredData.value = data.filter((item) => {
    const searchString = inputValue.value.toLocaleLowerCase();
    return (
      item.major.includes(searchString) ||
      item.name.includes(searchString) ||
      item.sciname.includes(searchString) ||
      item.scigrade.includes(searchString) ||
      item.signuptime.includes(searchString) ||
      item.state.join(', ').includes(searchString)
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
