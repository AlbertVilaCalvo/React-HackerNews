import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchPosts } from '../utils/api'
import PostList from './PostList'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

class UserPosts extends Component {
  state = {
    error: null,
    posts: null,
  }

  componentDidMount() {
    console.log('UserPosts componentDidMount - postIds:', this.props.postIds)
    fetchPosts(this.props.postIds)
      .then((posts) => {
        console.log(posts)
        this.setState({ posts })
      })
      .catch((error) => {
        console.error('UserPosts', error)
        this.setState({ error })
      })
  }

  render() {
    const { error, posts } = this.state

    if (error !== null) {
      return <ErrorMessage />
    }

    if (posts === null) {
      return <Loading text="Fetching Posts" />
    }

    return <PostList posts={posts} />
  }
}

UserPosts.propTypes = {
  postIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default UserPosts
