import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.message, visible: true }
    case 'HIDE':
      return { message: '', visible: false }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: 'bob',
    visible: false,
  })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [visibility, _] = useContext(NotificationContext) //first element is state, second is dispatch
  return visibility
}

export const useNotificationDispatch = () => {
  const [_, dispatchFunction] = useContext(NotificationContext)
  return dispatchFunction
}

export default NotificationContext
