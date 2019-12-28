import goodsService from '../service/goodsService'
export default {
    namespace: "goods",
    state: {
        data: []
    },
    // 用于更新数据
    reducers: {
        goodsInfoList(state, { data }) {
            console.log("data", data);
            return (
                {
                    data: data,
                }
            )
        }
    },
    // 用于异步请求数据
    effects: {
        *queryGoodsInfoList({ payLoad }, { call, put }) {
            const result = yield call(goodsService.queryGoodsInfoList, payLoad);
            if (result && result.code == 200) {
                yield put({
                    type: "goodsInfoList",
                    data:result.data,                
                })
            }
        }
    }
}