/* =========================
   Plantas Mori — UI 3
   Invariantes:
   - Archivo oculta por defecto lo que está en Trueque
   - Trueque muestra solo lo disponible/registrado para intercambio
   - Placeholders visibles en Archivo cuando no hay foto
   - Sticky de filtros: una sola barra bajo el header
   ========================= */

const WHATSAPP_NUMBER = "56955555555"; // ficticio por ahora

const FAMILY_ORDER = [
  "Alocasia",
  "Anthurium",
  "Philodendron",
  "Monstera",
  "Epipremnum",
  "Scindapsus",
  "Syngonium",
  "Otros"
];

/* =========================
   Catálogo maestro (Archivo)
   - Las 6 con foto real
   - El resto placeholders (con rutas futuras)
   ========================= */

const CATALOGO = [
  // === Con foto real (y además están en Trueque) ===
  {
    id: "p1",
    nombre: "Alocasia sp. Silver Dragon",
    familia: "Alocasia",
    img: "assets/img/alocasia-silver-dragon.jpeg",
    tags: ["juvenil"],
    isTrueque: true,
    trueque: { disponible: true, condicion: "Enraizado", tags: ["1 hoja"], meta: "" }
  },
  {
    id: "p2",
    nombre: "Epipremnum sp. Manjula",
    familia: "Epipremnum",
    img: "assets/img/epipremnum-manjula.jpeg",
    tags: ["juvenil", "variegada"],
    isTrueque: true,
    trueque: { disponible: true, condicion: "Enraizado", tags: ["variegada"], meta: "" }
  },
  {
    id: "p3",
    nombre: "Cordatum sp. Brasil",
    familia: "Philodendron",
    img: "assets/img/cordatum-brasil.jpeg",
    tags: ["juvenil", "cordatum"],
    isTrueque: true,
    trueque: { disponible: true, condicion: "Corte fresco", tags: ["2 hojas"], meta: "" }
  },
  {
    id: "p4",
    nombre: "Monstera sp. Siltepecana",
    familia: "Monstera",
    img: "assets/img/monstera-siltepecana.jpeg",
    tags: ["juvenil"],
    isTrueque: true,
    trueque: { disponible: true, condicion: "Enraizado", tags: ["juvenil"], meta: "" }
  },
  {
    id: "p5",
    nombre: "Philodendron sp. Glorious",
    familia: "Philodendron",
    img: "assets/img/philodendron-glorious.jpeg",
    tags: ["juvenil"],
    isTrueque: true,
    trueque: { disponible: true, condicion: "Enraizado", tags: ["hoja grande"], meta: "" }
  },
  {
    id: "p6",
    nombre: "Syngonium sp. Holly",
    familia: "Syngonium",
    img: "assets/img/syngonium-holly.jpeg",
    tags: ["juvenil", "variegada"],
    isTrueque: true,
    trueque: { disponible: true, condicion: "Enraizado", tags: ["variegada"], meta: "" }
  },

  // === Placeholders (sin foto aún) ===
  { id: "p7",  nombre: "Philodendron billietiae", familia: "Philodendron", img: "assets/img/philodendron-billietiae.jpeg", tags: ["juvenil"], isTrueque: false },
  { id: "p8",  nombre: "Monstera deliciosa", familia: "Monstera", img: "assets/img/monstera-deliciosa.jpeg", tags: ["juvenil"], isTrueque: false },

  { id: "p9",  nombre: "Syngonium Red Arrow", familia: "Syngonium", img: "assets/img/syngonium-red-arrow.jpeg", tags: ["juvenil"], isTrueque: false },
  { id: "p10", nombre: "Syngonium Confetti", familia: "Syngonium", img: "assets/img/syngonium-confetti.jpeg", tags: ["juvenil"], isTrueque: false },
  { id: "p11", nombre: "Syngonium Gold Allusion", familia: "Syngonium", img: "assets/img/syngonium-gold-allusion.jpeg", tags: ["juvenil"], isTrueque: false },

  { id: "p12", nombre: "Philodendron gloriosum", familia: "Philodendron", img: "assets/img/philodendron-gloriosum.jpeg", tags: ["juvenil"], isTrueque: false },
  { id: "p13", nombre: "Philodendron McDowell", familia: "Philodendron", img: "assets/img/philodendron-mcdowell.jpeg", tags: ["juvenil"], isTrueque: false },

  { id: "p14", nombre: "Epipremnum Marble Queen", familia: "Epipremnum", img: "assets/img/epipremnum-marble-queen.jpeg", tags: ["juvenil", "variegada"], isTrueque: false },
  { id: "p15", nombre: "Epipremnum Golden", familia: "Epipremnum", img: "assets/img/epipremnum-golden.jpeg", tags: ["juvenil"], isTrueque: false },

  { id: "p16", nombre: "Scindapsus pictus Argyraeus", familia: "Scindapsus", img: "assets/img/scindapsus-pictus-argyraeus.jpeg", tags: ["juvenil"], isTrueque: false },
  { id: "p17", nombre: "Scindapsus pictus Exotica", familia: "Scindapsus", img: "assets/img/scindapsus-pictus-exotica.jpeg", tags: ["juvenil"], isTrueque: false },

  { id: "p18", nombre: "Scindapsus Jade", familia: "Scindapsus", img: "assets/img/scindapsus-jade.jpeg", tags: ["juvenil"], isTrueque: false },

  { id: "p19", nombre: "Alocasia amazonica", familia: "Alocasia", img: "assets/img/alocasia-amazonica.jpeg", tags: ["juvenil"], isTrueque: false },
  { id: "p20", nombre: "Alocasia Dragons Breath", familia: "Alocasia", img: "assets/img/alocasia-dragons-breath.jpeg", tags: ["juvenil"], isTrueque: false }
];

// Derivados
const ARCHIVO_ITEMS = [...CATALOGO];
const TRUEQUE_ITEMS = CATALOGO
  .filter(x => x.isTrueque && x.trueque)
  .map(x => ({
    id: x.id,
    nombre: x.nombre,
    familia: x.familia,
    img: x.img,
    disponible: x.trueque.disponible,
    condicion: x.trueque.condicion,
    tags: x.trueque.tags || [],
    meta: x.trueque.meta || ""
  }));

/* =========================
   Helpers
   ========================= */
function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }

function norm(s){
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function setYear(){
  const el = qs("#year");
  if(el) el.textContent = String(new Date().getFullYear());
}

function setHeaderHeightVar(){
  const header = qs(".header");
  if(!header) return;

  const apply = () => {
    const h = header.offsetHeight || 60;
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  };

  apply();
  window.addEventListener("resize", apply, { passive: true });
}

function buildActiveFiltersText(parts){
  const clean = parts.filter(Boolean);
  return clean.length ? `Filtros: ${clean.join(" • ")}` : "";
}

function buildFamilyOptions(items){
  const present = new Set(items.map(x => x.familia).filter(Boolean));
  const ordered = FAMILY_ORDER.filter(f => present.has(f));
  return [{label:"Todas", value:"__all"}].concat(ordered.map(f => ({label:f, value:f})));
}

function matchesQuery(item, query){
  if(!query) return true;
  const q = norm(query);

  const synonyms = [
    ["ph.", "philodendron"],
    ["sc.", "scindapsus"],
    ["mq", "marble queen"]
  ];

  let expanded = q;
  for(const [a,b] of synonyms){
    if(expanded.includes(a)) expanded = expanded.replaceAll(a, b);
  }

  const hay = [
    item.nombre,
    item.familia,
    ...(item.tags || []),
    item.trueque?.condicion,
    item.trueque?.meta,
    item.condicion,
    item.meta
  ].filter(Boolean).map(norm).join(" ");

  return hay.includes(expanded);
}

function renderChips(container, options, activeValue, onClick){
  container.innerHTML = "";
  options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "chip";
    b.type = "button";
    b.textContent = opt.label;
    b.setAttribute("aria-pressed", String(opt.value === activeValue));
    b.addEventListener("click", () => onClick(opt.value));
    container.appendChild(b);
  });
}

function applyStaggerFade(listEl){
  const items = qsa(".item", listEl);
  items.forEach((el, i) => {
    el.classList.add("fade-in");
    el.style.animationDelay = `${Math.min(i, 10) * 14}ms`;
  });
}

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function buildTruequeMessage(item){
  const disponibilidad = item.disponible ? "Disponible" : "No disponible";
  const condicion = item.disponible ? ` • ${item.condicion}` : "";

  return [
    "Hola! Vengo desde Plantas Mori.",
    `Me interesa este esqueje: ${item.nombre} (${item.familia})`,
    `Estado: ${disponibilidad}${condicion}`,
    "",
    "¿Podemos coordinar un trueque? 🙂"
  ].join("\n");
}

/* media con fallback */
function buildMedia(imgSrc, altText){
  const wrap = document.createElement("div");
  wrap.className = "item__media";

  const ph = document.createElement("div");
  ph.className = "ph";

  // si no hay src, o si es placeholder aún no subido, el onerror lo convertirá
  const im = document.createElement("img");
  im.src = imgSrc || "";
  im.alt = altText || "";
  im.loading = "lazy";
  im.decoding = "async";

  const fallback = () => {
    try{ im.removeAttribute("src"); }catch(_){}
    im.style.display = "none";
    ph.classList.add("ph--fallback");
    ph.setAttribute("data-fallback", "Sin imagen");
    if(altText) ph.setAttribute("title", altText);
  };

  if(!imgSrc) fallback();

  im.addEventListener("error", fallback, { once: true });

  ph.appendChild(im);
  wrap.appendChild(ph);
  return wrap;
}

/* =========================
   Nav móvil
   ========================= */
function initNav(){
  const toggle = qs(".nav__toggle");
  const list = qs(".nav__list");
  if(!toggle || !list) return;

  toggle.addEventListener("click", () => {
    const open = list.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  qsa(".nav__list a").forEach(a => {
    a.addEventListener("click", () => {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================
   Sticky collapse (por página)
   ========================= */
function initFiltersToggles(){
  const blocks = qsa(".sticky-controls");
  if(!blocks.length) return;

  blocks.forEach(block => {
    const toggle = qs(".filters-toggle", block);
    if(!toggle) return;

    // estado inicial expandido
    block.classList.remove("is-collapsed");
    toggle.setAttribute("aria-expanded", "true");

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const collapsed = block.classList.toggle("is-collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
    });
  });
}

/* =========================
   Archivo
   ========================= */
function initArchivo(){
  const root = qs("[data-page='archivo']");
  if(!root) return;

  const search = qs("#search", root);
  const clearBtn = qs("#clearBtn", root);
  const emptyClearBtn = qs("#emptyClearBtn", root);
  const chipsFamilia = qs("#chipsFamilia", root);
  const resultCount = qs("#resultCount", root);
  const activeFilters = qs("#activeFilters", root);
  const list = qs("#list", root);
  const emptyState = qs("#emptyState", root);
  const toggleTrueque = qs("#toggleTrueque", root);

  const familiaOptions = buildFamilyOptions(ARCHIVO_ITEMS);

  let state = {
    familia: "__all",
    query: "",
    showTrueque: false // IMPORTANT: oculto por defecto
  };

  function render(){
    const items = ARCHIVO_ITEMS
      .filter(x => (state.showTrueque ? true : !x.isTrueque))
      .filter(x => state.familia === "__all" ? true : x.familia === state.familia)
      .filter(x => matchesQuery(x, state.query));

    resultCount.textContent = `${items.length} resultado(s)`;

    const filterText = buildActiveFiltersText([
      state.query ? `búsqueda “${state.query}”` : "",
      state.familia !== "__all" ? state.familia : "",
      state.showTrueque ? "incluye Trueque" : ""
    ]);
    if(activeFilters) activeFilters.textContent = filterText;

    list.innerHTML = "";
    items.forEach(x => {
      const card = document.createElement("article");
      card.className = "card item lift";

      card.appendChild(buildMedia(x.img, x.nombre));

      const body = document.createElement("div");
      body.className = "item__body";

      const titleRow = document.createElement("div");
      titleRow.className = "item__title";

      const h3 = document.createElement("h3");
      h3.className = "serif";
      h3.textContent = x.nombre;

      const fam = document.createElement("span");
      fam.className = "pill pill--muted";
      fam.textContent = x.familia;

      titleRow.appendChild(h3);
      titleRow.appendChild(fam);

      const tags = document.createElement("div");
      tags.className = "tags";

      // Tag discreto si es parte de trueque (solo cuando se muestra)
      if(x.isTrueque && state.showTrueque){
        const p = document.createElement("span");
        p.className = "pill pill--wine";
        p.textContent = "Trueque";
        tags.appendChild(p);
      }

      (x.tags || []).slice(0,3).forEach(t => {
        const p = document.createElement("span");
        p.className = "pill";
        p.textContent = t;
        tags.appendChild(p);
      });

      const meta = document.createElement("div");
      meta.className = "item__meta";
      meta.textContent = "Ficha breve (borrador).";

      const actions = document.createElement("div");
      actions.className = "item__actions";

      const btn = document.createElement("a");
      btn.className = "btn btn--small btn--ghost";
      btn.href = "#";
      btn.textContent = "Ver ficha (placeholder)";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Más adelante: ficha por especie. Por ahora es borrador.");
      });

      actions.appendChild(btn);

      body.appendChild(titleRow);
      body.appendChild(tags);
      body.appendChild(meta);
      body.appendChild(actions);

      card.appendChild(body);
      list.appendChild(card);
    });

    renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
      state.familia = v;
      render();
    });

    if(emptyState) emptyState.hidden = items.length !== 0;
    applyStaggerFade(list);
  }

  function clearAll(){
    state.familia = "__all";
    state.query = "";
    state.showTrueque = false;
    if(search) search.value = "";
    if(toggleTrueque) toggleTrueque.checked = false;
    render();
  }

  if(search){
    search.addEventListener("input", (e) => {
      state.query = e.target.value;
      render();
    });
  }
  if(toggleTrueque){
    toggleTrueque.checked = false; // por defecto
    toggleTrueque.addEventListener("change", () => {
      state.showTrueque = toggleTrueque.checked;
      render();
    });
  }
  if(clearBtn) clearBtn.addEventListener("click", clearAll);
  if(emptyClearBtn) emptyClearBtn.addEventListener("click", clearAll);

  render();
}

/* =========================
   Trueque
   ========================= */
function initTrueque(){
  const root = qs("[data-page='trueque']");
  if(!root) return;

  const search = qs("#search", root);
  const clearBtn = qs("#clearBtn", root);
  const emptyClearBtn = qs("#emptyClearBtn", root);
  const chipsDispon = qs("#chipsDispon", root);
  const chipsCond = qs("#chipsCond", root);
  const chipsFamilia = qs("#chipsFamilia", root);
  const resultCount = qs("#resultCount", root);
  const activeFilters = qs("#activeFilters", root);
  const list = qs("#list", root);
  const emptyState = qs("#emptyState", root);

  const familiaOptions = buildFamilyOptions(TRUEQUE_ITEMS);

  const disponOptions = [
    {label:"Disponible", value:"disponible"},
    {label:"No disponible", value:"nodisponible"},
    {label:"Todos", value:"todos"},
  ];

  const condOptions = [
    {label:"Cualquiera", value:"__any"},
    {label:"Corte fresco", value:"Corte fresco"},
    {label:"Enraizado", value:"Enraizado"},
  ];

  let state = { dispon: "disponible", condicion: "__any", familia: "__all", query: "" };
  const defaults = { ...state };

  function render(){
    const items = TRUEQUE_ITEMS
      .filter(x => {
        if(state.dispon === "todos") return true;
        if(state.dispon === "disponible") return x.disponible === true;
        if(state.dispon === "nodisponible") return x.disponible === false;
        return true;
      })
      .filter(x => state.familia === "__all" ? true : x.familia === state.familia)
      .filter(x => {
        if(state.condicion === "__any") return true;
        return x.disponible === true && x.condicion === state.condicion;
      })
      .filter(x => matchesQuery(x, state.query));

    resultCount.textContent = `${items.length} resultado(s)`;

    const filterText = buildActiveFiltersText([
      state.query ? `búsqueda “${state.query}”` : "",
      state.dispon === "disponible" ? "Disponible" : (state.dispon === "nodisponible" ? "No disponible" : "Todos"),
      state.dispon !== "nodisponible" && state.condicion !== "__any" ? state.condicion : "",
      state.familia !== "__all" ? state.familia : ""
    ]);
    if(activeFilters) activeFilters.textContent = filterText;

    list.innerHTML = "";
    items.forEach(x => {
      const card = document.createElement("article");
      card.className = "card item lift";

      card.appendChild(buildMedia(x.img, x.nombre));

      const body = document.createElement("div");
      body.className = "item__body";

      const titleRow = document.createElement("div");
      titleRow.className = "item__title";

      const h3 = document.createElement("h3");
      h3.className = "serif";
      h3.textContent = x.nombre;

      const fam = document.createElement("span");
      fam.className = "pill pill--muted";
      fam.textContent = x.familia;

      titleRow.appendChild(h3);
      titleRow.appendChild(fam);

      const tags = document.createElement("div");
      tags.className = "tags";

      const st = document.createElement("span");
      st.className = "pill pill--wine";
      st.textContent = x.disponible ? "Disponible" : "No disponible";
      tags.appendChild(st);

      if(x.disponible){
        const cd = document.createElement("span");
        cd.className = "pill";
        cd.textContent = x.condicion;
        tags.appendChild(cd);
      }

      (x.tags || []).slice(0,2).forEach(t => {
        const p = document.createElement("span");
        p.className = "pill";
        p.textContent = t;
        tags.appendChild(p);
      });

      const actions = document.createElement("div");
      actions.className = "item__actions";

      const btn = document.createElement("a");
      btn.href = "#";
      btn.className = "btn btn--small";
      btn.textContent = x.disponible ? "Proponer trueque (WhatsApp)" : "Consultar igual (WhatsApp)";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const msg = buildTruequeMessage(x);
        window.open(waLink(msg), "_blank", "noopener,noreferrer");
      });

      if(!x.disponible) btn.classList.add("btn--ghost");

      actions.appendChild(btn);

      body.appendChild(titleRow);
      body.appendChild(tags);
      body.appendChild(actions);

      card.appendChild(body);
      list.appendChild(card);
    });

    renderChips(chipsDispon, disponOptions, state.dispon, (v) => {
      state.dispon = v;
      if(state.dispon === "nodisponible") state.condicion = "__any";
      render();
    });

    renderChips(chipsCond, condOptions, state.condicion, (v) => {
      if(state.dispon === "nodisponible") return;
      state.condicion = v;
      render();
    });

    renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
      state.familia = v;
      render();
    });

    if(emptyState) emptyState.hidden = items.length !== 0;
    applyStaggerFade(list);
  }

  function clearAll(){
    state = { ...defaults };
    if(search) search.value = "";
    render();
  }

  if(search){
    search.addEventListener("input", (e) => {
      state.query = e.target.value;
      render();
    });
  }
  if(clearBtn) clearBtn.addEventListener("click", clearAll);
  if(emptyClearBtn) emptyClearBtn.addEventListener("click", clearAll);

  render();
}

/* =========================
   Fuentes + Init global
   ========================= */
function loadFonts(){
  const link1 = document.createElement("link");
  link1.rel = "preconnect";
  link1.href = "https://fonts.googleapis.com";
  document.head.appendChild(link1);

  const link2 = document.createElement("link");
  link2.rel = "preconnect";
  link2.href = "https://fonts.gstatic.com";
  link2.crossOrigin = "anonymous";
  document.head.appendChild(link2);

  const link3 = document.createElement("link");
  link3.rel = "stylesheet";
  link3.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Inter:wght@400;600;800&display=swap";
  document.head.appendChild(link3);
}

document.addEventListener("DOMContentLoaded", () => {
  loadFonts();
  setYear();
  setHeaderHeightVar();
  initNav();
  initFiltersToggles();
  initArchivo();
  initTrueque();
});
