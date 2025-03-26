var canvas = document.getElementById('game');
var state = "presentation";
var titY = 0;
var file;
var data;
var numberss;
var numbers;
var n;
var start = false;
var bubbles = new Array();
const armony = new Audio("msc/armonia.wav");
//var file = "Drop a file to open it.";

class Bubble {
  constructor(size, speed, x, y, num){
    this.size = size;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.num = num;
    this.go = x;
    this.upto = true;
  }

  draw(ctx, img){
    ctx.textAlign = "center";
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.drawImage(img, 0, 0, 400, 400, this.x, this.y, this.size, this.size);
    ctx.fillText(this.num, this.x+(this.size/2), this.y+(this.size/1.5));
    ctx.textAlign = "left";
    this.update();
  }

  update(){
    let distance = this.x-this.go;
    this.speed = distance;
    if(this.x<this.go){
      this.x+=this.speed;
    }else if(this.x>this.go){
      this.x+=this.speed;
    }else{
      this.upto = true;
      this.go=this.x;
    }
  }
}

class Sprite {
constructor(img, px, py, width, height, x, y, nFrames, fIdx) {
  this.img = img;
  this.px = px;
  this.py = py;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.nFrames = nFrames;
  this.fIdx = fIdx;
}

update(){
  if(this.fIdx < this.nFrames-1){
    this.fIdx++;
  }else{
    this.fIdx=0;
  }
  this.px=this.width*this.fIdx;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  const img_pre = new Image();
  const img_tit = new Image();
  const img_cli = new Image();
  const img_bubs = new Image();
  const img_fils = new Image();
  const img_play = new Image();
  const img_bub = new Image();
  img_pre.src = "img/sorting-algorithms/presentation.png";
  img_tit.src = "img/sorting-algorithms/title.png";
  img_cli.src = "img/sorting-algorithms/cli-st.png";
  img_bubs.src = "img/sorting-algorithms/bubble-sort.png";
  img_fils.src = "img/sorting-algorithms/file-select.png";
  img_play.src = "img/sorting-algorithms/play.png";
  img_bub.src = "img/sorting-algorithms/bub.png";
  await img_pre.decode();
  await img_tit.decode();
  await img_cli.decode();
  await img_bubs.decode();
  await img_fils.decode();
  await img_play.decode();
  await img_bub.decode();
  //img_cli.onload = function() {
  //setTimeout(fade, 100, 1, ctx, img_pre, 1);
  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Click here to start!", 130, 240);
  await init();
  fade(1, ctx, img_pre, 1);
  await sleep(4000);
  fade(0, ctx, img_pre, 0);
  //setTimeout(fade, 4000, 0, ctx, img_pre, 0);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "white";
  const obj_cli = new Sprite(img_cli, 0, 0, 180, 64, 230, 200, 10, 0);
  /*let mypromise = new Promise(function(resolve){
    setTimeout(() => {}, 6100);
  });*/
  await sleep(2500);
  //rInTime("tit", 6100, ctx, img_tit, img_bubs, img_fils, obj_cli);
  armony.play();
  await title(ctx, img_tit, obj_cli);
  await selectAlg(ctx, img_bubs, img_fils, img_play);
  await initPlay(ctx, img_bub);
  //};
}

async function init(){
  if(start){
    return sleep(0);
  } else {
    await sleep(100);
    await init();
  }
}

function fade(i, ctx, img_pre, type){
  ctx.fillStyle = "black";
  ctx.clearRect(0,0,640,480);
  ctx.globalAlpha = 1;
  ctx.drawImage(img_pre, 0, 0);
  ctx.globalAlpha = i;
  ctx.fillRect(0, 0, 640, 480);
  if(type == 1){
    i-=0.05;
    if(i>0.01)setTimeout(fade, 100, i, ctx, img_pre, type);
  }else{
    i+=0.05;
    if(i<1.01)setTimeout(fade, 100, i, ctx, img_pre, type);
  }
}

async function title(ctx, img_tit, obj_cli){
  state = "title";
  var timeout=100;
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, 640, 480);
  ctx.fillRect(0, 0, 640, 480);
  ctx.drawImage(img_tit, 0, titY);
  if(titY==0){
    ctx.drawImage(obj_cli.img, obj_cli.px, obj_cli.py, obj_cli.width, obj_cli.height, obj_cli.x, obj_cli.y, obj_cli.width, obj_cli.height);
  }else{
    timeout=15;
  }
  obj_cli.update();
  /*var audio = new Audio('audio_file.mp3');
  armonia.play();*/
  titY+=titY;
  if(titY < -880){
    return sleep(0);
    //return;
  } else {
    await sleep(timeout);
    //setTimeout(title, timeout, ctx, img_tit, obj_cli);
    await title(ctx, img_tit, obj_cli);
  }
}

async function selectAlg(ctx, img_bubs, img_fils, img_play){
  //todo draw images of bubble sort and file select
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, 640, 480);
  ctx.fillRect(0, 0, 640, 480);
  ctx.drawImage(img_bubs, 32, 120);
  ctx.drawImage(img_fils, 256, 120);
  ctx.font = "48px Arial";
  ctx.strokeText("Drag and Drop a .txt File: ", 10, 50);
  const fr = new FileReader();
  fr.addEventListener("load", (e) => {
    data = e.target.result.split(/[\r\n]+/).filter(Boolean).join(' ');
    numberss = data.split(' ');
    n = numberss[0];
    numberss.shift();
    numbers = numberss.map(Number);
    state = "selected";
  });
  if(file!=undefined)
  fr.readAsText(file);
  if(data!=undefined){
    ctx.strokeText("Done!", 10, 100);
    ctx.strokeText("Total: "+n, 10, 300);
    ctx.strokeText('{'+numbers+'}', 10, 350);
    ctx.fillStyle = "black";
    ctx.drawImage(img_play, 480, 120);
    ctx.fillText("Ready! Press Play to Start", 34, 420);
  }
  if(state == "playing"){
    return sleep(0);
  }else{
    await sleep(100);
    await selectAlg(ctx, img_bubs, img_fils, img_play);
  }
}

async function initPlay(ctx, img_bub){
  const sorted = numbers.toSorted(function (a, b){return a - b;});
  for(let i = 0; i < n; i++){
    const bub = new Bubble(400/n, 1, i*(400/n), (n-sorted.indexOf(numbers[i]))*(400/n), numbers[i]);
    bubbles.push(bub);
  }
  await playing(ctx, img_bub, 0);
}

async function playing(ctx, img_bub, h){
  if (h < n-1){
    if(h==0){
      ctx.fillStyle = "white";
      ctx.clearRect(0, 0, 640, 480);
      ctx.fillRect(0, 0, 640, 480);
      ctx.strokeText("Start!", 400, 50);
      for(let i = 0; i < n; i++){
	bubbles[i].draw(ctx, img_bub);
      }
      await sleep(4000);
    }
    await checking(ctx, img_bub, h, 0, false);
    await sleep(10);
    await playing(ctx, img_bub, h+1);
  } else {
    return sleep(0);
  }
}

async function checking(ctx, img_bub, h, j, swapped){
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, 640, 480);
  ctx.fillRect(0, 0, 640, 480);
  for(let i = 0; i < n; i++){
    bubbles[i].draw(ctx, img_bub);
  }

  if(j < n-1){
    if(numbers[j] > numbers[j+1]){
      bubbles[j].upto=false;
      bubbles[j+1].upto=false;
      bubbles[j].go = bubbles[j+1].x;
      bubbles[j+1].go = bubbles[j].x;
      numbers[j+1] = numbers[j] ^ numbers[j+1];
      numbers[j] = numbers[j] ^ numbers[j+1];
      numbers[j+1] = numbers[j] ^ numbers[j+1];
      await swap(ctx, img_bub, j);
      swapped=true;
    }
    await sleep(10);
    await checking(ctx, img_bub, h, j+1, swapped);
  }else{
    return sleep(0);
  }
}

async function swap(ctx, img_bub, j){
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, 640, 480);
  ctx.fillRect(0, 0, 640, 480);
  for(let i = 0; i < n; i++){
    bubbles[i].draw(ctx, img_bub);
  }
  if(bubbles[j].upto == true){
    if(bubbles[j+1].upto == true){
      var bubAux=bubbles[j];
      bubbles[j]=bubbles[j+1];
      bubbles[j+1]=bubAux;
      return sleep(0);
    }
  }else{
    await sleep(10);
    await swap(ctx, img_bub, j);
  }
}

canvas.addEventListener("click", (e) => {
  var rect = canvas.getBoundingClientRect();
  if(state == "title"){   
    if (e.clientX-rect.left > 230 && e.clientX-rect.left < 410) {
      if (e.clientY-rect.top > 200 && e.clientY-rect.top < 264) {
	titY=-0.0001;
	state = "select";
      }
    }
  }else if(state == "presentation") {
    start = true;
  }else if(state == "selected") {
    if(e.clientX-rect.left > 480 && e.clientX-rect.left < 608) {
      if(e.clientY-rect.top > 120 && e.clientY-rect.top < 248) {
        state = "playing";
      }
    }
  }
});

canvas.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
});

canvas.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();
  file = e.dataTransfer.files[0];
});

armony.addEventListener("ended", function() {
  this.currentTime = 0;
  this.play();
}, false);

main();
