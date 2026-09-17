/* =========================================================
   商品一覧ページ（絞り込み・並び替え）
   ========================================================= */
(function () {
  "use strict";
  const { $, $$, renderCards, favs } = window.WK;

  const state = { cat: "all", sort: "new", inStockOnly: false, favOnly: false };

  const grid    = $("#grid");
  const count   = $("#result-count");
  const empty   = $("#empty");
  const chipBox = $("#cat-chips");

  /* URL の ?cat= を初期値に使う（LPのカテゴリー導線から遷移してくる） */
  const params = new URLSearchParams(location.search);
  if (params.get("cat") && CATEGORIES.some(c => c.id === params.get("cat"))) {
    state.cat = params.get("cat");
  }
  if (params.get("fav") === "1") state.favOnly = true;

  /* ---------- カテゴリーチップ ---------- */
  function buildChips() {
    const items = [{ id: "all", label: "すべて", en: "All" }].concat(CATEGORIES);
    chipBox.innerHTML =
      '<span class="label">Category</span>' +
      items.map(c =>
        `<button type="button" class="chip${c.id === state.cat ? " is-on" : ""}" data-cat="${c.id}">${c.label}</button>`
      ).join("");
  }

  /* ---------- 絞り込み・並び替え ---------- */
  function visible() {
    let list = PRODUCTS.slice();
    if (state.cat !== "all")  list = list.filter(p => p.category === state.cat);
    if (state.inStockOnly)    list = list.filter(p => p.status !== "sold");
    if (state.favOnly) {
      const ids = favs.all();
      list = list.filter(p => ids.indexOf(p.id) !== -1);
    }
    switch (state.sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "era":        list.sort((a, b) => parseInt(a.era, 10) - parseInt(b.era, 10)); break;
      default:           /* new = データ登録順。SOLD は後ろへ */ break;
    }
    // 在庫ありを常に先に見せる
    return list.sort((a, b) => (a.status === "sold") - (b.status === "sold"));
  }

  function render() {
    const list = visible();
    renderCards(grid, list);
    count.textContent = `${list.length} items`;
    empty.hidden = list.length > 0;
    $$("[data-cat]", chipBox).forEach(b => b.classList.toggle("is-on", b.dataset.cat === state.cat));

    const url = new URL(location.href);
    if (state.cat === "all") url.searchParams.delete("cat"); else url.searchParams.set("cat", state.cat);
    if (state.favOnly) url.searchParams.set("fav", "1"); else url.searchParams.delete("fav");
    history.replaceState(null, "", url);
  }

  /* ---------- イベント ---------- */
  chipBox.addEventListener("click", e => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    state.cat = btn.dataset.cat;
    render();
  });

  $("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });

  $("#in-stock").addEventListener("click", e => {
    state.inStockOnly = !state.inStockOnly;
    e.currentTarget.classList.toggle("is-on", state.inStockOnly);
    render();
  });

  const favBtn = $("#fav-only");
  favBtn.addEventListener("click", e => {
    state.favOnly = !state.favOnly;
    e.currentTarget.classList.toggle("is-on", state.favOnly);
    render();
  });

  /* お気に入り解除時、お気に入り表示中なら一覧を更新する */
  document.addEventListener("favchange", () => { if (state.favOnly) render(); });

  buildChips();
  favBtn.classList.toggle("is-on", state.favOnly);
  render();
})();
