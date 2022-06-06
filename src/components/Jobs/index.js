import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import {Redirect} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import JobItem from '../JobItem'

import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    isLoading: true,
    jobsData: [],
    selectedEmploymentTypes: [],
    selectedSalaryRange: salaryRangesList[0].salaryRangeId,
    searchedword: '',
  }

  componentDidMount() {
    console.log(2)
    this.getjobsData()
  }

  searchfortheword = () => {
    this.getjobsData()
  }

  getjobsData = async () => {
    this.setState({isLoading: true})
    const token = Cookies.get('jwt_token')
    const {
      selectedEmploymentTypes,
      selectedSalaryRange,
      searchedword,
    } = this.state

    const employmentTypesSelected = selectedEmploymentTypes.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesSelected}&minimum_package=${selectedSalaryRange}&search=${searchedword}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const jobsdata = data.jobs
      this.jobsdatareceivedSuccess(jobsdata)
    } else {
      console.log(response.error_msg)
    }
  }

  jobsdatareceivedSuccess = jobsData => {
    const formattedjobs = jobsData.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))

    this.setState({isLoading: false, jobsData: formattedjobs})
  }

  displayjobResults = () => {
    console.log(1)
    const {jobsData} = this.state
    return (
      <ul className="jobsList-container">
        {jobsData.map(eachJob => (
          <JobItem key={eachJob.id} details={eachJob} />
        ))}
      </ul>
    )
  }

  displayLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  updatesearch = event => {
    this.setState({searchedword: event.target.value})
  }

  updateEmploymentType = event => {
    if (event.target.checked === true) {
      const {selectedEmploymentTypes} = this.state
      const newList = [...selectedEmploymentTypes, event.target.value]
      this.setState({selectedEmploymentTypes: newList}, this.getjobsData)
    } else {
      const {selectedEmploymentTypes} = this.state
      const newList = selectedEmploymentTypes.filter(
        eachitem => eachitem !== event.target.value,
      )
      this.setState({selectedEmploymentTypes: newList}, this.getjobsData)
    }
  }

  updateSalary = event => {
    this.setState(
      {
        selectedSalaryRange: event.target.value,
      },
      this.getjobsData,
    )
  }

  FilterGroup = () => {
    const {isLoading, searchedword} = this.state
    return (
      <div className="filtergroup">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            className="searchEl"
            onChange={this.updatesearch}
            value={searchedword}
          />
          <button
            className="searchicon-button"
            type="button"
            onClick={this.searchfortheword}
          >
            <BsSearch className="searchicon" />
          </button>
        </div>
        <Profile />
        <hr className="hrline" />
        <h1 className="filters-heading">Type of Employment</h1>
        <ul className="filteroptoins-container">
          {employmentTypesList.map(eachItem => (
            <li
              key={eachItem.employmentTypeId}
              className="employmentoptions-filter"
            >
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                value={eachItem.employmentTypeId}
                onChange={this.updateEmploymentType}
              />
              <label htmlFor={eachItem.employmentTypeId}>
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="hrline" />
        <h1 className="filters-heading">Salary Range</h1>
        <ul className="filteroptoins-container">
          {salaryRangesList.map(eachItem => (
            <li
              key={eachItem.salaryRangeId}
              className="employmentoptions-filter"
            >
              <input
                type="radio"
                id={eachItem.salaryRangeId}
                value={eachItem.salaryRangeId}
                name="salaryrange"
                onChange={this.updateSalary}
              />
              <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  displaythejobspage = () => {
    const {isLoading, searchedword} = this.state

    return (
      <div>
        <div className="jobresults">
          {isLoading ? this.displayLoadingView() : this.displayjobResults()}
        </div>
        <div className="jobresultslarge">
          <div className="search-container-large">
            <input
              type="search"
              placeholder="Search"
              className="searchEl"
              onChange={this.updatesearch}
              value={searchedword}
            />
            <button
              className="searchicon-button"
              type="button"
              onClick={this.searchfortheword}
            >
              <BsSearch className="searchicon" />
            </button>
          </div>
          {isLoading ? this.displayLoadingView() : this.displayjobResults()}
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        <div className="jobspage-container">
          {this.FilterGroup()}
          {this.displaythejobspage()}
        </div>
      </div>
    )
  }
}

export default Jobs
