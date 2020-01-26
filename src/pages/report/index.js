import React from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import { connect } from 'dva'
import { Card, Row, Col, Input, DatePicker, Button } from 'antd'
import moment from 'moment';
HighchartsMore(Highcharts)
const namespace = "report"
@connect(state => {
    return {
        employeeServiceData: state[namespace].employeeServiceData
    }
}, disp => {
    return {
        employeeServiceNumber: (time, callback) => {
            disp({
                type: namespace + "/employeeServiceNumber",
                payLoad: {
                    time: time,
                    callback: callback,
                }
            })
        }
    }
})
export default class Report extends React.Component {
    static monthFormat = 'YYYY-MM';
    constructor() {
        super()
        // 初始化时间
        let da = new Date();
        let yearStart = da.getFullYear()
        let yearEnd = da.getFullYear()
        let start = da.getMonth() + 1
        let end = da.getMonth() + 1
        if (start == 1) {
            start = 12
            yearStart = yearStart - 1
        }
        start = (start < 10) ? "-0" + start : "-" + start
        end = (end < 10) ? "-0" + end : "-" + end
        this.state = {
            monthReport: {
                startTime: yearStart + start + "-01",
                endTime: yearEnd + end + "-01"
            }
        }
    }

    statistics = () => {
        this.props.employeeServiceNumber({
            startTime: this.state.monthReport.startTime,
            endTime: this.state.monthReport.endTime
        }, () => { this.report() })
    }
    changeTime = (attr, date, dateString) => {
        this.setState({
            monthReport: {
                ...this.state.monthReport,
                [attr]: dateString
            }
        })
    }
    render = () => {

        return (
            <React.Fragment>
                <div style={{
                    paddingTop: "20px",
                }}>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                        </Col>
                        <Col span={6} >
                            开始时间：<DatePicker defaultValue={moment(this.state.monthReport.startTime, Report.monthFormat)}
                                onChange={this.changeTime.bind(this, "startTime")} />
                        </Col>
                        <Col span={6} >
                            结束时间：<DatePicker defaultValue={moment(this.state.monthReport.endTime, Report.monthFormat)}
                                onChange={this.changeTime.bind(this, "endTime")} />
                        </Col>
                        <Col span={6} >
                            <Button type="primary" icon="area-chart" onClick={this.statistics}>开始统计</Button>
                        </Col>
                    </Row>
                </div>
                <div style={{
                    padding: "20px",

                }}>
                    <Card style={{
                        width: "1200px",
                        margin: "10px",
                        display: "inline-block"
                    }}>
                        <div id="employeeServiceNumber">
                        </div>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
    report = () => {

        let da = new Date();
        let year = da.getFullYear()
        let month = da.getMonth() + 1
        if (month == 1) {
            year = year - 1
            month = 11
        }
        year = year + '年';

        month = month + 1 + '月';
        let dateTime = year + "-" + month
        Highcharts.chart('employeeServiceNumber', {
            chart: {
                type: 'column'
            },
            title: {
                text: '员工服务已完成统计图(' + this.state.monthReport.startTime + "至" + this.state.monthReport.endTime + ")"
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
        this.props.employeeServiceNumber({
            startTime: this.state.monthReport.startTime,
            endTime: this.state.monthReport.endTime
        }, () => { this.report() })
    }
}