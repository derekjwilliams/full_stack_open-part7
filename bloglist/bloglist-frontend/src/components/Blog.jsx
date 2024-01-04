import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
    <Card className="blog-item shadow-lg">
      {/* <div className="blog-item" style={blogStyle}> */}
      {showDetails && (
        <>
          <CardHeader>
            <CardTitle style={itemStyle} className="blog-title">
              {blog.title}
            </CardTitle>
            <div className="ml-4">
              <CardDescription
                style={itemStyle}
                className="blog-author text-lg"
              >
                by {blog.author}
              </CardDescription>
              <CardDescription style={itemStyle} className="blog-url">
                <a href={blog.url}>{blog.url}</a>
              </CardDescription>
            </div>
          </CardHeader>

          <CardFooter>
            <label style={itemStyle} htmlFor="blog-likes">
              likes:
            </label>
            <span style={itemStyle} className="blog-likes" name="blog-likes">
              {blog.likes}
            </span>
            <Button
              variant="secondary"
              className="increment-blog-like m-4"
              data-testid="increment-blog-like"
              onClick={() => incrementLikes(blog)}
            >
              like
            </Button>
            <Button
              variant="secondary"
              className="hide-blog-details justify-end m-4"
              data-testid="hide-blog-details"
              onClick={() => setShowDetails(false)}
            >
              collapse
            </Button>
            {blog &&
              blog.user &&
              user &&
              user.username === blog.user.username && (
                <Button
                  variant="secondary"
                  className="delete-blog m-4"
                  data-testid="delete-blog"
                  onClick={() => deleteBlog(blog)}
                >
                  delete
                </Button>
              )}
          </CardFooter>
          <CardFooter style={itemStyle} className="blog-username">
            {showDetails && blog.user && blog.user.username}
          </CardFooter>
        </>

        // <div>
        //   <div>
        //     <span style={itemStyle} className="blog-title">
        //       {blog.title}
        //     </span>
        //     <span style={itemStyle} className="blog-author">
        //       {blog.author}
        //     </span>
        //     <Button
        //       variant="secondary"
        //       className="hide-blog-details"
        //       data-testid="hide-blog-details"
        //       onClick={() => setShowDetails(false)}
        //     >
        //       hide
        //     </Button>
        //   </div>
        //   <div style={itemStyle} className="blog-url">
        //     <a href={blog.url}>{blog.url}</a>
        //   </div>
        //   <div>
        //     <label style={itemStyle} htmlFor="blog-likes">
        //       likes:
        //     </label>
        //     <span style={itemStyle} className="blog-likes" name="blog-likes">
        //       {blog.likes}
        //     </span>
        //     <Button
        //       variant="secondary"
        //       className="increment-blog-like"
        //       data-testid="increment-blog-like"
        //       onClick={() => incrementLikes(blog)}
        //     >
        //       like
        //     </Button>
        //   </div>
        //   <div style={itemStyle}>
        //     {blog &&
        //       blog.user &&
        //       user &&
        //       user.username === blog.user.username && (
        //         <Button
        //           variant="secondary"
        //           className="delete-blog"
        //           data-testid="delete-blog"
        //           onClick={() => deleteBlog(blog)}
        //         >
        //           delete
        //         </Button>
        //       )}
        //   </div>
        //   <div style={itemStyle} className="blog-username">
        //     {showDetails && blog.user && blog.user.username}
        //   </div>
        // </div>
      )}
      {!showDetails && (
        <>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription>{blog.author}</CardDescription>
            <Button
              variant="secondary"
              className="blog-show-details max-w-32"
              data-testid="blog-show-details"
              onClick={() => setShowDetails(true)}
            >
              details
            </Button>
          </CardHeader>
        </>
        // <div>
        //   <span style={itemStyle} className="blog-title">
        //     {blog.title}
        //   </span>
        //   <span style={itemStyle} className="blog-author">
        //     {blog.author}
        //   </span>
        //   <Button
        //     variant="secondary"
        //     className="blog-show-details"
        //     data-testid="blog-show-details"
        //     onClick={() => setShowDetails(true)}
        //   >
        //     show
        //   </Button>
        // </div>
      )}
    </Card>
    // </div>
  )
}

export default Blog
