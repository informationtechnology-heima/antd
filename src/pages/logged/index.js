import React from 'react'
import { Layout, Menu, Icon, Divider} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import logo from '../../assets/logo.png'
import Link from 'umi/link';
export default class Logged extends React.Component {


    render = () => {
        return (
            <Layout style={
                {
                    height: "100vh",
                }
            }>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" >
                        <img src={logo} style={
                            {
                            height:"100%",
                            width:"100%",
                            }
                        }></img>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    
                        <li style={
                            {
                                height:"40px",
                                lineHeight:"40px",
                                paddingLeft:"25px",
                                fontSize: "14px",
                            }
                        }>
                                <Icon type="user" /> 
                                &nbsp;&nbsp;&nbsp;
                            <span className="nav-text">{window.sessionStorage.getItem("username")}</span>
                        </li>
                        
                        <Menu.Item key="1">
                            <Link to="/goods">
                                <Icon type="profile" />
                                <span className="nav-text">套餐管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/order">
                                <Icon type="shopping-cart" />
                                <span className="nav-text">订单管理</span>
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/employee">
                                <Icon type="team" />
                                <span className="nav-text">员工管理</span>
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/report">
                                <Icon type="pie-chart"/>
                                <span className="nav-text">数据大盘</span>
                            </Link>

                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <h3 style={
                            {
                                paddingLeft:"15px"
                            }
                        }>西安 <b>安居在家</b> 家政有限公司后台管理系统</h3>
                    </Header>
                    <Content>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }

}