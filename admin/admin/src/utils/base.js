const base = {
    get() {
        return {
            url : "http://localhost:8080/helpPoorChildren/",
            name: "helpPoorChildren",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/helpPoorChildren/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于SpringBoot+Vue的贫困儿童资助系统的设计与实现"
        } 
    }
}
export default base
