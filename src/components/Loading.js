import { Component } from 'react'
import PropTypes from 'prop-types'

const style = {
  fontSize: '35px',
  position: 'absolute',
  left: '0',
  right: '0',
  marginTop: '20px',
  textAlign: 'center',
}

class Loading extends Component {
  state = {
    text: this.props.text,
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState(({ text }) => {
        if (text.includes('...')) {
          return {
            text: text.replace('...', ''),
          }
        } else {
          return {
            text: text + '.',
          }
        }
      })
    }, 300)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return <p style={style}>{this.state.text}</p>
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
}

Loading.defaultProps = {
  text: 'Loading',
}

export default Loading
