import {
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {lastWeekVaccinationData} = props

  const DataFormatter = value => {
    if (value > 1000) {
      return `${(value / 1000).toString()}k`
    }
    return value.toString()
  }

  return (
    <ResponsiveContainer width={1000} height={500}>
      <BarChart data={lastWeekVaccinationData} margin={{top: 5}}>
        <XAxis dataKey="vaccineDate" tick={{stroke: 'gray', strokeWidth: 1}} />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          barSize="20%"
          fill="#5a8dee"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          barSize="20%"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
