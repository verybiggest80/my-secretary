/* dx-data.js — Interactive diagnostic decision trees for electrolyte disorders.
   Structure follows standard UpToDate / clinical guideline algorithms.
   Each disorder = { title, subtitle, root, nodes:{ id:{ step, q, note, options:[{label,next}], dx, detail, tests:[] } } }
   A node with `options` renders as a question; a node with `dx` renders as an endpoint (may still branch).
   Optional: node.icon replaces the 🎯 on endpoints; option.info = true styles the button as a "view list" link. */
window.DxData = {

  /* ============ HYPONATREMIA ============ */
  /* 依 Fig. 15.17 Diagnostic approach to the hyponatremic patient */
  hypoNa: {
    title: "Hyponatremia",
    subtitle: "Serum Na\u207a < 135 mmol/L \u2014 diagnostic approach",
    root: "tonicity",
    nodes: {
      tonicity: {
        step: "Step 1",
        q: "Confirm a true hypoosmolar state",
        note: "First task: make sure the hyponatremia reflects hypoosmolality and is not pseudohyponatremia or translocational hyponatremia.",
        options: [
          { label: "Serum osmolality LOW (< 275 mOsm/kg) \u2014 true hypotonic hyponatremia", next: "volume" },
          { label: "Serum osmolality HIGH (> 295) \u2014 effective osmoles present", next: "translocational" },
          { label: "Serum osmolality NORMAL (275\u2013295)", next: "pseudo" }
        ]
      },
      translocational: {
        dx: "Translocational hyponatremia",
        detail: "Effective osmoles draw water out of cells and dilute serum Na\u207a.",
        tests: [
          "Hyperglycemia \u2014 correct Na\u207a ~ +1.6\u20132.4 mmol/L per 100 mg/dL glucose above 100",
          "Mannitol, sucrose (IVIG), maltose, glycine (TURP irrigation)",
          "Treat the underlying osmole; Na\u207a normalizes as it clears"
        ]
      },
      pseudo: {
        dx: "Pseudohyponatremia (lab artifact)",
        detail: "Displaced plasma water lowers the measured Na\u207a while Na\u207a activity is normal.",
        tests: [
          "Severe hyperlipidemia (high triglycerides / chylomicrons)",
          "Severe hyperproteinemia (multiple myeloma, IVIG)",
          "Confirm with a direct ion-selective electrode (whole-blood / blood-gas Na\u207a)"
        ]
      },
      volume: {
        step: "Step 2",
        q: "Assessment of volume status",
        note: "ECF volume assessment provides the most useful working classification \u2014 a low serum Na\u207a may occur with decreased, normal or increased total body sodium.",
        options: [
          { label: "Hypovolemia \u2014 \u2193 total body water, \u2193\u2193 total body sodium", next: "hypoUNa" },
          { label: "Euvolemia (no edema) \u2014 \u2191 total body water, total body sodium unchanged", next: "euUNa" },
          { label: "Hypervolemia \u2014 \u2191\u2191 total body water, \u2191 total body sodium", next: "hyperUNa" }
        ]
      },
      hypoUNa: {
        step: "Step 3",
        q: "Hypovolemic \u2014 urine Na\u207a",
        options: [
          { label: "U[Na] > 30 mmol/L", next: "renalLoss" },
          { label: "U[Na] < 30 mmol/L", next: "extraRenal" }
        ]
      },
      renalLoss: {
        dx: "Renal losses",
        tests: [
          "Diuretic excess (thiazides especially; consider surreptitious use)",
          "Mineralocorticoid deficiency",
          "Salt-losing nephropathy",
          "Bicarbonaturia with RTA and metabolic alkalosis",
          "Cerebral salt wasting",
          "Treatment: isotonic saline / solute repletion \u2014 watch for brisk water diuresis and over-correction once the stimulus is removed"
        ]
      },
      extraRenal: {
        dx: "Extrarenal losses",
        detail: "U[Na] < 30 reflects an appropriate renal response to volume depletion.",
        tests: [
          "Vomiting, diarrhea",
          "Third spacing of fluids: burns, pancreatitis, trauma (also ileus, muscle injury)",
          "Treatment: isotonic saline / solute repletion; monitor Na\u207a closely for over-correction"
        ]
      },
      euUNa: {
        step: "Step 3",
        q: "Euvolemic \u2014 urine Na\u207a (typically > 30 mmol/L)",
        note: "Urine osmolality then separates the AVP-driven causes from those with suppressed AVP.",
        options: [
          { label: "Urine osmolality > 100 mOsm/kg (AVP acting)", next: "euAVP" },
          { label: "Urine osmolality < 100 mOsm/kg (AVP suppressed)", next: "euDilute" }
        ]
      },
      euAVP: {
        dx: "Euvolemic hyponatremia with AVP effect",
        detail: "Exclude glucocorticoid deficiency and hypothyroidism before settling on SIADH.",
        tests: [
          "Glucocorticoid deficiency (check AM cortisol / ACTH stimulation)",
          "Hypothyroidism (TSH, free T4)",
          "Stress; pain, nausea, postoperative state",
          "Drugs: desmopressin, chlorpropamide, carbamazepine/oxcarbazepine, SSRIs, antipsychotics, vincristine/cyclophosphamide, MDMA, opioids",
          "SIADH \u2014 hypoosmolality with urine > 100 mOsm/kg; the most common cause of hyponatremia in hospitalized patients (diagnosis of exclusion)",
          "Exercise-associated hyponatremia (marathon/ultra-endurance; excess hypotonic intake + nonosmotic AVP)"
        ],
        link: { id: "siadh", label: "SIADH 治療", sub: "限水・vaptan・urea・長期治療" }
      },
      euDilute: {
        dx: "Euvolemic with maximally dilute urine",
        detail: "Water intake or low solute intake overwhelms a normal diluting mechanism (urine osmolality < 100 mOsm/kg).",
        tests: [
          "Primary polydipsia",
          "Low solute intake \u2014 beer potomania, 'tea-and-toast', ovolactovegetarian or poor-appetite diets",
          "Treatment: restrict water intake; increase dietary solute/protein"
        ]
      },
      hyperUNa: {
        step: "Step 3",
        q: "Hypervolemic \u2014 urine Na\u207a",
        note: "Except in renal failure these states show avid Na\u207a retention (U[Na] often < 10) \u2014 which diuretics may mask.",
        options: [
          { label: "U[Na] > 30 mmol/L", next: "renalFail" },
          { label: "U[Na] < 30 mmol/L", next: "edematous" }
        ]
      },
      renalFail: {
        dx: "Acute or chronic renal failure",
        tests: [
          "Impaired free-water excretion; concurrent diuretics",
          "Treatment: fluid restriction; renal replacement therapy if refractory"
        ]
      },
      edematous: {
        dx: "Edematous states \u2014 decreased effective arterial volume",
        tests: [
          "Nephrotic syndrome",
          "Cirrhosis",
          "Cardiac failure",
          "Treatment: treat the underlying disease; Na\u207a + fluid restriction, loop diuretic; vaptan often the best option in heart failure"
        ]
      }
    }
  },

  /* ============ HYPERNATREMIA ============ */
  hyperNa: {
    title: "Hypernatremia",
    subtitle: "Serum Na⁺ > 145 mmol/L",
    root: "access",
    nodes: {
      access: {
        step: "Step 1",
        q: "Almost always a free-water deficit — is water access/thirst impaired?",
        note: "Sustained hypernatremia implies no access to water or defective thirst (infants, intubated, elderly, altered mental status).",
        options: [
          { label: "Proceed to urine osmolality", next: "uosm" }
        ]
      },
      uosm: {
        step: "Step 2",
        q: "Urine osmolality",
        options: [
          { label: "> 700 mOsm/kg (concentrated)", next: "concentrated" },
          { label: "300–700 mOsm/kg", next: "partial" },
          { label: "< 300 mOsm/kg (dilute)", next: "ddavp" }
        ]
      },
      concentrated: {
        step: "Step 3",
        q: "Concentrated urine (renal response intact) — check urine Na⁺",
        options: [
          { label: "Low U-Na (pure water loss)", next: "waterLoss" },
          { label: "High U-Na (Na⁺ gain)", next: "naGain" }
        ]
      },
      waterLoss: {
        dx: "Extrarenal water loss",
        tests: [
          "Insensible: fever, burns, ventilation, heat exposure",
          "GI: osmotic diarrhea, lactulose, vomiting/NG suction",
          "Inadequate intake with ongoing losses",
          "Management: replace free-water deficit; correct ≤ 10–12 mmol/L per 24 h to avoid cerebral edema"
        ]
      },
      naGain: {
        dx: "Sodium overload (hypervolemic)",
        tests: [
          "Hypertonic saline / sodium bicarbonate infusion",
          "Hypertonic feeds / salt ingestion",
          "Mineralocorticoid excess (primary hyperaldosteronism, Cushing)",
          "Management: stop Na⁺ source; D5W ± loop diuretic"
        ]
      },
      partial: {
        dx: "Osmotic diuresis or partial DI",
        detail: "Intermediate urine osmolality with high urine output.",
        tests: [
          "Osmotic diuresis: hyperglycemia/glucosuria, high urea (post-AKI, high-protein feeds), mannitol",
          "Partial central or nephrogenic DI",
          "Measure urine glucose, urea, and 24-h osmole excretion (> 900 mOsm/day suggests osmotic diuresis)"
        ]
      },
      ddavp: {
        step: "Step 3",
        q: "Dilute urine → Diabetes insipidus. Desmopressin (DDAVP) challenge: give DDAVP, recheck urine osmolality",
        options: [
          { label: "U-Osm rises > 50% → responsive", next: "centralDI" },
          { label: "U-Osm rises < 50% → no response", next: "nephroDI" }
        ]
      },
      centralDI: {
        dx: "Central diabetes insipidus (ADH deficiency)",
        tests: [
          "Causes: pituitary/hypothalamic surgery or tumor, trauma, infiltrative (sarcoid, histiocytosis), idiopathic/autoimmune",
          "Brain MRI (pituitary); assess anterior pituitary axis",
          "Management: desmopressin; free-water replacement"
        ]
      },
      nephroDI: {
        dx: "Nephrogenic diabetes insipidus (ADH resistance)",
        tests: [
          "Drugs: lithium, demeclocycline, foscarnet, amphotericin B, cidofovir",
          "Electrolyte: hypercalcemia, severe hypokalemia",
          "Intrinsic: post-obstructive, recovery from ATN, sickle cell, Sjögren",
          "Management: treat cause; low-salt diet, thiazide ± amiloride, adequate water"
        ]
      }
    }
  },

  /* ============ HYPERCALCEMIA ============ */
  hyperCa: {
    title: "Hypercalcemia",
    subtitle: "Corrected Ca²⁺ > 10.5 mg/dL (verify with ionized Ca²⁺)",
    root: "pth",
    nodes: {
      pth: {
        step: "Step 1",
        q: "Measure intact PTH",
        note: "The single most useful branch point — PTH-dependent vs PTH-independent.",
        options: [
          { label: "High or inappropriately normal PTH", next: "pthDep" },
          { label: "Low / suppressed PTH", next: "pthIndep" }
        ]
      },
      pthDep: {
        step: "Step 2",
        q: "PTH-dependent — check 24-h urine Ca²⁺ (Ca/Cr clearance ratio)",
        options: [
          { label: "Normal/high urine Ca²⁺", next: "phpt" },
          { label: "Low urine Ca²⁺ (ratio < 0.01)", next: "fhh" }
        ]
      },
      phpt: {
        dx: "Primary (or tertiary) hyperparathyroidism",
        tests: [
          "Primary HPT: adenoma > hyperplasia; commonest cause of outpatient hypercalcemia",
          "Tertiary HPT: autonomous glands in long-standing CKD",
          "Consider lithium- or thiazide-associated hypercalcemia (often normalizes off drug)",
          "Localize: neck ultrasound, sestamibi/4D-CT if surgery planned"
        ]
      },
      fhh: {
        dx: "Familial hypocalciuric hypercalcemia (FHH)",
        tests: [
          "Calcium-sensing receptor (CASR) mutation; benign, autosomal dominant",
          "Urine Ca/Cr clearance ratio < 0.01, often family history, mild lifelong hypercalcemia",
          "Confirm with CASR genetic testing — avoid unnecessary parathyroidectomy"
        ]
      },
      pthIndep: {
        step: "Step 2",
        q: "PTH-independent — check PTHrP and vitamin D metabolites",
        options: [
          { label: "PTHrP elevated", next: "humoral" },
          { label: "1,25-(OH)₂ vitamin D elevated", next: "calcitriol" },
          { label: "25-OH vitamin D elevated", next: "vitDtox" },
          { label: "All low", next: "otherMal" }
        ]
      },
      humoral: {
        dx: "Humoral hypercalcemia of malignancy (PTHrP)",
        tests: [
          "Squamous cell (lung, head & neck), renal, bladder, breast, ovarian carcinoma",
          "Suppressed PTH, elevated PTHrP",
          "Management: IV fluids, bisphosphonate/denosumab, treat malignancy"
        ]
      },
      calcitriol: {
        dx: "Excess 1,25-(OH)₂ vitamin D (calcitriol)",
        tests: [
          "Granulomatous disease: sarcoidosis, TB, fungal (extrarenal 1α-hydroxylase)",
          "Lymphoma (Hodgkin / non-Hodgkin)",
          "Management: glucocorticoids often effective"
        ]
      },
      vitDtox: {
        dx: "Vitamin D intoxication",
        tests: [
          "Excess cholecalciferol/ergocalciferol supplementation",
          "High 25-OH vitamin D level",
          "Management: stop supplement, IV fluids, ± glucocorticoids"
        ]
      },
      otherMal: {
        dx: "Other PTH-independent causes",
        tests: [
          "Osteolytic bone metastases / multiple myeloma (check SPEP/FLC, skeletal survey)",
          "High bone turnover: thyrotoxicosis, immobilization, vitamin A toxicity",
          "Milk-alkali syndrome",
          "Adrenal insufficiency, pheochromocytoma (rare)"
        ]
      }
    }
  },

  /* ============ HYPOCALCEMIA ============ */
  hypoCa: {
    title: "Hypocalcemia",
    subtitle: "Corrected Ca²⁺ < 8.5 mg/dL (confirm with ionized Ca²⁺)",
    root: "confirm",
    nodes: {
      confirm: {
        step: "Step 1",
        q: "Confirm true hypocalcemia",
        note: "Correct for albumin (+0.8 mg/dL per 1 g/dL below 4.0) or measure ionized Ca²⁺.",
        options: [
          { label: "True hypocalcemia confirmed → check PTH", next: "pth" }
        ]
      },
      pth: {
        step: "Step 2",
        q: "Measure intact PTH",
        options: [
          { label: "Low / inappropriately normal PTH", next: "hypoPTH" },
          { label: "High PTH (secondary response)", next: "highPTH" }
        ]
      },
      hypoPTH: {
        step: "Step 3",
        q: "Hypoparathyroidism — check magnesium first",
        options: [
          { label: "Low Mg²⁺", next: "hypoMg" },
          { label: "Normal Mg²⁺", next: "trueHypoPTH" }
        ]
      },
      hypoMg: {
        dx: "Hypomagnesemia-induced hypocalcemia",
        detail: "Mg²⁺ depletion causes functional hypoparathyroidism + PTH resistance.",
        tests: [
          "Causes: PPIs, diuretics, alcoholism, diarrhea, cisplatin, aminoglycosides",
          "Ca²⁺ will not correct until Mg²⁺ is repleted",
          "Management: replace magnesium"
        ]
      },
      trueHypoPTH: {
        dx: "Hypoparathyroidism",
        tests: [
          "Post-surgical (thyroid/parathyroid/neck) — most common",
          "Autoimmune (isolated or APS-1), infiltrative, radiation",
          "Congenital (DiGeorge / 22q11 deletion), activating CASR mutation",
          "Typically low PTH, low Ca²⁺, high phosphate"
        ]
      },
      highPTH: {
        step: "Step 3",
        q: "Secondary hyperparathyroidism — check phosphate & renal function",
        options: [
          { label: "High phosphate", next: "highPhos" },
          { label: "Low / normal phosphate", next: "lowPhos" }
        ]
      },
      highPhos: {
        dx: "High-phosphate hypocalcemia (high PTH)",
        tests: [
          "Chronic kidney disease (↓ 1,25-vitamin D, phosphate retention) — most common",
          "Pseudohypoparathyroidism (PTH resistance; high PTH, high phosphate, normal renal function)",
          "Acute phosphate load: tumor lysis, rhabdomyolysis, phosphate enema",
          "Management: correct per underlying cause; phosphate binders in CKD"
        ]
      },
      lowPhos: {
        dx: "Vitamin D deficiency / other (high PTH)",
        tests: [
          "Vitamin D deficiency or malabsorption (low 25-OH vitamin D)",
          "Acute complexing: pancreatitis, citrate (massive transfusion), 'hungry bone' post-parathyroidectomy",
          "Sepsis/critical illness",
          "Management: calcium ± active vitamin D; treat cause"
        ]
      }
    }
    },

  /* ============ POLYURIA ============ */
  polyuria: {
    title: "Polyuria",
    subtitle: "Work-up of polyuria & polydipsia (DI vs primary polydipsia)",
    root: "confirm",
    nodes: {
      confirm: {
        step: "Step 1",
        q: "Confirm true hypotonic polyuria (24-hour urine collection)",
        note: "Accepted thresholds: 24-h urine volume > 50 mL/kg body weight with urine osmolality < 300 mOsm/kg H\u2082O.",
        options: [
          { label: "Meets both criteria", next: "solute" },
          { label: "Does not meet criteria", next: "notTrue" }
        ]
      },
      notTrue: {
        dx: "Not true hypotonic polyuria",
        detail: "Re-examine the complaint before pursuing DI testing.",
        tests: [
          "Urinary frequency / nocturia without increased volume (UTI, overactive bladder, BPH)",
          "Volume < 50 mL/kg/day \u2014 quantify with a repeat, properly collected 24-h sample",
          "Urine osmolality \u2265 300 mOsm/kg \u2014 evaluate as a solute diuresis instead"
        ]
      },
      solute: {
        step: "Step 2",
        q: "Exclude a solute (osmotic) diuresis",
        note: "Solute excretion rate = urine osmolality \u00d7 24-h urine volume (L). > 15 mOsm/kg body weight/day indicates osmotic diuresis. Also screen routine labs and urinalysis for glucose and intrinsic renal disease.",
        options: [
          { label: "Solute excretion > 15 mOsm/kg/day \u2014 osmotic diuresis", next: "osmotic" },
          { label: "Solute excretion \u2264 15 mOsm/kg/day \u2014 water diuresis", next: "posm" }
        ]
      },
      osmotic: {
        dx: "Osmotic (solute) diuresis \u2014 not diabetes insipidus",
        tests: [
          "Glucose: uncontrolled diabetes mellitus / glycosuria (urinalysis)",
          "Urea: recovery phase of AKI, post-obstructive diuresis, high-protein feeds",
          "Mannitol, radiocontrast, saline loading",
          "Intrinsic renal disease impairing concentration"
        ]
      },
      posm: {
        step: "Step 3",
        q: "Assess plasma osmolality / serum Na\u207a",
        note: "Diagnosis of DI requires an osmotic stimulus to AVP secretion, then measuring the adequacy of that secretion (plasma AVP or copeptin) or its renal effect (urine osmolality).",
        options: [
          { label: "Already hyperosmolar (P-Osm > 295 or Na\u207a > 145) with U-Osm < 800", next: "hyperDI" },
          { label: "Normal plasma osmolality & Na\u207a (intact thirst: polyuria + polydipsia)", next: "deprive" }
        ]
      },
      hyperDI: {
        dx: "Diabetes insipidus confirmed \u2014 primary polydipsia excluded",
        detail: "Hyperosmolality with submaximally concentrated urine rules out primary polydipsia. Now separate central from nephrogenic DI.",
        tests: [
          "\u26a0\ufe0f Draw plasma AVP (or copeptin) BEFORE giving desmopressin \u2014 it is needed if the response turns out indeterminate",
          "Give AVP 5 units SC, or preferably desmopressin (DDAVP) 1\u20132 \u00b5g SC/IV",
          "Recheck urine osmolality at 1\u20132 hours"
        ],
        options: [ { label: "Proceed to desmopressin challenge", next: "ddavp" } ]
      },
      deprive: {
        step: "Step 4",
        q: "Combined fluid deprivation test (indirect + direct)",
        note: "Deprive until P-Osm > 295 mOsm/kg or Na\u207a > 145 mmol/L, measuring urine osmolality and plasma AVP/copeptin, then give desmopressin. Absolute U-Osm values overlap between partial CDI, partial NDI and primary polydipsia \u2014 interpret AVP/copeptin plotted against the concurrent plasma osmolality.",
        options: [
          { label: "Urine concentrates appropriately; little/no further rise after desmopressin", next: "pp" },
          { label: "U-Osm stays low; AVP\u00b7copeptin absent or blunted for the P-Osm; rises after desmopressin", next: "cdi" },
          { label: "U-Osm stays low; AVP\u00b7copeptin clearly elevated; no rise after desmopressin", next: "ndi" },
          { label: "Overlapping / partial responses \u2014 indeterminate", next: "indet" }
        ]
      },
      ddavp: {
        step: "Step 5",
        q: "Desmopressin challenge \u2014 rise in urine osmolality at 1\u20132 hours",
        note: "Water diuresis in CDI washes out the medullary gradient and downregulates AQP2, so the early rise may be smaller than expected.",
        options: [
          { label: "Increase > 50%", next: "cdi" },
          { label: "Increase < 10%", next: "ndi" },
          { label: "Increase 10\u201350% (indeterminate)", next: "indet" }
        ]
      },
      cdi: {
        dx: "Central diabetes insipidus (AVP deficiency)",
        tests: [
          "Plasma AVP/copeptin absent (complete) or blunted (partial) relative to plasma osmolality",
          "MRI: loss of the posterior pituitary bright spot supports CDI \u2014 better at ruling OUT than ruling IN (absent in up to 20% of normal older subjects; may persist in partial CDI)",
          "Pituitary stalk > 2\u20133 mm is pathologic \u2192 CSF/plasma \u03b2-hCG & AFP (germinoma), ACE + chest imaging (sarcoidosis), bone/skin survey (histiocytosis)",
          "If in doubt repeat MRI every 3\u20136 months: progressive enlargement suggests germinoma (biopsy); shrinkage suggests lymphocytic infundibuloneurohypophysitis",
          "Treatment: desmopressin"
        ]
      },
      ndi: {
        dx: "Nephrogenic diabetes insipidus (renal resistance to AVP)",
        tests: [
          "Plasma AVP/copeptin clearly elevated for the plasma osmolality",
          "Drugs: lithium, demeclocycline, foscarnet, amphotericin B, cidofovir",
          "Electrolytes: hypercalcemia, severe hypokalemia",
          "Renal: post-obstructive, recovery from ATN, sickle cell, Sj\u00f6gren; congenital AVPR2 / AQP2 mutations",
          "Treatment: remove the cause; low-solute diet, thiazide \u00b1 amiloride, free access to water"
        ]
      },
      pp: {
        dx: "Primary polydipsia",
        tests: [
          "AVP/copeptin response to osmotic stimulation is within or above the normal range",
          "Maximal concentrating capacity may be blunted by chronic overhydration \u2014 relate U-Osm to AVP under basal, non-dehydrated conditions",
          "Posterior pituitary bright spot is usually preserved on MRI",
          "Look for psychiatric illness, dry mouth/medications, hypothalamic lesions (sarcoidosis, TB meningitis)",
          "Treatment: water restriction. \u26a0\ufe0f Desmopressin can precipitate severe hyponatremia"
        ]
      },
      indet: {
        dx: "Indeterminate result \u2014 refine with copeptin, then a trial",
        detail: "Overlap is expected because concentrating capacity is variably reduced in all forms of DI and in primary polydipsia; basal P-Osm and Na\u207a overlap too.",
        tests: [
          "Interpret the baseline plasma AVP/copeptin drawn before desmopressin: elevated \u2192 NDI; absent/blunted for the P-Osm \u2192 CDI",
          "Copeptin (C-terminal fragment of the AVP prohormone, released 1:1 with AVP) measured at the end of water deprivation is more accurate than the indirect U-Osm response \u2014 but must be sampled during hyperosmolality (water deprivation or hypertonic saline)",
          "After hypertonic saline, urine osmolality and AVP excretion are unreliable (accompanying solute diuresis)",
          "Note: certain diseases (sarcoidosis, TB meningitis, hypothalamic lesions) can cause more than one type of DI"
        ],
        options: [ { label: "Still unclear \u2192 monitored therapeutic desmopressin trial", next: "trial" } ]
      },
      trial: {
        dx: "Monitored desmopressin therapeutic trial (48\u201372 h)",
        tests: [
          "Polyuria AND thirst/polydipsia abolished, no water intoxication \u2192 uncomplicated central DI",
          "Polyuria abolished but thirst/polydipsia persist and hyponatremia develops \u2192 primary polydipsia",
          "No effect even when given by injection \u2192 nephrogenic DI",
          "\u26a0\ufe0f Check serum Na\u207a within a few days to avoid severe hyponatremia"
        ]
      }
    }
  },

  /* ============ HYPERKALEMIA ============ */
  /* 依 Ch17 Disorders of Potassium Balance — Fig. 17.15 The clinical approach to hyperkalemia */
  hyperK: {
    title: "Hyperkalemia",
    subtitle: "Serum K⁺ ≥ 5.5 mmol/L — clinical approach (Fig. 17.15)",
    root: "emerg",
    nodes: {
      emerg: {
        step: "Step 1",
        q: "Does the patient need emergency therapy?",
        note: "K⁺ ≥ 6.0 mmol/L or any ECG change → treat first, then come back for the work-up.",
        options: [
          { label: "Yes — K⁺ ≥ 6.0 or ECG changes", next: "emergTx" },
          { label: "No", next: "pseudo" }
        ]
      },
      emergTx: {
        icon: "🚨",
        dx: "Emergency therapy",
        detail: "12-lead ECG and admission with continuous ECG monitoring. Treat in three steps:",
        tests: [
          "① Stabilize the myocardium — 10% calcium gluconate 10 mL IV over 2–3 min (onset 1–3 min, lasts 30–60 min); repeat if the ECG does not improve. On digoxin: dilute in 100 mL D5W over 20–30 min. Never give in a bicarbonate-containing line.",
          "② Shift K⁺ into cells — regular insulin 10 U IV + 50 mL D50W (25 g glucose): onset 10–20 min, peak 30–60 min, lasts 4–6 h, lowers K⁺ 0.5–1.2 mmol/L. Watch for hypoglycemia (D10W 50–75 mL/h); if glucose ≥ 200–250 mg/dL give insulin without glucose.",
          "② Nebulized albuterol 10–20 mg over 10 min — additive to insulin, but never use alone (20–40% of ESKD patients do not respond).",
          "② Sodium bicarbonate — no acute K⁺-lowering effect; consider (isotonic) only with severe acidemia.",
          "③ Remove K⁺ — loop (± thiazide) diuretic if the patient still makes urine.",
          "③ K⁺ binders — patiromer or sodium zirconium cyclosilicate preferred over SPS (SPS works only after ≥ 4–6 h and risks intestinal necrosis).",
          "③ Hemodialysis — definitive removal in advanced kidney failure or refractory hyperkalemia."
        ],
        options: [{ label: "Continue the work-up → pseudohyperkalemia?", next: "pseudo" }]
      },

      pseudo: {
        step: "Step 2",
        q: "Could this be pseudohyperkalemia?",
        note: "Artifactual K⁺ release during or after venipuncture. Tap the list to review the causes.",
        options: [
          { label: "📋 Causes of pseudohyperkalemia", next: "pseudoCauses", info: true },
          { label: "Yes — pseudohyperkalemia", next: "pseudoYes" },
          { label: "No — true hyperkalemia", next: "hx" }
        ]
      },
      pseudoCauses: {
        icon: "📋",
        dx: "Causes of pseudohyperkalemia",
        tests: [
          "Fist clenching, forearm contraction or tourniquet during the draw",
          "Thrombocytosis, leukocytosis or erythrocytosis (K⁺ released from blood cells)",
          "Acute anxiety → hyperventilation (respiratory alkalosis) at venipuncture",
          "K⁺-EDTA contamination of the sample (clue: spuriously low Ca²⁺ / Mg²⁺)",
          "Pneumatic-tube transport (e.g., leukemia with marked leukocytosis)",
          "Cooling of the blood before cells are separated (seasonal swings in off-site samples)",
          "Hereditary red-cell K⁺ leak — familial pseudohyperkalemia / stomatocytosis"
        ],
        options: [
          { label: "Yes — pseudohyperkalemia", next: "pseudoYes" },
          { label: "No — true hyperkalemia", next: "hx" }
        ]
      },
      pseudoYes: {
        icon: "✅",
        dx: "Pseudohyperkalemia — no further action",
        detail: "Repeat a carefully drawn sample: no fist clenching, brief tourniquet, prompt processing without cooling.",
        tests: ["With very high cell counts, compare with a plasma (heparinized) or blood-gas K⁺"]
      },

      hx: {
        step: "Step 3",
        q: "History, physical examination & basic laboratory tests",
        note: "Ask about medications, diet & supplements (salt substitutes), kidney-failure risk and urine output; check BP and volume status. Labs: electrolytes, urea, creatinine, plasma Osm, Mg²⁺, Ca²⁺, CBC; urine pH, Osm, creatinine & electrolytes.",
        options: [
          { label: "💊 Medication history — drugs that raise K⁺", next: "meds", info: true },
          { label: "Evidence of increased potassium load", next: "load" },
          { label: "Evidence of transcellular shift", next: "shift" },
          { label: "Neither — check urinary K⁺ excretion", next: "uk" }
        ]
      },
      meds: {
        icon: "💊",
        dx: "Medications that cause hyperkalemia",
        detail: "Risk is highest with CKD, diabetes, heart failure, older age and drug combinations (e.g., TMP-SMX with an ACE-I, ARB or spironolactone).",
        tests: [
          "K⁺ load — KCl supplements or over-replacement, K⁺ penicillin, salt substitutes, herbal remedies",
          "Shift out of cells — β-blockers (esp. labetalol), digoxin toxicity, succinylcholine, ε-aminocaproic acid, arginine/lysine infusion, mannitol or hypertonic saline, octreotide, K_ATP openers (cyclosporine, isoflurane, nicorandil)",
          "↓ Renin / aldosterone — NSAIDs & COX-2 inhibitors, β-blockers, aliskiren, ACE inhibitors, ARBs, heparin & LMWH, ketoconazole",
          "Mineralocorticoid-receptor blockade — spironolactone, eplerenone, canrenone, drospirenone (oral contraceptive)",
          "ENaC blockade — amiloride, triamterene, trimethoprim (TMP-SMX), pentamidine, nafamostat",
          "Calcineurin inhibitors (cyclosporine, tacrolimus) — several mechanisms: ↓ renin/aldosterone, ↓ distal K⁺ secretion and K⁺ shift"
        ]
      },
      load: {
        icon: "📋",
        dx: "Increased potassium load",
        detail: "Even a small load can cause marked hyperkalemia when renal excretion is impaired.",
        tests: [
          "Exogenous — KCl supplements or over-replacement, K⁺-containing drugs (K⁺ penicillin), salt substitutes, herbal/alternative remedies & diets, high-K⁺ foods, large volumes of sports drinks",
          "Pica in dialysis patients — K⁺-rich clay, burnt matchsticks",
          "Red-cell transfusion — massive or rapid transfusion, central or pressure infusion, irradiated or old stored blood",
          "Endogenous release — rhabdomyolysis, acute tumor lysis, severe trauma"
        ],
        options: [
          { label: "🥗 High-potassium foods", next: "foods", info: true },
          { label: "Yes → treat accordingly & re-evaluate", next: "loadYes" },
          { label: "No → look for transcellular shift", next: "shift" }
        ]
      },
      foods: {
        icon: "🥗",
        dx: "Foods with high potassium content",
        tests: [
          "Highest (> 1000 mg / 100 g) — dried figs, molasses, seaweed",
          "Very high (> 500 mg / 100 g) — dried fruits (dates, prunes), nuts, avocados, bran cereals, wheat germ, lima beans",
          "High (> 250 mg / 100 g), vegetables — spinach, tomatoes, broccoli, winter squash, beets, carrots, cauliflower, potatoes",
          "High (> 250 mg / 100 g), fruits — bananas, cantaloupe, kiwis, oranges, mangos",
          "High (> 250 mg / 100 g), meats — ground beef, steak, pork, veal, lamb"
        ]
      },
      loadYes: {
        icon: "🔁",
        dx: "Treat accordingly and re-evaluate",
        detail: "Stop the exogenous source or treat the tissue breakdown, then recheck K⁺.",
        options: [{ label: "Still high → check urinary K⁺ excretion", next: "uk" }]
      },
      shift: {
        icon: "📋",
        dx: "Transcellular shift (K⁺ moves out of cells)",
        tests: [
          "Hypertonicity — mannitol, hypertonic saline, hyperglycemia, IV contrast in CKD/dialysis patients",
          "Insulin deficiency — uncontrolled diabetes / DKA, prolonged fasting in dialysis patients, octreotide",
          "Metabolic acidosis (non-organic / mineral acid)",
          "Drugs — digoxin, β-blockers, succinylcholine (burns, denervation, prolonged immobilization), ε-aminocaproic acid, arginine/lysine infusion, K_ATP openers (cyclosporine, isoflurane, nicorandil)",
          "Toxins — cane-toad venom (some herbal aphrodisiacs), fluoride poisoning",
          "Exercise (usually transient)",
          "Hyperkalemic periodic paralysis"
        ],
        options: [
          { label: "Yes → treat accordingly & re-evaluate", next: "shiftYes" },
          { label: "No → check urinary K⁺ excretion", next: "uk" }
        ]
      },
      shiftYes: {
        icon: "🔁",
        dx: "Treat accordingly and re-evaluate",
        detail: "Correct the cause of the shift (e.g., insulin, stop the drug, treat the acidosis), then recheck K⁺.",
        options: [{ label: "Still high → check urinary K⁺ excretion", next: "uk" }]
      },

      uk: {
        step: "Step 4",
        q: "Decreased urinary K⁺ excretion (< 40 mmol/day) — check urine electrolytes",
        note: "Urine Na⁺ shows whether distal Na⁺ delivery is limiting K⁺ secretion.",
        options: [
          { label: "Urine Na⁺ < 25 mmol/L", next: "distalNa" },
          { label: "Urine Na⁺ ≥ 25 mmol/L → calculate TTKG", next: "ttkg" }
        ]
      },
      distalNa: {
        dx: "Decreased distal Na⁺ delivery",
        detail: "Prerenal physiology limits distal Na⁺ delivery and flow, so K⁺ secretion falls.",
        tests: [
          "Volume depletion",
          "Heart failure (low effective circulating volume)",
          "Correct the prerenal state, then reassess K⁺ and urine Na⁺"
        ]
      },
      ttkg: {
        step: "Step 5",
        q: "Transtubular K⁺ gradient (TTKG)",
        note: "TTKG = (urine K⁺ ÷ plasma K⁺) ÷ (urine Osm ÷ plasma Osm). Expected > 6–7 during hyperkalemia; 5–8 is borderline. Interpret only when urine Na⁺ ≥ 25 mmol/L and urine Osm ≥ plasma Osm.",
        options: [
          { label: "TTKG > 8", next: "flow" },
          { label: "TTKG < 5", next: "fludro" }
        ]
      },
      flow: {
        dx: "Reduced tubular flow",
        detail: "Distal K⁺ secretion is working (high TTKG), but too little flow / GFR limits total K⁺ excretion.",
        tests: [
          "Advanced kidney failure (GFR ≤ 20 mL/min)",
          "Reduced effective circulating volume (ECV)"
        ]
      },
      fludro: {
        step: "Step 6",
        q: "Reduced distal K⁺ secretion (GFR > 20 mL/min) — fludrocortisone test",
        note: "Give fludrocortisone and repeat the TTKG after a few hours; plasma renin and aldosterone also help.",
        options: [
          { label: "TTKG still < 8 → tubular resistance", next: "resist" },
          { label: "TTKG rises to ≥ 8 → low aldosterone", next: "renin" }
        ]
      },
      resist: {
        dx: "Tubular resistance to aldosterone",
        tests: [
          "Drugs — amiloride, triamterene, spironolactone, eplerenone, trimethoprim, pentamidine, calcineurin inhibitors",
          "Tubulointerstitial diseases",
          "Urinary tract obstruction",
          "Pseudohypoaldosteronism type I and type II",
          "Sickle cell disease",
          "SLE",
          "Renal transplant"
        ]
      },
      renin: {
        step: "Step 7",
        q: "Low aldosterone — what is the plasma renin?",
        options: [
          { label: "High renin", next: "highRenin" },
          { label: "Low renin", next: "lowRenin" }
        ]
      },
      highRenin: {
        dx: "Low aldosterone with high renin",
        tests: [
          "Primary adrenal insufficiency (autoimmune Addison disease, adrenal hemorrhage, HIV/CMV adrenalitis)",
          "Isolated aldosterone deficiency (aldosterone-synthase defect, critical illness)",
          "Heparin / LMWH",
          "ACE inhibitors / ARBs",
          "Ketoconazole"
        ]
      },
      lowRenin: {
        dx: "Hyporeninemic hypoaldosteronism",
        tests: [
          "Diabetes mellitus",
          "Acute glomerulonephritis",
          "Tubulointerstitial diseases",
          "Pseudohypoaldosteronism type II (Gordon syndrome / FHHt)",
          "NSAIDs (incl. COX-2 inhibitors)",
          "β-blockers",
          "Also common in older adults and CKD; described in SLE and multiple myeloma"
        ]
      }
    }
  }
};
