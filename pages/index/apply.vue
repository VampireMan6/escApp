<template>
	<view class="f-14 column flex">
		<!-- 顶部 -->
		<view class="b-547CE2 column j-c m-b-16 flex" style="padding: 16rpx 32rpx;box-sizing: border-box;height: 124rpx;" :style="AlertShow?'filter: blur(4px);':''">
			<view class="f-c flex" style="margin-bottom: 12rpx;">
				<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
				<view class="f-12 m-l-8 flex">接入的矿机需要正确录入本机的MAC地址和接收邮箱号</view>
			</view>
			<view class="f-c flex" style="margin-bottom: 12rpx;">
				<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
				<view class="m-l-8 f-12 flex">支付费用后生成的MAC地址会发送到你登记的邮箱。</view>
			</view>
			<view class="f-c flex">
				<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
				<view class="m-l-8 f-12 flex">去官网下载矿机挖矿程序,开启分布式挖矿之旅吧！</view>
			</view>
		</view>
		<view class="p-x-16 column flex" :style="AlertShow?'filter: blur(4px);':''">
			<!-- 矿机MAC地址 -->
			<view class="p-16 b-2B2D3D column m-b-16 b-r-2 flex">
				<text class="m-b-16 f-16">矿机MAC地址</text>
				<view>
					<input type="text" class="flex-1" v-model="input1" placeholder="请输入矿机MAC地址">
				</view>
				<view style="height: 2rpx;margin-top: 8rpx;background-color: #FFFFFF;"></view>
			</view>
			<!-- 支付费用 -->
			<view class="p-16 b-2B2D3D column m-b-16 b-r-2 flex">
				<text class="m-b-16 f-16">支付费用</text>
				<view>
					<input disabled="true" type="text" class="flex-1" v-model="input3" placeholder="请输入USDT数量以申请激活码">
				</view>
			</view>
			<!-- 密码 -->
			<view class="p-16 b-2B2D3D column m-b-16 b-r-2 flex">
				<text class="m-b-16 f-16">您的邮箱</text>
				<view>
					<input  type="text" class="flex-1" v-model="address" placeholder="请输入一个你能正常收到邮件的邮箱地址">
				</view>
				<view style="height: 2rpx;margin-top: 8rpx;background-color: #FFFFFF;"></view>
			</view>
		</view>
		<view style="height: 96rpx;margin-top: 60rpx;" class="p-x-16 flex" :style="AlertShow?'filter: blur(4px);':''">
			<view style="border-radius: 8rpx;font-size: 32rpx;" class="j-c f-c w-100 b-2B2D3D flex" @tap="getQc">提交申请</view>
		</view>
		<!-- <view class="column f-c flex" style="margin-top: 60rpx">
			<text class="f-12">没有母币 ? <text class="c-547CE2 m-l-8" @tap="exchange">去兑换</text></text>
		</view> -->
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			<view class="" v-if="AlertClass == 0&&hint == 'pay'">
				<view class="err_box">
					<view class="font_max text_center">为了您的资金安全，请先设置交易密码</view>
					<view class="flex_center f_j_b btn_box">
						<view class="btn_box_l" @tap="close">取消</view>
						<view class="btn_box_r color_yellow" @tap="goset">去设置</view>
					</view>
				</view>
			</view>
			<view class="" v-if="AlertClass == 0&&hint == 'success'">
				<view class="column flex b-2B2D3D">
					<view class="column flex f-c" style="width: 686rpx;padding: 22rpx 16rpx;box-sizing: border-box;border-radius: 8rpx;">
						<image style="width: 138rpx;height: 138rpx;" src="../../static/open-alert/image_11.png" mode=""></image>
						<text style="font-size: 40rpx;color: #7FEF9D;margin-bottom: 24rpx;">申请成功</text>
						<view class="f-16 m-b-16">{{input3}}</view>
						<view class="flex f-b w-100">
							<text class="m-b-2">MAC地址</text>
							<text>{{input1}}</text>
						</view>
						<view class="flex f-b w-100 m-b-8">
							<text class="m-b-2">邮箱地址</text>
							<text>{{address}}</text>
						</view>
						<view style="height: 2rpx;background-color: #FFFFFF;width: 100%;margin-bottom: 60rpx;"></view>
						<view class="c-547CE2">
							<text @tap="even(1)">再次申请</text>
							<text style="margin: 0 16rpx;">|</text>
							<text @tap="even(2)">回到首页</text>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="AlertClass == 0&&hint == 'pop1'">
				<view class="column" style="width: 686rpx;background-color: #2B2D3D;padding: 22rpx 16rpx;box-sizing: border-box;border-radius: 8rpx;">
					<view class="j-c f-b flex" style="margin-bottom: 32rpx;">
						<image class="image-16"  src="../../static/open-alert/image_10.png" mode="" @tap="close"></image>
						<text class="f-18">{{title1}}</text>
						<view style="width: 48rpx;height: 40rpx;"></view>
					</view>
					<view class="w-100 j-c flex m-b-16 f-18">{{input3}}</view>
					<!-- <view class="w-100 j-c flex" style="margin-bottom: 32rpx;">当前汇率 ES/USDT {{price}}</view> -->
					<view style="height: 2rpx;background-color: #FFFFFF;margin-bottom: 32rpx;"></view>
					<view style="" class="f-16 m-b-16">注意事项</view>
					<view class="flex f-c m-b-16 f-12">
						<view style="width: 8rpx;height: 8rpx;border-radius: 100%;background-color: #547CE2;"></view>
						<text class="m-l-8 flex-1">请再次确认MAC地址和邮箱号的正确性，一旦提交将不可更改或找回！</text>
					</view>
					<view class="flex w-100 m-b-8">
						<input class="flex-1 flex" v-model="pay_password" style="border: 2rpx solid #FFFFFF;height: 60rpx;border-radius: 4rpx 0 0 4rpx;padding: 0 16rpx;box-sizing: border-box;" type="text" placeholder="请输入交易密码">
						<view class="flex j-c f-c" style="width: 126rpx;height: 60rpx; border-radius: 0 4rpx 4rpx 0;background-color: #547CE2;" @tap="getPay">确定</view>
					</view>
				</view>
			</view>
		</openAlert>
		
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	import { mapGetters } from "vuex"
	
	export default {
		data() {
			return {
				input1: "",
				address: "",
				status: false,
				title1: "",
				title2: "",
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				hint:'err',
				pay_password: "",
			}
		},
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			}),
			price() {
				let list = uni.getStorageSync('coininfo');
				let index = list.findIndex(x=>x.EnName == 'ES');
				return parseFloat(list[index].Price).toFixed(4);
			},
			input3() { 
				return uni.getStorageSync('settingMsg').apply_price + ' USDT';
			}
		},
		methods: {
			getQc() {//申请激活码
				if(this.userInfo.is_pay_password !== 1){
					this.hint = 'pay';
					this.open(0, 'center');
					return
				};
				if(!this.input1) {
					_toast('矿机MAC地址不能为空');
					return;
				};
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(!reg.test(this.address)) {
					_toast('邮箱格式错误');
					return;
				};
				this.hint = 'pop1';
				this.title1 = '申请激活码';
				this.open(0,'center');
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
				this.show = false;
				this.pay_password = "";
				this.number = "";
				this.$refs.openAlert.Close();
			},
			goset(){
				uni.navigateTo({
					url: '/pages/user/set'
				})
				this.close()
			},
			getPay() {
				if(!this.pay_password) {
					_toast('密码不能为空');
					return;
				};
				if(!this.status) {
					this.status = true;
					this.getPays();
				}
			},
			async getPays() {
				let res = await this.$myRequest({
					url: 'kc/apply',
					method: 'POST',
					message: "申请中",
					data: {
						mac: this.input1,
						pay_password: this.pay_password,
						email: this.address
					}
				});
				if(res.data.code == 200) {
					this.pay_password = "";
					this.hint = 'success';
					this.open(0, 'center');
				}else {
					_toast(res.data.message)
				};
				this.status = false;
			},
			even(i) {//再次购买
				if(i == 1) {
					this.close();
					this.input1 = "";
				}else {//返回首页
					this.close();
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/css/resonance.css");
	.top {height: 240rpx;border-radius: 4rpx;}
	.flex {display: flex;}
	.bor-b-1 {border-bottom: 8rpx solid #547CE2;}
	.bor-b-0 {border-bottom: 8rpx solid #1F2031;}
	.w-100 {
		width: 100%;
	}

	.p-16 {
		padding: 24rpx 32rpx;
		box-sizing: border-box;
	}

	.p-x-16 {
		padding: 0 32rpx;
		box-sizing: border-box;
	}

	.b-2B2D3D {
		background-color: #2B2D3D;
	}

	.b-547CE2 {
		background-color: #547CE2
	}
	.image-32 {	width: 64rpx;height: 64rpx;border-radius: 100%;}
	
	.image-16 {
		width: 32rpx;
		height: 32rpx;
	}

	.c-fff {
		color: #FFFFFF;
	}

	.c-547CE2 {
		color: #547CE2;
	}

	.c-AEA {
		color: #AEAEAE;
	}

	.f-24 {
		font-size: 48rpx;
	}

	.f-18 {
		font-size: 36rpx;
	}

	.f-14 {
		font-size: 28rpx;
	}
	.f-16{font-size: 32rpx;}
	.f-10 {
		font-size: 20rpx;
	}

	.f-12 {font-size: 24rpx;}
	.column {
		flex-direction: column;
	}

	.j-c {
		justify-content: center;
	}

	.f-c {
		align-items: center;
	}

	.f-b {
		justify-content: space-between;
	}

	.flex-1 {
		flex: 1;
	}

	.m-b-16 {
		margin-bottom: 32rpx;
	}

	.m-b-8 {
		margin-bottom: 16rpx;
	}

	.m-b-2 {
		margin-bottom: 4rpx;
	}

	.top_title {
		height: 36px;
		border-radius: 16rpx 16rpx 0 0;
	}
	.m-l-8 {margin-left: 16rpx;}
		
	.image-50 {
		width: 100rpx;
		height: 100rpx;
		border-radius: 8rpx;
	}

	.b-r-16 {
		border-radius: 0 0 16rpx 16rpx;
	}
	.b-r-2 {border-radius: 4rpx;}
</style>
