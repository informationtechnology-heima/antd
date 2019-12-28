import React from 'react';
import { Table, Divider, Tag } from 'antd';
export default class CustomTable extends React.Component{
    render =() => {
        return(
            <Table columns={this.props.columns} dataSource={this.props.data} />
        )
    }
}