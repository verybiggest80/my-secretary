/* dx-data.js — Interactive diagnostic decision trees for electrolyte disorders.
   Structure follows standard UpToDate / clinical guideline algorithms.
   Each disorder = { title, subtitle, root, nodes:{ id:{ step, q, note, options:[{label,next}], dx, detail, tests:[] } } }
   A node with `options` renders as a question; a node with `dx` renders as an endpoint (may still branch). */
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
        ]
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
  }
};
