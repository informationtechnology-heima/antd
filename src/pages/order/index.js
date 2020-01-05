import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva';
import PopConfirm from '../../component/popconfirm'
const namespace = "serviceOrder";
@connect(state => {
    let page = {
        showTotal: () => "共" + state[namespace].page.count + "条",
        pageSize: 10,
        total: state[namespace].page.count,
    }  
    return {
        data: state[namespace].page.data,
        page: page,
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
        }
    }
})
export default class Order extends React.Component {
    constructor() {
        super();
        this.columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
            },
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
                            已确认
                        </span>
                    } else if (status == 2000) {
                        ret = <span>
                            已完成
                        </span>
                    } else if (status == 3000) {
                        ret = <span>
                            已取消
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
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (
                        <PopConfirm pop={this.state.pop} data={text.serveId}>

                        </PopConfirm>
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
            }
        }
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
    render = () => { 
        let page = this.props.page;
        page["onChange"] = this.nextPage
        page["current"] = this.state.page.index;
        return (
            <div>
                <CustomTable columns={this.columns} data={this.props.data} page={page}></CustomTable>
            </div>

        )
    }
}