
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = 0; //t秒後のx座標
var y = 0; //t病後のy座標
var x0 =10;
var y0 =10;
//var dx = 2;
//var dy = 0;
var ballRadius = 10;
var t = 0;
var dt = 0.01;//0.01
var tint = 0; //時間（整数値）
var vy0 = 0;  //自由落下運動
var vy = 0; //鉛直方向速度
var vx0 = 10; //水平方向初速度
var vx = 0; //水平方向速度
var g = 9.8; //重力加速度
var startButton;
var resetButton;
var intervalID = 1;
var xint = 0; //x整数値
var yint = 0; //y整数値

//document.getElementById('text-button').onclick = function(){
//  document.getElementById('text').innerHTML = 'ストップ！';
//};    //不要？

startButton = document.getElementById('start');
stopButton = document.getElementById('stop');
resetButton = document.getElementById('reset');

startButton.onclick = function(){
  intervalID = 1;
}

stopButton.onclick = function(){
//window.alert('一時停止');
  intervalID = 0;
}

resetButton.onclick = function(){
  y = y0;
  x = x0;
  t = 0;
}

function drawBall(){    //水平投射
ctx.beginPath();
ctx.arc(x+ballRadius, y+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();

/*if(t> 0.5){   //0.5秒で試しに足跡を描画
  ctx.beginPath();
  ctx.arc(vx0*0.5*10+ballRadius, 1/2*g*Math.pow(0.5,2)*10+ballRadius, ballRadius, 0, Math.PI*2, false);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
*/
//x += dx;
//y += dy;
}

function drawBall1_2(){    //水平投射,整数値時間の足跡表示
for(var i = 0; i <= tint; i++){
ctx.beginPath();
ctx.arc(vx0*i*10+ballRadius, 1/2*g*Math.pow(i,2)*10+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.strokeStyle = 'red';
ctx.stroke();
ctx.closePath();
}
}


function drawBall2(){ //水平方向，等速直線運動
ctx.beginPath();
ctx.arc(x+ballRadius, 0+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();
//x += dx;
//y += dy;
}

function drawBall2_2(){    //水平方向，等速直線運動,整数値時間の足跡表示
for(var i = 0; i <= tint; i++){
ctx.beginPath();
ctx.arc(vx0*i*10+ballRadius, 0+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();
}
}


function drawBall3(){ //鉛直方向，自由落下
ctx.beginPath();
ctx.arc(0+ballRadius, y+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.fillStyle = 'blue';
ctx.fill();
ctx.closePath();
/*if(t> 0.5){   //足跡を残す，0.5秒で試し
  ctx.beginPath();
  ctx.arc(0+ballRadius, 1/2*g*Math.pow(0.5,2)*10+ballRadius, ballRadius, 0, Math.PI*2, false);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
}*/
//x += dx;
//y += dy;
}

function drawBall3_2(){    //鉛直方向，自由落下,整数値時間の足跡表示
for(var i = 0; i <= tint; i++){
ctx.beginPath();
ctx.arc(0+ballRadius, 1/2*g*Math.pow(i,2)*10+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.strokeStyle = 'blue';
ctx.stroke();
ctx.closePath();
}


}

//function drawFootpint(){    //時間ごとの場所を表示

//}

function drawTime(){
  ctx.font = '16px Arial';
  ctx.fillStyle = 'blue';
  ctx.fillText('Time: ' + t, canvas.width/2, 16);
}

function draw(){
  if(y< canvas.height){
    t += dt;
    tint = Math.floor(t);    //整数値のみを格納
    y = 1/2*g*Math.pow(t,2)*10 //自由落下
    x =vx0 *t*10 //水平投射
    yint = 1/2*g*Math.pow(tint,2)*10 //鉛直方向，自由落下，整数値時間
    xint =vx0 *tint*10 //水平方向，等速直線運動，整数値時間
  } else {
    y = y0;
    x = x0;
    t = 0;
  }
  ctx.clearRect(0,0,canvas.width, canvas.height);
 drawBall();
 drawBall2();
 drawBall3();
 drawBall1_2();
 drawBall2_2();
 drawBall3_2();

// drawFootprint();
 drawTime();
}

if(intervalID === 1){
  setInterval(draw,10);
}
