import HttpUtils from '../utils/httputils'
class EmployeeService{
    queryUserList =(ubdAdmin) => {
        return HttpUtils.get("/user/queryUserList?" + "ubdAdmin=" + ubdAdmin)
    }
    queryEmployees = (page) => {
        return HttpUtils.get("/user/queryEmployees?" + "index=" + page.index + "&size=" + page.size)
    }
    updateEmployee = (user) => {
        return HttpUtils.put("/user/update", user)
    }
}
const employeeService = new EmployeeService();
export default employeeService;