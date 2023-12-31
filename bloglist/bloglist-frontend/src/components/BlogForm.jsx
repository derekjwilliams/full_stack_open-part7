import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createBlog} from '../requests'
// import {useNotificationDispatch} from '../NotificationContext'

const BlogForm = () => {
  // const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['blogs']}) // magic here :)
    },
    onError: (e) => {
      // notificationDispatch({
      //   type: 'SHOW',
      //   message: `Error creating anecdote: ${e.response.data.error}`,
      // })
      // setTimeout(() => {
      //   notificationDispatch({type: 'HIDE'})
      // }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const blogTitle = event.target.title.value
    const blogAuthor = event.target.author.value
    const blogUrl = event.target.url.value

    mutation.mutate({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      votes: 0,
    })

    //    mutation.mutate({title: blogTitle, votes: 0})

    // notificationDispatch({
    //   type: 'SHOW',
    //   message: `Create New Anecdote: ${anecdoteContent}`,
    // })
    // setTimeout(() => {
    //   notificationDispatch({type: 'HIDE'})
    // }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <div>
          <label htmlFor="title">Title</label>
          <input name="title" />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input name="author" />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
/*


import {useState} from 'react'
import PropTypes from 'prop-types'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createBlog} from '../requests'
// import {useNotificationDispatch} from '../NotificationContext'

const BlogForm = ({createBlog}) => {
  // const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['blogs']})
    },
    onError: (e) => {
      console.log('error', e)
      // notificationDispatch({
      //   type: 'SHOW',
      //   message: `Error creating blog: ${e.response.data.error}`,
      // })
      // setTimeout(() => {
      //   notificationDispatch({type: 'HIDE'})
      // }, 5000)
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    debugger
    const blogTitle = event.target.blog_title.value
    const blogAuthor = event.target.blog_author.value
    const blogUrl = event.target.blog_url.value
    event.target.anecdote.value = ''
    mutation.mutate({
      blogTitle: blogTitle,
      blogAuthor: blogAuthor,
      blogUrl: blogUrl,
      votes: 0,
    })

    // notificationDispatch({
    //   type: 'SHOW',
    //   message: `Create New Anecdote: ${blogTitle}`,
    // })
    // setTimeout(() => {
    //   notificationDispatch({type: 'HIDE'})
    // }, 5000)
  }

  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')

  // const addBlog = (event) => {
  //   event.preventDefault()
  //   createBlog({
  //     title: newTitle,
  //     author: newAuthor,
  //     url: newUrl,
  //     likes: 0,
  //   })
  //   setNewTitle('')
  //   setNewAuthor('')
  //   setNewUrl('')
  // }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onCreate}>
        <div>
          <label htmlFor="blog_title">Title</label>
          <input
            value=""
            name="blog_title"
            // onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="blog_author">Author</label>
          <input
            value=""
            name="blog_author"
            // onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="blog_url">URL</label>
          <input
            value=""
            name="blog_url"
            // onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button data-testid="blogform-create-blog" type="submit">
          create
        </button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm
*/
