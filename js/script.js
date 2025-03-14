let la = (navigator.language.substring(0,2) == "es") ? 1 : 0;

function changeLanguage(lan){
  if(lan == 2){
    if(la){
      document.getElementById("en").style.display='none';
      document.getElementById("es").style.display='block';
    }else{
      document.getElementById("es").style.display='none';
      document.getElementById("en").style.display='block';
    }
    changeSection(1)
  }else{
    la = lan;
    if(la){
      document.getElementById("en").style.display='none';
      document.getElementById("es").style.display='block';
    }else{
      document.getElementById("es").style.display='none';
      document.getElementById("en").style.display='block';
    }
  }
}

function changeSection(sec){
  if(sec==1){
    document.getElementsByClassName('home').item(la).style.display='block';
  }else{
    document.getElementsByClassName('home').item(la).style.display='none';
  }
  if(sec==2){
    document.getElementsByClassName('music').item(la).style.display='block';
  }else{
    document.getElementsByClassName('music').item(la).style.display='none';
  }
  if(sec==3){
    document.getElementsByClassName('videos').item(la).style.display='block';
  }else{
    document.getElementsByClassName('videos').item(la).style.display='none';
  }
  if(sec==4){
    document.getElementsByClassName('games').item(la).style.display='block';
  }else{
    document.getElementsByClassName('games').item(la).style.display='none';
  }
}