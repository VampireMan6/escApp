<template>
	<view class="content">
		<view style="height: var(--status-bar-height);min-height: 40rpx;" :style="AlertShow?'filter: blur(4px);':''"></view>
		<view class="logo_box flex_center" :style="AlertShow?'filter: blur(4px);':''">
			<image class="logo" src="../../static/img/logo.png" mode=""></image>
			<view class="flex column m-l-8 f-10">
				<text class="m-b-2 f-18">ESC</text>
				<text class="f-14">技术重构世界，数据引领未来</text>
			</view>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular class="swiper_box" :style="AlertShow?'filter: blur(4px);':''">
			<block v-for="(item,index) in banner" :key="index">
				<swiper-item>
					<image class="index_bg" :src="item" mode="aspectFill"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="p-x-16 w-100 flex" style="margin: 32rpx 48rpx;" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex w-100" style="height: 144rpx;">
				<view class="flex-1 flex j-c f-c b-2B2D3D b-r-2" @tap="exchange">
					<image class="image-20" src="../../static/open-alert/image_5.png" mode=""></image>
					<text class="m-l-8">兑换母币</text>
				</view>
				<view class="flex-1 flex j-c f-c m-l-8 b-2B2D3D b-r-2" @tap="enterApply">
					<image class="image-20" src="../../static/open-alert/image_5.png" mode=""></image>
					<text class="m-l-8">申请激活码</text>
				</view>
			</view>
		</view>
		<view class="flex w-100 p-x-16 f-c m-b-16" :style="AlertShow?'filter: blur(4px);':''">
			<view style="width: 4rpx; height: 32rpx;background-color: #547CE2;"></view>
			<view class="f-16 m-l-8">获取收益</view>
		</view>
		<view class="flex w-100 p-x-16 column" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex w-100 b-2B2D3D b-r-2 m-b-8" style="height: 144rpx;" v-for="(item,i) in dataList" :key="i">
				<view class="flex-1 flex j-c f-c">
					<view class="flex column" @tap="apply(i)">
						<text class="f-14" style="margin-bottom: 12rpx;">{{item}}</text>
						<view style="font-size: 24rpx;border-radius: 8rpx;padding: 8rpx;box-sizing: border-box;" class="flex j-c f-c b-547CE2">立即申请</view>
					</view>
				</view>
				<view style="width: 288rpx;height: 100%;position: relative;z-index: 1;" class="flex column j-c f-c">
					<view v-if="i == 0 || i == 2" style="border-bottom: 144rpx solid #547CE2;border-left: 80rpx solid transparent;height: 0;width: 288rpx;position: absolute;z-index: 2;"></view>
					<view v-else style="border-top: 144rpx solid #547CE2;border-left: 80rpx solid transparent;height: 0;width: 288rpx;position: absolute;z-index: 2;"></view>
				<!-- 	<image v-if="i == 0 || i == 2" style="width: 288rpx;height: 144rpx;position: absolute;z-index: 2;" src="../../static/open-alert/image_9.png" mode=""></image>
					<image v-else style="width: 288rpx;height: 144rpx;position: absolute;z-index: 2;transform: rotateX(180deg);" src="../../static/open-alert/image_9.png" mode=""></image> -->
					<view class="flex column b-b" style="position: absolute; z-index: 3;padding-left: 32rpx;">
						<text v-if="i == 0" class="" style="font-size: 50rpx;">{{amount1}}<text class="f-14">/ {{amount11}}</text></text>
						<text v-if="i == 1" class="" style="font-size: 50rpx;">{{amount2}}<text class="f-14">/ {{amount22}}</text></text>
						<text v-if="i == 2" class="" style="font-size: 50rpx;">{{amount3}}<text class="f-14">/ {{amount33}}</text></text>
						<view v-if="i == 3" class="j-c flex" style="font-size: 50rpx;">{{amount4}}</view>
						<text v-if="i !== 3" class="f-10">当前数量</text>
						<text v-if="i == 3" class="f-10">全网矿机数量</text>
					</view>
				</view>
			</view>
		</view>
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
			<view class="" v-if="AlertClass == 0&&hint == 'pop1'">
				<view class="column" style="width: 686rpx;background-color: #2B2D3D;padding: 22rpx 16rpx;box-sizing: border-box;border-radius: 8rpx;">
					<view class="j-c f-b flex" style="margin-bottom: 32rpx;">
						<image class="image-16"  src="../../static/open-alert/image_10.png" mode="" @tap="close"></image>
						<text class="f-18">{{title1}}</text>
						<view style="width: 48rpx;height: 40rpx;"></view>
					</view>
					<view v-if="show_title2" class="w-100 j-c flex m-b-2 f-18">ESC {{title2}}</view>
					<view v-else class="w-100 j-c flex m-b-2 f-18">ESC {{title3}}</view>
					<view class="w-100 j-c flex" style="margin-bottom: 32rpx;">当前汇率 ESC/USDT {{price}}</view>
					<view style="height: 2rpx;background-color: #FFFFFF;margin-bottom: 32rpx;"></view>
					<view style="" class="f-16 m-b-16">注意事项</view>
					<view class="flex f-c m-b-8 f-12">
						<view style="width: 8rpx;height: 8rpx;border-radius: 100%;background-color: #547CE2;"></view>
						<text class="m-l-8 flex-1">{{title4}}</text>
					</view>
					<view class="flex f-c m-b-8 f-12">
						<view style="width: 8rpx;height: 8rpx;border-radius: 100%;background-color: #547CE2;"></view>
						<text class="m-l-8 flex-1">{{title5}}</text>
					</view>
					<view class="flex f-c m-b-16 f-12">
						<view style="width: 8rpx;height: 8rpx;border-radius: 100%;background-color: #547CE2;"></view>
						<text class="m-l-8 flex-1">{{title6}}</text>
					</view>
					<view class="flex column w-100 m-b-8">
						<input v-if="show" v-model="number" class="flex-1 m-b-8" style="border: 2rpx solid #FFFFFF;height: 60rpx;border-radius: 4rpx 0 0 4rpx;padding: 0 16rpx;box-sizing: border-box;" type="number" placeholder="请输入数量">
						<input class="flex-1" v-model="pay_password" style="border: 2rpx solid #FFFFFF;height: 60rpx;border-radius: 4rpx 0 0 4rpx;padding: 0 16rpx;box-sizing: border-box;" type="text" placeholder="请输入交易密码">
						<!-- <view class="flex j-c f-c" style="width: 126rpx;height: 64rpx; border-radius: 0 4rpx 4rpx 0;background-color: #547CE2;" @tap="sureNode">确定</view> -->
					</view>
					<view class="flex w-100 column" style="align-items: flex-end;">
						<view class="flex j-c f-c" style="width: 126rpx;height: 64rpx; border-radius: 0 4rpx 4rpx 0;background-color: #547CE2;" @tap="sureNode">确定</view>
					</view>
				</view>
			</view>
			<view class="" v-if="AlertClass == 0&&hint == 'pop2'">
				<view class="column" style="height: 332rpx;width: 686rpx;background-color: #2B2D3D;padding: 22rpx 16rpx;box-sizing: border-box;border-radius: 8rpx;">
					<view class="j-c f-b flex" style="margin-bottom: 64rpx;">
						<image class="image-16" src="../../static/open-alert/image_10.png" mode="" @tap="close"></image>
						<text class="f-18">成为加速节点</text>
						<view style="width: 48rpx;height: 40rpx;"></view>
					</view>
					<view class="w-100 j-c flex f-16" style="margin-bottom: 64rpx;">创建还是加入加速节点</view>
					<view class="flex" style="justify-content: flex-end;">
						<view class="j-c f-c flex" style="width: 136rpx;height: 48rpx;border-radius: 4rpx;background-color: #547CE2;" @tap="enterJoin">加入</view>
						<view class="j-c f-c flex m-l-8" style="width: 136rpx;height: 48rpx;border-radius: 4rpx;background-color: #547CE2;" @tap="createNode(2)">创建</view>
					</view>
				</view>
			</view>
		</openAlert>
	</view>
</template>

<script>
	import { getToken , delToken } from '../../utils/userAuth.js'
	import { mapGetters } from "vuex"
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	export default {
		data() {
			return {
				boxa:true,
				boxb:false,
				boxc:false,
				coinmarket:[],
				banner:[],
				dataList: ['成为超算中心','成为超级节点','成为加速节点','接入矿池挖矿'],
				url: ['kc/super_center_node/become','kc/super_node/become','kc/edge_node/become'],
				contentList: ['成为超算中心节点？','成为超级节点？','成为加速节点？'],
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				hint:'err',
				tabClick: 0,
				amount1: 0,
				amount2: 0,
				amount3: 0,
				amount4: 0,
				amount11: 0,
				amount22: 0,
				amount33: 0,
				show: false,
				pay_password: "",
				number: "",
				dataMsg: [],//基础设置信息
				show_title2: true,
				status: false,
				title1: "",
				title2: "",
				title3: "",
				title4: "",
				title5: "",
				title6: "",
			}
		},
		onLoad() {
			this.$store.dispatch('setCoinSet')
			this.getSetting();
		},
		onShow() {
			this.$store.dispatch('setUserInfo')
			this.$store.dispatch('setCoinInfo')
			this.getbanner();
			this.getMsg();
		},
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			}),
			price() {
				let list = uni.getStorageSync('coininfo');
				let index = list.findIndex(x=>x.EnName == 'ESC');
				return parseFloat(list[index].Price).toFixed(4);
			}
		},
		methods: {
			async getMsg() {//节点信息
				let res = await this.$myRequest({
					url: 'kc/node/info'
				});
				if(res.data.code == 200) {
					this.dataMsg = res.data.data;
					this.amount1 = this.dataMsg.super_center_node.amount;
					this.amount11 = this.dataMsg.super_center_node.max_amount;
					this.amount2 = this.dataMsg.super_node.amount;
					this.amount22 = this.dataMsg.super_node.max_amount;
					this.amount3 = this.dataMsg.edge_node.amount;
					this.amount33 = this.dataMsg.edge_node.max_amount;
					this.amount4 = this.dataMsg.machine;
				}
			},
			async getbanner() {//轮播图
				let res = await this.$myRequest({
					url: 'banner'
				});
				if(res.data.code == 200) {
					this.banner = res.data.data
				}
			},
			async getSetting() {//基础信息
				let res = await this.$myRequest({
					url: 'kc/setting'
				});
				if(res.data.code == 200) {
					this.dataMsgs = res.data.data;
					uni.setStorage({
						key: "settingMsg",
						data: res.data.data
					})
				}
			},
			exchange(){//兑换母币
				uni.switchTab({
					url: '/pages/notice/notice'
				})
			},
			enterApply() {//申请激活码
				uni.navigateTo({
					url: '/pages/index/apply'
				})
			},
			apply(i) {
				if(this.userInfo.is_pay_password != 1){
					this.hint = 'pay';
					this.open(0, 'center');
					return
				};
				if(i == 0) {
					this.show_title2 = true;
					this.hint = 'pop1';
					this.title1 = '成为超算中心节点';
					this.title2 = (parseFloat(this.dataMsgs.super_center_node_price)/this.price).toFixed(4);
					this.title4 = '成为超算中心，需要一次性销毁300万等值的ESC就能成为9个超算中心之一，享受全网10%的挖矿奖励。';
					this.title5 = '享受超算池终生奖励。同时可以无条件成为超级节点资格，享受超级节点算力接入奖励。';
					this.title6 = '申请成功后，将无法撤销，销毁的ESC进入黑洞合约地址，请慎重考虑。';
					this.open(0,'center');
					this.tabClick = i;
				}else if(i == 1) {
					this.show_title2 = true;
					this.hint = 'pop1';
					this.title1 = '成为超级节点';
					this.title2 = (parseFloat(this.dataMsgs.super_node_price)/this.price).toFixed(4);
					this.title4= '一次性销毁100万等值的ESC即可成为全网15个超级节点之一，享受全网6%的挖矿奖励。';
					this.title5 = '超级节点以全网接入矿机的存力进行挖矿排名，你的存力阵营占比越大，那么对应的爆块率也是最高的。';
					this.title6 = '申请成功后，将无法撤销，销毁的ESC进入黑洞合约地址，请慎重考虑。';
					this.open(0,'center');
					this.tabClick = i;
				}else if(i == 2) {
					this.hint = 'pop2';
					this.show = true;
					this.open(0,'center');
					this.tabClick = i;
				}else {
					uni.navigateTo({
						url: '/pages/mine/joinNode'
					})
				}
			},
			createNode(i) {
				this.show_title2 = false;
				this.hint = 'pop1';
				this.title1 = '成为加速节点';
				// this.title2 = ((parseFloat(this.dataMsgs.edge_node_price)*parseFloat(this.dataMsgs.edge_node_main_min_price_rate))/this.price).toFixed(4);
				this.title3 = this.dataMsgs.edge_node_price;
				this.title4 = '质押10万个ESC就成为全网50个节点之一，参与加速节点池的全网4%挖矿奖励的加权分配。';
				this.title5 = '节点创建者最低量以40000个ESC起投，矿工加入节点矿池最低1000个ESC，可以随存随取，创建者必须低于49%才能解散矿池。';
				this.title6 = '解散矿池后，参与节点质押挖矿的ESC原路退回。';
				this.open(0,'center');
				this.tabClick = i;
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
			sureNode() {
				if(this.tabClick == 0) {
					if(!this.pay_password) {
						_toast('请输入交易密码');
						return
					}
					if(!this.status) {
						this.status = true;
						this.applyNode(this.tabClick);//成为超算中心
					}
				}else if(this.tabClick == 1) {
					if(!this.pay_password) {
						_toast('请输入交易密码');
						return
					};
					if(!this.status) {
						this.status = true;
						this.edge_node(this.tabClick);//成为超级节点
					}
				}else {
					if(!this.number) {
						_toast('请输入数量');
						return
					};
					if(!this.pay_password) {
						_toast('请输入交易密码');
						return
					};
					if(!this.status) {
						this.status = true;
						this.AddNode(this.tabClick);//成为边缘加速节点
					};
				}
			},
			async applyNode(i) {
				let res = await this.$myRequest({
					url: this.url[i],
					method: 'POST',
					data: {
						pay_password: this.pay_password
					}
				});
				if(res.data.code == 200) {
					_toast(res.data.message);
					this.pay_password = "";
					this.getMsg();
					this.close();
				}else {
					_toast(res.data.message)
				};
				this.status = false;
			},
			async edge_node(i) {
				let res = await this.$myRequest({
					url: this.url[i],
					method: 'POST',
					data: {
						pay_password: this.pay_password
					}
				});
				if(res.data.code == 200) {
					this.pay_password = "";
					this.getMsg();
					this.close();
					_toast(res.data.message)
				}else {
					_toast(res.data.message)
				};
				this.status = false;
			},
			async AddNode(i) {
				let res = await this.$myRequest({
					url: this.url[i],
					method: 'POST',
					data: {
						amount: this.number,
						pay_password: this.pay_password
					}
				});
				if(res.data.code == 200) {
					this.show_title2 = true;
					this.number = "";
					this.pay_password = "";
					this.getMsg();
					this.close();
					_toast(res.data.message)
				}else {
					_toast(res.data.message)
				};
				this.status = false;
			},
			enterJoin() {//进入加入加速节点页
			this.close();
				uni.navigateTo({
					url: '/pages/mine/addNodeAccelerate'
				})
			}
		}
	}
</script>

<style>
	@import url("../../common/css/index.css");
	@import url("../../common/css/resonance.css");
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.w-100 {
		width: 100%;
	}
	.flex {display: flex;}
	.p-16 {
		padding: 32rpx;
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
	
	.image-16 {
		width: 32rpx;
		height: 32rpx;
	}
	.image-20 {width: 40rpx;height: 40rpx;}
	
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
	.f-16 {font-size: 32rpx;}
	.f-12 {font-size: 24rpx;}
	.f-10 {
		font-size: 20rpx;
	}
	
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
	.m-l-8 {margin-left: 16rpx;}
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
