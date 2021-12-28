import request from '@/plugin/axios'
import util from '@/libs/util'
// import app from '../main.js'

// 将捕获的错误统一由方法cbForErr处理
export function Ajax(json, cb, cbForErr = (err) => {
  console.log('err on ' + `${json.url}` + err)
}) {
  return request({
    ...json,
    headers: {
      Authorization: 'bearer' + util.cookies.get('token')
    }
  })
    .then(res => {
      if (res.status_code === 200) {
        cb(res)
      } else {
        cbForErr(res)
      }
    })
    .catch(err => {
      cbForErr(err)

    })
}

// 格式化提交分页参数
export function formatResponse(pageInfo, sort, order, searchParam) {
  sort = sort || null
  order = order || null
  searchParam = searchParam || null
  const params = {
    page_size: pageInfo.pageSize,
    page_no: pageInfo.currentPage
  }
  if (sort) params.sort = sort
  if (order) params.order = order
  if (searchParam) {
    for (let key in searchParam) {
      if (key !== 'search') {
        params[key] = searchParam[key]
      } else {
        params.search = ''
        for (let y in searchParam[key]) {
          if (searchParam[key][y] !== '') {
            params.search += y + ':' + searchParam[key][y] + ';'
          }
        }
      }
    }
  }
  return params
}

// 格式化提交分页参数
export function formatPage(pageInfo, sort, order, search) {
  sort = sort || null
  order = order || null
  search = search || null
  const params = {
    page_size: pageInfo.pageSize,
    page_no: pageInfo.currentPage
  }
  if (sort) params.sort = sort
  if (order) params.order = order
  if (search) params.search = search
  return params
}

// 格式化返回结果
export function formatResult(res) {
  let pageInfo = {
    pageSize: 10,
    currentPage: 1,
    total: 0
  }
  if (res.status_code === 200) {
    pageInfo.pageSize = parseInt(res.meta[0].pagination.page_size)
    pageInfo.currentPage = parseInt(res.meta[0].pagination.page_no)
    pageInfo.total = parseInt(res.meta[0].pagination.total)
  }
  return [false, res.data, pageInfo]
}

// 格式化提交分页参数
export function formatGetParam(searchParam) {
  searchParam = searchParam || null
  var result = '';
  var search = '';
  if (searchParam) {
    for (let key in searchParam) {
      if (searchParam[key] != '' && searchParam[key] != null) {
        if (key !== 'search') {
          result += `&${key}=${searchParam[key]}`;
        } else {
          for (let y in searchParam[key]) {
            if (searchParam[key][y]) search += y + ':' + searchParam[key][y] + ';'
          }
          if (search != '') result += `&search=${search}`;
        }
      }
    }
    if (result) {
      result = result.substr(1);
    }
  }
  return result
}

export const globalUtil = {
  fileURL: "https://linkjoint-super.oss-accelerate.aliyuncs.com",
  courseUrl: "https://linkjoint-boss.oss-accelerate.aliyuncs.com"
};