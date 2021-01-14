import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import PostList from './PostList'

class Top extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    fetchMainPosts('top').then((posts) => {
      console.log(posts)
      this.setState({ posts })
    })
  }

  render() {
    const { posts } = this.state
    return (
      <>
        <div>Top</div>
        {posts.length === 0 ? <p>Loading</p> : <PostList posts={posts} />}
      </>
    )
  }
}

Top.propTypes = {}

export default Top
