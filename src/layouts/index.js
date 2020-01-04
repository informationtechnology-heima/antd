import React from 'react';
import './index.css'
import Logged from '../pages/logged'
import Login from '../pages/login'
export default class BaseLayout extends React.Component {

    render = () => {
        // 判断是否登陆，切换页面
        let content = window.sessionStorage.getItem("Authorization") ?
            <Logged>
                {this.props.children}
            </Logged> :
            <Login></Login>;
        return (
            <div>
                {content}
            </div>
        )
    }

}