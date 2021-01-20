import { Component, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchItem, fetchUser } from '../utils/api'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import { formatDate } from '../utils/helpers'
import ThemeContext from '../contexts/ThemeContext'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

function PostPage({ location }) {
  const postId = new URLSearchParams(location.search).get('id')
  const [state, setState] = useState({
    error: null,
    post: null,
  })

  useEffect(() => {
    console.log('PostPage useEffect postId', postId)
    fetchItem(postId)
      .then((post) => {
        console.log('post', postId, post)
        setState({ post, error: null })
      })
      .catch((error) => {
        console.error('PostPage', error)
        setState({ post: null, error })
      })
  }, [])

  const { error, post } = state
  const theme = useContext(ThemeContext)

  if (error !== null) {
    return <ErrorMessage />
  }

  if (post === null) {
    return <Loading text="Fetching Post" />
  }

  return (
    <>
      <h1 className="header">
        <a className="link" href={post.url}>
          {post.title}
        </a>
      </h1>
      <div className={`meta-info-${theme}`}>
        <span>
          by <Link to={`/user?id=${post.by}`}>{post.by}</Link>
        </span>
        <span>on {formatDate(post.time)}</span>
        <span>
          with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link>{' '}
          comments
        </span>
      </div>
      {/* This empty <p></p> appears on the solution :thinking: */}
      <p></p>
      {post.descendants !== 0 && <Comments commentIds={post.kids} />}
    </>
  )
}

PostPage.propTypes = {}

export default PostPage
