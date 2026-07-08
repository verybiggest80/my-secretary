# My Secretary — 個人秘書 PWA

專為 iPhone 設計的 mobile-first PWA。所有資料存在手機本地(localStorage + IndexedDB),離線可用。

## 功能

- **首頁 Dashboard**:方塊排列,點右上「編輯」可切換每個方塊為正方形/長條形、調整順序,設定自動保存。
- **To Do**:新增提醒事項、打勾標記完成,可切換「未完成 / 全部」檢視。
- **Work**
  - **班表**:每月上傳班表檔案(存在 IndexedDB),可開啟最新與歷史班表。
  - **CRRT**:Filtration Fraction 計算器。預設 QB=150 mL/min、Hct=0.3、Net UF=0。
    公式:`FF = (Qpre + Qpost + Net UF) / (QB×60×(1−Hct) + Qpre)`(QB 自動 ×60 換算 mL/hr)。FF > 25% 會顯示凝血風險警示。

## 安裝到 iPhone

PWA 需要透過 HTTPS 網址開啟(不能直接開本機檔案),最簡單的做法:

1. 把整個資料夾上傳到 **GitHub Pages**(免費):建 repo → Settings → Pages → 從 main branch 部署。
   或用 Netlify / Cloudflare Pages 直接拖拉資料夾部署。
2. 在 iPhone Safari 開啟該網址。
3. 點分享按鈕 → **「加入主畫面」**。
4. 之後從主畫面開啟就是全螢幕、像原生 App 的體驗,離線也能用。

本機預覽:資料夾內執行 `python3 -m http.server 8000`,瀏覽器開 `http://localhost:8000`。

## 架構(方便未來擴充)

```
index.html            App shell(首頁優先快速載入)
manifest.webmanifest  PWA 設定
sw.js                 Service worker(cache-first 離線快取)
css/app.css           全部樣式(支援深色模式、iOS 安全區域)
js/app.js             路由 + 分頁模組「需要時才載入」(dynamic import)
js/store.js           資料層:localStorage(設定/待辦)+ IndexedDB(檔案)
js/pages/home.js      Dashboard
js/pages/todo.js      To Do
js/pages/work.js      班表 + CRRT
```

- 新增子分頁:在 `index.html` 的 tab-bar 加一個按鈕,並新增 `js/pages/<名稱>.js`(實作 `init` 與 `show`)即可。
- 新增 Dashboard 方塊:在 `home.js` 的 `RENDERERS` 加一個項目。
- 無任何外部套件依賴,之後可用 Capacitor 包成原生 iOS App。
- 更新程式後請把 `sw.js` 裡的 `VERSION` 改版號,使用者才會拿到新版快取。

## 注意

FF 計算器僅供臨床參考,實際處方請依醫師判斷。
