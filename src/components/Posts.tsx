import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import PostList from './PostList'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { Post } from '../models/Post'
import { PostType } from '../models/PostType'

function Posts({ type }: { type: PostType }) {
  const [state, setState] = useState<{
    error: Error | null
    posts: Post[] | null
  }>({
    error: null,
    posts: null,
  })

  useEffect(() => {
    console.log('Posts useEffect - type:', type)
    fetchMainPosts(type)
      .then((posts) => {
        setState({ posts, error: null })
      })
      .catch((error) => {
        console.error('Posts', error)
        setState({ posts: null, error })
      })
  }, [])

  const { error, posts } = state

  if (error !== null) {
    return <ErrorMessage />
  }

  if (posts === null) {
    return <Loading />
  }

  return <PostList posts={posts} />
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new']).isRequired,
}

export default Posts
