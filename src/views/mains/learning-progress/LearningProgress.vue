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
      <a-dropdown class="left">
        <template #overlay>
          <a-menu @click="handleGradeClick">
            <a-spin :spinning="spinning">
              <a-menu-item v-for="item in dropdownGrades" :key="item.grade"> {{ item.grade }} </a-menu-item>
            </a-spin>
          </a-menu>
        </template>
        <a-button style="width: 150px">
          {{ selectedGrade || '请选择年级' }}
          <DownOutlined />
        </a-button>
      </a-dropdown>

      <a-dropdown class="left">
        <template #overlay>
          <a-menu @click="handleMajorClick">
            <a-menu-item v-for="item in dropdownMajors" :key="item.major"> {{ item.major }} </a-menu-item>
          </a-menu>
        </template>
        <a-button style="width: 150px">
          {{ selectedMajor || '请选择专业' }}
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <a-dropdown class="left">
        <template #overlay>
          <a-menu @click="handleAwardClick">
            <a-menu-item key="学习之星"> 学习之星 </a-menu-item>
            <a-menu-item key="进步之星"> 进步之星 </a-menu-item>
          </a-menu>
        </template>
        <a-button style="width: 150px">
          {{ selectedAward || '请选择奖项' }}
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <!-- <SearchOutlined style="font-size: 30px" class="" /> -->
      <a-button type="primary" shape="circle" :icon="h(SearchOutlined)" @click="() => getData(selectedGrade, selectedMajor, selectedAward)" />
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
  <a-spin tip="正在加载，请稍候..." :spinning="spinning">
    <a-table :columns="columns" :data-source="filterData" :pagination="false" class="responsive-table" bordered> </a-table>
  </a-spin>
</template>

<script setup lang="ts">
import {h, onMounted, ref} from 'vue';
import {UserOutlined, DownOutlined, SearchOutlined} from '@ant-design/icons-vue';
import {message, type MenuProps} from 'ant-design-vue';
import {LXRgetgrade, LXRgetmajor, LXRgetlearning} from '@/service/main/learning-progress';
const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
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
    title: '学号',
    dataIndex: 'stuid',
    align: 'center',
    key: 'stuid'
  },
  {
    title: '姓名',
    dataIndex: 'stuname',
    align: 'center',
    key: 'stuname'
  },
  {
    title: '去年总分',
    dataIndex: 'oldgrade',
    align: 'center',
    key: 'oldgrade'
  },
  {
    title: '今年总分',
    dataIndex: 'newgrade',
    align: 'center',
    key: 'newgrade'
  },
  {
    title: '去年排名',
    dataIndex: 'oldorder',
    align: 'center',
    key: 'oldorder'
  },
  {
    title: '今年排名',
    dataIndex: 'neworder',
    align: 'center',
    key: 'neworder'
  },
  {
    title: '名次进步百分比',
    dataIndex: 'progress',
    align: 'center',
    key: 'progress'
  }
];
// 定义加载状态
const spinning = ref(false);
const selectedGrade = ref<string | null>(null);
const selectedMajor = ref<string | null>(null);
const selectedAward = ref<string | null>(null);
const handleGradeClick = (e) => {
  selectedGrade.value = e.key;
  // console.log(selectedGrade.value);
};
const handleMajorClick = (e) => {
  selectedMajor.value = e.key;
  // console.log(selectedMajor.value);
};
const handleAwardClick = (e) => {
  // console.log(e);
  selectedAward.value = e.key;
  // console.log(selectedAward.value);
};

interface dropdownGrade {
  grade: string;
}
/**
 *@description 获取进步之星或学习之星名单。
 */
let filterData = ref([]);
const getData = async (grade, major, state) => {
  spinning.value = true;
  const learningResult = await LXRgetlearning(grade, major, state);
  // console.log(learningResult);
  if (learningResult.code === 200) {
    if (Array.isArray(learningResult.data)) {
      spinning.value = false;
      filterData.value = learningResult.data;
      // console.log(learningResult.data);
    } else {
      spinning.value = false;
      filterData.value = []; // 如果不是数组，则清空filterData
      console.error('数据不是一个有效的数组');
    }
    // console.log(learningResult);
    // console.log(learningResult.data);
    // spinning.value = false;
  } else {
    spinning.value = false;
    message.warning(`${learningResult.message}`);
  }
};
/**
 *@description 获取年级下拉框
 */
const dropdownGrades = ref<dropdownGrade[]>([]);
const fetchGrades = async () => {
  try {
    spinning.value = true;
    const response = await LXRgetgrade();
    // console.log(response);
    if (response.code === 200 && response.data.length > 0) {
      dropdownGrades.value = response.data;
      // grades.value = dropdownGrades.value;
    } else {
      console.error('接口请求失败:', response.message);
    }
  } catch (error) {
    console.error('发生错误:', error);
  } finally {
    spinning.value = false;
  }
};
/**
 *@description 获取专业下拉框
 */
interface dropdownMajor {
  major: string;
}
const dropdownMajors = ref<dropdownMajor[]>([]);
const fetchMajors = async (grades) => {
  try {
    spinning.value = true;
    // console.log(dropdownGrades.value);
    // console.log(grades.value);
    for (const grade of grades) {
      const majorResult = await LXRgetmajor(grade);
      // console.log(majorResult);
      if (majorResult.code === 200 && majorResult.data.length > 0) {
        dropdownMajors.value.push(...majorResult.data); // 使用 push 将专业信息添加到数组中
      } else if (majorResult.data.length === 0) {
        dropdownMajors.value = [{major: '数据为空'}];
      } else {
        message.warning(`${majorResult.message}`);
      }
    }
  } catch (error) {
    console.error('发生错误:', error);
  } finally {
    spinning.value = false;
  }
};
// 在组件加载时调用接口获取年级、专业数据
onMounted(async () => {
  await fetchGrades();
  fetchMajors(dropdownGrades.value.map((item) => item.grade));
});
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
