import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva';
import { Divider } from 'antd';
const namespace = "serviceOrder";
@connect(state => {
    console.log(state[namespace].page.data);

    return {
        data: state[namespace].page.data,
        count: state[namespace].page.count
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
                        ret= <span>
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
                render: (text, record) => (
                    <span>
                        <a>派单</a>
                        <Divider type="vertical" />
                        <a>已完成</a>
                    </span>
                ),
            },
        ];
    }

    componentDidMount = () => {
        this.props.queryServiceOrderList({
            index: 1,
            size: 10,
        })
    }
    render = () => {
        return (
            <CustomTable columns={this.columns} data={this.props.data} />
        )
    }
}