import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  return (
    <>
      <a href={post.url} className="link">
        {post.title}
      </a>
      <div className="meta-info-light">
        <span>{post.score} points</span>
        <span>
          by <Link to={`/user?id=${post.by}`}>{post.by}</Link>
        </span>
        <span>on {post.time}</span>
        <span>
          with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link>{' '}
          comments
        </span>
      </div>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
