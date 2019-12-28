import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva'
import { Divider, Row, Col, Input } from 'antd';
import DialogBox from '../../component/dialogbox'
const namespace = "goods";
@connect((state) => {
    return (
        {
            data: state[namespace].data,
        }
    )
}, disp => {
    return {
        queryGoodsInfoList: () => {
            disp({
                type: namespace + "/queryGoodsInfoList",
            })
        }
    }
})
export default class Goods extends React.Component {

    constructor() {
        
        super();
        this.state = {
            box: {
                name: "更新",
                visible: false,
                handleOk: () => { },
                handleCancel: () => { },
            },
            goods: {}
        };
        this.columns = [
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
                render: (text, record) =>
                    (
                        <span>
                            {/* 切记 static里面不能使用this */}
                            <a onClick={this.updata.bind(this, record)}>更新</a>
                            <Divider type="vertical" />
                            <a onClick={this.deleteGoods.bind(this, record)}>删除</a>
                        </span>
                    )
                ,
            },
        ];
    };
    handleChange = (attr, event) => {
        console.log(attr)
        console.log(event.target.value)
        let goods = this.state.goods;
        goods[attr]=event.target.value;
        this.setState({
            ...this.state,
            goods: goods,
        });         
    }
    updata = (text) => {
        this.setState({
            ...this.state,
            box: {
                name: "更新",
                visible: true,
                handleOk: this.handleOk,
                handleCancel: this.handleCancel,
            },
            goods: text,
        });           
    };
    handleOk = () => {
        this.setState({
            ...this.state,
            box: {
                name: "更新",
                visible: false,
                handleOk: () => { },
                handleCancel: () => { },
            }
        });
    };
    handleCancel = () => {
        this.setState({
            ...this.state,
            box: {
                name: "更新",
                visible: false,
                handleOk: () => { },
                handleCancel: () => { },
            }
        });
    };
    deleteGoods = () => {
        console.log("删除触发了");
    };
    createGoods = () => {
        this.setState({
            ...this.state,
            box: {
                name: "创建",
                visible: true,
                handleOk: () => { },
                handleCancel: () => { },
            }
        })
    };

    componentDidMount = () => {
        this.props.queryGoodsInfoList();
    };
    render = () => {

        let goods = this.state.goods;
        let content = (
            <div>
                < Row gutter={[16, 16]} >
                    <Col span={8}>套餐名称</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsName} onChange={this.handleChange.bind(this, "goodsName")} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col span={8}>次数</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsFreq} onChange={this.handleChange.bind(this, "goodsFreq")}/>
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col span={8}>有效期</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsExpreDate} onChange={this.handleChange.bind(this, "goodsExpreDate")}/>
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col span={8}>使用范围</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsAdvise} onChange={this.handleChange.bind(this, "goodsAdvise")}/>
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col span={8}>套餐价格</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsPrice} onChange={this.handleChange.bind(this, "goodsPrice")}/>
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col span={8}>折后价</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsDiscountPrice} onChange={this.handleChange.bind(this, "goodsDiscountPrice")}/>
                    </Col>
                </Row >
            </div>
        )
        return (
            <div>
                <CustomTable columns={this.columns} data={this.props.data} />
                <DialogBox property={this.state.box} content = {content}></DialogBox>
            </div>
        )
    };
    componentWillUpdate = (nextProps, nextState)  => {
        console.log("变化前",nextProps);
        console.log("变化后",nextState);
    }

}