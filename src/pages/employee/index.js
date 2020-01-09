import React from 'react'
import CustomTable from '../../component/table'
import { connect } from 'dva'
import { Divider , Tag} from 'antd'
const namespace = "employee"
@connect(state => {
    return ({
        employees: state[namespace].employees,
        count: state[namespace].count,
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
                        <a>更新</a>
                        <Divider type="vertical" />
                        <a>删除</a>
                    </span>
                ),
            },
        ];
        this.state = {
            page: {
                index: 1,
                size: 10,
            }
        }
    }
    render = () => {
        return (
            <CustomTable columns={this.columns} data={this.props.employees} />
        )
    }

    componentDidMount = () => {
        this.props.queryEmployees(this.state.page)
    }
}