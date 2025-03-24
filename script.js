// Gestion de la sélection de personnage
function selectCharacter(name, description) {
    document.getElementById("selected-character").innerText = "Personnage sélectionné : " + name;
    localStorage.setItem("selectedCharacter", name);
    document.getElementById("start-game").style.display = "block";
}

// Redirection vers la prochaine page
function startGame() {
    const selectedCharacter = localStorage.getItem("selectedCharacter");
    if (selectedCharacter) {
        window.location.href = "jeu.html"; // Crée cette page si elle n'existe pas encore
    } else {
        alert("Veuillez sélectionner un personnage avant de commencer !");
    }
}
