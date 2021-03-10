import { useState, useEffect, CSSProperties } from 'react'
import PropTypes from 'prop-types'

const style = {
  fontSize: '35px',
  position: 'absolute',
  left: '0',
  right: '0',
  marginTop: '20px',
  textAlign: 'center',
} as CSSProperties

function Loading({ text = 'Loading' }) {
  const [content, setContent] = useState(text)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setContent((c) => {
        if (c.includes('...')) {
          return text
        } else {
          return c + '.'
        }
      })
    }, 300)
    return () => window.clearInterval(intervalId)
  }, [text])

  return <p style={style}>{content}</p>
}

Loading.propTypes = {
  text: PropTypes.string,
}

export default Loading
