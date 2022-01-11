import HighchartsReact from "highcharts-react-official"
import Highchart from "highcharts"
import { useEffect, useState, memo } from "react"
import moment from "moment"
import { ButtonGroup, Button } from "@material-ui/core"

const convertOptions = data => {
    const categories = data.map(item => moment(item.Date).format("DD/MM/YY"))
    return {
        title: {
            text: 'Tổng số ca nhiễm'
        },
        chart: {
            height: 500,
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        color: ['#f3585b'],
        tooltip: {
            headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
            pointFormat:
                `<tr>
                <td style="color: {series.color}; padding: 0">{series.name}</td>
                <td style="padding: 0"><b>{point.y} ca</b></td>
            </tr>`,
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            }
        },
        series: [
            {
                name: "Tổng ca nhiễm",
                data: data.map(item => item.Confirmed)
            }
        ]
    }
}

function LineChart({ data }) {
    const [options, setOptions] = useState([])
    const [reportType, setReportType] = useState("all")

    useEffect(() => {
        // change report style
        let customData = []

        switch (reportType) {
            case "all":
                customData = data
                break
            case "30":
                customData = data.slice(data.length - 30)
                break
            case "7":
                customData = data.slice(data.length - 7)
                break
            default:
                customData = data
        }

        setOptions(convertOptions(customData))
    }, [data, reportType])

    return (
        <div>
            <ButtonGroup size="small" style={{ display: "flex", justifyContent: "flex-end", marginTop: 10, marginBottom: 10 }}>
                <Button
                    color={reportType === "all" ? "secondary" : ""}
                    onClick={() => setReportType("all")}
                >
                    Tất cả
                </Button>
                <Button
                    color={reportType === "30" ? "secondary" : ""}
                    onClick={() => setReportType("30")}
                >
                    30 ngày
                </Button>
                <Button
                    color={reportType === "7" ? "secondary" : ""}
                    onClick={() => setReportType("7")}
                >
                    7 ngày
                </Button>
            </ButtonGroup>
            <HighchartsReact
                highcharts={Highchart}
                options={options}
            />
        </div >
    )
}

export default memo(LineChart)