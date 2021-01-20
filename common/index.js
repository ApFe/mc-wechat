/** 微信的请求改为Promise方法*/
export function wxPromise(fnname, opt = {}) {
    return new Promise(function (resolve, reject) {
        opt.success = res => resolve(res);
        opt.fail = err => reject(err);
        wx[fnname](opt);
    })
}