/*
* @Author: Administrator
* @Date:   2017-09-11 15:11:08
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-13 18:36:20
*/
var dg = document.getElementById("game");
var palyplane = new MePlaneProtpe(190,600,"image/LiPlane.png",20);
var arrPline =[];  //储存敌机
var arrZiDan =[];  //玩家子弹
var arrDiZiDan=[];  //敌机在弹
var diPlanetimer1 = setInterval(creatPlane1, 1000);//敌机1出现定时器
var diPlanetimer2 = setInterval(creatPlane2, 4000);//敌机2出现定时器
var diPlanetimer3 = setInterval(creatPlane3, 1000);//敌机3出现定时器
// var diPlanetimer4 = setInterval(creatPlane4, 2000);//敌机4出现定时器
var diPlaneMovetimer = setInterval(movePline, 100); //敌机移动
var MeplayMoveTimer = setInterval(MeplayMove,100);
var ziDanMoveTimer = setInterval(ZiDanMove, 50);  //玩家子弹移动
var DiziDanMoveTimer = setInterval(DiZiDanMove, 50);  //敌机子弹移动
// var DiZiDanNumTimer = setInterval(PlaneShot, 100);   //敌机子单频率
var huishoutimer = setInterval(huishou, 300);
var me = setInterval(med,10);
var pengtimer = setInterval(peng,10);
MePlane();  //创建玩家飞机

var keytop = false;
var keybutton = false;
var keyleft = false;
var keyright = false;
var zidan = false;




//回收
function huishou(){
	for(var i=0;i<arrPline.length;i++){
		if(arrPline[i].dad==true){
			dg.removeChild(arrPline[i].imgNode);
			arrPline.splice(i,1);
			i--;
		}
	}
}

//死亡
function med(){
	for(var i=0;i<arrPline.length;i++){
		var diplaneleft = parseInt(arrPline[i].imgNode.style.left);
		var diplanetop = parseInt(arrPline[i].imgNode.style.top);
		var diplanewidth = arrPline[i].imgNode.width;
		var diplaneheight =arrPline[i].imgNode.height;

		var planeleft = parseInt(palyplane.imgNodeMe.style.left);
		var planetop = parseInt(palyplane.imgNodeMe.style.top);
		var planewidth = palyplane.imgNodeMe.width;
		var planeheight =palyplane.imgNodeMe.height;
		if(planeleft>(diplaneleft-planewidth)&&planeleft<(diplaneleft+diplanewidth)
			&&(planetop>(diplanetop-planeheight)&&planetop<(diplanetop+diplaneheight))){
			palyplane.imgNodeMe.src="image/BeiJi_02.png";
			dg.style.backgroundImage="url('image/bg2.png')";
			diPlanetimer1 = clearInterval(diPlanetimer1);//敌机1出现定时器
			diPlanetimer2 = clearInterval(diPlanetimer2);//敌机2出现定时器
			diPlanetimer3 = clearInterval(diPlanetimer3);//敌机3出现定时器
			diPlaneMovetimer = clearInterval(diPlaneMovetimer); //敌机移动
			ziDanMoveTimer = clearInterval(ziDanMoveTimer);  //玩家子弹移动
			DiziDanMoveTimer = clearInterval(DiziDanMoveTimer);  //敌机子弹移动
			var tan = document.getElementById("tan");
			var shi = document.getElementById("shi");
			var fou =document.getElementById("fou");
			tan.style.display="block";
			shi.onclick=function(){
				location.reload();
			}
			fou.onclick=function(){
				window.close();
			}		}
	}
	console.log(planetop);
}
//碰撞
function peng(){
	for(var i=0;i<arrZiDan.length;i++){
		var zileft = parseInt(arrZiDan[i].imgNode.style.left);
		var zitop = parseInt(arrZiDan[i].imgNode.style.top);
		var ziwidth = arrZiDan[i].imgNode.width;
		var ziheight=arrZiDan[i].imgNode.height;

		for (var j = 0; j < arrPline.length; j++) {
			var Plineleft = parseInt(arrPline[j].imgNode.style.left);
			var Plinetop = parseInt(arrPline[j].imgNode.style.top);
			var Plinewidth = arrPline[j].imgNode.width;
			var Plineheight=arrPline[j].imgNode.height;
			//判断子弹的飞行范围
			if(zileft>(Plineleft-ziwidth)&&zileft<(Plineleft+Plinewidth)
				&&(zitop>(Plinetop-ziheight)&&zitop<(Plinetop+Plineheight))){
				arrPline[j].blood--;
				if(arrPline[j].blood==0){
					arrPline[j].imgNode.src="image/BeiJi_02.png";
					arrPline[j].dad=true;
				}

				//子弹移除
				dg.removeChild(arrZiDan[i].imgNode);
				arrZiDan.splice(i,1);
				i--;
				break;
			}
		}
	}
}



function MePlane(){   //创建玩家飞机
	palyplane.intb();
}
function MeplayMove(){    //玩家飞机移动
	if(palyplane==undefined){
		return;
	}
	if(keytop==true){
		palyplane.MoveTop();
	}
	if(keybutton==true){
		palyplane.MoveButton();
	}
	if(keyleft==true){
		palyplane.MoveLeft();
	}
	if(keyright==true){
		palyplane.MoveRight();
	}
	if(zidan==true){
		palyplane.shot();
	}
}
document.onkeydown =function(){
	var key = window.event||arguments[0];
	if(key.keyCode==38){
		keytop=true;
	}
	else if(key.keyCode==40){
		keybutton=true;
	}
	else if(key.keyCode==37){
		keyleft=true;
	}
	else if(key.keyCode==39){
		keyright=true;
	}
	else if(key.keyCode==32){
		zidan=true;
	}
}
document.onkeyup=function(){
	var key = window.event||arguments[0];
	if(key.keyCode==38){
		keytop=false;
	}
	else if(key.keyCode==40){
		keybutton=false;
	}
	else if(key.keyCode==37){
		keyleft=false;
	}
	else if(key.keyCode==39){
		keyright=false;
	}
	else if(key.keyCode==32){
		zidan=false;
	}
}
//玩家子弹移动
function ZiDanMove(){
	for(var i=0;i<arrZiDan.length;i++){
		var top =parseInt(arrZiDan[i].imgNode.style.top);
		if(top<0){
			dg.removeChild(arrZiDan[i].imgNode);
			arrZiDan.splice(i,1);
			i--;
		}else{
			arrZiDan[i].move();
		}
	}
}
//敌机子弹移动
function DiZiDanMove(){
	for(var i=0;i<arrDiZiDan.length;i++){
		var top =parseInt(arrDiZiDan[i].imgNode.style.top);
		if(top>600){
			dg.removeChild(arrDiZiDan[i].imgNode);
			arrDiZiDan.splice(i,1);
			i--;
		}else{
			arrDiZiDan[i].dimove();
		}
	}
}

function creatPlane1(){            //创建敌机1
	var x = parseInt(Math.random()*397);
	var y =0;
	var plane = new DiPlanePrototype(x,y,"image/BluePlane1.png",10,1);
	arrPline.push(plane);
}

//创建敌机2


function creatPlane2(){
	var x = parseInt(Math.random()*397);
	var y =0;
	var plane = new DiPlanePrototype(x,y,"image/JitPlane.png",5,3);
	arrPline.push(plane);
	plane.shot();

}



function creatPlane3(){          //创建敌机3
	var x = parseInt(Math.random()*397);
	var y =0;
	var plane = new DiPlanePrototype(x,y,"image/BluePlane2.png",10,1);
	arrPline.push(plane);
}
function creatPlane4(){            //创建敌机4
	var x = parseInt(Math.random()*397);
	var y =0;
	var plane = new DiPlanePrototype(x,y,"image/BluePlane3.png",10,1);
	arrPline.push(plane);
}
function movePline(){				//敌机移动
	for(var i=0;i<arrPline.length;i++){
		var top = parseInt(arrPline[i].imgNode.style.top);
		if(top<622){
			arrPline[i].move();
		}else{
			dg.removeChild(arrPline[i].imgNode);
			arrPline.splice(i,1);
			i--;
		}
	}

}

//敌机原形
function DiPlanePrototype(x,y,src,speed,blood){
	this.x=x;
	this.y=y;
	this.src =src;
	this.speed=speed;
	this.blood=blood;
	this.dad=false;
	this.imgNode=document.createElement("img");

	this.shot=function(){
		var width = parseInt(this.imgNode.width);
		var x=parseInt(this.imgNode.style.left)+width/2-15;
		var y=parseInt(this.imgNode.style.top)+45;
		var zidan = new ziDanProtype(x,y,"image/zhi.png",15);
		arrDiZiDan.push(zidan);
	}
	this.move=function(){
		var top = (parseInt(this.imgNode.style.top)+this.speed);
		this.imgNode.style.top = top+"px";
	}
	this.inta =function(){
		this.imgNode.src = this.src;
		this.imgNode.style.left = x+"px";
		this.imgNode.style.top = y+"px";
		dg.appendChild(this.imgNode);
	}
	this.inta();
}

function MePlaneProtpe(x,y,src,speed){      // 创建玩家飞机原形
	this.x = x;
	this.y = y;
	this.src=src;
	this.speed = speed;
	this.imgNodeMe =document.createElement("img");

	this.shot=function(){
		var width = parseInt(this.imgNodeMe.width);
		var x= parseInt(this.imgNodeMe.style.left)+width/2-10;
		var y= parseInt(this.imgNodeMe.style.top)-30;
		var zidan = new ziDanProtype(x,y,"image/bullet_03.png",10);
		arrZiDan.push(zidan);

	}
	this.intb=function(){
		this.imgNodeMe.src=this.src;
		this.imgNodeMe.style.left=x+"px";
		this.imgNodeMe.style.top=y+"px";
		dg.appendChild(this.imgNodeMe);
	}
	this.MoveTop=function(){
		var top = (parseInt(this.imgNodeMe.style.top)-this.speed);
		if(top>0){
		this.imgNodeMe.style.top = top+"px";
		}
	}
	this.MoveRight=function(){
		var right = (parseInt(this.imgNodeMe.style.left)+this.speed);
		if(right<380){
		this.imgNodeMe.style.left = right+"px";
		}
	}
	this.MoveLeft=function(){
		var left = (parseInt(this.imgNodeMe.style.left)-this.speed);
		if(left>-10)
		this.imgNodeMe.style.left = left+"px";
	}
	this.MoveButton=function(){
		var button = (parseInt(this.imgNodeMe.style.top)+this.speed);
		if(button<602)
		this.imgNodeMe.style.top = button+"px";
	}

}

function ziDanProtype(x,y,src,speed){   //子弹原形
	this.x=x;
	this.y=y;
	this.src=src;
	this.speed=speed;
	this.imgNode= document.createElement("img");

	this.move=function(){
		var top = (parseInt(this.imgNode.style.top)-this.speed);
		this.imgNode.style.top=top+"px";
	}
	this.dimove=function(){
		var top = (parseInt(this.imgNode.style.top)+this.speed);
		this.imgNode.style.top=top+"px";
	}
	this.init=function(){
		this.imgNode.src =this.src;
		this.imgNode.style.left=x+"px";
		this.imgNode.style.top=y+"px";
		dg.appendChild(this.imgNode);
	}
	this.init();
}


