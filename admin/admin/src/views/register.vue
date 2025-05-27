<template>
	<div>
		<div class="register-container">
			<el-form v-if="pageFlag=='security1'" class="rgs-form animate__animated animate__bounceIn" :model="forgetForm">
				<div class="rgs-form2">
					<div class="title">贫困儿童资助系统找回密码</div>
					<el-form-item class="list-item">
						<el-input v-model="forgetForm.username" autocomplete="off" placeholder="请您输入账号" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<button type="button" class="r-btn" @click="getSecurity()">下一步</button>
						</div>
						<div class="register-btn2">
							<div class="r-login" @click="close()">已有账号，直接登录</div>
						</div>
					</div>
				</div>
            </el-form>
			<el-form v-if="pageFlag=='security2'" class="rgs-form animate__animated animate__bounceIn" :model="ruleForm">
				<div class="rgs-form2">
					<div class="title">贫困儿童资助系统密码重置</div>
					<el-form-item class="list-item">
						<el-input v-model="ruleForm.pquestion" readOnly autocomplete="off" placeholder="密保问题" />
					</el-form-item>
					<el-form-item class="list-item">
						<el-input v-model="ruleForm.myanswer" autocomplete="off" placeholder="请您输入密保答案" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<button type="button" class="r-btn" @click="validateSecurity()">下一步</button>
						</div>
						<div class="register-btn2">
							<div class="r-login" @click="close()">已有账号，直接登录</div>
						</div>
					</div>
				</div>
            </el-form>
			<el-form v-if="pageFlag=='security3'" class="rgs-form animate__animated animate__bounceIn" :model="ruleForm">
				<div class="rgs-form2">
					<div class="title">贫困儿童资助系统密码重置</div>
					<el-form-item class="list-item">
						<el-input v-model="ruleForm.newpassword" autocomplete="off" type="password" placeholder="请您输入新密码" />
					</el-form-item>
					<el-form-item class="list-item">
						<el-input v-model="ruleForm.repassword" autocomplete="off" type="password" placeholder="请您确认新密码" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<button type="button" class="r-btn" @click="updatePassword()">修改密码</button>
						</div>
						<div class="register-btn2">
							<div class="r-login" @click="close()">已有账号，直接登录</div>
						</div>
					</div>
				</div>
			</el-form>
			<el-form v-if="pageFlag=='register'" ref="ruleForm" class="rgs-form animate__animated animate__bounceIn" :model="ruleForm" :rules="rules">
				<div class="rgs-form2">
					<div class="title">贫困儿童资助系统</div>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<el-input  v-model="ruleForm.ertongzhanghao"  autocomplete="off" placeholder="儿童账号"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<el-input  v-model="ruleForm.mima"  autocomplete="off" placeholder="密码"  type="password"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<el-input  v-model="ruleForm.mima2" autocomplete="off" placeholder="确认密码" type="password" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<el-input  v-model="ruleForm.ertongxingming"  autocomplete="off" placeholder="儿童姓名"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<el-select v-model="ruleForm.xingbie" placeholder="请选择性别" >
							<el-option
								v-for="(item,index) in ertongxingbieOptions"
								v-bind:key="index"
								:label="item"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<file-upload
							tip="点击上传头像"
							action="file/upload"
							:limit="3"
							:multiple="true"
							:fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
							@change="ertongtouxiangUploadChange"
						></file-upload>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<el-input  v-model="ruleForm.lianxifangshi"  autocomplete="off" placeholder="联系方式"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<el-input  v-model="ruleForm.pquestion"  autocomplete="off" placeholder="密保问题"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='ertong'">
						<el-input  v-model="ruleForm.panswer"  autocomplete="off" placeholder="密保答案"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<el-input  v-model="ruleForm.zizhurenzhanghao"  autocomplete="off" placeholder="资助人账号"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<el-input  v-model="ruleForm.mima"  autocomplete="off" placeholder="密码"  type="password"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<el-input  v-model="ruleForm.mima2" autocomplete="off" placeholder="确认密码" type="password" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<el-input  v-model="ruleForm.zizhurenxingming"  autocomplete="off" placeholder="资助人姓名"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<el-select v-model="ruleForm.xingbie" placeholder="请选择性别" >
							<el-option
								v-for="(item,index) in zizhurenxingbieOptions"
								v-bind:key="index"
								:label="item"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<file-upload
							tip="点击上传头像"
							action="file/upload"
							:limit="3"
							:multiple="true"
							:fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
							@change="zizhurentouxiangUploadChange"
						></file-upload>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<el-input  v-model="ruleForm.lianxidianhua"  autocomplete="off" placeholder="联系电话"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item email" v-if="tableName=='zizhuren'">
						<div style="display: flex;flex: 1;">
							<input v-model="ruleForm.email" autocomplete="off" placeholder="邮箱"/>
							<button v-if="isEndFlag" type="success" class="register-code" @click="sendemailcode()">发送验证码</button>
							<button v-if="!isEndFlag" type="success" class="register-code" disabled="disabled">{{SecondToDate}}</button>
						</div>
					</el-form-item>
					<el-form-item class="list-item email-code" v-if="tableName=='zizhuren'">
						<el-input  v-model="emailcode" autocomplete="off" placeholder="验证码" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<el-input  v-model="ruleForm.pquestion"  autocomplete="off" placeholder="密保问题"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='zizhuren'">
						<el-input  v-model="ruleForm.panswer"  autocomplete="off" placeholder="密保答案"  type="text"  />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<button type="button" class="r-btn" @click="login()">注册</button>
						</div>
						<div class="register-btn2">
							<div class="r-login" @click="close()">已有账号，直接登录</div>
						</div>
					</div>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import 'animate.css'
export default {
	data() {
		return {
			ruleForm: {
			},
			forgetForm: {},
            pageFlag : '',
			tableName:"",
			rules: {},
            emailcode:'',
			// 倒计时时间
			count: 60,
			// 倒计时定时器
			inter: null,
			// 倒计时是否结束
			isEndFlag: true,
            ertongxingbieOptions: [],
            zizhurenxingbieOptions: [],
		};
	},
	computed: {
		SecondToDate: function() {
			var time = this.count;
			if (null != time && "" != time) {
				time = parseInt(time) + "秒后重发";
			}
			return time;
		}
	},
	mounted(){
		this.pageFlag = this.$route.query.pageFlag
		if(this.$route.query.pageFlag=='register'){
			
			let table = this.$storage.get("loginTable");
			this.tableName = table;
			if(this.tableName=='ertong'){
				this.ruleForm = {
					ertongzhanghao: '',
					mima: '',
					ertongxingming: '',
					xingbie: '',
					touxiang: '',
					lianxifangshi: '',
					pquestion: '',
					panswer: '',
				}
			}
			if(this.tableName=='zizhuren'){
				this.ruleForm = {
					zizhurenzhanghao: '',
					mima: '',
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
				this.rules.ertongzhanghao = [{ required: true, message: '请输入儿童账号', trigger: 'blur' }]
			}
			if ('ertong' == this.tableName) {
				this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('ertong' == this.tableName) {
				this.rules.ertongxingming = [{ required: true, message: '请输入儿童姓名', trigger: 'blur' }]
			}
			if ('zizhuren' == this.tableName) {
				this.rules.zizhurenzhanghao = [{ required: true, message: '请输入资助人账号', trigger: 'blur' }]
			}
			if ('zizhuren' == this.tableName) {
				this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('zizhuren' == this.tableName) {
				this.rules.zizhurenxingming = [{ required: true, message: '请输入资助人姓名', trigger: 'blur' }]
			}
			this.ertongxingbieOptions = "男,女".split(',')
			this.zizhurenxingbieOptions = "男,女".split(',')
		}
	},
	created() {
	},
	destroyed() {
		  	},
	methods: {
		changeRules(name){
			if(this.rules[name]){
				return true
			}
			if(name == 'pquestion'||name=='panswer') {
				return true
			}
			return false
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		close(){
			this.$router.push({ path: "/login" });
		},
        ertongtouxiangUploadChange(fileUrls) {
            this.ruleForm.touxiang = fileUrls;
        },
        zizhurentouxiangUploadChange(fileUrls) {
            this.ruleForm.touxiang = fileUrls;
        },

        // 多级联动参数

		sendemailcode() {
			if(!this.ruleForm.email){
				this.$message.error(`邮箱不能为空`);
				return
			}
			if(this.ruleForm.email&&(!this.$validate.isEmail(this.ruleForm.email))){
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
				url: `${this.tableName}/sendemail?email=`+this.ruleForm.email,
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
            this.tableName = 'zizhuren'
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
                    this.ruleForm = data.data;
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
            if(this.ruleForm.panswer!=this.ruleForm.myanswer){
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
            if (this.ruleForm.newpassword != this.ruleForm.repassword) {
                this.$message.error("两次密码输入不一致");
                return;
            }
            this.ruleForm.mima = this.ruleForm.newpassword;
            this.ruleForm.password = this.ruleForm.newpassword;
            this.$http({
                url: this.tableName+`/update`,
                method: "post",
                data: this.ruleForm
            }).then(({
                data
            }) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: "修改密码成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {}
                    });
                    this.close()
                } else {
                    this.$message.error(data.msg);
                }
            });
        },
		// 注册
		login() {
			var url=this.tableName+"/register";
			if((!this.ruleForm.ertongzhanghao) && `ertong` == this.tableName){
				this.$message.error(`儿童账号不能为空`);
				return
			}
			if((!this.ruleForm.mima) && `ertong` == this.tableName){
				this.$message.error(`密码不能为空`);
				return
			}
			if((this.ruleForm.mima!=this.ruleForm.mima2) && `ertong` == this.tableName){
				this.$message.error(`两次密码输入不一致`);
				return
			}
			if((!this.ruleForm.ertongxingming) && `ertong` == this.tableName){
				this.$message.error(`儿童姓名不能为空`);
				return
			}
            if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
            }
			if(`ertong` == this.tableName && this.ruleForm.lianxifangshi &&(!this.$validate.isMobile(this.ruleForm.lianxifangshi))){
				this.$message.error(`联系方式应输入手机格式`);
				return
			}
			if(`ertong` == this.tableName && this.ruleForm.pquestion==''){
				this.$message.error(`密保问题不能为空`);
				return
			}
			if(`ertong` == this.tableName && this.ruleForm.panswer==''){
				this.$message.error(`密保答案不能为空`);
				return
			}
			if((!this.ruleForm.zizhurenzhanghao) && `zizhuren` == this.tableName){
				this.$message.error(`资助人账号不能为空`);
				return
			}
			if((!this.ruleForm.mima) && `zizhuren` == this.tableName){
				this.$message.error(`密码不能为空`);
				return
			}
			if((this.ruleForm.mima!=this.ruleForm.mima2) && `zizhuren` == this.tableName){
				this.$message.error(`两次密码输入不一致`);
				return
			}
			if((!this.ruleForm.zizhurenxingming) && `zizhuren` == this.tableName){
				this.$message.error(`资助人姓名不能为空`);
				return
			}
            if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
            }
			if(`zizhuren` == this.tableName && this.ruleForm.lianxidianhua &&(!this.$validate.isMobile(this.ruleForm.lianxidianhua))){
				this.$message.error(`联系电话应输入手机格式`);
				return
			}
			if(`zizhuren` == this.tableName && this.ruleForm.email &&(!this.$validate.isEmail(this.ruleForm.email))){
				this.$message.error(`邮箱应输入邮件格式`);
				return
			}
			if(`zizhuren` == this.tableName ){
				url=this.tableName+"/register?emailcode="+this.emailcode;
				if(this.ruleForm.email&&(!this.$validate.isEmail(this.ruleForm.email))){
					this.$message.error(`请输入正确的邮箱格式`);
					return
				}
			}
			if((!this.emailcode) && `zizhuren` == this.tableName){
				this.$message.error(`验证码不能为空`);
				return
			}
			if(`zizhuren` == this.tableName && this.ruleForm.pquestion==''){
				this.$message.error(`密保问题不能为空`);
				return
			}
			if(`zizhuren` == this.tableName && this.ruleForm.panswer==''){
				this.$message.error(`密保答案不能为空`);
				return
			}
			this.$http({
				url: url,
				method: "post",
				data:this.ruleForm
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "注册成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.$router.replace({ path: "/login" });
						}
					});
				} else {
					this.$message.error(data.msg);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.register-container {
	position: relative;
	background: url(https://wx4.sinaimg.cn/mw690/007U62ohly1i1ivu3qd5bj31kw0w0npd.jpg) no-repeat center center / 100% 100%;
	background: url(https://wx4.sinaimg.cn/mw690/007U62ohly1i1ivu3qd5bj31kw0w0npd.jpg) no-repeat center center / 100% 100%;
	display: flex;
	width: 100%;
	min-height: 100vh;
	justify-content: center;
	align-items: center;
	position: relative !important;
	.rgs-form {
		.rgs-form2 {
		width: 100%;
		}
		border-radius: 30px;
		padding: 30px 80px 30px 80px;
		margin: 20px auto 60px;
		background: #0B0B0B80;
		width: 600px;
		height: auto;
		.title {
			padding: 0;
			margin: 0 0 20px 0;
			color: #fff;
			background: none;
			font-weight: 600;
			width: auto;
			font-size: 26px;
			line-height: 40px;
			text-align: center;
		}
		.list-item {
			padding: 0;
			margin: 0 0 10px;
			width: 100%;
			position: relative;
			height: auto;
			/deep/ .el-form-item__content {
			}
			.el-input {
				width: 100%;
			}
			.el-input /deep/ .el-input__inner {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 40px;
			}
			.el-input /deep/ .el-input__inner:focus {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px;
				outline: none;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 40px;
			}
			.el-input-number {
				width: 100%;
			}
			.el-input-number /deep/ .el-input__inner {
				text-align: center;
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 40px;
			}
			.el-input-number /deep/ .el-input__inner:focus {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px;
				outline: none;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 40px;
			}
			.el-input-number /deep/ .el-input-number__decrease {
				display: none;
			}
			.el-input-number /deep/ .el-input-number__increase {
				display: none;
			}
			.el-select {
				width: 100%;
			}
			.el-select /deep/ .el-input__inner {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 38px;
			}
			.el-select /deep/ .el-input__inner:focus {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px;
				outline: none;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 38px;
			}
			.el-date-editor {
				width: 100%;
			}
			.el-date-editor /deep/ .el-input__inner {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px 0 30px;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 38px;
			}
			.el-date-editor /deep/ .el-input__inner:focus {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px 0 30px;
				outline: none;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 38px;
			}
			.el-date-editor.el-input {
				width: 100%;
			}
			/deep/ .el-upload--picture-card {
				background: transparent;
				border: 0;
				border-radius: 0;
				width: auto;
				height: auto;
				line-height: initial;
				vertical-align: middle;
			}
			/deep/ .upload .upload-img {
				border: 1px solid #e6e6e6;
				cursor: pointer;
				border-radius: 8px;
				color: #999;
				background: none;
				width: 90px;
				font-size: 24px;
				border-width: 1px 1px 1px 10px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}
			/deep/ .el-upload-list .el-upload-list__item {
				border: 1px solid #e6e6e6;
				cursor: pointer;
				border-radius: 8px;
				color: #999;
				background: none;
				width: 90px;
				font-size: 24px;
				border-width: 1px 1px 1px 10px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}
			/deep/ .el-upload .el-icon-plus {
				border: 1px solid #e6e6e6;
				cursor: pointer;
				border-radius: 8px;
				color: #999;
				background: none;
				width: 90px;
				font-size: 24px;
				border-width: 1px 1px 1px 10px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}
			/deep/ .el-upload__tip {
				color: #aaa;
				font-size: 15px;
			}
			/deep/ .el-input__inner::placeholder {
				color: #999;
				font-size: 16px;
			}
			.required {
				position: relative;
			}
			.required::after{
				color: red;
				top: 5px;
				left: 136px;
				position: inherit;
				content: "*";
				order: -1;
			}
			.editor {
				background: #fff;
				width: 100%;
				height: auto;
			}
			.editor>.avatar-uploader {
				line-height: 0;
				height: 0;
			}
		}
		.list-item.email {
			input {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px;
				margin: 0;
				color: #666;
				background: none;
				flex: 1;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 38px;
			}
			input:focus {
				border: 1px solid #e6e6e6;
				border-radius: 8px;
				padding: 0 10px;
				outline: none;
				color: #e6e6e6;
				background: none;
				width: 100%;
				font-size: 15px;
				border-width: 1px 1px 1px 10px;
				height: 38px;
			}
			input::placeholder {
				color: #999;
				font-size: 16px;
			}
			button {
				border: 0px solid #e6e6e6;
				cursor: pointer;
				border-radius: 8px;
				padding: 0;
				margin: 0 0 0 10px;
				color: #fff;
				background: #FCBB78;
				width: 150px;
				font-size: 15px;
				height: 38px;
			}
			button:hover {
				opacity: 0.9;
			}
		}
		.register-btn {
			width: 100%;
		}
		.register-btn1 {
			width: 100%;
		}
		.register-btn2 {
			width: 100%;
		}
		.r-btn {
			border: 0px solid rgba(0, 0, 0, 1);
			cursor: pointer;
			padding: 0 10px;
			margin: 0 0 10px;
			color: #fff;
			font-weight: 600;
			letter-spacing: 10px;
			font-size: 22px;
			border-radius: 8px;
			background: #FCBB78;
			width: 100%;
			min-width: 68px;
			height: 50px;
		}
		.r-btn:hover {
			border: 0px solid rgba(0, 0, 0, 1);
			opacity: 0.9;
		}
		.r-login {
			cursor: pointer;
			padding: 0;
			color: #aaa;
			display: inline-block;
			width: 100%;
			font-size: 15px;
			line-height: 40px;
			text-align: right;
		}
		.r-login:hover {
			opacity: 1;
		}
	}
}
	
	::-webkit-scrollbar {
	  display: none;
	}
</style>
