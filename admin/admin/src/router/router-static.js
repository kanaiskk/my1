import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
	import news from '@/views/modules/news/list'
	import zizhufankui from '@/views/modules/zizhufankui/list'
	import zizhuleixing from '@/views/modules/zizhuleixing/list'
	import zizhujilu from '@/views/modules/zizhujilu/list'
	import storeup from '@/views/modules/storeup/list'
	import xuanzezizhu from '@/views/modules/xuanzezizhu/list'
	import forum from '@/views/modules/forum/list'
	import forumtype from '@/views/modules/forumtype/list'
	import zizhushenqing from '@/views/modules/zizhushenqing/list'
	import zizhuxiangmu from '@/views/modules/zizhuxiangmu/list'
	import ertong from '@/views/modules/ertong/list'
	import forumreport from '@/views/modules/forumreport/list'
	import config from '@/views/modules/config/list'
	import zizhuren from '@/views/modules/zizhuren/list'
	import newstype from '@/views/modules/newstype/list'


//2.配置路由   注意：名字
export const routes = [{
	path: '/',
	name: '系统首页',
	component: Index,
	children: [{
		// 这里不设置值，是把main作为默认页面
		path: '/',
		name: '系统首页',
		component: Home,
		meta: {icon:'', title:'center', affix: true}
	}, {
		path: '/updatePassword',
		name: '修改密码',
		component: UpdatePassword,
		meta: {icon:'', title:'updatePassword'}
	}, {
		path: '/pay',
		name: '支付',
		component: pay,
		meta: {icon:'', title:'pay'}
	}, {
		path: '/center',
		name: '个人信息',
		component: center,
		meta: {icon:'', title:'center'}
	}
	,{
		path: '/news',
		name: '政策公告',
		component: news
	}
	,{
		path: '/zizhufankui',
		name: '资助反馈',
		component: zizhufankui
	}
	,{
		path: '/zizhuleixing',
		name: '资助类型',
		component: zizhuleixing
	}
	,{
		path: '/zizhujilu',
		name: '资助记录',
		component: zizhujilu
	}
	,{
		path: '/storeup',
		name: '我的收藏',
		component: storeup
	}
	,{
		path: '/xuanzezizhu',
		name: '选择资助',
		component: xuanzezizhu
	}
	,{
		path: '/forum',
		name: '互动论坛',
		component: forum
	}
	,{
		path: '/forumtype',
		name: '论坛分类',
		component: forumtype
	}
	,{
		path: '/zizhushenqing',
		name: '资助申请',
		component: zizhushenqing
	}
	,{
		path: '/zizhuxiangmu',
		name: '资助项目',
		component: zizhuxiangmu
	}
	,{
		path: '/ertong',
		name: '儿童',
		component: ertong
	}
	,{
		path: '/forumreport',
		name: '举报记录',
		component: forumreport
	}
	,{
		path: '/config',
		name: '轮播图管理',
		component: config
	}
	,{
		path: '/zizhuren',
		name: '资助人',
		component: zizhuren
	}
	,{
		path: '/newstype',
		name: '政策公告分类',
		component: newstype
	}
	]
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {icon:'', title:'login'}
	},
	{
		path: '/register',
		name: 'register',
		component: register,
		meta: {icon:'', title:'register'}
	},
	{
		path: '*',
		component: NotFound
	}
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
	mode: 'hash',
	/*hash模式改为history*/
	routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
export default router;
