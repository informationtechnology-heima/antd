import React from 'react'
import { Upload, Icon, Modal, message } from 'antd'
const target = "/images/upload?type="
export default class FileUpload extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: {
                visible: false,
                src: ""
            },
            fileList: []
        }
    }
    render = () => {
        let headers = this.getHeaders();
        let action = target + this.props.type
        return (
            <React.Fragment>
                <Upload
                    action={action}
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    accept="image/*"
                    headers={headers}
                >
                    {this.state.fileList.length >= 6 ? null : (
                        <div>
                            <Icon type="plus" />
                            <div>上传</div>
                        </div>
                    )}
                </Upload>
                <Modal visible={this.state.modal.visible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.modal.src} />
                </Modal>
            </React.Fragment>
        )
    }
    handlePreview = (file) => {
        this.setState({
            modal: {
                visible: true,
                src: file.url
            }
        })
    }
    handleCancel = () => {
        this.setState({
            modal: {
                visible: false,
                src: null
            }
        })
    }
    handleChange = ({ fileList }) => {
        let files = fileList.map((image, iter) => {
            if (image.response != null && image.response.code != 200) {
                image["status"] = "error"
                message.error("非法文件")
            }
            return image
        })
        this.setState({ fileList: files})
    }
    // 实时获取认证信息
    getHeaders = () => {
        return (
            {
                "Authorization": window.sessionStorage.getItem("Authorization"),
            }
        )
    }
    componentDidMount = () => {
        let imagesJson = this.props.images
        if(imagesJson != null){
            let files =  JSON.parse(imagesJson)
            this.setState({
                fileList:files
            })
        }
        
    }

}