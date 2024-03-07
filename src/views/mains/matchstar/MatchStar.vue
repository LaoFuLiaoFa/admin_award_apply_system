<!--
    * @FileDescription: 竞赛之星页面。
    * @Author: 李雪茹
    * @Date: 2024年1月22日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年1月22日
-->
<template>
  <div>
    <a-spin tip="正在加载，请稍候..." :spinning="spinning">
      <a-table :columns="columns" :data-source="filteredData" :pagination="false" bordered :scroll="{x: 1300}">
        <template #title>
          <div>
            <a-input-search v-model:value="inputValue" placeholder="请输入内容进行搜索" class="search-input" @search="competitionSearch" size="large" />
            <a-button :icon="h(CloudDownloadOutlined)" type="primary" shape="round" @click="exportlistjingsai" class="right-button" size="large">导出竞赛之星名单</a-button>
          </div>
        </template>
        <template #bodyCell="{column, record}">
          <template v-if="column.dataIndex === 'url'">
            <a-button type="link" @click="showUrl(record)">点击查看</a-button>
          </template>
          <template v-else-if="column.dataIndex === 'state'">
            <div v-for="tag in record.state" :key="tag" :style="{color: tag === '1' ? 'green' : tag === '2' ? 'red' : 'black'}">
              {{ tag === '1' ? '已通过' : tag === '2' ? '未通过' : '未审核' }}
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operate'">
            <!-- <template v-for="action in record.state" :key="action"> -->
            <!-- 状态为0 —— 未审核 -->
            <div v-if="record.state === '0'">
              <!-- 通过 -->
              <a-button ghost type="primary" @click="() => accept(record.id, record.url)" style="border-color: green; border-radius: 25px; color: #fff; background-color: green">
                通 过
              </a-button>
              <!-- 未通过 -->
              <a-button ghost type="primary" @click="showReason(record.id)" danger style="border-radius: 25px; margin-left: 3%"> 未 通 过 </a-button>
            </div>
            <!-- 状态为1 —— 已审核通过 -->
            <div v-else-if="record.state === '1'">
              <!-- <a-button type="text" style="color: green" @click="showCertificate">查看证书</a-button> -->
              <CheckCircleTwoTone :style="{fontSize: '25px'}" />
            </div>
            <!-- 状态为2 —— 已审核不通过 -->
            <div v-else-if="record.state === '2'">
              <a-button type="dashed" danger @click="() => getRefusereason(record.id)">查看驳回理由</a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-spin>
    <a-modal v-model:open="openReason" @ok="() => refuse(recordId, reasonValue)" @cancel="handleCancel" title="请输入不通过理由" ok-text="确定" cancel-text="取消" centered>
      <a-textarea v-model:value="reasonValue" :rows="4"></a-textarea>
    </a-modal>
    <a-modal v-model:open="openRefusereason" title="驳回理由：" :ok-button-props="{disabled: true}" :cancel-button-props="{disabled: true}" centered :footer="null">
      <p>{{ checkReason }}</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {ref, h} from 'vue';
import {CheckCircleTwoTone, CloudDownloadOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import {LXRgetCompetition, LXRcompetitionsearch, LXRacceptJingsai, LXRrefuseJingsai, LXRgetreasonJingsai} from '@/service/main/match-star';
const inputValue = ref<string>('');
// 定义加载状态
const spinning = ref<boolean>(true);
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
    fixed: 'right',
    width: 200,
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
  // console.log(loginResult);
  if (loginResult.code) {
    filteredData.value = loginResult.data;
    spinning.value = false;
  } else {
    message.warning(`${loginResult.msg}`);
  }
};
getData();
/**
 * @description 导出竞赛之星的名单
 */
const exportlistjingsai = () => {
  window.open('http://47.108.144.113:2000/api/admin/exportlistJingsai?token=' + localStorage.getItem('LOGIN_TOKEN'));
};
/**
 * @description 竞赛之星搜索
 */
const competitionSearch = async () => {
  if (inputValue.value) {
    spinning.value = true;
    const searchResult = await LXRcompetitionsearch(inputValue.value);
    // console.log(searchResult);
    if (searchResult.code === 200) {
      filteredData.value = searchResult.data;
      spinning.value = false;
    } else {
      message.warning(`${searchResult.message}`);
    }
  } else {
    getData();
  }
};
/**
 * @description 审批通过竞赛。
 */
const accept = async (form_id, awardurl) => {
  spinning.value = true;
  const acceptResult = await LXRacceptJingsai(form_id, awardurl);
  // console.log(acceptResult);
  spinning.value = false;
  if (acceptResult.code) {
    message.success(`${acceptResult.msg}`);
    getData();
  } else {
    message.warning(`${acceptResult.msg}`);
  }
};
/**
 *@description 审批拒绝竞赛相关
 */
const recordId = ref('');
const openReason = ref<boolean>(false);
const reasonValue = ref('');
const showReason = (form_id) => {
  openReason.value = true;
  recordId.value = form_id;
};
const handleCancel = () => {
  openReason.value = false;
  reasonValue.value = '';
};
/**
 *@description 审批拒绝竞赛。
 */
const refuse = async (form_id, reason) => {
  if (reasonValue.value) {
    openReason.value = false;
    spinning.value = true;
    const refuseResult = await LXRrefuseJingsai(form_id, reason);
    // console.log(form_id);
    // console.log(reason);
    // console.log(refuseResult);
    if (refuseResult.code) {
      refuseResult.data = reasonValue.value;
      getData();
      spinning.value = false;
      reasonValue.value = '';
      // reasonValue.value = refuseResult.data;
      // console.log('拒绝理由' + reasonValue.value);
      message.success(`${refuseResult.msg}`);
    } else {
      spinning.value = false;
      message.warning(`${refuseResult.msg}`);
    }
  } else {
    message.warning('拒绝理由不能为空！');
  }
};
/**
 *@description 查看驳回理由相关
 * */
let checkReason = ref('');
const openRefusereason = ref<boolean>(false);
const getRefusereason = async (form_id) => {
  // console.log('form_id:', form_id);
  spinning.value = true;
  const reasonResult = await LXRgetreasonJingsai(form_id);
  // console.log(reasonResult);
  if (reasonResult.code) {
    openRefusereason.value = true;
    // 存储驳回理由数据
    checkReason.value = reasonResult.data[0].reason;
    spinning.value = false;
    // checkReason.value = '';
  } else {
    message.warning(`${reasonResult.msg}`);
  }
};
/**
 * @description 佐证材料相关。
 */
const showUrl = (record) => {
  window.open(record.url, '_blank'); // 在新标签页中打开链接
};
</script>

<style scoped>
/* .top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
} */
.search-input {
  width: 30%;
}
.right-button {
  float: right;
  width: 30%;
}
/* @media (min-width: 768px) {
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
} */
</style>
