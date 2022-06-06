import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="homepage">
    <Header />
    <div className="homepage-background">
      <h1 className="homepage-heading">Find The Job That Fits Your Life</h1>
      <p className="homepage-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="findjobs-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
