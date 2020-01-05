
// 实时获取认证信息
function getHeaders(){
    return (
        {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization":window.sessionStorage.getItem("Authorization"),
        }
    )
}

class HttpUtils {
    
    get = (path) => { 
        return fetch(path, {
            method: "GET",
            headers: getHeaders(),
        })
            .then(resp => {
                return resp.json();
            })
    };

    post = (path, data) => {
        return fetch(path, {
            method: "POST",
            headers: getHeaders(),
            body:JSON.stringify(data)
        })
            .then(resp => {
                return resp.json();
            })
    };
    put = (path, data) => {
        return fetch(path, {
            method: "PUT",
            headers: getHeaders(),
            body:JSON.stringify(data)
        })
            .then(resp => {
                return resp.json();
            })
    };
    delete = (path) => {
        return fetch(path, {
            method: "DELETE",
            headers: getHeaders(),
        })
            .then(resp => {
                return resp.json();
            })
    };
}

const httpUtils = new HttpUtils();
export default httpUtils;