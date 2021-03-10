import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchComments } from '../utils/api'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import ThemeContext from '../contexts/ThemeContext'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { Comment } from '../models/Comment'

function Comments({ commentIds }: { commentIds: number[] }) {
  const [state, setState] = useState<{
    error: Error | null
    comments: Comment[] | null
  }>({
    error: null,
    comments: null,
  })

  useEffect(() => {
    fetchComments(commentIds)
      .then((comments) => {
        setState({ comments, error: null })
      })
      .catch((error) => {
        console.error('Comments', error)
        setState({ comments: null, error })
      })
  }, [commentIds])

  const { error, comments } = state
  const theme = useContext(ThemeContext)

  if (error !== null) {
    return <ErrorMessage />
  }

  if (comments === null) {
    return <Loading text="Fetching Comments" />
  }

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.by} className="comment">
          <div className={`meta-info-${theme}`}>
            <span>
              by <Link to={`/user?id=${comment.by}`}>{comment.by}</Link>
            </span>
            <span>on {formatDate(comment.time)}</span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: comment.text }} />
        </div>
      ))}
    </>
  )
}

Comments.propTypes = {
  commentIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Comments
