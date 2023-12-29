import {Button} from '@/components/ui/button'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}) => (
  <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Username">user name</label>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="Password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button id="login-button" data-testid="logout-button" type="submit">
        login
      </Button>
    </form>
  </div>
)

export default LoginForm
