"use strict"

// Par défaut les données de l'API ne fournissent pas les jours (ni les heures d'ailleurs)
// Afin que les jours soient raccords avec la réalité de l'internaute, il faut développer en JS


const joursDeLaSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
let ajd = new Date();
let options = {weekday: 'long'};
// Méthode toLocalDateString() qui transpose ajd en français
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
// console.log(jourActuel, ajd) = mardi Tue Sep 07 2021 14:55:45 GMT+0200 (heure d’été d’Europe centrale)
jourActuel = jourActuel.charAt(0).toUpperCase()+jourActuel.slice(1);
// Méthodes = charAt(index) qui retourne la 1ère lettre de l'index (M index 0) + slice(1) qui renvoi le reste de l'index (ardi), concaténation

// Maintenant il faut régler le tableau sur le "bon" jour de la semaine
let tabJoursEnOrdre = joursDeLaSemaine.slice(joursDeLaSemaine.indexOf(jourActuel)).concat(joursDeLaSemaine.slice(0, joursDeLaSemaine.indexOf(jourActuel)));
// TRADUCTION !!!!
// joursDeLaSemaine.slice = Je prends une "portion" de mon tableau "jourDeLaSemaine"
// (joursDeLaSemaine.indexOf(jourActuel)) = qui correspond à la variable jourActuel, c'est à dire à partir de mardi dans cet exemple
// mon tableau est égale à tabJoursEnOrdre = ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
// .concat(joursDeLaSemaine.slice(0, joursDeLaSemaine.indexOf(jourActuel) = je concate à tabJoursEnOrdre un autre bout de joursDeLaSemaine (partant de l'index 0 = 'Lundi', à l'index de joursDeLaSemaine déterminé par jourActuel, càd 'Mardi', ce dernier est exclue avec la méthode slice)
// A ce stade mon tableau est égale à tabJoursEnOrdre = ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Lundi']
// LE TABLEAU EST CREE, IL FONCTIONNE (LE JOUR CHANGE AUTOMATIQUEMENT), 

// IMPORTATION DANS LE FICHIER MAIN.JS
export default tabJoursEnOrdre;