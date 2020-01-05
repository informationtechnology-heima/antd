import React from 'react';
import {Pagination} from 'antd'
export default class Page extends React.Component{
    render = () => {
        return (
            <Pagination current={this.props.current} onChange={this.props.onChange} total={10} />
        )    
    }
}