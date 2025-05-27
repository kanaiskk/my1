<template>
	<div>
		<div class="login-container">
			<el-form ref="loginForm" :model="loginForm" :rules="rules" class="login_form animate__animated animate__fadeInDown">
				<div class="login_form2">
					<div class="login-title-container">
						<div class="login-title">贫困儿童资助系统</div>
						<div class="login-subtitle">让爱心传递希望</div>
					</div>
					<div v-if="loginType==1" class="list-item" prop="username">
						<div class="lable">
							<i class="el-icon-user"></i>
						</div>
						<input v-model="loginForm.username" placeholder="请输入账号">
					</div>
					<div v-if="loginType==1" class="list-item" prop="password">
						<div class="lable">
							<i class="el-icon-lock"></i>
						</div>
						<div class="password-box">
							<input v-model="loginForm.password" placeholder="请输入密码" :type="showPassword?'text':'password'">
							<span class="icon iconfont" :class="showPassword?'icon-liulan13':'icon-liulan17'" @click="showPassword=!showPassword"></span>
						</div>
					</div>

					<div class="list-item select" v-if="roles.length>1">
						<div class="lable">
							<i class="el-icon-s-custom"></i>
						</div>
						<el-select v-model="loginForm.tableName" placeholder="请选择角色" @change="selectChange">
							<el-option v-for="item,index in roles" :key="index" :label="item.roleName" :value="item.tableName" />
						</el-select>
					</div>

					<div class="list-btn">
						<el-button class="login_btn" v-if="loginType==1" @click="submitForm('loginForm')">登 录</el-button>

						<div class="list-btn2">
							<router-link class="register_btn" :to="{path: '/register', query: {role: item.tableName,pageFlag:'register'}}" v-if="item.hasFrontRegister=='是'" v-for="(item, index) in roles" :key="index">注册{{item.roleName.replace('注册','')}}</router-link>
							<router-link class="resetpwd_btn" :to="{path: '/register', query: {pageFlag:'security1'}}">重置密码</router-link>
						</div>
					</div>
				</div>
				<div class="idea1"></div>
				<div class="idea2"></div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import 'animate.css';
import menu from '@/config/menu'
export default {
	//数据集合
	data() {
		return {
            baseUrl: this.$config.baseUrl,
            loginType: 1,
			roleMenus: [],
			loginForm: {
				username: '',
				password: '',
				tableName: '',
			},
			role: '',
            roles: [],
			rules: {
				username: [
					{ required: true, message: '请输入账号', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},
			codes: [{
				num: 1,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 2,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 3,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}, {
				num: 4,
				color: '#000',
				rotate: '10deg',
				size: '16px'
			}],
			flag: false,
			verifyCheck2: false,
			showPassword: false,
		}
	},
	components: {
	},
	created() {
		this.roleMenus = menu.list()
		for(let item in this.roleMenus) {
			if(this.roleMenus[item].hasFrontLogin=='是') {
				this.roles.push(this.roleMenus[item]);
			}
		}
		
	},
	mounted() {
	},
	//方法集合
	methods: {
		randomString() {
			var len = 4;
			var chars = [
				'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
				'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
				'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
				'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
				'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2',
				'3', '4', '5', '6', '7', '8', '9'
			]
			var colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
			var sizes = ['14', '15', '16', '17', '18']
			
			var output = []
			for (var i = 0; i < len; i++) {
				// 随机验证码
				var key = Math.floor(Math.random() * chars.length)
				this.codes[i].num = chars[key]
				// 随机验证码颜色
				var code = '#'
				for (var j = 0; j < 6; j++) {
					var key = Math.floor(Math.random() * colors.length)
					code += colors[key]
				}
				this.codes[i].color = code
				// 随机验证码方向
				var rotate = Math.floor(Math.random() * 45)
				var plus = Math.floor(Math.random() * 2)
				if (plus == 1) rotate = '-' + rotate
				this.codes[i].rotate = 'rotate(' + rotate + 'deg)'
				// 随机验证码字体大小
				var size = Math.floor(Math.random() * sizes.length)
				this.codes[i].size = sizes[size] + 'px'
			}
		},
		selectChange(e){
			for(let x in this.roles){
				if(this.roles[x].tableName == e){
					this.role = this.roles[x].roleName
				}
			}
		},
		submitForm(formName) {
			if (this.roles.length!=1) {
				if (!this.role) {
					this.$message.error("请选择登录用户类型");
					return false;
				}
			} else {
				this.role = this.roles[0].roleName;
				this.loginForm.tableName = this.roles[0].tableName;
			}
			if (!this.loginForm.username) {
				this.$message.error("请输入用户名");
				return;
			}
			if (!this.loginForm.password) {
				this.$message.error("请输入密码");
				return;
			}

			this.loginPost(formName)
		},
		loginPost(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$http.get(`${this.loginForm.tableName}/login`, {params: this.loginForm}).then(res => {
						if (res.data.code === 0) {
							localStorage.setItem('frontToken', res.data.token);
							localStorage.setItem('UserTableName', this.loginForm.tableName);
							localStorage.setItem('username', this.loginForm.username);
							localStorage.setItem('frontSessionTable', this.loginForm.tableName);
							localStorage.setItem('frontRole', this.role);
							localStorage.setItem('keyPath', 0);
							this.$router.push('/');
							this.$message({
								message: '登录成功',
								type: 'success',
								duration: 1500,
							});
						} else {
							this.$message.error(res.data.msg);
						}
					});
				} else {
					return false;
				}
			});
		},
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.login-container {
		background: url(https://wx2.sinaimg.cn/mw690/007U62ohly1i1ivug2w5uj31kw0w0qv5.jpg) center / 100% 100%;
		display: flex;
		width: 100%;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
		position: relative;
		.login_form {
			border-radius: 12px;
			padding: 40px;
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
			margin: 0;
			z-index: 1;
			background: rgba(255, 255, 255, 0.9);
			width: 500px;
			.login_form2 {
				width: 100%;
				.login-title-container {
					margin: 0 0 40px 0;
					text-align: center;
					.login-title {
						color: #a50e11;
						font-weight: 700;
						font-size: 28px;
						line-height: 1.4;
						margin-bottom: 10px;
						letter-spacing: 1px;
					}
					.login-subtitle {
						color: #666;
						font-size: 16px;
						font-weight: 400;
					}
				}
				.list-item {
					border-radius: 30px;
					padding: 0 15px;
					margin: 0 0 25px 0;
					background: #fff;
					box-shadow: 0 2px 10px rgba(165, 14, 17, 0.1);
					display: flex;
					align-items: center;
					width: 100%;
					transition: all 0.3s;
					&:hover {
						box-shadow: 0 4px 15px rgba(165, 14, 17, 0.2);
					}
					.lable {
						color: #a50e11;
						flex: none;
						width: 30px;
						font-size: 18px;
						text-align: center;
						i {
							vertical-align: middle;
						}
					}
					input {
						border: none;
						padding: 12px 10px;
						outline: none;
						color: #333;
						flex: auto;
						background: none;
						width: 100%;
						font-size: 14px;
						height: auto;
						&::placeholder {
							color: #aaa;
						}
					}
					.password-box {
						display: flex;
						width: 100%;
						position: relative;
						align-items: center;
						input {
							padding-right: 30px;
						}
						.iconfont {
							cursor: pointer;
							z-index: 1;
							color: #a50e11;
							font-size: 18px;
							position: absolute;
							right: 10px;
						}
					}
				}
				.select {
					::v-deep .el-select {
						width: 100%;
						.el-input__inner {
							border: none;
							padding: 12px 10px;
							box-shadow: none;
							color: #333;
							background: none;
							width: 100%;
							font-size: 14px;
							height: auto;
							&::placeholder {
								color: #aaa;
							}
						}
					}
				}
				.list-btn {
					margin-top: 30px;
					.login_btn {
						border: none;
						cursor: pointer;
						border-radius: 30px;
						padding: 12px;
						margin: 0;
						outline: none;
						color: #fff;
						background: linear-gradient(270deg, #a50e11 0%, #efccb8 100%);
						width: 100%;
						font-size: 16px;
						font-weight: 500;
						height: auto;
						transition: all 0.3s;
						&:hover {
							background: linear-gradient(270deg, darken(#a50e11, 5%) 0%, darken(#efccb8, 5%) 100%);
							transform: translateY(-2px);
							box-shadow: 0 4px 15px rgba(165, 14, 17, 0.3);
						}
					}
					.list-btn2 {
						margin: 20px 0 0;
						display: flex;
						justify-content: space-between;
						a {
							color: #a50e11;
							font-size: 14px;
							text-decoration: none;
							transition: all 0.3s;
							&:hover {
								color: darken(#a50e11, 10%);
								text-decoration: underline;
							}
						}
					}
				}
			}
			.idea1, .idea2 {
				display: none;
			}
		}
	}
</style>