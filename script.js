let selectedHero = null;

function selectHero(heroElement) {
  // Enlever la sélection précédente, si elle existe
  if (selectedHero) {
    selectedHero.classList.remove('selected');
  }

  // Ajouter la classe "selected" à l'élément cliqué
  selectedHero = heroElement;
  selectedHero.classList.add('selected');

  // Activer le bouton de validation
  document.getElementById('confirmButton').disabled = false;
}

function confirmSelection() {
  // Afficher une alerte avec le nom du héros choisi
  const heroName = selectedHero.querySelector('p').innerText;
  alert(`Vous avez choisi ${heroName} !`);

  // Rediriger ou effectuer une autre action après la confirmation
  // window.location.href = "suivant.html";  // Exemple pour rediriger
}
