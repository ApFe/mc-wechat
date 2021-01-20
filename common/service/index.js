import aesDecode from './aesDecode.js';
import regeneratorRuntime from '../../libs/runtime.js';
const S = {
    baseConfig: {
        data: {},
        opt: {
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization':''
            },
            dataType: 'json',
            responseType: 'text',
            method: 'GET',
            baseData: true
        }
    },

    /*
    * 获取一个post请求
    * @url{String} 请求地址
    * @defaultData{Object} 默认请求参数
    * @defaultOption{Object} 默认请求配置
    * @return{Function} 一个发起post请求的函数，该函数返回一个Promise对象
    */
    getPostRequest(url, defaultData = {}, defaultOption = {}) {
        /*
        * 发起http请求返回一个Promise 对象
        * @data{Object} 请求参数
        * @option{Object} 请求配置
        * @return{Promise}
        */
        return function (data, option) {
            option&&(option.typePam = option.typePam||'str');
            console.log('==option==',option)
            if(option&&option.typePam=='arr'){
                var dt = Object.assign([], defaultData);
                Object.assign(dt, data || []);
            }else{
                var dt = Object.assign({}, defaultData);
                Object.assign(dt, data || {});
            }
           
            var opt = Object.assign({}, defaultOption);
            opt = Object.assign(opt, option || {});
            
            return S.post(url, dt, opt)
            // return S.post(url, dt, opt)typePam
        }
    },

    /*
    * 获取一个post请求
    * @url{String} 请求地址
    * @defaultData{Object} 默认请求参数
    * @defaultOption{Object} 默认请求配置
    * @return{Function} 一个发起post请求的函数，该函数返回一个Promise对象
    */
    getGetRequest(url, defaultData = {}, defaultOption = {}) {
        /*
        * 发起http请求返回一个Promise 对象
        * @data{Object} 请求参数
        * @option{Object} 请求配置
        * @return{Promise}
        */
        return function (data = {}, option) {
            let dt = { ...defaultData, ...data };
            let opt = { ...defaultOption, ...option };
            return S.get(url, dt, opt)
        }
    },

    /*
    * 获取一个post请求
    * @url{String} 请求地址
    * @defaultData{Object} 默认请求参数
    * @defaultOption{Object} 默认请求配置
    * @return{Function} 一个发起post请求的函数，该函数返回一个Promise对象
    */
   getPutRequest(url, defaultData = {}, defaultOption = {}) {
        /*
        * 发起http请求返回一个Promise 对象
        * @data{Object} 请求参数
        * @option{Object} 请求配置
        * @return{Promise}
        */
        return function (data = {}, option) {
            let dt = { ...defaultData, ...data };
            let opt = { ...defaultOption, ...option };
            return S.put(url, dt, opt)
        }
    },

    /*
    * 获取一个post请求
    * @url{String} 请求地址
    * @defaultData{Object} 默认请求参数
    * @defaultOption{Object} 默认请求配置
    * @return{Function} 一个发起post请求的函数，该函数返回一个Promise对象
    */
   getDleteRequest(url, defaultData = {}, defaultOption = {}) {
        /*
        * 发起http请求返回一个Promise 对象
        * @data{Object} 请求参数
        * @option{Object} 请求配置
        * @return{Promise}
        */
        return function (data = {}, option) {
            let dt = { ...defaultData, ...data };
            let opt = { ...defaultOption, ...option };
            return S.delete(url, dt, opt)
        }
    },

    __grequestPromise(url, data, opt) {
        if (opt.loading) {
            wx.showLoading({ title: opt.loadingTitle || '加载中...' })
        }
        return new Promise(function (resolve, reject) {
            opt.header.token = data.token || opt.header.token || ''
            wx.request({
                url: url,
                data: data,
                header: opt.header,
                method: opt.method,
                dataType: opt.dataType,
                responseType: opt.responseType,
                success: async res => {
                    let _data = res.data.data;
                    // 加密数据解密
                    if (typeof _data == 'string' && _data.length > 0) {
                        res.data.data = aesDecode.decode(_data);
                    }
                    // 401 表示登录过期，又必须需要登陆的接口
                    if (res.statusCode == 401 && opt.baseData && !S.loading) {
                        S.loading = true;
                        wx.showLoading({ title: opt.loadingTitle || '加载中...' });
                        S.setToken('');
                        console.log('-------进入401-------')
                        let token = await getApp().updateToken();
                        console.log('-------进入401--token更新-----')
                        data.token = token;
                        opt.header.token = token;
                        res.data = await S.__grequestPromise(url, data, opt);
                        wx.hideLoading();
                        S.loading = false;
                    }
                    if(res.statusCode == 401){
                        // S.loading = true;
                        // wx.showLoading({ title: opt.loadingTitle || '加载中...' });
                        // S.setToken('');
                        console.log('-------进入401-------')
                        let token = await getApp().initToken()
                       
                        if(token){
                            console.log('initToken',token)
                            if(token.statusCode==200){
                                opt.header.Authorization='bearer '+token.data.access_token
                                res = await S.__grequestPromise(url, data, opt);
                                console.log('initToken==')
                            }
                        }else{
                            console.log('initTokennull',token)
                            try {
                                wx.clearStorageSync()
                            } catch(e) {
                                wx.clearStorage()
                            }
                            
                        }
                        
                        // data.token = token;
                        // opt.header.token = token;
                        // res.data = await S.__grequestPromise(url, data, opt);
                        // wx.hideLoading();
                        // S.loading = false;
                    }
                    else
                    // 402 表示需要绑定手机号
                    if (res.statusCode == 402 && opt.baseData) {
                        try {
                            wx.clearStorageSync()
                            wx.navigateTo({
                              url: '/pages/login/login'
                            })
                        } catch(e) {
                            wx.clearStorage()
                            wx.navigateTo({
                              url: '/pages/login/login'
                            })
                        }
                    }
                    // resolve(res.data);
                    resolve(res);
                },
                fail: err => {
                    console.log('===fill=====',err)
                    if (err.errMsg === "request:fail timeout") {
                        wx.showToast({
                            title: '请检查网络连接...',
                            icon: 'none',
                            duration: 3000
                        });
                    }
                    reject(err);
                },
                complete: res => {
                    if (opt.loading) {
                        setTimeout(() => {
                            wx.hideLoading();
                        }, 100)
                    }
                }
            })
        });
    },


    /* 发起请求 */
    request(url, data, option) {
        var service = this;
        option&&(option.typePam = option.typePam||'str');
        console.log('==option=opt==',option)
        var opt = Object.assign({}, this.baseConfig.opt);
        if (typeof option === 'object') {
            Object.assign(opt, option);
        }
        console.log('==opt==',opt)
        
        if(opt&&opt.typePam=='arr'){
            if (typeof data === 'object') {
                var bcdata = Object.assign([], this.baseConfig.data);
                Object.assign(bcdata, data);
                data = bcdata
            } else {
                data = Object.assign({}, this.baseConfig.data);
            }
        }else{
            if (typeof data === 'object') {
                var bcdata = Object.assign({}, this.baseConfig.data);
                Object.assign(bcdata, data);
                data = bcdata
            } else {
                data = Object.assign({}, this.baseConfig.data);
            }
        }
        

        if (this._init || !opt.baseData) {
            return this.__grequestPromise(url, data, opt);
        } else {
            this.watingFuns = this.watingFuns || [];
            return new Promise(function (resolve, reject) {
                S.watingFuns.push(function () {
                    resolve()
                });
            }).then(res => {
                Object.assign(data, service.baseConfig.data);
                return service.__grequestPromise(url, data, opt);
            });
        }
    },


    /* 上传文件 */
    uploadFile(url, data = {}) {
        var opt = Object.assign({}, this.baseConfig.opt);
        if (typeof data.param !== 'object') {
            data.param = Object.assign({}, this.baseConfig.data);
        }

        return wx.uploadFile({
            url: url,
            filePath: data.filePath,
            name: data.name,
            header: opt.header,
            formData: data.param,
            success: (res) => {
                data.success && data.success(JSON.parse(res.data))
            },
            fail: err => {
                data.fail && data.fail(err)
            }
        })
    },


    /* 发起get请求 */
    get(url, data, option) {
        if(option.addUrl){
            var url=url+option.addUrl
        }
        if (typeof option === 'object') {
            option.method = "GET"
            option.header = { 'content-type': option.contentType,'Authorization':option.token }
        } else {
            option = { method: 'GET', header: { 'content-type': option.contentType } }
        }
        return this.request(url, data, option)
    },


    /* 发起post请求 */
    post(url, data, option) {
        if(option.addUrl){
            var url=url+option.addUrl
        }
        if (typeof option === 'object') {//暂时更换
            option.method = "POST"
            if(option.token){
                option.header = { 'content-type': option.contentType,'Authorization':option.token }
            }else{
                option.header = { 'content-type': option.contentType }
            }
        } else {
            option = { method: 'POST', header: { 'content-type': 'application/x-www-form-urlencoded' } }
        }
        return this.request(url, data, option)
    },

        /* 发起get请求 */
    put(url, data, option) {
        if(option.addUrl){
            var url=url+option.addUrl
        }
        if (typeof option === 'object') {
            option.method = "PUT"
            option.header = { 'content-type': option.contentType,'Authorization':option.token }
        } else {
            option = { method: 'PUT', header: { 'content-type': option.contentType } }
        }
        return this.request(url, data, option)
    },

    delete(url, data, option) {
        if(option.addUrl){
            var url=url+option.addUrl
        }
        if (typeof option === 'object') {
            option.method = "DELETE"
            option.header = { 'content-type': option.contentType,'Authorization':option.token }
        } else {
            option = { method: 'DELETE', header: { 'content-type': option.contentType } }
        }
        return this.request(url, data, option)
    },

    setBaseData(data = {}) {
        Object.assign(this.baseConfig.data, data);
        this._init = true;
        if (this.watingFuns) {
            for (var i = 0; i < this.watingFuns.length;) {
                (this.watingFuns.shift())();
            }
        }
    },

    setToken(token) {
        // 设置token到header中
        this.baseConfig.opt.header.Authorization = 'bearer '+token;
        // 设置token到请求参数中
        // this.setBaseData({ token })
        // this._init = true;
        // if (this.watingFuns) {
        //     for (var i = 0; i < this.watingFuns.length;) {
        //         (this.watingFuns.shift())();
        //     }
        // }
    },

    setHeader(token){
        
    }

}


export default S;