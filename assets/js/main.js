/* =========================================================
   共通スクリプト
   ヘッダー / ドロワー / スクロール表示 / お気に入り / カード描画
   ========================================================= */
(function () {
  "use strict";

  /* ---------- utilities ---------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const yen = n => Number(n).toLocaleString("ja-JP");

  const catLabel = id => (CATEGORIES.find(c => c.id === id) || {}).label || id;
  const catEn    = id => (CATEGORIES.find(c => c.id === id) || {}).en || id;

  const productById = id => PRODUCTS.find(p => p.id === id) || null;

  /* ---------- お気に入り（localStorage / 失敗しても動く） ---------- */
  const FAV_KEY = "wanko.favorites";

  function readFavs() {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function writeFavs(list) {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(list));
    } catch (e) {
      /* プライベートブラウジング等では保存できないが、表示は継続する */
    }
  }

  const favs = {
    all: () => readFavs(),
    has: id => readFavs().indexOf(id) !== -1,
    toggle(id) {
      const list = readFavs();
      const i = list.indexOf(id);
      if (i === -1) list.push(id); else list.splice(i, 1);
      writeFavs(list);
      paintFavCount();
      document.dispatchEvent(new CustomEvent("favchange", { detail: { id } }));
      return i === -1;
    }
  };

  function paintFavCount() {
    const n = readFavs().length;
    $$("[data-fav-count]").forEach(el => {
      el.textContent = n;
      el.style.display = n ? "" : "none";
    });
  }

  /* ---------- 商品カード ---------- */
  function cardHTML(p) {
    const sold = p.status === "sold";
    const isFav = favs.has(p.id);
    return `
      <article class="card${sold ? " is-sold" : ""} reveal" data-id="${p.id}">
        <a class="card__media" href="item.html?id=${encodeURIComponent(p.id)}" aria-label="${p.nameJa}">
          ${sold ? '<span class="card__badge card__badge--sold">Sold</span>' : ""}
          <img src="${p.images[0]}" alt="${p.nameJa}" loading="lazy" width="800" height="1000">
        </a>
        <button class="card__fav${isFav ? " is-on" : ""}" type="button"
                data-fav="${p.id}" aria-pressed="${isFav}" aria-label="お気に入りに追加">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5 4.2 12.9a4.6 4.6 0 0 1 6.5-6.5l1.3 1.3 1.3-1.3a4.6 4.6 0 1 1 6.5 6.5Z"/></svg>
        </button>
        <div class="card__body">
          <a href="item.html?id=${encodeURIComponent(p.id)}">
            <p class="card__cat">${catEn(p.category)} — ${p.era}</p>
            <h3 class="card__name">${p.name}</h3>
            <p class="card__jp">${p.nameJa}</p>
            <p class="card__meta">
              <span class="card__price"><span class="yen">¥</span>${yen(p.price)}</span>
              <span class="card__size">Size ${p.size}</span>
            </p>
          </a>
        </div>
      </article>`;
  }

  function renderCards(container, list) {
    if (!container) return;
    container.innerHTML = list.map(cardHTML).join("");
    observeReveal(container);
  }

  /* お気に入りボタン（動的に描画されるのでイベント委譲） */
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-fav]");
    if (!btn) return;
    e.preventDefault();
    const on = favs.toggle(btn.getAttribute("data-fav"));
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-pressed", String(on));
  });

  /* ---------- スクロールで現れる ---------- */
  let io = null;
  function observeReveal(root = document) {
    const targets = $$(".reveal:not(.is-in)", root);
    if (!("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("is-in"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    targets.forEach(el => io.observe(el));
  }

  /* ---------- ヘッダー ---------- */
  function initHeader() {
    const header = $(".header");
    if (!header) return;
    const overHero = header.classList.contains("is-over");

    const onScroll = () => {
      const past = window.scrollY > 40;
      header.classList.toggle("is-solid", past);
      if (overHero) header.classList.toggle("is-over", !past);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const burger = $(".burger");
    if (burger) {
      burger.addEventListener("click", () => {
        const open = document.body.classList.toggle("is-menu-open");
        burger.setAttribute("aria-expanded", String(open));
      });
      $$(".drawer a").forEach(a => a.addEventListener("click", () => {
        document.body.classList.remove("is-menu-open");
        burger.setAttribute("aria-expanded", "false");
      }));
    }
  }

  /* ---------- アコーディオン ---------- */
  function initAccordion(root = document) {
    $$(".acc__btn", root).forEach(btn => {
      /* 動的描画されたページでは二度呼ばれるため、多重バインドを防ぐ */
      if (btn.dataset.accBound) return;
      btn.dataset.accBound = "1";
      btn.addEventListener("click", () => {
        const item = btn.closest(".acc__item");
        const open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  }

  /* ---------- ニュースレター（送信先未接続のためのダミー） ---------- */
  function initSubscribe() {
    $$("[data-subscribe]").forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const note = $(".form-note", form.parentElement) || $(".form-note", form);
        if (note) note.textContent = "ご登録ありがとうございます。入荷のお知らせをお送りします。";
        form.reset();
      });
    });
  }

  /* ---------- 公開 ---------- */
  window.WK = { $, $$, yen, catLabel, catEn, productById, favs, cardHTML, renderCards, observeReveal, initAccordion };

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    observeReveal();
    initAccordion();
    initSubscribe();
    paintFavCount();
    $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
    $$("[data-shop-mercari]").forEach(el => { el.href = SHOP.mercari; });
    $$("[data-shop-instagram]").forEach(el => { el.href = SHOP.instagram; });
    $$("[data-shop-email]").forEach(el => {
      el.href = "mailto:" + SHOP.email;
      if (el.dataset.shopEmail === "text") el.textContent = SHOP.email;
    });
  });
})();
