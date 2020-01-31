import React from 'react';
import './index.css'

import Logged from '../pages/logged'
import Login from '../pages/login'
export default class BaseLayout extends React.Component {

    render = () => {
        // 判断是否登陆，切换页面
        let isLogin = window.sessionStorage.getItem("Authorization") != null
        let content = isLogin?
            <Logged>
                {this.props.children}
            </Logged> :
            <Login></Login>;
        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        )
    }

}