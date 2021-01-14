import PropTypes from 'prop-types'

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <p>{post.title}</p>
        </li>
      ))}
    </ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}
