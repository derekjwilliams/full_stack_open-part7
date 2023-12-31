import axios from 'axios'
const baseUrl = '/api/blogs'
const authUrl = '/api/login'
// const baseUrl = 'http://localhost:3001/yyy' //TODO fix url

let token = null

export const setToken = (newToken) => {
  console.log('============set token', newToken)
  token = `Bearer ${newToken}`
}

export const getBlogs = () => {
  return axios.get(baseUrl).then((res) => res.data)
}

export const createBlog = (blog) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  const user = JSON.parse(loggedUserJSON)
  // blogService.setToken(user.token)

  const config = {
    headers: {Authorization: 'Bearer ' + user.token},
  }

  console.log('createBlog')
  console.log('createBlog, config: ', config)

  // const response = await axios.post(baseUrl, newBlog, config)
  // return response.data

  return axios.post(baseUrl, blog, config).then((res) => res.data)
}

export const updateBlog = (blog) => {
  console.log('requests/updateBlog: ', blog)
  return axios.put(`${baseUrl}/${blog.id}`, blog).then((res) => res.data)
}

export const login = (credentials) => {
  console.log('login')
  //  return axios.post
  return axios.post(authUrl, credentials).then((res) => res.data)
}
