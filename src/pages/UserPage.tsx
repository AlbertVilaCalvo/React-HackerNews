import { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { fetchUser } from '../utils/api'
import UserPosts from '../components/UserPosts'
import { formatDate } from '../utils/helpers'
import ThemeContext from '../contexts/ThemeContext'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { User } from '../models/User'

function UserPage({ location }: { location: { search: string } }) {
  const userId = new URLSearchParams(location.search).get('id') as string
  const [state, setState] = useState<{
    error: Error | null
    user: User | null
  }>({
    error: null,
    user: null,
  })

  useEffect(() => {
    console.log('User componentDidMount userId', userId)
    fetchUser(userId)
      .then((user) => {
        console.log('user', userId, user)
        setState({ user, error: null })
      })
      .catch((error) => {
        console.error('User', error)
        setState({ user: null, error })
      })
  }, [userId])

  const { error, user } = state
  const theme = useContext(ThemeContext)

  if (error !== null) {
    return <ErrorMessage />
  }

  if (user === null) {
    return <Loading text="Fetching UserPage" />
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

UserPage.propTypes = {}

export default UserPage
