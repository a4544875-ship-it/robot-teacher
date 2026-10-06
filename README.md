# 機器人老師（Robot Teacher）

一個給台灣國小學生（二年級以上）使用的繁體中文 AI 家教機器人，內建英文遊戲樂園（6 款可連線對戰的 3D 單字遊戲）、雙帳號系統（Ray / Dave）、共享排行榜，以及家長密碼保護的查看區。

這個專案原本是一份 [Claude Artifact](https://claude.ai)（單一 HTML 檔案），現在開源分享，方便大家參考、修改、自己架設。

## 功能

- **AI 問老師**：依年級與科目（數學、國語文、社會、自然、英語文）提問，支援拍照提問。
- **單字闖關島（3D）**：像 Roblox 障礙賽的 3D 跑跳闖關遊戲（three.js），4 個世界（草原、沙漠、雪地、火山）共 20 關，由易到難。踩對圖片的平台才不會掉下去、依序踩字母拼出單字搭橋，還有移動平台、消失地板、獨木橋、升降梯、滑冰面、旋轉風車與每個世界的魔王關；每關記錄最快時間，並支援兩台裝置即時連線對戰。
- **單字飛車（3D）**：三線道賽車，開進正確圖片的車道會加速；可自己計時，或兩人連線比誰先到終點。
- **單字拔河／單字爬塔（3D）**：對決遊戲。答對就把繩子拉向自己，或補上缺的字母往塔頂爬；可跟電腦對手練習，或兩人連線對決。
- **單字射擊場／字母隕石（3D）**：點擊發射，射下正確的圖片氣球，或依序射下字母隕石拼出單字；也能連線比誰先完成。
- **數學遊戲區**：遊戲頁可切換「英文／數學」。數學有九九乘法飛車、九九爬塔（可選只練某一段乘法）、數學射擊場、數學拔河（依年級出加減乘除），以及可點擊朗讀的九九乘法表。
- 所有遊戲都支援兩台裝置即時連線對戰，進站選完帳號後直接進遊戲選單。
- **帳號系統**：Ray、Dave 兩個獨立小朋友帳號，各自的提問紀錄、遊戲分數、等級。
- **排行榜**：共享排行榜，依分數/等級顯示獎章與進度。
- **家長區**：PIN 碼保護，可查看兩個帳號的問答紀錄與遊戲成績。

## ⚠️ 重要：哪些功能需要 Claude Artifact 環境才能運作

這個 repo 裡的 `robot-teacher.html` 是從 Claude Artifact 匯出的版本，原本的程式呼叫了 Claude 平台特有的「執行期能力（runtime capabilities）」：

| 功能 | 需要什麼 | 開源後的狀況 |
| --- | --- | --- |
| 6 款 3D 英文遊戲 | 純前端 JS/CSS，進遊戲時從 cdnjs 載入 three.js | ✅ 不需要帳號或金鑰，但第一次載入 3D 引擎需要網路 |
| 排行榜、等級、分數計算 | 純前端（localStorage 備援） | ✅ 可離線使用（單機版，資料存在瀏覽器本機） |
| AI 問老師（聊天功能） | Claude Artifact 的 `sample` 能力，**或**自備 Anthropic API 金鑰（見下） | ⚠️ 兩種方式都不能把「某一個人」的帳號或金鑰內建在公開程式碼裡（這樣既不安全，也違反 Claude 的使用規範），但可以讓**每個使用者自己**提供金鑰，見下方「自備 API 金鑰」。 |
| 跨裝置同步（分數、紀錄一直存在雲端） | Claude Artifact 的 `db` 能力，**或** `index.html` 內建的 Firebase Firestore 同步（見下） | ✅ `index.html` 已經接好 Firebase，只要資料庫的安全規則發布了就能跨裝置同步；沒有連上雲端時會自動退回「只存在這個瀏覽器的 localStorage」模式，並顯示同步警示。 |

## 如何使用

### 方法一：在 Claude 裡當作 Artifact 使用（功能最完整）
把 `robot-teacher.html` 的內容貼到 [claude.ai](https://claude.ai) 請 Claude 幫你發布成 Artifact，這樣聊天與跨裝置同步都能用（用你自己的 Claude 帳號，開啟頁面的人才需要同意）。

### 方法二：當作一般網頁開啟，自備 API 金鑰（推薦給開源部署）
直接用瀏覽器開啟 `index.html`（已包裝好 `<html>`/`<head>` 的完整網頁版本），或放到任何靜態網站空間（GitHub Pages、Netlify 等）。

- 遊戲、分數、排行榜完全可離線使用（存在瀏覽器本機 localStorage）。
- 「問老師」聊天功能：點右上角的 🔧 齒輪按鈕，貼上**你自己的** [Anthropic API 金鑰](https://console.anthropic.com/settings/keys)（格式通常是 `sk-ant-...`），儲存後即可在**這個瀏覽器**直接呼叫 Claude API 使用聊天功能。
  - 金鑰只存在你自己的瀏覽器 localStorage，程式不會把它傳到除了 Anthropic 官方 API 以外的任何地方，也不會寫進原始碼或上傳到 GitHub。
  - 這是「每個使用者自備金鑰（BYOK）」的做法：如果你把網站公開分享給其他人（例如你的孩子、朋友），**每個人都需要自己貼上自己的金鑰**才能用聊天功能；你不能、也不應該把自己的金鑰設成所有訪客共用，那樣等於把你的帳單開放給所有人刷。
  - 金鑰會呼叫 Anthropic 官方 API（`https://api.anthropic.com`），直接從瀏覽器發出（用了 Anthropic 官方支援的 CORS 標頭），所以不需要自架後端；但缺點是金鑰會留在該瀏覽器的開發者工具可見範圍內，**不要在公用電腦或别人的裝置上輸入**。
  - 想要更安全（金鑰完全不經過瀏覽器）的話，可以自己架一個小後端幫忙轉發請求，把前端的直接呼叫換成打你自己的伺服器。

### 方法三：`robot-teacher.html`（Artifact 原始碼）
這份是給 Claude Artifact 用的「無 `<head>`」精簡版本，內容跟 `index.html` 一樣（只是少了外層 `<!doctype>`/`<head>`），適合直接貼回 claude.ai 重新發布，或你想自己重新包裝成其他格式時使用。

## 雲端同步（Firestore）已經接好，只差一步

`index.html` 已經內建 [Firebase](https://firebase.google.com) Firestore 雲端同步：Ray、Dave 的分數、等級、問答與遊戲紀錄會自動寫進雲端資料庫，不管用哪台裝置、哪個瀏覽器打開，看到的都是同一份資料（家長查看紀錄也會是最新的）。

**使用方式：**

1. 到 [Firebase 主控台](https://console.firebase.google.com) 建立一個免費專案，啟用 Firestore Database（標準版即可）。
2. 新增一個「網頁應用程式」，把拿到的 `firebaseConfig` 設定值貼進 `index.html` 最上方 `<head>` 區塊裡的 `firebaseConfig` 物件（這組值是公開的用戶端識別碼，不是密碼，可以放心寫進程式碼裡）。
3. **到 Firestore 的「規則」頁面，貼上以下安全規則並按發布**（這一步一定要做，否則資料庫預設會拒絕所有讀寫）：

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /kids/{kidId} {
      allow read: if true;
      allow write: if kidId in ['ren', 'de']
        && request.resource.data.pts is number
        && request.resource.data.pts >= 0
        && request.resource.data.pts <= 1000000;
    }

    match /activity/{activityId} {
      allow read: if true;
      allow create: if request.resource.data.kid in ['ren', 'de'];
      allow update, delete: if false;
    }

    match /settings/parent {
      allow read: if true;
      allow write: if request.resource.data.pin is string;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

這份規則做的事：排行榜本來就要給大家看，所以分數和紀錄開放讀取；但只允許寫入看起來合理的分數（擋掉亂寫的資料），問答/遊戲紀錄只能新增、不能被竄改或刪除，家長 PIN 碼的雜湊值可以讀寫（因為密碼比對是前端自己做的）。

**老實說的限制：** 這個 App 沒有串 Firebase 帳號登入系統，所以上面的規則只能照「資料長相」擋，擋不住一個懂技術、刻意想搗亂的人直接用瀏覽器開發者工具送出假資料。對一般訪客、意外誤用、網路上亂掃描的機器人來說已經足夠，但不是銀行等級的安全性。想要更嚴格（例如真的只有本人能改自己的分數），可以再加上 Firebase Authentication。

沒有設定 Firebase，或規則還沒發布的時候，程式會自動偵測失敗並退回「只存在這個瀏覽器」的模式，不會整個壞掉，只是看不到跨裝置同步。

## 連線對戰（單字闖關島）

「單字闖關島」的兩人即時對戰需要一條即時連線：

- **Claude Artifact 版**：用 Artifact 的 `room` 能力，發布時宣告 `room: {}` 即可。
- **`index.html` 開源版**：用 Firebase **Realtime Database**（不是 Firestore；位置同步每秒約 10 次，用 Firestore 會很快把免費寫入額度用完）。
  1. 在 Firebase 主控台建立 Realtime Database。
  2. 把它的網址填進 `index.html` 裡 `firebaseConfig` 的 `databaseURL` 欄位。
  3. 在 Realtime Database 的「規則」頁貼上並發布：

```json
{
  "rules": {
    "race": {
      ".read": true,
      "$id": {
        ".write": true,
        ".validate": "!newData.exists() || (newData.hasChildren(['c', 'k']) && newData.child('k').isString() && newData.child('k').val().length < 12)"
      }
    }
  }
}
```

這個節點只放「誰在大廳、目前位置、完成時間」這類暫時資料，離線會自動清掉；分數仍然走 Firestore。沒有設定時，闖關與最快紀錄照常可玩，只是「連線對戰」會顯示尚未開通。

## 課綱內容授權（重要，請務必閱讀）

`curriculum/` 資料夾收錄了這個專案整理的課綱資料，分兩個來源，**授權條款不同**：

- `curriculum/108課綱/`：教育部 108 課綱重點整理 —— 隨本專案以 **MIT** 授權。
- `curriculum/均一課程大綱/`：來自[均一教育平台](https://www.junyiacademy.org/)的課程編排，依均一的授權條款為 **CC BY-NC-SA 3.0 TW**（姓名標示、**非商業性**、相同方式分享）。
  - 引用時必須標示來源為均一教育平台。
  - **不可用於商業用途**。
  - 衍生內容須以相同授權（CC BY-NC-SA 3.0 TW）釋出。
  - 詳見 `curriculum/均一課程大綱/jy-00-說明與授權.md`。
- `curriculum/家教機器人/角色設定.md`：本專案原創的機器人老師角色設定文件 —— MIT 授權。

**簡單說：這個 repo 的程式碼（MIT）可以商用；但均一課程大綱那部分內容不行，使用時請保留來源標示與授權條款。**

## 授權（程式碼）

本專案程式碼採用 [MIT License](LICENSE)（不含 `curriculum/均一課程大綱/` 內容，見上）。

## 隱私與安全提醒

- 若公開部署給真實兒童使用，請自行建立內容安全機制（例如過濾不當內容、避免索取個資）。
- 照片上傳功能涉及隱私，請評估是否需要額外的資料保護措施。
- 家長 PIN 碼目前只做簡易雜湊，非醫療/金融等級的安全強度，不建議用於高敏感情境。

## 貢獻

歡迎發 Issue 或 Pull Request！無論是新遊戲、UI 改進，或課綱內容補充都歡迎。
