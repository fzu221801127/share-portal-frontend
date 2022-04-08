import request from '@/utils/request2'

/*
 *@description:新增资源
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function insertPost(data) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}

/*
 *@description:举报资源
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function tipOffPost(data) {
  return request({
    url: '/posts/tipOffPost',
    method: 'put',
    data
  })
}

/*
 *@description:获取资源列表
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getPostPageList(currentPage, pagesize) {
  return request({
    url: '/posts',
    method: 'get',
    params: { currentPage, pagesize }
  })
}

/*
 *@description:根据标题模糊查询资源，并返回查询到的资源列表
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function searchPostByTitle(title) {
  return request({
    url: '/posts/title',
    method: 'get',
    params: { title }
  })
}

/*
 *@description:根据id查询资源，并返回查询到的资源
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function getPostById(id) {
  return request({
    url: '/posts/id',
    method: 'get',
    params: { id }
  })
}

/*
 *@description:获取点击量前十文章
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function getTopTenClickPost(data) {
  return request({
    url: '/posts/topTenClick',
    method: 'get',
    data
  })
}
