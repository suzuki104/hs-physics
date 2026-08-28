
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x0 =0; //10//斜方投射のt=0のときのxの位置
var y0 =0; //100//斜方投射のt=0のときのyの位置
var x20 =0;//400; //自由落下のt=0のxの位置
var y20 =0; //自由落下のt=0のyの位置


var x2 = x20;
var y2 = y20;

var ballRadius = 10;
var t = 0;
var dt = 0.01;//0.01

var tint = 0; //時間（整数値）

var v0x = 30;  //斜方投射y方向初速度
var v0y = 100; //斜方投射y方向初速度
var v0 = 100;  //斜方投射初速度（これをx方向，y方向に分解）

var vy = 0; //y方向速度　←不要？
var vx = 0; //x方向速度　←不要？

var g = 9.8; //重力加速度

var startButton;
var resetButton;

var intervalID = 0;

var xint = 0; //x整数値
var yint = 0; //y整数値

var dx = 0;  //t=0の2つのボールの間のx方向の差
var dy = 0; //t=0の2つのボールの間のy方向の差
var dr = 0; //t=0の2つのボールの直線距離
var costheta =0; //t=0の2つのボールの角度の正弦と余弦
var sintheta =0;
var radian = 0;

//斜方投射(1)，自由落下(2)それぞれのx座標，y座標
var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;

//入力した初速度，初期位置を格納
var i_velocity = 0;
var x1pos = 0;
var x2pos = 0;
var y1pos = 0;
var y2pos = 0;


//初速度，初期位置を取得
function getvalue(){


  i_velocity= parseInt(document.getElementById('i_velocity').value);
  x1pos = parseInt(document.getElementById('x1pos').value);
  x2pos = parseInt(document.getElementById('x2pos').value);
  y1pos = parseInt(document.getElementById('y1pos').value);
  y2pos = parseInt(document.getElementById('y2pos').value);
}

function cal_pos(){
   dx = x2pos-x1pos;  //t=0の2つのボールの間のx方向の差
   dy = y1pos-y2pos; //t=0の2つのボールの間のy方向の差
   dr = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)) //t=0の2つのボールの直線距離
   costheta =dx/dr ; //t=0の2つのボールの角度の正弦と余弦
   sintheta =dy/dr ;
   radian = Math.acos(costheta);


  x1 = x1pos+i_velocity*costheta*t;
  y1 = y1pos+(-i_velocity*sintheta)*t+1/2*g*Math.pow(t,2);
  x2 = x2pos;
  y2 = y2pos+1/2*g*Math.pow(t,2);

/*
  x1 = x0+v0*costheta*t;
  y1 = y0+(-v0*sintheta)*t+1/2*g*Math.pow(t,2);
  x2 = x20;
  y2 = y20+1/2*g*Math.pow(t,2); */
}

//document.getElementById('text-button').onclick = function(){
//  document.getElementById('text').innerHTML = 'ストップ！';
//};    //不要？

//スタート，ストップを画面で直接押せるようにしたい
startButton = document.getElementById('start');
stopButton  = document.getElementById('stop');
resetButton = document.getElementById('reset');
//settingButton = document.getElementById('setting');

startButton.onclick = function(){
  getvalue();
  //alert(10+10);
  //alert(i_velocity + 10);
  //alert(x1pos+10);
  //alert(x2pos+10);
  //alert(y1pos+10);
  //alert(y2pos+10);
  intervalID = 1;
}

stopButton.onclick = function(){
  getvalue();
  intervalID = 0;
}

resetButton.onclick = function(){
  t = 0;
  //斜方投射，自由落下のx,y座標
  getvalue();
  cal_pos();


  ctx.clearRect(0,0,canvas.width, canvas.height);
  //drawaxis();
  drawTime();
  drawline();
  drawvector();

  drawBall();
  drawBall3();
  intervalID = 0;
}

//初期位置のスライダーが設定されたら場所がすぐ動くように設定
document.getElementById('x1pos').addEventListener('input',inputChange);
document.getElementById('x2pos').addEventListener('input',inputChange);
document.getElementById('y1pos').addEventListener('input',inputChange);
document.getElementById('y2pos').addEventListener('input',inputChange);

//スライダーが動いたら動くように設定．設定ボタンと同じ．
function inputChange(){
  t = 0;
  //斜方投射，自由落下のx,y座標
  getvalue();
  cal_pos();
  ctx.clearRect(0,0,canvas.width, canvas.height);
  //drawaxis();
  drawTime();
  drawline();
  drawvector();

  drawBall();
  drawBall3();
  intervalID = 0;
}

/*
//設定ボタン．リセットと同じ
settingButton.onclick = function(){
  t = 0;
  //斜方投射，自由落下のx,y座標
  getvalue();
  cal_pos();
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawaxis();
  drawTime();
  drawline();
  drawvector();

  drawBall();
  drawBall3();
  intervalID = 0;
}*/



function drawBall(){    //斜方投射
ctx.beginPath();
ctx.arc(x1, y1, ballRadius, 0, Math.PI*2, false);
//ctx.arc(x0+v0*costheta*t, y0+(-v0*sintheta)*t+1/2*g*Math.pow(t,2), ballRadius, 0, Math.PI*2, false);

ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();


/*function drawBall(){    //斜方投射
ctx.beginPath();
ctx.arc(x0+v0x*t*10, y0+(-v0y)*t+1/2*g*Math.pow(t,2)*10, ballRadius, 0, Math.PI*2, false);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();
*/

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

/*function drawBall1_2(){    //水平投射,整数値時間の足跡表示
for(var i = 0; i <= tint; i++){
ctx.beginPath();
ctx.arc(vx0*i*10+ballRadius, 1/2*g*Math.pow(i,2)*10+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.strokeStyle = 'red';
ctx.stroke();
ctx.closePath();
}
}*/


/*
function drawBall2(){ //水平方向，等速直線運動 不要
ctx.beginPath();
ctx.arc(x+ballRadius, 0+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();
//x += dx;
//y += dy;
}*/



/*function drawBall2_2(){    //水平方向，等速直線運動,整数値時間の足跡表示
for(var i = 0; i <= tint; i++){
ctx.beginPath();
ctx.arc(vx0*i*10+ballRadius, 0+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();
}
}*/

function drawBall3(){ //鉛直方向，自由落下
ctx.beginPath();
ctx.arc(x2, y2, ballRadius, 0, Math.PI*2, false);
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

/*
function drawBall3_2(){    //鉛直方向，自由落下,整数値時間の足跡表示
for(var i = 0; i <= tint; i++){
ctx.beginPath();
ctx.arc(0+ballRadius, 1/2*g*Math.pow(i,2)*10+ballRadius, ballRadius, 0, Math.PI*2, false);
ctx.strokeStyle = 'blue';
ctx.stroke();
ctx.closePath();
}


}
*/
//function drawFootpint(){    //時間ごとの場所を表示

//}

function drawTime(){
  ctx.font = '16px Arial';
  ctx.fillStyle = 'blue';
  ctx.fillText('Time: ' + Math.floor(t*100)/100, canvas.width/2, 16);
}

function drawline(){
  ctx.beginPath();
  ctx.moveTo(x1pos,y1pos);
  ctx.lineTo(x2pos,y2pos);
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

function drawvector(){    //速度のベクトル方向を書く
  ctx.beginPath();

//  ctx.scale(0.5,0.5);
//  ctx.translate(canvas.width,0)　
  ctx.lineWidth= 3;
  ctx.moveTo(x1pos,y1pos);
//  ctx.lineTo(x0+Math.abs(x20-x0)/3,y0+Math.abs(y0-y20)/3);  //後で直すこと，ベクトルの長さを速度に変換・表示すること
  ctx.lineTo(x1pos+(x2pos-x1pos)/5,y1pos+(y2pos-y1pos)/5);  //後で直すこと，ベクトルの長さを速度に変換・表示すること
//  ctx.lineTo(x0+Math.abs(x20-x0)/5,y0-Math.abs(y0-y20)/5);  //後で直すこと，ベクトルの長さを速度に変換・表示すること

  ctx.translate(x1pos+(x2pos-x1pos)/5,y1pos+(y2pos-y1pos)/5);   //原点を矢印の先に変更

//  ctx.rotate(0.1);
//  ctx.rotate(15/180*(Math.PI));   //矢印の先を中心に時計回りに15°回転
if(dy >= 0){
  ctx.rotate(Math.PI/2-radian-Math.PI/6); //ベクトルの作用線に対して30°反時計回りに回転
  ctx.lineTo(0,30);
  ctx.rotate(-(Math.PI/2-radian-Math.PI/6));
  ctx.rotate(Math.PI/2-radian+Math.PI/6); //ベクトルの作用線に対して30°時計回りに回転
  ctx.lineTo(0,0);
  ctx.lineTo(0,30);
  ctx.rotate(-(Math.PI/2-radian+Math.PI/6));
  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.translate(-(x1pos+(x2pos-x1pos)/5),-(y1pos+(y2pos-y1pos)/5));
  ctx.closePath();
} else{
    ctx.rotate(Math.PI+radian-Math.PI/6); //ベクトルの作用線に対して30°反時計回りに回転
    ctx.lineTo(30,0);
    ctx.rotate(-(Math.PI+radian-Math.PI/6));
    ctx.rotate(Math.PI+radian+Math.PI/6); //ベクトルの作用線に対して30°時計回りに回転
    ctx.lineTo(0,0);
    ctx.lineTo(30,0);
    ctx.rotate(-(Math.PI+radian+Math.PI/6));
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.translate(-(x1pos+(x2pos-x1pos)/5),-(y1pos+(y2pos-y1pos)/5));
    ctx.closePath();

}
/*    //座標を見慣れた形に変換する
  ctx.beginPath();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.fillRect(0,0,50,50);
  ctx.scale(1.0,-1.0);    //原点周りの汎用的なx-y座標に変換（x:右正，y:左正）
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,50,50);
  ctx.closePath();
*/

//  ctx.fillRect(20,20,50,50);

  ctx.lineWidth= 1;



/*  ctx.translate(100,100);
  ctx.fillRect(20,20,50,50);

  ctx.translate(100,100);
  ctx.fillStyle('red');
  ctx.fillRect(20,20,50,50);
  */
}
/*
//x軸，y軸を描画
function drawaxis(){
  //x軸
  ctx.beginPath();
  ctx.translate(10,10);
  ctx.moveTo(0,0);
  ctx.lineTo(60,0);
  ctx.translate(60,0);
  ctx.rotate(Math.PI/3);
  ctx.lineTo(0,10);
  ctx.rotate(-Math.PI/3);
  ctx.lineTo(0,0);
  ctx.rotate(Math.PI/6+Math.PI/2);
  ctx.lineTo(0,10);
  ctx.rotate(-(Math.PI/6+Math.PI/2));
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.translate(-60,-0);
  ctx.translate(-10,-10);
  ctx.closePath();

　//y軸
  ctx.beginPath();
  ctx.translate(10,10);
  ctx.rotate(Math.PI/2);
  ctx.moveTo(0,0);
  ctx.lineTo(60,0);
  ctx.translate(60,0);
  ctx.rotate(Math.PI/3);
  ctx.lineTo(0,10);
  ctx.rotate(-Math.PI/3);
  ctx.lineTo(0,0);
  ctx.rotate(Math.PI/6+Math.PI/2);
  ctx.lineTo(0,10);
  ctx.rotate(-(Math.PI/6+Math.PI/2));
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.translate(-60,-0);
  ctx.rotate(-Math.PI/2);
  ctx.translate(-10,-10);
  ctx.closePath();

  //文字
  ctx.fillStyle = 'black'
  ctx.font = '16px Arial';
  ctx.fillText('x軸',80,15);
  ctx.fillText('y軸',5,90);
}*/


function draw(){

  if(intervalID == 1){
  if(y1  <= canvas.height && y2  <= canvas.height && x1 <= canvas.width && x2 <= canvas.width){
    t += dt;
    tint = Math.floor(t);    //整数値のみを格納

//    y =y0-vy0*t+ 1/2*g*Math.pow(t,2)*10 //鉛直投げ上げ
//    x =v0x *t*10 //水平投射
//    yint = 1/2*g*Math.pow(tint,2)*10 //鉛直方向，自由落下，整数値時間
//    xint =vx0 *tint*10 //水平方向，等速直線運動，整数値時間
  } else {
    //y = y0;
    //x = x0;
    t = 0;
  }

  //斜方投射，自由落下のx,y座標
  cal_pos();

//  x1 = x0+v0*costheta*t;
//  y1 = y0+(-v0*sintheta)*t+1/2*g*Math.pow(t,2);
//  x2 = x20;
//  y2 = y20+1/2*g*Math.pow(t,2);



  ctx.clearRect(0,0,canvas.width, canvas.height);

// drawFootprint();
 drawTime();
 //drawaxis();

 drawBall();
// drawBall2();
 drawBall3();
// drawBall1_2();
// drawBall2_2();
// drawBall3_2();

// stopButton.onclick = function(){
 //window.alert('一時停止');

//console.log('テスト');
// }
//if()

//衝突条件．もう少し正しいものに書き換えること．
//if( Math.abs(x1-x2) < 1  && Math.abs(y1-y2)  < 1){ // && Math.abs(y1-y2) < y20+1/2*g*Math.pow(t-0.01,2) <= y2 && y20+1/2*g*Math.pow(t+0.01,2) >= y2) {   //衝突したらストップする（完全一致ではないが...）
//  if( Math.abs(x1-x2) <= v0*costheta*dt  && Math.abs(y1-y2)  < 1){ // && Math.abs(y1-y2) < y20+1/2*g*Math.pow(t-0.01,2) <= y2 && y20+1/2*g*Math.pow(t+0.01,2) >= y2) {   //衝突したらストップする（完全一致ではないが...）
//  if( Math.abs(x1-x2) <= v0*costheta*dt  && Math.abs(y1-y2) < Math.abs((y0+(-v0*sintheta)*t+1/2*g*Math.pow(t+dt,2))-(y20+1/2*g*Math.pow(t+dt,2)))){ // && Math.abs(y1-y2) < y20+1/2*g*Math.pow(t-0.01,2) <= y2 && y20+1/2*g*Math.pow(t+0.01,2) >= y2) {   //衝突したらストップする（完全一致ではないが...）

//計算した時間になったら「衝突」と表示されるようにする //縦に並んでいるとき
if(x1pos == x2pos && Math.floor(t*100)/100 == Math.floor(Math.abs(y1pos-y2pos)/i_velocity*100)/100){
  intervalID = 0;
  alert('HIT!!');
}

if( Math.floor(t*100)/100 == Math.floor((x2pos-x1pos)/(costheta*i_velocity)*100)/100 ){
  intervalID = 0;
  alert('HIT!!');

//if(x1 <= x2 && x0+v0*costheta*(t+0.01) >= x2 && y20+1/2*g*Math.pow(t-0.01,2) <= y2 && y20+1/2*g*Math.pow(t+0.01,2) >= y2) {   //衝突したらストップする（完全一致ではないが...）
//  intervalID = 0;
//  alert('HIT!!');
  //document.location.reload();
}

}
}

if(intervalID === 0){
  getvalue();
  cal_pos();
//  drawaxis();
  drawTime();
  drawline();
  drawvector();

  drawBall();
  drawBall3();
  setInterval(draw,10);

//  console.log('テスト');
}
