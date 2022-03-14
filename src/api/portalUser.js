import request from '@/utils/request2'

export function login(data) {
  return request({
    url: 'users/userLogin',
    method: 'post',
    data
  })
}

/*
 *@description:根据用户信息更新用户
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function updateUser(data) {
  return request({
    url: '/users/id',
    method: 'put',
    data
  })
}

/*
 *@description:根据id查询用户，并返回查询到的用户
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function getUserInfoById(id) {
  return request({
    url: '/users/info/id',
    method: 'get',
    params: { id }
  })
}
