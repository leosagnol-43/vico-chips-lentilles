/* Fonctions communes à toutes les pages */
const PAGES = [
  ['index.html', 'Accueil'],
  ['entreprise.html', "L'entreprise"],
  ['concurrents.html', 'Concurrents'],
  ['carte.html', 'Carte'],
  ['enseignes.html', 'Enseignes'],
  ['format-familial.html', 'Le prix du 200 g'],
  ['client.html', 'Le client'],
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
  n.innerHTML = PAGES.map(([h, t]) => `<a href="${h}"${h === here ? ' class="on"' : ''}>${t}</a>`).join('');
  document.querySelector('.wrap').prepend(n);
  filEtapes(here, n);
  remplirValeurs();
  listeASourcer();
  const f = document.createElement('footer');
  f.innerHTML = `Projet étudiant · M1 Marketing, IAE Clermont Auvergne · cours « Prix et budgets marketing » · Prix relevés le <a href="methodologie.html#releve">${DATA.date}</a> sur les sites drive de Carrefour, Auchan, E.Leclerc et Intermarché · Groupe : Souilmi, Moulin, Charras, Bousselham, Sagnol`;
  document.querySelector('.wrap').append(f);
}
document.addEventListener('DOMContentLoaded', nav);

/* Fil du raisonnement : les 4 étapes du dossier, affichées en haut des pages concernées */
const ETAPES = [
  { titre: "L'entreprise", question: 'Vico peut-elle se permettre de vendre moins cher ?', pages: ['entreprise.html'] },
  { titre: 'Le marché', question: 'Quel prix est logique pour un 200 g ?', pages: ['concurrents.html', 'carte.html', 'enseignes.html', 'format-familial.html'] },
  { titre: 'Le client', question: 'À ce prix, les clients choisissent-ils le 200 g ?', pages: ['client.html'] },
  { titre: 'La décision', question: 'Est-ce rentable, une fois les coûts payés ?', pages: ['decision.html'] }
];
function filEtapes(here, apres) {
  const i = ETAPES.findIndex(e => e.pages.includes(here));
  if (i < 0) return;
  const d = document.createElement('div');
  d.className = 'fil';
  d.innerHTML = `<div class="fil-etapes">${ETAPES.map((e, k) => `<a href="${e.pages[e.pages.length - 1]}" class="${k === i ? 'on' : k < i ? 'fait' : ''}"><span>${k + 1}</span>${e.titre}</a>`).join('')}</div>` +
    `<div class="fil-q">Étape ${i + 1} sur ${ETAPES.length} : <b>${ETAPES[i].question}</b></div>`;
  apres.after(d);
}

/* Chiffres des encarts explicatifs : tout élément <b data-v="clé"></b> reçoit la valeur calculée.
   decision.html rappelle cette fonction avec les valeurs des curseurs. */
function valeurs(r = modele(), h = CONFIG) {
  const pl = plancher(h), V = id => VERSIONS.find(v => v.id === id);
  return {
    p85: eur(PRIX85), kg85: eur(KG85) + '/kg', kg85b: eur(kgDe(PRIX85, G85)) + '/kg', p200: eur(r.prix200), kg200: eur(kgDe(r.prix200, G200)) + '/kg', g200: G200 + ' g',
    plafond: eur(PLAFOND), plancher: eur(pl.prix), tendance: eur(T_TOUS.prix), tchips: eur(T_CHIPS.prix), baisse: pcta(T_TOUS.baisse, 1),
    ecart: pcta(ecArr(r.ecart)), partA: pcta(partArr(V('A'))), partB: pcta(partArr(V('B'))), partC: pcta(partArr(V('C'))),
    ecartB: pcta(ecArr(V('B').ecart)), ecartC: pcta(ecArr(V('C').ecart)),
    v200: eur(r.a.v), ht200: eur(r.a.ht), distrib: eur(r.a.ht - r.a.v), tva: eur(r.a.prix - r.a.ht), fab200: eur(r.a.fab), emb200: eur(r.a.emb), autres200: eur(r.a.autres),
    m200: eur(r.a.m), m85: eur(r.b.m), can: fmt(h.CANNIBALISATION, 1), perte85: eur(h.CANNIBALISATION * r.b.m), gain: eur(r.gain),
    cf: nb(h.COUTS_FIXES) + ' €', seuil: nb(r.seuil), seuilk: nb(Math.round(r.seuil / 1000) * 1000), volume: nb(r.volume), pmin: pcta(r.partMin, 1), part: pcta(r.part),
    resultat: (r.resultat >= 0 ? '+' : '−') + nb(Math.abs(r.resultat)) + ' €', cumul3: (r.cumul3 >= 0 ? '+' : '−') + nb(Math.abs(r.cumul3)) + ' €',
    mois: fmt(r.moisRemb, 1), secu: pcta(1 - r.seuil / r.volume, 1), magsem: fmt(r.parMagSem, 1), n: VERSIONS.reduce((s, v) => s + v.n, 0),
    nmag: DATA.magasins.length, nvil: DATA.villes.length, ncomp: T_TOUS.n, ratio: fmt(G200 / G85, 2)
  };
}
function remplirValeurs(r, h) {
  const v = valeurs(r, h);
  document.querySelectorAll('[data-v]').forEach(e => { if (v[e.dataset.v] != null) e.textContent = v[e.dataset.v]; });
}

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
const eur = (x, d = 2) => x == null || isNaN(x) ? '–' : fmt(x, d) + ' €';
const pcta = (x, d = 0) => x == null || isNaN(x) ? '–' : fmt(Math.abs(x) * 100, d) + ' %';
const pct = (x, d = 0) => x == null || isNaN(x) ? '–' : (x > 0 ? '+' : '') + fmt(x * 100, d) + ' %';

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
   MODÈLE COMMUN : prix au kilo, tendance des concurrents, demande, rentabilité
   Paramètres : assets/config.js · Prix : DATA (relevé) · Demande : RESULTATS
   ===================================================================== */
const nb = x => Math.round(x).toLocaleString('fr-FR');
const G85 = prod(VICO).g;                 // poids du sachet relevé (85 g)
const G200 = CONFIG.POIDS_200;            // poids du format familial
const kgDe = (prix, g) => prix / g * 1000;
const ecartKg = (prix200, prix85) => kgDe(prix200, G200) / kgDe(prix85, G85) - 1;

/* Le 85 g en grande surface (relevé du 01/10/2026) */
const V85 = lignes({ p: VICO });
const PRIX85_BRUT = mean(V85.map(l => l.prix));          // moyenne des prix relevés
const PRIX85 = Math.round(PRIX85_BRUT * 100) / 100;      // arrondi au centime, comme une étiquette
const KG85 = MOY_NAT[VICO];                              // moyenne des prix au kilo relevés
const PLAFOND = KG85 * G200 / 1000;                      // 200 g au même prix au kilo que le 85 g

/* Tendance des concurrents : baisse du prix au kilo = b × ln(poids grand / poids petit),
   ajustée sur les paires petit / grand format relevées dans le même magasin */
function tendance(filtre = () => true) {
  const ps = pairesFormats().filter(filtre);
  const b = ps.reduce((s, x) => s + x.baisse * Math.log(x.ratioTaille), 0) / ps.reduce((s, x) => s + Math.log(x.ratioTaille) ** 2, 0);
  const baisse = b * Math.log(G200 / G85);
  return { n: ps.length, b, baisse, prix: KG85 * (1 + baisse) * G200 / 1000 };
}
const T_TOUS = tendance();
const T_CHIPS = tendance(x => /chips/i.test(x.petit.nom));

/* Versions testées dans le questionnaire : écart au kilo calculé sur les prix affichés */
const VERSIONS = RESULTATS.versions.map(v => ({ ...v, ecart: ecartKg(v.prix200, RESULTATS.prix85), part: v.choix200 / v.n }));
const partArr = v => Math.round(v.part * 100) / 100;   // part arrondie au point, comme affichée
const ecArr = e => Math.round(e * 100) / 100;          // écart arrondi au point

/* Part mesurée pour un écart au kilo donné, sans extrapolation : version testée la plus
   avantageuse que l'écart égale ou dépasse (au point près). Écart moins favorable que B :
   la demande n'a été mesurée qu'à prix au kilo égal (A). */
function partMesuree(ecart) {
  const e = Math.round(ecart * 100);
  const vs = [...VERSIONS].sort((a, b) => b.ecart - a.ecart); // A, B, C
  let v = vs[0];
  vs.forEach(x => { if (e <= Math.round(x.ecart * 100)) v = x; });
  return { part: partArr(v), version: v, exacte: vs.some(x => Math.round(x.ecart * 100) === e) };
}

/* Marge de Vico sur un paquet */
function margePaquet(prix, g, emb, h = CONFIG) {
  const ht = prix / (1 + h.TVA), v = ht * (1 - h.MARGE_DISTRIB), fab = h.FABRICATION_KG * g / 1000, autres = h.AUTRES_FRAIS * v;
  return { prix, ht, v, fab, emb, autres, m: v - fab - emb - autres };
}
/* Plancher : prix du 200 g en dessous duquel Vico perd de l'argent sur chaque paquet (marge = 0) */
function plancher(h = CONFIG) {
  const v = (h.FABRICATION_KG * G200 / 1000 + h.EMB_200) / (1 - h.AUTRES_FRAIS);
  return { v, prix: v / (1 - h.MARGE_DISTRIB) * (1 + h.TVA) };
}

/* Modèle complet. opt : prix200, part (forcée), facteurDemande (stress test) */
function modele(h = CONFIG, opt = {}) {
  const prix85 = PRIX85, prix200 = opt.prix200 ?? h.PRIX_200;
  const a = margePaquet(prix200, G200, h.EMB_200, h), b = margePaquet(prix85, G85, h.EMB_85, h);
  const gain = a.m - h.CANNIBALISATION * b.m;
  const seuil = gain > 0 ? h.COUTS_FIXES / gain : Infinity;
  const partMin = seuil / h.VOLUME_REF * h.PART_REF;
  const ecart = ecartKg(prix200, prix85);
  const pm = partMesuree(ecart);
  const part = opt.part ?? pm.part;
  const volume = h.VOLUME_REF * part / h.PART_REF * (opt.facteurDemande ?? 1);
  const margeAn = volume * gain;                          // marge gagnée chaque année
  // Sur 3 ans : les coûts de lancement ne sont payés qu'en année 1
  const annees = [1, 2, 3].map(n => ({ n, marge: margeAn, couts: n === 1 ? h.COUTS_FIXES : 0 }));
  let c = 0; annees.forEach(y => { y.resultat = y.marge - y.couts; y.cumul = (c += y.resultat); });
  return { prix85, prix200, a, b, gain, seuil, partMin, ecart, pm, part, volume, margeAn, annees,
    resultat: margeAn - h.COUTS_FIXES, cumul3: c,
    moisRemb: margeAn > 0 ? h.COUTS_FIXES / (margeAn / 12) : Infinity,   // mois de ventes pour rembourser le lancement
    parMagSem: volume / h.NB_MAGASINS / 52 };                           // sachets vendus par magasin et par semaine
}

/* Stress test */
function stressTest(h = CONFIG) {
  const sc = [
    ['Prévu', h, {}],
    ['Coût de fabrication +15 %', { ...h, FABRICATION_KG: h.FABRICATION_KG * 1.15 }, {}],
    ['Demande −30 %', h, { facteurDemande: 0.7 }],
    ['Cannibalisation = 1 (chaque 200 g remplace un 85 g)', { ...h, CANNIBALISATION: 1 }, {}],
    ['Marge du distributeur 35 %', { ...h, MARGE_DISTRIB: 0.35 }, {}],
    ['Cumul : coût +15 %, demande −30 %, cannibalisation 1', { ...h, FABRICATION_KG: h.FABRICATION_KG * 1.15, CANNIBALISATION: 1 }, { facteurDemande: 0.7 }],
    [`Volume ×2 (${fmt(modele(h).parMagSem * 2, 1)} sachets par magasin et par semaine)`, h, { facteurDemande: 2 }]
  ];
  return sc.map(([nom, hh, o]) => ({ nom, r: modele(hh, o) }));
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
