//原生代码

//获取轮播图
var glide = new Glide(".glide");

//获取轮播图标题
var captionsEl = document.querySelectorAll(".slide-caption");



//轮播标题动画
glide.on(["mount.after","run.after"], () =>{
	var caption = captionsEl[glide.index];	//获取当前轮播图的下标
	anime({
		targets: caption,     //对谁执行动画
		opacity: [0,1],				//透明度由0至1
		duration: 400,              //动画速度400ms
		easing: "linear",           //匀速
		delay: anime.stagger(400,{start:300}),  //400ms轮流给元素添加动画
		//anime.stagger([40,10])始translate逐渐从40-25-10出现(逐渐让translateY越来越小)
		translateY:[anime.stagger([40,10]),0]  
	});
});

//轮播图标题区块没激活状态下透明度重置为0
glide.on("run.before", () => {
	document.querySelectorAll(".slide-caption > *").forEach(el =>{
		el.style.opacity = 0;
	});
});

glide.mount();



//自动排列代码
//获取每一个案例下面的父盒子
var isotope = new Isotope(".cases",{
	layoutMode: "fitRows", //行的方式排列
	itemSelector: ".case-item" //排列的元素(注意是类名)
})


//分类代码
//获取分类按钮
var filterBtns = document.querySelector(".filter-btns")

filterBtns.addEventListener("click", event => {
	var {target} = event ; 
//	获取自定义data的数据
	var filterOption = target.getAttribute("data-filter");
	if(filterOption){
		document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
	target.classList.add("active");
	
//	核心代码
//	将获取到的data数据赋值给filter
	isotope.arrange({filter:filterOption});
	}
})

//新建一个对象存储想要的效果
var staggeringOptione = {
	delay: 300,  //延迟300ms后出现		delay(滚动到该内容时延迟出现)
	distance: "50px",//从下到上50px		distance(长度)
	duration: 500, //动画执行500ms   		duration(动画执行时间)
	easing: "ease-in-out", //动画函数	    easing(动画曲线)
	origin: "bottom" //从下到上出现   		origin(出现的位置)
}

//...staggeringOptione意思是把对象里面所有的东西拿出来
//interval:350意思每350ms出现一个元素
//ScrollReveal().reveal()只能单独给动画效果的元素添加
ScrollReveal().reveal(".feature",{ ...staggeringOptione , interval:350})

ScrollReveal().reveal(".service-item",{ ...staggeringOptione , interval:350})

ScrollReveal().reveal(".data-section",{
//	但它出现之前有个回调函数(beforeReveal:)
//	给beforeReveal传递函数
	beforeReveal: () => {
		
		anime ({
			//对谁执行动画
			targets: ".data-piece .num",
			//将数值传递进来
			innerHTML: el =>{
				//返回:从0到我们传统进来的值
				return[0, el.innerHTML];
			},
			
			duration: 2000,  //动画执行时间
			round: 1,     //数值以1增长
			easing: "easeInExpo"  //动画曲线函数(easeInExpo)越来越快									
		})
	}
})







//jQuery代码
//页面加载就绪

$(function(){

	
	
//	点击首页链接与点击返回顶部按钮返回顶部
	$(".scrollTop,#home-link").click(function(){
		$("body,html").animate({
			scrollTop:0
		},500)
	})
	
//	返回顶部出现与消失/导航栏固定到不固定
	$(window).scroll(function(){
		if($(window).scrollTop()>800){
			$("header").addClass("sticky")
		}else{
			$("header").removeClass("sticky")
		}
		
		if($(window).scrollTop()>2000){
			$(".scrollTop").css('display','block')
		}else{
			$(".scrollTop").css('display','none')
		}
	})
	  
	
//	链接流畅滑动
	$('#about-link,.explore-btn').click(function(){
    	$('html,body').animate({
			scrollTop:$('#about').offset().top - 100
    	},800);
   	}); 
   		 
	$('#filter-link').click(function(){
    	$('html,body').animate({
    		scrollTop:$('#filter').offset().top - 100
    	},800);
	}); 
   	
   	$('#service-link').click(function(){
    	$('html,body').animate({
			scrollTop:$('#service').offset().top - 100
    	},800);
	}); 
   		 
	$('#team-link').click(function(){
    	$('html,body').animate({
    		scrollTop:$('#team').offset().top - 100
    	},800);
	 }); 
	 
	$('#com-act-link').click(function(){
    	$('html,body').animate({
    		scrollTop:$('#com-act').offset().top - 100
    	},800);
	 }); 

//	展开菜单
	$(".burger").click(function(){
		$("header").toggleClass("open")
	})
	
	$("#home-link,#about-link,#filter-link,#service-link,#team-link,#com-act-link").click(function(){
		$("header").removeClass("open")
	})
		
})





