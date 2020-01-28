import goodsService from '../service/goodsService'
import { message } from 'antd';
export default {
    namespace: "goods",
    state: {
        page: {
            data: [],
            count: 0,
        }
    },
    // 用于更新数据
    reducers: {
        goodsInfoList(state, { data, count }) {
            let ret = []
            for (let i = 0; i < data.length; i++) {
                data[i]["key"] = data[i]["goodsId"];
                ret.push(data[i])
            }  
            return (
                {
                    page: {
                        data: ret,
                        count: count,
                    }
                }
            )
        },
    },
    // 用于异步请求数据
    effects: {
        *queryGoodsInfoList({ payLoad }, { call, put }) {
            const result = yield call(goodsService.queryGoodsInfoList, payLoad.page);
            if (result && result.code == 200) {
                message.success("刷新成功啦")
                yield put({
                    type: "goodsInfoList",
                    data: result.data,
                    count: result.count,
                })
            }else{
                message.error(result.message)
            }
        },
        *updateGoodsInfo({ payLoad }, { call, put }) {
            const result = yield call(goodsService.updateGoodsInfo, payLoad.goods);
            if (result && result.code == 200) {
                message.success("套餐更新成功!")
                payLoad.callback(payLoad.page);
            }else{
                message.error(result.message)
            }
        },
        *isDelGoodsInfo({ payLoad }, { call, put }) {
            const result = yield call(goodsService.isDelGoodsInfo, payLoad.data);
            if (result && result.code == 200) {
                message.success("套餐修改成功!")
                payLoad.callback();
            } else {
                message.error(result.message)
            }
        },
        *createGoodsInfo({ payLoad }, { call, put }) {
            const result = yield call(goodsService.createGoodsInfo, payLoad.data);
            if (result && result.code == 200) {
                message.success("套餐创建成功!")
                payLoad.callback();
            } else {
                message.error(result.message)
            }
        }
    }
}