/**
 * @description 科研之星页面的请求。
 * @Author: 李雪茹
 */
import lsjRequest from '..';

/**
 * @description 获取科研之星数据
 * @param null
 * @method get
 * @return 没有返回信息写 void / 有返回信息 {返回类型} 描述信息
 */
export function LXRgetsci() {
  return lsjRequest.get({
    url: '/api/admin/getsci'
  });
}
/**
 * @description 科研之星搜索
 * @param {string}field 搜索的内容
 * @method post
 */
export function LXRscisearch(field: string) {
  return lsjRequest.post({
    url: '/api/admin/scisearch',
    data: {field}
  });
}
/**
 * @description 导出名单科研
 * @param null
 * @method get
 */
export function LXRexportlistSic() {
  return lsjRequest.get({
    url: '/api/admin/exportlistSic'
  });
}
/**
 * @description 审批通过科研
 * @param {string}form_id  表单id
 * @param {string}awardurl 奖项url
 * @method post
 */
export function LXRacceptSic(form_id: string, awardurl: string) {
  return lsjRequest.post({
    url: '/api/admin/acceptSic',
    data: {form_id, awardurl}
  });
}
/**
 * @description 审批拒绝科研。
 * @param {string} form_id 表单id
 * @param {string} reason 拒绝理由
 * @method post
 */
export function LXRrefuseSic(form_id: string, reason: string) {
  return lsjRequest.post({
    url: '/api/admin/refuseSic',
    data: {form_id, reason}
  });
}
/**
 * @description 查询驳回理由科研。
 * @param {string} form_id 表单id
 * @method get
 *  */
export function LXRgetreasonSic(form_id: string) {
  return lsjRequest.get({
    url: '/api/admin/getreasonSic?form_id=' + form_id
  });
}
