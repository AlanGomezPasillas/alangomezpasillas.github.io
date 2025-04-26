function loadGame(){
  const game = new URLSearchParams(window.location.search).get('game');
  const name = getAttr(game, "name");
  const desc = getAttr(game, "desc");
  const cont = getAttr(game, "cont");
  const title = document.querySelector('title');
  const descr = document.getElementById('title');
  const contr = document.getElementById('controls');
  title.innerText = name;
  descr.innerHTML = 
    `<h2>
      <span class="en">${name}</span>
      <span class="es">${name}</span>
    </h2>
    <p>
      <span class="en">
        ${desc}
      </span>
      <span class="es">
        ${desc}
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
}

function getAttr(game, attr) { 
  switch (game) {
    case "sorting-algorithms": return sortingAlgorithms(attr);
  }
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
  switch (attr){
    case "name": return name[la];
    case "desc": return desc[la];
    case "cont": return cont[la];
  }
}
