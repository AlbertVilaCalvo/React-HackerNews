import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchUser } from '../utils/api'

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
    if (user === null) {
      return <p>Loading</p>
    } else {
      return (
        <>
          <h1 className="header">{user.id}</h1>
          <div className="meta-info-light">
            <span>
              joined <b>{user.created}</b>
            </span>
            <span>
              has <b>{user.karma}</b> karma
            </span>
          </div>
          <p>{user.about}</p>
        </>
      )
    }
  }
}

User.propTypes = {}

export default User
