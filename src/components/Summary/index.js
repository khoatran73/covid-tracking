import { Grid } from "@mui/material"
import LineChart from "../Charts/LineChart"
import Map from "../Charts/Map"
import { useEffect, useState } from 'react'


function Summary({ report, countrySlug }) {
    const [mapData, setMapData] = useState({})

    useEffect(() => {
        if (countrySlug) {
            import(`@highcharts/map-collection/countries/${countrySlug}/${countrySlug}-all.geo.json`)
                .then(res => setMapData(res))
        }

    }, [countrySlug])

    return (
        <Grid container spacing={3}>
            <Grid
                item
                sm={8}
                xs={12}
            >
                <LineChart data={report} />
            </Grid>
            <Grid
                item
                sm={4}
                xs={12}
            >
                <Map mapData={mapData} />
            </Grid>

        </Grid>
    )
}

export default Summary