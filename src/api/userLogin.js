import request from '@/utils/request2'

export function login(data) {
  return request({
    url: 'users/userLogin',
    method: 'post',
    data
  })
}
