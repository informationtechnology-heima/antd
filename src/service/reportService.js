import HttpUtils from '../utils/httputils'
class ReportService {
    employeeServiceNumber = (time) => {
        return HttpUtils.get("/report/monthEmployeeServiceNumber?startTime=" + time.startTime + "&endTime=" + time.endTime)
    }
}
const reportService = new ReportService()
export default reportService;