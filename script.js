let selectedHero = null;

function selectHero(heroElement) {
  // Enlève la classe "selected" sur tous les héros
  const allHeroes = document.querySelectorAll('.hero');
  allHeroes.forEach(hero => hero.classList.remove('selected'));

  // Applique la classe "selected" sur le héros cliqué
  selectedHero = heroElement;
  selectedHero.classList.add('selected');

  // Active le bouton de confirmation
  document.getElementById('confirmButton').disabled = false;
}

function confirmSelection() {
  if (!selectedHero) return;

  const heroName = selectedHero.querySelector('p').innerText;

  // Stocke le héros choisi dans le localStorage
  localStorage.setItem('selectedHero', heroName);

  // Redirige vers la page d'aventure
  window.location.href = 'jeu.html';
}
