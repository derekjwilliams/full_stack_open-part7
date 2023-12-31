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
  return axios.post(baseUrl, blog).then((res) => res.data)
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
