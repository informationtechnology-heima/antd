import httpUtils from '../utils/httputils'

class OrderService {
    queryServiceOrderList = (page) => {
        return httpUtils.get("/service/web/queryServiceOrderList?" + "index=" + page.index + "&size=" +  page.size)
    }
}
const orderService = new OrderService();
export default orderService;
