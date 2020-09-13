<template>
	<view class="content">
		<view class="head_iconbox" @click="changeimg">
			<image class="head_icon" src="../../static/img/lbx.png" mode="aspectFill"></image>
			<view class="boxF">
				<view class="boxS">
					<view class="boxT">
						<image class="head" :src="userInfo.avatar?userInfo.avatar:'../../static/img/head.png'" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="mart" @click="changeimg">点击修改头像</view>
		
		<!-- <view class="flex_center f_j_b nc_boxa">
			<view class="font_mon">昵称：</view>
			<input type="text" class="text_right" v-model="name" placeholder="请输入昵称"/>
			
			<view class="xaina"></view>
			<view class="xian"></view>
		</view> -->
		<view class="bt_tuichu" @click="loginout">退出登录</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { _toast } from "../../utils/common"
	
	export default {
		onLoad() {
			this.getQnToken();
		},
		data() {
			return {
				qnToken: '',
				qnUrl: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			async getQnToken() {
				let res = await this.$myRequest({
					url: 'upload/token'
				});
				if(res.data.code == 200) {
					this.qnToken = res.data.data.token;
					this.qnUrl = res.data.data.upload_url;
				}
			},
			changeimg(){
				uni.chooseImage({
					count: 1,
					success: chooseRes => {
						const tempFilePaths = chooseRes.tempFilePaths;
						uni.showLoading({
							title: "上传中"
						});
						uni.uploadFile({
							url: this.qnUrl,
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {token: this.qnToken},
							success: res => {
								if(res.statusCode == 200){
									if (typeof res.data == "string") res.data = JSON.parse(res.data);
									uni.hideLoading();
									this.getEdit(res.data.key);//修改头像
								}else{
									uni.hideLoading();
									_toast('上传失败')
								}
							},
							fail: (err) => {
								uni.hideLoading();
								_toast('上传失败')
							}
						})
					}
				});
			},
			async getEdit(avator) {
				let res = await this.$myRequest({
					url: 'user/edit',
					method: "POST",
					data: {
						avatar: avator
					}
				});
				if(res.data.code == 200) {
					_toast('设置成功')
					this.$store.dispatch('setUserInfo');//用户信息
				}
			},
			loginout() {
				_toast('退出中');
				uni.clearStorage();
				setTimeout(()=> {
					uni.reLaunch({
						url: '/pages/start/start'
					})
				},1000)
			}
		}
	}
</script>

<style>
	@import url("../../common/css/userinfo.css");
.bt_tuichu{
	position: fixed;
	bottom: 40rpx;
	width: 686rpx;
	height: 80rpx;
	border-radius: 4rpx;
	text-align: center;
	line-height: 80rpx;
	background:rgba(43,45,61,1);
	box-shadow:0px 0px 12rpx 0px rgba(0,0,0,0.5);
}
</style>
