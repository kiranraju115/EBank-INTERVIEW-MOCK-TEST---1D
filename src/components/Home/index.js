import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/ebank/login')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-body">
      <nav className="home-header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="ebank-logo"
          alt="website logo"
        />
        <div>
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="home-card">
        <h1 className="ebank-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          className="ebank-image"
          alt=" digital card"
        />
      </div>
    </div>
  )
}

export default Home
