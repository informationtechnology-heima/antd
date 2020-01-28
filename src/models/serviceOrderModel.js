import orderService from '../service/orderService'
import { message } from 'antd';
export default {
    namespace: "serviceOrder",
    state: {
        page: {
            data: [],
            count: {},
        }
    },
    effects: {
        *queryServiceOrderList({ payLoad }, { call, put }) {
            const ret = yield call(orderService.queryServiceOrderList, payLoad.page);
            if (ret.code == 200) {
                message.success("刷新成功啦")
                yield put({
                    type: "queryOrderList",
                    payLoad: {
                        data: ret.data,
                        count: ret.count,
                    }
                })
            }else{
                message.error(ret.message)
            }
        },
        *onComplete({ payLoad }, { call, put }) {
            const ret = yield call(orderService.onComplete, payLoad.serveId);
            if (ret.code == 200) {
                message.success("更新成功")
                payLoad.callback(payLoad.page);
            }else{
                message.error(ret.message)
            }
        },
        *allot({payLoad}, { call, put }){
            let allotParam  = payLoad.allotParam;
            if(allotParam.ubdId != 0 && allotParam.serviceId != 0){
                const ret =  yield call(orderService.allot, {
                    serviceId:allotParam.serviceId,
                    userId:allotParam.ubdId,
                });
                if(ret.code == 200){
                    message.success("派单完成了，请及时服务！")
                    payLoad.callback();
                }else{
                    message.error(ret.message)
                }
            }
            
        }
    },
    reducers: {
        queryOrderList(state, { payLoad }) {
            let data = payLoad.data.map(iter => {
                return {
                    ...iter,
                    key: iter.serviceId,
                }
            });
            return ({
                page: {
                    data: data,
                    count: payLoad.count,
                }
            })
        }
    }
}