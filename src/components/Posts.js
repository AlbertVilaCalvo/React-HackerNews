import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import PostList from './PostList'

class Posts extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    console.log('Posts componentDidMount - type:', this.props.type)
    fetchMainPosts(this.props.type).then((posts) => {
      console.log(posts)
      this.setState({ posts })
    })
  }

  render() {
    console.log('Posts render - type:', this.props.type)
    const { posts } = this.state
    if (posts.length === 0) {
      console.log('Posts render - posts.length === 0')
      return <p>Loading</p>
    } else {
      console.log('Posts render - state.posts[0].title:', posts[0].title)
      return <PostList posts={posts} />
    }
  }
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new']).isRequired,
}

export default Posts
