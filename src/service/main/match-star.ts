/**
 * @description 竞赛之星页面的请求。
 * @Author: 李雪茹
 */
import lsjRequest from '..';

/**
 * @description 获取竞赛之星表格数据。
 * @param null
 * @method get
 */
export function LXRgetCompetition() {
  return lsjRequest.get({
    url: '/api/admin/getcompetition'
  });
}
/**
 * @description 导出名单竞赛。
 * @param null
 * @method get
 */
export function LXRexportlistJingsai() {
  return lsjRequest.get({
    url: '/api/admin/exportlistJingsai'
  });
}
/**
 * @description 竞赛之星搜索。
 * @param {string} field 搜索的内容
 * @method post
 */
export function LXRcompetitionsearch(field: string) {
  return lsjRequest.post({
    url: '/api/admin/competitionsearch',
    data: {field}
  });
}
/**
 * @description 审批通过竞赛。
 * @param {string} form_id 表单id
 * @param {string} awardurl 奖状url
 * @method post
 */
export function LXRacceptJingsai(form_id: string, awardurl: string) {
  return lsjRequest.post({
    url: '/api/admin/acceptJingsai',
    data: {form_id, awardurl}
  });
}
/**
 * @description 审批拒绝竞赛。
 * @param {string} form_id 表单id
 * @param {string} reason 拒绝理由
 * @method post
 */
export function LXRrefuseJingsai(form_id: string, reason: string) {
  return lsjRequest.post({
    url: '/api/admin/refuseJingsai',
    data: {form_id, reason}
  });
}
/**
 * @description 查询驳回理由竞赛。
 * @param {string} form_id 表单id
 * @method get
 *  */
export function LXRgetreasonJingsai(form_id: string) {
  return lsjRequest.get({
    url: '/api/admin/getreasonJingsai?form_id=' + form_id
  });
}
