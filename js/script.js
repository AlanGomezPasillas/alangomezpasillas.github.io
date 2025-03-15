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
    document.getElementsByClassName('home').item(0).style.display='block';
    document.getElementsByClassName('home').item(1).style.display='block';
  }else{
    document.getElementsByClassName('home').item(0).style.display='none';
    document.getElementsByClassName('home').item(1).style.display='none';
  }
  if(sec==2){
    document.getElementsByClassName('music').item(0).style.display='block';
    document.getElementsByClassName('music').item(1).style.display='block';
  }else{
    document.getElementsByClassName('music').item(0).style.display='none';
    document.getElementsByClassName('music').item(1).style.display='none';
  }
  if(sec==3){
    document.getElementsByClassName('videos').item(0).style.display='block';
    document.getElementsByClassName('videos').item(1).style.display='block';
  }else{
    document.getElementsByClassName('videos').item(0).style.display='none';
    document.getElementsByClassName('videos').item(1).style.display='none';
  }
  if(sec==4){
    document.getElementsByClassName('games').item(0).style.display='block';
    document.getElementsByClassName('games').item(1).style.display='block';
  }else{
    document.getElementsByClassName('games').item(0).style.display='none';
    document.getElementsByClassName('games').item(1).style.display='none';
  }
}