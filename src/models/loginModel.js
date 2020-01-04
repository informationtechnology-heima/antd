import loginService from '../service/loginService'
import { message } from 'antd';

export default {
    namespace:"login",
    state:{
        login:{}
    },
    effects:{
        *login({ payLoad }, { call, put }){  
            console.log(payLoad.loginData);
            const ret = yield call(loginService.login, payLoad.loginData)
            console.log(ret);
            if(ret.code != 200){
                message.error("账号或密码不正确")
            }else{
                message.success("登陆成功了")
            }
        }
    },
    reducers:{

    }
}