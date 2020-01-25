import HttpUtils from '../utils/httputils'
class ReportService {
    employeeServiceNumber = () => {
        return HttpUtils.get("/report/employeeServiceNumber")
    }
}
const reportService = new ReportService()
export default reportService;