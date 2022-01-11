import Detail from './components/Detail';
import Summary from './components/Summary';
import CountrySelector from './components/CountrySelector';
import { useState, useEffect } from 'react';
import { getCountries, getDetail } from "./API"
import moment from 'moment'
import "moment/locale/vi"
import { Container, Typography } from '@material-ui/core';
import "@fontsource/roboto"


moment.locale("vi")

function App() {
  const [countries, setCountries] = useState([])
  const [countrySlug, setCountrySlug] = useState("vn")
  const [report, setReport] = useState([])

  useEffect(() => {
    getCountries()
      .then(res => {
        const countryArray = res.data.sort((a, b) => a.Country.localeCompare(b.Country))

        setCountries(countryArray)
      })
  }, [])

  const handleChange = slug => {
    setCountrySlug(slug)
  }

  useEffect(() => {
    getDetail(countrySlug)
      .then(res => {
        res.data.pop()
        setReport(res.data)
      })
  }, [countrySlug])

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography component="h2" variant="h2">Số Liệu COVID 19</Typography>
      <Typography component="p">{moment().format("LLL")}</Typography>
      <CountrySelector
        value={countrySlug}
        countries={countries}
        onChange={handleChange}
      />
      <Detail
        report={report}
      />

      <Summary
        report={report}
        countrySlug={countrySlug}
      />
    </Container>
  );
}

export default App;
