/* =====================================================================
   PARAMÈTRES MODIFIABLES DU DOSSIER
   Toutes les pages lisent ce fichier. Changer une valeur ici recalcule
   tout le site (prix au kilo, seuils, simulateur, stress test, textes).
   Le prix du 85 g n'est PAS ici : il est calculé à partir du relevé du
   01/10/2026 (assets/donnees.js), prix moyen du Vico 85 g en grande surface.
   Justifications et sources : decision.html (bloc « Hypothèses »).
   ===================================================================== */
const CONFIG = {
  // --- Le produit ---
  PRIX_200: 3.69,           // € TTC, prix retenu pour le format familial en grande surface
  POIDS_200: 200,           // g

  // --- Partage de la valeur et coûts (estimés) ---
  TVA: 0.055,               // taux réduit sur les produits alimentaires
  MARGE_DISTRIB: 0.30,      // part du prix HT gardée par le distributeur
  FABRICATION_KG: 5,        // € par kg de chips (matières + fabrication)
  EMB_200: 0.15,            // € d'emballage par sachet de 200 g
  EMB_85: 0.10,             // € d'emballage par sachet de 85 g
  AUTRES_FRAIS: 0.10,       // logistique, promotions : part du prix payé à Vico

  // --- Lancement ---
  COUTS_FIXES: 150000,      // € (ligne de conditionnement, design, référencement, communication)
  CANNIBALISATION: 0.5,     // sachets de 85 g perdus pour 1 sachet de 200 g vendu

  // --- Passage de la part de choix à un volume ---
  VOLUME_REF: 200000,       // 200 g vendus par an si PART_REF des acheteurs choisissaient le 200 g
  PART_REF: 0.53,

  // --- Contrôle de vraisemblance du volume ---
  NB_MAGASINS: 3000         // hypers et supermarchés qui vendraient le 200 g (hypothèse, source à ajouter)
};
