import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {Button} from './components/ui/button'
import {getBlogs, updateBlog, login, setToken} from './requests'

const localStorageUserKey = 'loggedBlogappUser'
const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationKind, setNotificationKind] = useState('notification')

  const notificationDuration = 5000 //milliseconds
  const blogFormRef = useRef()

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem(localStorageUserKey)
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const blogs = result.data

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => {
  //     setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  //   })
  // }, [])

  const incrementLikes = (blog) => {
    blog.likes = blog.likes + 1
    const returnedBlog = blogService.update(blog) //todo update state
    const updatedBlogs = blogs
      .map((blog) => {
        if (blog.id === returnedBlog.id) {
          return returnedBlog
        }
        return blog
      })
      .sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = (blogToDelete) => {
    if (window.confirm(`Remove blog: ${blogToDelete.title}?`)) {
      blogService.remove(blogToDelete)
      const updatedBlogs = blogs
        .filter((blog) => {
          return blog.id !== blogToDelete.id
        })
        .sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    }
  }

  const Blogs = () => (
    <div className="blog-list">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Posts
      </h1>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          incrementLikes={incrementLikes}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNotificationKind('success')
      setNotificationMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      )
      setTimeout(() => {
        setNotificationKind('')
        setNotificationMessage(null)
      }, notificationDuration)
    })
  }

  function handleLogout() {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem(localStorageUserKey)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // const result = login({
      //   username,
      //   password,
      // })
      const user = await loginService.login({
        username,
        password,
      })
      if (result.isLoading) {
        return <div>loading data...</div>
      }

      if (result.isError) {
        return <div>blog service not available due to problems in server</div>
      }
      // const user = result.data
      console.log('user: ', user)
      window.localStorage.setItem(localStorageUserKey, JSON.stringify(user))
      // debugger
      setToken(user.token)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationKind('success')
      setNotificationMessage(`${username} logged in`)
      setTimeout(() => {
        setNotificationKind('')
        setNotificationMessage(null)
      }, notificationDuration)
    } catch (exception) {
      setNotificationKind('error')
      setNotificationMessage('Wrong username or password')
      setTimeout(() => {
        setNotificationKind('')
        setNotificationMessage(null)
      }, notificationDuration)
    }
  }
  const blogForm = () => (
    <Togglable buttonLabel="" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  return (
    <div>
      <Notification message={notificationMessage} kind={notificationKind} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <Button
              variant="secondary"
              data-testid="logout-button"
              onClick={handleLogout}
            >
              logout
            </Button>
          </p>
          {blogForm()}
          {Blogs()}
        </div>
      )}
    </div>
  )
}

export default App
