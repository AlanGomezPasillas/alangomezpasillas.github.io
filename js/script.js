let la = navigator.language.substring(0,2);

function checkLanguage(){
  if(la=="es"){
    changeLanguage(1);
  }else{
    changeLanguage(0);
  }
}

function changeLanguage(lan){
  if(lan==1){
    document.getElementById("en").style.display='none';
    document.getElementById("es").style.display='block';
  }else{
    document.getElementById("es").style.display='none';
    document.getElementById("en").style.display='block';
  }
  changeSection(1)
}

function changeSection(sec){
  if(sec==1){
    document.getElementsByClassName('home').item(1).style.display='block';
  }else{
    document.getElementsByClassName('home').item(1).style.display='none';
  }
  if(sec==2){
    document.getElementsByClassName('music').item(1).style.display='block';
  }else{
    document.getElementsByClassName('music').item(1).style.display='none';
  }
  /*if(sec==3){
    document.getElementsById('videos').style.display='block';
  }else{
    document.getElementsById('videos').style.display='none';
  }
  if(sec==4){
    document.getElementById('games').style.display='block';
  }else{
    document.getElementById('games').style.display='none';
  }*/
}