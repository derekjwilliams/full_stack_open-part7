import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createBlog} from '../requests'
import {useNotificationDispatch} from '../NotificationContext'

const BlogForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['blogs']}) // magic here :)
    },
    onError: (e) => {
      notificationDispatch({
        type: 'SHOW',
        message: `Error creating blog: ${e.response.data.error}`,
      })
      setTimeout(() => {
        notificationDispatch({type: 'HIDE'})
      }, 5000)
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
    //   message: `Create New Post: ${anecdoteContent}`,
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
