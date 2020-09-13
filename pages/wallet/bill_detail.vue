<template>
	<view>
		<view class="content" v-if="detail.type_id == 1">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						提现明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx;">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.tx_type}}{{detail.amount}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list"  v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">手续费</view>
					<view class="font_mon text_right">{{detail.ext.Fee}}</view>
				</view>
				<!-- 				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">手续费率</view>
					<view class="font_max text_right">{{}}</view>
				</view> -->
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">发起时间</view>
					<view class="font_mon text_right">{{detail.created_at}}</view>
				</view>
				<!-- <view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单编号</view>
					<view class="font_mon text_right">{{detail.bill_sn}}</view>
				</view> -->
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list" v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">收款地址</view>
					<text class="font_max text_right flex" style="flex: 1;margin-left: 32rpx;" @tap="copy(detail.ext.Address)">{{detail.ext.Address | addressText}}</text>
				</view>
				<!-- 				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">转出地址</view>
					<view class="font_max text_right">0.10%0x157457fada3…</view>
				</view> -->
				<view class="flex_start f_j_b list" v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">交易Hash</view>
					<text class="font_max text_right flex" style="flex: 1;margin-left: 32rpx;" @tap="copy(detail.ext.Hash)">{{detail.ext.Hash | addressText}}</text>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.status_names}}</view>
				</view>
			</view>
			<!-- <view class="nr_box content">
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">往来记录</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">联系客服</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
			</view> -->
		</view>
		<view class="content" v-if="detail.type_id == 2">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						充值明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx;">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.tx_type}}{{detail.amount}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">充值时间</view>
					<view class="font_max text_right">{{detail.created_at}}</view>
				</view>
			</view>
			<view class="nr_box content">

				<view class="flex_start f_j_b list" v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">转入地址</view>
					<text class="font_max text_right flex" style="flex: 1;margin-left: 32rpx;" @tap="copy(detail.ext.Address)">{{detail.ext.Address | addressText}}</text>
				</view>
				<view class="flex_start f_j_b list" v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">交易Hash</view>
					<text class="font_max text_right flex" style="flex: 1;margin-left: 32rpx;" @tap="copy(detail.ext.Hash)">{{detail.ext.Hash | addressText}}</text>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.status_names}}</view>
				</view>
			</view>
		</view>
		<view class="content" v-if="detail.type_id == 3">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						转账明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.tx_type}}{{detail.amount}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list" v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">手续费</view>
					<view class="font_mon text_right">{{detail.ext.fee}}</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">交易时间</view>
					<view class="font_max text_right">{{detail.created_at}}</view>
				</view>
				<view class="flex_start f_j_b list" v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">收款账户</view>
					<view class="font_max text_right">{{detail.ext.recv_account}}</view>
				</view>
			</view>
			<view class="nr_box content">
			<!-- 	<view class="flex_start f_j_b list" v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">转出地址</view>
					<text class="font_max text_right flex" style="flex: 1;margin-left: 32rpx;" selectable="true">{{detail.ext.Address}}</text>
				</view> -->
				<!-- <view class="flex_start f_j_b list" v-if="detail.ext">
					<view class="font_max" style="opacity: 0.65;">交易Hash</view>
					<text class="font_max text_right flex" style="flex: 1;margin-left: 32rpx;" selectable="true">{{detail.ext.Hash}}</text>
				</view> -->
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.status_names}}</view>
				</view>
			</view>
		</view>
		<view class="content" v-if="detail.type_id == 4">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						共振明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx;">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.amount}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">共振时间</view>
					<view class="font_max text_right">{{detail.created_at}}</view>
				</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.status_names}}</view>
				</view>
			</view>
		</view>
		
		<view class="content" v-if="detail.type_id != 3 && detail.type_id != 1 && detail.type_id != 2 && detail.type_id != 4">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx;">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.tx_type}}{{detail.amount}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">交易时间</view>
					<view class="font_max text_right">{{detail.created_at}}</view>
				</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.status_names}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		navigateTo,
		loginNavigateTo,
		_toast,
		reLaunch
	} from "../../utils/common"
	import { mapGetters } from "vuex"
	
	export default {
		data() {
			return {
				id: '',
				detail: ''
			}
		},
		computed: {
			...mapGetters({
				coinset:"coinset",
			})
		},
		filters: {
			addressText(value) {
				return value.slice(0,13) + '...';
			}
		},
		onLoad(e) {
			this.id = e.id;
			let value = uni.getStorageSync('screenList')
			this.screenList = value;
			this.getdetail();
		},
		methods: {
			copy(e) {
				uni.setClipboardData({
					data: e,
					success: function () {
						_toast("复制成功");
					}
				});
			},
			back() {
				uni.navigateBack({})
			},
			async getdetail() {
				let res = await this.$myRequest({
					url: 'coins/logs/detail',
					data: {
						log_id: this.id
					}
				});
				if(res.data.code == 200) {
					this.detail = res.data.data;
					let index = this.coinset.findIndex(x=>x.EnName == this.detail.coin_name);
					this.detail.logo = this.coinset[index].Logo;
					let index2 = this.screenList.findIndex(x=>x.id == this.detail.type_id);
					this.detail.status_names = this.screenList[index2].name;
				}
			},
			gokefu(){
				navigateTo('user/kefu')
			},
		}
	}
</script>

<style>
	@import url("../../common/css/bill_detail.css");
</style>
