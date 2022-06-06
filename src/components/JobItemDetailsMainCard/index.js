import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItemDetailsMainCard = props => {
  const {jobData} = props

  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,

    jobDescription,
    skills,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  const formattedSkills = skills.map(eachskill => ({
    imageUrl: eachskill.image_url,
    name: eachskill.name,
  }))

  const formattedLifeAtCompany = {
    description: lifeAtCompany.description,
    imageUrl: lifeAtCompany.image_url,
  }

  return (
    <div className="jobdetails-container backgroundcolor">
      <div className="title-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
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
      <div className="locationandotherdetails">
        <div className="locationandetype">
          <GoLocation className="alllogos" />
          <p className="locationandtype">{location}</p>
          <BsFillBriefcaseFill className="alllogos" />
          <p className="locationandtype">{employmentType}</p>
        </div>
        <p className="salary">{packagePerAnnum}</p>
      </div>
      <hr className="hrline" />
      <div>
        <h1 className="descriptiontitle">Description</h1>
        <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
          Visit
        </a>
      </div>
      <p className="description">{jobDescription}</p>
      <h1>Skills</h1>
      <ul className="SkillsList-container">
        {formattedSkills.map(eachItem => (
          <li key={eachItem.name} className="skillItem">
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="skilllogo"
            />
            <p>{eachItem.name}</p>
          </li>
        ))}
      </ul>
      <h1>Life at Company</h1>
      <div className="lifeatcompany">
        <p className="lifeatcompany-text">
          {formattedLifeAtCompany.description}
        </p>
        <img
          src={formattedLifeAtCompany.imageUrl}
          alt="life at company"
          className="lifeatcompany-image"
        />
      </div>
    </div>
  )
}
export default JobItemDetailsMainCard
