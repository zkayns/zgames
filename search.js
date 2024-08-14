const input = document.querySelector('input');
const games = document.querySelectorAll('#games img');

input.addEventListener('input', () => {
  const searchTerm = input.value.toLowerCase();
  games.forEach(game => {
    var gameName = game.alt.toLowerCase()
    if (gameName.includes(searchTerm) || gameName.replace(new RegExp("\'", "g"), "").includes(searchTerm) || gameName.replace(new RegExp(" ", "g"), "").includes(searchTerm) || gameName.replace(new RegExp("\,", "g"), "").includes(searchTerm)) {
      game.style.display = 'block';
    } else {
      game.style.display = 'none';
    }
  });
});
/*gameName.includes(searchTerm.replace(new RegExp(" ", "g"), ""))*/ // if u stupid
