import httpUtils from '../utils/httputils'

class GoodsService {
    queryGoodsInfoList = () => {
        return httpUtils.get("/goods/queryGoodsInfoList")
    }
}

const goodsService = new GoodsService();
export default goodsService;