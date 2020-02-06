import loginService from '../service/loginService'
import { message } from 'antd';
import router from 'umi/router';

export default {
    namespace: "login",
    state: {
        spinning: false
    },
    effects: {
        *login({ payLoad }, { call, put }) {
            yield put({
                type: "updateSpinning",
                payLoad: {
                    spinning: true
                }
            })
            const ret = yield call(loginService.login, payLoad.loginData)
            if (ret.code != 200) {
                message.error(ret.message)
                yield put({
                    type: "updateSpinning",
                    payLoad: {
                        spinning: false
                    }
                })
            } else {
                message.success("登陆成功啦")
                window.sessionStorage.setItem("Authorization", ret.data.ubdToken);
                window.sessionStorage.setItem("username", ret.data.ubdPoliceName);
                router.push('/goods');
                yield put({
                    type: "updateSpinning",
                    payLoad: {
                        spinning: false
                    }
                })
            }
        }
    },
    reducers: {
        updateSpinning: (_, { payLoad }) => {
            return ({
                spinning: payLoad.spinning
            })
        }
    }
}