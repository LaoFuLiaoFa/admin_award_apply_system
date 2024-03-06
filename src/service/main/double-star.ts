/**
 * @description 双创之星页面的请求。
 * @Author: 李雪茹
 */
import lsjRequest from '..';

/**
 * @description 获取双创之星表格数据。
 * @param null
 * @method get
 */

export function LXRgetcompany() {
  return lsjRequest.get({
    url: '/api/admin/getcompany'
  });
}
/**
 * @description 双创之星搜索
 * @param {string}field 搜索的内容
 * @method post
 */
export function LXRcompanysearch(field: string) {
  return lsjRequest.post({
    url: '/api/admin/companysearch',
    data: {field}
  });
}
/**
 * @description 导出名单双创
 * @param null
 * @method get
 */
export function LXRexportlistShuangc() {
  return lsjRequest.get({
    url: '/api/admin/exportlistShuangc'
  });
}
/**
 * @description 审批通过双创。
 * @param {string}form_id  表单id
 * @param {string}awardurl 奖项url
 * @method post
 */
export function LXRacceptShuangc(form_id: string, awardurl: string) {
  return lsjRequest.post({
    url: '/api/admin/acceptShuangc',
    data: {form_id, awardurl}
  });
}
/**
 * @description 审批拒绝双创。
 * @param {string} form_id 表单id
 * @param {string} reason 拒绝理由
 * @method post
 */
export function LXRrefuseShuangc(form_id: string, reason: string) {
  return lsjRequest.post({
    url: '/api/admin/refuseShuangc',
    data: {form_id, reason}
  });
}
/**
 * @description 查询驳回理由双创。
 * @param {string} form_id 表单id
 * @method get
 *  */
export function LXRgetreasonShuangc(form_id: string) {
  return lsjRequest.get({
    url: '/api/admin/getreasonShuangc?form_id=' + form_id
  });
}
