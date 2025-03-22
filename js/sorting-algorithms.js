class Sprite {
  constructor(img, nFrames, width, height, px, py, x, y) {
    this.img = img;
    this.nFrames = nFrames;
    this.width = width;
    this.height = height;
    this.px = px;
    this.py = py;
    this.x = x;
    this.y = y;
  }
}

function main(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  const img_pre = new Image();
  const img_tit = new Image();
  const img_cli = new Image();
  img_pre.src = "img/sorting-algorithms/presentation.png";
  img_tit.src = "img/sorting-algorithms/title.png";
  img_cli.src = "img/sorting-algorithms/click.png";
  img_cli.onload = function() {
    const obj_cli = new Sprite(img_cli, 10, 180, 64, 0, 0, 230, 200);
  }
  img_pre.onload = function() {
    ctx.fillStyle = "black";
    setTimeout(fade, 100, 1, ctx, img_pre, 1);
    setTimeout(fade, 4000, 0, ctx, img_pre, 0);
    ctx.globalAlpha = 1;
    setTimeout(title, 6000, ctx, img_tit, obj_cli);
  };
}

function fade(i, ctx, img_pre, type){
  ctx.clearRect(0,0,640,480);
  ctx.globalAlpha = 1;
  ctx.drawImage(img_pre, 0, 0);
  ctx.globalAlpha = i;
  ctx.fillRect(0, 0, 640, 480);
  if(type == 1){
    i-=0.05;
    if(i>0)setTimeout(fade, 100, i, ctx, img_pre, type);
  }else{
    i+=0.05;
    if(i<1)setTimeout(fade, 100, i, ctx, img_pre, type);
  }
}

function title(ctx, img_tit, obj_cli){
  ctx.clearRect(0,0,640,480);
  ctx.drawImage(img_tit, 0, 0);
  ctx.drawImage(obj_cli.img, obj_cli.px, obj_cli.py, obj_cli.width, obj_cli.height, obj_cli.x, obj_cli.y);
  /*var audio = new Audio('audio_file.mp3');
  audio.play();*/
  setTimeout(title, 10, ctx, img_tit, obj_cli);
}

main();
