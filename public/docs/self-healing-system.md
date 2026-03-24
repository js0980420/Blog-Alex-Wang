# 雙機自癒系統 (Dual-Machine Self-Healing System)

這是「雙機自癒系統」的完整安裝與啟動流程，主要透過 Tailscale 搭配修復腳本來確保兩台機器能夠互相監測與修復。

## 1. 安裝與連線 (Install & Up)

在**兩台** OpenClaw 機器上都要執行：

### 一鍵安裝 Tailscale
```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

### 啟動並綁定帳號
執行後會跳出一個網址，點選網址並授權登入即可：
```bash
tailscale up --ssh
```
> **避坑點提示**：記得一定要加上 `--ssh` 參數，這樣 Tailscale 才會接管系統的 SSH 功能，讓後續的無密碼「互修」機制更方便順暢。

## 2. 金身配置 (避開 Host Key 坑)

在負責「修復別人」的那台**發起端機器**上執行：

```bash
mkdir -p ~/.ssh && echo -e "Host 100.*\n    StrictHostKeyChecking no\n    UserKnownHostsFile /dev/null" >> ~/.ssh/config
```
> 這一步可避免 SSH 連線時因為詢問指紋憑證（Host Key Checking）而造成腳本卡死。

## 3. 設定修復腳本 (OpenClaw Repair)

確認 `openclaw_repair.sh` 已經就緒，並給予執行權限：

```bash
chmod +x /home/node/.openclaw/workspace/openclaw_repair.sh
```

## 4. 啟用自動監測服務 (Cron)

執行 `crontab -e` 以編輯排程，並在檔案最後加入以下巡檢指令（設定每五分鐘檢查一次）：

```cron
*/5 * * * * /home/node/.openclaw/workspace/openclaw_repair.sh >> /home/node/.openclaw/workspace/repair.log 2>&1
```
