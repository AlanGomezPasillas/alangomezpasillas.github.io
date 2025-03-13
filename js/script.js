let la = navigator.language.substring(0,2);

function checkLanguage(){
  if(la=="es"){
    changeLanguage(1);
  }else{
    document.getElementById('es').style.display='none';
  }
}

function changeLanguage(lan){
  if(lan==1){
    document.getElementById('home').style.display='none';
    document.getElementById('es').style.display='block';
  }else{
    document.getElementById('es').style.display='none';
    document.getElementById('en').style.display='block';
  }
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