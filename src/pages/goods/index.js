import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva'
import { Divider, Row, Col, Input, DatePicker } from 'antd';
import DialogBox from '../../component/dialogbox'
import PopConfirm from '../../component/popconfirm'
import moment from 'moment';
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
        },
        updateGoodsInfo: (goods, callback) => {
            disp({
                type: namespace + "/updateGoodsInfo",
                payLoad: {
                    goods: goods,
                    callback: callback,
                }
            })
        },
        deleteGoodsInfo: (data, callback) => {
            disp({
                type: namespace + "/deleteGoodsInfo",
                payLoad: {
                    data: data,
                    callback: callback,
                }
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
            goods: {},
            pop: {
                message: "确认删除?",
                operation: "删除",
                confirm: this.confirm,
                cancel: () => { },
            }
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
                            <a onClick={this.updata.bind(this, text)}>更新</a>
                            <Divider type="vertical" />
                            <PopConfirm pop={this.state.pop} data={text.goodsId}>
                            </PopConfirm>

                        </span>
                    )
                ,
            },
        ];
    };
    confirm = (data) => {
        this.props.deleteGoodsInfo(data, this.props.queryGoodsInfoList)
    }
    handleChange = (attr, event) => {
        let goods = this.state.goods;
        goods[attr] = event.target.value;
        this.setState({
            ...this.state,
            goods: goods,
        });
    }
    updata = (text) => {
        let json = JSON.stringify(text);
        let goods = JSON.parse(json);
        this.setState({
            ...this.state,
            box: {
                name: "更新",
                visible: true,
                handleOk: this.handleOk,
                handleCancel: this.handleCancel,
            },
            goods: goods,
        });
    };
    handleOk = () => {
        // 更新后端数据
        let ret = this.props.updateGoodsInfo(this.state.goods, this.props.queryGoodsInfoList);
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
                name: "编辑",
                visible: false,
                handleOk: () => { },
                handleCancel: () => { },
            }
        });
    };
    createGoods = () => {
        this.setState({
            ...this.state,
            box: {
                name: "新增",
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
        const dateFormat = 'YYYY-MM-DD';
        let content = (
            <div>
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight:"32px",
                        }
                    } span={8}>套餐名称</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsName} onChange={this.handleChange.bind(this, "goodsName")} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight:"32px",
                        }
                    }  span={8}>次数</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsFreq} onChange={this.handleChange.bind(this, "goodsFreq")} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight:"32px",
                        }
                    }  span={8}>有效期</Col>
                    <Col span={16} >
                    <DatePicker onChange={(date, dateString) => {
                        let goods = this.state.goods;
                        goods["goodsExpreDate"] = dateString;
                        this.setState({
                            ...this.state,
                            goods: goods,
                        });
                    }
                    } defaultValue={moment(goods.goodsExpreDate)} format={dateFormat}/>
                        
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight:"32px",
                        }
                    }  span={8}>使用范围</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsAdvise} onChange={this.handleChange.bind(this, "goodsAdvise")} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight:"32px",
                        }
                    }  span={8}>套餐价格</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsPrice} onChange={this.handleChange.bind(this, "goodsPrice")} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight:"32px",
                        }
                    }  span={8}>折后价</Col>
                    <Col span={16} >
                        <Input type="text" value={goods.goodsDiscountPrice} onChange={this.handleChange.bind(this, "goodsDiscountPrice")} />
                    </Col>
                </Row >
            </div>
        )
        return (
            <div>
                <CustomTable columns={this.columns} data={this.props.data} />
                <DialogBox property={this.state.box} content={content}></DialogBox>
            </div>
        )
    };
    componentWillUpdate = (nextProps, nextState) => {

    }

}