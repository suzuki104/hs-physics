
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
var dt = 0.1;
var vy0 = 0;  //自由落下運動
var vy = 0;

function drawBall(){
ctx.beginPath();
ctx.arc(x+ballRadius, y+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();
//x += dx;
//y += dy;

}

function draw(){
  if(y< canvas.height){
    t += dt;
    y = 1/2*9.8*Math.pow(t,2) //自由落下
//    x =30 *t //水平投射？
  } else {
    y = x0;
    t = 0;
  }
  ctx.clearRect(0,0,canvas.width, canvas.height);
 drawBall();

}


setInterval(draw,10);
