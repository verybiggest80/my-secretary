/* dx-data.js — Interactive diagnostic decision trees for electrolyte disorders.
   Structure follows standard UpToDate / clinical guideline algorithms.
   Each disorder = { title, subtitle, root, nodes:{ id:{ step, q, note, options:[{label,next}], dx, detail, tests:[] } } }
   A node with `options` renders as a question; a node with `dx` renders as an endpoint (may still branch). */
window.DxData = {

  /* ============ HYPONATREMIA ============ */
  hypoNa: {
    title: "Hyponatremia",
    subtitle: "Serum Na⁺ < 135 mmol/L",
    root: "osm",
    nodes: {
      osm: {
        step: "Step 1",
        q: "Measure serum osmolality",
        note: "Rules out non-hypotonic hyponatremia before pursuing ADH work-up.",
        options: [
          { label: "High (> 295 mOsm/kg)", next: "hypertonic" },
          { label: "Normal (275–295 mOsm/kg)", next: "isotonic" },
          { label: "Low (< 275 mOsm/kg)", next: "uosm" }
        ]
      },
      hypertonic: {
        dx: "Hypertonic (translocational) hyponatremia",
        detail: "Effective osmoles pull water into the extracellular space and dilute Na⁺.",
        tests: [
          "Hyperglycemia — correct Na⁺ +1.6–2.4 mmol/L per 100 mg/dL glucose above 100",
          "Mannitol, sucrose (IVIG), maltose, glycine (TURP irrigation)",
          "Treat the underlying osmole; Na⁺ normalizes as it clears"
        ]
      },
      isotonic: {
        dx: "Isotonic hyponatremia (pseudohyponatremia)",
        detail: "Lab artifact from displaced plasma water; measured Na⁺ low but activity normal.",
        tests: [
          "Severe hyperlipidemia (high triglycerides / chylomicrons)",
          "Severe hyperproteinemia (e.g., multiple myeloma, IVIG)",
          "Confirm with direct ion-selective electrode (whole-blood/blood-gas Na⁺)"
        ]
      },
      uosm: {
        step: "Step 2",
        q: "Urine osmolality (true hypotonic hyponatremia)",
        note: "Distinguishes suppressed vs active ADH.",
        options: [
          { label: "≤ 100 mOsm/kg (ADH suppressed)", next: "dilute" },
          { label: "> 100 mOsm/kg (ADH active)", next: "volume" }
        ]
      },
      dilute: {
        dx: "Maximally dilute urine — appropriate ADH suppression",
        detail: "Water intake / low solute overwhelms dilution capacity.",
        tests: [
          "Primary polydipsia (psychiatric, high water intake)",
          "Beer potomania / 'tea-and-toast' low solute intake",
          "Reset osmostat (chronic, mild, stable)",
          "Management: fluid restriction; ensure adequate solute intake"
        ]
      },
      volume: {
        step: "Step 3",
        q: "Assess volume status (ADH active)",
        options: [
          { label: "Hypovolemic", next: "hypoUNa" },
          { label: "Euvolemic", next: "euvol" },
          { label: "Hypervolemic", next: "hyperUNa" }
        ]
      },
      hypoUNa: {
        step: "Step 4",
        q: "Hypovolemic — check urine Na⁺",
        options: [
          { label: "U-Na < 30 mmol/L (renal Na⁺ avid)", next: "extraRenal" },
          { label: "U-Na > 30 mmol/L (renal loss)", next: "renalLoss" }
        ]
      },
      extraRenal: {
        dx: "Hypovolemic — extrarenal Na⁺/fluid loss",
        tests: [
          "GI losses: vomiting, diarrhea",
          "Third-spacing: pancreatitis, burns, bowel obstruction",
          "Remote diuretic use / insensible losses",
          "Management: isotonic saline; Na⁺ rises as ADH stimulus removed — watch for over-correction"
        ]
      },
      renalLoss: {
        dx: "Hypovolemic — renal salt wasting",
        tests: [
          "Thiazide diuretics (classic culprit)",
          "Primary adrenal insufficiency (check cortisol / ACTH stim)",
          "Salt-wasting nephropathy; cerebral salt wasting (intracranial disease)",
          "Check FeNa, urine Cl, K⁺, VBG to sub-type"
        ]
      },
      euvol: {
        dx: "Euvolemic hyponatremia",
        detail: "Work up SIADH only after excluding thyroid & adrenal causes.",
        tests: [
          "SIADH (diagnosis of exclusion): U-Osm > 100, U-Na > 30, euvolemic, normal thyroid/adrenal — causes: CNS, pulmonary, malignancy, drugs (SSRI, carbamazepine, cyclophosphamide), pain/nausea, post-op",
          "Hypothyroidism (check TSH, free T4)",
          "Glucocorticoid deficiency / secondary adrenal insufficiency (check AM cortisol)",
          "Management: fluid restriction ± salt/urea; consider vaptan; correct < 8 mmol/L per 24 h"
        ]
      },
      hyperUNa: {
        step: "Step 4",
        q: "Hypervolemic — check urine Na⁺",
        options: [
          { label: "U-Na < 30 mmol/L (Na⁺ avid)", next: "edematous" },
          { label: "U-Na > 30 mmol/L", next: "renalFail" }
        ]
      },
      edematous: {
        dx: "Hypervolemic — effective arterial volume depletion",
        tests: [
          "Congestive heart failure",
          "Cirrhosis with ascites",
          "Nephrotic syndrome",
          "Management: Na⁺ + fluid restriction, treat underlying disease, loop diuretic"
        ]
      },
      renalFail: {
        dx: "Hypervolemic — advanced kidney disease",
        tests: [
          "Acute or chronic kidney failure (impaired free-water excretion)",
          "Concurrent diuretics",
          "Management: fluid restriction; renal replacement if refractory"
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
  }
};
