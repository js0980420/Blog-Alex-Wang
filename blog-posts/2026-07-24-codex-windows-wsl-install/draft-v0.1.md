---
title: Codex 安裝教學：Windows、VS Code 擴充套件與 WSL2 CLI 全程實測
description: 從安裝 VS Code、WSL2、官方 Codex 擴充套件到 Codex CLI，逐步確認版本與執行環境，並用真實安裝紀錄解析 PATH 衝突。
slug: codex-windows-wsl-install
status: draft
pubDate: 2026-07-24
updatedDate: 2026-07-24
tags: [Codex, WSL2, VS Code, 安裝教學]
testedDate: 2026-07-24
testedEnvironment: Windows + VS Code 1.130.0 + WSL2 Ubuntu 24.04
faqs:
  - question: 為什麼 Codex 插件已經安裝，PowerShell 輸入 codex 還是找不到？
    answer: 因為 VS Code 插件版與終端機 CLI 版是兩個不同入口。本次實測安裝插件後直接輸入 codex，確實出現 CommandNotFoundException，仍需另外安裝 CLI。
  - question: 為什麼 Codex 顯示 Unable to send message？
    answer: 本次錯誤視窗同時顯示 Add a project to use ChatGPT，發生時 VS Code 只開了空白視窗。依畫面提示，下一步是從 File 選單按 Open Folder，先開啟專案再重新送出。
  - question: Windows 一定要使用 WSL2 才能安裝 Codex 嗎？
    answer: 不一定。本文使用 WSL2，是為了配合許多 GitHub 專案原本提供的 Linux 安裝步驟。本次沒有做 Windows 原生與 WSL2 的完整對照測試，因此不宣稱 Windows 一定不能使用。
---

> 素材狀態：本文的 WSL 與 CLI 畫面來自 2026-07-24 實際操作紀錄；標有「待補拍」的 Windows／VS Code GUI 圖片尚未取得，不應發布前移除標記。本文只收錄本次實測真正出現的警告與問題，不以假設錯誤補充篇幅。

如果你在 Windows 上準備使用 Codex 修改 GitHub 專案，我建議採用這套配置：

```text
Windows 11
└─ VS Code 桌面程式
   └─ WSL2：Ubuntu
      ├─ 專案放在 ~/code/
      ├─ 專案需要的工具
      └─ Codex CLI
```

VS Code 留在 Windows 提供圖形介面，程式、終端機與 CLI 工具放在 WSL2。這樣既保留 Windows 的操作習慣，也讓 Codex 使用接近正式 Linux 伺服器的工具環境。

## 為什麼 Windows 環境要透過 WSL2？

先說結論：**Codex 並不是不能直接裝在 Windows。本文選擇 WSL2，是因為接下來要操作的許多 GitHub 專案，官方安裝步驟本來就是寫給 Linux 環境使用。**

可以把 WSL2 想成「Windows 電腦裡的一個 Linux 工作區」。你仍然使用熟悉的 Windows、VS Code 和瀏覽器，只是讓 Codex 在這個工作區裡安裝與修改專案。

為什麼要多這一層？因為很多 GitHub 教學是依照 Linux 環境寫的。就像食譜要求使用烤箱，但你的廚房只有電鍋：不是完全做不到，而是每一步都得重新換算。Codex 如果直接在 Windows 遇到不同格式的指令，也可能需要反覆修改後才能執行。

使用 WSL2 後，Codex 可以更直接地照著專案作者的步驟操作：

- 下載專案；
- 安裝專案需要的工具；
- 填寫設定檔；
- 啟動專案；
- 發生錯誤時繼續檢查和修正。

例如，你把一個「AI 自動發文工具」的 GitHub 網址交給 Codex，而作者提供的是 Linux 安裝步驟。在 WSL2 裡可以使用同一套環境跟著操作；若改在 Windows 原生環境執行，就必須先確認作者是否另外提供 Windows 步驟。

> 實測範圍說明：這次只在 WSL2 安裝 Codex CLI，沒有同時在乾淨的 Windows 原生環境做對照測試。因此本文不宣稱「Windows 實際報了哪些錯」，也不列出任何未親自遇到的 Windows 錯誤訊息。

這也是為什麼本文選擇 WSL2：

> 不是 Windows 比較差，而是本文選擇與專案官方安裝文件相同的環境，減少自行翻譯安裝步驟。

有一點要注意：專案應放在 WSL 自己的資料夾，而不是 Windows 磁碟。本文會使用：

```bash
~/code/你的專案
```

如果你只是請 Codex 整理文件、修改簡單網頁，或使用明確支援 Windows 的工具，原生 Windows 也可以，不必強迫自己使用 WSL2。

## 為什麼要安裝 CLI？VS Code 擴充套件不夠嗎？

先解釋 CLI 是什麼：**CLI 就是在黑色終端機視窗裡，用打字的方式操作 Codex。** 它看起來沒有插件直覺，但安裝專案時反而很方便。

| 使用方式 | 適合做什麼 |
| --- | --- |
| VS Code 插件版 | 一邊看檔案一邊和 Codex 對話，適合日常修改 |
| Codex CLI 版 | 直接在執行安裝的地方與 Codex 對話，適合安裝和排錯 |

可以把兩者想成：

```text
插件版：坐在編輯桌前，請 Codex 幫你改內容
CLI 版：站在工作現場，請 Codex 直接操作和排除問題
```

安裝工具時，執行過的指令與系統回覆都會留在終端機裡。使用 CLI 版，Codex 就在同一個操作現場，不需要你另外截圖或搬運訊息。

這就是本文同時安裝 CLI 的主要原因。它可以：

- 接手安裝步驟，不必由你逐行輸入；
- 直接讀取安裝時出現的錯誤；
- 修正後重新執行，直到專案能啟動；
- 日後即使沒有開啟 VS Code，也能繼續操作。

CLI 並不是比插件版更高級，兩者使用的是同一類 Codex 能力，只是操作位置不同。最簡單的分法是：

```text
想看著檔案修改內容：使用 VS Code 插件版
想安裝 GitHub 工具或處理錯誤：使用 CLI 版
```

如果你只需要請 Codex 修改少量文字或程式，插件版可能已經足夠；如果希望它幫你把一個陌生的 GitHub 工具從下載一路裝到能用，CLI 會更貼近整個操作過程。

## 這次實測的環境

本次實測環境如下：

- WSL2 Ubuntu 24.04
- VS Code 1.130.0
- Node.js 24.11.0
- npm 11.6.1
- 已存在的 Codex CLI：0.144.6
- 乾淨隔離安裝取得的 Codex CLI：0.145.0
- VS Code 官方擴充套件：`openai.chatgpt@26.721.30844`

![WSL2、VS Code、Node 與 npm 版本的實際終端紀錄](/preview-assets/codex-windows-wsl-install/01-wsl-environment.png)

這一段是留給排錯時核對用的，新手不需要先理解每個名稱。版本會持續更新，也不必要求你的數字與本文完全相同；只要指令能正常顯示版本即可。

## 第一步：在 Windows 安裝 VS Code

前往 [VS Code 官方網站](https://code.visualstudio.com/)下載 Windows 安裝程式。安裝時建議保留「新增至 PATH」與「使用 Code 開啟」相關選項。

<!-- 待補拍 GUI-01：
Windows 瀏覽器開啟 VS Code 官方下載頁。
畫面需包含 Windows 下載按鈕；裁掉書籤、帳號頭像與私人分頁。
-->

<!-- 待補拍 GUI-02：
VS Code Windows 安裝精靈的「選取其他工作」頁面。
畫面需看得到 Add to PATH 選項。
-->

安裝完成後開啟 PowerShell，輸入：

```powershell
code --version
```

本次沒有實際遇到 VS Code 安裝錯誤，因此本文不列出未驗證的錯誤訊息；安裝後只用上面的版本指令確認結果。

## 第二步：安裝並確認 WSL2

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

## 第三步：在 VS Code 安裝 Codex 擴充套件

1. 在 VS Code 左側選擇 Extensions。
2. 搜尋 `Codex` 或 `OpenAI`。
3. 確認發行者是 OpenAI，再按下 Install。
4. 安裝後開啟 Codex 側邊欄並登入 ChatGPT。

本次實機搜尋結果如下。畫面上同時看得到插件名稱 **Codex – OpenAI’s coding agent**、發行者 **OpenAI** 與藍色 **Install** 按鈕：

![在 VS Code Marketplace 搜尋並準備安裝 OpenAI 官方 Codex 插件](/preview-assets/codex-windows-wsl-install/05-vscode-codex-marketplace-install.png)

這次實測透過 VS Code CLI 查到：

```text
openai.chatgpt@26.721.30844
```

![VS Code CLI 偵測到官方 Codex 擴充套件](/preview-assets/codex-windows-wsl-install/02-vscode-extension-detected.png)

這張圖能證明擴充套件已被目前的 WSL Remote 視窗偵測，但不能取代 Marketplace 的點擊安裝畫面，所以兩種證據都保留。

## 實測錯誤一：裝好插件，PowerShell 還是找不到 `codex`

插件安裝完成後，我直接在 VS Code 的 Windows PowerShell 終端機輸入：

```powershell
codex
```

終端機真的出現以下原文：

```text
codex : 無法辨識 'codex' 詞彙是否為 Cmdlet、函數、指令檔或可執行程式的名稱。
請檢查名稱拼字是否正確，如果包含路徑的話，請確認路徑是否正確，然後再試一次。
位於 線路:1 字元:1
+ codex
+ ~~~~~
    + CategoryInfo          : ObjectNotFound: (codex:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```

![Codex 插件已安裝，但 Windows PowerShell 找不到 codex 指令的實機畫面](/preview-assets/codex-windows-wsl-install/06-vscode-codex-installed-cli-not-found.png)

這張圖證明「VS Code 插件版」與「終端機裡的 CLI 版」是兩個不同入口。插件已經能在右側開啟，不代表 PowerShell 已經存在 `codex` 指令。這不是推測，而是本次安裝後立刻驗證得到的結果。

## 實測錯誤二：沒有開啟專案，Codex 無法送出訊息

接著我在全新的 VS Code 視窗開啟 Codex，直接輸入訊息並送出，畫面跳出：

```text
Unable to send message

Add a project to use ChatGPT
```

![VS Code 沒有開啟專案時，Codex 顯示 Unable to send message](/preview-assets/codex-windows-wsl-install/07-vscode-unable-to-send-no-project.png)

錯誤視窗給出的直接線索是 `Add a project to use ChatGPT`，而當時確實只開了 VS Code 空白視窗，沒有開啟任何資料夾。接下來採取的修正動作是建立並開啟一個示範專案：

```text
C:\Users\js098\codex-cli-install-demo
```

在 VS Code 上方選單依序點擊 **File → Open Folder...**：

![在 VS Code 的 File 選單選擇 Open Folder](/preview-assets/codex-windows-wsl-install/08-vscode-file-open-folder.png)

左側 Explorer 看得到該資料夾後，再回到 Codex 送出訊息。修正後是否成功，必須以接下來的實際送出結果為準；目前不提前宣稱已排除。

## 第四步：在 WSL2 安裝 Codex CLI

OpenAI 目前提供獨立安裝腳本。在 WSL 的 Ubuntu 終端機執行：

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

本次為了不覆蓋正在使用的 Codex，我將 `CODEX_HOME` 與安裝目錄指向隔離位置，實際下載並安裝出 `0.145.0`。安裝器正確辨識：

- 作業系統為 Linux x64；
- 最新版本為 0.145.0；
- 電腦上已存在 npm 管理的 Codex；
- 同時存在多份 Codex 時，PATH 順序會決定實際執行哪一份。

![Codex CLI 官方安裝腳本的實際輸出](/preview-assets/codex-windows-wsl-install/03-codex-clean-install.png)

隔離測試還出現一個正常安裝較少遇到的警告：

```text
WARNING: proceeding, even though we could not create PATH aliases:
Refusing to create helper binaries under temporary dir "/tmp"
```

這不是下載失敗。原因是本次刻意把安裝位置放在 `/tmp`，安裝器拒絕在暫存目錄建立長期 PATH helper；最後仍明確顯示安裝成功。一般使用者採用預設安裝位置時，不應照抄本次隔離路徑。

## 第五步：確認真正執行的是哪一份 Codex

安裝完成後執行：

```bash
which codex
codex --version
```

不要只看「安裝成功」。這次測試電腦原本透過 npm 安裝了 `0.144.6`，隔離測試又安裝了 `0.145.0`。直接輸入 `codex` 時仍會執行 PATH 排在前面的舊版本：

![兩份 Codex CLI 造成的 PATH 版本差異](/preview-assets/codex-windows-wsl-install/04-codex-version-check.png)

這就是常見的「明明更新成功，版本卻沒有變」：

```text
安裝器下載的新版本：0.145.0
直接輸入 codex：0.144.6
原因：PATH 先找到原本的 npm 版本
```

排查時可執行：

```bash
type -a codex
which codex
codex --version
```

先確認每一份執行檔的位置，再決定保留哪一種安裝方式，不要一看到衝突就刪除整個 Node 或 WSL。

## 第六步：登入並開始使用

執行：

```bash
codex
```

依畫面指示用 ChatGPT 帳號登入。CLI 與 IDE 擴充套件在同一個執行環境下可以共用 Codex 設定與登入資料；若一個安裝在 Windows、另一個安裝在 WSL，則可能各自使用不同的 home 目錄。

<!-- 待補拍 GUI-06：
Codex VS Code 側邊欄登入完成畫面。不得露出電子郵件、工作區名稱、token 或私人專案。
-->

<!-- 待補拍 GUI-07：
VS Code WSL 整合終端機執行 codex --version，並開啟 Codex CLI 首頁。
-->

## 本次實測真正遇到的問題

### `CommandNotFoundException`

插件安裝完成後，在 Windows PowerShell 輸入 `codex`，實際出現 `CommandNotFoundException`。原因是插件版不等於 CLI 版，完整原文與實機截圖已保留在第三步。

### `Unable to send message`

在沒有開啟資料夾的 VS Code 空白視窗送出訊息，實際出現 `Add a project to use ChatGPT`。目前已依提示建立並開啟專案資料夾，等待下一次實際送出驗證。

### 安裝成功，但 `codex --version` 還是舊版

執行：

```bash
type -a codex
```

如果顯示兩個以上位置，就是 PATH 優先順序問題。本文的實測正好重現了這個情況。

本次還遇到安裝器拒絕在 `/tmp` 建立長期捷徑的警告，原始訊息已完整保留在前面的終端紀錄。因為這是本文刻意使用隔離測試目錄造成，而且最後安裝成功，所以沒有把它延伸成其他未實測案例。

## 結論

對 Windows 新手，最穩定的 Codex 開發配置不是把所有東西都塞進 Windows，也不是完全放棄 Windows，而是：

- Windows 負責 VS Code 與瀏覽器；
- WSL2 負責專案、Git、Node 與 Codex CLI；
- VS Code 透過 WSL Remote 連進 Linux 環境；
- 每次安裝後都用 `which codex` 和 `codex --version` 驗證。

這次實測最重要的發現是：**「安裝成功」不代表目前執行的就是剛安裝的版本。** 保留安裝輸出，再檢查 PATH，才能真正確認工具已經準備完成。

## 官方參考資料

- [OpenAI：Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [OpenAI：Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [OpenAI：Codex on WSL](https://learn.chatgpt.com/docs/windows/wsl)
- [OpenAI：Codex Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)
- [Visual Studio Code：WSL 教學](https://code.visualstudio.com/docs/remote/wsl-tutorial)
