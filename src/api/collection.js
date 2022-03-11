import request from '@/utils/request2'

/*
 *@description:获取资源列表
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getCollectionPostListByUserId(id) {
  return request({
    url: '/collection/user',
    method: 'get',
    params: { id }
  })
}
