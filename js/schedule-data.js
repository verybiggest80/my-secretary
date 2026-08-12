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
      /* 晨會及科務活動 — 班表第1頁(已排除 CR teaching、12F內科討論室、教學住診/門診/病例迴診) */
      meetings: {
        3: [{ time: "07:45-08:30", title: "晨會:Orientation", speaker: "黃富誠醫師", host: "黃富誠醫師", place: "3F會議室" }],
        6: [{ time: "07:30-08:30", title: "全人暨跨領域聯合討論會(3)(胃)", speaker: "張源升醫師", host: "洪肇宏主任", place: "6F大禮堂" }],
        11: [{ time: "07:30-08:30", title: "科務會議", speaker: "鄭本忠副主任", host: "鄭本忠副主任", place: "3F會議室" }],
        13: [{ time: "07:30-08:30", title: "外賓演講(4)(老年)(新)從多重共病到整合醫療:高齡整合門診的臨床實務創新與成效研究", speaker: "成大高齡醫學部 羅玉岱醫師", host: "沈峰志主任", place: "6F大禮堂" }],
        20: [{ time: "07:30-08:30", title: "Mortality and Morbidity (1)(2)", speaker: "廖羽雙/邱之翰醫師", host: "陳建宏部長", place: "6F大禮堂" }],
        26: [{ time: "07:30-08:30", title: "Case Conference暨進修返國報告", speaker: "陳偉宸/周嘉安醫師", host: "郭韋宏醫師", place: "3F會議室" }],
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
