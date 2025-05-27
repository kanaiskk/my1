<template>
	<div>
		<div class="login-container">
			<el-form class="login_form animate__animated animate__bounceIn">
				<div class="login_form2">
					<div class="title-container">
						<h1>贫困儿童资助系统</h1>
						<p class="subtitle">爱心助学平台</p>
					</div>
					<div v-if="loginType==1" class="list-item">
						<div class="input-icon">
							<i class="el-icon-user"></i>
						</div>
						<input placeholder="请输入账号" name="username" type="text" v-model="rulesForm.username">
					</div>
					<div v-if="loginType==1" class="list-item">
						<div class="input-icon">
							<i class="el-icon-lock"></i>
						</div>
						<div class="password-box">
							<input placeholder="请输入密码" name="password" :type="showPassword?'text':'password'" v-model="rulesForm.password">
							<span class="icon iconfont" :class="showPassword?'icon-liulan13':'icon-liulan17'" @click="showPassword=!showPassword"></span>
						</div>
					</div>

					<div class="list-item" v-if="roles.length>1">
						<div prop="loginInRole" class="list-type">
							<el-radio-group v-model="rulesForm.role" class="role-group">
								<el-radio v-if="loginType==1||(loginType==2&&item.roleName!='管理员')" v-for="item in roles" v-bind:key="item.roleName" :label="item.roleName">
									{{item.roleName}}
								</el-radio>
							</el-radio-group>
						</div>
					</div>

					<div class="login-btn">
						<el-button v-if="loginType==1" type="primary" @click="login()" class="loginInBt">登 录</el-button>
						<div class="action-links">
							<el-button type="text" @click="register('zizhuren')" class="register">注册资助人</el-button>
							<el-button type="text" @click="updatePassword()" class="forget">忘记密码?</el-button>
						</div>
					</div>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import 'animate.css'
	import menu from "@/utils/menu";
	export default {
		data() {
			return {
				verifyCheck2: false,
				flag: false,
				baseUrl:this.$base.url,
				loginType: 1,
				rulesForm: {
					username: "",
					password: "",
					role: "",
				},
				menus: [],
				roles: [],
				tableName: "",
				showPassword: false,
			};
		},
		mounted() {
			let menus = menu.list();
			this.menus = menus;

			for (let i = 0; i < this.menus.length; i++) {
				if (this.menus[i].hasBackLogin=='是') {
					this.roles.push(this.menus[i])
				}
			}
		},
		created() {
		},
		destroyed() {
		},
		components: {
		},
		methods: {
			//重置密码
			updatePassword(){
				this.$storage.set("loginTable", "");
				this.$router.push({path:'/register',query:{pageFlag:'security1'}})
			},
			//注册
			register(tableName){
				this.$storage.set("loginTable", tableName);
				this.$router.push({path:'/register',query:{pageFlag:'register'}})
			},
			// 登陆
			login() {
				if (!this.rulesForm.username) {
					this.$message.error("请输入用户名");
					return;
				}
				if (!this.rulesForm.password) {
					this.$message.error("请输入密码");
					return;
				}
				if(this.roles.length>1) {
					if (!this.rulesForm.role) {
						this.$message.error("请选择角色");
						return;
					}

					let menus = this.menus;
					for (let i = 0; i < menus.length; i++) {
						if (menus[i].roleName == this.rulesForm.role) {
							this.tableName = menus[i].tableName;
						}
					}
				} else {
					this.tableName = this.roles[0].tableName;
					this.rulesForm.role = this.roles[0].roleName;
				}
		
				this.loginPost()
			},
			loginPost() {
				this.$http({
					url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
					method: "post"
				}).then(({ data }) => {
					if (data && data.code === 0) {
						this.$storage.set("Token", data.token);
						this.$storage.set("role", this.rulesForm.role);
						this.$storage.set("sessionTable", this.tableName);
						this.$storage.set("adminName", this.rulesForm.username);
						this.$router.replace({ path: "/" });
					} else {
						this.$message.error(data.msg);
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.login-container {
	min-height: 100vh;
	position: relative;
	background: url(https://wx4.sinaimg.cn/mw690/007U62ohly1i1ivu3qd5bj31kw0w0npd.jpg) no-repeat center center / cover;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;

	.login_form {
		border-radius: 12px;
		padding: 40px;
		background: rgba(11, 11, 11, 0.8);
		width: 100%;
		max-width: 500px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(5px);
		transition: all 0.3s ease;

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
		}

		.login_form2 {
			width: 100%;
			
			.title-container {
				margin-bottom: 30px;
				text-align: center;
				color: #fff;
				
				h1 {
					font-size: 28px;
					font-weight: 600;
					margin-bottom: 10px;
					color: #FCBB78;
				}
				
				.subtitle {
					font-size: 16px;
					color: rgba(255, 255, 255, 0.8);
				}
			}

			.list-item {
				margin-bottom: 20px;
				display: flex;
				align-items: center;
				position: relative;
				
				.input-icon {
					position: absolute;
					left: 15px;
					color: #FCBB78;
					font-size: 18px;
					z-index: 2;
				}
				
				input {
					border: 1px solid rgba(255, 255, 255, 0.2);
					border-radius: 8px;
					padding: 12px 15px 12px 40px;
					color: #fff;
					background: rgba(255, 255, 255, 0.1);
					width: 100%;
					font-size: 16px;
					height: 48px;
					transition: all 0.3s;
					
					&:focus {
						border-color: #FCBB78;
						box-shadow: 0 0 0 2px rgba(252, 187, 120, 0.2);
					}
					
					&::placeholder {
						color: rgba(255, 255, 255, 0.5);
					}
				}
				
				.password-box {
					width: 100%;
					position: relative;
					
					.iconfont {
						position: absolute;
						right: 15px;
						top: 50%;
						transform: translateY(-50%);
						color: rgba(255, 255, 255, 0.5);
						font-size: 18px;
						cursor: pointer;
						transition: all 0.3s;
						
						&:hover {
							color: #FCBB78;
						}
					}
				}
			}
			
			.list-type {
				border: 1px solid rgba(255, 255, 255, 0.2);
				border-radius: 8px;
				padding: 15px;
				background: rgba(255, 255, 255, 0.1);
				width: 100%;
				
				::v-deep .role-group {
					display: flex;
					flex-wrap: wrap;
					gap: 10px;
					
					.el-radio {
						margin: 0;
						
						.el-radio__input {
							.el-radio__inner {
								background: transparent;
								border-color: rgba(255, 255, 255, 0.5);
							}
							
							&.is-checked {
								.el-radio__inner {
									background: #FCBB78;
									border-color: #FCBB78;
								}
							}
						}
						
						.el-radio__label {
							color: rgba(255, 255, 255, 0.8);
							font-size: 14px;
						}
						
						&.is-checked {
							.el-radio__label {
								color: #FCBB78;
							}
						}
					}
				}
			}
			
			.login-btn {
				margin-top: 30px;
				display: flex;
				flex-direction: column;
				gap: 15px;
				
				.loginInBt {
					width: 100%;
					height: 50px;
					font-size: 18px;
					font-weight: 500;
					background: linear-gradient(135deg, #FCBB78, #F7931E);
					border: none;
					border-radius: 8px;
					color: #fff;
					transition: all 0.3s;
					
					&:hover {
						background: linear-gradient(135deg, #F7931E, #FCBB78);
						transform: translateY(-2px);
						box-shadow: 0 5px 15px rgba(252, 187, 120, 0.3);
					}
				}
				
				.action-links {
					display: flex;
					justify-content: space-between;
					
					.register, .forget {
						color: rgba(255, 255, 255, 0.8);
						font-size: 14px;
						transition: all 0.3s;
						
						&:hover {
							color: #FCBB78;
							transform: translateY(-1px);
						}
					}
				}
			}
		}
	}
}
</style>