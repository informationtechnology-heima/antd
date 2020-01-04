import httpUtils from '../utils/httputils'

class LoginService{
    login =(data) => {      
        return httpUtils.post("/user/login/web", data);
    }
}
const loginService = new LoginService();
export default loginService;