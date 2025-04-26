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
  for (let i = 0; i < myGame.cont.length; i++) contr.innerHTML += `- <b>${myGame.cont[i]}</b><br>`
  contr.innerHTML += "</span></p>";
  screen.innerHTML += `<ins class="adsbygoogle" data-ad-client="ca-pub-8773996523943422" data-ad-slot="4764091104"></ins><script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>`;
  screen.innerHTML += myGame.magic;
  screen.innerHTML += `<ins class="adsbygoogle" data-ad-client="ca-pub-8773996523943422" data-ad-slot="4764091104"></ins><script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>`;
}

function getAttr(game, attr) { 
  var name;
  var desc;
  var cont;
  var magic;
  switch (game) {
    case "alan-in-super-mario-bros":
      name = ["Alan in Super Mario Bros","Alan en Super Mario Bros"];
      desc = [`Alan goes to the awesome world of Super Mario, Andrea
               has been rapted by Bowser and Alan is meant to save her,
               play this hackrom game and help him save Andrea.`,
              `Alan va al asombroso mundo de Super Mario, Andrea ha sido
               raptada por Bowser y es deber de Alan rescatarla,
               juega éste hackrom y ayuda a Alan a salvar a Andrea.`];
      cont = [["A: Jump","S: Run and shoot fireballs","Arrows: Move"],["A: Brincar","S: Correr y lanzar bolas de fuego","Flechas: Moverse"]];
      magic = `<iframe width=100% style="aspect-ratio: 500 / 480;" src="https://www.indiexpo.net/en/embed/alan-en-super-mario-bros" frameborder="0" allowfullscreen></iframe>`;
      break;
    case "sorting-algorithms":
      name = ["Sorting Algorithms","Algoritmos de Ordenamiento"];
      desc = [`In this game you will be able to choose a sorting algorithm
               and use it with a set of numbers that can be random or
               not, then, you will be able to see how it works step by step.`,
              `En este juego podrás elegir un algoritmo de ordenamiento y
               usarlo con un conjunto de numeros que puede ser aleatorio o
               no, después, podras ver como se comporta paso a paso.`];
      cont = [["Mouse","Keyboard"],["Ratón","Teclado"]];
      magic = `<canvas id="game" class="bordered rounded" width="640" height="480"></canvas><script src="js/sorting-algorithms.js"></script>`;
      break;
  }
  switch (attr){
    case "name": return name[la];
    case "desc": return desc[la];
    case "cont": return cont[la];
    case "magic": return magic;
  }
}

var myGame = new Game();
