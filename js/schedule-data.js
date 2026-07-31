/* schedule-data.js — 腎臟科班表資料(可同時保留多個月份)
   新增月份時:在 months 加一組 "YYYY-MM",並在 cloud 最前面加對應檔案即可。 */
window.ScheduleData = {
  updated: "2026-07-31",
  /* 雲端班表清單:新的排前面 */
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
      label: "08月大內科班表",
      month: "2026-08",
      file: "files/medicine-2026-08.xlsx",
      pages: [
        "files/medicine-2026-08/p1.jpg", "files/medicine-2026-08/p2.jpg",
        "files/medicine-2026-08/p3.jpg", "files/medicine-2026-08/p4.jpg",
        "files/medicine-2026-08/p5.jpg", "files/medicine-2026-08/p6.jpg",
        "files/medicine-2026-08/p7.jpg", "files/medicine-2026-08/p8.jpg",
        "files/medicine-2026-08/p9.jpg", "files/medicine-2026-08/p10.jpg",
        "files/medicine-2026-08/p11.jpg", "files/medicine-2026-08/p12.jpg"
      ]
    },
    {
      title: "腎臟科班表",
      label: "07月腎臟科6合1班表",
      month: "2026-07",
      file: "files/schedule-2026-07.pdf",
      pages: [
        "files/schedule-2026-07/p1.jpg", "files/schedule-2026-07/p2.jpg",
        "files/schedule-2026-07/p3.jpg", "files/schedule-2026-07/p4.jpg",
        "files/schedule-2026-07/p5.jpg", "files/schedule-2026-07/p6.jpg"
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
  /* 各月份資料;App 會依當下日期自動選用對應月份 */
  months: {
    "2026-08": {   /* 八月 */
      consult: {
        3: "王麒翔", 4: "蔡凱帆", 5: "許淳惟", 6: "林均叡", 7: "劉志翰", 10: "王振宇", 11: "傅崇銘", 12: "周嘉安",
        13: "黃鏘綺", 14: "劉志翰", 17: "王振宇", 18: "許淳惟", 19: "蔡凱帆", 20: "劉庭均", 21: "周嘉安", 24: "王振宇",
        25: "傅崇銘", 26: "劉庭均", 27: "林均叡", 28: "王麒翔", 31: "王麒翔"
      },
      oncallB: {
        1: "周嘉安", 2: "劉志翰", 3: "王麒翔", 4: "王振宇", 5: "林均叡", 6: "傅崇銘", 7: "劉志翰", 8: "王振宇", 9: "王麒翔",
        10: "許淳惟", 11: "許淳惟", 12: "許淳惟", 13: "王振宇", 14: "劉志翰", 15: "劉庭均", 16: "許淳惟", 17: "劉志翰",
        18: "蔡凱帆", 19: "林均叡", 20: "王麒翔", 21: "劉庭均", 22: "傅崇銘", 23: "林均叡", 24: "劉庭均", 25: "王麒翔",
        26: "許淳惟", 27: "王振宇", 28: "許淳惟", 29: "林均叡", 30: "王振宇", 31: "周嘉安"
      },
      icuMed:  [ { from: 1, to: 15, name: "王振宇" }, { from: 16, to: 31, name: "王麒翔" } ],
      icuSurg: [ { from: 1, to: 15, name: "邱千華" }, { from: 16, to: 31, name: "劉庭均" } ],
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
    },
    "2026-07": {   /* 七月 */
      consult: {
        1: "劉志翰", 2: "林均叡", 3: "蔡凱帆", 6: "周嘉安", 7: "劉庭均",
        8: "許淳惟", 9: "林均叡", 10: "蔡凱帆", 13: "劉志翰", 14: "劉庭均",
        15: "許淳惟", 16: "黃鏘綺", 17: "郭韋宏", 20: "劉志翰", 21: "傅崇銘",
        22: "周嘉安", 23: "黃鏘綺", 24: "劉庭均", 27: "周嘉安", 28: "傅崇銘",
        29: "許淳惟", 30: "林均叡", 31: "蔡凱帆"
      },
      oncallB: {
        1: "劉庭均", 2: "黃鏘綺", 3: "劉庭均", 4: "許淳惟", 5: "林均叡",
        6: "黃鏘綺", 7: "劉庭均", 8: "林均叡", 9: "劉志翰", 10: "許淳惟",
        11: "劉志翰", 12: "林均叡", 13: "劉志翰", 14: "蔡凱帆", 15: "許淳惟",
        16: "林均叡", 17: "劉志翰", 18: "林均叡", 19: "劉庭均", 20: "許淳惟",
        21: "劉志翰", 22: "林均叡", 23: "傅崇銘", 24: "許淳惟", 25: "劉庭均",
        26: "劉志翰", 27: "周嘉安", 28: "許淳惟", 29: "周嘉安", 30: "黃鏘綺",
        31: "林均叡"
      },
      icuMed:  [ { from: 1, to: 15, name: "郭韋宏" }, { from: 16, to: 31, name: "蔡凱帆" } ],
      icuSurg: [ { from: 1, to: 15, name: "林均叡" }, { from: 16, to: 31, name: "傅崇銘" } ],
      cover: {
        2: [{ off: "林筠蓁", by: "羅鈺崴" }, { off: "顏哲軒(PM)", by: "張家榮" }, { off: "曾子芸(PM)", by: "許瑞廷" }],
        3: [{ off: "許淑雅(Day)", by: "張家榮" }],
        6: [{ off: "張家榮(PM)", by: "潘惠珍" }, { off: "李孟維(Day)", by: "許証傑" }],
        8: [{ off: "羅鈺崴", by: "林筠蓁" }, { off: "李孟維(Day)", by: "郭坤宙" }, { off: "許証傑(PM)", by: "郭坤宙" }],
        9: [{ off: "張家榮(PM)", by: "潘惠珍" }],
        10: [{ off: "張家榮(Day)", by: "潘惠珍" }, { off: "顏哲軒(PM)", by: "林筠蓁" }, { off: "許淑雅(Day)", by: "羅鈺崴" }],
        13: [{ off: "林筠蓁", by: "羅鈺崴" }, { off: "顏哲軒(PM)", by: "張家榮" }, { off: "施若琪(Day)", by: "潘惠珍" }, { off: "許証傑(Day)", by: "李孟維" }, { off: "曾子芸(Day)", by: "許瑞廷" }],
        15: [{ off: "李孟維(PM)", by: "郭坤宙" }, { off: "許証傑(PM)", by: "郭坤宙" }],
        16: [{ off: "羅鈺崴", by: "林筠蓁" }, { off: "顏哲軒(PM)", by: "陳柏翰" }],
        17: [{ off: "林筠蓁", by: "羅鈺崴" }, { off: "陳希寧", by: "許淑雅" }, { off: "魏士閎(PM)", by: "郭坤宙" }, { off: "曾珮禎(PM)", by: "郭坤宙" }],
        20: [{ off: "林筠蓁(Day)", by: "羅鈺崴" }, { off: "陳希寧", by: "許淑雅" }],
        21: [{ off: "許淑雅(Day)", by: "陳希寧" }],
        22: [{ off: "羅鈺崴", by: "林筠蓁" }, { off: "施若琪(Day)", by: "陳希寧" }],
        23: [{ off: "羅鈺崴(補休)", by: "林筠蓁" }, { off: "魏士閎(PM)", by: "曾珮禎" }],
        24: [{ off: "陳希寧", by: "羅鈺崴" }, { off: "許淑雅(Day)", by: "林筠蓁" }, { off: "施若琪(Day)", by: "顏哲軒" }, { off: "李孟維(PM)", by: "許瑞廷" }],
        27: [{ off: "羅鈺崴(Day)", by: "林筠蓁" }, { off: "顏哲軒(Day)", by: "陳柏翰" }, { off: "曾珮禎(PM)", by: "魏士閎" }, { off: "李孟維(Day)", by: "許瑞廷" }],
        28: [{ off: "林筠蓁", by: "羅鈺崴" }],
        29: [{ off: "陳希寧", by: "許淑雅" }, { off: "顏哲軒(PM)", by: "陳柏翰" }, { off: "李孟維(PM)", by: "許瑞廷" }],
        30: [{ off: "陳柏翰", by: "顏哲軒" }],
        31: [{ off: "林筠蓁", by: "陳希寧" }, { off: "羅鈺崴", by: "顏哲軒" }, { off: "曾珮禎(PM)", by: "魏士閎" }]
      },
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
        { name: "李岳庭", code: "6322", phone: "" },
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
        { name: "賴弘強", code: "9916", phone: "56509" },
        { name: "王振宇", code: "J147", phone: "10803" },
        { name: "王麒翔", code: "J148", phone: "10806" },
        { name: "王韋婷", code: "J001", phone: "69167" },
        { name: "李宜蓉", code: "J007", phone: "69173" },
        { name: "王劭璿", code: "J089", phone: "69150" },
        { name: "郭坤宙", code: "J109", phone: "39793" },
        { name: "許瑞廷", code: "J193", phone: "10683" }
      ]
    }
  }
};

/* 相容層:讓舊寫法 ScheduleData.consult / .month 仍可運作(取最新月份) */
(function (SD) {
  var keys = Object.keys(SD.months).sort();
  var latest = keys[keys.length - 1];
  SD.month = latest;
  ['consult', 'oncallB', 'icuMed', 'icuSurg', 'cover', 'directory'].forEach(function (k) {
    if (!(k in SD)) SD[k] = SD.months[latest][k];
  });
})(window.ScheduleData);
