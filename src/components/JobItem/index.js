import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobdetails-container">
        <div className="title-container">
          <img src={companyLogoUrl} alt="logo" className="companylogo" />
          <div className="titleandrating">
            <h1 className="jobtitle">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="starlogo" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="locationandotherdetails">
          <div className="locationandetype">
            <GoLocation className="alllogos" />
            <p className="locationandtype">{location}</p>
            <BsFillBriefcaseFill className="alllogos" />
            <p className="locationandtype">{employmentType}</p>
          </div>
          <h1 className="salary">{packagePerAnnum}</h1>
        </div>
        <hr className="hrline" />
        <p className="descriptiontitle">Description</p>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
