import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        lastWeekVaccinationData: fetchedData.last_7_days_vaccination.map(
          eachDay => ({
            vaccineDate: eachDay.vaccine_date,
            dose1: eachDay.dose_1,
            dose2: eachDay.dose_2,
          }),
        ),
        vaccinationByAgeData: fetchedData.vaccination_by_age.map(eachRange => ({
          age: eachRange.age,
          count: eachRange.count,
        })),
        vaccinationByGenderData: fetchedData.vaccination_by_gender.map(
          eachType => ({
            gender: eachType.gender,
            count: eachType.count,
          }),
        ),
      }
      this.setState({
        vaccinationDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {vaccinationDetails} = this.state
    console.log(vaccinationDetails)
    const {
      lastWeekVaccinationData,
      vaccinationByAgeData,
      vaccinationByGenderData,
    } = vaccinationDetails

    return (
      <>
        <VaccinationCoverage
          lastWeekVaccinationData={lastWeekVaccinationData}
        />
        <VaccinationByGender
          vaccinationByGenderData={vaccinationByGenderData}
        />
        <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-view-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderVaccinationDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-responsive-container">
          <div className="logo-container">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.renderVaccinationDetailsView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
