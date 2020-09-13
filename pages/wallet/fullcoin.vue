<template>
	<view class="content" v-if="coindetail">
		<view class="topbox content"  @tap="open(1, 'top')" :style="AlertShow?'filter: blur(4px);':''">
		 	<view class="topcard_f"></view>
		 	<view class="topcard_t"></view>
		 	<view class="topcard">
		 		<view class="flex_center f_j_b">
					<view class="flex_center">
						<image :src="getlogo(coindetail.usercoin.CoinId)" style="border-radius: 50%;" class="top_coin_icon marr" mode=""></image>
						<view class="font_max">{{coindetail.usercoin.CoinName}}</view>
					</view>
					<!-- <view class="flex_center">
						<view class="marr">选择协议</view>
						<image src="../../static/img/xmore.png" class="xmore" mode=""></image>
					</view> -->
				</view>
				<view class="text_ver text_center">
					<text style="font-size: 48rpx;">{{parseFloat(coindetail.usercoin.Money) | toNonExponential}}</text>
					<text class="font_mon">{{coindetail.usercoin.CoinName}}</text>
				</view>
				<view class="text_center">可用余额</view>
		 	</view>
		</view>
		<view class="box martt content" :style="AlertShow?'filter: blur(4px);':''">
			<view class="text_center address font_max">{{coindetail.usercoin.Address}}</view>
			<view class="text_center">该地址仅支持{{CoinText}}{{coindetail.usercoin.CoinName}}币种充值，最低充值数量{{coindetail.allcoin.MinRecharge | toNonExponential}}{{coindetail.usercoin.CoinName}}</view>
			<view class="qrcode_box">
				<tki-qrcode ref="qrcode"
							:val="coindetail.usercoin.Address"
							:size="130"
							background="#fff"
							foreground="#000"
							pdground="#000"
							:onval="true"
							:loadMake="true"
							:show="true"
							@result="resultQrCode"
							unit="px"></tki-qrcode>
			</view>
			<view class="martt" style="margin-bottom: 100rpx;">扫描二维码，进行充值</view>
		</view>
		<view class="bt btn martt" :style="AlertShow?'filter: blur(4px);':''" @click="fuzhi">复制地址</view>
		<view class="box hint martt" :style="AlertShow?'filter: blur(4px);':''">
			<view class="">温馨提示</view>
			<view class="flex_start mart">
				<view class="hint_dian marr"></view>
				<view class="" style="display: flex;flex: 1;">{{coindetail.allcoin.RechargeInfo}} </view>
			</view>
			<!-- <view class="flex_start mart">
				<view class="hint_dian marr"></view>
				<view class="">此转账功能仅适用于本平台用户站内相互转账，一切平台外账户均不享受此功能  </view>
			</view> -->
		</view>
		
		<!--  -->
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			
			<view class="" v-if="AlertClass == 1">
				<view class="tanchutel">选择币种</view>
				<block v-for="(item,index) in coinlist" :key="index">
					<view @click="chooseit(item)" class="martt ldx infinite ldx-spring-btt-in" :class="index%3 == 0?'tccard_box1':index%3 == 1?'tccard_box2':'topcard'">
						<view class="flex_center f_j_b">
							<view class="flex_center">
								<image :src="getlogo(item.usercoin.CoinId)" style="border-radius: 50%;" class="top_coin_icon marr" mode=""></image>
								<view class="font_max">{{item.usercoin.CoinName}}</view>
							</view>
						</view>
						<view class="text_ver text_center">
							<text style="font-size: 48rpx;">{{parseFloat(item.usercoin.Money) | toNonExponential}}</text>
							<text class="font_mon">{{item.usercoin.CoinName}}</text>
						</view>
						<view class="text_center">可用余额</view>
					</view>
				</block>
				
				<!-- <view class="tccard_box2 martt ldx infinite ldx-spring-btt-in">
					<view class="flex_center f_j_b">
						<view class="flex_center">
							<image src="" class="top_coin_icon marr" mode=""></image>
							<view class="font_max">NTT</view>
						</view>
					</view>
					<view class="text_ver text_center">
						<text style="font-size: 48rpx;">65535</text>
						<text class="font_mon">NTT</text>
					</view>
					<view class="text_center">可用余额</view>
				</view>
				<view class="topcard martt ldx infinite ldx-spring-btt-in" @click="close">
					<view class="flex_center f_j_b">
						<view class="flex_center">
							<image src="" class="top_coin_icon marr" mode=""></image>
							<view class="font_max">NTT</view>
						</view>
					</view>
					<view class="text_ver text_center">
						<text style="font-size: 48rpx;">65535</text>
						<text class="font_mon">NTT</text>
					</view>
					<view class="text_center">可用余额</view>
				</view> -->
			</view>
			
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import tkiQrcode from "../../components/tki-qrcode/tki-qrcode.vue"
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	export default {
		components: {
			tkiQrcode
		},
		computed: {
			...mapGetters({
				coininfo: "coininfo",
				coinset:"coinset",
			}),
			CoinText() {
				if(this.coindetail.usercoin.CoinName == 'USDT') {
					return ' ERC-20 '
				}else {
					return ''
				}
			}
		},
		data() {
			return {
				address:'',
				showcoin:false,
				CoinId:'',
				coinlist:'',
				coindetail:'',
				
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
			}
		},
		onLoad(e) {
			
			if(e.CoinId){
				this.CoinId = e.CoinId
			}
			this.initdata()
		},
		beforeCreate() {
			// this.app.showLoadinig()
		},
		methods: {
			resultQrCode(){},
			xx(){},
			chooseit(e){
				this.coindetail = e
				this.close()
			},
			initdata(){
				this.getcoin()
			},
			getcoin(){
				this.$request({
					url: '/user/coins',
					method: 'get',
					data: {}
				})
				.then(res => {
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					let list = res.data
					var coinset = this.coinset
					var coinlist = []
					for(var i in list){
						for(var j in coinset){
							if(list[i].CoinId == coinset[j].Id){
								if(coinset[j].IsRecharge == 1){
									let xinxi = {
										usercoin: list[i],
										allcoin:coinset[j]
									}
									coinlist.push(xinxi)
								}
							}
						}
					}
					this.coinlist = coinlist
					this.coindetail = coinlist[0]
					// console.log(this.coinlist)
				})
				.catch(err => {
				})
			},
			fuzhi() {
				uni.setClipboardData({
					data: this.coindetail.usercoin.Address,
					success: function() {
			
					}
				});
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
			sure(){
				this.open(0,'center')
			},
			again(){
				this.open(5,'center')
			},
			goresult(){
				navigateTo('resonance/resonanec_result')
			},
			
			getlogo(e){
				var logo = this.coininfo.filter(item => {
					return item.Id == e;
				});
				if(logo.length>0){
					return logo[0].Logo
				}
			},
		}
	}
</script>

<style>
@import url("../../common/css/coin.css");
</style>
