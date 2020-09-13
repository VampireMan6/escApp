import { API_URL } from '../config/app.js'
import { getToken , delToken } from './userAuth.js'
import { reLaunch, queryParams, _toast,navigateTo } from './common.js'
import { getStorageSync } from './storage.js'
import store from "../store";


const request = (obj) => {

	obj.url = API_URL + obj.url;

	// 获取用户本地保存的token
	let token = getToken();
	if (!obj.header) {
		obj.header = {
			'Accept-Language' : 'zh_CN',
		};
	}
	if (token) {
		obj.header.Authorization = token;
		
	}
	// obj.header.From = 'mobile';
	
	if(!obj.params) {
		obj.params = {};
	}
	
	obj.params = {
		// lang: getStorageSync('lang')||'zh_cn',
		...obj.params
	}
	if (obj.params) {
		obj.url = obj.url + queryParams(obj.params, true);
	}
	return new Promise((resolve, reject) => {
		uni.request({
		        url: obj.url,
		        method: obj.method || "get",
		        data: obj.data,
		        dataType: 'json',
		        header: obj.header
		    }).then(data => {
		        let [err, res] = data;
				let resData = res.data || {};
				if (res.statusCode !== 200) {
					if(res.statusCode == 401){
						delToken();
						reLaunch('start/start?out=1')
					}
					reject(err);
				} else {
					// 如果是登录失效，则跳转到登录页面
					resolve(resData);
				}
		    }).catch(err => {
				return reject(err);
		　　});
	});
};

export default request
