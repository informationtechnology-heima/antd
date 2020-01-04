import React from 'react';
import styles from './index.css';
import { Input, Row, Col , message} from 'antd'
import {connect} from 'dva'
const namespace = "login";
@connect(state=> {
    return({})
}, dispatch => {
    return{
        login: (loginData) => {
            dispatch({
                type:namespace + "/login",
                payLoad:{
                    loginData:loginData,
                }
            })
        }
    }
})
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                username: null,
                password: null,
                checkcode: null,
            }
        }
    }

    change = (attr, event) => {
        let loginData = this.state.loginData;
        loginData[attr] = event.target.value;
        this.setState({
            loginData: loginData,
        })
    }
    login = (event) => {
        let loginData = this.state.loginData
        if(!loginData.username){
            message.error("用户名必填")
            return;
        }else if(!loginData.password){
            message.error("密码必填")
            return;
        }else if(!loginData.checkcode){
            message.error("验证码必填")
            return;
        }
        // 发起登陆        
        this.props.login(loginData);
    }

    render = () => {
        return (
            <div className={styles.login}>
                {/* 登录框 */}
                <div className={styles.box}>
                    <div className={styles.head}>
                        <h3>——系统登陆——</h3>
                    </div>
                    <div className={styles.body}>
                        <Row gutter={[16, 16]}>
                            <Col style={
                                {
                                    lineHeight: "32px"
                                }
                            } span={7}>账号：</Col>
                            <Col span={17}><Input value={this.state.loginData.username} onChange={this.change.bind(this, "username")}></Input></Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col style={
                                {
                                    lineHeight: "32px"
                                }
                            } span={7}>密码：</Col>
                            <Col span={17}><Input value={this.state.loginData.password} type="password" onChange={this.change.bind(this, "password")}></Input></Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col style={
                                {
                                    lineHeight: "32px"
                                }
                            } span={7}>验证码：</Col>
                            <Col span={17} style={
                                {
                                    width: "120px"
                                }
                            }><Input value={this.state.loginData.checkcode} onChange={this.change.bind(this, "checkcode")}></Input></Col>
                        </Row>
                    </div>
                    <div className={styles.tail}>
                        <button onClick={this.login}>
                            登录
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}