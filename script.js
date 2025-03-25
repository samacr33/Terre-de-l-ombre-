let selectedHero = null;

// --- SÉLECTION DU HÉROS ---
function selectHero(heroElement) {
  const allHeroes = document.querySelectorAll('.hero');
  allHeroes.forEach(hero => hero.classList.remove('selected'));
  selectedHero = heroElement;
  selectedHero.classList.add('selected');
  document.getElementById('confirmButton').disabled = false;
}

function confirmSelection() {
  if (!selectedHero) return;
  const heroName = selectedHero.querySelector('p').innerText;
  localStorage.setItem('selectedHero', heroName);

  // Création d'un inventaire de base
  const inventaire = [
    { nom: "Potion de soin", type: "consommable", description: "Rend 50 PV", quantite: 2 },
    { nom: "Épée rouillée", type: "arme", description: "Une vieille lame émoussée", quantite: 1 }
  ];
  localStorage.setItem('inventaire', JSON.stringify(inventaire));
  window.location.href = 'jeu.html';
}

// --- JEU : AFFICHAGE DU HÉROS & INVENTAIRE ---
function chargerJeu() {
  const hero = localStorage.getItem('selectedHero');
  if (hero) {
    document.getElementById('heroInfos').textContent = "Tu joues actuellement : " + hero;
  }
  openTab('carac');
  afficherInventaire();
}

function openTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

function afficherInventaire() {
  const inventaire = JSON.parse(localStorage.getItem('inventaire')) || [];
  const inventaireDiv = document.getElementById('inventaire');
  inventaireDiv.innerHTML = '';

  if (inventaire.length === 0) {
    inventaireDiv.innerHTML = '<p>Inventaire vide.</p>';
    return;
  }

  inventaire.forEach((item, index) => {
    const itemBox = document.createElement('div');
    itemBox.className = 'objet';
    itemBox.innerHTML = `
      <strong>${item.nom}</strong> (${item.type})<br/>
      <em>${item.description}</em><br/>
      Quantité : ${item.quantite}<br/>
      ${item.type === 'consommable' ? `<button onclick="utiliserObjet(${index})">Utiliser</button>` : ''}
    `;
    inventaireDiv.appendChild(itemBox);
  });
}

function utiliserObjet(index) {
  let inventaire = JSON.parse(localStorage.getItem('inventaire')) || [];
  const objet = inventaire[index];
  if (objet && objet.type === 'consommable') {
    objet.quantite -= 1;
    alert(objet.nom + " utilisé !");
    if (objet.quantite <= 0) {
      inventaire.splice(index, 1);
    }
    localStorage.setItem('inventaire', JSON.stringify(inventaire));
    afficherInventaire();
  }
}
