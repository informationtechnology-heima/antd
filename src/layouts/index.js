import React from 'react';
import './index.css'
import Logged from '../pages/logged'
import Login from '../pages/login'
export default class BaseLayout extends React.Component {

    render = () => {
        // 判断是否登陆，切换页面
        let content = window.localStorage.getItem("Authorization") ?
            <Logged>
                {container}
            </Logged> :
            <Login></Login>;
        return (
            <div>
                {content}
            </div>
        )
    }

}