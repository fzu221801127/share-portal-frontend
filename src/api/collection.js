import request from '@/utils/request2'

/*
 *@description:根据用户id获取收藏资源列表
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

/*
 *@description:根据用户id及资源id收藏资源
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function userCollectPost(data) {
  return request({
    url: '/collection',
    method: 'post',
    data
  })
}

/*
 *@description:根据用户id及资源id取消收藏资源
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function userUnCollectPost(data) {
  return request({
    url: '/collection',
    method: 'delete',
    data
  })
}
