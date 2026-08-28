
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
var dt = 0.01;
var v = 100.0;  //等速直線運動


//球の運動に関する部分を描画
function drawBall(){

  //球を描画
  ctx.beginPath();
  if(250 < 600-v*t/3){
    ctx.arc(x+ballRadius, y+ballRadius*5, ballRadius, 0, Math.PI*2, false);
}else{
    t1 = (canvas.width-ballRadius*2)/v
    ctx.arc(v*t1+ballRadius, y+ballRadius*5, ballRadius, 0, Math.PI*2, false);
}
  ctx.fillStyle = '#32cd32';
  ctx.fill();
  ctx.closePath();

  //球をストロボで描画
  if(document.getElementById('strobe').checked){
  for(i = 0; i < t; i++){
  ctx.beginPath();
  ctx.arc(v*i+1/2*acceleration*10*Math.pow(i,2)+ballRadius, y+ballRadius*5, ballRadius, 0, Math.PI*2, false);
  ctx.strokeStyle = '#32cd32';
  ctx.stroke();
  ctx.closePath();
  }
  ctx.strokeStyle = 'black';
}//strobe

  //x軸
  ctx.beginPath();
  ctx.moveTo(0,ballRadius*6);
  ctx.lineTo(canvas.width-10,ballRadius*6);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  //x軸の矢印の先端
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.moveTo(canvas.width-10,ballRadius*6);
  ctx.lineTo(canvas.width-10+15*Math.cos(-Math.PI/6*5),ballRadius*6-15*Math.sin(-Math.PI/6*5));
  ctx.lineTo(canvas.width-10+15*Math.cos(Math.PI/6*5),ballRadius*6-15*Math.sin(Math.PI/6*5));
  ctx.fill();
  ctx.closePath();

  //x軸と記載，0を記載
  ctx.font = '45px Times New Roman italic';
  ctx.fillStyle = 'black';
  ctx.fillText('x', canvas.width-10, ballRadius*6);
  ctx.font = '40px Times New Roman';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  ctx.fillText('0', ballRadius, ballRadius*6);

  //x軸原点0の線を描画
  ctx.beginPath();
  ctx.moveTo(ballRadius, ballRadius*6-5);
  ctx.lineTo(ballRadius, ballRadius*6+5);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();


  //時間を表示
  ctx.beginPath();
  ctx.font = '30px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'black';
  if(250 < 600-v*t/3){
  ctx.fillText('時間：'+Math.floor(t*100)/100, 430, 30);
}else{
  t1 = (canvas.width-ballRadius*2)/v
  ctx.fillText('時間：'+Math.floor(t1*100)/100, 430, 30);
}

  ctx.closePath();

  //速度ベクトルの棒
  if(document.getElementById('vvector1').checked){
  ctx.beginPath();
  if(250 < 600-v*t/3){
    ctx.moveTo(x+ballRadius, y+ballRadius*5);
    ctx.lineTo(x+ballRadius+ballRadius*2+(velocity-1)*25-5, y+ballRadius*5);
}else{
    t1 = (canvas.width-ballRadius*2)/v
    ctx.moveTo(v*t1+ballRadius, y+ballRadius*5);
    ctx.lineTo(v*t1+ballRadius+ballRadius*2+(velocity-1)*25-5, y+ballRadius*5);
}
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth = 1;

  //速度ベクトルの矢印の先
  ctx.beginPath();
  if(250 < 600-v*t/3){
    ctx.moveTo(x+ballRadius+ballRadius*2+(velocity-1)*25, y+ballRadius*5);
    ctx.lineTo(x+ballRadius+ballRadius*2+(velocity-1)*25+20*Math.cos(Math.PI/4*3), y+ballRadius*5-20*Math.sin(Math.PI/4*3));
    ctx.lineTo(x+ballRadius+ballRadius*2+(velocity-1)*25+20*Math.cos(-Math.PI/4*3), y+ballRadius*5-20*Math.sin(-Math.PI/4*3));
}else{
    t1 = (canvas.width-ballRadius*2)/v
    ctx.moveTo(v*t1+ballRadius+ballRadius*2+(velocity-1)*25, y+ballRadius*5);
    ctx.lineTo(v*t1+ballRadius+ballRadius*2+(velocity-1)*25+20*Math.cos(Math.PI/4*3), y+ballRadius*5-20*Math.sin(Math.PI/4*3));
    ctx.lineTo(v*t1+ballRadius+ballRadius*2+(velocity-1)*25+20*Math.cos(-Math.PI/4*3), y+ballRadius*5-20*Math.sin(-Math.PI/4*3));
}
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}//vvector1

  //変位ベクトルの棒
  if(document.getElementById('xvector1').checked){
  ctx.beginPath();
  if(250 < 600-v*t/3){
    ctx.moveTo(ballRadius, y+ballRadius*5);
    ctx.lineTo(x+ballRadius-5, y+ballRadius*5);
}else{
    t1 = (canvas.width-ballRadius*2)/v
    ctx.moveTo(ballRadius, y+ballRadius*5);
    ctx.lineTo(v*t1+ballRadius-5, y+ballRadius*5);
}
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'blue';
  ctx.stroke();
  ctx.closePath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  //変位ベクトルの矢印の先
  ctx.beginPath();
  if(250 < 600-v*t/3){
    ctx.moveTo(x+ballRadius, y+ballRadius*5);
    ctx.lineTo(x+ballRadius+20*Math.cos(Math.PI/4*3), y+ballRadius*5-20*Math.sin(Math.PI/4*3));
    ctx.lineTo(x+ballRadius+20*Math.cos(-Math.PI/4*3), y+ballRadius*5-20*Math.sin(-Math.PI/4*3));
}else{
    t1 = (canvas.width-ballRadius*2)/v
    ctx.moveTo(v*t1+ballRadius, y+ballRadius*5);
    ctx.lineTo(v*t1+ballRadius+20*Math.cos(Math.PI/4*3), y+ballRadius*5-20*Math.sin(Math.PI/4*3));
    ctx.lineTo(v*t1+ballRadius+20*Math.cos(-Math.PI/4*3), y+ballRadius*5-20*Math.sin(-Math.PI/4*3));
}
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}//xvector1

} //drawBall


//x-tグラフとv-tグラフを描画
function drawfunction(){
  //x-tグラフ
  //軸
  ctx.beginPath();
  //縦軸
  ctx.moveTo(100,250);
  ctx.lineTo(100,600);
  //横軸
  ctx.lineTo(450,600);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  //縦軸の矢印の先端
  ctx.beginPath();
  ctx.moveTo(100,250);
  ctx.lineTo(100+15*Math.cos(-Math.PI/3*2),250-15*Math.sin(-Math.PI/3*2));
  ctx.lineTo(100+15*Math.cos(-Math.PI/3),250-15*Math.sin(-Math.PI/3));
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();

  //横軸の矢印の先端
  ctx.beginPath();
  ctx.moveTo(450,600);
  ctx.lineTo(450+15*Math.cos(-Math.PI/6*5),600-15*Math.sin(-Math.PI/6*5));
  ctx.lineTo(450+15*Math.cos(Math.PI/6*5),600-15*Math.sin(Math.PI/6*5));
  ctx.fill();
  ctx.closePath();

  //グラフを描画
  if(document.getElementById('graph1').checked){
    ctx.beginPath();
    ctx.moveTo(100,600);
    if(250 < 600-v*t/3){
    ctx.lineTo(100+30*t,600-v*t/3);
  }else{
  t1 = (canvas.width-ballRadius*2)/v
    ctx.lineTo(100+30*t1,600-v*t1/3);
  }
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.closePath();

/*
  ctx.beginPath();
  for(i = 0; i < t; i += dt){
  ctx.lineTo(100+30*i,600-(v*i+1/2*acceleration*Math.pow(i,2))/3);   //t=0から現在までを折れ線グラフで表示
}
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.closePath();
*/

  //ストロボで点を打つ
  if(document.getElementById('strobe').checked){
  if(250 < 600-v*t/3){
  for(i = 0; i < t; i++){
  ctx.beginPath();
  ctx.arc(100+30*i, 600-v*i/3, 5, 0, Math.PI*2, false);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}//for
}else{
  t1 = (canvas.width-ballRadius*2)/v
  for(i = 0; i < t1; i++){
  ctx.beginPath();
  ctx.arc(100+30*i, 600-v*i/3, 5, 0, Math.PI*2, false);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}//for
}
}//strobe
}//graph1

  //x-tグラフに変位ベクトルを描画
  if(document.getElementById('xvector2').checked){
  //ベクトルの線
  ctx.beginPath();
  if(250 < 600-v*t/3){
  ctx.moveTo(100+30*t,600);
  ctx.lineTo(100+30*t,600-v*t/3+5);
}else{
t1 = (canvas.width-ballRadius*2)/v
  ctx.moveTo(100+30*t1,600);
  ctx.lineTo(100+30*t1,600-v*t1/3+5);
}
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.closePath();

  //ベクトルの矢印
  ctx.beginPath();
  if(250 < 600-v*t/3){
    ctx.moveTo(100+30*t,600-v*t/3);
    ctx.lineTo(100+30*t+15*Math.cos(-Math.PI/3*2),600-v*t/3-15*Math.sin(-Math.PI/3*2));
    ctx.lineTo(100+30*t+15*Math.cos(-Math.PI/3),600-v*t/3-15*Math.sin(-Math.PI/3));
}else{
  t1 = (canvas.width-ballRadius*2)/v
    ctx.moveTo(100+30*t1,600-v*t1/3);
    ctx.lineTo(100+30*t1+15*Math.cos(-Math.PI/3*2),600-v*t1/3-15*Math.sin(-Math.PI/3*2));
    ctx.lineTo(100+30*t1+15*Math.cos(-Math.PI/3),600-v*t1/3-15*Math.sin(-Math.PI/3));
}
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.closePath();
}//xvector2

  //文字を描画
  ctx.beginPath();
  ctx.font = '40px Arial';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('時間',275, 650);
  ctx.font = '45px Times New Roman italic';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText(' t',275, 650-2);
  ctx.textAlign = 'center';
  ctx.fillText('x　 t 　　　', 275, 725-2);
  ctx.font = '40px Arial';
  ctx.fillText(' ー   グラフ', 275, 725);
  ctx.textBaseline = 'bottom';
  ctx.fillText('位', 50, 420);
  ctx.textBaseline = 'top';
  ctx.fillText('置', 50, 420);
  ctx.font = '45px Times New Roman italic';
  ctx.fillText('x', 50, 455);
  ctx.font = '45px Times New Roman';
  ctx.textAlign = 'right';
  ctx.fillText('O',100,600);
  ctx.closePath();

  //x-tグラフ



  //v-tグラフ
  ctx.beginPath();
  //縦軸
  ctx.moveTo(600,250);
  ctx.lineTo(600,600);
  //横軸
  ctx.lineTo(950,600);
  ctx.stroke();
  ctx.closePath();

  //縦軸の矢印の先端
  ctx.beginPath();
  ctx.moveTo(600,250);
  ctx.lineTo(600+15*Math.cos(-Math.PI/3*2),250-15*Math.sin(-Math.PI/3*2));
  ctx.lineTo(600+15*Math.cos(-Math.PI/3),250-15*Math.sin(-Math.PI/3));
  ctx.fill();
  ctx.closePath();

  //横軸の矢印の先端
  ctx.beginPath();
  ctx.moveTo(950,600);
  ctx.lineTo(950+15*Math.cos(-Math.PI/6*5),600-15*Math.sin(-Math.PI/6*5));
  ctx.lineTo(950+15*Math.cos(Math.PI/6*5),600-15*Math.sin(Math.PI/6*5));
  ctx.fill();
  ctx.closePath();


  //グラフを描画
  if(document.getElementById('graph2').checked){
  ctx.beginPath();
  ctx.moveTo(600,600-v);
  ctx.lineTo(600+30*t,600-v);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.closePath();

  //ストロボで点を打つ
  if(document.getElementById('strobe').checked){
  for(i = 0; i < t; i++){
  ctx.beginPath();
  ctx.arc(600+30*i,600-v, 5, 0, Math.PI*2, false);
  ctx.fillStyle = 'black';
  ctx.fill();
  }
  ctx.closePath();
}//strobe
} //graph2

  //v-tグラフにベクトルを描画
  if(document.getElementById('vvector2').checked){
  ctx.beginPath();
  ctx.moveTo(600+30*t,600);
  ctx.lineTo(600+30*t,600-v+5);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.closePath();

  //グラフにベクトルを描画．矢印の先端
  ctx.beginPath();
  ctx.moveTo(600+30*t,600-v);
  ctx.lineTo(600+30*t+15*Math.cos(-Math.PI/3*2),600-v-20*Math.sin(-Math.PI/3*2));
  ctx.lineTo(600+30*t+15*Math.cos(-Math.PI/3),600-v-20*Math.sin(-Math.PI/3));
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}//vvector2

  //文字を描画
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.font = '40px Arial';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('時間',775, 650);
  ctx.font = '45px Times New Roman italic';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText(' t',775, 650-2);
  ctx.textAlign = 'center';
  ctx.fillText('v　 t 　　　', 775, 725-2);
  ctx.font = '40px Arial';
  ctx.fillText(' ー   グラフ', 775, 725);
  ctx.textBaseline = 'bottom';
  ctx.fillText('速', 550, 420);
  ctx.textBaseline = 'top';
  ctx.fillText('度', 550, 420);
  ctx.font = '45px Times New Roman italic';
  ctx.fillText('v', 550, 455);
  ctx.font = '45px Times New Roman';
  ctx.textAlign = 'right';
  ctx.fillText('O',600,600);
  ctx.closePath();

  //v-tグラフ

  //グラフの関数を表示
  if(velocity == 1){
  document.getElementById('function1').textContent = 'x= t';
}else{
  document.getElementById('function1').textContent = 'x='+velocity+'t';
}
document.getElementById('function2').textContent = 'v='+velocity;



} //drawfunction

function draw(){
    velocity = document.getElementById('velocity').value;     //初速度を取得
  document.getElementById('start').onclick = function(){
    intervalID = 1;
    velocity = document.getElementById('velocity').value;     //初速度を取得
  }
  document.getElementById('stop').onclick = function(){
    intervalID = 0;
  }
  document.getElementById('reset').onclick = function(){
    //t=0のものを表示してから止める
    t = 0;
    x = 0;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBall();
    drawfunction();
    intervalID = 0;
    velocity = document.getElementById('velocity').value;     //初速度を取得
  }


//  if(intervalID == 1){

  //acceleration = document.getElementById('acceleration').value;     //加速度を取得
  acceleration = 0; //ここでは等速直線運動のみのグラフとする
  v = 50 * velocity;   //セレクトボックスからの値によって速度が変化する

  if(x< canvas.width-ballRadius*2 && 100+30*t < 450){ //グラフがはみ出ないという条件も加える
    if(intervalID == 1){
    t += dt;

  } //intervalID
  } else {  //tが増えなく同じものを表示するのみ
//    x = x0;
//    t = 0;
    intervalID = 0;
  }
  x = v *t+1/2*acceleration*10*Math.pow(t,2); //等加速度速直線運動．ここでは等速直線運動

  ctx.clearRect(0,0,canvas.width, canvas.height);
 drawBall();
 drawfunction();
//}//intervalID
}//draw

intervalID = 0;

setInterval(draw,10);
