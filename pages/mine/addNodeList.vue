<template>
	<view class="f-14 p-x-16 column">
		<!-- 顶部 -->
		<view class="b-2B2D3D top f-12 column f-c j-c w-100 m-b-8">
			<text class="m-b-8">加速节点累计总收益</text>
			<text class="f-24 m-b-8">{{income}}</text>
			<!-- <text>≈0.00 CNY</text> -->
		</view>
		<view class="f-b w-100 m-b-16">
			<view class="b-2B2D3D j-c f-c column" style="height: 144rpx;width: 336rpx;border-radius: 4rpx;">
				<text class="f-24">{{number}}</text>
				<text class="f-12">矿机总数</text>
			</view>
			<view class="b-2B2D3D j-c f-c column" style="height: 144rpx;width: 336rpx;border-radius: 4rpx;">
				<text class="f-24">{{machine_pow}}<text class="f-10" style="margin-left: 16rpx;">T</text></text>
				<text class="f-12">节点总算力</text>
			</view>
		</view>
		<!-- 矿机矿机 -->
		<view class="column">
			<view style="height: 32rpx;"></view>
			<view class="b-547CE2 f-b f-c p-x-16 top_title">
				<text>矿机</text>
				<image class="image-16" src="../../static/open-alert/image_3.png" mode="" @tap="joinNode"></image>
			</view>
			<view class="column">
				<view :class="i == dataList.length-1?'b-r-16':''" class="column b-2B2D3D m-b-2" style="padding: 16rpx 32rpx 0;box-sizing: border-box;"
				 v-for="(item,i) in dataList" :key="i">
					<view class="f-b">
						<text class="m-b-8 f-14">{{item.sn}}</text>
						<text class="c-547CE2">累计收益 <text class="f-18" style="margin: 0 8rpx;">{{parseFloat(item.income).toFixed(4)}}</text> ESC</text>
					</view>
					<view class="f-b">
						<view>
							<image class="image-50" :src="item.kj_images" mode=""></image>
							<view class="column f-10 c-AEA j-c" style="margin-left: 16rpx;">
								<text class="m-b-8">矿机算力</text>
								<text>当前状态</text>
							</view>
						</view>
						<view class="column j-c" style="align-items: flex-end;">
							<text class="m-b-8">{{item.pow}}</text>
							<text v-if="item.status == 0" style="color: #E05750;">离线中</text>
							<text v-if="item.status == 1" style="color: #7FEF9D;">挖矿中</text>
						</view>
					</view>
					<view style="height: 16rpx;"></view>
				</view>
			</view>
		</view>
		<view class="j-c" style="margin: 32rpx 0;">{{text}}</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getList("data");
		},
		data() {
			return {
				income: 0,
				number: 0,
				machine_pow: 0,
				dataList: [],
				page: 1,
				text: "",
			}
		},
		onReachBottom() {
			if(this.text == '上拉加载更多') {
				this.page ++;
				this.text = '加载中...';
				this.getList();
			}
		},
		methods: {
			async getList(options) {//节点矿机列表
				let message = "";
				if(options) {
					message = "加载中"
				};
				let res = await this.$myRequest({
					url: 'kc/node_machine',
					message,
					data: {
						page: this.page,
						count: 20
					}
				});
				if(res.data.code == 200) {
					this.income = parseFloat(res.data.data.income).toFixed(4);
					this.number = res.data.data.machine_number;
					this.machine_pow = res.data.data.machine_pow;
					if(this.number == 0) {
						this.text = '这里什么都没有哦';
						return;
					};
					this.dataList = [...this.dataList,...res.data.data.machine];
					if(this.dataList.length < this.number) {
						this.text = '上拉加载更多';
					};
					if(this.dataList.length == this.number) {
						this.text = '没有更多了';
					};
				}
			},
			joinNode() {
				uni.navigateTo({
					url: '/pages/mine/joinNode'
				})
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
