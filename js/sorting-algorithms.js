const SCR_WIDTH = 640;
const SCR_HEIGHT = 480;

class Bubble {
  constructor(image, image2, speed, sizex, sizey, x, y, num, tdis){
    this.img = image;
    this.img2 = image2;
    this.spd = 1-(speed*0.01);
    this.sizex = sizex;
    this.sizey = sizey;	
    this.x = x;
    this.y = y;
    this.num = num;
    this.go = x;
    this.upto = true;
    this.cspd = speed;
    this.tdis = tdis;
  }

  setSpd(s){
    this.cspd = s;
    this.spd = 1-(s*0.01);
  }

  draw(ctx){
    ctx.fillStyle = "white";
    if (this.upto == false) {
      ctx.drawImage(this.img2, 0, 0, 400, 400, this.x, this.y, this.sizex, this.sizey);
    }
    else ctx.drawImage(this.img, 0, 0, 400, 400, this.x, this.y, this.sizex, this.sizey);
    ctx.fillText(this.num, this.x+(this.sizex/2), this.y+(this.sizey/1.5));
    ctx.strokeText(this.num, this.x+(this.sizex/2), this.y+(this.sizey/1.5));
  }

  update(){
    var distance = this.x-this.go;
    var velocity = distance-(distance*this.spd);
    if (Math.round(this.x) < Math.round(this.go)) {
      this.x -= velocity;
      if (this.img.src == "https://alangomezpasillas.github.io/img/sorting-algorithms/cube.png") {
	this.y = Math.sqrt((Math.pow(this.sizex,2)*0.25)-Math.pow((this.sizex+distance)-(this.sizex*0.5),2))*5+228;
        console.log(this.y);
      }
    } else if(Math.round(this.x) > Math.round(this.go)) {
      this.x -= velocity;
      if (this.img.src == "https://alangomezpasillas.github.io/img/sorting-algorithms/cube.png") {
	this.y = -Math.sqrt((Math.pow(this.sizex,2)*0.25)-Math.pow((this.sizex-distance)-(this.sizex*0.5),2))*5+228;
      }
    } else {
      this.x = Math.round(this.x);
      this.upto = true;
      this.go = this.x;
      if (this.tdis != 0){
        this.y = 228;
      }
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
    ctx.drawImage(this.img, this.px+(this.width*this.fIdx), this.py, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  update(){
    if(this.fIdx < this.nFrames-1) {
      this.fIdx += Math.floor(this.spd);
    } else {
      this.fIdx = 0;
    }
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

function isClicked(px, py, x1, x2, y1, y2, rect) {
  const rx = rect.width/SCR_WIDTH;
  const ry = rect.height/SCR_HEIGHT;
  const x1r = x1 * rx;
  const x2r = x2 * rx;
  const y1r = y1 * ry;
  const y2r = y2 * ry;
  console.log(px, py, x1r, x2r, y1r, y2r);
  if (px > x1r && px < x2r) {
    if (py > y1r && py < y2r) {
      return true;
    }
  }
}

function handleClick(c, e) {
  var rect = e.currentTarget.getBoundingClientRect();
  if (c.state == "presentation" || c.state == "done") {
    if (c.paused) {
      c.paused = false;
    }
  }
  if (c.state == "title") {
    //if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 230, 410, 200, 264)) {
    if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 230, 410, 200, 264, rect)) {
      c.clicked = "start";
    }
  } else if (c.state == "select") {
    if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 66, 194, 120, 248, rect)) {
      if (c.alg == "bubble") {
	c.alg = "select";
      } else if (c.alg == "select") {
        c.alg = "insert";
      } else if (c.alg == "insert") {
	c.alg = "bubble";
      }
    } else if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 480, 608, 120, 248, rect)) {
      c.clicked = "play";
    } else if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 256, 384, 120, 248, rect)) {
      if (c.method == "random") {
	c.method = "file";
      } else {
	c.method = "random";
      }
    } else if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 160, 192, 267, 299, rect)) {
      c.clicked = "less";
    } else if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 300, 332, 267, 299, rect)) {
      c.clicked = "more";
    }
  } else if (c.state == "playing") {
    if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 2, 98, 64, 160, rect)) {
      c.paused = false;
      c.clicked = "resume";
      console.log("resume");
    } else if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 2, 98, 184, 280, rect)) {
      c.paused = true;
      c.clicked = "pause";
      console.log("pause");
    } else if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 2, 98, 304, 400, rect)) {
      c.paused = false;
      c.clicked = "next";
      console.log("next");
    } else if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 530, 726, 153, 185, rect)) {
      c.paused = false;
      c.clicked = "more-speed";
      console.log("speed++");
    } else if (isClicked(e.clientX-rect.left, e.clientY-rect.top, 530, 726, 225, 257, rect)) {
      c.paused = false;
      c.clicked = "less-speed";
      console.log("speed--");
    }
  }
}

function handleDrag(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
}

function handleDrop(file, fr, e) {
  e.preventDefault();
  file.txt = e.dataTransfer.files[0];
  fr.readAsText(file.txt);
}

function handleLoad(file, arr, e) {
  file.data = e.target.result.split(/[\r\n]+/).filter(Boolean).join(' ');
  arr.nums = file.data.split(' ').map(Number);
  arr.n = arr.nums.length;
}

function handleMusic(){
  this.currentTime = 0;
  this.play();
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

async function selectAlg(ctx, imgBubs, imgSele, imgInse, imgFils, imgRand, imgPlay, imgLeft, imgRight, arr, file, c, n = 10, change = true) {
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.font = "48px Arial";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  if (c.alg == "bubble"){
    ctx.drawImage(imgBubs, 66, 120);
  } else if (c.alg == "select") {
    ctx.drawImage(imgSele, 66, 120);
  } else if (c.alg == "insert") {
    ctx.drawImage(imgInse, 66, 120);
  }
  if (c.method == "file") {
    ctx.drawImage(imgFils, 256, 120);
    ctx.strokeText("Drag and Drop a .txt File: ", 10, 50);
  } else {
    ctx.drawImage(imgRand, 256, 120);
    ctx.strokeText("Pick an amount of numbers: ", 10, 50);
  }
  if (change) {
    await getRandomNums(arr, n);
    change = false;
  }
  if (arr.n > 0 || c.method == "random") {
    ctx.strokeText("Done!", 10, 100);
    if (c.method == "file") {
      ctx.strokeText("Total: " + Number(arr.n), 10, 300);
      if(arr.n < 6 ) {
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
    } else {
      ctx.drawImage(imgLeft, 160, 267);
      ctx.drawImage(imgRight, 300, 267);
      ctx.strokeText("Total:      " + Number(n), 10, 300);
      let head = '{';
      for(let i = 0; i < 6; i++) {
	head += arr.nums2[i];
	head += ",";
      }
      head += "...}";
      ctx.strokeText(head, 10, 350);
    }
    ctx.fillStyle = "black";
    ctx.drawImage(imgPlay, 480, 120);
    ctx.fillText("Ready! Press Play to Start", 34, 420);
  }
  if (c.method == "random") {
    if (c.clicked == "less") {
      if (n > 10) {
	n -= 10;
	change = true;
      }
    }
    if (c.clicked == "more") {
      if (n < 100) {
	n += 10;
	change = true;
      }
    }
  }
  if (c.clicked == "play" && (arr.n > 0 || c.method == "random")) {
    if (c.method == "random") {
      arr.n = n;
      arr.nums = arr.nums2;
    }
    return;
  } else {
    c.clicked = "none";
    await sleep(1);
    await selectAlg(ctx, imgBubs, imgSele, imgInse, imgFils, imgRand, imgPlay, imgLeft, imgRight, arr, file, c, n, change);
  }
}

async function getRandomNums(arr, n) {
  const myarr = new Array();
  for (let i = 0; i < n; i++) {
    myarr.push(Math.floor(Math.random() * 100));
  }
  arr.nums2 = myarr;
}

async function initPlay(imgBub, imgBub2, imgForu, imgForu2, imgCube, imgCube2, arr, c) {
  const arrSorted = arr.nums.toSorted(function (a, b){return a - b;});
  var bub;
  var sizex = 400/arr.n;
  for(let i = 0; i < arr.n; i++){
    if (c.alg == "bubble") {
      bub = new Bubble(imgBub, imgBub2, arr.spds[arr.si], sizex, sizex, i*sizex+120, (arr.n-arrSorted.indexOf(arr.nums[i]))*sizex+10, arr.nums[i], 0);
    } else if (c.alg == "select") {
      bub = new Bubble(imgForu, imgForu2, arr.spds[arr.si], sizex, -sizex-arrSorted.indexOf(arr.nums[i])*sizex, i*sizex+120, arr.n*sizex+40, arr.nums[i], 0);
    } else if (c.alg == "insert") {
      bub = new Bubble(imgCube, imgCube2, arr.spds[arr.si], sizex, sizex, i*sizex+100+(sizex), 228, arr.nums[i], sizex*0.5);
      c.swapped = false;
    }
    if (c.alg != "select") arrSorted[arrSorted.indexOf(arr.nums[i])] = -123456;
    arr.bubs.push(bub);
  }
}

async function drawGame(ctx, arr, h, j){
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.fillRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.strokeText("Loop1: " + h, 528, 40);
  if (arr.min == -1) {
    ctx.strokeText("Loop2: " + j, 528, 80);
  } else {
    ctx.strokeText("Min: " + arr.min, 528, 80);
  }
  ctx.strokeText("Speed: " + arr.bubs[0].cspd, 528, 210);
  if (arr.n < 20) ctx.strokeText("Set: {" + arr.nums + '}', 100, 40);
  ctx.textAlign = "center";
  for(let i = 0; i < arr.n; i++) {
    arr.bubs[i].draw(ctx);
    if (arr.btns[1].fIdx == 0){
      arr.bubs[i].update();
    }
    arr.bubs[i].setSpd(arr.spds[arr.si]);
  }
  for(let i = 0; i < arr.btns.length; i++){
    arr.btns[i].draw(ctx);
  }
}

async function adjustSpeed(ctx, arr, h, j, c){
  while (c.clicked == "pause"){
    arr.btns[0].fIdx = 0;
    arr.btns[1].fIdx = 1;
    arr.btns[2].fIdx = 0;
    await drawGame(ctx, arr, h, j);
    await pause(c);
    if (c.clicked == "more-speed") {
      if (arr.si < 10) {
	arr.btns[3].fIdx = 1;
	arr.si++;
      }
      c.clicked = "pause";
      c.paused = true;
    }
    if (c.clicked == "less-speed") {
      if (arr.si > 0) {
	arr.btns[4].fIdx = 1;
	arr.si--;
      }
      c.clicked = "pause";
      c.paused = true;
    }
    await drawGame(ctx, arr, h, j);
    await sleep(50);
    arr.btns[3].fIdx = 0;
    arr.btns[4].fIdx = 0;
    await drawGame(ctx, arr, h, j);
  }
}

async function playing(ctx, arr, h, c) {
  if(h==0){
    arr.btns[0].fIdx = 0;
    arr.btns[1].fIdx = 1;
    arr.btns[2].fIdx = 0;
    await drawGame(ctx, arr, h, 0);
  }
  if (c.alg == "insert") {
    h++;
    if (h < arr.n) {
      await sleep(1);
      await checking(ctx, arr, h, h, c);
      await sleep(1);
      await playing(ctx, arr, h, c);
    }
  } else if (c.alg == "select") {
    if (h < arr.n-1){
      arr.min = h;
      await checking(ctx, arr, h, h+1, c);
      if (arr.min != h) {
	await initSwap(arr, arr.min, h);
	await adjustSpeed(ctx, arr, h, 0, c);
	await animBtns(arr, c);
	await swap(ctx, arr, h, arr.min, arr.min, h);
      }
      await sleep(1);
      await playing(ctx, arr, h+1, c);
    }
  } else if (c.swapped == true) {
    c.swapped = false;
    if (h < arr.n-1) {
      await sleep(1);
      await checking(ctx, arr, h, 0, c);
    }
    await sleep(1);
    await playing(ctx, arr, h+1, c);
  }
  await drawGame(ctx, arr, h, h);
}

async function checking(ctx, arr, h, j, c) {
  if (c.alg == "insert") {
   if(j > 0 && (arr.nums[j-1] > arr.nums[j])){ 
      await initSwap(arr, j-1, j);
      await adjustSpeed(ctx, arr, h, j, c);
      await animBtns(arr, c);
      await swap(ctx, arr, h, j, j-1, j);
      await sleep(1);
      await checking(ctx, arr, j-1, j-1, c);
    }
  } else if (c.alg == "select") {
    if (j < arr.n) {
      if (arr.nums[j] < arr.nums[arr.min]) {
	    arr.min = j;
      }
      await sleep(1);
      await checking(ctx, arr, h, j+1, c);
    }
  } else if (j < arr.n-1) {
    if (arr.nums[j] > arr.nums[j+1]) {
      await initSwap(arr, j, j+1);
      await adjustSpeed(ctx, arr, h, j, c);
      await animBtns(arr, c);
      await swap(ctx, arr, h, j, j, j+1);
      c.swapped = true;
    }
    await sleep(1);
    await checking(ctx, arr, h, j+1, c);
  } else {
    return;
  }
}

async function initSwap(arr, a, b){
  arr.bubs[a].upto = false;
  arr.bubs[b].upto = false;
  arr.bubs[a].go = arr.bubs[b].x;
  arr.bubs[b].go = arr.bubs[a].x;
  arr.nums[b] = arr.nums[a] ^ arr.nums[b];
  arr.nums[a] = arr.nums[a] ^ arr.nums[b];
  arr.nums[b] = arr.nums[a] ^ arr.nums[b];
}

async function animBtns(arr, c){
  if (c.clicked == "next") {
    arr.btns[1].fIdx = 0;
    arr.btns[2].fIdx = 1;
    c.paused = true;
    c.clicked = "pause";
  } else {
    arr.btns[0].fIdx = 1;
    arr.btns[1].fIdx = 0;
    arr.btns[2].fIdx = 0;
  }
}

async function swap(ctx, arr, h, j, a, b) {
  await drawGame(ctx, arr, h, j);
  if(arr.bubs[a].upto == true && arr.bubs[b].upto == true) {
    var bubAux = arr.bubs[a];
    arr.bubs[a] = arr.bubs[b];
    arr.bubs[b] = bubAux;
    return sleep(0);
  } else {
    await sleep(1);
    await swap(ctx, arr, h, j, a, b);
  }
}

async function main() {
  const canvas = document.getElementById('game');
  const path = "img/sorting-algorithms/";
  const ctx = canvas.getContext('2d');
 
  const imgPre = new Image();
  const imgTit = new Image();
  const imgCli = new Image();
  const imgBubs = new Image();
  const imgFils = new Image();
  const imgPlay = new Image();
  const imgBub = new Image();
  const imgBub2 = new Image();
  const imgBtns = new Image();
  const imgArws = new Image();
  const imgSele = new Image();
  const imgForu = new Image();
  const imgCube = new Image();
  const imgForu2 = new Image();
  const imgCube2 = new Image();
  const imgRand = new Image();
  const imgInse = new Image();
  const imgLeft = new Image();
  const imgRight = new Image();
  const fr = new FileReader();
  const mscArmony = new Audio("msc/armonia.wav");
  const objCli = new Sprite(imgCli, 0, 0, 180, 64, 230, 200, 10, 0, 1);
  const objPlay = new Sprite(imgBtns, 0, 0, 96, 96, 2, 64, 2, 0, 0);
  const objStop = new Sprite(imgBtns, 192, 0, 96, 96, 2, 184, 2, 0, 0);
  const objNext = new Sprite(imgBtns, 384, 0, 96, 96, 2, 304, 2, 0, 0);
  const objMoreSpd = new Sprite(imgArws, 0, 0, 96, 32, 530, 153, 2, 0, 0);  
  const objLessSpd = new Sprite(imgArws, 192, 0, 96, 32, 530, 225, 2, 0, 0);  
  const objCheck = {state: "presentation", clicked: "none", paused: true, alg: "bubble", swapped: true, method: "random"};
  const objArr = {n: 0, si: 2, min: -1, nums: new Array(), nums2: new Array(), bubs: new Array(), btns: new Array(), spds: new Array()};
  const objFile = {txt: undefined, data: undefined};
  
  imgPre.src = path + "presentation.png";
  imgTit.src = path + "title.png";
  imgCli.src = path + "cli-st.png";
  imgBubs.src = path + "bubble-sort.png";
  imgFils.src = path + "file-select.png";
  imgPlay.src = path + "play.png";
  imgBub.src = path + "bub.png";
  imgBub2.src = path + "bub2.png";
  imgBtns.src = path + "buttons.png";
  imgArws.src = path + "arrows.png";
  imgSele.src = path + "select-sort.png";
  imgForu.src = path + "forundin.png";
  imgForu2.src = path + "forundin2.png";
  imgCube.src = path + "cube.png";
  imgCube2.src = path + "cube2.png";
  imgInse.src = path + "insert-sort.png";
  imgRand.src = path + "random.png";
  imgLeft.src = path + "left.png";
  imgRight.src = path + "right.png";

  await imgPre.decode();
  await imgTit.decode();
  await imgCli.decode();
  await imgBubs.decode();
  await imgFils.decode();
  await imgPlay.decode();
  await imgBub.decode();
  await imgBub2.decode();
  await imgBtns.decode();
  await imgArws.decode();
  await imgSele.decode();
  await imgForu.decode();
  await imgForu2.decode();
  await imgCube.decode();
  await imgCube2.decode();
  await imgInse.decode();
  await imgRand.decode();
  await imgLeft.decode();
  await imgRight.decode();

  mscArmony.addEventListener("ended", handleMusic, false);
  canvas.addEventListener("click", (e) => handleClick(objCheck, e), false);
  canvas.addEventListener("dragover", handleDrag, false);
  canvas.addEventListener("drop", (e) => handleDrop(objFile, fr, e), false);
  fr.addEventListener("load", (e) => handleLoad(objFile, objArr, e), false);
  
  objArr.btns.push(objPlay);
  objArr.btns.push(objStop);
  objArr.btns.push(objNext);
  objArr.btns.push(objMoreSpd);
  objArr.btns.push(objLessSpd);
  objArr.spds = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

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
    objCheck.swapped = true;
    objFile.txt = undefined;
    objFile.data = undefined;
    objArr.n = 0;
    objArr.min = -1;
    objArr.nums = new Array();
    objArr.bubs = new Array();
    await selectAlg(ctx, imgBubs, imgSele, imgInse, imgFils, imgRand, imgPlay, imgLeft, imgRight, objArr, objFile, objCheck);
    await initPlay(imgBub, imgBub2, imgForu, imgForu2, imgCube, imgCube2, objArr, objCheck);
    objCheck.state = "playing";
    objCheck.paused = true;
    objCheck.clicked = "pause";
    await playing(ctx, objArr, 0, objCheck);
    objCheck.state = "done";
    ctx.textAlign = "left";
    ctx.font = "32px Arial";
    ctx.strokeText("Done!", 528, 400);
    objCheck.paused = true;
    await pause(objCheck);
  }
}

main();
