import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchUser } from '../utils/api'
import UserPosts from './UserPosts'
import { formatDate } from '../utils/helpers'
import ThemeContext from '../contexts/ThemeContext'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

class User extends Component {
  state = {
    error: null,
    user: null,
  }

  componentDidMount() {
    const userId = new URLSearchParams(this.props.location.search).get('id')
    console.log('User componentDidMount userId', userId)
    fetchUser(userId)
      .then((user) => {
        console.log('user', userId, user)
        this.setState({ user })
      })
      .catch((error) => {
        console.error('User', error)
        this.setState({ error })
      })
  }

  render() {
    const { error, user } = this.state
    const theme = this.context

    if (error !== null) {
      return <ErrorMessage />
    }

    if (user === null) {
      return <Loading text="Fetching User" />
    }

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

User.contextType = ThemeContext

User.propTypes = {}

export default User
