import VueRouter from 'vue-router'
//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Forum from '../pages/forum/list'
import ForumAdd from '../pages/forum/add'
import ForumDetail from '../pages/forum/detail'
import MyForumList from '../pages/forum/myForumList'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import ertongList from '../pages/ertong/list'
import ertongDetail from '../pages/ertong/detail'
import ertongAdd from '../pages/ertong/add'
import zizhurenList from '../pages/zizhuren/list'
import zizhurenDetail from '../pages/zizhuren/detail'
import zizhurenAdd from '../pages/zizhuren/add'
import zizhuleixingList from '../pages/zizhuleixing/list'
import zizhuleixingDetail from '../pages/zizhuleixing/detail'
import zizhuleixingAdd from '../pages/zizhuleixing/add'
import zizhuxiangmuList from '../pages/zizhuxiangmu/list'
import zizhuxiangmuDetail from '../pages/zizhuxiangmu/detail'
import zizhuxiangmuAdd from '../pages/zizhuxiangmu/add'
import xuanzezizhuList from '../pages/xuanzezizhu/list'
import xuanzezizhuDetail from '../pages/xuanzezizhu/detail'
import xuanzezizhuAdd from '../pages/xuanzezizhu/add'
import zizhushenqingList from '../pages/zizhushenqing/list'
import zizhushenqingDetail from '../pages/zizhushenqing/detail'
import zizhushenqingAdd from '../pages/zizhushenqing/add'
import zizhujiluList from '../pages/zizhujilu/list'
import zizhujiluDetail from '../pages/zizhujilu/detail'
import zizhujiluAdd from '../pages/zizhujilu/add'
import zizhufankuiList from '../pages/zizhufankui/list'
import zizhufankuiDetail from '../pages/zizhufankui/detail'
import zizhufankuiAdd from '../pages/zizhufankui/add'
import forumtypeList from '../pages/forumtype/list'
import forumtypeDetail from '../pages/forumtype/detail'
import forumtypeAdd from '../pages/forumtype/add'
import forumreportList from '../pages/forumreport/list'
import forumreportDetail from '../pages/forumreport/detail'
import forumreportAdd from '../pages/forumreport/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import emailregistercodeList from '../pages/emailregistercode/list'
import emailregistercodeDetail from '../pages/emailregistercode/detail'
import emailregistercodeAdd from '../pages/emailregistercode/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'forum',
					component: Forum
				},
				{
					path: 'forumAdd',
					component: ForumAdd
				},
				{
					path: 'forumDetail',
					component: ForumDetail
				},
				{
					path: 'myForumList',
					component: MyForumList
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'ertong',
					component: ertongList
				},
				{
					path: 'ertongDetail',
					component: ertongDetail
				},
				{
					path: 'ertongAdd',
					component: ertongAdd
				},
				{
					path: 'zizhuren',
					component: zizhurenList
				},
				{
					path: 'zizhurenDetail',
					component: zizhurenDetail
				},
				{
					path: 'zizhurenAdd',
					component: zizhurenAdd
				},
				{
					path: 'zizhuleixing',
					component: zizhuleixingList
				},
				{
					path: 'zizhuleixingDetail',
					component: zizhuleixingDetail
				},
				{
					path: 'zizhuleixingAdd',
					component: zizhuleixingAdd
				},
				{
					path: 'zizhuxiangmu',
					component: zizhuxiangmuList
				},
				{
					path: 'zizhuxiangmuDetail',
					component: zizhuxiangmuDetail
				},
				{
					path: 'zizhuxiangmuAdd',
					component: zizhuxiangmuAdd
				},
				{
					path: 'xuanzezizhu',
					component: xuanzezizhuList
				},
				{
					path: 'xuanzezizhuDetail',
					component: xuanzezizhuDetail
				},
				{
					path: 'xuanzezizhuAdd',
					component: xuanzezizhuAdd
				},
				{
					path: 'zizhushenqing',
					component: zizhushenqingList
				},
				{
					path: 'zizhushenqingDetail',
					component: zizhushenqingDetail
				},
				{
					path: 'zizhushenqingAdd',
					component: zizhushenqingAdd
				},
				{
					path: 'zizhujilu',
					component: zizhujiluList
				},
				{
					path: 'zizhujiluDetail',
					component: zizhujiluDetail
				},
				{
					path: 'zizhujiluAdd',
					component: zizhujiluAdd
				},
				{
					path: 'zizhufankui',
					component: zizhufankuiList
				},
				{
					path: 'zizhufankuiDetail',
					component: zizhufankuiDetail
				},
				{
					path: 'zizhufankuiAdd',
					component: zizhufankuiAdd
				},
				{
					path: 'forumtype',
					component: forumtypeList
				},
				{
					path: 'forumtypeDetail',
					component: forumtypeDetail
				},
				{
					path: 'forumtypeAdd',
					component: forumtypeAdd
				},
				{
					path: 'forumreport',
					component: forumreportList
				},
				{
					path: 'forumreportDetail',
					component: forumreportDetail
				},
				{
					path: 'forumreportAdd',
					component: forumreportAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'emailregistercode',
					component: emailregistercodeList
				},
				{
					path: 'emailregistercodeDetail',
					component: emailregistercodeDetail
				},
				{
					path: 'emailregistercodeAdd',
					component: emailregistercodeAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
