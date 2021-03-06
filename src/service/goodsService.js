import httpUtils from '../utils/httputils'

class GoodsService {
    queryGoodsInfoList = (page) => {
        return httpUtils.get("/goods/web/queryGoodsInfoList?"+ "index=" + page.index + "&size=" + page.size + "&goodsType=" + page.goodsType)
    }
    updateGoodsInfo = (data) => {
        return httpUtils.put("/goods/updateGoodsInfo", data)
    }
    isDelGoodsInfo = (data) => {
        return httpUtils.delete("/goods/isDel" + "/" + data.goodsId + "/" + data.status)
    }
    createGoodsInfo = (data) => {
        return httpUtils.post("/goods/createGoodsInfo", data)
    }
}

const goodsService = new GoodsService();
export default goodsService;