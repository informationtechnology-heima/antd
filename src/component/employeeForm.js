import React from 'react'
import { Form, Input, Switch, InputNumber } from 'antd'
class EmployeeForm extends React.Component {
    render = () => {
        let user = this.props.user
        const { getFieldDecorator } = this.props.form;        
        return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <Form.Item label="员工姓名">
                    {getFieldDecorator('ubdPoliceName', {
                        initialValue: user.ubdPoliceName,
                        rules: [{ required: true, message: '姓名不能为空' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="员工手机号" >
                    {getFieldDecorator('ubdFixedPhone', {
                        initialValue: user.ubdFixedPhone,
                        rules: [{ required: true, message: '手机号不能为空' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="是否在职">
                    {getFieldDecorator('ubdUse', {
                        initialValue: user.ubdUse == 1,
                        valuePropName: 'checked',
                        rules: [{ required: false, message: '是否在职不能为空' }],
                    })(<Switch />)}
                </Form.Item>
            </Form>
        )
    }
}
const employeeForm = Form.create()(EmployeeForm)
export default employeeForm