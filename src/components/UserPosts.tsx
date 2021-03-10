import PropTypes from 'prop-types'
import { fetchPosts } from '../utils/api'
import PostList from './PostList'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { useState, useEffect } from 'react'
import { Post } from '../models/Post'

function UserPosts({ postIds }: { postIds: number[] }) {
  const [state, setState] = useState<{
    error: Error | null
    posts: Post[] | null
  }>({
    error: null,
    posts: null,
  })

  useEffect(() => {
    console.log('UserPosts componentDidMount - postIds:', postIds)
    fetchPosts(postIds)
      .then((posts) => {
        console.log(posts)
        setState({ posts, error: null })
      })
      .catch((error) => {
        console.error('UserPosts', error)
        setState({ posts: null, error })
      })
  }, [postIds])

  const { error, posts } = state

  if (error !== null) {
    return <ErrorMessage />
  }

  if (posts === null) {
    return <Loading text="Fetching Posts" />
  }

  return <PostList posts={posts} />
}

UserPosts.propTypes = {
  postIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default UserPosts
