import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {lastWeekVaccinationData} = props

  const DataFormatter = value => {
    if (value > 1000) {
      return `${(value / 1000).toString()}k`
    }
    return value.toString()
  }

  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="vaccination-by-coverage-heading">Vaccination Coverage</h1>
      <BarChart
        data={lastWeekVaccinationData}
        width={900}
        height={400}
        margin={{top: 5}}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
            fontSize: 14,
            fontFamily: 'Roboto',
            textAlign: 'center',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          barSize="20%"
          fill="#5a8dee"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          barSize="20%"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
