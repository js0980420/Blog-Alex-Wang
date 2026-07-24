---
title: Codex 安裝教學(Windows)：VS Code、Codex 插件（外掛）、Codex CLI，選用 WSL2
description: Windows 新手按照 VS Code、Codex 插件（外掛）、Codex CLI 三個主要工具依序安裝，並視需要選用 WSL2；包含真實操作畫面與錯誤紀錄。
slug: codex-windows-wsl-install
status: published
featured: true
pubDate: 2026-07-24
updatedDate: 2026-07-24
tags: [Codex, WSL2, VS Code, 安裝教學]
testedDate: 2026-07-24
testedEnvironment: Windows + VS Code 1.130.0 + WSL2 Ubuntu 24.04
faqs:
  - question: 我最後到底要安裝哪些工具？
    answer: 一般 Windows 新手先安裝 VS Code 編輯器、Codex 插件與 Codex CLI。WSL2 是選用工具，只有遇到偏向 Linux 的 GitHub 專案或需要 Linux 環境時再安裝。
  - question: 不會 PowerShell 指令也能安裝嗎？
    answer: 可以。先登入 Codex 插件並開啟專案資料夾，再用自然語言請它安裝 CLI、設定 PATH 並檢查版本。遇到權限提示時，先確認準備執行的內容再允許。
  - question: 怎麼知道 Codex CLI 真的安裝成功？
    answer: 完全關閉並重新開啟 VS Code 與終端機，確認 codex --version 能顯示版本，再輸入 codex 測試是否能正常啟動。
  - question: 如果安裝失敗怎麼辦？
    answer: 用滑鼠反白終端機的完整錯誤訊息，再按滑鼠右鍵複製。把錯誤原文、本文連結與卡住的步驟一起貼給 Codex，不要只貼「安裝失敗」。
  - question: 終端機輸入 codex 出現 CommandNotFoundException 怎麼辦？
    answer: 代表 Codex CLI 尚未安裝。VS Code 插件只用來與 AI 對話並協助安裝 CLI；完成 CLI 安裝後，再用 codex --version 驗證。
  - question: 為什麼 Codex 顯示 Unable to send message？
    answer: 本次錯誤視窗同時顯示 Add a project to use ChatGPT，發生時 VS Code 只開了空白視窗。依畫面提示，下一步是從 File 選單按 Open Folder，先開啟專案再重新送出。
  - question: Windows 一定要使用 WSL2 才能安裝 Codex 嗎？
    answer: 不一定。本文使用 WSL2，是為了讓 Codex 與接下來操作的 Linux 工具待在同一個環境。Windows 原生也能使用 Codex，但兩種終端機混用會增加路徑與指令差異。
  - question: 每個專案都要重新安裝 Codex CLI 嗎？
    answer: 不用。CLI 只需安裝一次，之後在任何專案資料夾開啟終端機並輸入 codex 即可，也不限定使用 VS Code；Cursor、Antigravity 等 IDE，以及 Windows Terminal、PowerShell、CMD 或 WSL 終端機都可以。
  - question: Codex 安裝失敗時，可以把這篇文章貼給 AI 嗎？
    answer: 可以。請同時貼上文章連結、終端機的完整錯誤原文，以及你卡住的步驟。不要只說安裝失敗，保留原文才能讓 AI 對照本文環境與指令排查。
  - question: 為什麼要安裝 CLI？VS Code 插件不夠嗎？
    answer: 插件適合在 VS Code 查看檔案、修改內容及檢查差異；CLI 適合安裝工具、執行指令、測試與排錯。兩者是不同操作位置，並不是誰比較高級。
  - question: Codex CLI 第一次安裝預設是隔離版嗎？
    answer: 不是。Codex-Isolated 是本文為避免覆蓋電腦原有版本而自訂的測試資料夾，不是 OpenAI 另外推出的版本。新手直接依官方預設方式安裝即可。
  - question: CLI 安裝成功，為什麼 codex --version 還是舊版？
    answer: 本次實測是電腦裡同時存在兩份 Codex，PATH 先找到原有舊版本；也可能是目前視窗尚未讀取更新後的 PATH。請依照「安裝後確認」章節檢查路徑，並完全關閉後重新開啟 PowerShell、Windows Terminal 與 VS Code。
  - question: 安裝器出現 Refusing to create helper binaries under temporary dir 是安裝失敗嗎？
    answer: 本次不是安裝失敗。這是因為隔離測試刻意把安裝位置放在 /tmp，安裝器拒絕在暫存目錄建立長期 PATH helper，最後仍顯示 Codex CLI 0.145.0 installed successfully。一般使用者不要照抄本文的隔離測試路徑。
  - question: 以後只能在 VS Code 裡使用 Codex CLI 嗎？
    answer: 不用。CLI 只需安裝一次，之後可以在 VS Code、Cursor、Antigravity、Windows Terminal、PowerShell、CMD 或其他終端工具中使用。
  - question: 為什麼不直接安裝桌面版？不是比較簡單嗎？
    answer: 桌面版適合聊天與管理多個工作；VS Code 可以直接查看與修改專案檔案、預覽成果並使用 Git 留下版本紀錄，搭配 CLI 也更方便處理安裝、測試與排錯。
---

## 建議安裝順序：三個主要工具，一個選用工具

Windows 新手建議按照以下順序安裝：

- 主要工具 1｜VS Code 編輯器（IDE 工具）
- 主要工具 2｜Codex 插件（外掛）
- 主要工具 3｜Codex CLI
- 選用工具｜WSL2

先安裝 VS Code 編輯器，再裝能直接操作你電腦的 AI 助理（插件）；等助理可以使用後，再請它協助安裝 Codex CLI。WSL2 放在最後且標為選用，避免新手一開始同時處理 Windows 與 Linux 兩套環境。

如果安裝中途失敗，可以把這篇文章的連結與終端機顯示的完整錯誤原文一起貼給 AI：

```text
https://aixwang.dev/blog/codex-windows-wsl-install/
```

複製終端機的錯誤訊息和平常複製文字不太一樣：

1. 先用滑鼠把完整錯誤訊息反白。
2. 在反白的文字上按滑鼠右鍵複製。
3. 回到 Codex 的訊息輸入框，再按滑鼠右鍵貼上。

不要直接在終端機按 `Ctrl+C`。在許多終端機裡，`Ctrl+C` 的用途是停止目前正在執行的指令，不是複製文字。

請保留錯誤訊息原文，不要只描述「安裝失敗」。AI 才能對照本文的安裝環境、指令與實測畫面，判斷你卡在哪一步。

## 第一步：在 Windows 安裝 VS Code

前往 [VS Code 官方網站](https://code.visualstudio.com/)下載 Windows 安裝程式。下載完成後，執行剛下載、檔名以 `VSCodeUserSetup-x64` 開頭的安裝檔，再依照安裝精靈完成安裝。安裝時建議保留「新增至 PATH」與「使用 Code 開啟」相關選項。

安裝完成後，可以先把 VS Code 介面改成繁體中文：

1. 按下 `Ctrl + Shift + P`。
2. 輸入並選擇 `Configure Display Language`。
3. 選擇「中文（繁體）」或 `zh-tw`。
4. 如果尚未安裝中文語言包，VS Code 會自動安裝。
5. 依照畫面提示重新啟動 VS Code。

重新開啟後，VS Code 的選單就會顯示繁體中文。這只會改變 VS Code 的介面語言，不會影響 Codex 的回覆語言。[VS Code 官方說明](https://code.visualstudio.com/docs/configure/locales)

<!-- 待補拍 GUI-01：
Windows 瀏覽器開啟 VS Code 官方下載頁。
畫面需包含 Windows 下載按鈕；裁掉書籤、帳號頭像與私人分頁。
-->

<!-- 待補拍 GUI-02：
VS Code Windows 安裝精靈的「選取其他工作」頁面。
畫面需看得到 Add to PATH 選項。
-->

## 第二步：在 VS Code 安裝 Codex 插件（外掛）

![先點選 VS Code 左側紅框標示的 Extensions 插件圖示](/images/blog/codex-windows-wsl-install/10-vscode-codex-marketplace-click-extensions.png)

先點選左側紅框標示的 **Extensions 插件圖示**，再搜尋 `Codex`。搜尋結果可能不只一個，請選擇同時符合以下三個特徵的官方插件：

- 使用 OpenAI 的黑白 Logo；
- 插件名稱下方的公司名稱是 **OpenAI**；
- 公司名稱旁有藍色驗證勾勾。

確認三項都符合後，再按藍色 **Install** 按鈕。不要只因為名稱包含 Codex 就直接安裝，以免裝到仿冒或非 OpenAI 官方發布的插件。

> **先確認右側面板目前選到的是 Codex。** VS Code 的預設 AI 通常是 **Chat（GitHub Copilot）**；安裝 Codex 後，點開聊天面板上方的 AI 選擇器，將 **Chat／Copilot** 切換成 **Codex**。本文後續的安裝與排錯都以 Codex 為準。以需要多步驟規劃、讀取專案並持續修正的工作來說，我認為 Codex 的推理與代理能力比 Copilot 更強，因此不要只看到聊天視窗就以為已經在使用 Codex。

1. 在 VS Code 左側點選「插件」圖示。
2. 搜尋 `Codex` 或 `OpenAI`。
3. 確認發行者是 OpenAI，再按下 Install。
4. 安裝後開啟 Codex 側邊欄並登入 ChatGPT。

畫面上同時看得到插件名稱 **Codex – OpenAI’s coding agent**、發行者 **OpenAI** 與藍色 **Install** 按鈕。

這次實測透過 VS Code CLI 查到：

```text
openai.chatgpt@26.721.30844
```

![VS Code CLI 偵測到官方 Codex 插件](/images/blog/codex-windows-wsl-install/02-vscode-extension-detected.png)

這張圖能證明插件已被目前的 WSL Remote 視窗偵測，但不能取代 Marketplace 的點擊安裝畫面，所以兩種證據都保留。

### 使用插件前，先登入 ChatGPT

安裝完成後，開啟 VS Code 右側的 Codex 面板，按下紅框標示的 **Sign in with ChatGPT**，再使用自己的 ChatGPT 帳號登入：

![在 Codex 面板按下紅框標示的 Sign in with ChatGPT](/images/blog/codex-windows-wsl-install/11-vscode-codex-sign-in-button.png)

為了有足夠額度完成安裝與後續排錯，本教學建議先確認帳號已訂閱每月 20 美元的 ChatGPT Plus 或更高方案。OpenAI 目前也讓 Free 與 Go 方案使用部分 Codex 功能，因此 Plus 不是官方規定的最低門檻，但免費或較低方案的可用額度可能較少。方案內容與價格之後可能調整，請以 [OpenAI 官方價格頁](https://learn.chatgpt.com/docs/pricing)為準。

## 第三步：先建立專案資料夾，再用 VS Code 開啟

Codex 必須在已開啟的專案資料夾中使用。請先在自己的 Windows 使用者目錄建立一個資料夾，資料夾名稱可以自己決定。

你可以選擇以下其中一種方式：

**方法一：手動建立**

在 Windows 檔案總管進入 `C:\Users\你的帳號\`，在空白處按滑鼠右鍵，選擇 **新增 → 資料夾**。資料夾名稱可以自己取。接著開啟 VS Code，從上方選單依序點擊 **檔案（File）→ 開啟資料夾（Open Folder...）**，再選擇剛建立的資料夾：

![在 VS Code 的 File 選單選擇 Open Folder](/images/blog/codex-windows-wsl-install/08-vscode-file-open-folder.png)

**方法二：請 Codex 插件建立**

如果 VS Code 已經開啟另一個可使用的專案資料夾，而且 Codex 已登入並能正常送出訊息，可以直接輸入：

```text
請在我的 Windows 使用者目錄建立一個名為「你想要的資料夾名稱」的新資料夾，
並用 VS Code 開啟它。
```

送出前，記得把「你想要的資料夾名稱」換成自己決定的名稱。

如果目前是完全空白的 VS Code 視窗，Codex 可能會先要求你開啟專案，無法代替你建立第一個資料夾。這種情況請使用方法一。確認資料夾名稱出現在 VS Code 左側後，再開啟 Codex 並送出訊息，就能避免沒有開啟專案造成的錯誤。

<details>
<summary><strong>如果出現 Unable to send message，點此查看實測錯誤</strong></summary>

<p>本次在沒有開啟任何資料夾的 VS Code 空白視窗送出訊息時，實際出現：</p>

<pre><code>Unable to send message

Add a project to use ChatGPT</code></pre>

<img src="/images/blog/codex-windows-wsl-install/07-vscode-unable-to-send-no-project.png" alt="VS Code 沒有開啟專案時，Codex 顯示 Unable to send message">

<p>遇到相同訊息時，依照上面的步驟建立並開啟專案資料夾，再重新送出即可。</p>
</details>

### 安裝 CLI 前（選用）：減少每一步都按同意

Codex 插件預設使用 **Ask for approval**，執行操作時可能經常要求你手動確認。如果不想每一步都按同意，可以在 Codex 訊息輸入框下方點開權限選單，改選紅框標示的 **Approve for me**：

![在 Codex 插件權限選單選擇紅框標示的 Approve for me](/images/blog/codex-windows-wsl-install/12-vscode-codex-approve-for-me.png)

**Approve for me** 會讓 Codex 自動執行一般操作，只在系統判定可能不安全時詢問，比每一步都確認更流暢。提高權限也代表 Codex 可以代你執行更多電腦操作，因此只在信任目前開啟的專案與安裝來源時使用。

畫面中的 **Full access** 是不受限制地存取網路與電腦檔案，本教學不需要選擇這個選項。

## 第四步：請 Codex 插件用自然語言安裝 Codex CLI

不需要自己複製一長串 PowerShell 指令。回到 VS Code 右側的 Codex 插件，直接貼上下面這段話：

```text
請幫我在這台 Windows 電腦安裝最新版 Codex CLI。
請實際執行安裝、設定目前使用者的 PATH，並用 codex --version 確認安裝結果。
完成後，我要能在重新開啟的 PowerShell、Windows Terminal 或 VS Code 終端機中，
進入任何專案資料夾並輸入 codex 啟動。
如果途中出現錯誤，請讀取完整錯誤訊息並繼續排除。
```

Codex 準備執行安裝指令時，畫面可能會要求你確認權限。先看清楚它準備執行的內容，再按下允許。接著等待 Codex 完成安裝、設定 PATH，並顯示 `codex --version` 的驗證結果。

安裝完成後：

1. 完全關閉所有 VS Code、PowerShell 與 Windows Terminal 視窗。
2. 重新開啟 VS Code 與剛才的專案資料夾。
3. 選擇 **終端機（Terminal）→ 新增終端機（New Terminal）**。
4. 輸入 `codex`，確認 CLI 能正常開啟。

這項安裝只需要完成一次。未來可以在任何專案資料夾使用 VS Code、Cursor、Antigravity、PowerShell、CMD 或其他終端工具，輸入 `codex` 啟動，不限定只能在 VS Code 裡使用。

<details>
<summary><strong>補充：為什麼我安裝的是隔離版？</strong></summary>

<p><code>Codex-Isolated</code> 是本文自訂的資料夾名稱，不是 OpenAI 另外推出的 Codex 版本。為了不覆蓋電腦原有版本，本次實測刻意將執行檔與 <code>CODEX_HOME</code> 分開，讓測試用的登入資料、設定、記錄與工作階段不和原本的 Codex 共用。</p>

<p>第一次只需要安裝一套 CLI 的新手，直接請插件依官方預設方式安裝即可，不需要指定 <code>Codex-Isolated</code>，也不要照抄本次實測的特殊路徑。</p>

<p>隔離安裝不代表 Codex 看不到專案。只要檔案位於目前開啟且允許操作的專案資料夾，Codex 仍可讀取其中的文章草稿、安裝紀錄與其他專案檔案。不要把密碼、API 金鑰或其他不希望 AI 讀取的私人資料放進專案資料夾。</p>

<p>本次安裝器辨識為 <code>Windows (x64)</code>，並成功安裝 Codex CLI <code>0.145.0</code>：</p>

<img src="/images/blog/codex-windows-wsl-install/09-codex-windows-isolated-install.png" alt="Codex 在 Windows PowerShell 實際安裝並驗證 Codex CLI">

<p>本次實測使用的 CLI 路徑是：</p>

<pre><code>C:\Users\你的帳號\AppData\Local\Programs\OpenAI\Codex-Isolated\bin\codex.exe</code></pre>

</details>

<details>
<summary><strong>如果輸入 codex 出現 CommandNotFoundException，點此查看實測錯誤</strong></summary>

<pre><code>codex : 無法辨識 'codex' 詞彙是否為 Cmdlet、函數、指令檔或可執行程式的名稱。
請檢查名稱拼字是否正確，如果包含路徑的話，請確認路徑是否正確，然後再試一次。
位於 線路:1 字元:1
+ codex
+ ~~~~~
    + CategoryInfo          : ObjectNotFound: (codex:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException</code></pre>

<img src="/images/blog/codex-windows-wsl-install/06-vscode-codex-installed-cli-not-found.png" alt="尚未安裝 Codex CLI 時，Windows PowerShell 輸入 codex 的實機結果">

<p>這個錯誤代表當時 CLI 尚未安裝，或目前開啟的視窗尚未讀取新的 PATH。請把完整錯誤原文貼回 Codex，請它繼續檢查；如果剛完成安裝，也要先完全關閉並重新開啟 VS Code 與終端機。</p>
</details>

## 安裝後確認：現在開啟的是不是剛裝好的 Codex？

看到「安裝成功」後，還要做一次簡單確認：

1. 完全關閉並重新開啟 VS Code 與終端機。
2. 用 VS Code 開啟剛才的專案資料夾。
3. 新增終端機並輸入：

```text
codex --version
```

畫面會顯示目前真正開啟的 Codex 版本。如果版本和剛才安裝完成時顯示的一樣，就可以繼續使用。

如果顯示的數字反而比較舊，通常不是安裝失敗，而是電腦裡原本就有另一份 Codex。可以把它想成電腦裡有兩扇都寫著「Codex」的門；你雖然裝好新的那一份，電腦卻先打開了舊的門。

這時不需要自己研究 PATH，也不要急著刪除 Node.js、WSL 或其他工具。把下面這段話貼給 Codex 插件：

```text
我已經安裝 Codex CLI，但 codex --version 顯示的不是剛安裝的版本。
請幫我確認電腦裡是否有多份 Codex、目前實際開啟的是哪一份，
並在不要刪除 Node.js、WSL 或其他工具的前提下修正。
完成後請重新執行 codex --version 驗證。
```

<details>
<summary><strong>查看本次遇到兩份 Codex 的實測紀錄</strong></summary>

<p>本次測試電腦原本有 Codex CLI <code>0.144.6</code>，後來又隔離安裝了 <code>0.145.0</code>。直接輸入 <code>codex</code> 時，電腦仍先開啟原有的舊版本：</p>

<img src="/images/blog/codex-windows-wsl-install/04-codex-version-check.png" alt="兩份 Codex CLI 造成實際開啟版本不同">

<pre><code>安裝器下載的新版本：0.145.0
直接輸入 codex：0.144.6
原因：電腦先找到原本的版本</code></pre>

<p>排查時實際使用的技術指令如下。新手不需要先理解，可以交給 Codex 執行：</p>

<pre><code>type -a codex
which codex
codex --version</code></pre>
</details>

## 登入並開始使用：以後怎麼開啟 Codex CLI？

<!-- 待補拍 GUI-06：
Codex VS Code 側邊欄登入完成畫面。不得露出電子郵件、工作區名稱、token 或私人專案。
-->

Codex CLI 只需要安裝一次，不必每次開新專案都重新安裝。

最適合新手的開啟方式：

1. 開啟 VS Code。
2. 選擇 **檔案（File）→ 開啟資料夾（Open Folder...）**。
3. 選擇想讓 Codex 操作的專案資料夾。
4. 選擇 **終端機（Terminal）→ 新增終端機（New Terminal）**。
5. 在下方終端機輸入：

```text
codex
```

按下 Enter 後，終端機會開啟 Codex CLI：

![在 VS Code 下方終端機輸入 codex，成功開啟 Codex CLI](/images/blog/codex-windows-wsl-install/13-vscode-terminal-start-codex-cli.png)

如果畫面要求登入，依照提示使用 ChatGPT 帳號登入。CLI 與 IDE 插件在同一個執行環境下可以共用 Codex 設定與登入資料；若一個安裝在 Windows、另一個安裝在 WSL，則可能各自使用不同的 home 目錄。

VS Code 會自動讓新終端機位於剛開啟的專案資料夾，不需要先輸入 `cd`。Codex 會以這個資料夾作為工作位置，讀取並修改該專案。

安裝完成後，就可以直接在 CLI 下方的輸入框和 Codex 對話，開始使用這個能讀取專案、執行指令與協助排錯的進階 AI 助理。

可以拿 Tooka 開源專案實測。把下面這段直接貼給 CLI：

```text
請幫我安裝並執行這個 GitHub 開源工具：
https://github.com/js0980420/tooka

請先閱讀專案的 README，確認我的電腦環境與安裝方式，
再依照官方說明完成安裝、啟動與測試；如果遇到錯誤，請保留錯誤原文並繼續排查。
```

這類需要連續讀取說明、執行安裝指令、查看結果與排除錯誤的工作，使用 CLI 通常比插件版少切換視窗，也不必一直搬運終端機訊息，操作會順暢許多。

### 選用：把 CLI 權限改成 Bypass

如果不想在 CLI 執行每個步驟時都手動同意，可以在 CLI 的權限選項中改成 **Bypass**。這會略過執行前的確認與沙盒限制，讓安裝流程更連續，但也代表 Codex 能直接執行更多電腦操作。

在已開啟的 Codex CLI 中操作：

1. 點一下畫面下方的訊息輸入框。
2. 輸入 `/permissions`，再按 Enter。
3. 使用方向鍵選擇 **Bypass approvals and sandbox**；部分版本可能只顯示 **Bypass**。
4. 按 Enter 套用。
5. 輸入 `/status`，確認目前使用的核准與沙盒設定。

如果權限選單沒有 Bypass，可以先輸入 `/quit` 離開 CLI，再回到終端機輸入：

```powershell
codex --yolo
```

`--yolo` 是 `--dangerously-bypass-approvals-and-sandbox` 的簡寫，兩者都會讓 Codex 不經確認執行指令，並關閉沙盒限制。

只應在獨立的測試環境、沒有私人資料且可以重新建立的專案中使用 Bypass。專案或電腦中若有私人文件、密碼、API 金鑰或重要檔案，請維持預設權限，不要開啟這個模式。

官方說明：[Codex CLI 權限與沙盒](https://learn.chatgpt.com/docs/agent-approvals-security)、[Codex CLI 指令參數](https://learn.chatgpt.com/docs/cli/reference)。

如果已經熟悉終端機，也可以使用：

```bash
cd 你的專案資料夾
codex
```

這個操作不限定要在 VS Code 裡完成。只要該終端機找得到 `codex` 指令，就可以使用：

- VS Code 的整合終端機；
- Cursor、Antigravity 或其他 IDE 的終端機；
- Windows Terminal；
- PowerShell；
- Windows 命令提示字元（CMD）；
- WSL 的 Ubuntu 終端機；
- 單獨開啟的其他終端工具。

要注意的是：CLI 安裝在哪個環境，就從哪個環境啟動。Windows 安裝的 CLI 從 Windows 終端機使用；WSL 安裝的 CLI 從 WSL 終端機使用，不要把兩邊的路徑混在一起。

## 選用：在 WSL2 安裝 Codex CLI

前面的 Windows 安裝、確認與登入都完成後，再決定是否需要 WSL2。只使用 Windows 的讀者可以直接跳過這一步。

以系統管理員身分開啟 PowerShell：

```powershell
wsl --install
```

重新開機、完成 Ubuntu 使用者設定後，執行：

```powershell
wsl --list --verbose
```

`VERSION` 必須是 `2`。如果顯示 `1`，代表你使用的是較舊的 WSL，不能直接跟著本文繼續。

接著從 Ubuntu 終端機建立專案目錄：

```bash
mkdir -p ~/code
cd ~/code
code .
```

VS Code 左下角應顯示 `WSL: Ubuntu`，整合終端機的路徑應是 `/home/...`，而不是 `C:\...`。

<!-- 待補拍 GUI-03：
VS Code 開啟 WSL Remote 視窗的完整畫面。
左下角必須清楚顯示 WSL: Ubuntu；終端機同時顯示 pwd 與 /home/...。
-->

不要把專案放在 `/mnt/c/...`。那相當於讓 WSL 隔著一扇門一直讀取 Windows 裡的檔案，安裝可能比較慢，也容易遇到檔案無法修改的問題。

OpenAI 目前提供獨立安裝腳本。在 WSL 的 Ubuntu 終端機執行：

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

本次為了不覆蓋正在使用的 Codex，我將 `CODEX_HOME` 與 `CODEX_INSTALL_DIR` 指向 `/tmp/codex-article-20260724/` 的隔離位置，並設定 `CODEX_NON_INTERACTIVE=1` 重跑官方安裝器。實際下載並安裝出 `0.145.0`。安裝器正確辨識：

- 作業系統為 Linux x64；
- 最新版本為 0.145.0；
- 電腦上已存在 npm 管理的 Codex；
- 同時存在多份 Codex 時，PATH 順序會決定實際執行哪一份。

![Codex CLI 官方安裝腳本的實際輸出](/images/blog/codex-windows-wsl-install/03-codex-clean-install.png)

這次隔離測試保留了兩段英文警告原文。第一段表示電腦上已經有另一份 npm 管理的 Codex：

```text
WARNING: Multiple managed Codex installs can be ambiguous because PATH order decides which one runs.
```

第二段是正常安裝較少遇到的警告：

```text
WARNING: proceeding, even though we could not create PATH aliases: Refusing to create helper binaries under temporary dir "/tmp" (codex_home: AbsolutePathBuf("/tmp/codex-article-20260724/home"))
```

這不是下載失敗。原因是本次刻意把安裝位置放在 `/tmp`，安裝器拒絕在暫存目錄建立長期 PATH helper；最後仍明確顯示 `Codex CLI 0.145.0 installed successfully.`。一般使用者採用預設安裝位置時，不應照抄本次隔離路徑。

## 官方參考資料

- [OpenAI：Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [OpenAI：Codex IDE 插件](https://learn.chatgpt.com/docs/codex/ide)
- [OpenAI：Codex on WSL](https://learn.chatgpt.com/docs/windows/wsl)
- [OpenAI：Codex Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)
- [Visual Studio Code：WSL 教學](https://code.visualstudio.com/docs/remote/wsl-tutorial)

## 附錄：這次實測的環境

本次實測環境如下：

- WSL2 Ubuntu 24.04
- VS Code 1.130.0
- Node.js 24.11.0
- npm 11.6.1
- Windows PowerShell 5.1 隔離安裝：Codex CLI 0.145.0
- 已存在的 Codex CLI：0.144.6
- 乾淨隔離安裝取得的 Codex CLI：0.145.0
- VS Code 官方插件：`openai.chatgpt@26.721.30844`

![WSL2、VS Code、Node 與 npm 版本的實際終端紀錄](/images/blog/codex-windows-wsl-install/01-wsl-environment.png)

這一段留給排錯時核對用，新手不需要先理解每個名稱。版本會持續更新，也不必要求你的數字與本文完全相同；只要指令能正常顯示版本即可。

<!-- FAQ 已移至頁面下方的收合選單，以下舊版正文保留於草稿紀錄但不顯示。

### 我最後到底要安裝哪些工具？

一般 Windows 新手先安裝三個主要工具：VS Code 編輯器、Codex 插件與 Codex CLI。WSL2 是選用工具，只有遇到偏向 Linux 的 GitHub 專案，或之後需要 Linux 環境時再安裝。

### 不會 PowerShell 指令也能安裝嗎？

可以。先登入 Codex 插件、開啟一個專案資料夾，再用自然語言請它安裝 CLI、設定 PATH 並檢查版本。看到權限提示時，先確認它準備執行的內容，再決定是否允許。

### 怎麼知道 Codex CLI 真的安裝成功？

完全關閉並重新開啟 VS Code 與終端機，確認 `codex --version` 能顯示版本，再輸入 `codex` 測試是否能正常啟動。不要只看畫面出現「安裝成功」，因為電腦裡若有兩份 Codex，仍可能先開啟舊版本。

### 如果安裝失敗怎麼辦？

用滑鼠反白終端機的完整錯誤訊息，再按滑鼠右鍵複製。把錯誤原文和這篇文章的連結一起貼給 Codex，請它根據目前卡住的步驟繼續檢查。不要只貼「安裝失敗」，也不要自行猜測錯誤原因。

### 為什麼 Windows 環境要透過 WSL2？

Windows 原生可以安裝 Codex，因此 WSL2 不是必裝項目。本文把它放在主要安裝流程後方並標示「選用」，是因為新手應先完成編輯器、插件（外掛）與 Windows CLI，確定 Codex 已經能使用，再決定是否需要第二套環境。

可以把 WSL2 想成「Windows 電腦裡的 Linux 工作區」。當 GitHub 專案的官方教學主要提供 Linux 指令時，在 WSL2 裡可以直接使用相同環境操作，不必先把每一行改寫成 Windows 版本。

適合使用 WSL2 的情況：

- 專案文件明確以 Linux 為主要安裝環境；
- 之後要部署到 Linux 伺服器；
- 需要在同一個環境使用 Git、Node、Python 或其他終端工具。

如果只是用 Codex 修改文件、簡單網頁，或專案已經提供完整 Windows 安裝方式，留在 Windows 原生環境即可。

在 WSL2 工作時，專案建議放在：

```bash
~/code/你的專案
```

不要把 WSL 專案放在 `/mnt/c/...`。本文的原則是讓 Codex、專案與需要的工具都待在同一個環境，避免 Windows 和 WSL 各裝一套後混淆。

### 為什麼要安裝 CLI？VS Code 插件不夠嗎？

先解釋 CLI 是什麼：**CLI 就是在終端機視窗裡，用打字的方式操作 Codex。**

兩者最大的差別不是誰「比較聰明」，而是哪一種操作方式比較快：

| 使用方式 | 哪些操作比較快 |
| --- | --- |
| VS Code 插件版 | 已經在看某個檔案時，可以直接把目前開啟的檔案或反白內容交給 Codex，修改後也能在旁邊檢查差異 |
| Codex CLI 版 | 安裝工具、執行指令、測試結果或重複工作時，可以全程用鍵盤操作，不必一直切換視窗與點選按鈕 |

OpenAI 官方對插件版的定位，是利用編輯器目前已開啟的檔案與反白內容，減少重新說明問題的時間；對 CLI 版的定位，則是在終端機裡檢查檔案、修改程式、執行指令與自動化重複工作。

- 正在看程式並做小修改，插件版通常更順手。
- 正在安裝 GitHub 專案、連續執行多個指令或重複測試，CLI 版通常少幾個操作步驟。

這裡說的「比較快」是**操作比較直接**，不是 AI 回答速度一定比較快。OpenAI 的 Fast mode 同時支援 Codex CLI 與 IDE 插件；使用相同模型與設定時，不能只因為畫面是終端機，就認定模型本身跑得比較快。

另一個安裝 CLI 的理由是版本更新清楚。重新執行官方安裝或更新指令，可以取得當時提供的新版 CLI。本文實測的乾淨安裝也取得了比電腦原有版本更新的 Codex CLI。不過，「新安裝通常會取得當時的新版本」不代表安裝一次後會永遠保持最新版，之後仍要主動更新並用 `codex --version` 確認。

VS Code 插件也會透過 Marketplace 更新；如果開啟 Auto Update，通常會自動取得新版。因此，**CLI 的優勢是更新與版本確認方式直接，不是只有 CLI 才能使用最新版。**

本文先裝插件，再請插件協助安裝 CLI，是因為新手可以先用熟悉的視窗和 AI 對話；CLI 安裝完成後，往後處理安裝、測試與排錯時，操作會更快。

官方說明：[Codex IDE 插件](https://learn.chatgpt.com/docs/codex/ide)、[Codex CLI](https://learn.chatgpt.com/docs/codex/cli)、[Codex Speed／Fast mode](https://learn.chatgpt.com/docs/agent-configuration/speed)。

### 安裝 Codex 插件後，就能在終端機輸入 `codex` 嗎？

不能。插件與 CLI 是兩個不同的安裝項目。必須完成本文第四步的 CLI 安裝，終端機才會辨識 `codex` 指令。

### Codex CLI 第一次安裝預設是隔離版嗎？

Codex CLI 可以做隔離安裝，但沒有一個由 OpenAI 另外推出、名稱叫做「隔離版」的產品。`Codex-Isolated` 是本文為了避免覆蓋測試電腦裡原有的 Codex，刻意建立的自訂資料夾名稱。第一次只需要一套 CLI 時，直接請插件依官方預設方式安裝即可。

完整隔離會分開執行檔與 `CODEX_HOME`，讓登入、設定、記錄及工作階段不共用；這與 Codex 能操作哪些專案檔案是兩件事。採用隔離安裝的 Codex 仍可讀取目前允許操作的專案檔案，包括文章草稿與安裝紀錄；實際範圍以 Codex 插件或 CLI 當下的權限設定為準。

### 插件出現 `Unable to send message` 怎麼辦？

如果完整訊息是 `Add a project to use ChatGPT`，請先在 VS Code 選擇 **檔案（File）→ 開啟資料夾（Open Folder...）**，開啟或建立一個專案資料夾，再回到 Codex 送出訊息。這是本文實際遇到的錯誤。

### CLI 安裝成功，為什麼 `codex --version` 還是舊版？

電腦裡可能同時存在兩份 Codex。請依照「安裝後確認」章節檢查目前真正執行的路徑；Windows 更新 PATH 後，也要關閉並重新開啟 PowerShell、Windows Terminal 與 VS Code。

### 以後只能在 VS Code 裡使用 Codex CLI 嗎？

不用，也不需要在每個專案重新安裝。CLI 安裝一次後，可以在 VS Code、Cursor、Antigravity、Windows Terminal、PowerShell、CMD 或其他終端工具中使用。先進入專案資料夾，再輸入 `codex` 即可。

### 為什麼不直接安裝桌面版？不是比較簡單嗎？

如果只想快速和 Codex 對話、同時管理多個工作，桌面版確實可能更簡單。OpenAI 將桌面版定位為處理多個專案、長時間工作、檔案與其他電腦工具的集中工作區；也可以直接開啟資料夾使用其中的檔案。

本文優先安裝 VS Code 的 IDE 版，是因為它可以直接開啟整個專案資料夾。左側看得到所有檔案，中間可以查看與修改內容，右側則能請 Codex 協助，不必一直在聊天視窗與檔案總管之間切換。

這種工作方式不只適合寫程式，也可以用來：

- 製作網站或應用程式，直接查看執行結果；
- 製作簡報，一邊修改內容、一邊查看預覽；
- 製作文章與圖片素材，同時整理文字、圖片及檔案位置；
- 製作影片專案，查看腳本、字幕、素材與輸出預覽。

實際能顯示哪一種預覽，會依檔案類型與安裝的工具而不同；重點是內容、素材、預覽與 Codex 都能留在同一個專案畫面中。

另一個原因是 VS Code 內建 Git 版本控制。每次修改都能留下紀錄，改錯時比較容易查看差異或回到先前版本，也方便日後把專案保存到 GitHub。Git 的設定與使用方式會在後續教學另外完整介紹。

CLI 則能直接處理安裝、測試與排錯。對需要實際製作內容、管理檔案並保留修改紀錄的人來說，VS Code 插件加 CLI 的操作路徑更完整。

桌面版並不是不能用，也不需要和插件、CLI 三選一。如果你的主要需求是聊天、整理檔案或同時管理多個長時間工作，可以先用桌面版；之後需要在編輯器裡修改程式或從終端機工作時，再使用插件與 CLI。

官方說明：[ChatGPT 桌面版](https://learn.chatgpt.com/docs/app)。
-->
