<template>
	<view class="f-14 p-16 column">
		<view class="column m-b-16" v-for="(item,i) in dataList" :key="i">
			<view style="height: 80rpx;border-radius: 4rpx 4rpx 0 0;" class="b-547CE2 f-c p-x-16">加速节点编号: {{item.sn}}</view>
			<view class="column b-2B2D3D p-16" style="border-radius: 0 0 4rpx 4rpx;">
				<view class="f-b j-c" style="margin-bottom: 24rpx;">
					<view>
						<image v-if="item.avatar !== null" class="image-32" :src="item.avatar" mode=""></image>
						<image v-else class="image-32" src="../../static/img/head.png" mode=""></image>
						<view class="column m-l-8">
							<text class="m-b-2">{{item.username}}</text>
							<view style="width: 96rpx;height: 32rpx;border-radius: 18rpx;" class="b-547CE2 f-10 j-c f-c">发起人</view>
						</view>
					</view>
					<view class="column f-10" style="align-items: flex-end;">
						<text>{{item.user_number}}人</text>
						<text>当前成员数</text>
					</view>
				</view>
				<view class="f-b m-b-8">
					<text>质押总量{{item.edge_node_price}}ESC</text>
					<text>已质押{{item.total}}ESC</text>
				</view>
				<view style="height: 16rpx;background-color: #1F2031;border-radius: 8rpx;margin-bottom: 8rpx;">
					<view :style="{ width: item.rate + '%' }" style="height: 100%;border-radius: 8rpx;" class="b-547CE2"></view>
				</view>
				<view class="w-100 f-10 m-b-8 column" style="align-items: flex-end;">
					<text >已达成 {{item.rate}}%</text>
				</view>
				<view style="height: 2rpx;background-color: #000000;" class="m-b-8"></view>
				<view style="justify-content: flex-end;">
					<view style="width: 160rpx; height: 48rpx;border-radius: 4rpx;" class="b-547CE2 j-c f-c" @tap="join(i)">加入</view>
				</view>
			</view>
		</view>
		<view v-if="show" class="f-10 j-c" style="margin-top: 60rpx;">暂无加速节点</view>
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			<view class="" v-if="AlertClass == 0&&hint == 'pop1'">
				<view class="column" style="width: 686rpx;background-color: #2B2D3D;padding: 22rpx 16rpx;box-sizing: border-box;border-radius: 8rpx;">
					<view class="j-c f-b flex" style="margin-bottom: 32rpx;">
						<image class="" style="width: 24rpx;height: 24rpx;" src="../../static/open-alert/image_10.png" mode="" @tap="close"></image>
						<text class="f-18">{{title1}}</text>
						<view style="width: 48rpx;height: 40rpx;"></view>
					</view>
					<!-- <view class="w-100 j-c flex m-b-2">ES {{title2}}</view> -->
					<view class="w-100 j-c flex" style="margin-bottom: 32rpx;">当前汇率 ESC/USDT {{price}}</view>
					<view style="height: 2rpx;background-color: #FFFFFF;margin-bottom: 32rpx;"></view>
					<text style="margin-bottom: 32rpx;" class="f-16">注意事项</text>
					<view class="flex f-c m-b-8">
						<view style="width: 8rpx;height: 8rpx;border-radius: 100%;background-color: #547CE2;"></view>
						<text class="m-l-8">矿工加入节点矿池最低需要{{title2}}个ESC，可以随存随取。</text>
					</view>
					<view class="flex f-c m-b-16">
						<view style="width: 8rpx;height: 8rpx;border-radius: 100%;background-color: #547CE2;"></view>
						<text class="m-l-8">退出节点或矿池解散后，参与加速节点质押挖矿的ESC原路退回。</text>
					</view>
					<view class="flex column w-100 m-b-8">
						<input v-model="number" class="flex-1 m-b-8" style="border: 2rpx solid #FFFFFF;height: 60rpx;border-radius: 4rpx 0 0 4rpx;padding: 0 16rpx;box-sizing: border-box;" type="number" placeholder="请输入数量">
						<input class="flex-1" v-model="pay_password" style="border: 2rpx solid #FFFFFF;height: 60rpx;border-radius: 4rpx 0 0 4rpx;padding: 0 16rpx;box-sizing: border-box;" type="text" placeholder="请输入交易密码">
						<!-- <view class="flex j-c f-c" style="width: 126rpx;height: 64rpx; border-radius: 0 4rpx 4rpx 0;background-color: #547CE2;" @tap="sureNode">确定</view> -->
					</view>
					<view class="flex w-100 column" style="align-items: flex-end;">
						<view class="flex j-c f-c" style="width: 126rpx;height: 64rpx; border-radius: 0 4rpx 4rpx 0;background-color: #547CE2;" @tap="sureNode">确定</view>
					</view>
				</view>
			</view>
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import { _toast } from "../../utils/common"
	
	export default {
		onLoad() {
			this.getList();
		},
		data() {
			return {
				dataList: [],
				status: false,
				pro:false,
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				hint:'err',
				pay_password: "",
				number: "",
				show: false,
				id: "",
			}
		},
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			}),
			dataMsg() {
				return uni.getStorageSync('settingMsg');
			},
			price() {
				let list = uni.getStorageSync('coininfo');
				let index = list.findIndex(x=>x.EnName == 'ESC');
				return parseFloat(list[index].Price).toFixed(4);
			}
		},
		methods: {
			async getList() {//加速节点列表
				let res = await this.$myRequest({
					url: 'kc/edge_node',
					message: "加载中"
				});
				if(res.data.code == 200) {
					this.dataList = res.data.data;
					if(this.dataList.length == 0) {
						this.show = true;
						return;
					};
					this.dataList.forEach((item,i)=> {
						item.edge_node_price = parseFloat(item.edge_node_price).toFixed(4);
						item.total = parseFloat(item.total).toFixed(4);
						item.proportion = parseFloat(item.total)/parseFloat(item.edge_node_price)*100;
						item.rate = parseFloat(item.rate)*100;
					});
				}
			},
			join(i) {
				this.hint = 'pop1';
				this.title1 = '加入加速中心节点';
				this.title2 = this.dataMsg.edge_node_min_join;
				this.open(0,'center');
				this.id = this.dataList[i].id;
			},
			sureNode() {
				if(!this.status) {
					this.status = true;
					this.JoinNode();
				}
			},
			async JoinNode() {
				let res = await this.$myRequest({
					url: 'kc/edge_node/join',
					message: "加入中",
					method: 'POST',
					data: {
						edge_node: this.id,
						amount: this.number,
						pay_password: this.pay_password
					}
				});
				if(res.data.code == 200) {
					this.close();
					this.pay_password = "";
					this.number = "";
					this.getList();
					_toast(res.data.message);
					setTimeout(()=> {
						uni.navigateBack()
					},1000)
				}else {
					_toast(res.data.message)
				};
				this.status = false;
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
			close() {
				this.pay_password = "";
				this.number = "";
				this.$refs.openAlert.Close();
			},
		}
	}
</script>

<style scoped>
	@import url("../../common/css/resonance.css");
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
</style>
