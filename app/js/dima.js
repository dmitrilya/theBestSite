var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var Radius = 15;
var st1 = 5, st2 = -5;
var img=document.getElementById("lamp");



function drawBall() {
  ctx.beginPath(); // Создает новый контур. После созданния используется в дальнейшем командами рисования при построении контуров.
ctx.arc(x, y, Radius, 0, Math.PI*2); // x, y, r(радиус-кек), sAngle (начальная), eAngle (конечная)
var pat=ctx.createPattern(img,"no-repeat");
ctx.fillStyle = pat; // Определяем цвет! "Да будет цвет, сказал, мужик и поехал в гее-клуб"
ctx.fill();// заполняет его внутренности
ctx.closePath(); // закрывает путь от текущей точки до конечной
}


function draw(){
 // делаем очистку для предедущего шарика, чтобы не оставлял след!
drawBall();
if(y + st2 < Radius || y + st2 > canvas.height - Radius) {
  st2 = -st2;
}
if(x + st1 < Radius || x + st1 > canvas.width - Radius){ //Чтобы стены стояли
   st1 = -st1;
}
x += st1;
y += st2; // задаем движ
}
setInterval(draw, 10);
