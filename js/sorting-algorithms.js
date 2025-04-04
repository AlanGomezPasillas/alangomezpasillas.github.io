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

function handleClick(e){
  console.log(e.currentTarget.msg);
  console.log("Entro");
  console.log(e.clientX);
}

async function getClick(canvas, loop = true, x1 = 0, x2 = SCR_WIDTH, y1 = 0, y2 = SCR_HEIGHT, c = {clicked: false}){
  canvas.addEventListener("click", (e) => {
    var rect = canvas.getBoundingClientRect();
    if (e.clientX-rect.left > x1 && e.clientX-rect.left < x2) {
      if (e.clientY-rect.top > y1 && e.clientY-rect.top < y2) {
    	c.clicked = true;
        console.log(c.clicked + ' ' + x2);
      }
    }
  }, false);
  
  if (c.clicked) { 
    return true;
  } else if (loop) {
    await sleep(100);
    await getClick(canvas, loop, x1, x2, y1, y2, c);
  } else {
    return false;
  }
}

async function fade(i, ctx, img, type){
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

async function presentation(ctx, imgPre){
  await fade(1, ctx, imgPre, 1);
  await sleep(2000);
  await fade(0, ctx, imgPre, 0);
  ctx.fillStyle = "white";
  await sleep(100);
  mscArmony.play();
}

async function title(canvas, ctx, imgTit, objCli, titY, checker = {clicked: false}){
  var timeout = 100;
  await getClick(canvas, false, 230, 410, 200, 264, checker);
  if (checker.clicked && titY == 0) {
    titY = -0.0001;
  }
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(imgTit, 0, titY);
  //ctx.fillText("TitY = " + titY, 100, 100);
  //ctx.fillText("clicked = " + checker.clicked, 100, 200);
  if(titY == 0) {
    ctx.drawImage(objCli.img, objCli.px, objCli.py, objCli.width, objCli.height, objCli.x, objCli.y, objCli.width, objCli.height);
  } else {
    timeout = 15;
  }
  objCli.update();
  titY += titY;
     //titY = -0.0001;
  if(titY < -880) {
    return sleep(0);
  } else {
    await sleep(timeout);
    await title(canvas, ctx, imgTit, objCli, titY, checker);
  }
}

async function selectAlg(canvas, ctx, imgBubs, imgFils, imgPlay, n, arr, file, checker = {clicked: false}) {
  const fr = new FileReader();
  //console.log("File: " + file + "Data: " + data);
  //console.log("n: " + n + "arrNum: " + arrNum);
  canvas.addEventListener("dragover", (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, false);
  canvas.addEventListener("drop", (e) => {
    e.stopPropagation();
    e.preventDefault();
    file.txt = e.dataTransfer.files[0];
  }, false);
  fr.addEventListener("load", (e) => {
    file.data = e.target.result.split(/[\r\n]+/).filter(Boolean).join(' ');
    //numberss = data.split(' ');
    //n = numberss[0];
    //numberss.shift();
    arr.nums = file.data.split(' ').map(Number);
    n.val = arr.nums.length;
  }, false);
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.drawImage(imgBubs, 32, 120);
  ctx.drawImage(imgFils, 256, 120);
  ctx.font = "48px Arial";
  ctx.strokeText("Drag and Drop a .txt File: ", 10, 50);
  if(file.txt != undefined) fr.readAsText(file.txt);
  if(n.val > 0) {
    ctx.strokeText("Done!", 10, 100);
    ctx.strokeText("Total: " + Number(n.val), 10, 300);
    if(n.val < 6) {
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
  await getClick(canvas, false, 480, 608, 120, 248, checker);
  if(checker.clicked && n.val > 0){
    return sleep(0);
  }else{
    await sleep(10);
    await selectAlg(canvas, ctx, imgBubs, imgFils, imgPlay, n, arr, file, checker);
  }
}

async function initPlay(imgBub, n, arr){
  const arrSorted = arr.nums.toSorted(function (a, b){return a - b;});
  for(let i = 0; i < n; i++){
    const bub = new Bubble(imgBub, 20, 400/n, i*(400/n)+120, (n-arrSorted.indexOf(arr.nums[i]))*(400/n)+10, arr.nums[i]);
    arrSorted[arrSorted.indexOf(arr.nums[i])]=-123456;
    arr.bubs.push(bub);
  }
}

async function playing(canvas, ctx, n, arr, h = 0){
  let checker = {swapped: false};
  if (h < n-1){
    if(h==0){
      ctx.fillStyle = "white";
      ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
      ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
      ctx.strokeText("Start!", 400, 50);
      for(let i = 0; i < n; i++){
	    arr.bubs[i].draw(ctx);
      }
      await sleep(4000);
    }
    await checking(canvas, ctx, n, arr, h, 0, checker);
    if(checker.swapped == true) {
      await playing(canvas, ctx, n, arr, h+1);
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

async function checking(canvas, ctx, n, arr, h, j, c) {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.strokeText("Loop1: " + h, 528, 40);
  ctx.strokeText("Loop2: " + j, 528, 80);
  ctx.strokeText("Speed: " + arr.bubs[0].cspd, 528, 120);
  if(n < 20)ctx.strokeText("Set: {" + arr.nums + '}', 100, 40);
  for(let i = 0; i < n; i++) {
    arr.bubs[i].draw(ctx);
  }
  if (j < n-1) {
    if (arr.nums[j] > arr.nums[j+1]) {
      arr.bubs[j].upto = false;
      arr.bubs[j+1].upto = false;
      arr.bubs[j].go = arr.bubs[j+1].x;
      arr.bubs[j+1].go = arr.bubs[j].x;
      arr.nums[j+1] = arr.nums[j] ^ arr.nums[j+1];
      arr.nums[j] = arr.nums[j] ^ arr.nums[j+1];
      arr.nums[j+1] = arr.nums[j] ^ arr.nums[j+1];
      await swap(canvas, ctx, n, arr, h, j);
      c.swapped = true;
      await getClick(canvas);
    } else {
      //sleep(Math.round((1-bubbles[0].speed)*100*500))
    }
    await sleep(1);
    await checking(canvas, ctx, n, arr, h, j+1, c);
  } else {
    return sleep(0);
  }
}

async function swap(canvas, ctx, n, arr, h, j){
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.strokeText("Loop1: " + h, 528, 40);
  ctx.strokeText("Loop2: " + j, 528, 80);
  ctx.strokeText("Speed: " + arr.bubs[0].cspd, 528, 120);
  if(n<20)ctx.strokeText("Set: {" + arr.nums + '}', 100, 40);
  for(let i = 0; i < n; i++){
    arr.bubs[i].draw(ctx);
    arr.bubs[i].update();
  }
  if(arr.bubs[j].upto == true && arr.bubs[j+1].upto == true) {
    var bubAux = arr.bubs[j];
    arr.bubs[j] = arr.bubs[j+1];
    arr.bubs[j+1] = bubAux;
    return sleep(0);
  } else {
    await sleep(1);
    await swap(canvas, ctx, n, arr, h, j);
  }
}

async function main() {
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  
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
  const objArr = {nums: new Array(), bubs: new Array()};
  const objFile = {txt: undefined, data: undefined};
  
  const msg = "Hola";
  canvas.addEventListener("click", handleClick, false);
  
  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Click here to start!", 130, 240);
  await getClick(canvas);
  await presentation(ctx, imgPre);
  await title(canvas, ctx, imgTit, objCli, 0);
  while(true){
    let n = {val: 0};
    objFile.txt = undefined;
    objFile.data = undefined;
    objArr.nums = new Array();
    objArr.bubs = new Array();
    await selectAlg(canvas, ctx, imgBubs, imgFils, imgPlay, n, objArr, objFile);
    await initPlay(imgBub, Number(n.val), objArr);
    await playing(canvas, ctx, Number(n.val), objArr);
  }
}

mscArmony.addEventListener("ended", function() {
  this.currentTime = 0;
  this.play();
}, false);

main();
