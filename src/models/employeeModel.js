import employeeService from '../service/employeeService'
import {message} from 'antd'
export default {
    namespace: "employee",
    state: {
        employees: [],
        count:0,
    },
    reducers: {
        updateEmployee(_, { data }) {
            let employees = data;
            return ({
                employees: employees,
            })
        },
        queryEmployee: (_, { data }) => {
            let ret = data.data.map((iter, index) => {
                return {
                    ...iter,
                    key:index,
                }
            });
            return ({
                employees: ret,
                count:data.count,
            })
        }
    },
    effects: {
        *queryUserList({ payload }, { call, put }) {
            const ret = yield call(employeeService.queryUserList, 2)
            if (ret.code == 200) {
                yield put({
                    type: "updateEmployee",
                    data: ret.data,
                })

            }
        },
        *queryEmployees({ payload }, { call, put }){
            const ret = yield call(employeeService.queryEmployees, payload.page);
            if(ret.code == 200){
                yield put({
                    type: "queryEmployee",
                    data: {
                        data:ret.data,
                        count:ret.count,
                    }
                })
            }
        },
        *updateEmployee({ payload }, { call}){
            const ret = yield call(employeeService.updateEmployee, payload.user);
            if(ret.code == 200){
                message.success("更新成功了");
                payload.callback();
            }
        },
        *createEmployee({ payload }, { call}){
            const ret = yield call(employeeService.createEmployee, payload.user);
            if(ret.code == 200){
                message.success("新增成功了");
                payload.callback();
            }
        }

    }
}