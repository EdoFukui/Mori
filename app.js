/* =========================================================
   Plantas Mori — UI 2
   app.js (archivo + trueque)
   ========================================================= */

/* =========================
   Utilidades
   ========================= */

const qs  = (sel, root=document) => root.querySelector(sel);
const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function norm(str){
  return (str ?? "")
    .toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function waLink(phone, text){
  const t = encodeURIComponent(text || "");
  return `https://wa.me/${phone}?text=${t}`;
}

function matchesQuery(item, query){
  const q = norm(query);
  if(!q) return true;

  const expanded = q.split(/\s+/).filter(Boolean).join(" ");
  const hay = [
    item.nombre,
    item.familia,
    item.estado,
    ...(item.tags || []),
    item.nota,
    item.meta,
    item.condicion,
    item.disponible === true ? "disponible" : "no disponible"
  ].map(norm).join(" ");

  return hay.includes(expanded);
}

function setYear(){
  const el = qs("#year");
  if(el) el.textContent = String(new Date().getFullYear());
}

function buildActiveFiltersText(parts){
  const clean = parts.filter(Boolean);
  return clean.length ? `Filtros: ${clean.join(" • ")}` : "";
}

/* =========================
   Menú móvil
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
   Filtros colapsables
   ========================= */

function initFiltersToggle(){
  const stickyControls = qs(".sticky-controls");
  const toggles = qsa(".filters-toggle");

  if(!stickyControls || toggles.length === 0) return;

  toggles.forEach(t => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      const isCollapsed = stickyControls.classList.toggle("is-collapsed");
      toggles.forEach(tb => tb.setAttribute("aria-expanded", String(!isCollapsed)));
    });
  });
}

/* =========================
   Render chips
   ========================= */

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

/* =========================
   UI 2: helper para media (foto)
   ========================= */

function buildMedia(imgSrc, altText){
  const wrap = document.createElement("div");
  wrap.className = "item__media";

  const ph = document.createElement("div");
  ph.className = "ph";

  if(imgSrc){
    const im = document.createElement("img");
    im.src = imgSrc;
    im.alt = altText || "";
    im.loading = "lazy";
    im.decoding = "async";
    ph.appendChild(im);
  }

  wrap.appendChild(ph);
  return wrap;
}

/* =========================
   Dataset (UI 2)
   ========================= */

const PHONE = "56955555555";

/* Trueque: solo disponibles/registrables para intercambio */
const TRUEQUE_ITEMS = [
  {
    id: "alocasia-silver-dragon",
    nombre: "Alocasia sp. Silver dragon",
    familia: "Alocasia",
    disponible: true,
    condicion: "enraizado",
    estado: "juvenil",
    tags: ["Disponible", "Enraizado"],
    nota: "",
    meta: "2 hojas",
    img: "assets/img/alocasia-silver-dragon.jpeg"
  },
  {
    id: "epipremnum-manjula",
    nombre: "Epipremnum sp. Manjula",
    familia: "Epipremnum",
    disponible: true,
    condicion: "enraizado",
    estado: "juvenil",
    tags: ["Disponible", "Enraizado"],
    nota: "",
    meta: "",
    img: "assets/img/epipremnum-manjula.jpeg"
  },
  {
    id: "cordatum-brasil",
    nombre: "Cordatum sp. Brasil",
    familia: "Philodendron",
    disponible: true,
    condicion: "corte fresco",
    estado: "juvenil",
    tags: ["Disponible", "Corte fresco"],
    nota: "",
    meta: "2 hojas",
    img: "assets/img/cordatum-brasil.jpeg"
  },
  {
    id: "monstera-siltepecana",
    nombre: "Monstera sp. Siltepecana",
    familia: "Monstera",
    disponible: true,
    condicion: "enraizado",
    estado: "juvenil",
    tags: ["Disponible", "Enraizado"],
    nota: "",
    meta: "",
    img: "assets/img/monstera-siltepecana.jpeg"
  },
  {
    id: "philodendron-glorious",
    nombre: "Philodendron sp. Glorious",
    familia: "Philodendron",
    disponible: true,
    condicion: "enraizado",
    estado: "juvenil",
    tags: ["Disponible", "Enraizado"],
    nota: "",
    meta: "",
    img: "assets/img/philodendron-glorious.jpeg"
  },
  {
    id: "syngonium-holly",
    nombre: "Syngonium sp. Holly",
    familia: "Syngonium",
    disponible: true,
    condicion: "enraizado",
    estado: "juvenil",
    tags: ["Disponible", "Enraizado"],
    nota: "",
    meta: "",
    img: "assets/img/syngonium-holly.jpeg"
  }
];

/* Archivo: colección completa (por ahora las mismas, luego crece) */
const ARCHIVO_ITEMS = [
  ...TRUEQUE_ITEMS.map(x => ({
    ...x,
    tags: ["Colección"],
    disponible: x.disponible,
  })),
];

/* =========================
   Render item card
   ========================= */

function makeItemCard(item, mode){
  const card = document.createElement("article");
  card.className = "card lift item";

  const media = buildMedia(item.img, item.nombre);
  card.appendChild(media);

  const body = document.createElement("div");
  body.className = "item__body";

  const titleRow = document.createElement("div");
  titleRow.className = "item__title";

  const h = document.createElement("h3");
  h.className = "serif";
  h.textContent = item.nombre;

  const fam = document.createElement("span");
  fam.className = "pill pill--muted";
  fam.textContent = item.familia;

  titleRow.appendChild(h);
  titleRow.appendChild(fam);

  const tags = document.createElement("div");
  tags.className = "tags";

  (item.tags || []).forEach(t => {
    const p = document.createElement("span");
    p.className = "pill";
    p.textContent = t;
    tags.appendChild(p);
  });

  if(item.disponible === false){
    const p = document.createElement("span");
    p.className = "pill pill--wine";
    p.textContent = "No disponible";
    tags.appendChild(p);
  }

  const meta = document.createElement("div");
  meta.className = "item__meta";

  const cond = item.condicion ? item.condicion : "";
  const extra = item.meta ? item.meta : "";
  meta.textContent = [cond, extra].filter(Boolean).join(" • ");

  const actions = document.createElement("div");
  actions.className = "item__actions";

  if(mode === "trueque"){
    const msg = `Hola! Me interesa el ${item.nombre}. ¿Lo tienes disponible para trueque?`;
    const a = document.createElement("a");
    a.className = "btn btn--small";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.href = waLink(PHONE, msg);
    a.textContent = "Proponer trueque (WhatsApp)";
    actions.appendChild(a);
  }

  body.appendChild(titleRow);
  body.appendChild(tags);

  if(meta.textContent.trim()){
    body.appendChild(meta);
  }

  if(actions.children.length){
    body.appendChild(actions);
  }

  card.appendChild(body);
  return card;
}

/* =========================
   Archivo
   ========================= */

function initArchivo(){
  const root = qs("main[data-page='archivo']");
  if(!root) return;

  const list = qs("#list");
  const search = qs("#search");
  const clearBtn = qs("#clearBtn");
  const emptyState = qs("#emptyState");
  const emptyClearBtn = qs("#emptyClearBtn");
  const chipsFamilia = qs("#chipsFamilia");
  const resultCount = qs("#resultCount");
  const activeFilters = qs("#activeFilters");

  if(!list) return;

  const familiaOptions = [
    { label:"Todas", value:"__any" },
    ...Array.from(new Set(ARCHIVO_ITEMS.map(x => x.familia))).sort().map(f => ({ label:f, value:f }))
  ];

  const defaults = { query:"", familia:"__any" };
  let state = { ...defaults };

  function render(){
    list.innerHTML = "";

    const filtered = ARCHIVO_ITEMS.filter(it => {
      if(state.familia !== "__any" && it.familia !== state.familia) return false;
      if(!matchesQuery(it, state.query)) return false;
      return true;
    });

    filtered.forEach(it => list.appendChild(makeItemCard(it, "archivo")));

    if(resultCount) resultCount.textContent = `${filtered.length} resultado(s)`;
    if(activeFilters){
      activeFilters.textContent = buildActiveFiltersText([
        state.query ? `“${state.query}”` : "",
        state.familia !== "__any" ? state.familia : ""
      ]);
    }

    if(chipsFamilia){
      renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
        state.familia = v;
        render();
      });
    }

    if(emptyState){
      emptyState.hidden = filtered.length !== 0;
    }

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
   Trueque
   ========================= */

function initTrueque(){
  const root = qs("main[data-page='trueque']");
  if(!root) return;

  const list = qs("#list");
  const search = qs("#search");
  const clearBtn = qs("#clearBtn");
  const emptyState = qs("#emptyState");
  const emptyClearBtn = qs("#emptyClearBtn");

  const chipsDispon = qs("#chipsDispon");
  const chipsCond = qs("#chipsCond");
  const chipsFamilia = qs("#chipsFamilia");

  const resultCount = qs("#resultCount");
  const activeFilters = qs("#activeFilters");

  if(!list) return;

  const disponOptions = [
    { label:"Todos", value:"__any" },
    { label:"Disponible", value:"disponible" },
    { label:"No disponible", value:"nodisponible" }
  ];

  const condOptions = [
    { label:"Todos", value:"__any" },
    { label:"Enraizado", value:"enraizado" },
    { label:"Corte fresco", value:"corte fresco" }
  ];

  const familiaOptions = [
    { label:"Todas", value:"__any" },
    ...Array.from(new Set(TRUEQUE_ITEMS.map(x => x.familia))).sort().map(f => ({ label:f, value:f }))
  ];

  const defaults = { query:"", dispon:"__any", condicion:"__any", familia:"__any" };
  let state = { ...defaults };

  function render(){
    list.innerHTML = "";

    const items = TRUEQUE_ITEMS.filter(it => {
      if(state.dispon === "disponible" && it.disponible !== true) return false;
      if(state.dispon === "nodisponible" && it.disponible !== false) return false;

      if(state.condicion !== "__any"){
        if(it.disponible !== true) return false;
        if(norm(it.condicion) !== norm(state.condicion)) return false;
      }

      if(state.familia !== "__any" && it.familia !== state.familia) return false;

      if(!matchesQuery(it, state.query)) return false;
      return true;
    });

    items.forEach(it => list.appendChild(makeItemCard(it, "trueque")));

    if(resultCount) resultCount.textContent = `${items.length} resultado(s)`;
    if(activeFilters){
      activeFilters.textContent = buildActiveFiltersText([
        state.query ? `“${state.query}”` : "",
        state.dispon !== "__any" ? (state.dispon === "disponible" ? "Disponible" : "No disponible") : "",
        state.condicion !== "__any" ? state.condicion : "",
        state.familia !== "__any" ? state.familia : ""
      ]);
    }

    if(chipsDispon){
      renderChips(chipsDispon, disponOptions, state.dispon, (v) => {
        state.dispon = v;
        if(v === "nodisponible"){
          state.condicion = "__any";
        }
        render();
      });
    }

    if(chipsCond){
      renderChips(chipsCond, condOptions, state.condicion, (v) => {
        if(state.dispon === "nodisponible") return;
        state.condicion = v;
        render();
      });
    }

    if(chipsFamilia){
      renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
        state.familia = v;
        render();
      });
    }

    if(emptyState){
      emptyState.hidden = items.length !== 0;
    }

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
  initNav();
  initFiltersToggle();
  initArchivo();
  initTrueque();
});
