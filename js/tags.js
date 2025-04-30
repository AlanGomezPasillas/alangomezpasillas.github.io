function showMysticHeader() {
  document.querySelector('mystic-header').innerHTML = 
  `<div class="flex-box">
    <div id="mystic" class="bordered rounded">
      <a href="https://alangomezpasillas.github.io">
      <img src="img/MysticPrisma.svg" width="64px" height="64px">
      <h1>Mystic Prisma</h1>
      </a>
    </div>
    <div class="flex-pack">
      <div id="follow">
        <a target="_blank" href="https://github.com/AlanGomezPasillas/"><img class="follow bordered rounded" src="img/github-mark.svg"/></a>
        <a target="_blank" href="https://www.youtube.com/@MysticPrismaGames"><img class="follow bordered rounded" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/YouTube_social_red_circle_%282017%29.svg"/></a>
        <a target="_blank" href="https://www.facebook.com/MysticPrismaGames/"><img class="follow bordered rounded" src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"/></a>
        <a target="_blank" href="https://mx.linkedin.com/in/alan-gomez-pasillas/es"><img class="follow bordered rounded" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/LinkedIn_icon_circle.svg"/></a>
      </div>
      <div id="flag">
        <button class="bordered flagbt" onclick="changeLanguage(1)"><img class="flag" src="img/MXFlag.svg"></button>
        <button class="bordered flagbt" onclick="changeLanguage(0)"><img class="flag" src="img/USAFlag.svg"></button>
      </div>
    </div>
  </div>`;
}

function showMysticFooter() {
  document.querySelector('mystic-footer').innerHTML = 
  `<footer>
    <h3>
      <span class="en">Contact us!</span>
      <span class="es">Contactanos!</span>
    </h3>
    Email: alangomezpasillas@gmail.com<br><br><b>
      &copy;Mystic Prisma 2025.
      <span class="en">
        All Rights Reserved.
      </span>
      <span class="es">
        Todos los derechos reservados.
      </span>
    </b>
  </footer>`;
}
