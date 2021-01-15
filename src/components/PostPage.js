import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchItem, fetchUser } from '../utils/api'
import UserPosts from './UserPosts'
import { Link } from 'react-router-dom'

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
    if (post === null) {
      return <p>Fetching Post</p>
    } else {
      return (
        <>
          <h1 className="header">
            <a className="link" href={post.url}>
              {post.title}
            </a>
          </h1>
          <div className="meta-info-light">
            <span>
              by <Link to={`/user?id=${post.by}`}>{post.by}</Link>
            </span>
            <span>
              on <b>{post.time}</b>
            </span>
            <span>
              with <b>{post.descendants}</b> comments
            </span>
          </div>
          <p></p>
        </>
      )
    }
  }
}

PostPage.propTypes = {}

export default PostPage
