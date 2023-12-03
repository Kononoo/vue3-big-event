import httpInstance from "@/utils/request";

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