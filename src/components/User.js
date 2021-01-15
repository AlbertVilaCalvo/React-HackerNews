import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchUser } from '../utils/api'
import UserPosts from './UserPosts'
import { formatDate } from '../utils/helpers'
import ThemeContext from '../contexts/ThemeContext'
import Loading from './Loading'

class User extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    console.log('User componentDidMount this.props', this.props)
    const userId = new URLSearchParams(this.props.location.search).get('id')
    console.log('User componentDidMount userId', userId)
    fetchUser(userId).then((user) => {
      console.log('user', userId, user)
      this.setState({ user })
    })
  }

  render() {
    const { user } = this.state
    const theme = this.context

    if (user === null) {
      return <Loading text="Fetching User" />
    } else {
      return (
        <>
          <h1 className="header">{user.id}</h1>
          <div className={`meta-info-${theme}`}>
            <span>
              joined <b>{formatDate(user.created)}</b>
            </span>
            <span>
              has <b>{user.karma.toLocaleString()}</b> karma
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: user.about }} />
          <h2>Posts</h2>
          <UserPosts postIds={user.submitted} />
        </>
      )
    }
  }
}

User.contextType = ThemeContext

User.propTypes = {}

export default User
