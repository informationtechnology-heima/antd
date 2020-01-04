
// 请求后端工具类
class HttpUtils {

    static ContentType = "application/json;charset=UTF-8";
    static headers = {
        "Content-Type": HttpUtils.ContentType,
        "Authorization":window.sessionStorage.getItem("Authorization"),
    }
    get = (path) => {
        return fetch(path, {
            method: "GET",
            headers: HttpUtils.headers
        })
            .then(resp => {
                return resp.json();
            })
    };

    post = (path, data) => {
        return fetch(path, {
            method: "POST",
            headers: HttpUtils.headers,
            body:JSON.stringify(data)
        })
            .then(resp => {
                return resp.json();
            })
    };
    put = (path, data) => {
        return fetch(path, {
            method: "PUT",
            headers: HttpUtils.headers,
            body:JSON.stringify(data)
        })
            .then(resp => {
                return resp.json();
            })
    };
    delete = (path) => {
        return fetch(path, {
            method: "DELETE",
            headers: HttpUtils.headers,
        })
            .then(resp => {
                return resp.json();
            })
    };
}

const httpUtils = new HttpUtils();
export default httpUtils;