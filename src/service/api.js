
const api = function (host,url,params) {

  return new Promise((resolve,reject) => {
    Taro.request({
      url: host + url,
      data: params.data,
      method: params.method || 'GET',
      header: {
        'content-type': 'application/json',
        ...params.header
      },
      success:(res)=>{
        let {data} = res;
        resolve(data);
      },
      fail:(error)=>{
        reject(error)
      }
    })
  })
};

// const header = {
//   'Content-Type': 'application/x-www-form-urlencoded',
//   'Content-Type': 'multipart/form-data; boundary=PJSeAE6HemhHlKu1c_lv34wwsh0wTXD'
// };

export default api;
