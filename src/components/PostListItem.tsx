import { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { Post } from '../models/Post'
import ThemeContext from '../contexts/ThemeContext'

const PostListItem = ({ post }: { post: Post }) => {
  const theme = useContext(ThemeContext)

  return (
    <>
      <a href={post.url} className="link">
        {post.title}
      </a>
      <div className={`meta-info-${theme}`}>
        <span>{post.score} points</span>
        <span>
          by <Link to={`/user?id=${post.by}`}>{post.by}</Link>
        </span>
        <span>on {formatDate(post.time)}</span>
        <span>
          with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link>{' '}
          comments
        </span>
      </div>
    </>
  )
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostListItem
