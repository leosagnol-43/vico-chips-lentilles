/* =====================================================================
   PARAMÈTRES MODIFIABLES DU DOSSIER
   Toutes les pages lisent ce fichier. Changer une valeur ici recalcule
   tout le site (prix au kilo, seuils, simulateur, stress test, textes).
   Les justifications et sources de chaque valeur sont sur decision.html
   (bloc « Hypothèses ») et methodologie.html.
   ===================================================================== */
const CONFIG = {
  // --- Le produit étudié (prix donné, on étudie la demande à ce prix) ---
  PRIX_CONNU_200: 4.99,     // € TTC, prix du format familial (donné)
  POIDS_200: 200,           // g, poids du format familial

  // --- Prix du sachet de 85 g en magasin de proximité ---
  PRIX_85_PROXIMITE: 2.69,  // € TTC (prix affiché dans le questionnaire)

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
  VOLUME_REF: 200000,       // 200 g vendus par an quand PART_REF des acheteurs choisissent le 200 g
  PART_REF: 0.53
};
