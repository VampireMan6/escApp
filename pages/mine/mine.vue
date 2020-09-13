<template>
	<view class="f-14 flex column" style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;">
		<scroll-view scroll-y="true" :style="{ height: scrolleight + 'px',marginTop: content_top + 'px'}" @scrolltolower="loadingmore">
			<view class="p-16 column flex" :style="AlertShow?'filter: blur(4px);':''">
				<!-- 顶部 累计收益 -->
				<view class="column f-c m-b-16 flex" style="height: 336rpx;position: relative;z-index: 1;">
					<image class="w-100 b-r-16" style="height: 100%;position: absolute;z-index: 2;" src="../../static/open-alert/image_4.png" mode=""></image>
					<view class="w-100 column flex f-b j-c f-c" style="height: 100%; position: absolute;z-index: 3;padding: 24rpx 32rpx 32rpx;box-sizing: border-box;">
						<view class="f-b w-100 flex">
							<text>我的累计收益</text>
							<view class="flex">
								<image class="image-20" src="../../static/open-alert/image_1.png" mode="" @tap="enterTopImg('profit')"></image>
								<!-- <image class="image-16 m-l-8" src="../../static/open-alert/image_2.png" mode="" @tap="enterTopImg('select2')"></image> -->
							</view>
						</view>
						<text class="f-24">{{myCoinNum}}<text class="f-12">ESC</text></text>
						<view class="w-100 flex">
							<view class="flex-1 flex f-c f-14 column">
								<text style="margin-bottom: 12rpx">{{dataMessage.machine_number}}</text>
								<text class="f-10">全网矿机数量</text>
							</view>
							<view class="flex-1 flex f-c f-14 column">
								<text style="margin-bottom: 12rpx">{{dataMessage.pow_amount}} <text class="">T</text></text>
								<text class="f-10">全网算力总值</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 超算中心节点 -->
				<view v-if="super_center_node.length !== 0" class="column flex">
					<view class="b-547CE2 f-b f-c p-x-16 top_title flex">
						<text>超算中心节点</text>
						<image class="image-16" src="../../static/open-alert/image_3.png" mode="" @tap="apply(0)"></image>
					</view>
					<view class="column flex">
						<view :class="i == dataList1.length-1?'b-r-16':''" class="column b-2B2D3D m-b-2 flex" style="padding: 16rpx 32rpx 0;box-sizing: border-box;"
						 v-for="(item,i) in dataList1" :key="i">
							<view class="f-b j-c flex">
								<text class="m-b-8 f-14">{{super_center_node.sn}}</text>
								<text class="c-547CE2">累计收益 <text class="f-18" style="margin: 0 8rpx;">{{coinNum1}}</text> ESC</text>
							</view>
							<view class="f-b flex">
								<view class="flex">
									<view class="column flex f-14 c-AEA f-b">
										<text>创建时间</text>
										<text>收益比例</text>
										<text>全网数量</text>
									</view>
								</view>
								<view class="column flex f-14" style="align-items: flex-end;">
									<text>{{time1}}</text>
									<text>{{super_center_node.rate}}</text>
									<text>{{super_center_node.amount}}</text>
								</view>
							</view>
							<view style="height: 16rpx;"></view>
						</view>
					</view>
				</view>
				<!-- 超级节点 -->
				<view v-if="super_node.length !== 0" class="column flex">
					<view style="height: 32rpx;"></view>
					<view class="b-547CE2 f-b f-c p-x-16 top_title flex">
						<text>超级节点</text>
						<image class="image-16" src="../../static/open-alert/image_3.png" mode="" @tap="apply(1)"></image>
					</view>
					<view class="column flex">
						<view :class="i == dataList2.length-1?'b-r-16':''" class="column b-2B2D3D m-b-2 flex" style="padding: 16rpx 32rpx 0;box-sizing: border-box;"
						 v-for="(item,i) in dataList2" :key="i">
							<view class="f-b j-c flex">
								<text class="m-b-8 f-14">{{super_node.sn}}</text>
								<text class="c-547CE2">累计收益 <text class="f-18" style="margin: 0 8rpx;">{{coinNum2}}</text> ESC</text>
							</view>
							<view class="f-b flex">
								<view class=" flex">
									<view class="column flex f-14 c-AEA f-b">
										<text>创建时间</text>
										<text>收益比例</text>
										<text>接入数量</text>
										<text>节点总算力</text>
									</view>
								</view>
								<view class="column flex f-14" style="align-items: flex-end;">
									<text>{{time2}}</text>
									<text>{{super_node.rate}}</text>
									<text>{{super_node.amount}}</text>
									<text>{{super_node.amount_pow}}</text>
								</view>
							</view>
							<view style="justify-content: flex-end;margin: 16rpx 0" class=" flex">
								<view style="width: 136rpx;height: 48rpx;border-radius: 4rpx;" class="b-547CE2 j-c f-c flex" @tap="enterNodeList(i)">矿机列表</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 加速节点 -->
				<view v-if="edge_node.length !== 0" class="column flex">
					<view style="height: 32rpx;"></view>
					<view class="b-547CE2 f-b f-c p-x-16 top_title flex">
						<text>加速节点</text>
						<image class="image-16" src="../../static/open-alert/image_3.png" mode="" @tap="apply(2)"></image>
					</view>
					<view class="column flex">
						<view :class="i == dataList3.length-1?'b-r-16':''" class="column b-2B2D3D m-b-2 flex" style="padding: 16rpx 32rpx 0;box-sizing: border-box;"
						 v-for="(item,i) in dataList3" :key="i">
							<view class="f-b j-c flex">
								<text class="m-b-8 f-14">{{edge_node.sn}}</text>
								<text class="c-547CE2">累计收益 <text class="f-18" style="margin: 0 8rpx;">{{coinNum3}}</text> ESC</text>
							</view>
							<view class="f-b flex">
								<view class="flex">
									<view class="column flex f-14 c-AEA f-b">
										<text>创建时间</text>
										<text>收益比例</text>
										<text>全网数量</text>
										<text>质押数量</text>
										<text>成员总数</text>
										<text v-if="edge_node.status == 0">当前状态</text>
									</view>
								</view>
								<view class="column flex f-14" style="align-items: flex-end;">
									<text>{{time3}}</text>
									<text>{{edge_node.rate}}</text>
									<text>{{edge_node.amount}}</text>
									<text>{{parseFloat(edge_node.zhiya_number).toFixed(4)}}</text>
									<text>{{edge_node.user_number}}</text>
									<text v-if="edge_node.status == 0" style="color: #F2AB3E;">招募中</text>
								</view>
							</view>
							<view style="justify-content: flex-end;margin: 16rpx 0" class=" flex">
								<view style="width: 136rpx;height: 48rpx;border-radius: 4rpx;background-color: rgba(84, 124, 226, 0.32);" class="j-c f-c c-547CE2 flex" @tap="enterMemberList(1)">退出节点</view>
								<view style="width: 136rpx;height: 48rpx;border-radius: 4rpx;margin-left: 16rpx;" class="b-547CE2 j-c f-c flex" @tap="enterMemberList(2)">成员列表</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 存储矿机 -->
				<view v-if="machines.length !== 0" class="column flex">
					<view style="height: 32rpx;"></view>
					<view class="b-547CE2 f-b f-c p-x-16 top_title flex">
						<text>存储矿机</text>
						<image class="image-16" src="../../static/open-alert/image_3.png" mode="" @tap="apply(3)"></image>
					</view>
					<view class="column flex">
						<view :class="i == machines.length-1?'b-r-16':''" class="column b-2B2D3D m-b-2 flex" style="padding: 16rpx 32rpx 0;box-sizing: border-box;"
						 v-for="(item,i) in machines" :key="i">
							<view class="f-b flex">
								<text class="m-b-8 f-14">{{item.sn}}</text>
								<text class="c-547CE2">累计收益 <text class="f-18" style="margin: 0 8rpx;">{{parseFloat(item.income).toFixed(4)}}</text> ESC</text>
							</view>
							<view class="f-b flex">
								<view class=" flex">
									<image class="image-50" :src="item.info.images" mode=""></image>
									<view class="column f-14 c-AEA j-c flex" style="margin-left: 16rpx;">
										<text class="m-b-8">矿机算力</text>
										<text>当前状态</text>
									</view>
								</view>
								<view class="column j-c flex f-14" style="align-items: flex-end;">
									<text class="m-b-8">{{item.pow}}</text>
									<text v-if="item.status == 0" style="color: #E05750;">离线中</text>
									<text v-if="item.status == 1" style="color: #7FEF9D;">挖矿中</text>
								</view>
							</view>
							<view style="height: 16rpx;"></view>
						</view>
					</view>
				</view>
				<view class="" style="margin: 32rpx 0;text-align: center;">{{text}}</view>
			</view>
		</scroll-view>
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
					<view style="margin-bottom: 32rpx;" class="f-16">注意事项</view>
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
	import { _toast } from "../../utils/common"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { mapGetters } from "vuex"
	
	export default {
		onLoad() {
			try {
				let res = uni.getSystemInfoSync();
				this.statusBarH = res.statusBarHeight;
				this.scrolleight = res.windowHeight - this.statusBarH;
				this.content_top = this.statusBarH;
			} catch (e) {
				// error
			};
		},
		onShow() {
			this.page = 1;
			this.machines = [];
			this.text = "";
			this.getMyMes("data");//矿池用户信息
		},
		data() {
			return {
				statusBarH: 0, //状态栏高度
				scrolleight: 600, //屏幕高度
				content_top: 44, //内容距离顶部的高度
				dataMessage: [],
				super_center_node: [],//超算中心
				super_node: [],//超级节点
				edge_node: [],//加速节点
				machines: [],//矿机
				dataList1: [1],
				dataList2: [1],
				dataList3: [1],
				dataList: ['成为超算中心','成为超级节点','成为加速节点','接入矿池挖矿'],
				url: ['kc/super_center_node/become','kc/super_node/become','kc/edge_node/become'],
				contentList: ['成为超算中心节点？','成为超级节点？','成为加速节点？'],
				edge_nodeSelectList: [],
				classify: [],
				input1: "请选择要加入的加速节点",
				input2: "",
				edge_nodeId: "",
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				hint:'err',
				tabClick: 0,
				show: false,
				pay_password: "",
				number: "",
				show_title2: true,
				status: false,
				title1: "",
				title2: "",
				title3: "",
				title4: "",
				title5: "",
				title6: "",
				page: 1,
				text: "",
				machine_number: 0,
			}
		},
		computed: {
			myCoinNum() {
				return parseFloat(this.dataMessage.income_amount).toFixed(4)
			},
			coinNum1() {
				return parseFloat(this.super_center_node.income).toFixed(4)
			},
			coinNum2() {
				return parseFloat(this.super_node.income).toFixed(4)
			},
			coinNum3() {
				return parseFloat(this.edge_node.income).toFixed(4)
			},
			time1() {
				return (this.super_center_node.super_center_node_created_at || '').slice(0,10)
			},
			time2() {
				return (this.super_node.super_node_created_at || '').slice(0,10)
			},
			time3() {
				return (this.edge_node.edge_node_created_at || '').slice(0,10)
			},
			...mapGetters({
				userInfo: "userInfo"
			}),
			dataMsgs() {
				return uni.getStorageSync('settingMsg');
			},
			price() {
				let list = uni.getStorageSync('coininfo');
				let index = list.findIndex(x=>x.EnName == 'ESC');
				return parseFloat(list[index].Price).toFixed(4);
			}
		},
		methods: {
			async getMyMes(options) {//用户信息
				let message = "";
				if(options) {
					message = "加载中"
				};
				let res = await this.$myRequest({
					url: 'kc/info',
					message,
					data: {
						page: this.page,
						count: 20
					}
				});
				if(res.data.code == 200) {
					this.dataMessage = res.data.data;
					this.super_center_node = this.dataMessage.super_center_node;
					this.super_node = this.dataMessage.super_node;
					this.edge_node = this.dataMessage.edge_node;
					let number = res.data.data.machines.length;
					if(number == 0 && this.page == 1) {
						this.text = '这里什么都没有哦';
						return;
					};
					if(number < 20) {
						this.text = '没有更多了';
					};
					if(number == 20 ) {
						this.text = '上拉加载更多';
					};
					this.machines = [...this.machines,...res.data.data.machines];
				}
			},
			loadingmore() {
				if(this.text == '上拉加载更多') {
					this.page ++;
					this.text = '加载中...';
					this.getMyMes();
				}
			},
			enterMemberList(i) {//加速节点
				if(i == 1) {
					uni.showModal({
						content: "要退出加速节点吗？",
						success: (res) => {
							if(res.confirm) {
								this.signOut();
							}
						}
					})
				}else {
					uni.navigateTo({
						url: '/pages/mine/addMemberList'
					})
				}
			},
			async signOut() {//退出节点
				let res = await this.$myRequest({
					url: 'kc/edge_node/quit',
					method: 'POST'
				});
				if(res.data.code == 200) {
					this.getMyMes();
					_toast(res.data.message);
				}else {
					_toast(res.data.message)
				}
			},
			enterNodeList(i) {//节点矿机列表
				uni.navigateTo({
					url: '/pages/mine/addNodeList'
				})
			},
			enterTopImg(i) {
				if(i == 'profit') {//收益记录
					uni.navigateTo({
						url: '/pages/mine/profitRecords'
					})
				}
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
					};
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
						this.edge_nodes(this.tabClick);//成为超级节点
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
					}
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
					this.close();
					this.getMyMes();
				}else {
					_toast(res.data.message)
				};
				this.status = false;
			},
			async edge_nodes(i) {
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
					this.close();
					this.getMyMes();
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
					_toast(res.data.message);
					this.pay_password = "";
					this.number = "";
					this.close();
					this.getMyMes();
				}else {
					_toast(res.data.message)
				};
				this.status = false;
			},
			enterJoin() {//进入加入加速节点页
				this.close()
				uni.navigateTo({
					url: '/pages/mine/addNodeAccelerate'
				})
			}
		}
	}
</script>

<style>
	@import url("../../common/css/resonance.css");
	.popView { width: 80vw;height: 400rpx;background-color: #FFFFFF;border-radius: 16rpx; }
	.w-100 {
		width: 100%;
	}
	.flex {
		display: flex;
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

	.image-16 {
		width: 32rpx;
		height: 32rpx;
	}
	.image-20 {
		width: 40rpx;
		height: 40rpx;
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
	.f-16 {
		font-size: 32rpx;
	}
	.f-14 {
		font-size: 28rpx;
	}
	.f-12 {
		font-size: 24rpx;
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
</style>
