import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchUser } from '../utils/api'

class User extends Component {
  state = {
    user: null,
    userId: null,
  }

  componentDidMount() {
    console.log('User componentDidMount this.props', this.props)
    const userId = new URLSearchParams(this.props.location.search).get('id')
    console.log('User componentDidMount userId', userId)
    fetchUser().then((user) => {
      console.log('user', userId, user)
      this.setState({ user, userId })
    })
  }

  render() {
    const { user, userId } = this.state
    if (user === null) {
      return <p>Loading</p>
    } else {
      return (
        <>
          <h1 className="header">{userId}</h1>
          <div className="meta-info-light">
            <span>
              joined <b>{user.created}</b>
            </span>
            <span>
              has <b>{user.karma}</b> karma
            </span>
          </div>
        </>
      )
    }
  }
}

User.propTypes = {}

export default User
