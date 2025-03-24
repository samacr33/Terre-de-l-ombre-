let selectedHero = null;

function selectHero(heroElement) {
  if (selectedHero) {
    selectedHero.classList.remove('selected');
  }

  selectedHero = heroElement;
  selectedHero.classList.add('selected');

  document.getElementById('confirmButton').disabled = false;
}

function confirmSelection() {
  const heroName = selectedHero.querySelector('p').innerText;

  // Stocker dans le localStorage
  localStorage.setItem('selectedHero', heroName);

  // Redirection vers la prochaine page
  window.location.href = 'heros.html'; // à créer ensuite
}
