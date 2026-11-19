/* =====================================================================
   RÉSULTATS DU QUESTIONNAIRE (collecte du 15 au 20/10/2026)
   source : Google Sheet Chips vico, onglet Réponses
   Effectifs bruts : les pourcentages, khi² et V de Cramér sont recalculés
   en JS (assets/app.js). Les p-values qui demandent les données individuelles
   (âge, puissance…) sont reprises telles quelles de l'analyse du Sheet.
   Fichier partagé : client.html l'affiche, index.html et decision.html
   s'en servent pour la part attendue.
   ===================================================================== */
const RESULTATS = {
  url: 'https://linasouilmi.github.io/vico-chips-lentilles/questionnaire/',
  collecte: { debut: '15/10/2026', fin: '20/10/2026' },
  question: 'Si vous deviez acheter des chips de lentilles Vico, lequel de ces deux paquets choisiriez-vous ?',
  prix85: 2.69, // prix du 85 g affiché dans les 3 versions

  nettoyage: { recues: 144, nonAcheteurs: 10, mineurs: 2, baclees: 2, seuilBaclee_s: 42, medianeDuree: '2 min 34' },
  echantillon: { auraPart: 0.8, etudiantsPart: 0.4 }, // « 8 sur 10 », « 4 sur 10 »

  // Test A/B/C : prix du 200 g tiré au sort
  versions: [
    { id: 'A', prix200: 6.33, n: 44, choix200: 10, vuMoinsCher: 7 },
    { id: 'B', prix200: 5.49, n: 48, choix200: 25, vuMoinsCher: 33 },
    { id: 'C', prix200: 4.99, n: 38, choix200: 20, vuMoinsCher: 27 }
  ],
  // Tests par paires (analyse du Sheet)
  paires: { puissanceAB: 0.84, ecartMinDetectableBC: 0.28 },

  // Groupes comparables (A / B / C) et p-value du test d'égalité
  comparabilite: [
    { critere: 'Âge moyen (ans)', A: 34.7, B: 29.6, C: 30.1, p: 0.20, unite: 'an' },
    { critere: 'Femmes', A: 0.53, B: 0.64, C: 0.54, p: 0.54 },
    { critere: 'Étudiants', A: 0.39, B: 0.44, C: 0.45, p: 0.83 },
    { critere: 'Enfants au foyer', A: 0.30, B: 0.27, C: 0.29, p: 0.96 },
    { critere: 'Connaissent les chips de lentilles', A: 0.32, B: 0.38, C: 0.34, p: 0.85 },
    { critere: 'Achètent des grands formats', A: 0.25, B: 0.27, C: 0.18, p: 0.63 }
  ],

  // Gabor-Granger : le 200 g seul, « l'achèteriez-vous à ce prix ? » (n = 130)
  gaborGranger: [
    { prix: 3.49, oui: 29 },
    { prix: 3.99, part: 0.10 },
    { prix: 4.49, part: 0.02 },
    { prix: 4.99, part: 0 }
  ],

  // Qui choisit le 200 g (calculé sur 132 répondants, à mettre à jour sur 130)
  profils: {
    base: 132,
    enfants: { oui: 0.61, non: 0.35, p: 0.0075 },
    grandsFormats: { oui: 0.66, non: 0.37, p: 0.0057 },
    etudiants: { oui: 0.31, non: 0.51, p: 0.024 },
    economieVue: { oui: 0.68, non: 0.18, p: 0.00001, nePasVoir: 1 / 3 },
    dejaAchete: { accepte349: 0.36, accepte349Non: 0.15, p: 0.0061, jamaisAchete: 0.65 }
  }
};
