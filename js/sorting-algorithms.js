function main(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  const img_pre = new Image();
  img_pre.src = "img/sorting-algorithms/presentation.png";
  img_pre.onload = function() {
    for(let i=1; i>0; i-=0.05){
      ctx.clearRect(0,0,640,480);
      ctx.globalAlpha = 1;
      ctx.drawImage(img_pre, 0, 0);
      ctx.globalAlpha = i;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 640, 480);
    }
  };
}

main();
