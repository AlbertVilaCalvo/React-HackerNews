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
              <Route path="/new">
                <New />
              </Route>
              <Route path="/">
                <Top />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
