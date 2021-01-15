import PropTypes from 'prop-types'
import PostListItem from './PostListItem'

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="post">
          <PostListItem post={post} />
        </li>
      ))}
    </ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}
