/* =========================
   UI 2 — Datos + fotos reales (assets/img)
   ========================= */

const DATA = {
  archivo: [
    {
      id: "a1",
      nombre: "Alocasia sp. Silver Dragon",
      familia: "Alocasia",
      img: "assets/img/alocasia-silver-dragon.jpeg",
      tags: ["textura", "hoja densa"],
      nota: "Alocasia compacta de hoja gruesa. (Ficha breve, borrador.)"
    },
    {
      id: "a2",
      nombre: "Epipremnum sp. Manjula",
      familia: "Epipremnum",
      img: "assets/img/epipremnum-manjula.jpeg",
      tags: ["variegada", "interior"],
      nota: "Variegación clara/verde. (Ficha breve, borrador.)"
    },
    {
      id: "a3",
      nombre: "Cordatum sp. Brasil",
      familia: "Philodendron",
      img: "assets/img/cordatum-brasil.jpeg",
      tags: ["cordatum", "corte"],
      nota: "Grupo cordatum/hederaceum ‘Brasil’. (Ficha breve, borrador.)"
    },
    {
      id: "a4",
      nombre: "Monstera sp. Siltepecana",
      familia: "Monstera",
      img: "assets/img/monstera-siltepecana.jpeg",
      tags: ["juvenil", "textura"],
      nota: "Juvenil con textura marcada. (Ficha breve, borrador.)"
    },
    {
      id: "a5",
      nombre: "Philodendron sp. Glorious",
      familia: "Philodendron",
      img: "assets/img/philodendron-glorious.jpeg",
      tags: ["hoja grande", "venas claras"],
      nota: "Híbrido/colección. (Ficha breve, borrador.)"
    },
    {
      id: "a6",
      nombre: "Syngonium sp. Holly",
      familia: "Syngonium",
      img: "assets/img/syngonium-holly.jpeg",
      tags: ["variegada", "compacta"],
      nota: "Syngonium con bordes oscuros y centro claro. (Ficha breve, borrador.)"
    }
  ],

  trueque: [
    {
      id: "t1",
      nombre: "Alocasia sp. Silver Dragon",
      familia: "Alocasia",
      img: "assets/img/alocasia-silver-dragon.jpeg",
      disponible: true,
      condicion: "Enraizado",
      tags: ["1 hoja"],
      meta: "en sustrato mineral • comuna por definir"
    },
    {
      id: "t2",
      nombre: "Epipremnum sp. Manjula",
      familia: "Epipremnum",
      img: "assets/img/epipremnum-manjula.jpeg",
      disponible: true,
      condicion: "Enraizado",
      tags: ["variegada"],
      meta: "en sustrato • comuna por definir"
    },
    {
      id: "t3",
      nombre: "Cordatum sp. Brasil",
      familia: "Philodendron",
      img: "assets/img/cordatum-brasil.jpeg",
      disponible: true,
      condicion: "Corte fresco",
      tags: ["2 hojas"],
      meta: "corte fresco • comuna por definir"
    },
    {
      id: "t4",
      nombre: "Monstera sp. Siltepecana",
      familia: "Monstera",
      img: "assets/img/monstera-siltepecana.jpeg",
      disponible: true,
      condicion: "Enraizado",
      tags: ["juvenil"],
      meta: "en sustrato • comuna por definir"
    },
    {
      id: "t5",
      nombre: "Philodendron sp. Glorious",
      familia: "Philodendron",
      img: "assets/img/philodendron-glorious.jpeg",
      disponible: true,
      condicion: "Enraizado",
      tags: ["hoja grande"],
      meta: "en sustrato • comuna por definir"
    },
    {
      id: "t6",
      nombre: "Syngonium sp. Holly",
      familia: "Syngonium",
      img: "assets/img/syngonium-holly.jpeg",
      disponible: true,
      condicion: "Enraizado",
      tags: ["variegada"],
      meta: "en sustrato • comuna por definir"
    }
  ]
};

/* =========================
   Orden editorial (familias) — UI 2
   ========================= */

const FAMILY_ORDER = [
  "Alocasia",
  "Philodendron",
  "Monstera",
  "Epipremnum",
  "Syngonium",
  "Anthurium",
  "Otros"
];

const HIDE_EMPTY_FAMILIES = false;

function buildFamilyOptions(items){
  const present = new Set(items.map(x => x.familia).filter(Boolean));
  const ordered = FAMILY_ORDER.filter(f => !HIDE_EMPTY_FAMILIES || present.has(f));
  return [{label:"Todas", value:"__all"}].concat(ordered.map(f => ({label:f, value:f})));
}

/* =========================
   WhatsApp (ficticio)
   ========================= */

// Número ficticio para mock visual (no funcionará como contacto real)
const WHATSAPP_NUMBER = "56955555555";

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function buildTruequeMessage(item){
  const disponibilidad = item.disponible ? "Disponible" : "No disponible";
  const condicion = item.disponible ? ` • ${item.condicion}` : "";
  const meta = item.meta ? `\nDetalles: ${item.meta}` : "";
  const tags = (item.tags && item.tags.length) ? `\nTags: ${item.tags.join(", ")}` : "";

  return [
    "Hola! Vengo desde Plantas Mori.",
    `Me interesa este esqueje: ${item.nombre} (${item.familia})`,
    `Estado: ${disponibilidad}${condicion}`,
    `${meta}${tags}`,
    "",
    "¿Podemos coordinar un trueque? 🙂"
  ].join("\n");
}

/* =========================
   Utilidades
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

function matchesQuery(item, query){
  if(!query) return true;
  const q = norm(query);

  const synonyms = [
    ["philo", "philodendron"],
    ["syngo", "syngonium"],
    ["silte", "siltepecana"],
    ["manj", "manjula"],
    ["silver", "silver dragon"],
    ["glor", "glorious"],
    ["brasil", "brazil"]
  ];

  let expanded = q;
  for(const [a,b] of synonyms){
    if(expanded.includes(a)) expanded = expanded.replace(a, b);
  }

  const hay = [
    item.nombre,
    item.familia,
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
   UI 2: altura real del header (para sticky offsets)
   ========================= */

function setHeaderOffsetVar(){
  const header = qs(".header");
  if(!header) return;
  const h = Math.round(header.getBoundingClientRect().height);
  // Fallback a 58px si algo raro ocurre
  document.documentElement.style.setProperty("--header-h", `${h || 58}px`);
}

function initHeaderHeightSync(){
  const header = qs(".header");
  if(!header) return;

  // 1) primera medición (después del layout)
  requestAnimationFrame(setHeaderOffsetVar);

  // 2) si cambian fuentes, puede variar 1-2px
  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(() => setHeaderOffsetVar()).catch(() => {});
  }

  // 3) observar cambios reales de tamaño
  if("ResizeObserver" in window){
    const ro = new ResizeObserver(() => setHeaderOffsetVar());
    ro.observe(header);
  } else {
    window.addEventListener("resize", () => setHeaderOffsetVar());
  }
}

/* =========================
   Filtros colapsables
   ========================= */

function initFiltersToggle(){
  const stickyControls = qs(".sticky-controls");
  const toggles = qsa(".filters-toggle");
  const handle = qs(".filters-handle");

  if(!stickyControls || toggles.length === 0) return;

  // Toggle behavior: keep all toggle buttons in sync
  function setCollapsed(collapsed){
    if(collapsed) stickyControls.classList.add("is-collapsed");
    else stickyControls.classList.remove("is-collapsed");
    toggles.forEach(t => t.setAttribute("aria-expanded", String(!collapsed)));
  }

  toggles.forEach(t => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      const isCollapsed = stickyControls.classList.toggle("is-collapsed");
      toggles.forEach(tb => tb.setAttribute("aria-expanded", String(!isCollapsed)));
    });
  });

  // Show a small handle when the full filters bar scrolls out of view
  if(handle){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          handle.classList.remove('show');
          handle.setAttribute('aria-hidden', 'true');
        } else {
          handle.classList.add('show');
          handle.setAttribute('aria-hidden', 'false');
        }
      });
    }, { root: null, threshold: 0 });

    io.observe(stickyControls);
  }
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

    // Si la imagen falla (404, nombre mal, etc.), evitamos el ícono de "imagen rota"
    // y dejamos un placeholder limpio.
    im.addEventListener("error", () => {
      try{ im.removeAttribute("src"); }catch(_){/* noop */}
      im.style.display = "none";
      ph.classList.add("ph--fallback");
      ph.setAttribute("data-fallback", "Sin imagen");
      if(altText) ph.setAttribute("title", altText);
    }, { once: true });

    ph.appendChild(im);
  }

  wrap.appendChild(ph);
  return wrap;
}

/* =========================
   Página Archivo
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

  const familiaOptions = buildFamilyOptions(DATA.archivo);

  let state = { familia: "__all", query: "" };
  const defaults = { familia: "__all", query: "" };

  function render(){
    const items = DATA.archivo
      .filter(x => state.familia === "__all" ? true : x.familia === state.familia)
      .filter(x => matchesQuery(x, state.query));

    resultCount.textContent = `${items.length} resultado(s)`;

    const filterText = buildActiveFiltersText([
      state.query ? `búsqueda “${state.query}”` : "",
      state.familia !== "__all" ? state.familia : ""
    ]);
    if(activeFilters) activeFilters.textContent = filterText;

    list.innerHTML = "";
    items.forEach(x => {
      const card = document.createElement("article");
      card.className = "card item lift";

      // media (UI 2)
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
      (x.tags || []).slice(0,3).forEach(t => {
        const p = document.createElement("span");
        p.className = "pill";
        p.textContent = t;
        tags.appendChild(p);
      });

      const meta = document.createElement("div");
      meta.className = "item__meta";
      meta.textContent = x.nota || "Ficha breve (borrador).";

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

    if(emptyState){
      emptyState.hidden = items.length !== 0;
    }

    applyStaggerFade(list);
  }

  function clearAll(){
    state.familia = defaults.familia;
    state.query = defaults.query;
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
   Página Trueque
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

  const familiaOptions = buildFamilyOptions(DATA.trueque);

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
    const items = DATA.trueque
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

      // media (UI 2)
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

      const meta = document.createElement("div");
      meta.className = "item__meta";
      meta.textContent = x.meta || "Detalles por definir.";

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
  initHeaderHeightSync();
  setYear();
  initNav();
  initFiltersToggle();
  initArchivo();
  initTrueque();
});
