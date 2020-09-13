import Vue from 'vue'
import Vuex from 'vuex'
import request from '../utils/request'
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		userInfo:'',//用户信息
		coininfo:'',//币种信息
		coinset:'',//币种配置信息
	},
	getters:{
		 userInfo: state => state.userInfo,
		 coininfo: state => state.coininfo,
		 coinset: state => state.coinset
	},
	mutations:{
		//设置用户信息
		SET_USER_INFO: (state, userInfo) => {
		    // 设置用户信息
		    state.userInfo = userInfo;
				uni.setStorage({
					key: "userInfo",
					data: userInfo
				})
		},
		//删除用户信息
		DELETE_USER_INFO: (state) => {
		    // 设置用户信息
		    state.userInfo = '';
		},
		//设置币种信息
		SET_COIN_INFO: (state, coininfo) => {
		    // 设置币种信息
		    state.coininfo = coininfo;
				uni.setStorage({
					key: "coininfo",
					data: coininfo
				})
		},
		//设置币种配置
		SET_COIN_SET: (state, coinset) => {
		    // 设置币种配置
		    state.coinset = coinset;
				uni.setStorage({
					key: "coinset",
					data: coinset
				})
		},
	},
	actions:{
		setUserInfo({ commit }) {
			request({
				url: '/user',
				method: 'get',
				params: {}
			})
			.then(res => {
				 commit('SET_USER_INFO', res.data)
			})
			.catch(err => {
				
			})
		},
		deleteUserInfo({ commit }) {
		    commit('DELETE_USER_INFO')
		},
		setCoinInfo({ commit }) {
			request({
				url: '/coins',
				method: 'get',
				params: {}
			})
			.then(res => {
				 commit('SET_COIN_INFO', res.data)
			})
			.catch(err => {
				
			})
		},
		setCoinSet({ commit }) {
			request({
				url: '/coins/setting',
				method: 'get',
				params: {}
			})
			.then(res => {
				 commit('SET_COIN_SET', res.data)
			})
			.catch(err => {
				
			})
		},
	}
})
export default store