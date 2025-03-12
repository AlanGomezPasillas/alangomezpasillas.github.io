document.getElementById("home").innerHTML += '${navigator.language}';
function checkLanguage(){
  let langu = navigator.language;
  
}

function changeSection(sec){
  if(sec==1){
    document.getElementById('home').style.display='block';
  }else{
    document.getElementById('home').style.display='none';
  }
  if(sec==2){
    document.getElementById('music').style.display='block';
  }else{
    document.getElementById('music').style.display='none';
  }
  if(sec==3){
    document.getElementById('videos').style.display='block';
  }else{
    document.getElementById('videos').style.display='none';
  }
  if(sec==4){
    document.getElementById('games').style.display='block';
  }else{
    document.getElementById('games').style.display='none';
  }
}