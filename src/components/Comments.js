import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchComments } from '../utils/api'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import ThemeContext from '../contexts/ThemeContext'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

class Comments extends Component {
  state = {
    error: null,
    comments: null,
  }

  componentDidMount() {
    const commentIds = this.props.commentIds
    fetchComments(commentIds)
      .then((comments) => {
        this.setState({ comments })
      })
      .catch((error) => {
        console.error('Comments', error)
        this.setState({ error })
      })
  }

  render() {
    const { error, comments } = this.state
    const theme = this.context

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
}

Comments.contextType = ThemeContext

Comments.propTypes = {
  commentIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Comments
