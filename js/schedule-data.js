/* schedule-data.js — 腎臟科班表資料(可同時保留多個月份)
   新增月份時:在 months 加一組 "YYYY-MM",並在 cloud 最前面加對應檔案即可。 */
window.ScheduleData = {
  updated: "2026-09-30",
  /* 雲端班表清單:新的排前面 */
  cloud: [
    {
      title: "腎臟科班表",
      label: "10月腎臟科6合1班表 V8",
      month: "2026-10",
      file: "files/schedule-2026-10.pdf",
      pages: [
        "files/schedule-2026-10/p1.jpg",
        "files/schedule-2026-10/p2.jpg",
        "files/schedule-2026-10/p3.jpg",
        "files/schedule-2026-10/p4.jpg",
        "files/schedule-2026-10/p5.jpg",
        "files/schedule-2026-10/p6.jpg"
      ]
    },
    {
      title: "大內科班表",
      label: "10月大內科班表",
      month: "2026-10",
      file: "files/medicine-2026-10.xlsx",
      pages: [
        "files/medicine-2026-10/p1.jpg",
        "files/medicine-2026-10/p2.jpg",
        "files/medicine-2026-10/p3.jpg",
        "files/medicine-2026-10/p4.jpg",
        "files/medicine-2026-10/p5.jpg",
        "files/medicine-2026-10/p6.jpg",
        "files/medicine-2026-10/p7.jpg",
        "files/medicine-2026-10/p8.jpg",
        "files/medicine-2026-10/p9.jpg",
        "files/medicine-2026-10/p10.jpg",
        "files/medicine-2026-10/p11.jpg",
        "files/medicine-2026-10/p12.jpg",
        "files/medicine-2026-10/p13.jpg",
        "files/medicine-2026-10/p14.jpg",
        "files/medicine-2026-10/p15.jpg",
        "files/medicine-2026-10/p16.jpg"
      ]
    }
  ],
  /* 各月份資料;App 會依當下日期自動選用對應月份 */
  months: {
    "2026-10": {   /* 十月 */
      /* 晨會:腎臟科班表第1頁 + 大內科班表 Teaching 分頁的內科晨會 */
      meetings: {
        1: [{ time: "07:45-08:30", title: "晨會:Orientation", speaker: "黃富誠醫師", host: "黃富誠醫師", place: "3F會議室" }],
        5: [{ time: "07:30-08:30", title: "內科晨會-1. COPD、Asthma 2. 皮膚癢及紅疹鑑別診斷", speaker: "陳泓丞醫師/王姿婷醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        6: [{ time: "07:30-08:30", title: "內科晨會-1. 急性胃腸道出血 2. 黃疸", speaker: "陳建廷醫師/李興昀醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        7: [{ time: "07:30-08:30", title: "內科晨會-1. 糖尿病 2. 甲狀腺", speaker: "陳姿佑醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        8: [{ time: "07:30-08:30", title: "內科晨會-1. EKG判讀 2. 腎病症候群", speaker: "黃鼎森醫師/王麒翔醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        12: [{ time: "07:30-08:30", title: "內科晨會-1. 腦血管疾病 2. 意識障礙", speaker: "尤毅勛醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        13: [{ time: "07:30-08:30", title: "內科晨會-1. 輸血治療 2. 急性腎衰竭", speaker: "李建霖醫師/王劭璿醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        14: [{ time: "07:30-08:30", title: "內科晨會-1. 癌症疼痛處理 2. 病歷寫作", speaker: "花宇揚醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        15: [{ time: "07:30-08:30", title: "內科晨會-1. 風濕病診斷與判讀 2. 急性腹痛", speaker: "戴諺綸醫師/黃冠輔醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        19: [{ time: "07:30-08:30", title: "內科晨會-1. 痛風 2. 透析治療適應症", speaker: "王姵璇醫師/王韋婷醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        20: [
          { time: "07:30-08:30", title: "科務會議-資料庫研討會", speaker: "黃富誠醫師", host: "黃富誠醫師", place: "3F會議室" },
          { time: "07:30-08:30", title: "內科晨會-1. 胸痛 2. 感控原則", speaker: "黃庭欣醫師/林耕樓醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }
        ],
        21: [{ time: "07:30-08:30", title: "內科晨會-1. 高血壓 2. 發燒", speaker: "侯邦彥醫師/丁施文醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        22: [{ time: "07:30-08:30", title: "內科晨會-1. 內科病人抽搐處理 2. 非典感染", speaker: "何承叡醫師/郭泓頡醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        27: [{ time: "07:30-08:30", title: "內科晨會-1. 內科病房常見的精神疾病 2. 肺炎", speaker: "彭品翰醫師/蔡孟霖醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        28: [{ time: "07:30-08:30", title: "內科晨會-1. 抗生素使用原則 2. CXR判讀", speaker: "藍姓醫師/張育平醫師", host: "學術CR-王昱傑/許証傑", place: "6F大禮堂" }],
        29: [
          { time: "07:30-08:30", title: "內科晨會-Orientation Test", speaker: "學術CR-王昱傑/許証傑", host: "學術CR-王昱傑/許証傑", place: "12F內科討論室" },
          { time: "11:30-12:30", title: "超長期、14天再入院暨輪訓醫師座談會", speaker: "黃富誠醫師", host: "邱千華醫師", place: "3F會議室" }
        ]
      },
      vsDuty: {
        echoAM: {
          1: "邱千華", 2: "周嘉安", 5: "王劭璿", 6: "劉志翰", 7: "劉庭均", 8: "王韋婷", 12: "劉志翰", 13: "許淳惟",
          14: "劉庭均", 15: "邱千華", 16: "王麒翔", 19: "王韋婷", 20: "許淳惟", 21: "李隆志", 22: "李文欽", 23: "王麒翔",
          27: "王劭璿", 28: "吳建興", 29: "楊智超", 30: "周嘉安"
        },
        echoPM: {
          1: "林均叡", 2: "李宜蓉", 5: "邱鼎育", 6: "傅崇銘", 7: "王振宇", 8: "陳德全", 12: "蔡凱帆", 13: "傅崇銘",
          14: "王振宇", 15: "鄭本忠", 16: "郭韋宏", 19: "蔡凱帆", 20: "黃鏘綺", 21: "賴弘強", 22: "林均叡", 23: "郭韋宏",
          27: "邱鼎育", 28: "賴弘強", 29: "黃鏘綺", 30: "李宜蓉"
        },
        health: {
          1: "林均叡", 2: "劉庭均", 3: "邱千華", 5: "周嘉安", 6: "許淳惟", 7: "李隆志", 8: "邱千華", 9: "許淳惟",
          12: "周嘉安", 13: "陳德全", 14: "吳建興", 15: "黃鏘綺", 16: "蔡凱帆", 17: "傅崇銘", 19: "許淳惟", 20: "傅崇銘",
          21: "賴育城", 22: "林均叡", 23: "蔡凱帆", 24: "陳德全", 27: "郭韋宏", 28: "劉庭均", 29: "李文欽", 30: "邱鼎育",
          31: "黃鏘綺"
        },
        rounds: {
          1: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "劉庭均" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "周嘉安" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }],
          2: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王振宇" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王振宇" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "王振宇" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }],
          3: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "邱鼎育" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }],
          5: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "陳德全" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "吳建興", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "C", region: "B5,B6,B7,B8,B9H2", doctor: "劉志翰" }, { shift: "C", region: "H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }],
          6: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王韋婷" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "李隆志" }],
          7: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "陳靖博" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "楊智超" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉庭均" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "吳建興" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "周嘉安" }, { shift: "C", region: "B5,B6,B7,B8,B9H2", doctor: "李宜蓉" }, { shift: "C", region: "H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }],
          8: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "劉志翰" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王韋婷" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "傅崇銘" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }],
          9: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "楊智超" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "楊智超" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "王振宇" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王振宇" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }],
          10: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "陳德全" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王韋婷" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王韋婷" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王韋婷" }],
          12: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "陳德全" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "王振宇" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "吳建興" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "C", region: "B5,B6,B7,B8,B9H2", doctor: "李宜蓉" }, { shift: "C", region: "H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }],
          13: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王韋婷" }, { shift: "C", region: "A1238", doctor: "王劭璿" }, { shift: "C", region: "A5679", doctor: "傅崇銘" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }],
          14: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王韋婷" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉庭均" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "C", region: "B5,B6,B7,B8,B9H2", doctor: "王韋婷" }, { shift: "C", region: "H3,H5,H6,H7,H8,H9", doctor: "王韋婷" }],
          15: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王韋婷" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "陳德全" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "陳德全" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }],
          16: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "陳德全" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王振宇" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "林均叡" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }],
          17: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "楊智超" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }],
          19: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志", x: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "陳德全", x: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育", x: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城", x: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏", x: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華", x: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇", x: 1 }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺", x: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆", x: 1 }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "C", region: "B5,B6,B7,B8,B9H2", doctor: "王劭璿", x: 1 }, { shift: "C", region: "H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }],
          20: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均", x: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔", x: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強", x: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安", x: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "賴弘強", x: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王韋婷", x: 1 }, { shift: "C", region: "A1238", doctor: "王韋婷", x: 1 }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "王韋婷" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王韋婷", x: 1 }],
          21: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "楊智超" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "郭韋宏" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "吳建興" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興", x: 1 }, { shift: "C", region: "B5,B6,B7,B8,B9H2", doctor: "許淳惟" }, { shift: "C", region: "H3,H5,H6,H7,H8,H9", doctor: "許淳惟", x: 1 }],
          22: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "黃鏘綺", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "賴弘強" }, { shift: "C", region: "A5679", doctor: "賴弘強", x: 1 }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }],
          23: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "王韋婷" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "賴弘強" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "陳德全" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王麒翔" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "劉庭均", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王振宇" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }],
          24: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "周嘉安" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }],
          26: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "林均叡" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "楊智超" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "楊智超" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "C", region: "B5,B6,B7,B8,B9H2", doctor: "楊智超" }, { shift: "C", region: "H3,H5,H6,H7,H8,H9", doctor: "楊智超" }],
          27: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王振宇", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "李隆志" }],
          28: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王韋婷" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉庭均" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "邱鼎育" }, { shift: "C", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "C", region: "H3,H5,H6,H7,H8,H9", doctor: "王振宇" }],
          29: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "賴弘強" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "賴弘強" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }],
          30: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王振宇" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "王韋婷", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王韋婷" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王振宇" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王韋婷" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }],
          31: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "傅崇銘" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王劭璿" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱千華" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }]
        }
      },
      /* 第二種班表:會診分為 一般病房 / 全ICU / LICU;兩位醫師時後者為周一備援(*) */
      consult: {
        1: "周嘉安", 2: "王韋婷", 5: "劉庭均/王麒翔*", 6: "劉志翰", 7: "蔡凱帆", 8: "許淳惟", 12: "郭韋宏/王劭璿*", 13: "林均叡",
        14: "劉志翰", 15: "王麒翔", 16: "劉庭均", 19: "李宜蓉/王韋婷*", 20: "林均叡", 21: "蔡凱帆", 22: "黃鏘綺", 23: "傅崇銘",
        27: "王振宇", 28: "王劭璿", 29: "許淳惟", 30: "賴弘強"
      },
      consultICU: {
        1: "王麒翔", 2: "傅崇銘", 5: "李宜蓉/王麒翔*", 6: "王振宇", 7: "王劭璿", 8: "許淳惟", 12: "王韋婷/王劭璿*", 13: "林均叡",
        14: "劉志翰", 15: "王劭璿", 16: "王韋婷", 19: "王麒翔/王韋婷*", 20: "劉庭均", 21: "王振宇", 22: "黃鏘綺", 23: "李宜蓉",
        27: "賴弘強", 28: "蔡凱帆", 29: "周嘉安", 30: "郭韋宏"
      },
      licu: "李隆志",
      oncallB: {
        1: "周嘉安", 2: "劉志翰", 3: "許淳惟", 4: "劉庭均", 5: "蔡凱帆", 6: "李宜蓉", 7: "王劭璿", 8: "劉志翰",
        9: "王劭璿", 10: "王麒翔", 11: "李宜蓉", 12: "王振宇", 13: "王韋婷", 14: "王麒翔", 15: "王振宇", 16: "許淳惟",
        17: "王振宇", 18: "王韋婷", 19: "王麒翔", 20: "王韋婷", 21: "王劭璿", 22: "賴弘強", 23: "王韋婷", 24: "賴弘強",
        25: "王麒翔", 26: "賴弘強", 27: "李宜蓉", 28: "王振宇", 29: "王劭璿", 30: "王振宇", 31: "王劭璿"
      },
      icuMed:  [],
      icuSurg: [],
      /* 會診欄位 F 標記(總醫師協助):where=一般病房/ICU,vs=該格主治醫師 */
      consultFx: {
        2: [{ where: "ICU", vs: "傅崇銘" }],
        5: [{ where: "一般病房", vs: "劉庭均/王麒翔*" }],
        6: [{ where: "一般病房", vs: "劉志翰" }],
        7: [{ where: "ICU", vs: "王劭璿" }],
        8: [{ where: "ICU", vs: "許淳惟" }],
        12: [{ where: "ICU", vs: "王韋婷/王劭璿*" }],
        13: [{ where: "一般病房", vs: "林均叡" }],
        15: [{ where: "一般病房", vs: "王麒翔" }],
        21: [{ where: "ICU", vs: "王振宇" }],
        22: [{ where: "ICU", vs: "黃鏘綺" }],
        23: [{ where: "ICU", vs: "李宜蓉" }],
        27: [{ where: "ICU", vs: "賴弘強" }],
        28: [{ where: "ICU", vs: "蔡凱帆" }],
        29: [{ where: "ICU", vs: "周嘉安" }],
        30: [{ where: "ICU", vs: "郭韋宏" }]
      },
      consultHelper: [{ from: 1, to: 31, name: "郭坤宙" }],
      /* 復健大樓代查:許瑞廷全月,2、5、14、20、28 由郭坤宙 */
      roundHelper: [
        { days: [2, 5, 14, 20, 28], name: "郭坤宙" },
        { from: 1, to: 31, name: "許瑞廷" }
      ],
      wardCR: [{ from: 1, to: 31, name: "黃富誠" }],
      /* 病房CR 專用的可複製提醒 */
      crNotices: {
        1: [{ label: "腎臟科Orientation", text: "提醒:  \n10/1(四)晨會: \n時間: 07:45~08:30  \n主題: 腎臟科Orientation\n地點: 三樓會議室\n主講者: 黃富誠醫師" }, { label: "教學門診", text: "提醒: \n10/1(四)傅崇銘醫師教學門診:\n時間: AM 08:30\n地點: 教學門診區\n參加人員: 簡鈺昇、楊怡秀、張庭毓、洪翊庭" }],
        5: [{ label: "大內科晨會", text: "提醒:  \n10/5(一)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:陳泓丞醫師/王姿婷醫師" }],
        6: [{ label: "大內科晨會", text: "提醒:  \n10/6(二)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:陳建廷醫師/李興昀醫師" }],
        7: [{ label: "大內科晨會", text: "提醒:  \n10/7(三)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:陳姿佑醫師" }],
        8: [{ label: "大內科晨會", text: "提醒:  \n10/8(四)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:黃鼎森醫師/王麒翔醫師" }],
        12: [{ label: "大內科晨會", text: "提醒:  \n10/12(一)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:尤毅勛醫師" }],
        13: [{ label: "大內科晨會", text: "提醒:  \n10/13(二)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:李建霖醫師/王劭璿醫師" }],
        14: [{ label: "大內科晨會", text: "提醒:  \n10/14(三)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:花宇揚醫師" }, { label: "教學門診", text: "提醒: \n10/14(三)陳靖博醫師教學門診:\n時間: AM 08:30\n地點: 教學門診區\n參加人員: 洪渝雯、李詩雯、洪晨禎、張愛英" }],
        15: [{ label: "大內科晨會", text: "提醒:  \n10/15(四)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:戴諺綸醫師/黃冠輔醫師" }],
        19: [{ label: "大內科晨會", text: "提醒:  \n10/19(一)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:王姵璇醫師/王韋婷醫師" }],
        20: [{ label: "大內科晨會", text: "提醒:  \n10/20(二)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:黃庭欣醫師/林耕樓醫師" }, { label: "科務會議", text: "提醒: \n10/20(二)晨會:\n時間: 07:30~08:30 \n主題: 科務會議\n地點: 3樓會議室" }],
        21: [{ label: "大內科晨會", text: "提醒:  \n10/21(三)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:侯邦彥醫師/丁施文醫師" }],
        22: [{ label: "大內科晨會", text: "提醒:  \n10/22(四)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:何承叡醫師/郭泓頡醫師" }, { label: "教學門診", text: "提醒: \n10/22(四)蔡凱帆醫師教學門診:\n時間: AM 08:30\n地點: 教學門診區\n參加人員: 劉明瀚、郭天翔、傅為剛、魏巾惠" }],
        27: [{ label: "大內科晨會", text: "提醒:  \n10/27(二)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:彭品翰醫師/蔡孟霖醫師" }],
        28: [{ label: "大內科晨會", text: "提醒:  \n10/28(三)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:藍姓醫師/張育平醫師" }],
        29: [{ label: "大內科晨會", text: "提醒:  \n10/29(四)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 12F內科討論室 \n主講者:學術CR-王昱傑/許証傑" }, { label: "超長期暨座談會", text: "提醒:  \n10/29(四)會議(附午餐): \n時間: 11:30~12:30  \n主題: 超長期、14天再入院暨住院醫師座談會\n地點: 三樓會議室\n主講者: 黃富誠醫師\n參加人員: 全體輪訓PGY、R、Clerk" }]
      },
      cover: {
        1: [{ off: "魏巾惠(補休)", by: "郭天翔" }, { off: "洪翊庭(PM)", by: "張愛英" }],
        2: [{ off: "郭天翔", by: "魏巾惠" }, { off: "傅為剛", by: "潘惠珍" }],
        5: [{ off: "郭天翔(Day)", by: "洪翊庭" }, { off: "魏巾惠", by: "傅為剛" }],
        7: [{ off: "張愛英", by: "洪翊庭" }],
        12: [{ off: "郭天翔", by: "邱伊明" }, { off: "魏巾惠(AM時段)", by: "邱伊明" }, { off: "魏巾惠(PM時段)", by: "傅為剛" }, { off: "潘惠珍", by: "施若琪" }, { off: "張愛英", by: "洪翊庭" }, { off: "傅為剛(AM時段)", by: "施若琪" }],
        13: [{ off: "潘惠珍(Day)", by: "傅為剛" }, { off: "洪翊庭(PM)", by: "張愛英" }],
        14: [{ off: "郭天翔(補休)", by: "魏巾惠" }, { off: "潘惠珍(Day)", by: "傅為剛" }],
        15: [{ off: "魏巾惠", by: "郭天翔" }, { off: "潘惠珍(Day)", by: "傅為剛" }, { off: "張愛英", by: "洪翊庭" }],
        16: [{ off: "潘惠珍(Day)", by: "洪翊庭" }, { off: "紀映辰(Day)", by: "郭天翔" }, { off: "傅為剛", by: "魏巾惠" }, { off: "張愛英(Day)", by: "施若琪" }],
        19: [{ off: "傅為剛(Day)", by: "潘惠珍" }, { off: "施若琪(Day)", by: "郭天翔" }],
        21: [{ off: "郭天翔", by: "傅為剛" }, { off: "魏巾惠", by: "紀映辰" }, { off: "張愛英", by: "潘惠珍" }],
        23: [{ off: "施若琪(Day)", by: "郭天翔" }],
        27: [{ off: "郭天翔", by: "傅為剛" }, { off: "魏巾惠(Day)", by: "張愛英" }, { off: "紀映辰", by: "潘惠珍" }],
        28: [{ off: "傅為剛", by: "潘惠珍" }, { off: "紀映辰(補休)", by: "張愛英" }],
        29: [{ off: "張愛英", by: "紀映辰" }],
        30: [{ off: "郭天翔", by: "魏巾惠" }]
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
    "2026-09": {   /* 九月 */
      /* 晨會及科務活動 — 班表第1頁(含大內科晨會;已排除 CR teaching、教學住診/門診/病例迴診) */
      meetings: {
        1: [{ time: "07:45-08:30", title: "晨會:Orientation", speaker: "曾珮禎醫師", host: "曾珮禎醫師", place: "3F會議室" }],
        3: [{ time: "07:30-08:30", title: "內科晨會", speaker: "陳友木醫師", host: "蕭喻心醫師", place: "12F內科討論室" }],
        8: [
          { time: "07:30-08:30", title: "X光影像判讀(2)", speaker: "張育平醫師", host: "許展境/郭垣宏醫師", place: "12F內科討論室" },
          { time: "07:30-08:30", title: "科務會議暨防護衣穿脫演練", speaker: "林均叡/李文欽醫師", host: "李文欽醫師", place: "3F會議室" }
        ],
        10: [{ time: "07:30-08:30", title: "內科晨會-Mortality and Morbidity", speaker: "余秉聰/張恩睿醫師", host: "學術CR-蕭喻心", place: "6F大禮堂" }],
        15: [{ time: "07:30-08:30", title: "內科晨會-X光影像判讀(1)-Chest-1", speaker: "秦建弘醫師", host: "學術CR-許展境", place: "12F內科討論室" }],
        16: [{ time: "07:30-08:30", title: "Journal reading-Acute peritoneal dialysis", speaker: "吳振立/鄭本忠醫師", host: "黃富誠/鄭本忠醫師", place: "3F會議室" }],
        17: [{ time: "07:30-08:30", title: "內科晨會", speaker: "王慧婷醫師", host: "陳永隆主任", place: "6F大禮堂" }],
        22: [{ time: "07:30-08:30", title: "內科晨會-內科職涯發展系列講座(4)", speaker: "馬銘君醫師", host: "許展境/邱鼎育醫師", place: "12F內科討論室" }],
        24: [
          { time: "07:30-08:30", title: "內科晨會", speaker: "李育騏醫師", host: "蕭喻心醫師", place: "12F內科討論室" },
          { time: "11:30-12:30", title: "超長期、14天再入院暨輪訓醫師座談會", speaker: "各輪訓醫師", host: "曾珮禎醫師", place: "3F會議室" }
        ],
        29: [{ time: "07:30-08:30", title: "內科晨會-X光影像判讀(3)-Brain Image", speaker: "尤俊傑醫師", host: "許展境/郭垣宏醫師", place: "12F內科討論室" }],
        30: [{ time: "07:30-08:30", title: "Mortality and Morbidity", speaker: "陳彥翰/劉庭均醫師", host: "曾珮禎/劉庭均醫師", place: "3F會議室" }]
      },
      vsDuty: {
        echoAM: {
          1: "李宜蓉", 2: "王麒翔", 3: "周嘉安", 4: "王劭璿", 7: "邱鼎育", 8: "許淳惟", 9: "吳建興", 10: "周嘉安",
          11: "蔡凱帆", 14: "陳德全", 15: "王麒翔", 16: "劉庭均", 17: "楊智超", 18: "蔡凱帆", 21: "李宜蓉", 22: "許淳惟",
          23: "王麒翔", 24: "李文欽", 29: "李宜蓉", 30: "李隆志"
        },
        echoPM: {
          1: "王振宇", 2: "傅崇銘", 3: "賴弘強", 4: "劉志翰", 7: "劉庭均", 8: "黃鏘綺", 9: "郭韋宏", 10: "林均叡",
          11: "賴弘強", 14: "賴弘強", 15: "王劭璿", 16: "傅崇銘", 17: "林均叡", 18: "劉志翰", 21: "邱千華", 22: "黃鏘綺",
          23: "王振宇", 24: "鄭本忠", 29: "王劭璿", 30: "王振宇"
        },
        health: {
          1: "林均叡", 2: "李隆志", 3: "周嘉安", 4: "劉庭均", 5: "林均叡", 7: "賴育城", 8: "郭韋宏", 9: "劉志翰",
          10: "李文欽", 11: "林均叡", 12: "劉志翰", 14: "邱鼎育", 15: "許淳惟", 16: "蔡凱帆", 17: "傅崇銘", 18: "邱千華",
          19: "郭韋宏", 21: "黃鏘綺", 22: "陳德全", 23: "吳建興", 24: "許淳惟", 26: "李隆志", 29: "劉志翰", 30: "劉庭均"
        },
        rounds: {
          1: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "吳建興" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱鼎育" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "李隆志" }],
          2: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "賴弘強" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "賴弘強", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "李文欽" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "楊智超" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王劭璿" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }],
          3: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李宜蓉" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "賴弘強" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "李宜蓉", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }],
          4: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "郭韋宏" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "李宜蓉" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆", f: 1 }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }],
          5: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "傅崇銘" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }],
          7: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴弘強", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "李宜蓉" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "邱鼎育" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }],
          8: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王劭璿" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "吳建興" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿", f: 1 }, { shift: "C", region: "A1238", doctor: "王麒翔" }, { shift: "C", region: "A5679", doctor: "陳德全" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }],
          9: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "陳靖博" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "李文欽" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "楊智超" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }],
          10: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "傅崇銘" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }],
          11: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "李宜蓉" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王劭璿" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }],
          12: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王劭璿" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱千華" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "李宜蓉" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }],
          14: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉志翰" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "邱鼎育" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "邱鼎育" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }],
          15: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "吳建興" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }],
          16: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "王劭璿" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "李文欽" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "楊智超" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }],
          17: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "賴弘強" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王劭璿" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }],
          18: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "楊智超" }],
          19: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "楊智超" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }],
          21: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "李宜蓉" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "林均叡" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "黃鏘綺" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }],
          22: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李宜蓉" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "傅崇銘" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "賴弘強" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "賴弘強" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }],
          23: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "陳靖博" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "李文欽" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }],
          24: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }],
          25: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "郭韋宏" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李宜蓉" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "李宜蓉" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王劭璿" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王劭璿" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }],
          26: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }],
          28: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "周嘉安" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "李隆志" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "李隆志" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "賴弘強" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "賴弘強" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王麒翔" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "賴弘強" }],
          29: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "傅崇銘" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "吳建興" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "傅崇銘" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }],
          30: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李宜蓉" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "李宜蓉", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "王劭璿" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王劭璿" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "李宜蓉" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "C", region: "B5,B6,B7,B8,B9〉和〈H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }]
        }
      },
      /* 第二種班表:會診分為 一般病房 / ICU內外 / LICU;兩位醫師時後者為周一備援(*) */
      consult: {
        1: "許淳惟", 2: "王振宇", 3: "林均叡", 4: "傅崇銘", 7: "王劭璿/賴弘強*", 8: "劉庭均", 9: "王麒翔",
        10: "黃鏘綺", 11: "周嘉安", 14: "蔡凱帆/李宜蓉*", 15: "傅崇銘", 16: "賴弘強", 17: "周嘉安", 18: "王振宇",
        21: "蔡凱帆/王劭璿*", 22: "劉志翰", 23: "劉庭均", 24: "郭韋宏", 29: "許淳惟", 30: "劉志翰"
      },
      consultICU: {
        1: "賴弘強", 2: "李宜蓉", 3: "林均叡", 4: "周嘉安", 7: "王振宇/賴弘強*", 8: "李宜蓉", 9: "賴弘強",
        10: "黃鏘綺", 11: "王麒翔", 14: "王劭璿/李宜蓉*", 15: "傅崇銘", 16: "林均叡", 17: "郭韋宏", 18: "劉庭均",
        21: "蔡凱帆/王劭璿*", 22: "王麒翔", 23: "王劭璿", 24: "李宜蓉", 29: "許淳惟", 30: "劉志翰"
      },
      licu: "李隆志",
      oncallB: {
        1: "王振宇", 2: "王劭璿", 3: "李宜蓉", 4: "劉志翰", 5: "李宜蓉", 6: "周嘉安", 7: "賴弘強", 8: "王麒翔",
        9: "王振宇", 10: "賴弘強", 11: "蔡凱帆", 12: "王麒翔", 13: "許淳惟", 14: "李宜蓉", 15: "賴弘強", 16: "劉庭均",
        17: "賴弘強", 18: "林均叡", 19: "劉庭均", 20: "王振宇", 21: "劉庭均", 22: "王劭璿", 23: "王麒翔", 24: "王麒翔",
        25: "李宜蓉", 26: "賴弘強", 27: "林均叡", 28: "王劭璿", 29: "傅崇銘", 30: "王劭璿"
      },
      icuMed:  [],
      icuSurg: [],
      /* 會診欄位日期前有 F = 該日需總醫師協助會診(一般病房 + ICU 合併) */
      consultFx: {
        1: [{ where: "一般病房", vs: "許淳惟" }],
        2: [{ where: "一般病房", vs: "王振宇" }],
        3: [{ where: "ICU", vs: "林均叡" }],
        4: [{ where: "一般病房", vs: "傅崇銘" }],
        8: [{ where: "ICU", vs: "李宜蓉" }],
        10: [{ where: "一般病房", vs: "黃鏘綺" }],
        16: [{ where: "一般病房", vs: "賴弘強" }],
        17: [{ where: "一般病房", vs: "周嘉安" }],
        18: [{ where: "ICU", vs: "劉庭均" }],
        21: [{ where: "ICU", vs: "蔡凱帆/王劭璿*" }],
        22: [{ where: "ICU", vs: "王麒翔" }],
        23: [{ where: "ICU", vs: "王劭璿" }],
        24: [{ where: "一般病房", vs: "郭韋宏" }],
        30: [{ where: "一般病房", vs: "劉志翰" }]
      },
      /* 當月負責協助會診的總醫師 */
      consultHelper: [
        { from: 1,  to: 15, name: "王韋婷" },
        { from: 16, to: 30, name: "許瑞廷" }
      ],
      /* 病房CR 專用的可複製提醒(晨會表中被過濾掉的項目也涵蓋在內) */
      crNotices: {
        1: [{ label: "腎臟科Orientation", text: "提醒:  \n9/1(二)晨會: \n時間: 07:45~08:30  \n主題: 腎臟科Orientation\n地點: 三樓會議室\n主講者: 曾珮禎醫師" }],
        2: [{ label: "CR teaching", text: "提醒:\n明日晨會: CR teaching \n時間: 07:45~08:30\n地點: 3樓會議室" }],
        3: [{ label: "大內科晨會", text: "提醒:  \n9/3(四)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 12F內科討論室 \n主講者:陳友木醫師" }, { label: "教學門診", text: "提醒: \n9/3(四)傅崇銘醫師教學門診:\n時間: AM 08:30\n地點: 教學門診區\n參加人員: Y1 王湘綾、Y1 余晧維、Y2 陳彥翰、UGY 林明彥" }],
        7: [{ label: "CR teaching", text: "提醒:\n明日晨會: CR teaching \n時間: 07:45~08:30\n地點: 3樓會議室" }],
        8: [{ label: "大內科晨會", text: "提醒:  \n9/8(二)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 12F內科討論室 \n主講者:張育平醫師" }, { label: "科務會議", text: "提醒: \n9/8(二)晨會:\n時間: 07:30~08:30 \n主題: 科務會議\n地點: 3樓會議室" }],
        9: [{ label: "CR teaching", text: "提醒:\n明日晨會: CR teaching \n時間: 07:45~08:30\n地點: 3樓會議室" }],
        10: [{ label: "大內科晨會", text: "提醒:  \n9/10(四)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:余秉聰/張恩睿醫師" }],
        14: [{ label: "CR teaching", text: "提醒:\n明日晨會: CR teaching \n時間: 07:45~08:30\n地點: 3樓會議室" }],
        15: [{ label: "大內科晨會", text: "提醒:  \n9/15(二)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 12F內科討論室 \n主講者:秦建弘醫師" }],
        16: [{ label: "Journal reading", text: "提醒: \n9/16(三)晨會:\n時間: 07:30~08:30 \n主題: Journal reading\n地點: 3樓會議室\n主講者/主持人: 吳振立/鄭本忠醫師、黃富誠/鄭本忠醫師" }],
        17: [{ label: "大內科晨會", text: "提醒:  \n9/17(四)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 6F大禮堂 \n主講者:王慧婷醫師" }],
        21: [{ label: "CR teaching", text: "提醒:\n明日晨會: CR teaching \n時間: 07:45~08:30\n地點: 3樓會議室" }],
        22: [{ label: "大內科晨會", text: "提醒:  \n9/22(二)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 12F內科討論室 \n主講者:馬銘君醫師" }],
        23: [{ label: "CR teaching", text: "提醒:\n明日晨會: CR teaching \n時間: 07:45~08:30\n地點: 3樓會議室" }],
        24: [{ label: "大內科晨會", text: "提醒:  \n9/24(四)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 12F內科討論室 \n主講者:李育騏醫師" }, { label: "教學門診", text: "提醒: \n9/24(四)蔡凱帆醫師教學門診:\n時間: AM 08:30\n地點: 教學門診區\n參加人員: Y2 吳振立、Y1 王致剴、UGY 張庭毓" }, { label: "超長期暨座談會", text: "提醒:  \n9/24(四)會議(附午餐): \n時間: 11:30~12:30  \n主題: 超長期、14天再入院暨住院醫師座談會\n地點: 三樓會議室\n主講者: 各輪訓醫師\n參加人員: 全體輪訓PGY、R、Clerk" }],
        29: [{ label: "大內科晨會", text: "提醒:  \n9/29(二)大內科晨會: \n時間: 07:30~08:30  \n主題: 大內科晨會\n地點: 12F內科討論室 \n主講者:尤俊傑醫師" }],
        30: [{ label: "Mortality and Morbidity", text: "提醒: \n9/30(三)晨會:\n時間: 07:30~08:30 \n主題: Mortality and Morbidity\n地點: 3樓會議室\n主講者/主持人: 陳彥翰/劉庭均醫師、曾珮禎/劉庭均醫師" }]
      },
      /* 當月病房CR */
      wardCR: [{ from: 1, to: 30, name: "曾珮禎" }],
      /* 當月負責代查復大查房(班表日期前有 F)的總醫師 */
      roundHelper: [
        { from: 1,  to: 15, name: "許瑞廷" },
        { from: 16, to: 30, name: "郭坤宙" }
      ],
      cover: {
        1: [{ off: "余晧維(AM)", by: "陳彥翰" }, { off: "方介垚(PM)", by: "吳振立" }],
        2: [{ off: "王湘綾(AM)", by: "施若琪" }],
        3: [{ off: "王致剴(AM)", by: "吳振立" }],
        4: [{ off: "吳振立(AM)", by: "王致剴" }, { off: "方介垚(PM)", by: "王湘綾" }],
        7: [{ off: "施若琪(Off)", by: "王湘綾" }, { off: "余晧維(AM)", by: "陳彥翰" }, { off: "吳振立(AM)", by: "王致剴" }],
        8: [{ off: "陳彥翰(AM)", by: "余晧維" }],
        9: [{ off: "施若琪(Off)", by: "王湘綾" }],
        10: [{ off: "王湘綾(AM)", by: "施若琪" }],
        11: [{ off: "王致剴(AM)", by: "吳振立" }, { off: "陳彥翰(AM)", by: "余晧維" }, { off: "方介垚(PM)", by: "王湘綾" }],
        14: [{ off: "施若琪(Off)", by: "王湘綾" }, { off: "方介垚(PM)", by: "王致剴" }, { off: "王致剴(AM 模擬醫學訓練工作坊)", by: "吳振立" }, { off: "余晧維(PM 模擬醫學訓練工作坊)", by: "陳彥翰" }],
        15: [{ off: "王湘綾(AM)", by: "施若琪" }, { off: "王致剴(AM)", by: "吳振立" }],
        16: [{ off: "陳彥翰(AM)", by: "余晧維" }],
        17: [{ off: "王湘綾(ACLS)", by: "施若琪" }, { off: "吳振立(AM)", by: "王致剴" }, { off: "陳彥翰(ACLS)", by: "余晧維" }, { off: "葉詠潔(PM)", by: "余晧維" }],
        18: [{ off: "吳振立(國定假日值班補休)", by: "王致剴" }, { off: "王湘綾(ACLS)", by: "施若琪" }, { off: "余晧維(AM)", by: "葉詠潔" }, { off: "陳彥翰(ACLS)", by: "葉詠潔" }],
        21: [{ off: "王致剴(天災停班日值班補休)", by: "吳振立" }, { off: "王湘綾(特休)", by: "施若琪" }, { off: "陳彥翰(AM)", by: "葉詠潔" }, { off: "余晧維(AM)", by: "葉詠潔" }],
        22: [{ off: "施若琪(Off)", by: "王湘綾" }, { off: "吳振立(AM)", by: "王致剴" }],
        24: [{ off: "陳彥翰(特休)", by: "余晧維" }],
        29: [{ off: "葉詠潔(PM)", by: "陳彥翰" }],
        30: [{ off: "余晧維(AM)", by: "陳彥翰" }, { off: "吳振立(AM)", by: "王致剴" }]
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
    "2026-08": {   /* 八月 */
      /* 晨會及科務活動 — 班表第1頁(已排除 CR teaching、12F內科討論室、教學住診/門診/病例迴診) */
      meetings: {
        3: [{ time: "07:45-08:30", title: "晨會:Orientation", speaker: "黃富誠醫師", host: "黃富誠醫師", place: "3F會議室" }],
        6: [{ time: "07:30-08:30", title: "全人暨跨領域聯合討論會(3)(胃)", speaker: "張源升醫師", host: "洪肇宏主任", place: "6F大禮堂" }],
        11: [{ time: "07:30-08:30", title: "科務會議", speaker: "鄭本忠副主任", host: "鄭本忠副主任", place: "3F會議室" }],
        12: [{ time: "07:30", title: "童綜合林柏松教授演講" }],
        13: [{ time: "07:30-08:30", title: "外賓演講(4)(老年)(新)從多重共病到整合醫療:高齡整合門診的臨床實務創新與成效研究", speaker: "成大高齡醫學部 羅玉岱醫師", host: "沈峰志主任", place: "6F大禮堂" }],
        18: [{ time: "12:30", title: "Seminars(附餐):法布瑞氏症診斷及治療,講師:黃鏘綺醫師" }],
        20: [
          { time: "07:30-08:30", title: "Mortality and Morbidity (1)(2)", speaker: "廖羽雙/邱之翰醫師", host: "陳建宏部長", place: "6F大禮堂" },
          { time: "12:30", title: "Seminar(附餐):(線上會議)SGLT2i & Micardis/Twynsta" }
        ],
        26: [
          { time: "07:30-08:30", title: "Case Conference暨進修返國報告", speaker: "陳偉宸/周嘉安醫師", host: "郭韋宏醫師", place: "3F會議室" },
          { time: "12:30", title: "Seminar(附餐):Semaglutide ,講師:楊智超醫師" }
        ],
        27: [
          { time: "07:30-08:30", title: "藥物檢查檢驗新知(4)(血腫)", speaker: "花宇揚醫師", host: "蘇祐立主任", place: "6F大禮堂" },
          { time: "11:30-12:30", title: "超長期、14天再入院暨輪訓醫師座談會", speaker: "黃富誠醫師", host: "邱千華醫師", place: "3F會議室" }
        ],
        31: [{ time: "07:30-08:30", title: "南區病理預報", speaker: "李欣蓉醫師", host: "黃純真/周嘉安醫師", place: "3F會議室" }]
      },
      vsDuty: {
        echoAM: {
          3: "許淳惟", 4: "王麒翔", 5: "吳建興", 6: "周嘉安", 7: "傅崇銘", 10: "陳德全", 11: "王麒翔", 12: "吳建興",
          13: "楊智超", 14: "傅崇銘", 17: "李隆志", 18: "許淳惟", 19: "邱千華", 20: "李文欽", 21: "蔡凱帆", 24: "李隆志",
          25: "王麒翔", 26: "邱千華", 27: "楊智超", 28: "蔡凱帆", 31: "陳德全"
        },
        echoPM: {
          3: "邱鼎育", 4: "劉志翰", 5: "王振宇", 6: "林均叡", 7: "郭韋宏", 10: "邱鼎育", 11: "黃鏘綺", 12: "劉庭均",
          13: "鄭本忠", 14: "劉志翰", 17: "劉志翰", 18: "林均叡", 19: "劉庭均", 20: "黃鏘綺", 21: "郭韋宏", 24: "王振宇",
          25: "劉庭均", 26: "許淳惟", 27: "林均叡", 28: "周嘉安", 31: "王振宇"
        },
        health: {
          1: "蔡凱帆", 3: "李隆志", 4: "許淳惟", 5: "黃鏘綺", 6: "林均叡", 7: "陳德全", 8: "周嘉安", 10: "劉志翰",
          11: "許淳惟", 12: "邱千華", 13: "李文欽", 14: "蔡凱帆", 15: "劉庭均", 17: "周嘉安", 18: "賴育成", 19: "吳建興",
          20: "劉志翰", 21: "劉庭均", 22: "邱鼎育", 24: "邱鼎育", 25: "傅崇銘", 26: "蔡凱帆", 27: "林均叡", 28: "劉庭均",
          29: "郭韋宏", 31: "郭韋宏"
        },
        rounds: {
          1: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }],
          3: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "李隆志" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王振宇", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉志翰" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "劉志翰", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }],
          4: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "周嘉安" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "陳德全" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "陳德全" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }],
          5: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "黃鏘綺", f: 1 }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }],
          6: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "黃鏘綺", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "鄭本忠" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳靖博" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }],
          7: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "王振宇" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "劉志翰" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "陳德全", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }],
          8: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }],
          10: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "黃鏘綺" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉志翰", f: 1 }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }],
          11: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王振宇" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "C", region: "A1238", doctor: "許淳惟" }, { shift: "C", region: "A5679", doctor: "蔡凱帆" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }],
          12: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "劉庭均" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳靖博" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "楊智超" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "陳德全" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "周嘉安", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }],
          13: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "劉庭均", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }],
          14: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "陳德全", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育成" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "楊智超" }],
          15: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }],
          17: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "陳德全" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }],
          18: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "鄭本忠" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }],
          19: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳靖博", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "楊智超" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }],
          20: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳靖博" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }],
          21: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育成" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "林均叡", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }],
          22: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }],
          24: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "邱千華" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "鄭本忠" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }],
          25: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "李隆志", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王振宇" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "王麒翔" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王麒翔" }],
          26: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "王振宇" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "王麒翔" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "王振宇" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "楊智超", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "傅崇銘" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "黃鏘綺" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }],
          27: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "黃鏘綺" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "傅崇銘" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "王振宇" }],
          28: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "李隆志" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育成" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "邱千華" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "李文欽" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱鼎育" }],
          29: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }],
          31: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "王麒翔" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "王振宇" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "邱千華", f: 1 }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "邱千華" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "周嘉安" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }]
        }
      },
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
      vsDuty: {
        echoAM: {
          1: "吳建興", 2: "李文欽", 3: "周嘉安", 6: "劉志翰", 7: "許淳惟", 8: "邱千華", 9: "蔡凱帆", 10: "林均叡",
          13: "劉志翰", 14: "劉庭均", 15: "邱千華", 16: "蔡凱帆", 17: "林均叡", 20: "劉庭均", 21: "許淳惟", 22: "吳建興",
          23: "楊智超", 24: "李隆志", 27: "劉庭均", 28: "許淳惟", 29: "蔡凱帆", 30: "楊智超", 31: "李隆志"
        },
        echoPM: {
          1: "劉志翰", 2: "林均叡", 3: "郭韋宏", 6: "黃鏘綺", 7: "邱鼎育", 8: "劉庭均", 9: "鄭本忠", 10: "陳德全",
          13: "邱鼎育", 14: "周嘉安", 15: "郭韋宏", 16: "黃鏘綺", 17: "傅崇銘", 20: "陳德全", 21: "邱千華", 22: "劉志翰",
          23: "黃鏘綺", 24: "傅崇銘", 27: "邱鼎育", 28: "周嘉安", 29: "郭韋宏", 30: "林均叡", 31: "傅崇銘"
        },
        health: {
          1: "蔡凱帆", 2: "周嘉安", 3: "劉志翰", 4: "吳建興", 6: "劉庭均", 7: "郭韋宏", 8: "黃鏘綺", 9: "李文欽",
          10: "郭韋宏", 11: "李文欽", 13: "邱鼎育", 15: "吳建興", 16: "許淳惟", 17: "李隆志", 18: "邱千華", 20: "劉志翰",
          21: "傅崇銘", 22: "黃鏘綺", 23: "林均叡", 24: "蔡凱帆", 25: "傅崇銘", 27: "陳德全", 28: "傅崇銘", 29: "邱千華",
          30: "周嘉安", 31: "許淳惟"
        },
        rounds: {
          1: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳靖博" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "邱鼎育" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "郭韋宏" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "吳建興" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "楊智超" }],
          2: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "李文欽", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }],
          3: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "簡玉樹", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "陳德全" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "楊智超" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }],
          4: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }],
          6: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "陳德全", f: 1 }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "吳建興" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "黃鏘綺" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }],
          7: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟", f: 1 }, { shift: "C", region: "A1238", doctor: "劉庭均" }, { shift: "C", region: "A5679", doctor: "周嘉安" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }],
          8: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "劉庭均" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳靖博", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "郭韋宏" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "鄭本忠" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }],
          9: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "邱千華", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱鼎育" }],
          10: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱鼎育" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "許淳惟", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "郭韋宏" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "劉庭均", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "李文欽" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "吳建興" }],
          11: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }],
          13: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "許淳惟" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳德全", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉庭均" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "吳建興" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉志翰" }],
          14: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "傅崇銘", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱鼎育" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }],
          15: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆", f: 1 }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳靖博" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "邱鼎育" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "傅崇銘" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "許淳惟", f: 1 }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }],
          16: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "傅崇銘" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "邱千華", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱鼎育" }],
          17: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "周嘉安", f: 1 }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "許淳惟" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "劉志翰" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "周嘉安" }],
          18: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱千華" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "林均叡" }],
          20: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "周嘉安" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育", f: 1 }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉庭均" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "吳建興" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "吳建興" }],
          21: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "吳建興", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "鄭本忠", f: 1 }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "吳建興" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "陳德全" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "陳德全" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }],
          22: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "賴育城" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳靖博" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "吳建興" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }],
          23: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "邱千華" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "邱千華" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "周嘉安" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "傅崇銘" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }],
          24: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "許淳惟" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱鼎育" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "許淳惟" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "簡玉樹" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "劉庭均" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "劉志翰", f: 1 }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }],
          25: [{ shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }, { shift: "A", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "許淳惟" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "楊智超" }, { shift: "B", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "劉庭均" }],
          27: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "邱鼎育" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城", f: 1 }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "吳建興" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "鄭本忠", f: 1 }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "吳建興" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "蔡凱帆" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "傅崇銘" }],
          28: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "陳德全" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "郭韋宏" }, { shift: "A", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "鄭本忠" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "許淳惟" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "鄭本忠" }, { shift: "C", region: "A1,A2,A8B1,B2,B3", doctor: "李隆志" }, { shift: "C", region: "A3,A5,A6,A7,A9H1", doctor: "李隆志" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "李隆志" }],
          29: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "邱千華" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "吳建興" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "陳靖博" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "李文欽" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "邱鼎育" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "周嘉安" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "吳建興" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "周嘉安" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "陳德全" }],
          30: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "蔡凱帆" }, { shift: "A", region: "A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "蔡凱帆" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "邱鼎育" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "李文欽" }, { shift: "B", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "邱鼎育" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1〉和〈B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "黃鏘綺" }],
          31: [{ shift: "A", region: "A1,A2,A8B1,B2,B3", doctor: "邱千華" }, { shift: "A", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "A", region: "B5,B6,B7,B8,B9H2", doctor: "蔡凱帆" }, { shift: "A", region: "H3,H5,H6,H7,H8,H9", doctor: "賴育城" }, { shift: "B", region: "A1,A2,A8B1,B2,B3", doctor: "郭韋宏" }, { shift: "B", region: "A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "B", region: "B5,B6,B7,B8,B9H2", doctor: "陳德全" }, { shift: "B", region: "H3,H5,H6,H7,H8,H9", doctor: "林均叡" }, { shift: "C", region: "A1,A2,A8B1,B2,B3〉和〈A3,A5,A6,A7,A9H1", doctor: "林均叡" }, { shift: "C", region: "B5,B6,B7,B8,B9H2〉和〈H3,H5,H6,H7,H8,H9", doctor: "郭韋宏" }]
        }
      },
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
