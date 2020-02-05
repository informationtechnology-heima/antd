import React from 'react'
import ImageUpload from '../../component/fileUpload'
import { Card, Button, Alert } from 'antd'
import { connect } from 'dva'
const namespace = "image"
@connect(state => {
    return ({})
}, disp => {
    return {
        relationImage: (data) => {
            disp({
                type: namespace + "/relationImage",
                payLoad: {
                    data: data
                }
            })
        }
    }
})
export default class UploadImage extends React.Component {
    constructor() {
        super()
    }
    render = () => {
        let goods = this.props.location.state
        let content = goods == null ?
            (<Card title={"套餐名称：无"} extra={<Button type="primary">确认</Button>}>
                <Alert message="请从套餐处关联图片进入" type="warning" showIcon />
            </Card>)
            : (<Card title={"套餐名称：" + goods.goodsName} extra={<Button type="primary" onClick={this.relationImage}>关联</Button>}>
                <ImageUpload type={goods.goodsType} images={goods.goodsCoverUrl} ref="relation"></ImageUpload>
            </Card>);
        return (
            <Card title="图片关联">
                {content}
            </Card>
        )
    }
    relationImage = () => {
        let fileList = this.refs.relation.state.fileList
        let filesUrl = fileList
            .filter(iterm => {
                if (iterm.response == null || iterm.response.code == 200) {
                    return true
                }
            })
            .map((iterm, index) => {
                return ({
                    uid: index,
                    name: iterm.name,
                    status: iterm.status,
                    url: iterm.response == null ? iterm.url: iterm.response.data.filePath
                })
            })
        let data = {
            goodsId: this.props.location.state.goodsId,
            goodsCoverUrl: JSON.stringify(filesUrl)
        }
        console.log(data);
        this.props.relationImage(data)
    }
}