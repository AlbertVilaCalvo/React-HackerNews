import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom'
import New from './components/New'
import Top from './components/Top'
import User from './components/User'
import PostPage from './components/PostPage'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="row space-between">
            <ul className="row nav">
              <li>
                <NavLink
                  to="/"
                  exact
                  activeClassName="active"
                  className="nav-link"
                >
                  Top
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/new"
                  activeClassName="active"
                  className="nav-link"
                >
                  New
                </NavLink>
              </li>
            </ul>
          </nav>
          <main>
            <Switch>
              <Route path="/new" component={New} />
              {/* Important: if we do:
                 <Route path="/user">
                   <User />
                 </Route>
                 Then we don't get the props history, location and match in User.
                 We instead need to do <Route component={User} />
               */}
              {/* /user?id=userId */}
              <Route path="/user" component={User} />
              {/* /post?id=postId */}
              <Route path="/post" component={PostPage} />
              <Route path="/" component={Top} />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
