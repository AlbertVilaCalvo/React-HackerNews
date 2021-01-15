import PropTypes from 'prop-types'

const ErrorMessage = (props) => {
  return <p className="error">{props.text}</p>
}

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
}

ErrorMessage.defaultProps = {
  text: 'An error occurred',
}

export default ErrorMessage
