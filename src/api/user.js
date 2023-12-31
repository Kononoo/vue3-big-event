import httpInstance from "@/utils/request";


export const userRegisterAPI = ({username, password, repassword}) => {
  return  httpInstance({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
  // return httpInstance.post('/api/login', {username, password, repassword})
}

export const userLoginAPI = ({username, password}) => {
  return httpInstance.post('/api/login', {username, password})
}


export const userGetInfoAPI = () => {
  return  httpInstance.get('/my/userinfo')
}

export const userUpdateInfoAPI = (data) => {
  return httpInstance({
    url: '/my/userinfo',
    method: 'PUT',
    data
  })
}

export const userUpdateAvatarAPI = (avatar) => {
  // return httpInstance({
  //   url: '/my/update/avatar',
  //   method: 'PATCH',
  //   data: avatar
  // })
  return  httpInstance.patch('/my/update/avatar', { avatar })
}

export const userUpdatePasswordAPI = (data) => {
  return httpInstance({
    url: '/my/updatepwd',
    method: 'PATCH',
    data
  })
  // return httpInstance.patch('/my/updatepwd', { data })
}
