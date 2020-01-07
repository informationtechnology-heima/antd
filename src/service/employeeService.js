import HttpUtils from '../utils/httputils'
class EmployeeService{
    queryUserList =(ubdAdmin) => {
        return HttpUtils.get("/user/queryUserList?" + "ubdAdmin=" + ubdAdmin)
    }
}
const employeeService = new EmployeeService();
export default employeeService;