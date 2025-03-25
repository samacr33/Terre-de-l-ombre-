let selectedHero = null;

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

  const inventaire = [];

  for (let i = 0; i < 2; i++) {
    inventaire.push({
      nom: "Potion de soin",
      type: "consommable",
      effet: "Rend 50 PV",
      image: "images/potion-soin.png"
    });
  }

  while (inventaire.length < 24) inventaire.push(null);

  localStorage.setItem('inventaire', JSON.stringify(inventaire));
  window.location.href = 'jeu.html';
}

// --- CHARGEMENT DU JEU ---
function chargerJeu() {
  const hero = localStorage.getItem('selectedHero');
  if (hero) {
    document.getElementById('heroInfos').textContent = "Tu joues actuellement : " + hero;
  }
  openTab('carac');
  afficherInventaire();
}

// --- ONGLET ---
function openTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

// --- INVENTAIRE ---
function afficherInventaire() {
  const data = JSON.parse(localStorage.getItem('inventaire')) || [];
  const grid = document.querySelector('.grid');
  if (!grid) return;

  grid.innerHTML = '';

  data.forEach((item, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('draggable', 'true');
    cell.dataset.index = index;

    if (item && item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.nom;
      img.title = item.nom + ' - ' + item.effet;
      img.className = 'item-icon';
      cell.appendChild(img);

      cell.onclick = () => {
        if (item.type === 'consommable') {
          alert(`${item.nom} utilisé ! ${item.effet}`);
          data[index] = null;
          localStorage.setItem('inventaire', JSON.stringify(data));
          afficherInventaire();
        }
      };
    }

    grid.appendChild(cell);
  });
}

// --- DRAG & DROP ---
let dragged = null;

document.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('cell')) {
    dragged = e.target;
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  if (e.target.classList.contains('cell') && dragged && e.target !== dragged) {
    const from = parseInt(dragged.dataset.index);
    const to = parseInt(e.target.dataset.index);

    const data = JSON.parse(localStorage.getItem('inventaire')) || [];
    const temp = data[from];
    data[from] = data[to];
    data[to] = temp;

    localStorage.setItem('inventaire', JSON.stringify(data));
    afficherInventaire();
  }
});
