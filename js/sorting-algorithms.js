const SCR_WIDTH = 640;
const SCR_HEIGHT = 480;
const mscArmony = new Audio("msc/armonia.wav");

class Bubble {
  constructor(image, speed, size, x, y, num){
    this.img = image;
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
      this.go = this.x;
    }
  }
}

class Sprite {
  constructor(image, posx, posy, width, height, x, y, nFrames, fIndex, speed) {
    this.img = image;
    this.px = posx;
    this.py = posy;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.nFrames = nFrames;
    this.fIdx = fIndex;
    this.spd = speed;
  }

  update(){
    if(this.fIdx < this.nFrames-1) {
      this.fIdx += Math.floor(this.spd);
    } else {
      this.fIdx = 0;
    }
    this.px = this.width * this.fIdx;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getClick(canvas, clicked = false, loop = true, x1 = 0, x2 = SCR_WIDTH, y1 = 0, y2 = SCR_HEIGHT){
  canvas.addEventListener("click", (e) => {
    var rect = canvas.getBoundingClientRect();
    if (e.clientX-rect.left > x1 && e.clientX-rect.left < x2) {
      if (e.clientY-rect.top > y1 && e.clientY-rect.top < y2) {
        clicked = true;
      }
    }
  });
  if(clicked){
    return true;
  } else {
    if (loop) {
      await sleep(100);
      return await getClick(canvas, clicked, loop, x1, x2, y1, y2);
    }else{
      return false;
    }
  }
}

function fade(i, ctx, img, type){
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(img, 0, 0);
  ctx.globalAlpha = i;
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.globalAlpha = 1;
  if (type == 1) {
    if (i >= 0.5) setTimeout(fade, 50, i-0.05, ctx, img, type);
  } else {
    if (i <= 0.95) setTimeout(fade, 50, i+0.05, ctx, img, type);
  }
}

async function presentation(ctx, imgPre){
  fade(1, ctx, imgPre, 1);
  await sleep(4000);
  fade(0, ctx, imgPre, 0);
  ctx.fillStyle = "white";
  await sleep(2000);
  mscArmony.play();
}

async function title(canvas, ctx, imgTit, objCli, titY){
  var timeout = 100;
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(imgTit, 0, titY);
  if(titY == 0) {
    ctx.drawImage(objCli.img, objCli.px, objCli.py, objCli.width, objCli.height, objCli.x, objCli.y, objCli.width, objCli.height);
  } else {
    timeout = 15;
  }
  objCli.update();
  titY += titY;
  if(getClick(canvas, false, false, 230, 410, 200, 264)) {
     titY = -0.0001;
  }
  if(titY < -880) {
    return sleep(0);
  } else {
    await sleep(timeout);
    await title(canvas, ctx, imgTit, objCli, titY);
  }
}

async function selectAlg(canvas, ctx, imgBubs, imgFils, imgPlay, n, arrNum){
  var file;
  var data;
  const fr = new FileReader();
  if(getClick(canvas, false, false, 480, 608, 120, 248)) return;
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
    data = e.target.result.split(/[\r\n]+/).filter(Boolean).join(' ').split(' ').map(Number);
    //numberss = data.split(' ');
    //n = numberss[0];
    //numberss.shift();
    arrNum = data.map(Number);
    n = arrNum.length;
    state = "selected";
  });
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(imgBubs, 32, 120);
  ctx.drawImage(imgFils, 256, 120);
  ctx.font = "48px Arial";
  ctx.strokeText("Drag and Drop a .txt File: ", 10, 50);
  if(file != undefined)
  fr.readAsText(file);
  if(n > 0) {
    ctx.strokeText("Done!", 10, 100);
    ctx.strokeText("Total: " + n, 10, 300);
    if(n < 6) {
      ctx.strokeText('{' + arrNum + '}', 10, 350);
    } else {
      let head = '{';
      for(let i = 0; i < 6; i++) {
        head += arrNum[i];
        head += ",";
      }
      head += "...}";
      ctx.strokeText(head, 10, 350);
    }
    ctx.fillStyle = "black";
    ctx.drawImage(imgPlay, 480, 120);
    ctx.fillText("Ready! Press Play to Start", 34, 420);
  }
  if(getClick(canvas, false, false, 480, 608, 120, 248)){
    return;
  }else{
    await sleep(10);
    await selectAlg(canvas, ctx, imgBubs, imgFils, imgPlay, n, arrNum);
  }
}

async function initPlay(imgBub, n, arrNum, arrBub){
  const arrSorted = arrNum.toSorted(function (a, b){return a - b;});
  for(let i = 0; i < n; i++){
    const bub = new Bubble(imgBub, 400/n, 20, i*(400/n)+120, (n-arrSorted.indexOf(arrNum[i]))*(400/n)+20, arrNum[i]);
    arrSorted[arrSorted.indexOf(arrNum[i])]=-123456;
    arrBub.push(bub);
  }
}

async function playing(canvas, ctx, imgBub, h){
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
    await checking(canvas, ctx, imgBub, h, 0, checker);
    if(checker.swapped == true) {
      await playing(canvas, ctx, imgBub, h+1);
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

async function checking(canvas, ctx, h, j, c) {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.strokeText("Loop1: " + h, 528, 40);
  ctx.strokeText("Loop2: " + j, 528, 80);
  ctx.strokeText("Speed: " + Math.round((1-arrBubbles[0].speed)*100), 528, 120);
  if(n < 20)ctx.strokeText("Set: {" + arrNum + '}', 100, 40);
  for(let i = 0; i < n; i++) {
    arrBub[i].draw(ctx);
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
      await swap(ctx, h, j);
      c.swapped = true;
      await getClick(true);
    } else {
      //sleep(Math.round((1-bubbles[0].speed)*100*500))
    }
    await sleep(1);
    await checking(ctx, h, j+1, c);
  } else {
    return sleep(0);
  }
}

async function swap(ctx, h, j){
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.strokeText("Loop1: " + h, 528, 40);
  ctx.strokeText("Loop2: " + j, 528, 80);
  ctx.strokeText("Speed: " + Math.round((1-bubbles[0].speed)*100), 528, 120);
  if(n<20)ctx.strokeText("Set: {" + numbers + '}', 100, 40);
  for(let i = 0; i < n; i++){
    arrBub[i].draw(ctx);
    arrBub[i].update();
  }
  if(arrBub[j].upto == true && arrBub[j+1].upto == true) {
    var bubAux = arrBub[j];
    arrBub[j] = arrBub[j+1];
    arrBub[j+1] = bubAux;
    return sleep(0);
  } else {
    await sleep(1);
    await swap(ctx, h, j);
  }
}

async function main() {
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  //var state = "presentation";
  var n;
  var arrNum;
  var arrBub;
  
  const imgPre = new Image();
  const imgTit = new Image();
  const imgCli = new Image();
  const imgBubs = new Image();
  const imgFils = new Image();
  const imgPlay = new Image();
  const imgBub = new Image();
  
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
  
  const objCli = new Sprite(imgCli, 0, 0, 180, 64, 230, 200, 10, 0, 1);
  
  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Click here to start!", 130, 240);
  await getClick(canvas);
  await presentation(ctx, imgPre)
  await title(canvas, ctx, imgTit, objCli, 0);
  while(true){
    n = 0;
    arrNum = new Array();
    arrBub = new Array();
    await selectAlg(canvas, ctx, imgBubs, imgFils, imgPlay, n, arrNum);
    await initPlay(imgBub, n, arrNum, arrBub);
    await playing(canvas, ctx, arrBub, imgBub, 0);
  }
}

mscArmony.addEventListener("ended", function() {
  this.currentTime = 0;
  this.play();
});

main();
