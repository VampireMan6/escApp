<template>
	<view class="content">
		<view style="height: var(--status-bar-height);min-height: 40rpx;"></view>
		<view class="userbox" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b">
				<view class="flex_center f_j_b">
					<view class="head_iconbox">
						<image class="head_icon" src="../../static/img/lbx.png" mode="aspectFill"></image>
						<view class="boxF">
							<view class="boxS">
								<view class="boxT">
									<image class="head" :src="userInfo.avatar?userInfo.avatar:'../../static/img/head.png'" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="font_max marl">{{userInfo.nickname?userInfo.nickname: userInfo.username}}</view>
				</view>
				<image class="set" src="../../static/img/set.png" mode="" @click="gouserinfo"></image>
			</view>
			<view class="flex_center f_j_b">
			</view>
		</view>
		<view class="allmoney_box content" :style="AlertShow?'filter: blur(4px);':''" @click="gowallet">
			<view class="opacity">资产总折合（USDT）</view>
			<view class="font_b" style="font-size: 54rpx;">{{totalAssets}}</view>
			<view class="opacity">≈{{userInfo.assets.totalAssets*7 | toFixed}} CNY</view>
		</view>
		<view class="flex_center f_j_b list_box" :style="AlertShow?'filter: blur(4px);':''">
			<view class="list_item flex_center flex_j_a" @click="gofullcoin"><image class="me_item_icon" src="../../static/img/me_zr.png" mode=""></image><text class="opacity">转入</text></view>
			<view class="list_item flex_center flex_j_a" style="margin-left: 16rpx;" @click="gotransfer"><image class="me_item_icon" src="../../static/img/me_zc.png" mode=""></image><text class="opacity">转出</text></view>
			<view class="list_item flex_center flex_j_a" style="margin-left: 16rpx;"  @click="gobill"><image class="me_item_icon" src="../../static/img/me_zd.png" mode=""></image><text class="opacity">账单</text></view>
		</view>
		<view class="list_m flex_center f_j_b"  @click="goset" :style="AlertShow?'filter: blur(4px);':''">
			<view class="font_mon">安全设置</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		<view class="list_m flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''" @click="goquestion">
			<view class="font_mon">常见问答</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		<view class="list_m flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''" @click="goabout">
			<view class="font_mon">关于我们</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		<view class="list_m flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''" @click="checkUpdate">
			<view class="font_mon">检查更新</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	import { mapGetters,mapState } from "vuex"
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	import update from '@/utils/update.js'
	
	export default {
		onLoad() {
			// #ifdef APP-PLUS
			let self = this;
			plus.runtime.getProperty(plus.runtime.appid, function(info) {
				self.version = info.version;
			})
			// #endif
			uni.getSystemInfo({
				success: (res)=> {
					this.device = res.platform
				}
			});
		},
		computed: {
			...mapState({
				userInfo: "userInfo"
			}),
			totalAssets() {
				return parseFloat(this.userInfo.assets.totalAssets).toFixed(4)
			}
		},
		onShow() {
			this.$store.dispatch("setUserInfo");
			// this.getbalance()
			// this.getcoin()
		},
		data() {
			return {
				allmoney:'',
				
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				
				dong:false,
				balance:'',
				
				boxa:false,
				boxb:false,
				boxc:false,
				
				ntt_money:'',
				ntt_num:'',
				version: "",
				device: "",
			}
		},
		methods: {
			goset(){
				navigateTo('user/set')
			},
			gofullcoin(){
				navigateTo('wallet/fullcoin')
			},
			gotransfer(){
				navigateTo('wallet/transfer')
			},
			gobill(){
				navigateTo('wallet/bill')
			},
			goshare(){
				navigateTo('user/share_first')
			},
			goindex(){
				reLaunch('index/index')
			},
			gouserinfo(){
				navigateTo('user/userinfo')
			},
			goabout(){
				navigateTo('user/about')
			},
			gowallet(){
				navigateTo('wallet/wallet')
			},
			goquestion(){
				navigateTo('user/question')
			},
			goteam(){
				navigateTo('team/team')
			},
			goconvert(){
				navigateTo('resonance/resonance')
				// _toast('敬请期待')
				// navigateTo('convert/convert')
			},
			// checkUpdate(){
				
			// 	// let self = this;
			// 	// plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
			// 	// 	self.$request({
			// 	// 		url: '/update',
			// 	// 		method: 'get',
			// 	// 		data:{
			// 	// 			version: wgtinfo.version,
			// 	// 			device:uni.getSystemInfoSync().platform,
			// 	// 		}
			// 	// 	})
			// 	// 	.then(res => {
			// 	// 		console.log(res)
			// 	// 		if(res.data.update){
			// 	// 			self.app._install(res.data);
			// 	// 		}else{
			// 	// 			_toast('已经是最新版本了')
			// 	// 		}
			// 	// 	})
			// 	// 	.catch(err => {
			// 	// 	})
			// 	// })
			// },
			async checkUpdate() {
				let res = await this.$myRequest({
					url: 'update',
					data: {
						version: this.version,
						device: this.device
					}
				});
				if (res.data.code == 200) {
					if(res.data.data.update) {
						try {
							update.check();
						} catch (e) {
							
						};
					}else {
						_toast('当前版本无需更新');
					}
				}
			},
			open(Class, Position) {
				this.$nextTick(function() {
					this.AlertClass = Class;
					this.AlertPosition = Position;
					this.$nextTick(function() {
						this.$refs.openAlert.Show();
					});
				});
			},
			close(){
				this.$refs.openAlert.Close();
			},
			getbalance(){
				this.$request({
					url: '/user/coins',
					method: 'get',
					data: {
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.balance = res.data
				})
				.catch(err => {
				})
			},
			cboxa(){
				this.boxa = true
				this.boxb = false
				this.boxc = false
			},
			cboxb(){
				this.boxa = false
				this.boxb = true
				this.boxc = false
			},
			cboxc(){
				this.boxa = false
				this.boxb = false
				this.boxc = true
			},
			getcoin(){
				this.$request({
					url: '/user/coins',
					method: 'get',
					data: {}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					let list = res.data
					this.ntt_money = list.filter(item => {
						return item.CoinName == 'ESC';
					})[0];
					this.ntt_num = (Number(this.ntt_money.Money) +Number(this.ntt_money.gz)).toFixed(2) 
				})
				.catch(err => {
				})
			},
		}
	}
</script>

<style>
@import url("../../common/css/user.css");
</style>
