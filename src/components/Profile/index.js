import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

class Profile extends Component {
  state = {
    isLoading: true,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({isLoading: true})
    const Token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const formatedProfile = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({isLoading: false, profileDetails: formatedProfile})
    } else {
      console.log(response.error_msg)
    }
  }

  displayProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profiledetails-container">
        <img src={profileImageUrl} alt="profilepic" />
        <p>{name}</p>
        <p>{shortBio}</p>
      </div>
    )
  }

  showLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="profile-bg">
        {isLoading ? this.showLoadingView() : this.displayProfileDetails()}
      </div>
    )
  }
}

export default Profile
