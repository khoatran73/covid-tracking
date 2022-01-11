import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"
import CountUp from "react-countup"
const useStyles = makeStyles({
    wrapper: props => {
        if (props.type === "confirmed") return { borderLeft: "5px solid #c9302c" }
        if (props.type === "recovered") return { borderLeft: "5px solid #28a745" }
        if (props.type === "deaths") return { borderLeft: "5px solid #333" }
    },
    title: {
        fontSize: 18,
        marginBottom: 5
    },
    count: {
        fontSize: 18,
        fontWeight: "bold"
    }
})

function CardDetail({ title, count, type }) {
    const styles = useStyles({ type })
    return (
        <Card
            variant="outlined"
            className={styles.wrapper}
        >
            <CardContent>
                <Typography
                    className={styles.title}
                    component="p"
                    variant="body2"
                >
                    {title}
                </Typography>
                <Typography
                    className={styles.count}
                    component="span"
                    variant="body2"
                >
                    <CountUp end={count || 0} duration={2} separator=" "/>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardDetail
