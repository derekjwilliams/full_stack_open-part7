import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
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
    <Card className="blog-item">
      {/* <div className="blog-item" style={blogStyle}> */}
      {showDetails && (
        <>
          <div>
            <CardTitle style={itemStyle} className="blog-title">
              {blog.title}
            </CardTitle>
            <CardTitle style={itemStyle} className="blog-author">
              {blog.author}
            </CardTitle>
            <Button
              variant="secondary"
              className="hide-blog-details"
              data-testid="hide-blog-details"
              onClick={() => setShowDetails(false)}
            >
              hide
            </Button>
          </div>
          <CardDescription style={itemStyle} className="blog-url">
            <a href={blog.url}>{blog.url}</a>
          </CardDescription>
          <CardFooter>
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
          </CardFooter>
          <CardFooter>
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
              className="blog-show-details"
              data-testid="blog-show-details"
              onClick={() => setShowDetails(true)}
            >
              show
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
