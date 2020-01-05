import httpUtils from '../utils/httputils'

class GoodsService {
    queryGoodsInfoList = () => {
        return httpUtils.get("/goods/web/queryGoodsInfoList")
    }
    updateGoodsInfo = (data) => {
        return httpUtils.put("/goods/updateGoodsInfo", data)
    }
    isDelGoodsInfo = (data) => {
        return httpUtils.delete("/goods/isDel" + "/" + data.goodsId + "/" + data.status)
    }
}

const goodsService = new GoodsService();
export default goodsService;