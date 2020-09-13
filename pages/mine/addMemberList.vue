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
				<text class="f-24">{{user_number}}</text>
				<text class="f-12">成员人数</text>
			</view>
			<view class="b-2B2D3D j-c f-c column" style="height: 144rpx;width: 336rpx;border-radius: 4rpx;">
				<text class="f-16">{{amount_coin}}</text>
				<text class="f-12">质押总量</text>
			</view>
		</view>
		<!-- 活跃中 、已退出 列表-->
		<view class="b-2B2D3D f-b" style="height: 80rpx;border-radius: 4rpx 4rpx 0 0;">
			<view class="flex-1" v-for="(item,i) in selectList" :key="i" @tap="select(i)">
				<view class="f-14 w-100 j-c f-c" :class="i == tabClick?'c-547CE2 bor-b-1':'bor-b-0'">{{item}} ( {{dataList3[i]}} )</view>
			</view>
		</view>
		<view class="p-16 b-b f-b j-c m-b-2 b-2B2D3D" v-for="(item,i) in dataList" :key="i">
			<view>
				<image v-if="item.avatar !== ''" class="image-32" :src="item.avatar" mode=""></image>
				<image v-else class="image-32" src="../../static/open-alert/head.png" mode=""></image>
				<view class="column m-l-8 j-c">
					<text>{{item.username}}</text>
				</view>
			</view>
			<view class="column" style="align-items: flex-end;">
				<text class="f-12 m-b-2">{{parseFloat(item.devote).toFixed(4)}}</text>
				<text class="f-10">质押数量</text>
			</view>
		</view>
		<!-- <view style="height: 132rpx;"></view> -->
		<!-- <view style="height: 100rpx;background-color: #1F2031;position: fixed;bottom: 0;left: 0;right: 0;" class="p-x-16">
			<view style="border-radius: 8rpx;font-size: 32rpx;height: 68rpx;" class="b-547CE2 j-c f-c w-100">招募成员</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getList();
		},
		data() {
			return {
				selectList: ['活跃中','已退出'],
				tabClick: 0,
				dataList: [],
				dataList1: [],
				dataList2: [],
				dataList3: [],
				user_number: "",
				income: "",
				amount_coin: "",
			}
		},
		methods: {
			async getList() {
				let res = await this.$myRequest({
					url: 'kc/edge_node_user',
					message: "加载中"
				});
				if(res.data.code == 200) {
					this.income = res.data.data.income;
					this.user_number = res.data.data.user_number;
					this.amount_coin = parseFloat(res.data.data.amount_coin).toFixed(4);
					this.dataList1 = res.data.data.active_users;
					this.dataList2 = res.data.data.quit_users;
					this.dataList = this.dataList1;
					this.dataList3 = [this.dataList1.length,this.dataList2.length];
				}
			},
			select(i) {
				this.tabClick = i;
				if(this.tabClick == 0) {
					this.dataList = this.dataList1;
				}else {
					this.dataList = this.dataList2;
				}
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
