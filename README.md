# あみだくじ（Web & iOS）

## 構成
- `web-pwa/` … スマホ対応のPWA版（GitHub Pagesで公開可能）
- `standalone/` … サーバー不要・完全オフラインの単体HTML版（参考）
- `ios-capacitor/` … iOSアプリ化（Capacitor）プロジェクト雛形

## GitHub Pagesで公開（任意）
1. リポジトリを **Public** または **Private** で作成
2. `web-pwa/` をルートではなく **Pagesの公開対象** に指定（Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / Folder: `/web-pwa`）
3. 数分後、公開URLが発行されます

## iOS（IPA）を作る
### ローカルで（推奨：Mac）
```bash
cd ios-capacitor
npm ci
npm run build
npx cap add ios
npx cap copy ios
npx cap open ios  # Xcodeで開いて、Signing & Capabilities を自分のTeamに
# Product → Archive → Distribute → Ad Hoc または Development で .ipa をエクスポート
```
- `capacitor.config.json` の `appId` と `appName` を適宜変更
- 署名には Apple Developer Program が必要（個人用でOK）

### GitHub Actionsで（任意）
- `.github/workflows/ios-build.yml` を使う場合、以下のSecretsを登録してください：
  - `APPLE_CERT_BASE64` … 開発/配布証明書（.p12）をbase64化した文字列
  - `APPLE_CERT_PASSWORD` … 上記p12のパスワード
  - `APPLE_TEAM_ID` … Team ID（例：AB12C3D456）
  - `APPLE_BUNDLE_ID` … バンドルID（例：com.example.amida）

## 署名せずにAltStoreでインストール（非公式）
- AltStore/AltServerを使えば、個人Apple IDで7日有効な署名を使ってサイドロードが可能です
- この場合 `.ipa` を用意する必要があるため、Xcodeで一度 Ad Hoc などで書き出してください

