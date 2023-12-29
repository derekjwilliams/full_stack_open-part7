import {useState} from 'react'
import {Button} from '@/components/ui/button'

const Blog = ({blog, user, incrementLikes, deleteBlog}) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    padding: '1rem 0',
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const itemStyle = {
    padding: '0.5rem',
    marginBottom: 5,
  }

  return (
    <div className="blog-item" style={blogStyle}>
      {showDetails && (
        <div>
          <div>
            <span style={itemStyle} className="blog-title">
              {blog.title}
            </span>
            <span style={itemStyle} className="blog-author">
              {blog.author}
            </span>
            <Button
              variant="secondary"
              className="hide-blog-details"
              data-testid="hide-blog-details"
              onClick={() => setShowDetails(false)}
            >
              hide
            </Button>
          </div>
          <div style={itemStyle} className="blog-url">
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            <label style={itemStyle} htmlFor="blog-likes">
              likes:
            </label>
            <span style={itemStyle} className="blog-likes" name="blog-likes">
              {blog.likes}
            </span>
            <Button
              variant="secondary"
              className="increment-blog-like"
              data-testid="increment-blog-like"
              onClick={() => incrementLikes(blog)}
            >
              like
            </Button>
          </div>
          <div style={itemStyle}>
            {blog &&
              blog.user &&
              user &&
              user.username === blog.user.username && (
                <Button
                  variant="secondary"
                  className="delete-blog"
                  data-testid="delete-blog"
                  onClick={() => deleteBlog(blog)}
                >
                  delete
                </Button>

                // <button
                //   data-testid="delete-blog"
                //   onClick={() => deleteBlog(blog)}
                // >
                //   delete
                // </button>
              )}
          </div>
          <div style={itemStyle} className="blog-username">
            {showDetails && blog.user && blog.user.username}
          </div>
        </div>
      )}
      {!showDetails && (
        <div>
          <div>
            <span style={itemStyle} className="blog-title">
              {blog.title}
            </span>
            <span style={itemStyle} className="blog-author">
              {blog.author}
            </span>
            <Button
              variant="secondary"
              className="blog-show-details"
              data-testid="blog-show-details"
              onClick={() => setShowDetails(true)}
            >
              show
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
