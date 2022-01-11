import React from 'react'
import Highchart from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsMap from 'highcharts/modules/map'
import { useEffect, useState, memo, useRef } from "react"
import cloneDeep from "lodash/cloneDeep"

highchartsMap(Highchart)

const initOptions = {
    title: {
        text: null
    },
    chart: {
        height: "500",
    },
    mapNavigation: {
        enabled: true,
    },

    colorAxis: {
        min: 0,
        stops: [
            [0.2, "#B1D0E0"],
            [0.4, "#6998AB"],
            [0.6, "#406882"],
            [0.8, "#1A374D"],
            [1, "#333"],
        ]
    },//['#f3585b'],
    legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "bottom",
    },
    series: [
        {
            mapData: {},
            name: "Dân số",
            joinBy: ["hc-key", "key"]
        }
    ]

}

function Map({ mapData }) {
    const [options, setOptions] = useState({})
    const chartRef = useRef()
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            const data = mapData.features.map((feature, index) => ({
                key: feature.properties["hc-key"],
                value: index,
            }))

            setOptions({
                ...initOptions,
                series: [
                    {
                        ...initOptions.series[0],
                        mapData: mapData,
                        data: data
                    }
                ]
            })

            if (!flag) setFlag(true)
        }
    }, [mapData, flag])

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            })
        }
    }, [mapData])

    if (!flag) return null

    return (
        <HighchartsReact
            highcharts={Highchart}
            options={cloneDeep(options)}
            constructorType="mapChart"
            ref={chartRef}
        />
    )
}

export default memo(Map)