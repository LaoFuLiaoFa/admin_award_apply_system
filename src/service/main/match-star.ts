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
