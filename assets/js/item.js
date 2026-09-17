/* =========================================================
   商品詳細ページ
   ========================================================= */
(function () {
  "use strict";
  const { $, $$, yen, catLabel, catEn, productById, favs, renderCards, initAccordion } = window.WK;

  const id = new URLSearchParams(location.search).get("id");
  const p = id ? productById(id) : null;
  const root = $("#item-root");

  if (!p) {
    root.innerHTML = `
      <div class="empty">
        <p>お探しの商品は見つかりませんでした。すでにお迎えいただいた可能性があります。</p>
        <p style="margin-top:24px"><a class="btn btn--ghost" href="shop.html">商品一覧へ戻る</a></p>
      </div>`;
    return;
  }

  document.title = `${p.nameJa}｜${SHOP.name}`;
  const desc = $('meta[name="description"]');
  if (desc) desc.setAttribute("content", `${p.nameJa}（${p.era} / ${p.origin}）${p.description.slice(0, 70)}`);

  const sold = p.status === "sold";
  const mercariUrl = p.mercari || SHOP.mercari;
  const shipText = p.price >= SHOP.freeShippingOver
    ? "送料無料"
    : `送料 ¥${yen(SHOP.shipping)}（¥${yen(SHOP.freeShippingOver)}以上で無料）`;

  const specRows = Object.keys(p.measurements)
    .map(k => `<tr><th>${k}</th><td>${p.measurements[k]}</td></tr>`).join("");

  /* ---------- パンくず ---------- */
  $("#crumb").innerHTML =
    `<a href="index.html">Home</a><span>/</span><a href="shop.html?cat=${p.category}">${catEn(p.category)}</a><span>/</span>${p.name}`;

  /* ---------- 本体 ---------- */
  root.innerHTML = `
    <div class="item">
      <div class="item__gallery reveal">
        <div class="item__main"><img id="main-img" src="${p.images[0]}" alt="${p.nameJa}" width="800" height="1000"></div>
        <div class="item__thumbs">
          ${p.images.map((src, i) =>
            `<button type="button" class="${i === 0 ? "is-on" : ""}" data-src="${src}" aria-label="画像${i + 1}を表示">
               <img src="${src}" alt="" loading="lazy"></button>`).join("")}
        </div>
      </div>

      <div class="item__info reveal" data-delay="1">
        <p class="eyebrow" style="margin-bottom:10px">${catEn(p.category)} — ${p.era} ${p.origin}</p>
        <h1 class="item__title">${p.name}</h1>
        <p class="item__jp">${p.nameJa}</p>
        <p class="item__price"><span style="font-size:13px">¥</span>${yen(p.price)}<span class="tax">税込 / ${shipText}</span></p>

        <div class="item__cta">
          ${sold
            ? '<span class="btn btn--wide is-disabled">Sold Out</span>'
            : `<a class="btn btn--wide" href="${mercariUrl}" target="_blank" rel="noopener noreferrer">メルカリで購入する</a>`}
          <button class="btn btn--ghost btn--wide" type="button" data-fav="${p.id}" aria-pressed="${favs.has(p.id)}">
            <span id="fav-label">${favs.has(p.id) ? "お気に入り登録済み" : "お気に入りに追加"}</span>
          </button>
        </div>
        <p class="item__note">
          ${sold
            ? "この商品は販売済みです。同様のお品が入荷した際はメールマガジンでお知らせします。"
            : "ご購入・お支払いはメルカリ上で完結します。サイズや状態のご質問はメルカリのコメント欄、またはメールにてお気軽にどうぞ。"}
        </p>

        <table class="spec">
          <tbody>
            <tr><th>Category</th><td>${catLabel(p.category)}</td></tr>
            <tr><th>Size</th><td>${p.size}${p.sizeNote ? `<br><span class="muted">${p.sizeNote}</span>` : ""}</td></tr>
            <tr><th>Era</th><td>${p.era}</td></tr>
            <tr><th>Origin</th><td>${p.origin}</td></tr>
            <tr><th>Material</th><td>${p.material}</td></tr>
            <tr><th>Condition</th><td>${p.condition}<br><span class="muted">${p.conditionNote}</span></td></tr>
          </tbody>
        </table>

        <div class="acc">
          <div class="acc__item is-open">
            <button class="acc__btn" type="button" aria-expanded="true">この一着について</button>
            <div class="acc__panel"><p style="margin:0 0 1em">${p.description}</p><p style="margin:0"><span class="muted">Styling — </span>${p.styling}</p></div>
          </div>
          <div class="acc__item">
            <button class="acc__btn" type="button" aria-expanded="false">実寸（平置き）</button>
            <div class="acc__panel"><table class="spec" style="margin-top:0"><tbody>${specRows}</tbody></table>
              <p class="muted" style="font-size:12px">※ 採寸は平置きでの実寸です。1〜2cm の誤差はご容赦ください。</p></div>
          </div>
          <div class="acc__item">
            <button class="acc__btn" type="button" aria-expanded="false">コンディション表記について</button>
            <div class="acc__panel">
              <p style="margin:0 0 .8em"><b>A</b> — 使用感の少ない良好な状態</p>
              <p style="margin:0 0 .8em"><b>B</b> — 着用感や小さなダメージがあるが問題なく着られる状態</p>
              <p style="margin:0"><b>C</b> — 経年のダメージを味としてお楽しみいただく状態</p>
            </div>
          </div>
          <div class="acc__item">
            <button class="acc__btn" type="button" aria-expanded="false">配送・返品</button>
            <div class="acc__panel">
              <p style="margin:0 0 .8em">ご入金確認後 1〜3日以内に発送します（日曜・祝日を除く）。</p>
              <p style="margin:0">古着という性質上、お客様都合による返品は承っておりません。記載のない大きなダメージがあった場合は到着後7日以内にご連絡ください。</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  /* ---------- ギャラリー ---------- */
  const mainImg = $("#main-img");
  $$(".item__thumbs button").forEach(btn => {
    btn.addEventListener("click", () => {
      mainImg.src = btn.dataset.src;
      $$(".item__thumbs button").forEach(b => b.classList.toggle("is-on", b === btn));
    });
  });

  /* ---------- お気に入りボタンのラベル ---------- */
  document.addEventListener("favchange", e => {
    if (e.detail.id !== p.id) return;
    $("#fav-label").textContent = favs.has(p.id) ? "お気に入り登録済み" : "お気に入りに追加";
  });

  /* ---------- 関連商品 ---------- */
  const related = PRODUCTS
    .filter(x => x.id !== p.id && (x.category === p.category || x.era === p.era))
    .slice(0, 4);
  if (related.length) {
    renderCards($("#related"), related);
  } else {
    $("#related-section").hidden = true;
  }

  initAccordion(root);
  window.WK.observeReveal(root);
})();
