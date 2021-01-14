import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import New from './components/New'
import Top from './components/Top'

class App extends React.Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Top</Link>
            </li>
            <li>
              <Link to="/new">New</Link>
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
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
