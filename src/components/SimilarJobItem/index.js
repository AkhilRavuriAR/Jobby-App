import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

const SimilarJobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,

    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="similarjobLink">
      <li className=" screensize">
        <div className="title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="companylogo"
          />
          <div className="titleandrating">
            <h1 className="jobtitle">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="starlogo" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <h1 className="descriptiontitle">Description</h1>
        <p className="description">{jobDescription}</p>
        <div className="locationandotherdetails">
          <div className="locationandetype">
            <GoLocation className="alllogos" />
            <p className="locationandtype">{location}</p>
            <BsFillBriefcaseFill className="alllogos" />
            <p className="locationandtype">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobItem
