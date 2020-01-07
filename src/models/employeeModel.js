import employeeService from '../service/employeeService'
export default {
    namespace: "employee",
    state: {
        employees: [],
    },
    reducers: {
        updateEmployee(_, { data }) {
            let employees = data;
            // for (let i = 0; i < data.length; i++) {
            //     data[i]["key"] = data[i]["ubdId"];
            //     employees.push(data[i])
            // } 
            return ({
                employees: employees,
            })
        }
    },
    effects: {
        *queryUserList({ palyLoad }, { call, put }) {
            const ret = yield call(employeeService.queryUserList, 2)
            if (ret.code == 200) {
                yield put({
                    type: "updateEmployee",
                    data: ret.data,
                })

            }
        }
    }
}