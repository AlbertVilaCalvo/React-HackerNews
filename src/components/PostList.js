import PropTypes from 'prop-types'
import Post from './Post'

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="post">
          <Post post={post} />
        </li>
      ))}
    </ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}
