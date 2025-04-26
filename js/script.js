let la = (navigator.language.substring(0,2) == "es") ? 1 : 0;

function displayClass(elems, att) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].style.display = att;
  }
}

function changeLanguage(lan){
  if (lan != 2) la = lan;
  if (!la) {
    displayClass(document.getElementsByClassName("en"), 'block');
    displayClass(document.getElementsByClassName("es"), 'none');
  } else {
    displayClass(document.getElementsByClassName("en"), 'none');
    displayClass(document.getElementsByClassName("es"), 'block');
  }
}

function changeSection(sec) {
  if (sec == 1) {
    document.getElementById('home').style.display='block';
  } else {
    document.getElementById('home').style.display='none';
  }
  if (sec == 2) {
    document.getElementById('music').style.display='block';
  } else {
    document.getElementById('music').style.display='none';
  }
  if (sec == 3) {
    document.getElementById('videos').style.display='block';
  } else {
    document.getElementById('videos').style.display='none';
  }
  if (sec == 4) {
    document.getElementById('games').style.display='block';
  } else {
    document.getElementById('games').style.display='none';
  }
}
