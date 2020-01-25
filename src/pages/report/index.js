import React from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import { connect } from 'dva'
HighchartsMore(Highcharts)
const namespace = "report"
@connect(state => { 
    return {
        employeeServiceData:state[namespace].employeeServiceData
    }
}, disp => {
    return {
        employeeServiceNumber: (callback) => {
            disp({
                type: namespace + "/employeeServiceNumber",
                payLoad:{
                    callback:callback,
                }
            })
        }
    }
})
export default class Report extends React.Component {

    render = () => {
        return (
            <React.Fragment>
                <div id="employeeServiceNumber">
                </div>
            </React.Fragment>
        )
    }
    report = () => {
        Highcharts.chart('employeeServiceNumber', {
            chart: {
                type: 'column'
            },
            title: {
                text: '员工服务已完成统计'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '服务次数统计'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
            },
            series: [{
                colorByPoint: true,
                data: this.props.employeeServiceData.employeeServiceNumber
            }],
            
        });
    }
    componentDidMount = () => {
        this.props.employeeServiceNumber(() => {this.report()})
    }
}