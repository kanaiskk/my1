<template>
	<div class="home-preview">




		<!-- 新闻资讯 -->
		<div id="animate_newsnews" class="news animate__animated">
			<div class="news_title_box">
				<span class="news_title">政策公告</span>
				<span class="news_subhead">{{'news'.toUpperCase()}}</span>
			</div>
			<div class="list list23 index-pv1">
				<div v-if="index<Number(6)" class="list-item" v-for="(item,index) in newsList" :key="index" :class="newsIndex23==index?'list-item-active':''" @click="newsTabClick23(index)">
					<div class="name">{{item.title}}</div>
					<div class="infoBox">
						<div class="desc">{{item.introduction}}</div>
						<div class="info-center">
							<div class="time_item">
								<span class="icon iconfont icon-shijian21"></span>
								<span class="label">发布时间：</span>
								<span class="text">{{item.addtime}}</span>
							</div>
							<div class="publisher_item">
								<span class="icon iconfont icon-geren16"></span>
								<span class="label">发布人：</span>
								<span class="text">{{item.name}}</span>
							</div>
							<div class="like_item">
								<span class="icon iconfont icon-zan10"></span>
								<span class="label">点赞数：</span>
								<span class="text">{{item.thumbsupnum}}</span>
							</div>
							<div class="collect_item">
								<span class="icon iconfont icon-shoucang10"></span>
								<span class="label">收藏量：</span>
								<span class="text">{{item.storeupnum}}</span>
							</div>
							<div class="view_item">
								<span class="icon iconfont icon-chakan9"></span>
								<span class="label">点击量：</span>
								<span class="text">{{item.clicknum}}</span>
							</div>
						</div>
						<div class="info-bottom">
							<div class="more_btn" @click="toDetail('newsDetail', item)">
								<span class="text">点击进入</span>
								<span class="icon iconfont icon-chakan9"></span>
							</div>
						</div>
					</div>
					<div class="img"><img :src="baseUrl + item.picture" alt=""></div>
				</div>
			</div>
			<div class="moreBtn" @click="moreBtn('news')">
				<span class="text">更多</span>
				<i class="icon iconfont icon-gengduo1"></i>
			</div>
		</div>
		<!-- 新闻资讯 -->
		<!-- 商品推荐 -->
		<div id="animate_recommendzizhuxiangmu" class="recommend animate__animated">
			<div class="recommend_title_box">
				<span class="recommend_title">资助项目推荐</span>
				<span class="recommend_subhead">{{'zizhuxiangmu'.toUpperCase()}} RECOMMEND</span>
			</div>
			<!-- 样式二 -->
			<div class="list list2 index-pv1">
				<div v-for="(item,index) in zizhuxiangmuRecommend" class="list-item animation-box" :key="index" @click="toDetail('zizhuxiangmuDetail', item)">
					<img v-if="preHttp(item.xiangmufengmian)" :src="item.xiangmufengmian.split(',')[0]" alt="" />
					<img v-else :src="baseUrl + (item.xiangmufengmian?item.xiangmufengmian.split(',')[0]:'')" alt="" />
					<div class="item-info">
						<div class="name line1">{{item.xiangmumingcheng}}</div>
						<div class="name line1">{{item.zizhuleixing}}</div>
						<div class="time_item">
							<span class="icon iconfont icon-shijian21"></span>
							<span class="label">发布时间：</span>
							<span class="text">{{item.addtime}}</span>
						</div>
						<div class="collect_item">
							<span class="icon iconfont icon-shoucang10"></span>
							<span class="label">收藏量：</span>
							<span class="text">{{item.storeupnum}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="moreBtn" @click="moreBtn('zizhuxiangmu')">
				<span class="text">更多</span>
				<i class="icon iconfont icon-gengduo1"></i>
			</div>
		</div>
		<!-- 商品推荐 -->
	</div>
</template>

<script>
import 'animate.css'
import Swiper from "swiper";

	export default {
		//数据集合
		data() {
			return {
				baseUrl: '',
				newsList: [],
				zizhuxiangmuRecommend: [],


				newsIndex23: 0,



			}
		},
		created() {
			this.baseUrl = this.$config.baseUrl;
			this.getNewsList();
			this.getList();
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
			setTimeout(()=>{
				this.handleScroll()
			},100)
			
			this.swiperChanges()
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		//方法集合
		methods: {
			swiperChanges() {
				setTimeout(()=>{
				},750)
			},
			newsTabClick23(index) {
				this.newsIndex23 = index
			},


			handleScroll() {
				let arr = [
					{id:'about',css:'animate__'},
					{id:'system',css:'animate__'},
					{id:'animate_recommendzizhuxiangmu',css:'animate__'},
					{id:'animate_newsnews',css:'animate__'},
				]
			
				for (let i in arr) {
					let doc = document.getElementById(arr[i].id)
					if (doc) {
						let top = doc.offsetTop
						let win_top = window.innerHeight + window.pageYOffset
						// console.log(top,win_top)
						if (win_top > top && doc.classList.value.indexOf(arr[i].css) < 0) {
							// console.log(doc)
							doc.classList.add(arr[i].css)
						}
					}
				}
			},
			preHttp(str) {
				return str && str.substr(0,4)=='http';
			},
			preHttp2(str) {
				return str && str.split(',w').length>1;
			},
			getNewsList() {
				let data = {
					page: 1,
					limit: 6,
					sort: 'addtime',
					order: 'desc'
				}
				this.$http.get('news/list', {params: data}).then(res => {
					if (res.data.code == 0) {
						this.newsList = res.data.data.list;
					
					}
				});
			},
			getList() {
				let autoSortUrl = "";
				let data = {}
				autoSortUrl = "zizhuxiangmu/autoSort";
				if(localStorage.getItem('frontToken')) {
					autoSortUrl = "zizhuxiangmu/autoSort2";
				}
				data = {
					page: 1,
					limit: 6,
				}
				this.$http.get(autoSortUrl, {params: data}).then(res => {
					if (res.data.code == 0) {
						this.zizhuxiangmuRecommend = res.data.data.list;
					}
				});
			
			},
			toDetail(path, item) {
				this.$router.push({path: '/index/' + path, query: {id: item.id}});
			},
			moreBtn(path) {
				this.$router.push({path: '/index/' + path});
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.home-preview {
		padding: 30px 0;
		margin: 0;
		flex-direction: column;
		display: flex;
		width: 100%;
		.news {
			padding: 0;
			margin: 30px 0 0;
			background: none;
			width: 100%;
			position: relative;
			order: 2;
			.news_title_box {
				padding: 0;
				margin: 0;
				background: url(http://codegen.caihongy.cn/20250204/b980e0170638444f96e5c6db7256aac3.png) no-repeat center;
				width: auto;
				line-height: 50px;
				text-align: left;
				.news_title {
					padding: 0 0 0 calc(50% - 630px);
					color: #fff;
					font-weight: 600;
					font-size: 22px;
				}
				.news_subhead {
					margin: 0 0 10px;
					color: #999;
					display: none;
					width: 100%;
					font-size: 20px;
					line-height: 1.5;
					text-align: center;
				}
			}
			.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 10px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1.1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
			.list23 {
				padding: 0 0 50px;
				margin: 0 auto;
				overflow: hidden;
				background: none;
				display: flex;
				width: 1300px;
				.list-item {
					overflow: hidden;
					display: flex;
					width: 45px;
					justify-content: center;
					align-items: center;
					position: relative;
					transition: all .4s;
					height: 390px;
					.name {
						cursor: pointer;
						padding: 10px 0;
						z-index: 1;
						color: #fff;
						white-space: nowrap;
						font-weight: bold;
						display: flex;
						letter-spacing: 1px;
						font-size: 15px;
						writing-mode: vertical-rl;
						overflow: hidden;
						left: 0;
						background: #ee6475;
						width: 36px;
						align-items: center;
						position: absolute;
						text-align: center;
						height: 300px;
					}
					.infoBox {
						padding: 20px 30px 0px 80px;
						color: #666;
						background: #fff;
						flex: 1;
						font-size: 15px;
						box-sizing: border-box;
						opacity: 0;
						transition: all 0.4s;
						height: 300px;
						.desc {
							max-height: 180px;
							overflow: hidden;
							font-size: 15px;
							min-height: 180px;
							line-height: 30px;
							height: 180px;
						}
						.info-center {
							margin: 10px 0 0;
							display: flex;
							width: 100%;
							justify-content: space-around;
							align-items: center;
							flex-wrap: wrap;
							.time_item {
								padding: 0 10px;
								.icon {
									margin: 0 2px 0 0;
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.label {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.text {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
							}
							.publisher_item {
								padding: 0 10px;
								.icon {
									margin: 0 2px 0 0;
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.label {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.text {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
							}
							.like_item {
								padding: 0 10px;
								.icon {
									margin: 0 2px 0 0;
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.label {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.text {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
							}
							.collect_item {
								padding: 0 10px;
								.icon {
									margin: 0 2px 0 0;
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.label {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.text {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
							}
							.view_item {
								padding: 0 10px;
								.icon {
									margin: 0 2px 0 0;
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.label {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
								.text {
									color: #666;
									font-size: 12px;
									line-height: 1.5;
								}
							}
						}
						.info-bottom {
							margin: 10px 0 0;
							display: flex;
							width: 100%;
							justify-content: flex-end;
							align-items: center;
							.more_btn {
								border-radius: 20px;
								padding: 0px 20px;
								margin: 10px 0 0;
								background: #ee6475;
								display: flex;
								justify-content: space-around;
								align-items: center;
								.text {
									color: #fff;
									font-size: 12px;
									line-height: 1.5;
								}
								.icon {
									margin: 0 2px 0 0;
									color: #fff;
									font-size: 12px;
									line-height: 1.5;
								}
							}
						}
					}
					.img {
						border: 4px solid #fff;
						width: 280px;
						box-sizing:  border-box;
						opacity: 0;
						transition: all 0.4s;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
				.list-item.list-item-active {
					width: 100%;
					.infoBox {
						opacity: 1;
					}
					.img {
						opacity: 1;
					}
				}
			}
			.moreBtn {
				border: 1px solid #A50E11;
				cursor: pointer;
				margin: 0 auto;
				color: #A50E11;
				background: #fff;
				display: block;
				width: 200px;
				line-height: 44px;
				text-align: center;
				.text {
					color: inherit;
					font-size: 12px;
				}
				.icon {
					color: inherit;
					font-size: 12px;
				}
			}
		}
		.recommend {
			padding: 30px 0;
			margin: 0;
			background: none;
			width: 100%;
			position: relative;
			order: 5;
			.recommend_title_box {
				padding: 0;
				margin: 0;
				background: url(http://codegen.caihongy.cn/20250204/b980e0170638444f96e5c6db7256aac3.png) no-repeat center;
				width: auto;
				line-height: 50px;
				text-align: left;
				.recommend_title {
					padding: 0 0 0 calc(50% - 630px);
					color: #fff;
					font-weight: 600;
					font-size: 22px;
				}
				.recommend_subhead {
					margin: 0 0 10px;
					color: #999;
					display: none;
					width: 100%;
					font-size: 20px;
					line-height: 1.5;
					text-align: center;
				}
			}
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
			
			.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 10px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
			.list2 {
				padding: 0 calc(50% - 650px);
				margin: 20px 0 0;
				background: none;
				display: flex;
				gap: 30px;
				width: 100%;
				justify-content: flex-start;
				flex-wrap: wrap;
				height: auto;
				.list-item {
					cursor: pointer;
					margin: 0;
					background: url(http://codegen.caihongy.cn/20250204/d06957d456f2454b89cd419bbd81113e.png) no-repeat center / 100% 100%;
					display: flex;
					width: calc(33.33% - 20px);
					font-size: 0;
					position: relative;
					height: auto;
					img {
						flex: none;
						object-fit: cover;
						display: inline-block;
						width: 160px;
						height: 180px;
					}
					.item-info {
						padding: 10px;
						overflow: hidden;
						flex: auto;
						display: inline-block;
						width: 0;
						height: auto;
						.name {
							padding: 0 10px;
							color: #333;
							font-size: 14px;
							line-height: 32px;
						}
						.price {
							padding: 10px;
							color: #f00;
							font-size: 13px;
							line-height: 1.5;
						}
						.time_item {
							padding: 0 10px;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.publisher_item {
							padding: 0 10px;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.like_item {
							padding: 0 10px;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.collect_item {
							padding: 0 10px;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.view_item {
							padding: 0 10px;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
					}
				}
			}
			.moreBtn {
				border: 1px solid #A50E11;
				cursor: pointer;
				margin: 20px auto 0;
				color: #A50E11;
				background: #fff;
				display: block;
				width: 200px;
				line-height: 44px;
				text-align: center;
				.text {
					color: inherit;
					font-size: 12px;
				}
				.icon {
					color: inherit;
					font-size: 12px;
				}
			}
		}
	}
</style>
