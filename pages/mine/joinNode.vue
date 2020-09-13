<template>
	<view class="f-14 column">
		<!-- 顶部 -->
		<view class="b-547CE2 column j-c m-b-16" style="padding: 16rpx 32rpx;box-sizing: border-box;height: 124rpx;">
			<view class="f-c"  style="margin-bottom: 12rpx;">
				<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;" ></view>
				<view class="f-12 m-l-8 flex-1">激活矿机需要参照ESC白皮书的矿机配置，并购买激活码。</view>
			</view>
			<view class="f-c">
				<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;" ></view>
				<view class="m-l-8 f-12 flex-1">接入的矿机激活需要销毁2900USDT等值的ESC，销毁的ESC将会进入黑洞地址，请谨慎转入。</view>
			</view>
		</view>
		<view class="p-x-16 column">
			<!-- 矿机激活码 -->
			<view class="p-16 b-2B2D3D column m-b-16 b-r-2">
				<text class="m-b-16 f-16">矿机激活码</text>
				<view>
					<input type="text" class="flex-1" v-model="input1" placeholder="请输入或扫描矿机激活码">
					<image class="image-16" src="../../static/open-alert/image_8.png" mode="" @tap="saomiao"></image>
				</view>
				<view style="height: 2rpx;margin-top: 8rpx;background-color: #FFFFFF;"></view>
			</view>
			<!-- 矿池节点 -->
			<view class="p-16 b-2B2D3D column m-b-16 b-r-2">
				<text class="m-b-16 f-16">矿池节点</text>
				<picker class="w-100" mode="selector" :range="classify" @change="select_type">
					<view class="w-100 f-b j-c">
						<text class="f-14">{{input2}}</text>
						<image class="image-16" src="../../static/open-alert/image_7.png" mode=""></image>
					</view>
				</picker>
				<view style="height: 2rpx;margin-top: 8rpx;background-color: #FFFFFF;"></view>
			</view>
			<!-- 激活挖矿 -->
			<view class="p-16 b-2B2D3D column m-b-16 b-r-2">
				<text class="m-b-16 f-16">激活挖矿</text>
				<view class="m-b-2 f-14">ESC {{number}}</view>
				<view class="f-14">当前汇率 ESC/USDT {{price}}</view>
			</view>
			<!-- 支付密码 -->
			<view class="p-16 b-2B2D3D column m-b-16 b-r-2">
				<text class="m-b-16 f-16">支付密码</text>
				<view>
					<input type="text" class="flex-1" v-model="input3" placeholder="请输入支付密码">
				</view>
				<view style="height: 2rpx;margin-top: 8rpx;background-color: #FFFFFF;"></view>
			</view>
			
		</view>
		<view style="height: 96rpx;margin-top: 60rpx;" class="p-x-16 w-100">
			<view style="border-radius: 8rpx;font-size: 32rpx;" class="j-c f-c w-100 b-2B2D3D" @tap="joinSuperNode">确定接入</view>
		</view>
		<view class="column f-c" style="margin-top: 60rpx">
			<text class="f-12 m-b-8" @tap="enter(1)">没有激活码 ? <text class="c-547CE2 m-l-8">去申请</text></text>
			<!-- <text class="f-12" @tap="enter(2)">没有母币 ? <text class="c-547CE2 m-l-8">去兑换</text></text> -->
		</view>
	</view>
</template>

<script>
	import { _toast } from "../../utils/common"
	
	export default {
		onLoad() {
			this.getSuperNode();
		},
		data() {
			return {
				input1: "",
				input2: "请选择矿池节点",
				input3: "",
				classify: [],
				NodeList: [],
				super_node: "",//超级节点ID
				status: false,
			}
		},
		computed: {
			dataMsg() {
				return uni.getStorageSync('settingMsg');
			},
			price() {
				let list = uni.getStorageSync('coininfo');
				let index = list.findIndex(x=>x.EnName == 'ESC');
				return parseFloat(list[index].Price).toFixed(4);
			},
			number() {
				return (parseFloat(this.dataMsg.activation_price)/this.price).toFixed(4)
			}
		},
		methods: {
			async getSuperNode() {//超级节点列表
				let res = await this.$myRequest({
					url: 'kc/super_node'
				});
				if(res.data.code == 200) {
					this.NodeList = res.data.data;
					this.NodeList.forEach((item,i)=> {
						this.classify.push(item.username)
					});
				}
			},
			saomiao() {
				uni.scanCode({
					success: (res) => {
						this.input1 = res.result;
					}
				})
			},
			select_type(e) {//选择超级节点
				this.input2 = this.classify[e.detail.value];
				this.super_node = this.NodeList[e.detail.value].id;
			},
			joinSuperNode() {
				if(!this.input1) {
					_toast("激活码不能为空");
					return
				};
				if(this.input2 == '请选择矿池节点') {
					_toast("请选择矿池节点");
					return
				};
				if(!this.input2) {
					_toast("矿池不能为空");
					return
				};
				if(!this.input3) {
					_toast("支付密码不能为空");
					return
				};
				if(!this.status) {
					_toast("接入中")
					this.status = true;
					this.getActivating();
				}
			},
			async getActivating() {//激活矿机
				let res = await this.$myRequest({
					url: 'kc/activating',
					method: 'POST',
					data: {
						hash: this.input1,
						super_node: this.super_node,
						pay_password: this.input3
					}
				});
				if(res.data.code == 200) {
					_toast('矿机接入成功');
					setTimeout(()=> {
						uni.navigateBack()
					},1000)
				}else {
					_toast(res.data.message)
				};
				this.status = false;
			},
			enter() {
				uni.navigateTo({
					url: '../index/apply'
				})
			},
			select_type1(e) {
				console.log(e.detail.value)
			}
		}
	}
</script>

<style scoped>
	view {
		display: flex;
	}
	.top {height: 240rpx;border-radius: 4rpx;}
	
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
	.f-16 {font-size: 32rpx;}
	.f-14 {
		font-size: 28rpx;
	}

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
