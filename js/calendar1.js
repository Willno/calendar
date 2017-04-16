var time = document.getElementById('time');
var d = document.getElementById('date');
var upper = document.getElementById('upper');
var everyDay = document.getElementById('everyDay');
var prevMonth = document.getElementById('prevMonth');
var nextMonth = document.getElementById('nextMonth');
var arr = ['日','一','二','三','四','五','六'];
var len = 42;

showTime();
setInterval(showTime, 1000);

function showTime(){
	//获取时间
	var date = new Date();
	var year = date.getFullYear();
	var mon = date.getMonth()+1;
	var day = date.getDate();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var week = arr[date.getDay()];
	//把时间显示在页面上。
	d.innerHTML = year+'年'+mon+'月'+day+'日,星期'+week;
	time.innerHTML = z(h)+':'+z(m)+':'+z(s);
}
//填充日期
var date = new Date();
var month = date.getMonth();
var toDay = date.getDate();
var num = month;

fn(month,toDay);
//填充年月。
upper.innerHTML = date.getFullYear()+'年'+(date.getMonth()+1)+'月';
//点击切换至上一个月。
prevMonth.onclick = function(){
	num--;
	if(num==month){
		fn(month,toDay);
	}else{
		fn(num);
	}
	var date = new Date();
	date.setDate(1);
	date.setMonth(num);
	upper.innerHTML = date.getFullYear()+'年'+(date.getMonth()+1)+'月';
};
//点击切换至下一个月。
nextMonth.onclick = function(){
	num++;
	if(num==month){
		fn(month,toDay);
	}else{
		fn(num);
	}
	var date = new Date();
	date.setDate(1);
	date.setMonth(num);
	upper.innerHTML = date.getFullYear()+'年'+(date.getMonth()+1)+'月';
};

function fn(month,toDay){
	//填充上个月的日期
	var date = new Date();
	date.setDate(1);
	// console.log(date);
	date.setMonth(month);
	//回到上个月最后一天
	date.setDate(0);
	//上个月最后一天是周几
	var week = date.getDay();
	//获取上个月最后一天是几号。
	var day = date.getDate();

	var str = '';
	//生成上个月的日期。
	for(var i=1;i<=week;i++){
		// console.log(day-week+i);
		str += '<a href="javascript:;" class="old">'+(day-week+i)+'</a>';
	}

	//当前月的日期填充

	var now = new Date();

	// var toDay = now.getDate();
	//设置到当月的一号，防止日子超出，累计到月。
	now.setDate(1);
	now.setMonth(month);
	//设置到下个月
	now.setMonth(now.getMonth()+1);
	//回到本月最后一天。
	now.setDate(0);
	//获取本月最后一天是几号。
	var nowDate = now.getDate();
	// console.log(nowDate);
	//生成本月时间
	for(var i=1;i<=nowDate;i++){		
		str += '<a href="javascript:;">'+i+'</a>';	
	}
	//生成下月时间。
	for(var i=1;i<=len-nowDate-week;i++){
		
		str += '<a href="javascript:;" class="old">'+i+'</a>';
	}


	everyDay.innerHTML = str;

	var as = everyDay.getElementsByTagName('a');
	//给当前日子加上焦点。
	if(toDay){
		as[toDay+week-1].style.outline = "2px solid blue";
		as[toDay+week-1].className = 'active';
	}
	
	for(var i=0;i<as.length;i++){
		as[i].onOff = true;
		as[i].onclick = function(){
			
			for(var i=0;i<as.length;i++){
				if(this!=as[i]){
					as[i].style.outline = '';
					as[i].onOff = true;
				}
			}
			if(this.onOff){
				this.style.outline = "2px solid blue";
			}else{
				this.style.outline = "";
			}
			this.onOff = !this.onOff;
		};
	}
}

//补零
function z(n){
	return n<10?'0'+n:''+n;
}
