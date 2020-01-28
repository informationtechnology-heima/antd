import reportService from '../service/reportService'
import { message } from 'antd'
export default {
    namespace: "report",
    state: {
        employeeServiceData: {
            employeeServiceNumber:{},
            employees:{}
        },
    },
    effects: {
        *employeeServiceNumber({ payLoad }, { call, put }) {
            const ret = yield call(reportService.employeeServiceNumber, payLoad.time)
            if (ret.code == 200) {
                message.success("刷新成功啦")
                yield put({
                    type: "updateReport",
                    payLoad: ret.data,
                })
                payLoad.callback()
                
            } else {
                message.error(ret.message)
            }
        }
    },
    reducers: {
        updateReport: (_, { payLoad }) => {

            let employeeServiceNumberData = payLoad.map((iter, index) => {
                return {
                    name: iter.employeeName,
                    y: iter.number
                }
            });

            let employees = payLoad.map((iter, index) =>
                iter.employeeName
            );
            return({
                employeeServiceData: {
                    employeeServiceNumber:employeeServiceNumberData,
                    employees:employees
                }
            })
        }
    }
}