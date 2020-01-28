import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva'
import { Divider, Row, Col, Input, DatePicker, Card, Button, Select } from 'antd';
const { Option } = Select;
import DialogBox from '../../component/dialogbox'
import PopConfirm from '../../component/popconfirm'
import moment from 'moment';
const namespace = "goods";
@connect((state) => {
    let page = {
        showTotal: () => "共" + state[namespace].page.count + "条",
        pageSize: 10,
        total: state[namespace].page.count,
    }
    return (
        {
            data: state[namespace].page.data,
            page: page
        }
    )
}, disp => {
    return {
        queryGoodsInfoList: (page) => {
            disp({
                type: namespace + "/queryGoodsInfoList",
                payLoad: {
                    page: page,
                }
            })
        },
        updateGoodsInfo: (updateGoods, callback, page) => {
            disp({
                type: namespace + "/updateGoodsInfo",
                payLoad: {
                    goods: updateGoods,
                    callback: callback,
                    page: page,
                }
            })
        },
        isDelGoodsInfo: (data, callback, page) => {
            disp({
                type: namespace + "/isDelGoodsInfo",
                payLoad: {
                    data: data,
                    callback: callback,
                    page: page,
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
                handleOk: this.handleOk,
                handleCancel: this.handleCancel,
            },
            updateGoods: {},
            pop: {
                message: "确认启用?",
                operation: "是否启用",
                confirm: this.confirm,
                cancel: () => { },
            },
            page: {
                index: 1,
                size: 10,
                goodsType: ""
            }
        };
        this.columns = [
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
                title: '是否启用',
                dataIndex: 'goodsIsDel',
                key: 'goodsIsDel',
                render: (goodsIsDel) => {
                    let ret = (<span>
                        未启用
                    </span>);
                    if (goodsIsDel == "1") {
                        ret = (
                            <span>
                                已启用
                        </span>);
                    }
                    return ret;
                }


            }, {
                title: '商品类型',
                dataIndex: 'goodsType',
                key: 'goodsType',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    let pop = this.state.pop;
                    let status = 0;
                    if (text.goodsIsDel == "1") {
                        pop["operation"] = "不启用";
                        pop["message"] = "确认不启用";
                        status = "0";
                    } else {
                        pop["operation"] = "启用";
                        pop["message"] = "确认启用";
                        status = "1";
                    }

                    return (
                        <span>
                            {/* 切记 static里面不能使用this */}
                            <a onClick={this.updata.bind(this, text)}>更新</a>
                            <Divider type="vertical" />
                            <PopConfirm pop={pop} data={{
                                goodsId: text.goodsId,
                                status: status,
                            }}>
                            </PopConfirm>

                        </span>
                    )
                }
                ,
            },
        ];
    };
    confirm = (data) => {
        this.props.isDelGoodsInfo(data, this.props.queryGoodsInfoList, this.state.page)
    }
    handleChange = (attr, event) => {
        let updateGoods = this.state.updateGoods;
        updateGoods[attr] = event.target.value;
        this.setState({
            updateGoods: updateGoods,
        });
    }
    updata = (text) => {
        this.setState({
            box: {
                ...this.state.box,
                visible: true,
            },
            updateGoods: text
        });
    };
    handleOk = () => {
        let ret = this.props.updateGoodsInfo(this.state.updateGoods, this.props.queryGoodsInfoList, this.state.page);
        this.setState({
            box: {
                ...this.state.box,
                visible: false,
            }
        });

    };
    handleCancel = () => {
        this.setState({
            box: {
                ...this.state.box,
                visible: false,
            }
        });
    };

    componentDidMount = () => {
        this.props.queryGoodsInfoList(this.state.page);
    };
    nextPage = (current) => {
        let page = this.state.page;
        page["index"] = current;
        this.props.queryGoodsInfoList(this.state.page)
        this.setState({
            page: {
                ...this.state.page,
                index: current,
            }
        })
    }
    selectGoods = (value) => {
        let { index, size } = this.state.page;
        let page = { index: index, size: size, goodsType: value }
        if (value === '全部') {
            page['goodsType'] = ""
        }
        this.props.queryGoodsInfoList(page)
    }
    setUpdateGoods = (vaule) => {
        this.setState({
            updateGoods: {
                ...this.state.updateGoods,
                goodsType: vaule
            }
        })

    }
    render = () => {
        let updateGoods = this.state.updateGoods;
        const dateFormat = 'YYYY-MM-DD';
        let content = (
            <React.Fragment>
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight: "32px",
                        }
                    } span={8}>套餐名称</Col>
                    <Col span={16} >
                        <Input type="text" value={updateGoods.goodsName} disabled={true} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight: "32px",
                        }
                    } span={8}>次数</Col>
                    <Col span={16} >
                        <Input type="text" value={updateGoods.goodsFreq} onChange={this.handleChange.bind(this, "goodsFreq")} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight: "32px",
                        }
                    } span={8}>有效期</Col>
                    <Col span={16} >
                        <DatePicker onChange={(date, dateString) => {
                            let updateGoods = this.state.updateGoods;
                            updateGoods["goodsExpreDate"] = dateString;
                            this.setState({
                                updateGoods: updateGoods,
                            });
                        }
                        } defaultValue={moment(updateGoods.goodsExpreDate)} format={dateFormat} />

                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight: "32px",
                        }
                    } span={8}>使用范围</Col>
                    <Col span={16} >
                        <Input type="text" value={updateGoods.goodsAdvise} onChange={this.handleChange.bind(this, "goodsAdvise")} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight: "32px",
                        }
                    } span={8}>套餐价格</Col>
                    <Col span={16} >
                        <Input type="text" value={updateGoods.goodsPrice} onChange={this.handleChange.bind(this, "goodsPrice")} />
                    </Col>
                </Row >
                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight: "32px",
                        }
                    } span={8}>折后价</Col>
                    <Col span={16} >
                        <Input type="text" value={updateGoods.goodsDiscountPrice} onChange={this.handleChange.bind(this, "goodsDiscountPrice")} />
                    </Col>
                </Row >

                < Row gutter={[16, 16]} >
                    <Col style={
                        {
                            lineHeight: "32px",
                        }
                    } span={8}>商品类型</Col>
                    <Col span={16} >
                        <Select value={updateGoods.goodsType} style={{ width: 120 }} onChange={this.setUpdateGoods} >
                            <Option value="高端保洁">高端保洁</Option>
                            <Option value="家居养护">家居养护</Option>
                            <Option value="家庭用品">家庭用品</Option>
                        </Select>
                    </Col>
                </Row >
            </React.Fragment>
        )
        let page = this.props.page;
        page["onChange"] = this.nextPage
        page["current"] = this.state.page.index;
        return (
            <Card title={
                <React.Fragment>
                    <Select defaultValue="全部" style={{ width: 120 }} onChange={this.selectGoods}>
                        <Option value="全部">全部</Option>
                        <Option value="高端保洁">高端保洁</Option>
                        <Option value="家居养护">家居养护</Option>
                        <Option value="家庭用品">家庭用品</Option>
                    </Select>
                </React.Fragment>
            } extra={<Button type="primary">新增套餐</Button>}>
                <CustomTable columns={this.columns} data={this.props.data} page={page} />
                <DialogBox box={this.state.box} content={content}></DialogBox>
            </Card>
        )
    };
}