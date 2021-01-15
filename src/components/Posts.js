import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import PostList from './PostList'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

class Posts extends Component {
  state = {
    error: null,
    posts: null,
  }

  componentDidMount() {
    console.log('Posts componentDidMount - type:', this.props.type)
    fetchMainPosts(this.props.type)
      .then((posts) => {
        this.setState({ posts })
      })
      .catch((error) => {
        console.error('Posts', error)
        this.setState({ error })
      })
  }

  render() {
    const { error, posts } = this.state

    if (error !== null) {
      return <ErrorMessage />
    }

    if (posts === null) {
      return <Loading />
    }

    return <PostList posts={posts} />
  }
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new']).isRequired,
}

export default Posts
