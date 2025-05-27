<template>
	<div class="add-update-preview">
		<el-form
			class="add-update-form"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="120px"
			>
			<el-form-item class="add-item" label="项目名称" prop="xiangmumingcheng">
				<el-input v-model="ruleForm.xiangmumingcheng" 
					placeholder="项目名称" clearable :disabled=" false  ||ro.xiangmumingcheng"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="资助类型" prop="zizhuleixing">
				<el-input v-model="ruleForm.zizhuleixing" 
					placeholder="资助类型" clearable :disabled=" false  ||ro.zizhuleixing"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="项目封面" v-if="type!='cross' || (type=='cross' && !ro.xiangmufengmian)" prop="xiangmufengmian">
				<file-upload
					tip="点击上传项目封面"
					action="file/upload"
					:limit="3"
					:multiple="true"
					:fileUrls="ruleForm.xiangmufengmian?ruleForm.xiangmufengmian:''"
					@change="xiangmufengmianUploadChange"
					></file-upload>
			</el-form-item>
			<el-form-item class="add-item" v-else label="项目封面" prop="xiangmufengmian">
				<img v-if="ruleForm.xiangmufengmian.substring(0,4)=='http'" class="upload-img" v-bind:key="index" :src="ruleForm.xiangmufengmian.split(',')[0]">
				<img v-else class="upload-img" v-bind:key="index" v-for="(item,index) in ruleForm.xiangmufengmian.split(',')" :src="baseUrl+item">
			</el-form-item>
			<el-form-item class="add-item" label="反馈内容" prop="fankuineirong">
				<el-input v-model="ruleForm.fankuineirong" 
					placeholder="反馈内容" clearable :disabled=" false  ||ro.fankuineirong"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="申请金额" prop="zizhujine">
				<el-input-number v-model="ruleForm.zizhujine" placeholder="申请金额" :disabled=" false ||ro.zizhujine"></el-input-number>
			</el-form-item>
			<el-form-item class="add-item" label="反馈时间" prop="fankuishijian">
				<el-date-picker
					:disabled=" false  ||ro.fankuishijian"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
					v-model="ruleForm.fankuishijian" 
					type="date"
					placeholder="反馈时间">
				</el-date-picker> 
			</el-form-item>
			<el-form-item class="add-item" label="资助人账号" prop="zizhurenzhanghao">
				<el-input v-model="ruleForm.zizhurenzhanghao" 
					placeholder="资助人账号" clearable :disabled=" false  ||ro.zizhurenzhanghao"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="资助人姓名" prop="zizhurenxingming">
				<el-input v-model="ruleForm.zizhurenxingming" 
					placeholder="资助人姓名" clearable :disabled=" false  ||ro.zizhurenxingming"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="儿童账号" prop="ertongzhanghao">
				<el-input v-model="ruleForm.ertongzhanghao" 
					placeholder="儿童账号" clearable :disabled=" false  ||ro.ertongzhanghao"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="儿童姓名" prop="ertongxingming">
				<el-input v-model="ruleForm.ertongxingming" 
					placeholder="儿童姓名" clearable :disabled=" false  ||ro.ertongxingming"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="反馈详情" prop="fankuixiangqing">
				<editor 
					v-model="ruleForm.fankuixiangqing" 
					class="editor" 
					myQuillEditor="fankuixiangqing"
					action="file/upload">
				</editor>
			</el-form-item>

			<el-form-item class="add-btn-item">
				<el-button class="submitBtn"  type="primary" @click="onSubmit">
					<span class="icon iconfont icon-kaitongfuwu"></span>
					<span class="text">提交</span>
				</el-button>
				<el-button class="closeBtn" @click="back()">
					<span class="icon iconfont icon-shanchu1"></span>
					<span class="text">取消</span>
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				baseUrl: '',
				ro:{
					xiangmumingcheng : false,
					zizhuleixing : false,
					xiangmufengmian : false,
					fankuineirong : false,
					zizhujine : false,
					fankuishijian : false,
					fankuixiangqing : false,
					zizhurenzhanghao : false,
					zizhurenxingming : false,
					ertongzhanghao : false,
					ertongxingming : false,
				},
				type: '',
				userTableName: localStorage.getItem('UserTableName'),
				ruleForm: {
					xiangmumingcheng: '',
					zizhuleixing: '',
					xiangmufengmian: '',
					fankuineirong: '',
					zizhujine: '',
					fankuishijian: '',
					fankuixiangqing: '',
					zizhurenzhanghao: '',
					zizhurenxingming: '',
					ertongzhanghao: '',
					ertongxingming: '',
				},


				rules: {
					xiangmumingcheng: [
					],
					zizhuleixing: [
					],
					xiangmufengmian: [
					],
					fankuineirong: [
					],
					zizhujine: [
						{ validator: this.$validate.isNumber, trigger: 'blur' },
					],
					fankuishijian: [
					],
					fankuixiangqing: [
					],
					zizhurenzhanghao: [
					],
					zizhurenxingming: [
					],
					ertongzhanghao: [
					],
					ertongxingming: [
					],
				},
				centerType: false,
			};
		},
		computed: {



		},
		components: {
		},
		created() {
			if(this.$route.query.centerType){
				this.centerType = true
			}
			//this.bg();
			let type = this.$route.query.type ? this.$route.query.type : '';
			this.init(type);
			this.baseUrl = this.$config.baseUrl;
			this.ruleForm.fankuishijian = this.getCurDate()
		},
		methods: {
			getMakeZero(s) {
				return s < 10 ? '0' + s : s;
			},
			// 下载
			download(file){
				window.open(`${file}`)
			},
			// 初始化
			init(type) {
				this.type = type;
				if(type=='cross'){
					var obj = JSON.parse(localStorage.getItem('crossObj'));
					for (var o in obj){
						if(o=='xiangmumingcheng'){
							this.ruleForm.xiangmumingcheng = obj[o];
							this.ro.xiangmumingcheng = true;
							continue;
						}
						if(o=='zizhuleixing'){
							this.ruleForm.zizhuleixing = obj[o];
							this.ro.zizhuleixing = true;
							continue;
						}
						if(o=='xiangmufengmian'){
							this.ruleForm.xiangmufengmian = obj[o]?obj[o].split(",")[0]:'';
							this.ro.xiangmufengmian = true;
							continue;
						}
						if(o=='fankuineirong'){
							this.ruleForm.fankuineirong = obj[o];
							this.ro.fankuineirong = true;
							continue;
						}
						if(o=='zizhujine'){
							this.ruleForm.zizhujine = obj[o];
							this.ro.zizhujine = true;
							continue;
						}
						if(o=='fankuishijian'){
							this.ruleForm.fankuishijian = obj[o];
							this.ro.fankuishijian = true;
							continue;
						}
						if(o=='fankuixiangqing'){
							this.ruleForm.fankuixiangqing = obj[o];
							this.ro.fankuixiangqing = true;
							continue;
						}
						if(o=='zizhurenzhanghao'){
							this.ruleForm.zizhurenzhanghao = obj[o];
							this.ro.zizhurenzhanghao = true;
							continue;
						}
						if(o=='zizhurenxingming'){
							this.ruleForm.zizhurenxingming = obj[o];
							this.ro.zizhurenxingming = true;
							continue;
						}
						if(o=='ertongzhanghao'){
							this.ruleForm.ertongzhanghao = obj[o];
							this.ro.ertongzhanghao = true;
							continue;
						}
						if(o=='ertongxingming'){
							this.ruleForm.ertongxingming = obj[o];
							this.ro.ertongxingming = true;
							continue;
						}
					}
				}else if(type=='edit'){
					this.info()
				}
				// 获取用户信息
				this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
					if (res.data.code == 0) {
						var json = res.data.data;
						if((json.ertongzhanghao!=''&&json.ertongzhanghao) || json.ertongzhanghao==0){
							this.ruleForm.ertongzhanghao = json.ertongzhanghao;
							this.ro.ertongzhanghao = true;
						}
						if((json.ertongxingming!=''&&json.ertongxingming) || json.ertongxingming==0){
							this.ruleForm.ertongxingming = json.ertongxingming;
							this.ro.ertongxingming = true;
						}
					}
				});

				if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
					localStorage.removeItem('raffleType')
					setTimeout(() => {
						this.onSubmit()
					}, 300)
				}
			},

			// 多级联动参数
			// 多级联动参数
			info() {
				this.$http.get(`zizhufankui/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
					if (res.data.code == 0) {
						this.ruleForm = res.data.data;
					}
				});
			},
			// 提交
			async onSubmit() {
				if(!this.ruleForm.id) {
					delete this.ruleForm.userid
				}
				await this.$refs["ruleForm"].validate(async valid => {
					if(valid) {
						if(this.type=='cross'){
							var statusColumnName = localStorage.getItem('statusColumnName');
							var statusColumnValue = localStorage.getItem('statusColumnValue');
							if(statusColumnName && statusColumnName!='') {
								var obj = JSON.parse(localStorage.getItem('crossObj'));
								if(!statusColumnName.startsWith("[")) {
									for (var o in obj){
										if(o==statusColumnName){
											obj[o] = statusColumnValue;
										}
									}
									var table = localStorage.getItem('crossTable');
									await this.$http.post(table+'/update', obj).then(res => {});
								}
							}
						}


						await this.$http.post(`zizhufankui/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(async res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
										
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
							}
						});
					}
				});
			},
			// 获取uuid
			getUUID () {
				return new Date().getTime();
			},
			// 返回
			back() {
				this.$router.go(-1);
			},
			xiangmufengmianUploadChange(fileUrls) {
				this.ruleForm.xiangmufengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
			},
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.add-update-preview {
		padding: 20px;
		margin: 10px auto;
		background: none;
		width: 1200px;
		position: relative;
		.add-update-form {
			width: 100%;
			position: relative;
			.add-item.el-form-item {
				padding: 10px;
				margin: 0 0 10px;
				background: #efefef;
				/deep/ .el-form-item__label {
					padding: 0 10px 0 0;
					color: #666;
					font-weight: 500;
					width: 120px;
					font-size: 14px;
					line-height: 40px;
					text-align: right;
				}
				/deep/ .el-form-item__content {
					margin-left: 120px;
				}
				.el-input {
					width: 100%;
				}
				.el-input /deep/ .el-input__inner {
					border: 0;
					border-radius: 4px;
					padding: 0 12px;
					box-shadow: 0 0 6px rgba(64, 158, 255, .5);
					outline: none;
					color: #000;
					width: 400px;
					font-size: 14px;
					height: 40px;
				}
				.el-input /deep/ .el-input__inner[readonly="readonly"] {
					border: 0;
					cursor: not-allowed;
					border-radius: 4px;
					padding: 0 12px;
					box-shadow: 0 0 6px rgba(85, 85, 127, 0.5);
					outline: none;
					color: rgba(85, 85, 127, 1.0);
					width: 400px;
					font-size: 14px;
					height: 40px;
				}
				.el-input-number /deep/ .el-input__inner {
					text-align: left;
					border: 0;
					border-radius: 4px;
					padding: 0 12px;
					box-shadow: 0 0 6px rgba(64, 158, 255, .5);
					outline: none;
					color: #000;
					width: 400px;
					font-size: 14px;
					height: 40px;
				}
				.el-input-number /deep/ .is-disabled .el-input__inner {
					text-align: left;
					border: 0;
					cursor: not-allowed;
					border-radius: 4px;
					padding: 0 12px;
					box-shadow: 0 0 6px rgba(85, 85, 127, 0.5);
					outline: none;
					color: rgba(85, 85, 127, 1.0);
					width: 400px;
					font-size: 14px;
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
					border: 0;
					border-radius: 4px;
					padding: 0 10px;
					box-shadow: 0 0 6px rgba(64, 158, 255, .5);
					outline: none;
					color: #000;
					width: 200px;
					font-size: 14px;
					height: 40px;
				}
				.el-select /deep/ .is-disabled .el-input__inner {
					border: 0;
					cursor: not-allowed;
					border-radius: 4px;
					padding: 0 10px;
					box-shadow: 0 0 6px rgba(85, 85, 127, 0.5);
					outline: none;
					color: rgba(85, 85, 127, 1.0);
					background: #eee;
					width: 200px;
					font-size: 14px;
					height: 40px;
				}
				.el-date-editor {
					width: 100%;
				}
				.el-date-editor /deep/ .el-input__inner {
					border: 0;
					border-radius: 4px;
					padding: 0 10px 0 30px;
					box-shadow: 0 0 6px rgba(64, 158, 255, .5);
					outline: none;
					color: #000;
					width: 200px;
					font-size: 14px;
					height: 40px;
				}
				.el-date-editor /deep/ .el-input__inner[readonly="readonly"] {
					border: 0;
					cursor: not-allowed;
					border-radius: 4px;
					padding: 0 10px 0 30px;
					box-shadow: 0 0 6px rgba(85, 85, 127, 0.5);
					outline: none;
					color: rgba(85, 85, 127, 1.0);
					background: #eee;
					width: 200px;
					font-size: 14px;
					height: 40px;
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
					border: 1px dashed rgba(64, 158, 255, 1);
					cursor: pointer;
					border-radius: 6px;
					color: rgba(64, 158, 255, 1);
					width: 200px;
					font-size: 32px;
					line-height: 200px;
					text-align: center;
					height: 200px;
				}
				/deep/ .el-upload-list .el-upload-list__item {
					border: 1px dashed rgba(64, 158, 255, 1);
					cursor: pointer;
					border-radius: 6px;
					color: rgba(64, 158, 255, 1);
					width: 200px;
					font-size: 32px;
					line-height: 200px;
					text-align: center;
					height: 200px;
					font-size: 14px;
					line-height: 1.8;
				}
				/deep/ .el-upload .el-icon-plus {
					border: 1px dashed rgba(64, 158, 255, 1);
					cursor: pointer;
					border-radius: 6px;
					color: rgba(64, 158, 255, 1);
					width: 200px;
					font-size: 32px;
					line-height: 200px;
					text-align: center;
					height: 200px;
				}
				/deep/ .el-upload__tip {
					color: #838fa1;
				}
				.el-textarea /deep/ .el-textarea__inner {
					border: 0;
					border-radius: 4px;
					padding: 12px;
					box-shadow: 0 0 6px rgba(64, 158, 255, .5);
					outline: none;
					color: #000;
					width: 400px;
					font-size: 14px;
					height: 120px;
				}
				.el-textarea /deep/ .el-textarea__inner[readonly="readonly"] {
					border: 0;
					cursor: not-allowed;
					border-radius: 4px;
					padding: 12px;
					box-shadow: 0 0 6px rgba(85, 85, 127, 0.5);
					outline: none;
					color: #000;
					width: 400px;
					font-size: 14px;
					height: 120px;
				}
				/deep/ .el-input__inner::placeholder {
					color: #123;
					font-size: 16px;
				}
				/deep/ textarea::placeholder {
					color: #123;
					font-size: 16px;
				}
				.editor {
					background-color: #fff;
					border-radius: 0;
					padding: 0;
					box-shadow: 0 0 6px rgba(75,223,201,.5);
					margin: 0;
					width: 100%;
					border-color: #ccc;
					border-width: 0;
					border-style: solid;
					height: auto;
				}
				.upload-img {
					width: 150px;
					height: 150px;
				}
				.viewBtn {
					border: 0;
					cursor: pointer;
					padding: 0 10px;
					margin: 0;
					color: #fff;
					display: inline-block;
					font-size: 14px;
					line-height: 30px;
					border-radius: 4px;
					outline: none;
					background: #A50E11;
					width: auto;
					height: 30px;
				}
				.viewBtn:hover {
					color: #666;
					background: rgba(64, 158, 255, .5);
				}
				.unviewBtn {
					border: 0;
					cursor: pointer;
					padding: 0 10px;
					margin: 0;
					color: #fff;
					display: inline-block;
					font-size: 14px;
					line-height: 30px;
					border-radius: 4px;
					outline: none;
					background: rgba(85, 85, 127, 1.0);
					width: auto;
					height: 30px;
				}
				.unviewBtn:hover {
					color: #666;
					background: rgba(85, 85, 127, .5);
				}
			}
			.add-btn-item {
				padding: 0;
				margin: 0;
				.submitBtn {
					border: 0;
					cursor: pointer;
					border-radius: 4px;
					padding: 0 15px;
					margin: 0 20px 0 0;
					outline: none;
					background: #A50E11;
					display: inline-block;
					width: auto;
					font-size: 14px;
					line-height: 40px;
					height: 40px;
					.icon {
						color: rgba(255, 255, 255, 1);
					}
					.text {
						color: rgba(255, 255, 255, 1);
					}
				}
				.submitBtn:hover {
					background: rgba(64, 158, 255, .5);
					.icon {
						color: #000;
					}
					.text {
						color: #000;
					}
				}
				.closeBtn {
					border: none;
					cursor: pointer;
					border-radius: 4px;
					padding: 0 15px;
					margin: 0 20px 0 0;
					outline: none;
					background: #E8E8E8;
					display: inline-block;
					width: auto;
					font-size: 14px;
					line-height: 40px;
					height: 40px;
					.icon {
						color: #000;
					}
					.text {
						color: #000;
					}
				}
				.closeBtn:hover {
					color: rgba(64, 158, 255, .5);
					border-color: rgba(64, 158, 255, .5);
					.icon {
						color: rgba(64, 158, 255, 0.5);
					}
					.text {
						color: rgba(64, 158, 255, 0.5);
					}
				}
			}
		}
	}
	.el-date-editor.el-input {
		width: auto;
	}
</style>
