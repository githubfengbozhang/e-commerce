import axios from '@/utils/request'

export function todayFaceQuery (params) {
  return axios({
    url: '/api/face/todayFaceQuery',
    method: 'post',
    params
  })
}
