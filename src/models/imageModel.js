import imageService from '../service/imageService'
import { message } from 'antd'
import router from 'umi/router';
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
        },
        *deleteById({ payLoad }, { call, put }) {
            const ret = yield call(imageService.deleteById, payLoad.fileId)
            if (ret.code == 200) {
                message.success("删除成功了")
                payLoad.callback()
            } else {
                message.error(ret.message)
            }
        },

        *relationImage({ payLoad }, { call, put }) {
            const ret = yield call(imageService.relationImage, payLoad.data)
            if (ret.code == 200) {
                message.success("关联成功了")
                router.push("/goods")
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