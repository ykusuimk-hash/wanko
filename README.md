# WANKO VINTAGE — 古着ECサイト

古着店のためのオンラインストア一式です。LP（トップページ）、商品一覧、商品詳細、
店舗案内、ご利用ガイドで構成しています。ビルド不要の静的サイトなので、
GitHub Pages やレンタルサーバーにそのまま置けます。

デザインは「華やかより、シック」を基準に、紙と墨のようなくすんだ配色と
明朝体（Cormorant Garamond / Noto Serif JP）でまとめています。

## ページ構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | LP。ヒーロー、コンセプト、新着、カテゴリー、購入の流れ、ジャーナル、メール登録 |
| `shop.html` | 商品一覧。カテゴリー絞り込み、在庫あり／お気に入り、並び替え |
| `item.html` | 商品詳細（`item.html?id=wk-001` の形式）。実寸・状態・関連商品 |
| `about.html` | お店について、仕入れ基準、店舗情報 |
| `guide.html` | ご購入の流れ、サイズと状態の見方、FAQ、特定商取引法に基づく表記 |

```
assets/
  css/style.css     全ページ共通のスタイル
  js/products.js    ショップ設定と商品データ（ここだけ触れば商品更新できます）
  js/main.js        ヘッダー／お気に入り／スクロール表示／商品カード描画
  js/shop.js        一覧ページの絞り込み・並び替え
  js/item.js        詳細ページの描画
  img/              画像（現在はすべて差し替え用のプレースホルダーSVG）
```

## ローカルで確認する

`file://` で開くと相対パスの一部が動かないため、簡易サーバー経由で開いてください。

```bash
python3 -m http.server 8000
# → http://localhost:8000/
```

## 公開前に差し替えるところ

### 1. メルカリのURL（必須）

お会計はメルカリ上で行う想定です。`assets/js/products.js` の先頭を編集します。

```js
const SHOP = {
  mercari: "https://jp.mercari.com/user/profile/XXXXXXXX", // ← ショップのURL
  instagram: "https://www.instagram.com/XXXXXXXX",
  email: "contact@example.com",
  shipping: 800,            // 全国一律送料
  freeShippingOver: 15000   // この金額以上で送料無料
};
```

各商品の `mercari` に個別の出品URLを入れると、詳細ページの「メルカリで購入する」が
その出品ページへ直接向きます。空のままの場合は `SHOP.mercari` が使われます。

### 2. 商品を追加・更新する

`assets/js/products.js` の `PRODUCTS` に 1 商品 1 オブジェクトで追加します。
`id` は重複しない値にしてください（画像ファイル名にも使います）。

```js
{
  id: "wk-013",
  name: "Wool Duffle Coat",          // 英語名（見出しに使用）
  nameJa: "ウール ダッフルコート",      // 日本語名
  category: "outer",                  // outer / tops / knit / bottoms / dress / accessory
  price: 28000,                       // 税込
  size: "M", sizeNote: "ユニセックス",
  era: "1960s", origin: "England",
  material: "ウール 100%",
  condition: "B",                     // A / B / C
  conditionNote: "右袖に小さな擦れ。",
  status: "available",                // available / sold
  featured: true,                     // true にするとLPの「今週入荷した一着」に載ります
  tags: ["コート"],
  measurements: { "肩幅": "45cm", "身幅": "56cm", "着丈": "82cm" },
  description: "商品説明。",
  styling: "合わせ方の提案。",
  mercari: "https://jp.mercari.com/item/mXXXXXXXXXXX"
}
```

### 3. 写真を入れる

画像は `id` から機械的に組み立てています（`assets/img/wk-001-1.svg` の形式）。
現在は仮のSVGが入っているので、同じ名前で写真に差し替えるのがいちばん簡単です。
拡張子を `.jpg` などに変える場合は `products.js` 末尾の1行を変更してください。

```js
p.images = [1, 2, 3].map(n => `assets/img/${p.id}-${n}.jpg`);
```

推奨サイズは縦長の 4:5（例：1200 × 1500px）。一覧・詳細ともにこの比率で表示します。

### 4. 事業者情報

`guide.html` の「特定商取引法に基づく表記」に仮の値が入っています。
販売業者名・運営責任者・古物営業許可番号を、実際の情報に差し替えてください。
店名（WANKO）を変える場合は各HTMLの `.brand` と `<title>`、`products.js` の `SHOP.name` が対象です。

## GitHub Pages で公開する

リポジトリの Settings → Pages で、Source を `Deploy from a branch`、
Branch をこのブランチ（または `main`）の `/ (root)` に設定すれば公開されます。

## 補足

- お気に入り機能はブラウザの localStorage に保存され、サーバーには送信されません。
- メール登録フォームは送信先が未接続です。配信サービス（Mailchimp など）の
  フォームURLを `<form>` の `action` に設定すると動きます。
- サイト内で決済まで完結させたい場合は、Shopify や BASE、Stripe Checkout などの
  導入が必要です。現状はメルカリの出品ページへ送る構成になっています。
