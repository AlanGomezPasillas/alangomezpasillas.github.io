const SCR_WIDTH = 640;
const SCR_HEIGHT = 480;
//var file = "Drop a file to open it.";
class Bubble {
  constructor(image, speed, size, x, y, num){
    this.img = image
    this.spd = 1-(speed*0.01);
    this.size = size;
    this.x = x;
    this.y = y;
    this.num = num;
    this.go = x;
    this.upto = true;
  }

  draw(ctx){
    ctx.textAlign = "center";
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.drawImage(this.img, 0, 0, 400, 400, this.x, this.y, this.size, this.size);
    ctx.fillText(this.num, this.x+(this.size/2), this.y+(this.size/1.5));
    ctx.textAlign = "left";
  }

  update(){
    var distance = this.x-this.go;
    var velocity = distance-(distance*this.spd);
    if (Math.round(this.x) < Math.round(this.go)) {
      this.x -= velocity;
    } else if(Math.round(this.x) > Math.round(this.go)) {
      this.x -= velocity;
    } else {
      this.x = Math.round(this.x);
      this.upto = true;
      this.go=this.x;
    }
  }
}

class Sprite {
  constructor(image, posx, posy, width, height, x, y, nFrames, fIndex) {
    this.img = image;
    this.px = posx;
    this.py = posy;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.nFrames = nFrames;
    this.fIdx = fIndex;
  }

  update(){
    if(this.fIdx < this.nFrames-1) {
      this.fIdx++;
    } else {
      this.fIdx = 0;
    }
    this.px = this.width * this.fIdx;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  var state = "presentation";
  var btnStart = false;
  var file;
  var data;
  var arrNum;
  var n;
  var arrBub;
  const imgPre = new Image();
  const imgTit = new Image();
  const imgCli = new Image();
  const imgBubs = new Image();
  const imgFils = new Image();
  const imgPlay = new Image();
  const imgBub = new Image();
  const mscArmony = new Audio("msc/armonia.wav");
  imgPre.src = "img/sorting-algorithms/presentation.png";
  imgTit.src = "img/sorting-algorithms/title.png";
  imgCli.src = "img/sorting-algorithms/cli-st.png";
  imgBubs.src = "img/sorting-algorithms/bubble-sort.png";
  imgFils.src = "img/sorting-algorithms/file-select.png";
  imgPlay.src = "img/sorting-algorithms/play.png";
  imgBub.src = "img/sorting-algorithms/bub.png";
  await imgPre.decode();
  await imgTit.decode();
  await imgCli.decode();
  await imgBubs.decode();
  await imgFils.decode();
  await imgPlay.decode();
  await imgBub.decode();
  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Click here to start!", 130, 240);
  await isCliked(btnStart);
  fade(1, ctx, imgPre, 1);
  await sleep(4000);
  fade(0, ctx, imgPre, 0);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "white";
  const objCli = new Sprite(imgCli, 0, 0, 180, 64, 230, 200, 10, 0);
  await sleep(2500);
  armony.play();
  await title(ctx, imgTit, objCli);
  while(true){
    arrBubbles = new Array();
    file = undefined;
    data = undefined;
    state = "title";
    titY = 0;
    await selectAlg(ctx, imgBubs, imgFils, imgPlay);
    await initPlay(ctx, imgBub);
  }
}

async function isClicked(clicked, x1 = 0, x2 = SCR_WIDTH, y1 = 0, y2 = SCR_HEIGHT){
  canvas.addEventListener("click", (e) => {
    clicked = true;
  });
  if(start){
    return sleep(0);
  } else {
    await sleep(100);
    await init(clicked, x1, x2, y1, y2);
  }
}

function fade(i, ctx, imgPre, type){
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.globalAlpha = 1;
  ctx.drawImage(imgPre, 0, 0);
  ctx.globalAlpha = i;
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  if(type == 1){
    i-=0.05;
    if(i>0.01)setTimeout(fade, 100, i, ctx, imgPre, type);
  }else{
    i+=0.05;
    if(i<1.01)setTimeout(fade, 100, i, ctx, imgPre, type);
  }
}

async function title(ctx, imgTit, objCli, titY = 0){
  canvas.addEventListener("click", (e) => {
    var rect = canvas.getBoundingClientRect();
    if (e.clientX-rect.left > 230 && e.clientX-rect.left < 410) {
      if (e.clientY-rect.top > 200 && e.clientY-rect.top < 264) {
	    titY =- 0.0001;
	    state = "select";
      }
    }
  });
  var timeout=100;
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(imgTit, 0, titY);
  if(titY==0){
    ctx.drawImage(objCli.img, objCli.px, objCli.py, objCli.width, objCli.height, objCli.x, objCli.y, objCli.width, objCli.height);
  }else{
    timeout=15;
  }
  objCli.update();
  /*var audio = new Audio('audio_file.mp3');
  armonia.play();*/
  titY+=titY;
  if(titY < -880){
    return sleep(0);
    //return;
  } else {
    await sleep(timeout);
    //setTimeout(title, timeout, ctx, img_tit, obj_cli);
    await title(ctx, imgTit, objCli, titY);
  }
}

async function selectAlg(ctx, imgBubs, imgFils, imgPlay){
  const fr = new FileReader();
  canvas.addEventListener("click", (e) => {
    var rect = canvas.getBoundingClientRect();
    if(state == "selected") {
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
  fr.addEventListener("load", (e) => {
    data = e.target.result.split(/[\r\n]+/).filter(Boolean).join(' ');
    numberss = data.split(' ');
    n = numberss[0];
    numberss.shift();
    numbers = numberss.map(Number);
    state = "selected";
  });
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(imgBubs, 32, 120);
  ctx.drawImage(imgFils, 256, 120);
  ctx.font = "48px Arial";
  ctx.strokeText("Drag and Drop a .txt File: ", 10, 50);
  if(file!=undefined)
  fr.readAsText(file);
  if(data!=undefined) {
    ctx.strokeText("Done!", 10, 100);
    ctx.strokeText("Total: " + n, 10, 300);
    if(n < 6) {
      ctx.strokeText('{' + numbers + '}', 10, 350);
    } else {
      let head = '{';
      for(let i = 0; i < 6; i++) {
        head += numbers[i];
        head += ",";
      }
      head += "...}";
      ctx.strokeText(head, 10, 350);
    }
    ctx.fillStyle = "black";
    ctx.drawImage(imgPlay, 480, 120);
    ctx.fillText("Ready! Press Play to Start", 34, 420);
  }
  if(state == "playing"){
    return sleep(0);
  }else{
    await sleep(10);
    await selectAlg(ctx, imgBubs, imgFils, imgPlay);
  }
}

async function initPlay(ctx, imgBub){
  const arrSorted = arrNum.toSorted(function (a, b){return a - b;});
  for(let i = 0; i < n; i++){
    const bub = new Bubble(400/n, 20, i*(400/n)+120, (n-arrSorted.indexOf(arrNum[i]))*(400/n)+20, arrNum[i]);
    arrSorted[arrSorted.indexOf(arrNum[i])]=-123456;
    arrBub.push(bub);
  }
  await playing(ctx, imgBub, 0);
}

async function playing(ctx, imgBub, h){
  let checker = {swapped: false};
  if (h < n-1){
    if(h==0){
      ctx.fillStyle = "white";
      ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
      ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
      ctx.strokeText("Start!", 400, 50);
      for(let i = 0; i < n; i++){
	    arrBub[i].draw(ctx, imgBub);
      }
      await sleep(4000);
    }
    await checking(ctx, imgBub, h, 0, checker);
    if(checker.swapped == true) {
      await playing(ctx, imgBub, h+1);
    } else {
      ctx.font = "48px Arial";
      ctx.strokeText("Done!", 480, 400);
      return sleep(5000);
    }
  } else {
    ctx.font = "48px Arial";
    ctx.strokeText("Done!", 480, 400);
    return sleep(5000);
  }
}

async function checking(ctx, imgBub, h, j, c) {
  let next = true;
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.strokeText("Loop1: "+h, 528, 40);
  ctx.strokeText("Loop2: "+j, 528, 80);
  ctx.strokeText("Speed: "+Math.round((1-arrBubbles[0].speed)*100), 528, 120);
  if(n < 20)ctx.strokeText("Set: {" + arrNum + '}', 100, 40);
  for(let i = 0; i < n; i++) {
    arrBub[i].draw(ctx, imgBub);
  }
  if (j < n-1) {
    if (arrNum[j] > arrNum[j+1]) {
      arrBub[j].upto=false;
      arrBub[j+1].upto=false;
      arrBub[j].go = arrBub[j+1].x;
      arrBub[j+1].go = arrBub[j].x;
      arrNum[j+1] = arrNum[j] ^ arrNum[j+1];
      arrNum[j] = arrNum[j] ^ arrNum[j+1];
      arrNum[j+1] = arrNum[j] ^ arrNum[j+1];
      await swap(ctx, imgBub, h, j);
      c.swapped=true;
      await init(next);
    } else {
      //sleep(Math.round((1-bubbles[0].speed)*100*500))
    }
    await sleep(1);
    await checking(ctx, imgBub, h, j+1, c);
  } else {
    return sleep(0);
  }
}

async function swap(ctx, imgBub, h, j){
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.strokeText("Loop1: "+h, 528, 40);
  ctx.strokeText("Loop2: "+j, 528, 80);
  ctx.strokeText("Speed: "+Math.round((1-bubbles[0].speed)*100), 528, 120);
  if(n<20)ctx.strokeText("Set: {" + numbers + '}', 100, 40);
  for(let i = 0; i < n; i++){
    arrBub[i].draw(ctx, imgBub);
    arrBub[i].update();
  }
  if(arrBub[j].upto == true && arrBub[j+1].upto == true) {
    var bubAux=arrBub[j];
    arrBub[j]=arrBub[j+1];
    arrBub[j+1]=bubAux;
    return sleep(0);
  } else {
    await sleep(1);
    await swap(ctx, imgBub, h, j);
  }
}

mscArmony.addEventListener("ended", function() {
  this.currentTime = 0;
  this.play();
});

main();
