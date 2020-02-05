import React from 'react'
import { Form, Input, Select, Button, DatePicker, InputNumber } from 'antd'
import moment from 'moment';
const { Option } = Select;
class GoodsForm extends React.Component {
    render = () => {
        const dateFormat = 'YYYY-MM-DD';
        const { getFieldDecorator } = this.props.form;
        let updateGoods = this.props.updateGoods;

        return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <Form.Item label="套餐名称">
                    {getFieldDecorator('goodsName', {
                        initialValue: updateGoods.goodsName,
                        rules: [{ required: true, message: '套餐名称不能为空' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="套餐标题">
                    {getFieldDecorator('goodsTitle', {
                        initialValue: updateGoods.goodsTitle,
                        rules: [{ required: true, message: '套餐说明不能为空' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="次数" >
                    {getFieldDecorator('goodsFreq', {
                        initialValue: updateGoods.goodsFreq,
                        rules: [{ required: true, message: '服务次数不能为空' }],
                    })(<InputNumber />)}
                </Form.Item>
                <Form.Item label="有效期">
                    {getFieldDecorator('goodsExpreDate', {
                        initialValue: updateGoods.goodsExpreDate == null ? null : moment(updateGoods.goodsExpreDate, dateFormat),
                        rules: [{ required: true, message: '产品有效期不能为空' }],
                    })(<DatePicker format={dateFormat} />)}
                </Form.Item>
                <Form.Item label="使用建议">
                    {getFieldDecorator('goodsAdvise', {
                        initialValue: updateGoods.goodsAdvise,
                        rules: [{ required: true, message: '使用建议不能为空' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="套餐说明">
                    {getFieldDecorator('goodsRemarks', {
                        initialValue: updateGoods.goodsRemarks,
                        rules: [{ required: true, message: '套餐说明不能为空' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="套餐价格">
                    {getFieldDecorator('goodsPrice', {
                        initialValue: updateGoods.goodsPrice,
                        rules: [{ required: true, message: '套餐价格不能为空' }],
                    })(<InputNumber />)}
                </Form.Item>
                <Form.Item label="折后价">
                    {getFieldDecorator('goodsDiscountPrice', {
                        initialValue: updateGoods.goodsDiscountPrice,
                        rules: [{ required: true, message: '套餐折后价不能为空' }],
                    })(<InputNumber />)}
                </Form.Item>
                <Form.Item label="商品类型">
                    {getFieldDecorator('goodsType', {
                        initialValue: updateGoods.goodsType,
                        rules: [{ required: true, message: '商品类型必须选择' }],
                    })(<Select style={{ width: 120 }} onChange={this.setUpdateGoods} >
                        <Option value="高端保洁">高端保洁</Option>
                        <Option value="家居养护">家居养护</Option>
                        <Option value="家庭用品">家庭用品</Option>
                    </Select>)}
                </Form.Item>
            </Form>
        )
    }
}
const goodsForm = Form.create()(GoodsForm)
export default goodsForm