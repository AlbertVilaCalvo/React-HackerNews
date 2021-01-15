import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchPosts } from '../utils/api'
import PostList from './PostList'

class UserPosts extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    console.log('UserPosts componentDidMount - postIds:', this.props.postIds)
    fetchPosts(this.props.postIds).then((posts) => {
      console.log(posts)
      this.setState({ posts })
    })
  }

  render() {
    console.log('UserPosts render - postIds:', this.props.postIds)
    const { posts } = this.state
    if (posts.length === 0) {
      console.log('UserPosts render - posts.length === 0')
      return <p>Fetching Posts</p>
    } else {
      console.log('UserPosts render - state.posts[0].title:', posts[0].title)
      return <PostList posts={posts} />
    }
  }
}

UserPosts.propTypes = {
  postIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default UserPosts
