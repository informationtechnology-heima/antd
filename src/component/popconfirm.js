import { Popconfirm } from 'antd';
import React from 'react';
export default class PopConfirm extends React.Component {

    render = () => {
        return (
            <Popconfirm
                title={this.props.pop.message}
                onConfirm={() => {
                    console.log("this.props.data", this.props.data);
                    
                    this.props.pop.confirm(this.props.data);

                }}
                onCancel={this.props.pop.cancel}
                okText="Yes"
                cancelText="No"
            >
                <a href="#">{this.props.pop.operation}</a>
            </Popconfirm>
        )
    }
}