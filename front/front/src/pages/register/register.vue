<template>
	<div>

		<div class="container">
			<el-form class='rgs-form animate__animated animate__fadeInDown' v-if="pageFlag=='security1'">
				<div class="rgs-form2">
					<div class="title">找回密码</p></div>
					<el-form-item class="list-item" prop="username">
						<div class="label">账号：</div>
						<el-input v-model="forgetForm.username" placeholder="请您输入账号" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<el-button class="register_btn" type="primary" @click="getSecurity()">下一步</el-button>
						</div>
						<div class="register-btn2">
							<router-link class="has_btn" to="/login">已有账号，直接登录</router-link>
						</div>
					</div>
				</div>
				<div class="idea1"></div>
				<div class="idea2"></div>
			</el-form>
			<el-form class='rgs-form animate__animated animate__fadeInDown' v-if="pageFlag=='security2'">
				<div class="rgs-form2">
					<div class="title">找回密码</p></div>
					<el-form-item class="list-item" prop="pquestion">
						<div class="label">密保问题：</div>
						<el-input readonly v-model="registerForm.pquestion" placeholder="密保问题" />
					</el-form-item>
					<el-form-item class="list-item" prop="myanswer">
						<div class="label">密保答案：</div>
						<el-input v-model="registerForm.myanswer" placeholder="请您输入密保答案" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<el-button class="register_btn" type="primary" @click="validateSecurity()">下一步</el-button>
						</div>
						<div class="register-btn2">
							<router-link class="has_btn" to="/login">已有账号，直接登录</router-link>
						</div>
					</div>
				</div>
				<div class="idea1"></div>
				<div class="idea2"></div>
			</el-form>
			<el-form class='rgs-form animate__animated animate__fadeInDown' v-if="pageFlag=='security3'">
				<div class="rgs-form2">
					<div class="title">找回密码</p></div>
					<el-form-item class="list-item" prop="newpassword">
						<div class="label">新密码：</div>
						<el-input v-model="registerForm.newpassword" type="password" placeholder="请您输入新密码" />
					</el-form-item>
					<el-form-item class="list-item" prop="repassword">
						<div class="label">确认密码：</div>
						<el-input v-model="registerForm.repassword" type="password" placeholder="请您确认密码" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<el-button class="register_btn" type="primary" @click="updatePassword()">修改密码</el-button>
						</div>
						<div class="register-btn2">
							<router-link class="has_btn" to="/login">已有账号，直接登录</router-link>
						</div>
					</div>
				</div>
				<div class="idea1"></div>
				<div class="idea2"></div>
			</el-form>
			<el-form class='rgs-form animate__animated animate__fadeInDown' v-if="pageFlag=='register'" ref="registerForm" :model="registerForm" :rules="rules">
				<div class="rgs-form2">
					<div class="title">贫困儿童资助系统注册</p></div>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="ertongzhanghao">
						<div class="label" :class="changeRules('ertongzhanghao')?'required':''">儿童账号：</div>
						<el-input v-model="registerForm.ertongzhanghao"  placeholder="请输入儿童账号" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="mima">
						<div class="label" :class="changeRules('mima')?'required':''">密码：</div>
						<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="mima2">
						<div class="label" :class="changeRules('mima')?'required':''">确认密码：</div>
						<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="ertongxingming">
						<div class="label" :class="changeRules('ertongxingming')?'required':''">儿童姓名：</div>
						<el-input v-model="registerForm.ertongxingming"  placeholder="请输入儿童姓名" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="xingbie">
						<div class="label" :class="changeRules('xingbie')?'required':''">性别：</div>
						<el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
							<el-option
								v-for="(item,index) in ertongxingbieOptions"
								:key="index"
								:label="item"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="touxiang">
						<div class="label" :class="changeRules('touxiang')?'required':''">头像：</div>
						<file-upload
							tip="点击上传头像"
							action="file/upload"
							:limit="1"
							:multiple="true"
							:fileUrls="registerForm.touxiang?registerForm.touxiang:''"
							@change="ertongtouxiangUploadChange"
						></file-upload>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="lianxifangshi">
						<div class="label" :class="changeRules('lianxifangshi')?'required':''">联系方式：</div>
						<el-input v-model="registerForm.lianxifangshi"  placeholder="请输入联系方式" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="pquestion">
						<div class="label" :class="changeRules('pquestion')?'required':''">密保问题：</div>
						<el-input v-model="registerForm.pquestion"  placeholder="请输入密保问题" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'" prop="panswer">
						<div class="label" :class="changeRules('panswer')?'required':''">密保答案：</div>
						<el-input v-model="registerForm.panswer"  placeholder="请输入密保答案" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="zizhurenzhanghao">
						<div class="label" :class="changeRules('zizhurenzhanghao')?'required':''">资助人账号：</div>
						<el-input v-model="registerForm.zizhurenzhanghao"  placeholder="请输入资助人账号" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="mima">
						<div class="label" :class="changeRules('mima')?'required':''">密码：</div>
						<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="mima2">
						<div class="label" :class="changeRules('mima')?'required':''">确认密码：</div>
						<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="zizhurenxingming">
						<div class="label" :class="changeRules('zizhurenxingming')?'required':''">资助人姓名：</div>
						<el-input v-model="registerForm.zizhurenxingming"  placeholder="请输入资助人姓名" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="xingbie">
						<div class="label" :class="changeRules('xingbie')?'required':''">性别：</div>
						<el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
							<el-option
								v-for="(item,index) in zizhurenxingbieOptions"
								:key="index"
								:label="item"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="touxiang">
						<div class="label" :class="changeRules('touxiang')?'required':''">头像：</div>
						<file-upload
							tip="点击上传头像"
							action="file/upload"
							:limit="1"
							:multiple="true"
							:fileUrls="registerForm.touxiang?registerForm.touxiang:''"
							@change="zizhurentouxiangUploadChange"
						></file-upload>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="lianxidianhua">
						<div class="label" :class="changeRules('lianxidianhua')?'required':''">联系电话：</div>
						<el-input v-model="registerForm.lianxidianhua"  placeholder="请输入联系电话" />
					</el-form-item>
					<el-form-item v-if="tableName=='zizhuren'" class="el-email list-item">
						<div class="label required">邮箱：</div>
						<div style="display: flex;flex: 1;">
							<input v-model="registerForm.email" type="text" id="email" name="email" placeholder="请输入邮箱" autocomplete="off" class="emailInput">
							<button v-if="isEndFlag" @click="sendemailcode" id="sendemailcode" type="button" class="el-btn">发送验证码</button>
							<button v-if="!isEndFlag" disabled="disabled" type="button" class="el-btn">{{count}}秒后重发</button>
						</div>
					</el-form-item>
					<el-form-item v-if="tableName=='zizhuren'" class="el-email list-item">
						<div class="label required">验证码：</div>
						<el-input v-model="emailcode" type="text" id="emailcode" name="emailcode" placeholder="请输入验证码" autocomplete="off" class="el-input" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="pquestion">
						<div class="label" :class="changeRules('pquestion')?'required':''">密保问题：</div>
						<el-input v-model="registerForm.pquestion"  placeholder="请输入密保问题" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'" prop="panswer">
						<div class="label" :class="changeRules('panswer')?'required':''">密保答案：</div>
						<el-input v-model="registerForm.panswer"  placeholder="请输入密保答案" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<el-button class="register_btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
						</div>
						<div class="register-btn2">
							<router-link class="has_btn" to="/login">已有账号，直接登录</router-link>
						</div>
					</div>
				</div>
				<div class="idea1"></div>
				<div class="idea2"></div>
			</el-form>
		</div>
	</div>
</div>
</template>

<script>
	import 'animate.css';

export default {
    //数据集合
    data() {
		return {
            pageFlag : '',
			tableName: '',
			registerForm: {},
			forgetForm: {},
			rules: {},
			requiredRules: {},
            ertongxingbieOptions: [],
            zizhurenxingbieOptions: [],
            emailcode:'',
			//倒计时60s
			count: 60,
			//倒计时定时器
			inter: null,
			//倒计结束标识
			isEndFlag: true,
		}
    },
	mounted() {
		if(this.$route.query.pageFlag=='register'){
			this.tableName = this.$route.query.role;
			if(this.tableName=='ertong'){
				this.registerForm = {
					ertongzhanghao: '',
					mima: '',
					mima2: '',
					ertongxingming: '',
					xingbie: '',
					touxiang: '',
					lianxifangshi: '',
					pquestion: '',
					panswer: '',
				}
			}
			if(this.tableName=='zizhuren'){
				this.registerForm = {
					zizhurenzhanghao: '',
					mima: '',
					mima2: '',
					zizhurenxingming: '',
					xingbie: '',
					touxiang: '',
					lianxidianhua: '',
					email: '',
					pquestion: '',
					panswer: '',
				}
			}
			if ('ertong' == this.tableName) {
				this.rules.ertongzhanghao = [{ required: true, message: '请输入儿童账号', trigger: 'blur' }];
				this.requiredRules.ertongzhanghao = [{ required: true, message: '请输入儿童账号', trigger: 'blur' }]
			}
			if ('ertong' == this.tableName) {
				this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
				this.requiredRules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('ertong' == this.tableName) {
				this.rules.ertongxingming = [{ required: true, message: '请输入儿童姓名', trigger: 'blur' }];
				this.requiredRules.ertongxingming = [{ required: true, message: '请输入儿童姓名', trigger: 'blur' }]
			}
			this.ertongxingbieOptions = "男,女".split(',');
			if ('ertong' == this.tableName) {
				this.rules.lianxifangshi = [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }];
			}
			if(`ertong` == this.tableName){
				this.rules.pquestion = [{ required: true, message: '请输入密保问题', trigger: 'blur' }];
				this.requiredRules.pquestion = [{ required: true, message: '请输入密保问题', trigger: 'blur' }]
			}
			if(`ertong` == this.tableName){
				this.rules.panswer = [{ required: true, message: '请输入密保答案', trigger: 'blur' }];
				this.requiredRules.panswer = [{ required: true, message: '请输入密保答案', trigger: 'blur' }]
			}
			if ('zizhuren' == this.tableName) {
				this.rules.zizhurenzhanghao = [{ required: true, message: '请输入资助人账号', trigger: 'blur' }];
				this.requiredRules.zizhurenzhanghao = [{ required: true, message: '请输入资助人账号', trigger: 'blur' }]
			}
			if ('zizhuren' == this.tableName) {
				this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
				this.requiredRules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('zizhuren' == this.tableName) {
				this.rules.zizhurenxingming = [{ required: true, message: '请输入资助人姓名', trigger: 'blur' }];
				this.requiredRules.zizhurenxingming = [{ required: true, message: '请输入资助人姓名', trigger: 'blur' }]
			}
			this.zizhurenxingbieOptions = "男,女".split(',');
			if ('zizhuren' == this.tableName) {
				this.rules.lianxidianhua = [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }];
			}
			if ('zizhuren' == this.tableName) {
				this.rules.email = [{ required: true, validator: this.$validate.isEmail, trigger: 'blur' }];
			}
			if(`zizhuren` == this.tableName){
				this.rules.pquestion = [{ required: true, message: '请输入密保问题', trigger: 'blur' }];
				this.requiredRules.pquestion = [{ required: true, message: '请输入密保问题', trigger: 'blur' }]
			}
			if(`zizhuren` == this.tableName){
				this.rules.panswer = [{ required: true, message: '请输入密保答案', trigger: 'blur' }];
				this.requiredRules.panswer = [{ required: true, message: '请输入密保答案', trigger: 'blur' }]
			}
		}
	},
    created() {
		this.pageFlag = this.$route.query.pageFlag;
    },
    //方法集合
    methods: {
		changeRules(name){
			if(this.requiredRules[name]){
				return true
			}
			return false
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
        // 下二随
		ertongtouxiangUploadChange(fileUrls) {
			this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
		},
		zizhurentouxiangUploadChange(fileUrls) {
			this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
		},

		// 多级联动参数

		sendemailcode() {
			if(!this.registerForm.email){
				this.$message.error(`邮箱不能为空`);
				return
			}
			let emailF = this.$validate.isEmail2(this.registerForm.email);
			if(this.registerForm.email&&(!this.$validate.isEmail2(this.registerForm.email))){
				this.$message.error(`请输入正确的邮箱格式`);
				return
			}
			this.isEndFlag = false;
			var _this = this;
			this.inter = window.setInterval(function() {
				_this.count = _this.count - 1;
				if (_this.count <= 0) {
					window.clearInterval(_this.inter);
					_this.isEndFlag = true;
					_this.count=60;
				}
			}, 1000);
			this.$http({
				url: `${this.tableName}/sendemail?email=`+this.registerForm.email,
				method: "get",
				params: {}
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message.success(`发送成功`);
				} else {
					this.$message.error(`服务器异常，请稍后重试`)
				}
			});
		},

//获取密保问题
		getSecurity(){
			this.tableName = 'ertong'
			if(!this.tableName) {
				this.$message.error("请选择角色");
				return false
			}
			if(!this.forgetForm.username){
				this.$message.error("请输入账号");
				return false
			}
			this.$http({
				url: this.tableName+`/security?username=` + this.forgetForm.username,
				method: "get",
			}).then(({
				data
			}) => {
				if (data.data && data.code === 0) {
					this.registerForm = data.data;
					this.pageFlag="security2"
				} else {
					if(!data.data) {
						this.$message.error("用户不存在");
					} else {
						this.$message.error(data.msg);
					}
				}
			});
		},
		//验证密保问题
		validateSecurity(){
			let that = this
			if(this.registerForm.panswer!=this.registerForm.myanswer){
				this.$message.error("答案输入不正确");
				return false
			}
			this.$message.success("答案正确");
			setTimeout(()=>{
				this.pageFlag="security3";
			},1000)
		},
		// 修改密码
		updatePassword() {
			if (!this.registerForm.newpassword) {
				this.$message.error("请输入新密码");
				return;
			}
			if (this.registerForm.newpassword != this.registerForm.repassword) {
				this.$message.error("两次密码输入不一致");
				return;
			}
			this.registerForm.mima = this.registerForm.newpassword;
			this.registerForm.password = this.registerForm.newpassword;
			this.$http.post(this.tableName+`/update`, this.registerForm).then(res => {
			  if (res.data.code === 0) {
				this.$message({
					message: "密码修改成功",
					type: "success",
					duration: 1500,
					onClose: () => {
					  this.$router.push('/login');
					}
				});
			  } else {
				this.$message.error(res.data.msg);
			  }
			});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var url=this.tableName+"/register";
					if(`ertong` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
						this.$message.error(`两次密码输入不一致`);
						return
					}
					if(`zizhuren` == this.tableName ){
						url=this.tableName+"/register?emailcode="+this.emailcode;
						if(this.registerForm.email&&(!this.$validate.isEmail2(this.registerForm.email))){
							this.$message.error(`请输入正确的邮箱格式`);
							return
						}
					}
					if((!this.emailcode) && `zizhuren` == this.tableName){
						this.$message.error(`验证码不能为空`);
						return
					}
					if(`zizhuren` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
						this.$message.error(`两次密码输入不一致`);
						return
					}
					this.$http.post(url, this.registerForm).then(res => {
						if (res.data.code === 0) {
							this.$message({
								message: '注册成功',
								type: 'success',
								duration: 1500,
								onClose: () => {
									this.$router.push('/login');
								}
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
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		background: url(https://wx2.sinaimg.cn/mw690/007U62ohly1i1ivug2w5uj31kw0w0qv5.jpg) center / 100% 100%;
		display: flex;
		width: 100%;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
		position: relative;
		background: url(https://wx2.sinaimg.cn/mw690/007U62ohly1i1ivug2w5uj31kw0w0qv5.jpg) center / 100% 100%;
		.rgs-form {
			border-radius: 10px;
			padding: 0;
			box-shadow: none;
			margin: 140px 0 40px;
			z-index: 1;
			background: none;
			width: auto;
			height: auto;
			.rgs-form2 {
				width: 100%;
				.title {
					margin: 0 0 40px 0;
					text-shadow: none;
					color: #000;
					font-weight: 700;
					width: 100%;
					font-size: 24px;
					line-height: 36px;
					text-align: center;
				}
				.subtitle {
					margin: 0 0 10px 0;
					text-shadow: 4px 4px 2px rgba(64, 158, 255, .5);
					color: rgba(64, 158, 255, 1);
					width: 100%;
					font-size: 20px;
					line-height: 44px;
					text-align: center;
				}
				.list-item {
					border-radius: 25px;
					padding: 0 10px;
					margin: 0 0 30px 0;
					background: linear-gradient(0.00deg, rgb(173, 98, 96) -30%,rgb(255, 241, 238) 14.156%,rgb(255, 250, 249) 100%);
					display: flex;
					width: 440px;
					/deep/.el-form-item__content {
						display: flex;
						width: 100%;
						.label {
							border-radius: 5px;
							color: #DC9D1F;
							flex: none;
							background: none;
							width: auto;
							font-size: 14px;
							line-height: 44px;
							text-align: center;
							min-width: 80px;
						}
						
						.required {
							position: relative;
						}
						.required::after{
							color: red;
							left: -10px;
							position: absolute;
							content: "*";
						}
						.el-input {
							width: 100%;
						}
						.el-input .el-input__inner {
							border: none;
							padding: 0 10px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.el-input .el-input__inner:focus {
							border: none;
							padding: 0 10px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.el-input-number {
							width: 100%;
						}
						.el-input-number .el-input__inner {
							text-align: left;
							border: none;
							padding: 0 10px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.el-input-number .el-input-number__decrease {
							display: none;
						}
						.el-input-number .el-input-number__increase {
							display: none;
						}
						.el-select {
							width: 100%;
						}
						.el-select .el-input__inner {
							border: none;
							padding: 0 10px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.el-select .el-input__inner:focus {
							border: none;
							padding: 0 10px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.el-date-editor {
							width: 100%;
						}
						.el-date-editor .el-input__inner {
							border: none;
							padding: 0 0 0 40px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.el-date-editor .el-input__inner:focus {
							border: none;
							padding: 0 0 0 40px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.el-upload--picture-card {
							background: transparent;
							border: 0;
							border-radius: 0;
							width: auto;
							height: auto;
							line-height: initial;
							vertical-align: middle;
						}
						.upload .upload-img {
							border: 1px dashed rgba(64, 158, 255, 1);
							cursor: pointer;
							border-radius: 8px;
							color: rgba(64, 158, 255, 1);
							width: 160px;
							font-size: 32px;
							line-height: 160px;
							text-align: center;
							height: 160px;
						}
						.el-upload-list .el-upload-list__item {
							border: 1px dashed rgba(64, 158, 255, 1);
							cursor: pointer;
							border-radius: 8px;
							color: rgba(64, 158, 255, 1);
							width: 160px;
							font-size: 32px;
							line-height: 160px;
							text-align: center;
							height: 160px;
							font-size: 14px;
							line-height: 1.8;
						}
						.el-upload .el-icon-plus {
							border: 1px dashed rgba(64, 158, 255, 1);
							cursor: pointer;
							border-radius: 8px;
							color: rgba(64, 158, 255, 1);
							width: 160px;
							font-size: 32px;
							line-height: 160px;
							text-align: center;
							height: 160px;
						}
						.el-upload__tip {
							color: #838fa1;
						}
						.emailInput {
							border: none;
							padding: 0 10px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.emailInput:focus {
							border: none;
							padding: 0 10px;
							outline: none;
							color: #000;
							flex: auto;
							background: none;
							width: 100%;
							font-size: 14px;
							height: 44px;
						}
						.el-btn {
							border: 0;
							cursor: pointer;
							padding: 0;
							margin: 0;
							color: #fff;
							font-size: 12px;
							border-radius: 25px;
							box-shadow: none;
							outline: none;
							background: #A50E11;
							flex: none;
							width: 80px;
							height: 44px;
						}
						.el-btn:hover {
							opacity: 0.7;
						}
						
						.el-input__inner::placeholder {
							color: #A4A4A4;
							font-size: 14px;
						}
						input::placeholder {
							color: #A4A4A4;
							font-size: 14px;
						}
						.editor {
							width: 100%;
							height: auto;
						}
					}
				}
				.register-btn {
					padding: 0 0 20px 0;
					width: 100%;
				}
				.register-btn1 {
					width: 100%;
				}
				.register-btn2 {
					width: 100%;
				}
				.register_btn {
					border: none;
					cursor: pointer;
					border-radius: 25px;
					padding: 0 30px;
					margin: 0;
					outline: none;
					color: #fff;
					background: linear-gradient(270.00deg, rgb(165, 14, 17) 0%,rgb(239, 204, 184) 100%);
					width: 440px;
					font-size: 14px;
					height: 44px;
				}
				.register_btn:hover {
					opacity: 0.5;
				}
				.has_btn {
					cursor: pointer;
					padding: 0;
					margin: 10px 0 0;
					color: #DC9D1F;
					display: inline-block;
					text-decoration: none;
					font-size: 12px;
					line-height: 1;
				}
				.has_btn:hover {
					opacity: 0.5;
				}
			}
			.idea1 {
				background: red;
				display: none;
				width: 100%;
				height: 40px;
			}
			.idea2 {
				background: blue;
				display: none;
				width: 100%;
				height: 40px;
			}
		}
	}
	
	::-webkit-scrollbar {
		display: none;
	}
</style>
