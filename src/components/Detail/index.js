import { Grid } from "@material-ui/core"
import CardDetail from "./CardDetail"

function Detail({ report }) {
    const data = report[report.length - 1]

    const details = [
        {
            title: "Số ca nhiễm",
            count: data?.Confirmed || 0,
            type: "confirmed"
        },
        {
            title: "Số ca khỏi",
            count: data?.Recovered || 0,
            type: "recovered"
        },
        {
            title: "Số ca tử vong",
            count: data?.Deaths || 0,
            type: "deaths"
        }
    ]

    return (
        <Grid container spacing={3}>
            {
                details.map(detail =>
                    <Grid
                        item
                        sm={4}
                        xs={12}
                        key={detail.title}
                    >
                        <CardDetail
                            title={detail.title}
                            count={detail.count}
                            type={detail.type}
                        />
                    </Grid>
                )
            }

        </Grid>
    )
}

export default Detail