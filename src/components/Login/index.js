import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: ''}

  onSubmitOfForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/ebank/login'

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      const jwtToken = data.jwt_token

      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  onChangeOfUser = event => {
    this.setState({userId: event.target.value})
  }

  onChangeOfPassword = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userId, pin, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="web-image"
            alt="website login"
          />
          <form className="form-el" onSubmit={this.onSubmitOfForm}>
            <h1 className="login-heading">Welcome Back</h1>
            <label htmlFor="user-id" className="user-id-label">
              User ID
            </label>
            <input
              placeholder="Enter User ID"
              type="text"
              id="user-id"
              value={userId}
              onChange={this.onChangeOfUser}
              className="user-input-el"
            />
            <label htmlFor="user-pin" className="user-pin-label">
              PIN
            </label>
            <input
              placeholder="Enter PIN"
              type="password"
              id="user-pin"
              value={pin}
              onChange={this.onChangeOfPassword}
              className="user-pin-input-el"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
