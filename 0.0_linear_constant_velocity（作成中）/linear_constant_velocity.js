
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = 0; //t秒後のx座標
var y = 0; //t病後のy座標
var x0 =30;
var y0 =30;
var dx = 2;
var dy = 0;
var ballRadius = 30;
var t = 0;
var dt = 0.1;
var v = 20.0;  //等速直線運動

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
  if(x< canvas.width){
    t += dt;
    x = v *t //等速直線運動
  } else {
    x = x0;
    t = 0;
  }
  ctx.clearRect(0,0,canvas.width, canvas.height);
 drawBall();

}


setInterval(draw,10);
