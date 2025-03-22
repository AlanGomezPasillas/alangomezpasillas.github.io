function main(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  const img_pre = new Image();
  const img_tit = new Image();
  img_pre.src = "img/sorting-algorithms/presentation.png";
  img_tit.src = "img/sorting-algorithms/title.png";
  img_pre.onload = function() {
    ctx.fillStyle = "black";
    setTimeout(fade, 100, 1, ctx, img_pre, 1);
    setTimeout(fade, 4000, 0, ctx, img_pre, 0);
  };
  ctx.globalAlpha = 1;
  setTimeout(title, 10, ctx, img_tit);
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

function title(ctx, img_tit){
  ctx.clearRect(0,0,640,480);
  ctx.drawImage(img_tit, 0, 0);
}

main();
