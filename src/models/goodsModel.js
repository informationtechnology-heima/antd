import goodsService from '../service/goodsService'
import { message} from 'antd';
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
            if (result && result.code == 200) {
                yield put({
                    type: "goodsInfoList",
                    data:result.data,                
                })
            }
        },
        *updateGoodsInfo({ payLoad }, { call, put }) {
            const result = yield call(goodsService.updateGoodsInfo, payLoad.goods);
            if (result && result.code == 200) {
                message.success("套餐更新成功!")
                payLoad.callback();
                yield put({
                    type: "GoodsInfo",
                    data:result.data,                
                })
            }
        },
        *isDelGoodsInfo({ payLoad }, { call, put }) {
            const result = yield call(goodsService.isDelGoodsInfo, payLoad.data);
            if (result && result.code == 200) {
                message.success("套餐更新成功!")
                payLoad.callback();
                yield put({
                    type: "GoodsInfo",
                    data:result.data,                
                })
            }else{
                message.info("套餐更新失败啦!")
            }
        }
    }
}