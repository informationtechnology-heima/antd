import React from 'react';
import { Table, Divider, Tag , Pagination} from 'antd';
export default class CustomTable extends React.Component{
    render =() => {
        return(
            <Table columns={this.props.columns} dataSource={this.props.data} pagination={this.props.page}>
                
            </Table>
        )
    }
}