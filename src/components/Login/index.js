import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    displayerror: false,
    errorMessage: "Username and Password didn't match",
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const Token = data.jwt_token
      Cookies.set('jwt_token', Token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      console.log(response.error_msg)
      this.setState({displayerror: true})
    }
  }

  render() {
    const {username, password, displayerror, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="page-background">
        <div className="form-container">
          <img
            className="website-Logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.submitLoginForm}>
            <label htmlFor="usernameEl" className="label">
              USERNAME
            </label>
            <input
              id="usernameEl"
              type="text"
              placeholder="Username"
              className="form-input-El"
              onChange={this.updateUsername}
              value={username}
            />
            <label htmlFor="passwordEl" className="label">
              PASSWORD
            </label>
            <input
              id="passwordEl"
              type="password"
              placeholder="Password"
              className="form-input-El"
              onChange={this.updatePassword}
              value={password}
            />

            <button type="submit" className="login-submit-button">
              login
            </button>
            {displayerror ? (
              <p className="error-message">*{errorMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
