import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import JobItemDetailsMainCard from '../JobItemDetailsMainCard'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

class JobItemDetails extends Component {
  state = {isLoading: true, jobsData: {}, similarJobs: []}

  componentDidMount() {
    this.getjobDetails()
  }

  getjobDetails = async () => {
    this.setState({isLoading: true})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobsData = data.similar_jobs

      const formattedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }

      const formattedSimilarJobsData = similarJobsData.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        isLoading: false,
        jobsData: formattedData,
        similarJobs: formattedSimilarJobsData,
      })
    }
  }

  displayjobResults = () => {
    const {jobsData, similarJobs} = this.state

    return (
      <div className="jobdetailscontainer">
        <JobItemDetailsMainCard jobData={jobsData} />
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similarjobs-container">
          {similarJobs.map(eachItem => (
            <SimilarJobItem key={eachItem.id} details={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  displayLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  displayResults = () => {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        <div className="jobspage-container">
          {isLoading ? this.displayLoadingView() : this.displayjobResults()}
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.displayResults()}</div>
  }
}

export default JobItemDetails
