import PropTypes from 'prop-types'

const Post = ({ post }) => {
  return (
    <>
      <a href={post.url} className="link">
        {post.title}
      </a>
      <div className="meta-info-light">
        <span>{post.score} points</span>
        <span>
          by <a href={`/user?id=${post.by}`}>{post.by}</a>
        </span>
        <span>on {post.time}</span>
        <span>
          with <a href={`/post?id=${post.id}`}>{post.descendants}</a> comments
        </span>
      </div>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
