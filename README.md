# Vico chips de lentilles : le prix d'un format familial de 200 g en grande surface

Dossier noté du cours « Prix et budgets marketing », M1 Marketing, IAE Clermont Auvergne (rendu le 25 novembre 2026). Le site est le dossier.

**Problématique** : à quel prix Vico doit-elle vendre un format familial de 200 g de ses chips de lentilles en grande surface, et combien doit-elle en vendre pour que ce soit rentable ?

Périmètre : la grande surface (Carrefour, Auchan, E.Leclerc, Intermarché), à partir de notre relevé du 01/10/2026 (27 magasins, 7 villes). Logique : le 85 g se vend 1,80 € en moyenne ; la tendance des grands formats concurrents donne un 200 g autour de 3,71 €, arrondi à 3,69 € (−13 % au kilo) ; à cet écart, 52 % des répondants de notre questionnaire choisissent le 200 g ; la rentabilité est tout juste atteinte, d'où la recommandation d'un test en magasin.

## Groupe

Souilmi, Moulin, Charras, Bousselham, Sagnol

## Pages (dans l'ordre du dossier)

| Page | Contenu |
|---|---|
| `index.html` | Problématique, ce qu'on retient (calculé), démarche en 4 étapes |
| `entreprise.html` | Comptes d'Intersnack France (propriétaire de Vico), ratios calculés |
| `concurrents.html`, `carte.html`, `enseignes.html` | Le marché : prix au kilo des concurrents, par ville et par enseigne |
| `format-familial.html` | Le prix du 200 g : plafond, tendance des concurrents, plancher, prix retenu, 27 magasins |
| `client.html` | Le client : ce que dit notre mesure (test A/B/C, Gabor-Granger, profils) |
| `decision.html` | Plancher / prix / plafond, marge, seuil de rentabilité, stress test, alternative à 3,99 €, recommandation |
| `methodologie.html` | Relevé, questionnaire, modèle, usage de l'IA, sources à ajouter |
| `rentabilite.html` | Redirige vers `decision.html` |
| `questionnaire/` | Le questionnaire (85 g à 1,80 € ; 200 g à 4,24 / 3,69 / 3,35 €), clos le 20/10/2026 |

## Données et paramètres

- `assets/donnees.js` : prix relevés le 01/10/2026 sur les sites drive de Carrefour, Auchan, E.Leclerc et Intermarché (Excel complet dans `donnees/`).
- `assets/resultats.js` : résultats du questionnaire (source : Google Sheet « Chips vico », onglet Réponses).
- `assets/config.js` : **tous les paramètres modifiables** (prix du 200 g, TVA, marges, coûts, cannibalisation, volume de référence) ; le prix du 85 g est calculé à partir du relevé. Tout le site se recalcule à partir de ce fichier.
- `assets/app.js` : fonctions communes et modèle de calcul (prix moyen du 85 g, tendance des concurrents, plancher, part attendue, marge, seuil, stress test, tests du khi²).

Site statique (HTML, CSS, JavaScript), sans étape de build. Pour le voir en local :

```bash
python3 -m http.server 8000
```

## Crédits

Version reprise et retravaillée à partir du dépôt d'origine [LinaSouilmi/vico-chips-lentilles](https://github.com/LinaSouilmi/vico-chips-lentilles) (relevé de prix, premières pages et questionnaire).
