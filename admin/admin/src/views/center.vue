<template>
	<div :style='{"width":"100%","padding":"20px 30px","fontSize":"18px"}'>
		<el-form
			:style='{"padding":"40px 30% 40px 10%","borderColor":"#eee","borderStyle":"solid","borderWidth":"0px 0 0","background":"url(http://codegen.caihongy.cn/20250312/b9712448801d4664b72de26e917dcd3f.jpg) no-repeat center center / cover"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			label-width="180px"
		>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='ertong'"  label="儿童账号" prop="ertongzhanghao">
					<el-input v-model="ruleForm.ertongzhanghao" readonly						placeholder="儿童账号" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='ertong'"  label="儿童姓名" prop="ertongxingming">
					<el-input v-model="ruleForm.ertongxingming" 						placeholder="儿童姓名" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}' v-if="flag=='ertong'"  label="性别" prop="xingbie">
					<el-select v-model="ruleForm.xingbie"  placeholder="请选择性别">
						<el-option
							v-for="(item,index) in ertongxingbieOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}' v-if="flag=='ertong'" label="头像" prop="touxiang">
					<file-upload
						tip="点击上传头像"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
						@change="ertongtouxiangUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='ertong'"  label="联系方式" prop="lianxifangshi">
					<el-input v-model="ruleForm.lianxifangshi" 						placeholder="联系方式" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='ertong'"  label="密保问题" prop="pquestion">
					<el-input v-model="ruleForm.pquestion" 						placeholder="密保问题" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='ertong'"  label="密保答案" prop="panswer">
					<el-input v-model="ruleForm.panswer" 						placeholder="密保答案" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='zizhuren'"  label="资助人账号" prop="zizhurenzhanghao">
					<el-input v-model="ruleForm.zizhurenzhanghao" readonly						placeholder="资助人账号" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='zizhuren'"  label="资助人姓名" prop="zizhurenxingming">
					<el-input v-model="ruleForm.zizhurenxingming" 						placeholder="资助人姓名" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}' v-if="flag=='zizhuren'"  label="性别" prop="xingbie">
					<el-select v-model="ruleForm.xingbie"  placeholder="请选择性别">
						<el-option
							v-for="(item,index) in zizhurenxingbieOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}' v-if="flag=='zizhuren'" label="头像" prop="touxiang">
					<file-upload
						tip="点击上传头像"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
						@change="zizhurentouxiangUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='zizhuren'"  label="联系电话" prop="lianxidianhua">
					<el-input v-model="ruleForm.lianxidianhua" 						placeholder="联系电话" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='zizhuren'"  label="邮箱" prop="email">
					<el-input v-model="ruleForm.email" 						placeholder="邮箱" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='zizhuren'"  label="密保问题" prop="pquestion">
					<el-input v-model="ruleForm.pquestion" 						placeholder="密保问题" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}'   v-if="flag=='zizhuren'"  label="密保答案" prop="panswer">
					<el-input v-model="ruleForm.panswer" 						placeholder="密保答案" clearable></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}' v-if="flag=='users'" label="用户名" prop="username">
					<el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0 0 26px 0","display":"inline-block"}' v-if="flag=='users'" label="头像" prop="image">
					<file-upload
						tip="点击上传头像"
						action="file/upload"
						:limit="1"
						:multiple="false"
						:fileUrls="ruleForm.image?ruleForm.image:''"
						@change="usersimageUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"padding":"0","margin":"20px 0 0"}'>
					<el-button class="btn3" :style='{"border":"0px solid #ccc","cursor":"pointer","padding":"0 10px","margin":"0 10px 0 0","color":"#fff","borderRadius":"6px","background":"#E49917","width":"auto","fontSize":"16px","minWidth":"110px","height":"40px"}' type="primary" @click="onUpdateHandler">
						<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","display":"none","height":"40px"}'></span>
						提交
					</el-button>
				</el-form-item>
		</el-form>
	</div>
</template>
<script>
// 校验引入
import { 
	isEmail,
	isMobile,
} from "@/utils/validate";

export default {
	data() {
		return {
			ruleForm: {},
			flag: '',
			usersFlag: false,
			ertongxingbieOptions: [],
			zizhurenxingbieOptions: [],
		};
	},
	mounted() {
		var table = this.$storage.get("sessionTable");
		this.flag = table;
		this.$http({
			url: `${this.$storage.get("sessionTable")}/session`,
			method: "get"
		}).then(({ data }) => {
			if (data && data.code === 0) {
				this.ruleForm = data.data;
			} else {
				this.$message.error(data.msg);
			}
		});
		this.ertongxingbieOptions = "男,女".split(',')
		this.zizhurenxingbieOptions = "男,女".split(',')
	},
	methods: {
		ertongtouxiangUploadChange(fileUrls) {
			this.ruleForm.touxiang = fileUrls;
		},
		zizhurentouxiangUploadChange(fileUrls) {
			this.ruleForm.touxiang = fileUrls;
		},
		usersimageUploadChange(fileUrls) {
			this.ruleForm.image = fileUrls;
		},
		onUpdateHandler() {
			if((!this.ruleForm.ertongzhanghao)&& 'ertong'==this.flag){
				this.$message.error('儿童账号不能为空');
				return
			}


			if((!this.ruleForm.mima)&& 'ertong'==this.flag){
				this.$message.error('密码不能为空');
				return
			}

			if((!this.ruleForm.ertongxingming)&& 'ertong'==this.flag){
				this.$message.error('儿童姓名不能为空');
				return
			}






			if(this.ruleForm.touxiang!=null) {
				this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
			}


			if( 'ertong' ==this.flag && this.ruleForm.lianxifangshi&&(!isMobile(this.ruleForm.lianxifangshi))){
				this.$message.error(`联系方式应输入手机格式`);
				return
			}




			if((!this.ruleForm.zizhurenzhanghao)&& 'zizhuren'==this.flag){
				this.$message.error('资助人账号不能为空');
				return
			}


			if((!this.ruleForm.mima)&& 'zizhuren'==this.flag){
				this.$message.error('密码不能为空');
				return
			}

			if((!this.ruleForm.zizhurenxingming)&& 'zizhuren'==this.flag){
				this.$message.error('资助人姓名不能为空');
				return
			}






			if(this.ruleForm.touxiang!=null) {
				this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
			}


			if( 'zizhuren' ==this.flag && this.ruleForm.lianxidianhua&&(!isMobile(this.ruleForm.lianxidianhua))){
				this.$message.error(`联系电话应输入手机格式`);
				return
			}


			if( 'zizhuren' ==this.flag && this.ruleForm.email&&(!isEmail(this.ruleForm.email))){
				this.$message.error(`邮箱应输入邮箱格式`);
				return
			}




			if('users'==this.flag && this.ruleForm.username.trim().length<1) {
				this.$message.error(`用户名不能为空`);
				return	
			}
			if(this.flag=='users'){
				this.ruleForm.image = this.ruleForm.image.replace(new RegExp(this.$base.url,"g"),"")
			}
			this.$http({
				url: `${this.$storage.get("sessionTable")}/update`,
				method: "post",
				data: this.ruleForm
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "修改信息成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							if(this.flag=='users'){
								this.$storage.set('headportrait',this.ruleForm.image)
							}
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
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
				padding: 0 10px 0 0;
				color: #6e6e6e;
				font-weight: 500;
				width: 180px;
				font-size: 16px;
				line-height: 40px;
				text-align: right;
			}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
		margin-left: 180px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
				border: 1px solid #E8E8E8;
				border-radius: 0px;
				padding: 0 12px;
				color: #666;
				background: #fff;
				width: 100%;
				font-size: 16px;
				min-width: 50%;
				height: 40px;
			}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
				border: 1px solid #E8E8E88;
				border-radius: 0px;
				padding: 0 10px;
				color: #666;
				background: #fff;
				width: 100%;
				font-size: 16px;
				height: 40px;
			}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
				border: 1px solid #E8E8E8;
				border-radius: 0px;
				padding: 0 10px 0 30px;
				color: #666;
				background: #fff;
				width: 100%;
				font-size: 16px;
				height: 40px;
			}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
				border: 1px solid #E8E8E8;
				cursor: pointer;
				border-radius: 0px;
				color: #666;
				background: #fff;
				width: 90px;
				font-size: 24px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
				border: 1px solid #E8E8E8;
				cursor: pointer;
				border-radius: 0px;
				color: #666;
				background: #fff;
				width: 90px;
				font-size: 24px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
				border: 1px solid #E8E8E8;
				border-radius: 0px;
				padding: 12px;
				color: #666;
				background: #fff;
				width: auto;
				font-size: 16px;
				min-width: 400px;
				height: 120px;
			}
	
	.add-update-preview .btn3 {
				border: 0px solid #ccc;
				cursor: pointer;
				border-radius: 6px;
				padding: 0 10px;
				margin: 0 10px 0 0;
				color: #fff;
				background: #E49917;
				width: auto;
				font-size: 16px;
				min-width: 110px;
				height: 40px;
			}
	
	.add-update-preview .btn3:hover {
				opacity: 0.8;
			}
	
	.editor>.avatar-uploader {
		line-height: 0;
		height: 0;
	}
</style>
