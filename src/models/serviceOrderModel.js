import orderService from '../service/orderService'
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
        }
    },
    reducers: {
        queryOrderList(state, {payLoad}) {  
            return ({
                page: {
                    data: payLoad.data,
                    count: payLoad.count,
                }
            })
        }
    }
}