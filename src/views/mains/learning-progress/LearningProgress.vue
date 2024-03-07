<!--
    * @FileDescription: 学习之星与进步之星页面。
    * @Author: 李雪茹
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <div class="dropdown-container">
    <div class="dropdown-left">
      <a-dropdown class="left" trigger="hover">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1"> 1st menu item </a-menu-item>
            <a-menu-item key="2">
              <UserOutlined />
              2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
              <UserOutlined />
              3rd item
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          请选择年级
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <a-dropdown class="left">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1"> 1st menu item </a-menu-item>
            <a-menu-item key="2"> 2nd menu item </a-menu-item>
            <a-menu-item key="3"> 3rd item </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          请选择专业
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <a-dropdown class="left">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1"> 学习之星 </a-menu-item>
            <a-menu-item key="2"> 进步之星 </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          请选择奖项
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <!-- <SearchOutlined style="font-size: 30px" class="" /> -->
      <a-button type="primary" shape="circle" :icon="h(SearchOutlined)" />
    </div>
    <div class="dropdown-right">
      <a-dropdown class="right">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1"> 名单 </a-menu-item>
            <a-menu-item key="2"> 证书 </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          导出进步之星
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <a-dropdown class="right">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1"> 名单 </a-menu-item>
            <a-menu-item key="2"> 证书 </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          导出学习之星
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>
  </div>
  <a-table :columns="columns" :data-source="data" :pagination="false" class="responsive-table" bordered>
    <!-- <template #bodyCell="{column, text}"> -->
    <!-- <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template> -->
    <!-- </template> -->
  </a-table>
</template>

<script setup lang="ts">
import {h} from 'vue';
import {UserOutlined, DownOutlined, SearchOutlined} from '@ant-design/icons-vue';
import type {MenuProps} from 'ant-design-vue';
const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
const columns = [
  {
    title: '年级',
    dataIndex: 'name',
    align: 'center',
    key: 'name'
  },
  {
    title: '专业',
    dataIndex: 'age',
    align: 'center',
    key: 'age'
  },
  {
    title: '班级',
    dataIndex: 'address',
    align: 'center',
    key: 'address 1'
  },
  {
    title: '学号',
    dataIndex: 'address',
    align: 'center',
    key: 'address 2'
  },
  {
    title: '姓名',
    dataIndex: 'address',
    align: 'center',
    key: 'address 3'
  },
  {
    title: '去年总分',
    dataIndex: 'address',
    align: 'center',
    key: 'address 4'
  },
  {
    title: '今年总分',
    dataIndex: 'address',
    align: 'center',
    key: 'address 4'
  },
  {
    title: '去年排名',
    dataIndex: 'address',
    align: 'center',
    key: 'address 4'
  },
  {
    title: '今年排名',
    dataIndex: 'address',
    align: 'center',
    key: 'address 4'
  },
  {
    title: '名次进步百分比',
    dataIndex: 'address',
    align: 'center',
    key: 'address 4'
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];
</script>

<style scoped>
.dropdown-container {
  display: flex;
  flex-direction: column; /* 将布局方向改为垂直列布局 */
  justify-content: space-between;
  margin-bottom: 30px;
}

.dropdown-left,
.dropdown-right {
  display: flex;
  flex-direction: column; /* 将左右两列改为垂直列布局 */
  margin-bottom: 10px; /* 添加垂直间距 */
}

@media (min-width: 768px) {
  /* 在宽度达到 768px 以上时，恢复为水平布局 */
  .dropdown-container {
    flex-direction: row;
  }

  .dropdown-left,
  .dropdown-right {
    flex-direction: row;
    margin-bottom: 0; /* 取消垂直间距 */
  }
  .left,
  .right {
    margin-right: 5px;
  }
}
@media (max-width: 768px) {
  .responsive-table {
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>
