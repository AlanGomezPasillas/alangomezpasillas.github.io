class Game {
  constructor(){
    this.url = new URLSearchParams(window.location.search).get('game');
    this.name = getAttr(this.url, "name");
    this.desc = getAttr(this.url, "desc")
    this.cont = getAttr(this.url, "cont")
    this.magic = getAttr(this.url, "magic")
  }
}

function loadGame() {
  const title = document.querySelector('title');
  const descr = document.getElementById('title');
  const contr = document.getElementById('controls');
  const screen = document.getElementById('scr');
  title.innerText = myGame.name;
  descr.innerHTML = 
    `<h2>
      <span class="en">${myGame.name}</span>
      <span class="es">${myGame.name}</span>
    </h2>
    <p>
      <span class="en">
        ${myGame.desc}
      </span>
      <span class="es">
        ${myGame.desc}
      </span>
    </p>`;
  contr.innerHTML = 
    `<h2>
      <span class="en">Controls</span>
      <span class="es">Controles</span>
    </h2>
    <p>
      <span class="en">`
  for (let i = 0; i < cont.length; i++) contr.innerHTML += `- <b>${cont[i]}</b><br>`
  contr.innerHTML += "</span></p>";
  screen.innerHTML = myGame.magic;
}

function loadInfo(game){
  switch (game) {
    case "alan-in-super-mario-bros": return alanInSuperMarioBros()
    case "sorting-algorithms": return sortingAlgorithms();
  }
}

function getAttr(game, attr) { 
  switch (game) {
    case "sorting-algorithms": return sortingAlgorithms(attr);
  }
}

function alanInSuperMarioBros() {
  
}

function sortingAlgorithms(attr) {
  const name = ["Sorting Algorithms","Algoritmos de Ordenamiento"];
  const desc = [`In this game you will be able to choose a sorting algorithm
          and use it with a set of numbers that can be random or
          not, then, you will be able to see how it works step by step.`,
                `En este juego podrás elegir un algoritmo de ordenamiento y
          usarlo con un conjunto de numeros que puede ser aleatorio o
          no, después, podras ver como se comporta paso a paso.`];
  const cont = [["Mouse","Keyboard"],["Ratón","Teclado"]];
  const magic = `<canvas id="game" class="bordered rounded" width="640" height="480"></canvas><script src="js/sorting-algorithms.js"></script>`;
  
  switch (attr){
    case "name": return name[la];
    case "desc": return desc[la];
    case "cont": return cont[la];
    case "magic": return magic;
  }
}

var myGame = new Game();
