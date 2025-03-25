var canvas = document.getElementById('game');
var state = "presentation";
var titY = 0;
var file;
var data;
var numbers;
var n;
const armony = new Audio("msc/armonia.wav");
//var file = "Drop a file to open it.";

class Bubble {
	constructor(size, speed, x, y, number){
		this.size = size;
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.number = number;
	}

	draw(){
		//todo add drawing functions
	}

	update(){
		//todo add update functions
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
	var start = false;
  img_pre.src = "img/sorting-algorithms/presentation.png";
  img_tit.src = "img/sorting-algorithms/title.png";
  img_cli.src = "img/sorting-algorithms/cli-st.png";
  img_bubs.src = "img/sorting-algorithms/bubble-sort.png";
  img_fils.src = "img/sorting-algorithms/file-select.png";
  img_play.src = "img/sorting-algorithms/play.png";
  //img_cli.onload = function() {
  //setTimeout(fade, 100, 1, ctx, img_pre, 1);
	ctx.fillStyle = "white";
	ctx.fillText("Click here to start!", 210, 220);
	await init(start);
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
	await playing(ctx);
  //};
}

async function init(start){
	if(start){
		return sleep(0);
	} else {
		await sleep(100);
		await init(start);
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
    numbers = data.split(' ');
    n = numbers[0];
    numbers.shift();
  });
  if(file!=undefined)
  fr.readAsText(file);
  if(data!=undefined){
    state = "selected";
    ctx.strokeText("Done!", 10, 100);
    ctx.strokeText("Total: "+n, 10, 300);
    ctx.strokeText('{'+numbers+'}', 10, 350);
    ctx.fillStyle = "black";
    ctx.drawImage(img_play, 480, 120);
    ctx.fillText("Ready! Press Play to Start", 34, 420);
  }
  await sleep(100);
  await selectAlg(ctx, img_bubs, img_fils, img_play);
}

async function playing(ctx){
	state = "playing"; 
	ctx.fillStyle = "white";
  ctx.clearRect(0, 0, 640, 480);
  ctx.fillRect(0, 0, 640, 480);
	await sleep(100);
  await playing(ctx);
}

canvas.addEventListener("click", (e) => {
  if(state == "title"){
    var rect = canvas.getBoundingClientRect();   
    if (e.clientX-rect.left > 230 && e.clientX-rect.left < 410) {
      if (e.clientY-rect.top > 200 && e.clientY-rect.top < 264) {
	  		titY=-0.0001;
	  		state = "select";
      }
    }
  }else if(state == "presentation"){
		start = true;
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
