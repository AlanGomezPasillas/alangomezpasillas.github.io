function main(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  const img_pre = new Image();
  img_pre.src = "img/sorting-algorithms/presentation.png";
  img.onload = function() {
    ctx.drawImage(img_pre, 0, 0);
    //ctx.fillStyle = "blue";
    //ctx.fillRect(0, 0, 640, 480); 
  };
}
