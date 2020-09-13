<template>
	<view class="p-16 f-14 column">
		<view class="b-2B2D3D m-b-8 b-r-2" style="padding: 12rpx 16rpx;box-sizing: border-box;" v-for="(item,i) in dataList" :key="i">
			<view class="flex-1 f-b m-l-8">
				<view class="column">
					<text class="f-12 m-b-2">矿机编号 : {{item.sn}}</text>
					<text class="f-14 m-b-2 c-547CE2">{{item.output}}<text class="f-10 m-l-8">ESC</text></text>
				</view>
				<view class="column f-b">
					<text class="f-12">日期: {{item.created_at.slice(0,10) || ""}}</text>
					<text class="f-12">在线: {{item.runtime}}小时 </text>
				</view>
			</view>
		</view>
		<view class="j-c" style="margin: 32rpx 0;">{{text}}</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getMsg('data');
		},
		data() {
			return {
				scrollH: 0,
				content_top: 0,
				dataList: [],
				page: 1,
				text: "",
				loading: false
			}
		},
		onReachBottom() {
			if(this.text == '上拉加载更多') {
				this.page ++;
				this.text = '加载中...'
				this.getMsg();
			}
		},
		methods: {
			async getMsg(options) {
				let message = "";
				if(options) {
					message = '加载中';
				};
				let res = await this.$myRequest({
					url: 'kc/machine_output',
					message,
					data: {
						page: this.page,
						count: 20
					}
				});
				if(res.data.code == 200) {
					if(res.data.data.total == 0) {
						this.text = '这里什么都没有哦';
						return;
					};
					this.dataList = [...this.dataList,...res.data.data.data];
					if(this.dataList.length < res.data.data.total) {
						this.text = '上拉加载更多';
					};
					if(this.dataList.length == res.data.data.total) {
						this.text = '没有更多了';
					};
					this.dataList.forEach((item,i)=> {
						item.output = parseFloat(item.output).toFixed(4);
					})
				}
			},
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
	.input {height: 64rpx;border-radius: 28rpx;padding: 0 20rpx; box-sizing: border-box;}
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
