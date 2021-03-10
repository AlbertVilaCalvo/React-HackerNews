import PropTypes from 'prop-types'
import PostListItem from './PostListItem'
import { Post } from '../models/Post'

export default function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="center-text">0 posts :(</p>
  }

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
