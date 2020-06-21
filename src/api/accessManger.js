import axios from '@/utils/request'

export function todayFaceQuery () {
  return axios({
    url: '/api/face/todayFaceQuery',
    method: 'post',
  })
}
export function faceQuery (params) {
  return axios({
    url: '/api/face/query',
    method: 'post',
    params
  })
}
export function hisFaceTempDateQuery (params) {
  return axios({
    url: '/api/face/hisFaceTempDateQuery',
    method: 'post',
    params
  })
}
export function todayFaceDateQuery (params) {
  return axios({
    url: '/api/face/todayFaceDateQuery',
    method: 'post',
    params
  })
}
