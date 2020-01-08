import httpUtils from '../utils/httputils'

class OrderService {
    queryServiceOrderList = (page) => {
        return httpUtils.get("/service/web/queryServiceOrderList?" + "index=" + page.index + "&size=" +  page.size);
    }
    onComplete = (serviceId) => {
        return httpUtils.get("/service/onComplete/" + serviceId);
    }
    allot = (data) => {
        return httpUtils.post("/order/allot", data);
    }
}
const orderService = new OrderService();
export default orderService;
