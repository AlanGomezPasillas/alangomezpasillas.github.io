function main(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  const img_pre = new Image();
  img_pre.src = "img/sorting-algorithms/presentation.png";
  img_pre.onload = function() {
    ctx.fillStyle = "black";
    setTimeout(fadeIn, 100, 1, ctx, img_pre);
  };
}

function fadeIn(i, ctx, img_pre){
  ctx.clearRect(0,0,640,480);
  ctx.globalAlpha = 1;
  ctx.drawImage(img_pre, 0, 0);
  ctx.globalAlpha = i;
  ctx.fillRect(0, 0, 640, 480);
  i-=0.05;
  if(i>0)setTimeout(fadeIn, 100, i, ctx, img_pre);
}
  
main();
