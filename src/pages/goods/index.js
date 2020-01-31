import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva'
import { Divider, Row, Col, Input, DatePicker, Card, Button, Select, Form } from 'antd';
const { Option } = Select;
import DialogBox from '../../component/dialogbox'
import PopConfirm from '../../component/popconfirm'
import moment from 'moment';
import GoodsForm from '../../component/goodsForm'
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
        isDelGoodsInfo: (data, callback) => {
            disp({
                type: namespace + "/isDelGoodsInfo",
                payLoad: {
                    data: data,
                    callback: callback
                }
            })
        },
        createGoods: (data, callback) => {
            disp({
                type: namespace + "/createGoodsInfo",
                payLoad: {
                    data: data,
                    callback: callback
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
            },
            model: {
                updateGoods: {},
                isUpdate: true,
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
                ellipsis: true,
            },
            {
                title: '套餐说明',
                dataIndex: 'goodsRemarks',
                key: 'goodsRemarks',
                ellipsis: true,
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
        this.props.isDelGoodsInfo(data, () => this.props.queryGoodsInfoList(this.state.page))
    }
    handleChange = (attr, event) => {
        let updateGoods = this.state.model.updateGoods;
        updateGoods[attr] = event.target.value;
        this.setState({
            model: {
                ...this.state.model,
                updateGoods: updateGoods,
            }
        });
    }
    updata = (text) => {
        let json = JSON.stringify(text)
        let updateGoods = JSON.parse(json)
        this.setState({
            box: {
                ...this.state.box,
                name: "更新",
                visible: true,
                handleOk: this.handleOk
            },
            model: {
                isUpdate: true,
                updateGoods: updateGoods,
            }
        });
    };
    handleOk = () => {
        let goodsform = this.refs.goodsForm
        goodsform.validateFields()
            .then((data) => {
                data["goodsId"] = this.state.model.updateGoods.goodsId
                this.props.updateGoodsInfo(data, this.props.queryGoodsInfoList, this.state.page);
                goodsform.resetFields()
                this.setState({
                    box: {
                        ...this.state.box,
                        visible: false,
                    },
                    model:{
                        updateGoods:{}
                    }
                });
            })
            .catch((err) => {
            })


    };
    handleCancel = () => {
        let goodsForm = this.refs.goodsForm
        goodsForm.resetFields()
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
    createGoods = () => {
        let goodsform = this.refs.goodsForm
        goodsform.validateFields()
            .then((data) => {
                this.props.createGoods(data,
                    () => this.props.queryGoodsInfoList(this.state.page));
                goodsform.resetFields()
                this.setState({
                    box: {
                        ...this.state.box,
                        visible: false
                    }
                });
            })
            .catch((err) => {
            })
    }
    setCreateGoodsData = () => {
        this.setState({
            box: {
                ...this.state.box,
                name: "新增套餐",
                visible: true,
                handleOk: this.createGoods,
            },
            model: {
                isUpdate: false,
                updateGoods: {}
            }
        });
    }
    render = () => {

        let content = this.dataModel(this.state.model.updateGoods, this.state.model.isUpdate)
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
            } extra={<Button type="primary" onClick={this.setCreateGoodsData}>新增套餐</Button>}>
                <CustomTable columns={this.columns} data={this.props.data} page={page} />
                <DialogBox box={this.state.box} content={content}></DialogBox>
            </Card>
        )
    };
    dataModel = (updateGoods, isUpdate) => {
        return (
            <React.Fragment>
                <GoodsForm updateGoods={updateGoods} isUpdate={isUpdate} ref="goodsForm"></GoodsForm>
            </React.Fragment>
        )
    }
}