/**
 * @description 学习之星与进步之星页面的请求。
 * @Author: 李雪茹
 */
import lsjRequest from '..';

/**
 * @description 方法描述
 * @param {参数类型} 参数名称
 * @param {参数类型} 参数名称
 * @method post / get
 * @return 没有返回信息写 void / 有返回信息 {返回类型} 描述信息
 */
/**
 * @description 获取年级下拉框。
 * @param null
 * @method get
 */
export function LXRgetgrade() {
  return lsjRequest.get({
    url: '/api/getgrade'
  });
}
/**
 * @description 获取专业下拉框。
 * @param {string} grade 年级
 * @param {string} major 专业
 * @param {string} state 类型（学习之星或进步之星）
 * @method get
 */
export function LXRgetmajor(grade: string) {
  return lsjRequest.get({
    url: '/api/getmajor',
    params: {grade}
  });
}
/**
 * @description 获取进步之星或学习之星名单。
 * @param null
 * @method get
 */
export function LXRgetlearning(grade: string, major: string, state: string) {
  return lsjRequest.get({
    url: '/api/admin/getlearning',
    params: {grade, major, state}
  });
}
/**
 * @description 导出名单进步之星或学习之星名单。
 * @param null
 * @method get
 */
export function LXRexportlistlearning(grade: string, major: string, state: string) {
  return lsjRequest.get({
    url: '/api/Exportlearning',
    params: {grade, major, state}
  });
}
