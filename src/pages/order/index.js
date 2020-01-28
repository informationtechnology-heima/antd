import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva';
import PopConfirm from '../../component/popconfirm'
import { Tag, Divider, Radio, Card} from 'antd';
import DialogBox from '../../component/dialogbox'
const namespace = "serviceOrder";
const employee = "employee";
@connect(state => {
    let page = {
        showTotal: () => "共" + state[namespace].page.count + "条",
        pageSize: 10,
        total: state[namespace].page.count,
    }
    let employees = state[employee].employees;
    return {
        data: state[namespace].page.data,
        page: page,
        employees: employees,
    }
}, dispcher => {
    return {
        queryServiceOrderList: (page) => {
            dispcher(
                {
                    type: namespace + "/queryServiceOrderList",
                    payLoad: {
                        page: page
                    }
                }
            )
        },
        onComplete: (serveId, callback, page) => {
            dispcher({
                type: namespace + "/onComplete",
                payLoad: {
                    serveId: serveId,
                    callback: callback,
                    page: page,
                }
            })
        },
        queryUserList: () => {
            dispcher({
                type: employee + "/queryUserList",
            })
        },
        allot: (allotParam, callback) => {
            dispcher({
                type:namespace + "/allot",
                payLoad:{
                    allotParam:allotParam,
                    callback:callback,
                }
            })
        }
    }
})
export default class Order extends React.Component {
    constructor() {
        super();
        this.columns = [
            {
                title: '套餐名称',
                dataIndex: 'goodsName',
                key: 'goodsName',
            },
            {
                title: '预约单状态',
                dataIndex: 'serveStatus',
                key: 'serveStatus',
                render: (status) => {
                    let ret = (<span>
                        已确认
                    </span>)
                    if (status == 1000) {
                        ret = <span>
                            <Tag color={"volcano"} key={"待服务"}>
                                待服务
                            </Tag>
                        </span>
                    } else if (status == 2000) {
                        ret = <span>
                            <Tag color={"green"} key={"已完成"}>
                                已完成
                            </Tag>
                        </span>
                    } else if (status == 3000) {
                        ret = <span>
                            <Tag color={"geekblue"} key={"已取消"}>
                                已取消
                            </Tag>
                        </span>
                    }
                    return ret;
                }
            },
            {
                title: '联系人',
                dataIndex: 'concatName',
                key: 'concatName',
            },
            {
                title: '电话',
                dataIndex: 'concatIphone',
                key: 'concatIphone',
            },
            {
                title: '预约时间',
                dataIndex: 'serveStartTime',
                key: 'serveStartTime',
            },
            {
                title: '预约单服务地址',
                dataIndex: 'concatAddress',
                key: 'concatAddress',
            },
            {
                title: '服务员',
                dataIndex: 'serviceUser',
                key: 'serviceUser',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {

                    let a = <a onClick={this.sendOrder.bind(this, text.serviceId)}>{text.serviceUser == null ? "派单":"更新派单"}</a>
                    if(record.serveStatus == 2000){
                        a = "";
                    };
                    return (
                        <React.Fragment>
                            {a}
                            <Divider type="vertical" />
                            <PopConfirm pop={this.state.pop} data={text.serviceId}>
                            </PopConfirm>
                        </React.Fragment>
                    )
                },
            },
        ];
        this.state = {
            pop: {
                message: "确认完成?",
                operation: "是否完成",
                confirm: this.onComplete,
                cancel: () => { },
            },
            page: {
                index: 1,
                size: 10,
            },
            box: {
                name: "请选择员工",
                visible: false,
                handleOk: this.handleOk,
                handleCancel: this.handleCancel,
            },
            // 派单数据
            allotParam:{
                ubdId:0,
                serviceId:0,
            }
        }
    }
    sendOrder = (serviceId, event) => {
        this.props.queryUserList();
        // 查询所有员工列表
        this.setState({
            allotParam:{
                ...this.state.radio,
                serviceId:serviceId,
            },
            box: {
                ...this.state.box,
                visible: true,
            },
        })
    };
    handleOk = () => {
        // 更新完成后，进行回调
        this.props.allot(this.state.allotParam, () => this.props.queryServiceOrderList(this.state.page));
        this.setState({
            box: {
                ...this.state.box,
                visible: false,
            },
        })
    }
    handleCancel = () => {
        this.setState({
            box: {
                ...this.state.box,
                visible: false,
            },
        })
    }

    onComplete = (id) => {
        this.props.onComplete(id, this.props.queryServiceOrderList, this.state.page);
    }
    componentDidMount = () => {
        this.props.queryServiceOrderList(this.state.page)
    }
    nextPage = (current) => {
        let page = this.state.page;
        page["index"] = current;
        this.props.queryServiceOrderList(this.state.page)
        this.setState({
            page: {
                ...this.state.page,
                index: current,
            }
        })
    }
    onRadio = (e) => {
        this.setState({
            allotParam:{
                ...this.state.allotParam,
                ubdId:e.target.value,
            }
          });
    }
    render = () => {
        let page = this.props.page;
        page["onChange"] = this.nextPage
        page["current"] = this.state.page.index;
        const radioStyle = {
            height: '30px',
            lineHeight: '30px',
          };
        let employees = this.props.employees.map((iter, index) => {
            return (
                <Radio key={iter.ubdId} value={iter.ubdId} style={radioStyle}>
                    {iter.ubdPoliceName}
                </Radio>
            )
        }) 
    let content = <Radio.Group onChange={this.onRadio} value={this.state.allotParam.ubdId}>{employees}</Radio.Group>
        return (
            <Card title="服务单管理">
                <CustomTable columns={this.columns} data={this.props.data} page={page}></CustomTable>
                <DialogBox box={this.state.box} content={content}></DialogBox>
            </Card>

        )
    }
}