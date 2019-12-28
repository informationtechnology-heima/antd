import React from 'react'
import CustomTable from '../../component/table'
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
                title: '订单状态',
                dataIndex: 'orderStatus',
                key: 'orderStatus',
            },
            {
                title: '购买人',
                dataIndex: 'orderCreateUser',
                key: 'orderCreateUser',
            },
            {
                title: '购买时间',
                dataIndex: 'orderCreateTime',
                key: 'orderCreateTime',
            },
            {
                title: '付款金额',
                dataIndex: 'orderAmount',
                key: 'orderAmount',
            },
            {
                title: '订单剩余次数',
                dataIndex: 'orderCount',
                key: 'orderCount',
            },
            {
                title: '订单服务地址',
                dataIndex: 'orderAddress',
                key: 'orderAddress',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>更新</a>
                        <Divider type="vertical" />
                        <a>删除</a>
                    </span>
                ),
            },
        ]; 
    }
    render = () => {
        return (
            <CustomTable columns={this.columns} />
        )
    }
}