import httpUtils from '../utils/httputils'

class GoodsService {
    queryGoodsInfoList = () => {
        return httpUtils.get("/goods/queryGoodsInfoList")
    }
    updateGoodsInfo = (data) => {
        return httpUtils.put("/goods/updateGoodsInfo", data)
    }
    deleteGoodsInfo = (id) => {
        return httpUtils.delete("/goods/deleteGoodsInfo" + "/" + id)
    }
}

const goodsService = new GoodsService();
export default goodsService;