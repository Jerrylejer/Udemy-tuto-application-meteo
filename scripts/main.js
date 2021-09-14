"use strict";

import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";
console.log(tabJoursEnOrdre);

const CLEFAPI = "5a4d1dc7eddf122e682dc9258075fc54";
// variable qui recevra les requêtes météo liées à la géolocalisation
let resultatsAPI;
const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".ligneDesHeures");
const tempPourH = document.querySelectorAll(".ligneDesTemperatures");
const joursSuiv = document.querySelectorAll(".ligneDesJours");
const tempPourJ = document.querySelectorAll(".ligneDesTemperaturesJours");
const imgIcone = document.querySelector(".logo-meteo");
const chargementContainer = document.querySelector(".overlay-icone-chargement");

// GEOLOCALISATION - CAPTATION DES DONNEES ET ENVOI A L'API DES DONNEES RECUEILLIES
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    // Captation des données et transfert vers l'API avec AppelAPI() + function et méthode fletch ci-après
    (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      AppelAPI(long, lat);
    },
    // Message d'alerte si demande refusée par internaute
    () => {
      alert(
        `Vous avez refusé la géolocalisation! Veuillez accepter pour activer l'application svp.`
      );
    }
  );
}

// GEOLOCALISATION - RETOUR DES INFORMATIONS API, TRADUCTION JAVASCRIPT, INTEGRATION DOM
function AppelAPI(long, lat) {
  // Méthode fetch() qui permet d'aller chercher les données retour dans l'API distante
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`
  )
    // Puis elles sont tranformées en JSON pour être lus en javascript
    .then((reponse) => {
      return reponse.json();
    })
    // PUIS INTEGREES DANS LE DOM
    .then((data) => {
      // INTEGRATION DES DONNEES DANS LE BLOC INFOS
      console.log(data);

      resultatsAPI = data;
      temps.innerText = resultatsAPI.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
      localisation.innerText = resultatsAPI.timezone;

      // INTEGRATION DES DONNEES POUR LES HEURES ET LES TEMPERATURES
      // détermination de l'heure actuelle - new Date().getHours()

      let heureActuelle = new Date().getHours();
      for (let i = 0; i < heure.length; i++) {
        let heureSuiv = heureActuelle + i * 3;
        if (heureSuiv > 24) {
          heure[i].innerText = `${heureSuiv - 24} h`;
        } else if (heureSuiv === 24) {
          heure[i].innerText = `00 h`;
        } else {
          heure[i].innerText = `${heureSuiv} h`;
        }
      }
      // intégration des températures suivant l'ordre des heures

      for (let i = 0; i < tempPourH.length; i++) {
        tempPourH[i].innerText = `${Math.trunc(
          resultatsAPI.hourly[i * 3].temp
        )}°`;
      }

      // intégration des jours de la semaine - 3 premières lettres

      for (let i = 0; i < tabJoursEnOrdre.length; i++) {
        joursSuiv[i].innerText = tabJoursEnOrdre[i].slice(0, 3);
      }

      // intégration des températures jours semaine

      for (let i = 0; i < 7; i++) {
        tempPourJ[i].innerText = `${Math.trunc(
          resultatsAPI.daily[i + 1].temp.day
        )}°`;
      }
      // main.js:79 Uncaught (in promise) TypeError: Cannot set property 'innerText' of undefined
      // at main.js:79 = ok trouvé ! 2 x mercredi dans variable jousDeLaSemaine !!!!

      // Intégration de l'icone dynamique
      if (heureActuelle >= 6 && heureActuelle < 21) {
        imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
      } else {
        imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
      }
      chargementContainer.classList.add("disparition");
    });
}
