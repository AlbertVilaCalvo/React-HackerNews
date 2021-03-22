import { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom'
import NewPostsPage from './pages/NewPostsPage'
import TopPostsPage from './pages/TopPostsPage'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import ThemeContext from './contexts/ThemeContext'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Router>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <div className="container">
            <nav className="row space-between">
              <ul className="row nav">
                <li>
                  <NavLink
                    to="/"
                    exact
                    activeClassName="active"
                    activeStyle={{ color: 'rgb(187, 46, 31)' }}
                    className="nav-link"
                  >
                    Top
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/new"
                    activeClassName="active"
                    activeStyle={{ color: 'rgb(187, 46, 31)' }}
                    className="nav-link"
                  >
                    New
                  </NavLink>
                </li>
              </ul>
              <button
                className="btn-clear"
                style={{ fontSize: '30px' }}
                onClick={toggleTheme}
              >
                {theme === 'light' ? '🔦' : '💡'}
              </button>
            </nav>
            <main>
              <Switch>
                <Route path="/new" component={NewPostsPage} />
                {/* Important: if we do:
                  <Route path="/user">
                    <User />
                  </Route>
                  Then we don't get the props history, location and match in User.
                  We instead need to do <Route component={User} />
                */}
                {/* /user?id=userId */}
                <Route path="/user" component={UserPage} />
                {/* /post?id=postId */}
                <Route path="/post" component={PostPage} />
                <Route path="/" component={TopPostsPage} />
              </Switch>
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
