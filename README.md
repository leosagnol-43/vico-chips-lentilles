# Vico chips de lentilles : la demande pour un format familial à 4,99 €

Dossier noté du cours « Prix et budgets marketing », M1 Marketing, IAE Clermont Auvergne (rendu le 25 novembre 2026). Le site est le dossier.

**Question du dossier** : à 4,99 €, la demande pour un format familial de 200 g des chips de lentilles Vico suffit-elle à couvrir son coût de lancement, et dans quel circuit ?

Le prix est donné : nous ne cherchons pas à le fixer, nous étudions la demande à ce prix. Fil rouge : la demande pour le 200 g dépend de son prix au kilo comparé au sachet de 85 g, donc du prix du 85 g dans le magasin.

## Groupe

[NOMS À COMPLÉTER]

## Pages (dans l'ordre du dossier)

| Page | Contenu |
|---|---|
| `index.html` | Question du dossier, ce qu'on retient (calculé), démarche en 4 étapes |
| `entreprise.html` | Comptes d'Intersnack France (propriétaire de Vico), ratios calculés |
| `concurrents.html`, `carte.html`, `enseignes.html` | Le marché : prix au kilo des concurrents, par ville et par enseigne |
| `format-familial.html` | Le 4,99 € face au marché : écart au kilo par rapport au 85 g, seuils, 27 magasins |
| `client.html` | La demande mesurée : questionnaire (test A/B/C, Gabor-Granger, profils) |
| `decision.html` | Seuil de rentabilité, part minimale, comparaison par circuit, stress test, recommandation |
| `methodologie.html` | Relevé, questionnaire, modèle, usage de l'IA, sources à ajouter |
| `rentabilite.html` | Redirige vers `decision.html` |
| `questionnaire/` | Archive du questionnaire (clos le 20/10/2026) |

## Données et paramètres

- `assets/donnees.js` : prix relevés le 01/10/2026 sur les sites drive de Carrefour, Auchan, E.Leclerc et Intermarché (Excel complet dans `donnees/`).
- `assets/resultats.js` : résultats du questionnaire (source : Google Sheet « Chips vico », onglet Réponses).
- `assets/config.js` : **tous les paramètres modifiables** (prix du 200 g, prix de proximité, TVA, marges, coûts, cannibalisation, volume de référence). Tout le site se recalcule à partir de ce fichier.
- `assets/app.js` : fonctions communes et modèle de calcul (prix au kilo, part attendue, marge, seuil, stress test, tests du khi²).

Site statique (HTML, CSS, JavaScript), sans étape de build. Pour le voir en local :

```bash
python3 -m http.server 8000
```

## Crédits

Version reprise et retravaillée à partir du dépôt d'origine [LinaSouilmi/vico-chips-lentilles](https://github.com/LinaSouilmi/vico-chips-lentilles) (relevé de prix, premières pages et questionnaire).
