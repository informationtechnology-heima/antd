import goodsService from '../service/goodsService'
export default {
    namespace: "goods",
    state: {
        data: [],
        code:"",
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
        },
        GoodsInfo(state, { data }) {     
            console.log("传值success");  
            return (
                {
                    code: data,
                }
            )
        }
    },
    // 用于异步请求数据
    effects: {
        *queryGoodsInfoList({ payLoad }, { call, put }) {
            const result = yield call(goodsService.queryGoodsInfoList, payLoad);
            console.log("B后端执行成功了");
            if (result && result.code == 200) {
                yield put({
                    type: "goodsInfoList",
                    data:result.data,                
                })
            }
        },
        *updateGoodsInfo({ payLoad }, { call, put }) {
            const result = yield call(goodsService.updateGoodsInfo, payLoad.goods);
            console.log("payLoad", payLoad);
            if (result && result.code == 200) {
                console.log("A后端执行成功了");
                console.log("payLoad", payLoad.callback);
                payLoad.callback();
                yield put({
                    type: "GoodsInfo",
                    data:result.data,                
                })
            }
        }
    }
}