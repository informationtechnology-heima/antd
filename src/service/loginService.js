import httpUtils from '../utils/httputils'

class LoginService{
    login =(data) => {      
        return httpUtils.post("/login", data);
    }
}
const loginService = new LoginService();
export default loginService;