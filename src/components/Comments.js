import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchComments } from '../utils/api'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import ThemeContext from '../contexts/ThemeContext'

class Comments extends Component {
  state = {
    comments: [],
  }

  componentDidMount() {
    const commentIds = this.props.commentIds
    console.log('Comments componentDidMount commentIds', commentIds)
    fetchComments(commentIds).then((comments) => {
      console.log('comments', commentIds, comments)
      this.setState({ comments })
    })
  }

  render() {
    const { comments } = this.state
    const theme = this.context

    if (comments.length === 0) {
      return <p>Fetching Comments</p>
    } else {
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
}

Comments.contextType = ThemeContext

Comments.propTypes = {
  commentIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Comments
