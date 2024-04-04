/*****************************************************
           === Variables globales=== 
******************************************************/

let BUTTONS; // afin de stocker les boutons

//TODO placez si besoin vos autres variables globales ici

/*****************************************************
           === Initialisation de la page=== 
******************************************************/

/**
 * initialisation
 * En réponse à un click sur le premier bouton du header
 * la fonction chargerSelections est déclenchée
 */
const init = function () {
  //TODO
  BUTTONS = document.querySelectorAll("header button");
  BUTTONS[0].addEventListener("onclick", chargerSelections());
  // console.log(BUTTONS)
  const stades = document.getElementById("stades");
  stades.addEventListener("click", () => {});
};

/**
 * Configure les boutons correspondants aux phases à réaliser
 * @param {number} nEtape - n° de l'étape à réaliser
 * @param {Function} fPrecedente - fonction dont il faut se désabonner
 * @param {Function} fSuivante - fonction à déclencher au click du prochain bouton
 */
const prochaineEtape = function (nEtape, fPrecedente, fSuivante) {
  BUTTONS[nEtape - 1].style.opacity = "0.2";
  BUTTONS[nEtape - 1].removeEventListener("click", fPrecedente);
  BUTTONS[nEtape].style.opacity = "1";
  BUTTONS[nEtape].addEventListener("click", fSuivante);
  const texteHeader = document.querySelector("header>span");
  switch (nEtape) {
    case 1:
      texteHeader.textContent =
        "Prochaine étape : Diaporama des stades accueillant l'épreuve";
      document.getElementById("illustration").style.backgroundImage =
        "url(./images/pexels-juan-salamanca-61143.jpg)";
      break;
    case 2:
      texteHeader.innerHTML =
        "Prochaine étape : Paul le Poulpe prédit les deux premiers de chaque groupe";
      document.getElementById("illustration").style.backgroundImage =
        "url(./images/paul.jpg)";
      break;
    case 3:
      texteHeader.textContent =
        "Prochaine étape : Nelly l'éléphante prédit les deux meilleurs troisièmes";
      document.getElementById("illustration").style.backgroundImage =
        "url(./images/Nelly-l-elephant.jpg)";
      break;
    case 4:
      texteHeader.textContent =
        "Dernière étape : afficher les qualifiés pour les quarts de finale";
      document.getElementById("illustration").style.visibility = "hidden";
      break;
  }
};

/**********************************************************************************
           ===Création des sélections nationales et des informations === 
*********************************************************************************/

/**
 * Rempli une case de la table appartenant à un groupe de qualification
 * les attributs id et class sont également mis à jour
 * Cette case est abonnée à un click qui déclenchera la fonction afficheInfoPays
 * @param {HTMLElement} td - case d'une table HTML
 * @param {Object} data - données d'un pays
 */
const rempliTd = function (td, data) {
  //TODO
  td.id = data.code;
  td.classList.add(data.poule);
  td.textContent = data.nom;
  td.addEventListener("mouseover", () => afficheInfoPays.call(td));
  // console.log(td)
};

/**
 * A partir des données  présentes dans le script "equipes.js"
 * remplit les tables des groupes en utilisant la fonction rempliTd
 */
const chargerSelections = function () {
  for (const data of countryData) {
    const tableGroupe = document.getElementById(data.poule);
    const tds = tableGroupe.getElementsByTagName("td");
    let i = 0;
    let emplacementTrouve = false;
    while (i < countryData.length && !emplacementTrouve) {
      if (tds[i].textContent == "-") emplacementTrouve = true;
      i++;
    }
    rempliTd(tds[i - 1], data);
  }
  // prochaine étape : afficher un diaporama des stades
  prochaineEtape(1, chargerSelections, afficherStades);
};

/**
 * Crée des éléments HTML décrivant chacune des équipes nationales
 * dans l'élément d'id "infoPays"
 */
const afficheInfoPays = function () {
  const infoPays = document.getElementById("infoPays");
  infoPays.textContent = "";
  const code = this.id;
  /* la ligne de code suivante permet de retrouver l'objet pays dans le tableau
    à partir de son code, si vous voulez en savoir plus sur les arrow function
    vous pourrez consulter par exemple le cours de L2 
    https://www.fil.univ-lille.fr/~routier/enseignement/licence/js-s4/html/javascript-1.html
    */
  const pays = countryData.find((element) => element.code == code);
  /* vous pouvez maintenant accéder aux attributs de cet objet facilement
    par exemple l'expression pays.nom correspond au nom du pays dont le code a été passé
    en paramètre de cette fonction*/
  const nom = pays.nom;
  const h1 = document.createElement("h1");
  h1.textContent = nom;
  infoPays.appendChild(h1);

  // TODO : ajouter le logo de l'équipe
  const logoEquipe = document.createElement('img')
  logoEquipe.src = './images/equipes/' + pays.logo;
  infoPays.appendChild(logoEquipe)
  
  // TODO : ajouter la liste d'informations
  infoPays.querySelector("h1").textContent = nom;
  
  // Tableau de médailles ajouté
  const medailles = pays.medailles;
  const table = document.createElement("table");
  infoPays.appendChild(table);
  table.innerHTML = creeTableauMedailles();
  rempliTableauMedailles(table, medailles);
  
  // TODO : ajout de la mention pays organisateur
};

/**
 * Créer les lignes de la table de médailles
 * @return {string} - code HTML représentant les deux lignes de la table de médailles
 */
const creeTableauMedailles = function () {
  // l'utilisation des caractères ` permet de fabriquer des chaines multilignes
  // plus agréable à lire
  const codeTable = `<tr>
                            <th>🥇</th>
                            <th>🥈</th>
                            <th>🥉</th>
                            <th>total</th>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>0</td>
                        </tr>`;
  return codeTable;
};

/**
 * Rempli le tableau de médailles
 * @param {HTMLElement} table - table HTML
 * @param {Array} medailles - array du nombre de médailles
 */

const rempliTableauMedailles = function (table, medailles) {
  //TODO remplir les cases correspondants aux nombres de médailles
  // console.log(table)
  const medailles_container = table.querySelector("tr:has(td)").childNodes;
  medailles_container[1].textContent = medailles[0];
  medailles_container[3].textContent = medailles[1];
  medailles_container[5].textContent = medailles[2];

  // TODO remplir la case donnant la somme des médailles obtenues
  medailles_container[7] = medailles.reduce(
    (prev, current) => prev + current,
    0
  );
};

/*************************************************************
           ===Diaporama des stades=== 
************************************************************/

var stadeIdx = 0;
var monTimer;

const changeStade = () => {
  const stades = document.getElementById("stades");
  stades.querySelector("img#diapo").src =
    "./images/stades/" + stadiumData[stadeIdx].src;
  stades.querySelector("p:nth-of-type(1) > span").textContent =
    stadiumData[stadeIdx].nom;
  stades.querySelector("p:nth-of-type(2) > span").textContent =
    stadiumData[stadeIdx].ville;
  stades.querySelector("p:nth-of-type(3) > span").textContent =
    stadiumData[stadeIdx].capacité;

  // réinitialiser l'index pour eviter IndexError
  stadeIdx += 1;
  if (stadeIdx >= stadiumData.length) stadeIdx = 0;
};

/**
 * lance le diaporama en utilisant la variable globale
 * monTimer
 */
const afficherStades = function () {
  //TODO : mettre en place le diaporama
  monTimer = window.setInterval(changeStade, 1000);

  // passage à l'étape suivante
  prochaineEtape(2, afficherStades, qualifPremiers);
};

// TODO :  autres fonctions éventuelles nécessaires
// vous pouvez également créer des variables globales si besoin dans la section correspondante

/*************************************************************
           ===Prévisions=== 
************************************************************/

/**
 * Prévision de Paul le Poulpe
 */
const qualifPremiers = function () {
  const unEtDeux = new Array();
  for (let i = 0; i < 3; i++) unEtDeux.push(deuxPremiers());
  miseAJourDeuxPremiers(unEtDeux);
  prochaineEtape(3, qualifPremiers, meilleursTrois);
};

/**
 * Renvoie la position des deux premiers qualifiés pour un groupe
 * @return {Array} - tableau de deux nombres entiers différents
 * compris entre 1 et 4 (bornes incluses)
 */
const deuxPremiers = function () {
  //TODO
  let choix = [1, 2, 3, 4];
  const premier = choix[Math.round(Math.random() * 3)];
  delete choix[choix.findIndex((el) => el == premier)];
  const res = [
    premier,
    choix.filter((el) => !!el)[Math.round(Math.random() * 2)],
  ];
  return res;
};

/**
 * @param {Array} tab - tableau des deux premiers de chaque groupe
 */
const miseAJourDeuxPremiers = function (tab) {
  for (let i = 0; i < 2; i++) {
    qualifie("A", tab[0][i], i + 1);
    qualifie("B", tab[1][i], i + 1);
    qualifie("C", tab[2][i], i + 1);
  }
};

/**
 * renvoie un entier aleatoire entre 1 et 4
 */
function alea1_4() {
  return Math.round(Math.random() * 3) + 1;
}

/**
 * Choix et mise à jour des meilleurs troisièmes prévus
 * par Nelly
 */
const meilleursTrois = function () {
  //selection groupe
  const groupes = ["A", "B", "C"];
  let ig, g, equipes, ie;
  for (let i = 0; i < 2; i++) {
    // TODO: add comments here
    ig = Math.floor(Math.random() * groupes.length);
    g = groupes[ig];
    groupes.splice(ig, 1);
    equipes = document.querySelectorAll("td[class^=" + g + "]");
    let trouve = false;
    ie = null;
    while (!trouve) {
      ie = alea1_4();
      if (equipes[ie - 1].classList.length == 1) trouve = true;
    }
    qualifie(g, ie, 3);
  }
  prochaineEtape(4, meilleursTrois, listeQualifies);
};

/**
 * met à jour le style et les attributs des cases
 * des tables des groupes fonction de la place prévue
 * par Paul le Poule ou Nelly l'Elephante
 */
const qualifie = function (groupe, indice, pos) {
  const table = document.getElementById(groupe);
  // trouver dans tbody tr avec (с порядковым номером индекса) et dedans td
  const td = table.querySelector("tbody tr:nth-child(" + indice + ") td");
  switch (pos) {
    case 1:
      td.style.backgroundColor = "#e1a624";
      td.classList.add("q1"); // ajoute la valeur q1 à la suite des autre valeurs de l'attribut class de l'élément td
      break;
    case 2:
      td.style.backgroundColor = "#317ac1";
      td.classList.add("q2"); // ajoute la valeur q2 à la suite des autre valeurs de l'attribut class de l'élément td
      break;
    case 3:
      td.style.backgroundColor = "LemonChiffon";
      td.classList.add("q3"); // ajoute la valeur q3 à la suite des autre valeurs de l'attribut class de l'élément td
      break;
    default:
      break;
  }
};

/*************************************************************
           ===Affichage liste qualifiés=== 
************************************************************/

/**
 * Affiche la liste des qualifiés dans l'élément d'id "qualifies"
 * un compteur local est incrémenté, une assertion vérifie le nombre de quarts de finalistes
 */
const listeQualifies = function () {
  let compteur = 0; // TODO: incrémenter le compteur pour chaque équipe qualifiée
  const qualifies = document.getElementById("qualifies");
  // composer une liste des éléments de qualifiés 
  const liste = Array.from(document.querySelectorAll(".q1, .q2, .q3"))
    .reduce((prev, current) => {
      compteur += 1;
      return [...prev, current.textContent];
    }, [])
    .sort()
    .join(", ");

  // Affiche la liste des qualifiés
  const qualifiesNode = document.createElement("span");
  qualifiesNode.textContent = liste;
  qualifies.insertBefore(qualifiesNode, qualifies.childNodes[4]);
  qualifies.childNodes[4].textContent = liste;
  qualifies.style.visibility = "visible";

  // assertion (comme en Python), ici pour vérifier qu'il y a bien 8 qualifiées
  console.assert(compteur == 8, "Il doit y avoir 8 équipes");
  this.removeEventListener("click", listeQualifies);
  this.style.opacity = "0.2";
  window.clearInterval(monTimer);
  const texteHeader = document.querySelector("header>span");
  texteHeader.textContent = "Bonne compétition !";
};

/*************************************************************
           ===Initialisation de la page=== 
************************************************************/

init();
