import httpInstance from "@/utils/request";

/**
 * 都是获取分类相关
 */

// 获取文章接口
export const artGetChannelAPI = () => {
  return  httpInstance.get('/my/cate/list')
}

// 添加文章接口
export const artAddChannelAPI = ({cate_name, cate_alias}) => {
  return httpInstance.post('/my/cate/add', {cate_name, cate_alias})
}

// 编辑文章接口
export const artEditChannelAPI = (data) => {
  return httpInstance.put('/my/cate/info', data)
}

// 删除文章接口
export const artDelChannelAPI = (id) => {
  return httpInstance({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {id}
  })
}


/**
 * 获取文章列表
 */
// 获取文章分类列表
export const artGetListAPI = ( params ) => {
  return httpInstance({
    url: '/my/article/list',
    method: 'GET',
    params
  })
}

// 发布文章
export const artPublishAPI = (data) => {
  return httpInstance({
    url: '/my/article/add',
    method: "POST",
    data
  })
}

// 获取文章详情
export const artGetDetailAPI = (id) => {
  return httpInstance({
    url: '/my/article/info',
    method: "GET",
    params: id
  })
}

// 更新文章详情
export const artUpdateAPI = (data) => {
  return httpInstance({
    url: '/my/article/info',
    method: "GET",
    data
  })
}

// 删除文章
export const artDeleteAPI = (id) => {
  return httpInstance({
    url: '/my/article/info',
    method: 'DELETE',
    params: id
  })
}