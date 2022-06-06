import {withRouter, Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const logoutClicked = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          className="websitelogonavbar"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div>
        <Link to="/">
          <button type="button" className="menu-buttons">
            Home
          </button>
        </Link>
        <Link to="/jobs">
          <button type="button" className="menu-buttons">
            Jobs
          </button>
        </Link>
      </div>
      <div>
        <Link to="/">
          <button className="homeLogo-button" type="button">
            <AiFillHome className="menuicons" />
          </button>
        </Link>
        <Link to="/jobs">
          <button className="homeLogo-button" type="button">
            <BsFillBriefcaseFill className="menuicons" />
          </button>
        </Link>

        <button type="button" className="logout-button" onClick={logoutClicked}>
          Logout
        </button>
        <button
          className="homeLogo-button"
          type="button"
          onClick={logoutClicked}
        >
          <FiLogOut className="menuicons" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
