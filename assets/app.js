/* Fonctions communes à toutes les pages */
const PAGES = [
  ['index.html', 'Accueil'],
  ['entreprise.html', "L'entreprise"],
  ['concurrents.html', 'Concurrents'],
  ['carte.html', 'Carte'],
  ['enseignes.html', 'Enseignes'],
  ['format-familial.html', 'Le 4,99 € face au marché'],
  ['client.html', 'La demande'],
  ['decision.html', 'La décision'],
  ['methodologie.html', 'Méthodologie']
];
const ENSEIGNES = ['Carrefour', 'Auchan', 'Leclerc', 'Intermarché'];
const COUL_ENS = { Carrefour: '#1565c0', Auchan: '#c62828', Leclerc: '#ef6c00', 'Intermarché': '#6a1b9a' };
const COUL_CAT = { 'Référence': '#c62828', 'Concurrent direct': '#2e7d32', 'Concurrent indirect': '#1565c0', 'Substitut': '#ef6c00' };
const CAT_CLASS = { 'Référence': 't-ref', 'Concurrent direct': 't-direct', 'Concurrent indirect': 't-indirect', 'Substitut': 't-substitut' };
const VICO = 0;

function nav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const n = document.createElement('nav');
  n.className = 'top';
  // le libellé du menu suit le prix de config.js
  n.innerHTML = PAGES.map(([h, t]) => `<a href="${h}"${h === here ? ' class="on"' : ''}>${t.replace('4,99 €', eur(CONFIG.PRIX_CONNU_200))}</a>`).join('');
  document.querySelector('.wrap').prepend(n);
  listeASourcer();
  const f = document.createElement('footer');
  f.innerHTML = `Projet étudiant · M1 Marketing, IAE Clermont Auvergne · cours « Prix et budgets marketing » · Prix relevés le <a href="methodologie.html#releve">${DATA.date}</a> sur les sites drive de Carrefour, Auchan, E.Leclerc et Intermarché · Groupe : [NOMS À COMPLÉTER]`;
  document.querySelector('.wrap').append(f);
}
document.addEventListener('DOMContentLoaded', nav);

/* Marqueurs « source à ajouter » : liste automatique en bas de chaque page */
const A_SOURCER = '<span class="a-sourcer">[source à ajouter]</span>';
function listeASourcer() {
  const ms = [...document.querySelectorAll('.wrap .a-sourcer')];
  if (!ms.length || document.body.dataset.pasDeListe != null) return;
  const items = ms.map((m, i) => {
    m.id ||= 'as' + (i + 1);
    const bloc = m.closest('li, p, td, tr, label') || m.parentElement;
    const tr = m.closest('tr');
    let t = (tr && bloc.tagName === 'TD' && tr.cells[0] !== bloc ? tr.cells[0].textContent.replace(/Constaté|Estimé|Donné/, '') + ' : ' : '') + bloc.textContent.replace(/\[source à ajouter\]/g, '').replace(/\s+/g, ' ').trim();
    if (t.length > 170) t = t.slice(0, 167) + '…';
    return `<li><a href="#${m.id}">${t}</a></li>`;
  });
  const c = document.createElement('div');
  c.className = 'card';
  c.id = 'a-sourcer-liste';
  c.innerHTML = `<h2>Sources à ajouter sur cette page (${ms.length})</h2><ol>${items.join('')}</ol><p class="note">Liste complète du site : <a href="methodologie.html#a-sourcer">Méthodologie</a>.</p>`;
  document.querySelector('.wrap').append(c);
}

/* Liens de source réutilisés dans les phrases générées en JS */
const L_RELEVE = (txt = 'relevé du ' + DATA.date) => `<a href="methodologie.html#releve">${txt}</a>`;
const L_QUEST = (txt = 'questionnaire du 15 au 20/10/2026') => `<a href="client.html">${txt}</a>`;

/* Formatage */
const fmt = (x, d = 2) => x == null || isNaN(x) ? '–' : x.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
const eur = (x, d = 2) => x == null || isNaN(x) ? '–' : fmt(x, d) + ' €';
const pcta = (x, d = 0) => x == null || isNaN(x) ? '–' : fmt(Math.abs(x) * 100, d) + ' %';
const pct = (x, d = 0) => x == null || isNaN(x) ? '–' : (x > 0 ? '+' : '') + fmt(x * 100, d) + ' %';

/* Accès aux données */
const prod = id => DATA.produits.find(p => p.id === id);
const mag = id => DATA.magasins[id];
const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;

/* Lignes de prix enrichies : {p, m, prix, kg, enseigne, ville} */
const LIGNES = DATA.prix.map(([p, m, prix, kg]) => ({ p, m, prix, kg, enseigne: mag(m).enseigne, ville: mag(m).ville }));

function lignes(f = {}) {
  return LIGNES.filter(l => (f.p == null || l.p === f.p) && (!f.enseigne || l.enseigne === f.enseigne) && (!f.ville || l.ville === f.ville));
}
function moyKg(f) { return mean(lignes(f).map(l => l.kg)); }

/* Moyenne nationale €/kg de chaque produit (toutes enseignes, toutes villes) */
const MOY_NAT = {};
DATA.produits.forEach(p => MOY_NAT[p.id] = moyKg({ p: p.id }));

/* Indice de prix (100 = moyenne nationale) d'un ensemble de lignes */
function indice(ls) {
  const r = ls.map(l => l.kg / MOY_NAT[l.p]);
  return r.length ? 100 * mean(r) : null;
}

/* Couleur d'un indice : vert (moins cher) -> rouge (plus cher) */
function couleurIndice(v, min = 92, max = 112) {
  if (v == null) return '#eee';
  const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
  const a = [46, 125, 50], b = [250, 250, 250], c = [198, 40, 40];
  const mix = (x, y, k) => x.map((v, i) => Math.round(v + (y[i] - v) * k));
  const rgb = t < .5 ? mix(a, b, t * 2) : mix(b, c, (t - .5) * 2);
  return `rgb(${rgb.join(',')})`;
}

/* Paires petit format / grand format relevées dans le même magasin */
function pairesFormats() {
  const out = [];
  DATA.prixGF.forEach(([gf, m, prix, g]) => {
    const G = DATA.grandsFormats.find(x => x.id === gf);
    const petit = LIGNES.find(l => l.p === G.petit && l.m === m);
    if (!petit) return;
    const P = prod(G.petit);
    const gPetit = (mag(m).enseigne === 'Intermarché' && P.id === 12) ? 270 : P.g;
    const kgG = prix / g * 1000;
    out.push({ gf: G, petit: P, m, enseigne: mag(m).enseigne, ville: mag(m).ville,
      kgPetit: petit.kg, kgGrand: kgG, prixPetit: petit.prix, prixGrand: prix, gPetit, gGrand: g,
      ratioTaille: g / gPetit, baisse: kgG / petit.kg - 1 });
  });
  return out;
}

function option(sel, values, labelFn = v => v, all) {
  sel.innerHTML = (all ? `<option value="">${all}</option>` : '') + values.map(v => `<option value="${v}">${labelFn(v)}</option>`).join('');
}

/* =====================================================================
   MODÈLE COMMUN : prix au kilo, demande mesurée, rentabilité
   Paramètres : assets/config.js · Prix : DATA (relevé) · Demande : RESULTATS
   ===================================================================== */
const nb = x => Math.round(x).toLocaleString('fr-FR');
const G85 = prod(VICO).g;                 // poids du sachet relevé (85 g)
const G200 = CONFIG.POIDS_200;            // poids du format familial
const kgDe = (prix, g) => prix / g * 1000;
const KG85_GS = MOY_NAT[VICO];            // €/kg moyen du 85 g dans les magasins relevés
const PRIX85_GS = KG85_GS * G85 / 1000;   // prix moyen équivalent du sachet de 85 g
const ecartKg = (prix200, prix85) => kgDe(prix200, G200) / kgDe(prix85, G85) - 1;
const CIRCUITS = {
  proximite: { id: 'proximite', nom: 'Proximité', label: `Proximité (85 g à ${eur(CONFIG.PRIX_85_PROXIMITE)})`, coul: '#2e7d32' },
  gs: { id: 'gs', nom: 'Grande surface', label: 'Grande surface (85 g au prix moyen du relevé)', coul: '#c62828' }
};

/* Versions testées dans le questionnaire, écart au kilo recalculé */
const VERSIONS = RESULTATS.versions.map(v => ({ ...v, ecart: ecartKg(v.prix200, RESULTATS.prix85), part: v.choix200 / v.n }));
const partArr = v => Math.round(v.part * 100) / 100;   // part arrondie au point, comme affichée

/* Part mesurée pour un écart au kilo donné, sans extrapolation :
   on prend la version testée la plus favorable que le circuit égale ou dépasse
   (écarts comparés au point près). Plus cher au kilo que la version A : part de A = borne HAUTE. */
function partMesuree(ecart) {
  const e = Math.round(ecart * 100);
  const vs = [...VERSIONS].sort((a, b) => b.ecart - a.ecart); // A, B, C
  let v = vs[0];
  vs.forEach(x => { if (e <= Math.round(x.ecart * 100)) v = x; });
  return { part: partArr(v), version: v, borneHaute: e > Math.round(vs[0].ecart * 100) };
}

/* Marge de Vico sur un paquet */
function margePaquet(prix, g, emb, h = CONFIG) {
  const ht = prix / (1 + h.TVA), v = ht * (1 - h.MARGE_DISTRIB), fab = h.FABRICATION_KG * g / 1000, autres = h.AUTRES_FRAIS * v;
  return { prix, ht, v, fab, emb, autres, m: v - fab - emb - autres };
}

/* Modèle complet pour un circuit. opt : prix85, prix200, part (forcée), facteurDemande */
function modele(h = CONFIG, circuit = 'proximite', opt = {}) {
  const prix85 = opt.prix85 ?? (circuit === 'proximite' ? h.PRIX_85_PROXIMITE : PRIX85_GS);
  const prix200 = opt.prix200 ?? h.PRIX_CONNU_200;
  const a = margePaquet(prix200, G200, h.EMB_200, h), b = margePaquet(prix85, G85, h.EMB_85, h);
  const gain = a.m - h.CANNIBALISATION * b.m;
  const seuil = gain > 0 ? h.COUTS_FIXES / gain : Infinity;
  const partMin = seuil / h.VOLUME_REF * h.PART_REF;
  const ecart = ecartKg(prix200, prix85);
  const pm = partMesuree(ecart);
  const part = opt.part ?? pm.part;
  const volume = h.VOLUME_REF * part / h.PART_REF * (opt.facteurDemande ?? 1);
  return { circuit, prix85, prix200, a, b, gain, seuil, partMin, ecart, pm, part, volume,
    borneHaute: opt.part == null && pm.borneHaute, resultat: volume * gain - h.COUTS_FIXES };
}

/* Stress test : scénarios appliqués à un circuit */
function stressTest(h = CONFIG, circuit = 'proximite') {
  const pA = partArr(VERSIONS.find(v => v.id === 'A'));
  const sc = [
    ['Prévu', h, {}],
    ['Coût de fabrication +15 %', { ...h, FABRICATION_KG: h.FABRICATION_KG * 1.15 }, {}],
    ['Demande −30 %', h, { facteurDemande: 0.7 }],
    ['Cannibalisation = 1 (chaque 200 g remplace un 85 g)', { ...h, CANNIBALISATION: 1 }, {}],
    ['Marge du distributeur 35 %', { ...h, MARGE_DISTRIB: 0.35 }, {}],
    [`Part tombée à ${pcta(pA)} (niveau de la version A)`, h, { part: pA }],
    ['Cumul : coût +15 %, demande −30 %, cannibalisation 1', { ...h, FABRICATION_KG: h.FABRICATION_KG * 1.15, CANNIBALISATION: 1 }, { facteurDemande: 0.7 }]
  ];
  return sc.map(([nom, hh, o]) => ({ nom, r: modele(hh, circuit, o) }));
}

/* =====================================================================
   STATISTIQUES : khi² d'indépendance, V de Cramér
   ===================================================================== */
function khi2(t) {
  const R = t.map(r => r.reduce((a, b) => a + b, 0)), C = t[0].map((_, j) => t.reduce((a, r) => a + r[j], 0));
  const N = R.reduce((a, b) => a + b, 0);
  let x = 0;
  t.forEach((r, i) => r.forEach((o, j) => { const e = R[i] * C[j] / N; x += (o - e) ** 2 / e; }));
  const ddl = (t.length - 1) * (C.length - 1);
  return { x, ddl, N, p: pKhi2(x, ddl), V: Math.sqrt(x / (N * Math.min(t.length - 1, C.length - 1))) };
}
function erfc(x) {
  const t = 1 / (1 + 0.5 * Math.abs(x));
  const y = t * Math.exp(-x * x - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? y : 2 - y;
}
function pKhi2(x, ddl) { return ddl === 2 ? Math.exp(-x / 2) : ddl === 1 ? erfc(Math.sqrt(x / 2)) : NaN; }
const fp = p => p < 0.001 ? 'p < 0,001' : 'p = ' + fmt(p, p < 0.01 ? 4 : 2);
