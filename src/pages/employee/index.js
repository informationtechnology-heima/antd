import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva'
import { Divider, Tag, Row, Col, Input, Switch, Button, Card } from 'antd'
import DialogBox from '../../component/dialogbox'
import EmployeeForm from '../../component/employeeForm'
const namespace = "employee"
@connect(state => {

    let page = {
        showTotal: () => "共" + state[namespace].count + "条",
        pageSize: 10,
        total: state[namespace].count,
    }
    return ({
        employees: state[namespace].employees,
        page: page,
    })

}, disp => {
    return ({
        queryEmployees: (page) => {
            disp({
                type: namespace + "/queryEmployees",
                payload: {
                    page: page,
                }
            })
        },
        updateEmployee: (user, callback) => {
            disp({
                type: namespace + "/updateEmployee",
                payload: {
                    user: user,
                    callback: callback,
                }
            })
        },
        createEmployee: (user, callback) => {
            disp({
                type: namespace + "/createEmployee",
                payload: {
                    user: user,
                    callback: callback,
                }
            })
        }
    })
})
export default class Employee extends React.Component {

    constructor() {
        super();
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'ubdPoliceName',
                key: 'ubdPoliceName',
            },
            {
                title: '固定电话',
                dataIndex: 'ubdFixedPhone',
                key: 'ubdFixedPhone',
            },
            {
                title: '是否在职',
                dataIndex: 'ubdUse',
                key: 'ubdUse',
                render: (ubdUse) => {
                    let status = "";
                    if (ubdUse == 1) {

                        status = <Tag color={"green"} key={"在职"}>
                            在职
                    </Tag>;
                    } else {
                        status = <Tag color={"volcano"} key={"离职"}>
                            离职
                        </Tag>;
                    }
                    return status;

                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={this.updateUser.bind(this, text)}>更新</a>
                    </span>
                ),
            }

        ];
        this.state = {
            page: {
                index: 1,
                size: 10,
            },
            box: {
                name: "更新",
                visible: false,
                handleOk: () => { },
                handleCancel: this.handleCancel,
            },
            user: {
                ubdId: "",
                ubdFixedPhone: "",
                ubdPoliceName: "",
                ubdUse: "",
            },
        }
    }
    updateUser = (user) => {
        // 显示弹框
        this.setState({
            user: {
                ubdId: user.ubdId,
                ubdFixedPhone: user.ubdFixedPhone,
                ubdPoliceName: user.ubdPoliceName,
                ubdUse: user.ubdUse,
            },
            box: {
                ...this.state.box,
                name: "更新",
                visible: true,
                handleOk: this.updateUserOK
            }
        });
    }
    handleCancel = () => {
        this.refs.employeeForm.resetFields()
        this.setState({
            box: {
                ...this.state.box,
                visible: false,
            }
        });
    }
    updateUserOK = () => {
        let employeeForm = this.refs.employeeForm
        employeeForm.validateFields()
            .then((data) => {
                if(data.ubdUse){
                    data["ubdUse"] = 1
                }else{
                    data["ubdUse"] = 0
                }
                data["ubdId"] = this.state.user.ubdId
                this.props.updateEmployee(data, () =>  this.props.queryEmployees(this.state.page) )
                employeeForm.resetFields()
                this.setState({
                    user: {},
                    box: {
                        ...this.state.box,
                        visible: false,
                    }
                });
            })
            .catch((err) => {
            })
    }
    createUser = () => {
        // 新增员工
        this.setState({
            user: {
                ubdFixedPhone: "",
                ubdPoliceName: "",
                ubdUse: 0,
            },
            box: {
                ...this.state.box,
                name: "新增",
                visible: true,
                handleOk: this.createUserOK,
            }
        });
    }
    createUserOK = () => {
        let employeeForm = this.refs.employeeForm
        employeeForm.validateFields()
            .then((data) => {
                if(data.ubdUse){
                    data["ubdUse"] = 1
                }else{
                    data["ubdUse"] = 0
                }
                this.props.createEmployee(data, () => this.props.queryEmployees(this.state.page))
                employeeForm.resetFields()
                this.setState({
                    user: {},
                    box: {
                        ...this.state.box,
                        visible: false,
                    }
                });
            })
            .catch((err) => {
            })
    }
    isUser = (isUser) => {
        if (isUser) {
            this.setState({
                user: {
                    ...this.state.user,
                    ubdUse: 1,
                }
            })
        } else {
            this.setState({
                user: {
                    ...this.state.user,
                    ubdUse: 0,
                }
            })
        }
    }
    onChange = (attr, e) => {
        this.setState({
            user: {
                ...this.state.user,
                [attr]: e.target.value,
            }
        })

    }
    nextPage = (current) => {
        let page = this.state.page;
        page["index"] = current;
        this.props.queryEmployees(this.state.page)
        this.setState({
            page: {
                ...this.state.page,
                index: current,
            }
        })
    }
    render = () => {

        let content = (
            <EmployeeForm user={this.state.user} ref='employeeForm'></EmployeeForm>
        );
        let page = this.props.page;
        page["onChange"] = this.nextPage;
        page["current"] = this.state.page.index;
        return (
            <Card title="员工管理" extra={<Button type="primary" onClick={this.createUser}>新增员工</Button>}>

                <CustomTable columns={this.columns} data={this.props.employees} page={page} />
                <DialogBox box={this.state.box} content={content}></DialogBox>
            </Card>
        )
    }


    componentDidMount = () => {
        this.props.queryEmployees(this.state.page)
    }
}