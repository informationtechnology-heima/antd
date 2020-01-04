import loginService from '../service/loginService'
import { message } from 'antd';
import router from 'umi/router';

export default {
    namespace:"login",
    state:{
        login:{}
    },
    effects:{
        *login({ payLoad }, { call, put }){  
            const ret = yield call(loginService.login, payLoad.loginData)
            if(ret.code != 200){
                message.error("账号或密码不正确")
            }else{
                message.success("登陆成功")
                window.sessionStorage.setItem("Authorization", ret.data.ubdToken);
                window.sessionStorage.setItem("username", ret.data.ubdPoliceName);
                router.push('/goods');
            }
        }
    },
    reducers:{

    }
}