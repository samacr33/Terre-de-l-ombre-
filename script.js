let selectedHero = null;

function selectHero(heroElement) {
  // Retire la sélection précédente
  const allHeroes = document.querySelectorAll('.hero');
  allHeroes.forEach(hero => hero.classList.remove('selected'));

  // Sélectionne le nouveau héros
  selectedHero = heroElement;
  selectedHero.classList.add('selected');

  // Active le bouton de validation
  document.getElementById('confirmButton').disabled = false;
}

function confirmSelection() {
  if (!selectedHero) return;

  const heroName = selectedHero.querySelector('p').innerText;

  // Sauvegarde le nom du héros dans localStorage
  localStorage.setItem('selectedHero', heroName);

  // Redirection vers la page de jeu
  window.location.href = 'jeu.html';
}
