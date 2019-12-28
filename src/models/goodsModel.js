import goodsService from '../service/goodsService'
export default {
    namespace: "goods",
    state: {
        data: []
    },
    // 用于更新数据
    reducers: {
        goodsInfoList(state, { data }) {
            let ret = []
            for(let i = 0; i < data.length; i++){
                data[i]["key"] =  data[i]["goodsId"];
                ret.push(data[i])
            }
            return (
                {
                    data: ret,
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
        },
        *updateGoodsInfo({ payLoad }, { call, put }) {
            const result = yield call(goodsService.updateGoodsInfo, payLoad);
            if (result && result.code == 200) {
                yield put({
                    type: "goodsInfoList",
                    data:result.data,                
                })
            }
        }
    }
}