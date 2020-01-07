import React from 'react';
import { Modal, Button } from 'antd';
export default class DialogBox extends React.Component {
    constructor() {
        super();
        this.state = {
            data:{},
        }
    }
    render = () => {
        let box = this.props.box;
        return (
            <div>
                <Modal
                    title={box.name}
                    visible={box.visible}
                    onOk={box.handleOk}
                    onCancel={box.handleCancel}
                >
                    {this.props.content}
                </Modal>
            </div>
        )
    }
    componentDidMount =() => {
        this.setState({
            data:this.props.content
        })
    }

}