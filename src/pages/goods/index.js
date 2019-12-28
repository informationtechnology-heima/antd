import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva'
import { Divider} from 'antd';
const namespace = "goods";
@connect((state) => {
    console.log("state", state);

    return (
        {
            data: state[namespace].data,
        }
    )
}, disp => {
    return {
            queryGoodsInfoList: () => {
                disp({
                    type:namespace + "/queryGoodsInfoList",
                })
            } 
    }
})
export default class Goods extends React.Component {

    componentDidMount = () => {
        this.props.queryGoodsInfoList();
    }
    render = () => {
        return (
            <CustomTable columns={Goods.columns} data={this.props.data}/>
        )
    }
    static columns = [
        {
            title: '主键',
            dataIndex: 'goodsId',
            key: 'goodsId',
        },
        {
            title: '套餐名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
        },
        {
            title: '次数',
            dataIndex: 'goodsFreq',
            key: 'goodsFreq',
        },
        {
            title: '有效期',
            dataIndex: 'goodsExpreDate',
            key: 'goodsExpreDate',
        },
        {
            title: '使用范围',
            dataIndex: 'goodsAdvise',
            key: 'goodsAdvise',
        },
        {
            title: '套餐价格',
            dataIndex: 'goodsPrice',
            key: 'goodsPrice',
        },
        {
            title: '折后价',
            dataIndex: 'goodsDiscountPrice',
            key: 'goodsDiscountPrice',
        },
        {
            title: '类型',
            dataIndex: 'goodsType',
            key: 'goodsType',
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