/* schedule-data.js — 由「08月腎臟科6合1班表.pdf」解析產生,每月更新此檔即可 */
window.ScheduleData = {
  month: "2026-08",
  updated: "2026-07-31",
  /* 雲端班表清單:每月更新 */
  cloud: [
    {
      title: "腎臟科班表",
      label: "08月腎臟科6合1班表",
      month: "2026-08",
      file: "files/schedule-2026-08.pdf",
      pages: [
        "files/schedule-2026-08/p1.jpg", "files/schedule-2026-08/p2.jpg",
        "files/schedule-2026-08/p3.jpg", "files/schedule-2026-08/p4.jpg",
        "files/schedule-2026-08/p5.jpg", "files/schedule-2026-08/p6.jpg"
      ]
    },
    {
      title: "大內科班表",
      label: "07月大內科班表",
      month: "2026-07",
      file: "files/medicine-2026-07.xlsx",
      pages: [
        "files/medicine-2026-07/p1.jpg", "files/medicine-2026-07/p2.jpg",
        "files/medicine-2026-07/p3.jpg", "files/medicine-2026-07/p4.jpg",
        "files/medicine-2026-07/p5.jpg", "files/medicine-2026-07/p6.jpg",
        "files/medicine-2026-07/p7.jpg", "files/medicine-2026-07/p8.jpg",
        "files/medicine-2026-07/p9.jpg", "files/medicine-2026-07/p10.jpg",
        "files/medicine-2026-07/p11.jpg", "files/medicine-2026-07/p12.jpg"
      ]
    }
  ],
  /* 每日普通會診醫師(平日;假日改急會診由值班醫師負責)— 班表第2頁<會診> */
  consult: {
    3: "王麒翔", 4: "蔡凱帆", 5: "許淳惟", 6: "林均叡", 7: "劉志翰", 10: "王振宇", 11: "傅崇銘", 12: "周嘉安",
    13: "黃鏘綺", 14: "劉志翰", 17: "王振宇", 18: "許淳惟", 19: "蔡凱帆", 20: "劉庭均", 21: "周嘉安", 24: "王振宇",
    25: "傅崇銘", 26: "劉庭均", 27: "林均叡", 28: "王麒翔", 31: "王麒翔"
  },
  /* 每日值班醫師(B班,含 BC、龜BC、BC23 等)— 班表第4頁 */
  oncallB: {
    1: "周嘉安", 2: "劉志翰", 3: "王麒翔", 4: "王振宇", 5: "林均叡", 6: "傅崇銘", 7: "劉志翰", 8: "王振宇", 9: "王麒翔",
    10: "許淳惟", 11: "許淳惟", 12: "許淳惟", 13: "王振宇", 14: "劉志翰", 15: "劉庭均", 16: "許淳惟", 17: "劉志翰",
    18: "蔡凱帆", 19: "林均叡", 20: "王麒翔", 21: "劉庭均", 22: "傅崇銘", 23: "林均叡", 24: "劉庭均", 25: "王麒翔",
    26: "許淳惟", 27: "王振宇", 28: "許淳惟", 29: "林均叡", 30: "王振宇", 31: "周嘉安"
  },
  /* ICU白天專責 — 班表第2頁 */
  icuMed:  [ { from: 1, to: 15, name: "王振宇" }, { from: 16, to: 31, name: "王麒翔" } ],
  icuSurg: [ { from: 1, to: 15, name: "邱千華" }, { from: 16, to: 31, name: "劉庭均" } ],
  /* 每日 Cover 對照 — 班表第5頁(休假人員↔COVER 上下對照 + HD/普會 箭頭) */
  cover: {
    3: [{ off: "吳至真(AM off)", by: "陳宥儒" }, { off: "王昱斌(PM off)", by: "黃富誠" }],
    4: [{ off: "陳偉宸(Day off)", by: "林昱余" }],
    5: [{ off: "林達人(Day off)", by: "黃品叡" }],
    6: [{ off: "黃品叡(Day off)", by: "林達人" }, { off: "李芝瑜(Day off)", by: "NP若琪" }],
    7: [{ off: "NP若琪(Day off)", by: "李芝瑜" }, { off: "林昱余(Day off)", by: "陳偉宸" }, { off: "吳至真(PM off)", by: "陳宥儒" }],
    10: [{ off: "NP若琪(Day off)", by: "李芝瑜" }, { off: "林昱余(補休)", by: "陳偉宸" }, { off: "陳宥儒(Day off)", by: "吳至真" }],
    11: [{ off: "林達人(Day off)", by: "黃品叡" }, { off: "王昱斌(PM off)", by: "曾珮禎" }],
    12: [{ off: "李芝瑜(Day off)", by: "NP若琪" }],
    13: [{ off: "林昱余(Day off)", by: "陳偉宸" }, { off: "吳至真(PM off)", by: "陳宥儒" }, { off: "潘祈錚(PM off)", by: "許瑞廷" }],
    17: [{ off: "林達人(補休)", by: "黃品叡" }, { off: "林昱余(Day off)", by: "陳偉宸" }, { off: "潘祈錚(PM off)", by: "陳宥儒" }],
    18: [{ off: "張婉荃(Day off)", by: "NP惠珍" }, { off: "陳偉宸(Day off)", by: "林昱余" }, { off: "NP若琪(Day off)", by: "李芝瑜" }],
    19: [{ off: "李芝瑜(Day off)", by: "NP若琪" }],
    20: [{ off: "NP若琪(Day off)", by: "李芝瑜" }, { off: "林達人(Day off)", by: "黃品叡" }, { off: "陳宥儒(Day off)", by: "潘祈錚" }],
    21: [{ off: "李芝瑜(補休)", by: "NP若琪" }, { off: "林昱余(Day off)", by: "陳偉宸" }, { off: "潘祈錚(特休)", by: "陳宥儒" }],
    24: [{ off: "林達人(Day off)", by: "黃品叡" }],
    25: [{ off: "李芝瑜(Day off)", by: "NP若琪" }],
    26: [{ off: "陳宥儒(Day off)", by: "潘祈錚" }, { off: "黃品叡(Day off)", by: "林達人" }],
    27: [{ off: "林昱余(Day off)", by: "陳偉宸" }, { off: "潘祈錚(PM off)", by: "陳宥儒" }],
    28: [{ off: "張婉荃(Day off)", by: "NP惠珍" }, { off: "林達人(Day off)", by: "黃品叡" }],
    31: [{ off: "陳偉宸(Day off)", by: "林昱余" }, { off: "黃品叡(Day off)", by: "林達人" }, { off: "吳至真(PM off)", by: "郭坤宙" }]
  },
  /* 醫師通訊錄 — 班表第4頁(代號/GSM) */
  directory: [
    { name: "簡玉樹", code: "1271", phone: "56066" },
    { name: "陳靖博", code: "1464", phone: "56061" },
    { name: "李建德", code: "4005", phone: "56067" },
    { name: "李志雄", code: "4228", phone: "56068" },
    { name: "李文欽", code: "4580", phone: "56140" },
    { name: "鄭本忠", code: "4620", phone: "56817" },
    { name: "陳德全", code: "4671", phone: "56075" },
    { name: "楊智超", code: "4806", phone: "56081" },
    { name: "吳建興", code: "4802", phone: "56082" },
    { name: "李隆志", code: "5239", phone: "56083" },
    { name: "邱鼎育", code: "6284", phone: "56877" },
    { name: "邱千華", code: "6367", phone: "56457" },
    { name: "李岳庭", code: "6322", phone: "56284" },
    { name: "郭韋宏", code: "6489", phone: "56045" },
    { name: "賴育城", code: "6655", phone: "56135" },
    { name: "黃鏘綺", code: "6646", phone: "56080" },
    { name: "傅崇銘", code: "7978", phone: "66032" },
    { name: "周嘉安", code: "6734", phone: "56813" },
    { name: "王○一", code: "9101", phone: "69283" },
    { name: "蔡凱帆", code: "9042", phone: "68814" },
    { name: "吳柏融", code: "9043", phone: "68824" },
    { name: "許淳惟", code: "5827", phone: "30370" },
    { name: "梁鴻華", code: "6949", phone: "30350" },
    { name: "劉志翰", code: "9339", phone: "56319" },
    { name: "陳興暐", code: "9559", phone: "56002" },
    { name: "劉庭均", code: "1550", phone: "35828" },
    { name: "郭柏彥", code: "9674", phone: "56808" },
    { name: "林均叡", code: "9734", phone: "56795" },
    { name: "陳幸祐", code: "9874", phone: "69109" },
    { name: "蕭啓安", code: "J050", phone: "53865" },
    { name: "王振宇", code: "J147", phone: "10803" },
    { name: "王麒翔", code: "J148", phone: "10806" },
    { name: "賴弘強", code: "9916", phone: "56509" },
    { name: "王韋婷", code: "J001", phone: "69167" },
    { name: "李宜蓉", code: "J007", phone: "69173" },
    { name: "王劭璿", code: "J089", phone: "69150" },
    { name: "郭坤宙", code: "J109", phone: "39793" },
    { name: "許瑞廷", code: "J193", phone: "10683" },
    { name: "曾珮禎", code: "J358", phone: "31516" },
    { name: "黃富誠", code: "E106", phone: "10358" }
  ]
};
