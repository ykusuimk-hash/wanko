/* =========================================================
   商品データ / ショップ設定
   ---------------------------------------------------------
   ・実運用時はこのファイルだけを差し替えれば商品を更新できます。
   ・mercari には各商品のメルカリ出品URLを入れてください。
     空文字のままの場合は「メルカリで見る」ボタンがショップの
     プロフィールページ（SHOP.mercari）に向きます。
   ========================================================= */

const SHOP = {
  name: "WANKO",
  nameJa: "ワンコ ヴィンテージ",
  tagline: "選び抜いた一着を、静かに長く。",
  // ▼ メルカリのショップ（プロフィール）URLをここに設定してください
  mercari: "https://jp.mercari.com/",
  instagram: "https://www.instagram.com/",
  email: "contact@example.com",
  shipping: 800,          // 全国一律送料（円）
  freeShippingOver: 15000 // この金額以上で送料無料（円）
};

const CATEGORIES = [
  { id: "outer",     label: "アウター",     en: "Outerwear" },
  { id: "tops",      label: "トップス",     en: "Tops" },
  { id: "knit",      label: "ニット",       en: "Knitwear" },
  { id: "bottoms",   label: "ボトムス",     en: "Bottoms" },
  { id: "dress",     label: "ワンピース",   en: "Dress" },
  { id: "accessory", label: "小物",         en: "Accessories" }
];

const PRODUCTS = [
  {
    id: "wk-001",
    name: "French Moleskin Work Jacket",
    nameJa: "フレンチ モールスキン ワークジャケット",
    category: "outer",
    price: 24800,
    size: "M",
    sizeNote: "メンズ M 相当 / ユニセックス",
    era: "1950s",
    origin: "France",
    material: "コットン モールスキン 100%",
    condition: "B",
    conditionNote: "右袖口に小さな擦れ、左前身頃に薄いインク跡。着用に支障はありません。",
    status: "available",
    featured: true,
    tags: ["ワーク", "ユーロヴィンテージ", "黒染め"],
    measurements: { "肩幅": "46cm", "身幅": "56cm", "着丈": "68cm", "裄丈": "60cm" },
    description:
      "フランスの労働着として生まれたモールスキンのワークジャケット。長い年月で角が取れた生地は、墨を落としたような深い黒から少しずつ緑がかった黒へと色を変えています。無骨になりすぎない箱型のシルエットで、シャツの上にも、薄手のニットの上にも。",
    styling: "細身のスラックスとローファーを合わせると、work wear の素朴さが品よく落ち着きます。",
    mercari: ""
  },
  {
    id: "wk-002",
    name: "Cashmere Balmacaan Coat",
    nameJa: "カシミヤ バルマカーン コート",
    category: "outer",
    price: 38000,
    size: "L",
    sizeNote: "ゆったりとしたオーバーサイズ",
    era: "1970s",
    origin: "England",
    material: "カシミヤ 100%",
    condition: "A",
    conditionNote: "目立つ傷汚れなし。裏地・ボタンともにオリジナル。",
    status: "available",
    featured: true,
    tags: ["コート", "カシミヤ", "ラグランスリーブ"],
    measurements: { "肩幅": "ラグラン", "身幅": "62cm", "着丈": "108cm", "袖丈": "84cm" },
    description:
      "とろりと落ちるカシミヤのバルマカーンコート。杢のグレージュは光の当たり方で表情が変わり、季節の変わり目の光によく似合います。ラグランスリーブのやわらかな肩線が、重さを感じさせません。",
    styling: "中に厚みのあるニットを着ても窮屈にならない身幅。足元は黒のレザーで引き締めて。",
    mercari: ""
  },
  {
    id: "wk-003",
    name: "Silk Blouse / Black",
    nameJa: "シルク ブラウス ブラック",
    category: "tops",
    price: 12800,
    size: "S / M",
    sizeNote: "レディース 7〜9号相当",
    era: "1980s",
    origin: "Italy",
    material: "シルク 100%",
    condition: "A",
    conditionNote: "袖口の内側にわずかなアタリ。全体的に良好です。",
    status: "available",
    featured: true,
    tags: ["シルク", "ブラック", "きれいめ"],
    measurements: { "肩幅": "39cm", "身幅": "50cm", "着丈": "62cm", "袖丈": "58cm" },
    description:
      "生地の重みだけで美しい落ち感が生まれる、上質なシルクのブラウス。光沢を抑えたマットな黒で、夜のレストランにも、平日の会議にも。ボタンは共布でくるまれた控えめな仕様です。",
    styling: "第一ボタンまで留めて、細いシルバーのネックレスを一本だけ。",
    mercari: ""
  },
  {
    id: "wk-004",
    name: "Harris Tweed Tailored Jacket",
    nameJa: "ハリスツイード テーラードジャケット",
    category: "outer",
    price: 19800,
    size: "M",
    sizeNote: "メンズ 38R 相当",
    era: "1960s",
    origin: "Scotland",
    material: "ウール 100%（ハリスツイード）",
    condition: "B",
    conditionNote: "襟裏に小さな虫食い補修跡（1cm程度）。着用時は見えません。",
    status: "available",
    featured: false,
    tags: ["ツイード", "英国", "秋冬"],
    measurements: { "肩幅": "44cm", "身幅": "53cm", "着丈": "73cm", "袖丈": "62cm" },
    description:
      "オリーブとブラウンの杢に、ごく細い赤のウィンドウペーンが走るハリスツイード。近づいて初めて気づく色の重なりが、この一着の静かな贅沢です。三つボタン段返り、サイドベンツ。",
    styling: "白シャツとデニムという普段着に羽織るだけで、輪郭が整います。",
    mercari: ""
  },
  {
    id: "wk-005",
    name: "Aran Hand-knit Sweater",
    nameJa: "アラン ハンドニット セーター",
    category: "knit",
    price: 16800,
    size: "M / L",
    sizeNote: "ユニセックス",
    era: "1970s",
    origin: "Ireland",
    material: "ウール 100%（ハンドニット）",
    condition: "A",
    conditionNote: "毛玉・虫食いなし。ふくらみのある良好なコンディション。",
    status: "available",
    featured: true,
    tags: ["ニット", "生成り", "手編み"],
    measurements: { "身幅": "58cm", "着丈": "66cm", "裄丈": "80cm" },
    description:
      "アイルランドの手編みによるアランセーター。ハニカム、ケーブル、ダイヤ——それぞれに祈りの意味を持つ編み地が、生成りの一色の中で陰影をつくります。使い込むほどに毛が絡み、密度が増していく生地です。",
    styling: "一枚で主役になるので、下はシンプルな黒のパンツで十分。",
    mercari: ""
  },
  {
    id: "wk-006",
    name: "Wool Gabardine Trousers",
    nameJa: "ウール ギャバジン トラウザーズ",
    category: "bottoms",
    price: 13800,
    size: "W30",
    sizeNote: "ウエスト実寸 78cm",
    era: "1960s",
    origin: "France",
    material: "ウール 100%",
    condition: "B",
    conditionNote: "裾を一度お直しした形跡あり。generous な折り返し幅が残っています。",
    status: "available",
    featured: false,
    tags: ["スラックス", "2タック", "チャコール"],
    measurements: { "ウエスト": "78cm", "股上": "31cm", "股下": "74cm", "裾幅": "21cm" },
    description:
      "目の詰まったウールギャバジンの2タックトラウザーズ。チャコールグレーの、少しだけ青みを感じる色。腰まわりに余裕があり、太腿から裾へ緩やかに落ちる戦後ヨーロッパらしいシルエットです。",
    styling: "ニットをタックインして、革のベルトを細く。",
    mercari: ""
  },
  {
    id: "wk-007",
    name: "Antique Linen Dress",
    nameJa: "アンティーク リネン ワンピース",
    category: "dress",
    price: 22800,
    size: "F",
    sizeNote: "フリー（ゆったり）",
    era: "1930s",
    origin: "Europe",
    material: "リネン 100%",
    condition: "C",
    conditionNote: "経年による小さなシミが数点、裾に補修跡。アンティークとしての風合いとしてお楽しみください。",
    status: "available",
    featured: false,
    tags: ["アンティーク", "リネン", "生成り"],
    measurements: { "身幅": "54cm", "着丈": "128cm", "袖丈": "48cm" },
    description:
      "百年近い時間を経た、ヨーロッパのリネンワンピース。幾度も洗われた生地はやわらかく、生成りは少しだけ生成りではなくなっています。装飾はほとんどなく、ただ布の良さだけが残ったような一着。",
    styling: "そのままでも、ベルトで腰の位置を作っても。",
    mercari: ""
  },
  {
    id: "wk-008",
    name: "Levi's 501 / Made in USA",
    nameJa: "リーバイス 501 アメリカ製",
    category: "bottoms",
    price: 18800,
    size: "W32 L34",
    sizeNote: "ウエスト実寸 81cm",
    era: "1980s",
    origin: "U.S.A.",
    material: "コットン 100%",
    condition: "B",
    conditionNote: "自然な色落ち、右膝に薄いアタリ。破れなし。",
    status: "sold",
    featured: false,
    tags: ["デニム", "USA製", "色落ち"],
    measurements: { "ウエスト": "81cm", "股上": "29cm", "股下": "82cm", "裾幅": "20cm" },
    description:
      "穿き込まれた末に落ち着いた、青ではなく灰に近い色。縦落ちは強く出ず、全体がやわらかく褪せた、静かな一本です。",
    styling: "きれいめのジャケットの下に。",
    mercari: ""
  },
  {
    id: "wk-009",
    name: "Cashmere Stole / Charcoal",
    nameJa: "カシミヤ ストール チャコール",
    category: "accessory",
    price: 9800,
    size: "70 × 190cm",
    sizeNote: "フリンジ含む",
    era: "1990s",
    origin: "Scotland",
    material: "カシミヤ 100%",
    condition: "A",
    conditionNote: "使用感の少ない良品。",
    status: "available",
    featured: false,
    tags: ["ストール", "カシミヤ", "無地"],
    measurements: { "幅": "70cm", "長さ": "190cm" },
    description:
      "薄手でありながら驚くほど温かい、スコットランド製のカシミヤストール。無地のチャコールは、コートの色を選びません。畳むと手のひらに収まる軽さです。",
    styling: "ざっくりと肩にかけるだけで、首元の余白が整います。",
    mercari: ""
  },
  {
    id: "wk-010",
    name: "Leather Tassel Loafers",
    nameJa: "レザー タッセル ローファー",
    category: "accessory",
    price: 15800,
    size: "US 8 / 26cm",
    sizeNote: "ソール交換済み",
    era: "1980s",
    origin: "U.S.A.",
    material: "牛革 / レザーソール",
    condition: "B",
    conditionNote: "アッパーに履きジワ。ソールは交換済みで、まだ長くお使いいただけます。",
    status: "available",
    featured: false,
    tags: ["靴", "ローファー", "ダークブラウン"],
    measurements: { "表記": "US 8", "実寸": "26.0cm", "ヒール": "2.5cm" },
    description:
      "深いダークブラウンのタッセルローファー。磨き込まれた甲の部分に、前の持ち主の歩き方が残っています。ソールは交換済みで、これからの時間のほうが長い一足です。",
    styling: "ウールのトラウザーズと。素足に近い薄手の靴下で軽やかに。",
    mercari: ""
  },
  {
    id: "wk-011",
    name: "Cotton Band Collar Shirt",
    nameJa: "コットン バンドカラー シャツ",
    category: "tops",
    price: 8800,
    size: "M",
    sizeNote: "ユニセックス",
    era: "1970s",
    origin: "Europe",
    material: "コットン 100%",
    condition: "B",
    conditionNote: "全体に自然な着用感。第三ボタンのみ交換されています。",
    status: "available",
    featured: false,
    tags: ["シャツ", "生成り", "羽織り"],
    measurements: { "肩幅": "45cm", "身幅": "55cm", "着丈": "74cm", "袖丈": "59cm" },
    description:
      "ヨーロッパの寝間着に由来するバンドカラーシャツ。洗いざらしのコットンは空気を含んでやわらかく、首元が開いているぶん、顔まわりが軽く見えます。",
    styling: "ボタンを開けて羽織りものに。中は無地のカットソーで。",
    mercari: ""
  },
  {
    id: "wk-012",
    name: "Silver Vintage Bangle",
    nameJa: "シルバー ヴィンテージ バングル",
    category: "accessory",
    price: 11800,
    size: "内周 16cm",
    sizeNote: "サイズ調整可",
    era: "1960s",
    origin: "U.S.A.",
    material: "シルバー 925",
    condition: "A",
    conditionNote: "小傷はありますが、経年の味として美しい状態です。",
    status: "sold",
    featured: false,
    tags: ["アクセサリー", "シルバー", "ナバホ"],
    measurements: { "内周": "16cm", "幅": "9mm", "重さ": "28g" },
    description:
      "装飾を削ぎ落とした、細身のシルバーバングル。磨きすぎず、くすみを残したまま置いています。時間の層がそのまま光になっているような一点です。",
    styling: "袖から少しだけ覗く程度に。重ね付けはせず一本で。",
    mercari: ""
  }
];

/* 画像パスは products 側に持たせず、id から機械的に組み立てます
   （assets/img/wk-001-1.svg のような命名。写真に差し替える際も同じ命名で） */
PRODUCTS.forEach(p => {
  p.images = [1, 2, 3].map(n => `assets/img/${p.id}-${n}.svg`);
});
