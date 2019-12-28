import React from 'react'
import CustomTable from '../../component/table'
export default class Employee extends React.Component{
    
    render = () => {
        return(
            <CustomTable columns={Employee.columns} />
        )
    }
    static columns = [
        {
            title: '用户编号',
            dataIndex: 'UBDID',
            key: 'UBDID',
        },
        {
            title: '姓名',
            dataIndex: 'UBDPOLICENAME',
            key: 'UBDPOLICENAME',
        },
        {
            title: '固定电话',
            dataIndex: 'UBDFIXEDPHONE',
            key: 'UBDFIXEDPHONE',
        },
        {
            title: '用户类型',
            dataIndex: 'UBDADMIN',
            key: 'UBDADMIN',
        },
        {
            title: '是否启用',
            dataIndex: 'UBDUSE',
            key: 'UBDUSE',
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