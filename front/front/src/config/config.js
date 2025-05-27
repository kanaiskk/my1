export default {
	baseUrl: 'http://localhost:8080/helpPoorChildren/',
	name: '/helpPoorChildren',
	indexNav: [
		{
			name: '资助项目',
			url: '/index/zizhuxiangmu',
		},
		{
			name: '互动论坛',
			url: '/index/forum'
		}, 
		{
			name: '政策公告',
			url: '/index/news'
		},
	],
	cateList: [
		{
			name: '互动论坛',
			refTable: 'forumtype',
			refColumn: 'typename',
		},
		{
			name: '政策公告',
			refTable: 'newstype',
			refColumn: 'typename',
		},
	]
}
