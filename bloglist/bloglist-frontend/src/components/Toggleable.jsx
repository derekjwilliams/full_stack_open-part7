import {useState, useImperativeHandle, forwardRef} from 'react'
import PropTypes from 'prop-types'
import {Button} from '@/components/ui/button'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="secondary"
          className="toggle-on"
          data-testid="toggle-on-button"
          onClick={toggleVisibility}
        >
          new blog
          {/* {props.buttonLabel} */}
        </Button>

        {/* <button className="toggle-on" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button> */}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="secondary"
          className="toggle-off"
          data-testid="toggle-off-button"
          onClick={toggleVisibility}
        >
          cancel
        </Button>

        {/* <button className="toggle-off" onClick={toggleVisibility}>
          cancel
        </button> */}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable' // required for eslint, since component is in a forwardRef

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
