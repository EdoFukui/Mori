/* =========================
   UI 3.3 — Micro-claim + Reglas (Trueque)
   + Archivo: switch Trueque (oculto por defecto)
   ========================= */

const STATUS_ORDER = ["Juvenil", "Madre", "Colección"];

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

const WHATSAPP_NUMBER = "56955555555"; // ficticio

/* Admin (oculto práctico, NO seguridad real) */
const ADMIN_PIN = "5555";
const ADMIN_FLAG_KEY = "mori_admin_enabled";
const STATE_OVERRIDES_KEY = "mori_estado_overrides";

/* =========================
   Catálogo maestro
   ========================= */

const CATALOGO = [
  {
    id: "p1",
    nombre: "Alocasia sp. Silver Dragon",
    familia: "Alocasia",
    estado: "Juvenil",
    img: "assets/img/alocasia-silver-dragon.jpeg",
    tags: ["textura", "hoja densa"],
    trueque: { disponible: true, condicion: "Enraizado", meta: "en sustrato mineral", tags: ["1 hoja"] }
  },
  {
    id: "p2",
    nombre: "Epipremnum sp. Manjula",
    familia: "Epipremnum",
    estado: "Juvenil",
    img: "assets/img/epipremnum-manjula.jpeg",
    tags: ["variegada", "interior"],
    trueque: { disponible: true, condicion: "Enraizado", meta: "en sustrato", tags: ["variegada"] }
  },
  {
    id: "p3",
    nombre: "Philodendron sp. Brasil",
    familia: "Philodendron",
    estado: "Juvenil",
    img: "assets/img/cordatum-brasil.jpeg",
    tags: ["cordatum"],
    trueque: { disponible: true, condicion: "Corte fresco", meta: "corte fresco", tags: ["2 hojas"] }
  },
  {
    id: "p4",
    nombre: "Monstera sp. Siltepecana",
    familia: "Monstera",
    estado: "Juvenil",
    img: "assets/img/monstera-siltepecana.jpeg",
    tags: ["juvenil", "textura"],
    trueque: { disponible: true, condicion: "Enraizado", meta: "en sustrato", tags: ["juvenil"] }
  },
  {
    id: "p5",
    nombre: "Philodendron sp. Glorious",
    familia: "Philodendron",
    estado: "Juvenil",
    img: "assets/img/philodendron-glorious.jpeg",
    tags: ["venas claras"],
    trueque: { disponible: true, condicion: "Enraizado", meta: "en sustrato", tags: ["hoja grande"] }
  },
  {
    id: "p6",
    nombre: "Syngonium sp. Holly",
    familia: "Syngonium",
    estado: "Juvenil",
    img: "assets/img/syngonium-holly.jpeg",
    tags: ["variegada", "compacta"],
    trueque: { disponible: true, condicion: "Enraizado", meta: "en sustrato", tags: ["variegada"] }
  },

  { id: "p7",  nombre: "Philodendron billietiae", familia: "Philodendron", estado: "Juvenil", img: "assets/img/philodendron-billietiae.jpeg", tags: [] },
  { id: "p8",  nombre: "Monstera deliciosa", familia: "Monstera", estado: "Juvenil", img: "assets/img/monstera-deliciosa.jpeg", tags: [] },

  { id: "p9",  nombre: "Syngonium Red Arrow", familia: "Syngonium", estado: "Juvenil", img: "assets/img/syngonium-red-arrow.jpeg", tags: [] },
  { id: "p10", nombre: "Syngonium Confetti", familia: "Syngonium", estado: "Juvenil", img: "assets/img/syngonium-confetti.jpeg", tags: [] },
  { id: "p11", nombre: "Syngonium Gold Allusion", familia: "Syngonium", estado: "Juvenil", img: "assets/img/syngonium-gold-allusion.jpeg", tags: [] },

  { id: "p12", nombre: "Philodendron gloriosum", familia: "Philodendron", estado: "Juvenil", img: "assets/img/philodendron-gloriosum.jpeg", tags: [] },
  { id: "p13", nombre: "Philodendron McDowell", familia: "Philodendron", estado: "Juvenil", img: "assets/img/philodendron-mcdowell.jpeg", tags: [] },

  { id: "p14", nombre: "Epipremnum Marble Queen", familia: "Epipremnum", estado: "Juvenil", img: "assets/img/epipremnum-marble-queen.jpeg", tags: ["variegada"] },
  { id: "p15", nombre: "Epipremnum Golden", familia: "Epipremnum", estado: "Juvenil", img: "assets/img/epipremnum-golden.jpeg", tags: ["golden"] },

  { id: "p16", nombre: "Scindapsus pictus Argyraeus", familia: "Scindapsus", estado: "Juvenil", img: "assets/img/scindapsus-pictus-argyraeus.jpeg", tags: ["plateada"] },
  { id: "p17", nombre: "Scindapsus pictus Exotica", familia: "Scindapsus", estado: "Juvenil", img: "assets/img/scindapsus-pictus-exotica.jpeg", tags: ["plateada"] },

  { id: "p18", nombre: "Scindapsus Jade", familia: "Scindapsus", estado: "Juvenil", img: "assets/img/scindapsus-jade.jpeg", tags: [] },

  { id: "p19", nombre: "Alocasia amazonica", familia: "Alocasia", estado: "Juvenil", img: "assets/img/alocasia-amazonica.jpeg", tags: [] },
  { id: "p20", nombre: "Alocasia Dragons Breath", familia: "Alocasia", estado: "Juvenil", img: "assets/img/alocasia-dragons-breath.jpeg", tags: [] }
];

/* Helpers */
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

function buildActiveFiltersText(parts){
  const clean = parts.filter(Boolean);
  return clean.length ? `Filtros: ${clean.join(" • ")}` : "";
}

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function buildTruequeMessage(item){
  const t = item.trueque || {};
  const disponibilidad = t.disponible ? "Disponible" : "No disponible";
  const condicion = t.disponible ? ` • ${t.condicion}` : "";
  const meta = t.meta ? `\nDetalles: ${t.meta}` : "";
  const tags = (t.tags && t.tags.length) ? `\nTags: ${t.tags.join(", ")}` : "";

  return [
    "Hola! Vengo desde Plantas Mori.",
    `Me interesa este esqueje: ${item.nombre} (${item.familia})`,
    `Estado: ${disponibilidad}${condicion}`,
    `${meta}${tags}`,
    "",
    "¿Podemos coordinar un trueque? 🙂"
  ].join("\n");
}

function buildFamilyOptions(items){
  const present = new Set(items.map(x => x.familia).filter(Boolean));
  const ordered = FAMILY_ORDER.filter(f => present.has(f));
  return [{label:"Todas", value:"__all"}].concat(ordered.map(f => ({label:f, value:f})));
}

function buildEstadoOptions(items){
  const present = new Set(items.map(x => x.estado).filter(Boolean));
  const ordered = STATUS_ORDER.filter(s => present.has(s));
  return [{label:"Todos", value:"__all"}].concat(ordered.map(s => ({label:s, value:s})));
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
    item.estado,
    ...(item.tags || []),
    item.trueque?.condicion,
    item.trueque?.meta,
    item.trueque?.disponible === true ? "disponible" : (item.trueque ? "no disponible" : "")
  ]
    .filter(Boolean)
    .map(norm)
    .join(" ");

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

function buildMedia(imgSrc, altText){
  const wrap = document.createElement("div");
  wrap.className = "item__media";

  const ph = document.createElement("div");
  ph.className = "ph";

  if(!imgSrc){
    ph.classList.add("ph--fallback");
    ph.setAttribute("data-fallback", "Sin imagen");
    if(altText) ph.setAttribute("title", altText);
    wrap.appendChild(ph);
    return wrap;
  }

  const im = document.createElement("img");
  im.src = imgSrc;
  im.alt = altText || "";
  im.loading = "lazy";
  im.decoding = "async";

  im.addEventListener("error", () => {
    try{ im.removeAttribute("src"); }catch(_){}
    im.style.display = "none";
    ph.classList.add("ph--fallback");
    ph.setAttribute("data-fallback", "Sin imagen");
    if(altText) ph.setAttribute("title", altText);
  }, { once: true });

  ph.appendChild(im);
  wrap.appendChild(ph);
  return wrap;
}

/* Nav móvil */
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

/* Sticky offset */
function setHeaderOffsetVar(){
  const header = qs(".header");
  if(!header) return;
  const h = Math.round(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--header-h", `${h || 58}px`);
}
function initHeaderHeightSync(){
  const header = qs(".header");
  if(!header) return;

  requestAnimationFrame(setHeaderOffsetVar);

  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(() => setHeaderOffsetVar()).catch(() => {});
  }

  if("ResizeObserver" in window){
    const ro = new ResizeObserver(() => setHeaderOffsetVar());
    ro.observe(header);
  } else {
    window.addEventListener("resize", () => setHeaderOffsetVar());
  }
}

/* Toggle colapsable de filtros */
function initFiltersToggle(){
  const stickyControls = qs(".sticky-controls");
  const toggles = qsa(".filters-toggle");
  if(!stickyControls || toggles.length === 0) return;

  function applyState(collapsed){
    stickyControls.classList.toggle("is-collapsed", collapsed);
    toggles.forEach(t => t.setAttribute("aria-expanded", String(!collapsed)));
  }

  applyState(stickyControls.classList.contains("is-collapsed"));

  toggles.forEach(t => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      const nowCollapsed = !stickyControls.classList.contains("is-collapsed");
      applyState(nowCollapsed);
    });
  });
}

/* Admin mode (oculto práctico) */
function getAdminEnabled(){
  return localStorage.getItem(ADMIN_FLAG_KEY) === "1";
}
function maybeEnableAdminFromURL(){
  const url = new URL(window.location.href);
  const wantsAdmin = url.searchParams.get("admin") === "1";
  if(!wantsAdmin) return;
  if(getAdminEnabled()) return;

  const pin = prompt("Modo admin: ingresa PIN");
  if(pin === null) return;

  if(String(pin).trim() === ADMIN_PIN){
    localStorage.setItem(ADMIN_FLAG_KEY, "1");
    alert("Admin habilitado en este navegador.");
  } else {
    alert("PIN incorrecto.");
  }
}
function loadEstadoOverrides(){
  try{ return JSON.parse(localStorage.getItem(STATE_OVERRIDES_KEY) || "{}"); }
  catch { return {}; }
}
function saveEstadoOverrides(map){
  localStorage.setItem(STATE_OVERRIDES_KEY, JSON.stringify(map));
}
function applyEstadoOverrides(items){
  const ov = loadEstadoOverrides();
  return items.map(p => ov[p.id] ? ({ ...p, estado: ov[p.id] }) : p);
}

function estadoBlurb(estado){
  if(estado === "Colección") return "Pieza de colección.";
  if(estado === "Madre") return "Planta madre.";
  return "Juvenil (en crecimiento).";
}

/* Archivo */
function initArchivo(){
  const root = qs("[data-page='archivo']");
  if(!root) return;

  maybeEnableAdminFromURL();
  const isAdmin = getAdminEnabled();

  const search = qs("#search", root);
  const clearBtn = qs("#clearBtn", root);
  const emptyClearBtn = qs("#emptyClearBtn", root);

  const toggleTrueque = qs("#toggleTrueque", root);

  const chipsEstado = qs("#chipsEstado", root);
  const chipsFamilia = qs("#chipsFamilia", root);

  const resultCount = qs("#resultCount", root);
  const activeFilters = qs("#activeFilters", root);
  const list = qs("#list", root);
  const emptyState = qs("#emptyState", root);

  let baseItems = applyEstadoOverrides(CATALOGO);

  const familiaOptions = buildFamilyOptions(baseItems);
  const estadoOptions = buildEstadoOptions(baseItems);

  let state = { showTrueque: false, estado: "__all", familia: "__all", query: "" };
  const defaults = { ...state };

  function render(){
    baseItems = applyEstadoOverrides(CATALOGO);

    const items = baseItems
      .filter(x => state.showTrueque ? true : !x.trueque)
      .filter(x => state.estado === "__all" ? true : x.estado === state.estado)
      .filter(x => state.familia === "__all" ? true : x.familia === state.familia)
      .filter(x => matchesQuery(x, state.query));

    resultCount.textContent = `${items.length} resultado(s)`;

    const filterText = buildActiveFiltersText([
      state.query ? `búsqueda “${state.query}”` : "",
      state.showTrueque ? "incluye trueque" : "sin trueque",
      state.estado !== "__all" ? state.estado : "",
      state.familia !== "__all" ? state.familia : ""
    ]);
    if(activeFilters) activeFilters.textContent = filterText;

    if(toggleTrueque) toggleTrueque.checked = state.showTrueque;

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
      st.textContent = x.estado;
      tags.appendChild(st);

      if(x.trueque && state.showTrueque){
        const tt = document.createElement("span");
        tt.className = "pill";
        tt.textContent = "Trueque";
        tags.appendChild(tt);
      }

      (x.tags || []).slice(0,2).forEach(t => {
        const p = document.createElement("span");
        p.className = "pill";
        p.textContent = t;
        tags.appendChild(p);
      });

      const meta = document.createElement("div");
      meta.className = "item__meta";
      meta.textContent = estadoBlurb(x.estado);

      const actions = document.createElement("div");
      actions.className = "item__actions";

      const btn = document.createElement("a");
      btn.className = "btn btn--small btn--ghost";
      btn.href = "#";
      btn.textContent = "Ver notas (placeholder)";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Más adelante: notas/ficha por especie. Por ahora, archivo minimalista.");
      });

      actions.appendChild(btn);

      body.appendChild(titleRow);
      body.appendChild(tags);
      body.appendChild(meta);
      body.appendChild(actions);

      if(isAdmin){
        const admin = document.createElement("div");
        admin.className = "admin-actions";

        const setEstado = (nuevo) => {
          const ov = loadEstadoOverrides();
          ov[x.id] = nuevo;
          saveEstadoOverrides(ov);
          render();
        };

        ["Juvenil","Madre","Colección"].forEach(label => {
          const b = document.createElement("button");
          b.className = "btn-admin";
          b.type = "button";
          b.textContent = label;
          b.addEventListener("click", () => setEstado(label));
          admin.appendChild(b);
        });

        body.appendChild(admin);
      }

      card.appendChild(body);
      list.appendChild(card);
    });

    renderChips(chipsEstado, estadoOptions, state.estado, (v) => {
      state.estado = v;
      render();
    });

    renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
      state.familia = v;
      render();
    });

    if(emptyState){
      emptyState.hidden = items.length !== 0;
    }

    applyStaggerFade(list);
  }

  function clearAll(){
    state = { ...defaults };
    if(search) search.value = "";
    if(toggleTrueque) toggleTrueque.checked = state.showTrueque;
    render();
  }

  if(toggleTrueque){
    toggleTrueque.addEventListener("change", () => {
      state.showTrueque = !!toggleTrueque.checked;
      render();
    });
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

/* Trueque */
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

  const TRUEQUE_ITEMS = CATALOGO.filter(x => !!x.trueque);
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
        const t = x.trueque;
        if(state.dispon === "todos") return true;
        if(state.dispon === "disponible") return t.disponible === true;
        if(state.dispon === "nodisponible") return t.disponible === false;
        return true;
      })
      .filter(x => state.familia === "__all" ? true : x.familia === state.familia)
      .filter(x => {
        const t = x.trueque;
        if(state.condicion === "__any") return true;
        return t.disponible === true && t.condicion === state.condicion;
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
      const t = x.trueque || {};

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
      st.textContent = t.disponible ? "Disponible" : "No disponible";
      tags.appendChild(st);

      if(t.disponible && t.condicion){
        const cd = document.createElement("span");
        cd.className = "pill";
        cd.textContent = t.condicion;
        tags.appendChild(cd);
      }

      (t.tags || []).slice(0,2).forEach(tag => {
        const p = document.createElement("span");
        p.className = "pill";
        p.textContent = tag;
        tags.appendChild(p);
      });

      const meta = document.createElement("div");
      meta.className = "item__meta";
      meta.textContent = t.meta || "Detalles por definir.";

      const actions = document.createElement("div");
      actions.className = "item__actions";

      const btn = document.createElement("a");
      btn.href = "#";
      btn.className = "btn btn--small";
      btn.textContent = t.disponible ? "Proponer trueque (WhatsApp)" : "Consultar igual (WhatsApp)";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const msg = buildTruequeMessage(x);
        window.open(waLink(msg), "_blank", "noopener,noreferrer");
      });

      if(!t.disponible) btn.classList.add("btn--ghost");

      actions.appendChild(btn);

      body.appendChild(titleRow);
      body.appendChild(tags);
      body.appendChild(meta);
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

/* Fonts + Init */
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
  initHeaderHeightSync();
  setYear();
  initNav();
  initFiltersToggle();
  initArchivo();
  initTrueque();
});
