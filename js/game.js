function loadGame(){
  changeLanguage(2);
  const game = new URLSearchParams(window.location.search).get('game');
  const name = getName(game, 0);
  const name2 = getName(game, 1);
  const desc = getDesc(game, 0);
  const desc2 = getName(game, 1);
  document.querySelector('title').innerText = name;
  document.getElementById('title').innerHTML = 
    `<h2>
      <span class="en">${name}</span>
      <span class="es">${name2}</span>
    </h2>
    <p>
      <span class="en">
        ${desc}
      </span>
      <span class="es">
        ${desc2}
      </span>
    </p>`;
}
