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

function main(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  const img_pre = new Image();
  const img_tit = new Image();
  const img_cli = new Image();
  img_pre.src = "img/sorting-algorithms/presentation.png";
  img_tit.src = "img/sorting-algorithms/title.png";
  img_cli.src = "img/sorting-algorithms/cli-st.png";
  img_cli.onload = function() {
    ctx.fillStyle = "black";
    setTimeout(fade, 100, 1, ctx, img_pre, 1);
    setTimeout(fade, 4000, 0, ctx, img_pre, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    const obj_cli = new Sprite(img_cli, 0, 0, 180, 64, 230, 200, 10, 0);
    setTimeout(title, 6000, canvas, ctx, img_tit, obj_cli);
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
    if(i>0.01)setTimeout(fade, 100, i, ctx, img_pre, type);
  }else{
    i+=0.05;
    if(i<1.01)setTimeout(fade, 100, i, ctx, img_pre, type);
  }
}

function title(canvas, ctx, img_tit, obj_cli){
  ctx.clearRect(0,0,640,480);
  ctx.fillRect(0, 0, 640, 480);
  ctx.drawImage(img_tit, 0, 0);
  ctx.drawImage(obj_cli.img, obj_cli.px, obj_cli.py, obj_cli.width, obj_cli.height, obj_cli.x, obj_cli.y, obj_cli.width, obj_cli.height);
  obj_cli.update();
  /*var audio = new Audio('audio_file.mp3');
  audio.play();*/
  canvas.addEventListener("click", (e) => {
  if (e.clientX > 230 && e.clientY > 200) {
    break;
  }
});
  setTimeout(title, 100, ctx, img_tit, obj_cli);
}

main();
