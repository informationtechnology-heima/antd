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
                yield put({
                    type: "queryOrderList",
                    payLoad: {
                        data: ret.data,
                        count: ret.count,
                    }
                })
            }
        },
        *onComplete({ payLoad }, { call, put }) {
            const ret = yield call(orderService.onComplete, payLoad.serveId);
            if (ret.code == 200) {
                message.success("更新成功")
                payLoad.callback(payLoad.page);
            }else{
                message.error("更新失败了")
            }
        }
    },
    reducers: {
        queryOrderList(state, { payLoad }) {
            let data = payLoad.data.map(iter => {

                return {
                    ...iter,
                    key: iter.serveId,
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