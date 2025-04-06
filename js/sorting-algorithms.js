const SCR_WIDTH = 640;
const SCR_HEIGHT = 480;

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
    this.cspd = speed;
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
  
  draw(ctx){
    ctx.drawImage(this.img, this.px, this.py, this.width, this.height, this.x, this.y, this.width, this.height);
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

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pause(c) {
  if(c.paused){
    await sleep(1);
    await pause(c);
  }
}

function handleMusic(){
  this.currentTime = 0;
  this.play();
}

function handleClick(c, e) {
  var rect = e.currentTarget.getBoundingClientRect();
  if (c.paused) {
    c.paused = false;
  }
  if (c.state == "title") {
    if(isClicked(e.clientX-rect.left, e.clientY-rect.top, 230, 410, 200, 264)) {
      c.clicked = "start";
    }
  } else if (c.state == "select") {
    if(isClicked(e.clientX-rect.left, e.clientY-rect.top, 480, 608, 120, 248)) {
      c.clicked = "play";
    }
  }
}

function handleDrag(e) {
  //e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
}

function handleDrop(file, fr, e) {
  //e.stopPropagation(); 
  e.preventDefault();
  file.txt = e.dataTransfer.files[0];
  fr.readAsText(file.txt);
}

function handleLoad(file, arr, e) {
  file.data = e.target.result.split(/[\r\n]+/).filter(Boolean).join(' ');
  arr.nums = file.data.split(' ').map(Number);
  arr.n = arr.nums.length;
}

function isClicked(px, py, x1, x2, y1, y2) {
  if (px > x1 && px < x2) {
    if (py > y1 && py < y2) {
      return true;
    }
  }
}

async function fade(i, ctx, img, type) {
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(img, 0, 0);
  ctx.globalAlpha = i;
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.globalAlpha = 1;
  if (type == 1) {
    if (i > 0.06) {
      await sleep(50);
      await fade(i-0.05, ctx, img, type);
    }
  } else {
    if (i < 1) {
      await sleep(50);
      await fade(i+0.05, ctx, img, type);
    }
  }
}

async function presentation(ctx, imgPre) {
  await fade(1, ctx, imgPre, 1);
  await sleep(2000);
  await fade(0, ctx, imgPre, 0);
  ctx.fillStyle = "white";
  await sleep(100);
}

async function title(ctx, imgTit, objCli, titY, c) {
  var timeout = 100;
  if (c.clicked == "start" && titY == 0) {
    titY = -0.0001;
  }
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(imgTit, 0, titY);
  if(titY == 0) {
    //ctx.drawImage(objCli.img, objCli.px, objCli.py, objCli.width, objCli.height, objCli.x, objCli.y, objCli.width, objCli.height);
    objCli.draw(ctx);
  } else {
    timeout = 15;
  }
  objCli.update();
  titY += titY;
  if(titY < -880) {
    return sleep(0);
  } else {
    await sleep(timeout);
    await title(ctx, imgTit, objCli, titY, c);
  }
}

async function selectAlg(ctx, imgBubs, imgFils, imgPlay, arr, file, c) {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(imgBubs, 32, 120);
  ctx.drawImage(imgFils, 256, 120);
  ctx.font = "48px Arial";
  ctx.strokeText("Drag and Drop a .txt File: ", 10, 50);
  if (arr.n > 0) {
    ctx.strokeText("Done!", 10, 100);
    ctx.strokeText("Total: " + Number(arr.n), 10, 300);
    if(arr.n < 6) {
      ctx.strokeText('{' + arr.nums + '}', 10, 350);
    } else {
      let head = '{';
      for(let i = 0; i < 6; i++) {
        head += arr.nums[i];
        head += ",";
      }
      head += "...}";
      ctx.strokeText(head, 10, 350);
    }
    ctx.fillStyle = "black";
    ctx.drawImage(imgPlay, 480, 120);
    ctx.fillText("Ready! Press Play to Start", 34, 420);
  }
  //await getClick(canvas, false, 480, 608, 120, 248, checker);
  
  if(c.clicked == "play" && arr.n > 0){
    return;
  }else{
    c.clicked = "none";
    await sleep(1);
    await selectAlg(ctx, imgBubs, imgFils, imgPlay, arr, file, c);
  }
}

async function initPlay(imgBub, arr) {
  const arrSorted = arr.nums.toSorted(function (a, b){return a - b;});
  for(let i = 0; i < arr.n; i++){
    const bub = new Bubble(imgBub, 20, 400/arr.n, i*(400/arr.n)+120, (arr.n-arrSorted.indexOf(arr.nums[i]))*(400/arr.n)+10, arr.nums[i]);
    arrSorted[arrSorted.indexOf(arr.nums[i])] = -123456;
    arr.bubs.push(bub);
  }
}

async function drawGame(ctx, arr, h, j){
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.strokeText("Loop1: " + h, 528, 40);
  ctx.strokeText("Loop2: " + j, 528, 80);
  ctx.strokeText("Speed: " + arr.bubs[0].cspd, 528, 120);
  if(arr.n < 20)ctx.strokeText("Set: {" + arr.nums + '}', 100, 40);
  for(let i = 0; i < arr.n; i++) {
    arr.bubs[i].draw(ctx);
    arr.bubs[i].update();
  }
  for(let i = 0; i < 3; i++){
    arr.btns[i].draw(ctx);
  }
}

async function playing(ctx, arr, h, c) {
  if (h < arr.n-1){
    if(h==0){
      ctx.fillStyle = "white";
      ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
      ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
      ctx.strokeText("Start!", 400, 50);
      for(let i = 0; i < arr.n; i++){
	    arr.bubs[i].draw(ctx);
      }
      await sleep(4000);
    }
    await checking(ctx, arr, h, 0, c);
    if (c.swapped == true) {
      await playing(ctx, arr, h+1, c);
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

async function checking(ctx, arr, h, j, c) {
  drawGame(ctx, arr, h, j);
  if (j < arr.n-1) {
    if (arr.nums[j] > arr.nums[j+1]) {
      arr.bubs[j].upto = false;
      arr.bubs[j+1].upto = false;
      arr.bubs[j].go = arr.bubs[j+1].x;
      arr.bubs[j+1].go = arr.bubs[j].x;
      arr.nums[j+1] = arr.nums[j] ^ arr.nums[j+1];
      arr.nums[j] = arr.nums[j] ^ arr.nums[j+1];
      arr.nums[j+1] = arr.nums[j] ^ arr.nums[j+1];
      await swap(ctx, arr, h, j);
      c.swapped = true;
      //todo wait till click
    } else {
      //sleep(Math.round((1-bubbles[0].speed)*100*500))
    }
    await sleep(1);
    await checking(ctx, arr, h, j+1, c);
  } else {
    return;
  }
}

async function swap(ctx, arr, h, j) {
  drawGame(ctx, arr, h, j);
  if(arr.bubs[j].upto == true && arr.bubs[j+1].upto == true) {
    var bubAux = arr.bubs[j];
    arr.bubs[j] = arr.bubs[j+1];
    arr.bubs[j+1] = bubAux;
    return sleep(0);
  } else {
    await sleep(1);
    await swap(ctx, arr, h, j);
  }
}

async function main() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  
  const imgPre = new Image();
  const imgTit = new Image();
  const imgCli = new Image();
  const imgBubs = new Image();
  const imgFils = new Image();
  const imgPlay = new Image();
  const imgBub = new Image();
  const imgBtns = new Image();
  const fr = new FileReader();
  const mscArmony = new Audio("msc/armonia.wav");
  const objCli = new Sprite(imgCli, 0, 0, 180, 64, 230, 200, 10, 0, 1);
  const objPlay = new Sprite(imgBtns, 0, 0, 96, 96, 2, 64, 2, 0, 0);
  const objStop = new Sprite(imgBtns, 192, 0, 96, 96, 2, 184, 2, 0, 0);
  const objNext = new Sprite(imgBtns, 384, 0, 96, 96, 2, 304, 2, 0, 0);
  const objCheck = {state: "presentation", clicked: "none", paused: true, swapped: true};
  const objArr = {n: 0, nums: new Array(), bubs: new Array(), btns: new Array()};
  const objFile = {txt: undefined, data: undefined};
  
  imgPre.src = "img/sorting-algorithms/presentation.png";
  imgTit.src = "img/sorting-algorithms/title.png";
  imgCli.src = "img/sorting-algorithms/cli-st.png";
  imgBubs.src = "img/sorting-algorithms/bubble-sort.png";
  imgFils.src = "img/sorting-algorithms/file-select.png";
  imgPlay.src = "img/sorting-algorithms/play.png";
  imgBub.src = "img/sorting-algorithms/bub.png";
  imgBtns.src = "img/sorting-algorithms/buttons.png";
  await imgPre.decode();
  await imgTit.decode();
  await imgCli.decode();
  await imgBubs.decode();
  await imgFils.decode();
  await imgPlay.decode();
  await imgBub.decode();
  await imgBtns.decode();

  mscArmony.addEventListener("ended", handleMusic, false);
  canvas.addEventListener("click", (e) => handleClick(objCheck, e), false);
  canvas.addEventListener("dragover", handleDrag, false);
  canvas.addEventListener("drop", (e) => handleDrop(objFile, fr, e), false);
  fr.addEventListener("load", (e) => handleLoad(objFile, objArr, e), false);
  
  objArr.btns.push(objPlay);
  objArr.btns.push(objStop);
  objArr.btns.push(objNext);

  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Click here to start!", 130, 240);
  await pause(objCheck);
  await presentation(ctx, imgPre);
  mscArmony.play();
  objCheck.state = "title";
  await title(ctx, imgTit, objCli, 0, objCheck);
  while(true) {
    objCheck.state = "select";
    objFile.txt = undefined;
    objFile.data = undefined;
    objArr.n = 0;
    objArr.nums = new Array();
    objArr.bubs = new Array();
    await selectAlg(ctx, imgBubs, imgFils, imgPlay, objArr, objFile, objCheck);
    await initPlay(imgBub, objArr);
    objCheck.state = "playing";
    await playing(ctx, objArr, 0, objCheck);
  }
}

main();
