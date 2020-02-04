import imageService from '../service/imageService'
import { message } from 'antd'
export default {
    namespace: "image",
    state: {
        page: {
            images: [],
            count: 0,
        }
    },
    effects: {
        *findByType({ payLoad }, { call, put }) {
            const ret = yield call(imageService.findAll, payLoad.page)
            if (ret.code == 200) {
                message.success("刷新成功了")
                yield put({
                    type: "updateImages",
                    payLoad: {
                        images: ret.data,
                        count: ret.count
                    }
                })
            } else {
                message.error(ret.message)
            }
        }
    },
    reducers: {
        updateImages: (_, { payLoad }) => {
            return ({
                page: {
                    images: payLoad.images,
                    count: payLoad.count,
                }

            })
        }
    }
}