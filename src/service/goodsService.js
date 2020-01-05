import httpUtils from '../utils/httputils'

class GoodsService {
    queryGoodsInfoList = (page) => {
        return httpUtils.get("/goods/web/queryGoodsInfoList?"+ "index=" + page.index + "&size=" + page.size)
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