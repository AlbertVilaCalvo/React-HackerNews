import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchItem, fetchUser } from '../utils/api'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import { formatDate } from '../utils/helpers'
import ThemeContext from '../contexts/ThemeContext'
import Loading from './Loading'

class PostPage extends Component {
  state = {
    post: null,
  }

  componentDidMount() {
    const postId = new URLSearchParams(this.props.location.search).get('id')
    console.log('PostPage componentDidMount postId', postId)
    fetchItem(postId).then((post) => {
      console.log('post', postId, post)
      this.setState({ post })
    })
  }

  render() {
    const { post } = this.state
    const theme = this.context

    if (post === null) {
      return <Loading text="Fetching Post" />
    } else {
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
          <p></p>
          {post.descendants !== 0 && <Comments commentIds={post.kids} />}
        </>
      )
    }
  }
}

PostPage.contextType = ThemeContext

PostPage.propTypes = {}

export default PostPage
