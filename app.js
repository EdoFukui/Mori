const DATA = {
  // =========================
  // ARCHIVO (colección completa)
  // - esTrueque:true => se oculta por defecto, se ve solo con el switch
  // - img:"" => usa fallback (🍃)
  // =========================
  archivo: [
    // --- TRUEQUE (con foto) ---
    {
      id: "a1",
      nombre: "Alocasia sp. Silver Dragon",
      familia: "Alocasia",
      img: "assets/img/alocasia-silver-dragon.jpeg",
      tags: ["Juvenil"],
      nota: "Borrador de ficha.",
      esTrueque: true
    },
    {
      id: "a2",
      nombre: "Epipremnum sp. Manjula",
      familia: "Epipremnum",
      img: "assets/img/epipremnum-manjula.jpeg",
      tags: ["Juvenil"],
      nota: "Borrador de ficha.",
      esTrueque: true
    },
    {
      id: "a3",
      nombre: "Philodendron sp. Brasil (Cordatum)",
      familia: "Philodendron",
      img: "assets/img/cordatum-brasil.jpeg",
      tags: ["Juvenil"],
      nota: "Borrador de ficha.",
      esTrueque: true
    },
    {
      id: "a4",
      nombre: "Monstera sp. Siltepecana",
      familia: "Monstera",
      img: "assets/img/monstera-siltepecana.jpeg",
      tags: ["Juvenil"],
      nota: "Borrador de ficha.",
      esTrueque: true
    },
    {
      id: "a5",
      nombre: "Philodendron sp. Glorious",
      familia: "Philodendron",
      img: "assets/img/philodendron-glorious.jpeg",
      tags: ["Juvenil", "Colección"],
      nota: "Borrador de ficha.",
      esTrueque: true
    },
    {
      id: "a6",
      nombre: "Syngonium sp. Holly",
      familia: "Syngonium",
      img: "assets/img/syngonium-holly.jpeg",
      tags: ["Juvenil"],
      nota: "Borrador de ficha.",
      esTrueque: true
    },

    // --- RESTO ARCHIVO (placeholders por ahora) ---
    { id:"a7",  nombre:"Philodendron Billetiae", familia:"Philodendron", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a8",  nombre:"Monstera Deliciosa", familia:"Monstera", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a9",  nombre:"Syngonium Red Arrow", familia:"Syngonium", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a10", nombre:"Syngonium Confetti", familia:"Syngonium", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a11", nombre:"Philodendron Gloriosum", familia:"Philodendron", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a12", nombre:"Philodendron McDowell", familia:"Philodendron", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },

    { id:"a13", nombre:"Epipremnum Marble Queen", familia:"Epipremnum", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a14", nombre:"Epipremnum Golden", familia:"Epipremnum", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },

    { id:"a15", nombre:"Syngonium Gold Allusion", familia:"Syngonium", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },

    { id:"a16", nombre:"Scindapsus Jade", familia:"Scindapsus", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a17", nombre:"Scindapsus Pictus Argyraeus", familia:"Scindapsus", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a18", nombre:"Scindapsus Pictus Exotica", familia:"Scindapsus", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },

    { id:"a19", nombre:"Alocasia Amazonica", familia:"Alocasia", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false },
    { id:"a20", nombre:"Alocasia Dragon's Breath", familia:"Alocasia", img:"", tags:["Juvenil"], nota:"(Sin foto aún)", esTrueque:false }
  ],

  // =========================
  // TRUEQUE (solo transaccional)
  // =========================
  trueque: [
    { id:"t1", nombre:"Alocasia sp. Silver Dragon", familia:"Alocasia", img:"assets/img/alocasia-silver-dragon.jpeg", disponible:true, condicion:"Enraizado", hojas:1 },
    { id:"t2", nombre:"Epipremnum sp. Manjula", familia:"Epipremnum", img:"assets/img/epipremnum-manjula.jpeg", disponible:true, condicion:"Enraizado", hojas:3 },
    { id:"t3", nombre:"Philodendron sp. Brasil (Cordatum)", familia:"Philodendron", img:"assets/img/cordatum-brasil.jpeg", disponible:true, condicion:"Corte fresco", hojas:2 },
    { id:"t4", nombre:"Monstera sp. Siltepecana", familia:"Monstera", img:"assets/img/monstera-siltepecana.jpeg", disponible:true, condicion:"Enraizado", hojas:3 },
    { id:"t5", nombre:"Philodendron sp. Glorious", familia:"Philodendron", img:"assets/img/philodendron-glorious.jpeg", disponible:true, condicion:"Enraizado", hojas:2 },
    { id:"t6", nombre:"Syngonium sp. Holly", familia:"Syngonium", img:"assets/img/syngonium-holly.jpeg", disponible:true, condicion:"Enraizado", hojas:3 }
  ]
};

const qs = (sel, el=document) => el.querySelector(sel);
const qsa = (sel, el=document) => Array.from(el.querySelectorAll(sel));

function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setHeaderHeightVar(){
  const header = qs(".header");
  if(!header) return;
  const h = Math.round(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--headerH", `${h}px`);
}

function setYear(){
  const y = qs("#year");
  if(y) y.textContent = String(new Date().getFullYear());
}

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

function matchesQuery(x, q){
  if(!q) return true;
  const hay = [
    x.nombre,
    x.familia,
    ...(x.tags || []),
    x.nota || "",
    x.condicion || "",
    x.disponible === false ? "no disponible" : "disponible",
    x.esTrueque ? "trueque" : ""
  ].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase().trim());
}

function buildFamilyOptions(items){
  const fam = Array.from(new Set(items.map(i => i.familia))).sort((a,b) => a.localeCompare(b));
  return [{ value:"__all", label:"Todas" }, ...fam.map(f => ({ value:f, label:f }))];
}

function buildActiveFiltersText(parts){
  const on = parts.filter(Boolean);
  if(on.length === 0) return "";
  return `Filtros: ${on.join(" • ")}`;
}

function renderMedia(imgSrc, alt){
  const media = document.createElement("div");
  media.className = "media";

  if(imgSrc){
    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = alt || "Foto";
    img.src = imgSrc;
    img.onerror = () => {
      media.innerHTML = `<div class="fallback">🍃</div>`;
    };
    media.appendChild(img);
  } else {
    media.innerHTML = `<div class="fallback">🍃</div>`;
  }

  return media;
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

/* =========================
   Archivo (switch real + trueque oculto por defecto)
   ========================= */
function initArchivo(){
  const root = qs("[data-page='archivo']");
  if(!root) return;

  const search = qs("#search", root);
  const clearBtn = qs("#clearBtn", root);
  const emptyClearBtn = qs("#emptyClearBtn", root);
  const chipsFamilia = qs("#chipsFamilia", root);
  const toggleTrueque = qs("#toggleTrueque", root);
  const resultCount = qs("#resultCount", root);
  const activeFilters = qs("#activeFilters", root);
  const list = qs("#list", root);
  const emptyState = qs("#emptyState", root);

  const familiaOptions = buildFamilyOptions(DATA.archivo);

  let state = {
    familia: "__all",
    query: "",
    showTrueque: false // apagado por defecto
  };

  const defaults = { ...state };

  function render(){
    const items = DATA.archivo
      .filter(x => state.familia === "__all" ? true : x.familia === state.familia)
      .filter(x => matchesQuery(x, state.query))
      .filter(x => state.showTrueque ? true : (x.esTrueque ? false : true));

    resultCount.textContent = `${items.length} resultado(s)`;

    const filterText = buildActiveFiltersText([
      state.query ? `búsqueda “${state.query}”` : "",
      state.familia !== "__all" ? state.familia : "",
      state.showTrueque ? "Mostrando plantas de trueque" : ""
    ]);
    if(activeFilters) activeFilters.textContent = filterText;

    list.innerHTML = "";
    items.forEach(x => {
      const card = document.createElement("article");
      card.className = "card lift item";

      const media = renderMedia(x.img, x.nombre);
      card.appendChild(media);

      const body = document.createElement("div");
      body.className = "item__body";

      const pills = [
        `<span class="pill">${escapeHtml(x.familia)}</span>`,
        ...(x.tags || []).slice(0,2).map(t => `<span class="pill">${escapeHtml(t)}</span>`),
        (x.esTrueque && state.showTrueque) ? `<span class="pill pill--accent">Trueque</span>` : ""
      ].filter(Boolean).join("");

      body.innerHTML = `
        <h2 class="serif item__title">${escapeHtml(x.nombre)}</h2>
        <div class="pills">${pills}</div>
        <p class="tagline">${escapeHtml(x.nota || "")}</p>
      `;

      card.appendChild(body);
      list.appendChild(card);
    });

    emptyState.hidden = items.length !== 0;
  }

  function clearAll(){
    state = { ...defaults };
    if(search) search.value = "";
    if(toggleTrueque) toggleTrueque.checked = state.showTrueque;

    renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
      state.familia = v;
      render();
    });

    render();
  }

  renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
    state.familia = v;
    render();
  });

  if(toggleTrueque){
    toggleTrueque.checked = state.showTrueque;
    toggleTrueque.addEventListener("change", () => {
      state.showTrueque = toggleTrueque.checked;
      render();
    });
  }

  if(search){
    search.addEventListener("input", () => {
      state.query = search.value;
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

  const familiaOptions = buildFamilyOptions(DATA.trueque);

  const disponOptions = [
    { value:"__all", label:"Todos" },
    { value:"disponible", label:"Disponible" },
    { value:"no", label:"No disponible" }
  ];

  const condOptions = [
    { value:"__all", label:"Todos" },
    { value:"Corte fresco", label:"Corte fresco" },
    { value:"Enraizado", label:"Enraizado" }
  ];

  let state = { dispon: "__all", cond: "__all", familia: "__all", query: "" };
  const defaults = { ...state };

  function render(){
    const items = DATA.trueque
      .filter(x => {
        if(state.dispon === "__all") return true;
        return state.dispon === "disponible" ? x.disponible === true : x.disponible === false;
      })
      .filter(x => {
        if(state.cond === "__all") return true;
        return x.disponible === true && x.condicion === state.cond;
      })
      .filter(x => state.familia === "__all" ? true : x.familia === state.familia)
      .filter(x => matchesQuery(x, state.query));

    resultCount.textContent = `${items.length} resultado(s)`;

    const filterText = buildActiveFiltersText([
      state.query ? `búsqueda “${state.query}”` : "",
      state.dispon !== "__all" ? (state.dispon === "disponible" ? "Disponible" : "No disponible") : "",
      state.cond !== "__all" ? state.cond : "",
      state.familia !== "__all" ? state.familia : ""
    ]);
    if(activeFilters) activeFilters.textContent = filterText;

    list.innerHTML = "";
    items.forEach(x => {
      const card = document.createElement("article");
      card.className = "card lift item";

      const media = renderMedia(x.img, x.nombre);
      card.appendChild(media);

      const body = document.createElement("div");
      body.className = "item__body";

      const pills = [
        `<span class="pill">${x.disponible ? "Disponible" : "No disponible"}</span>`,
        x.disponible ? `<span class="pill pill--accent">${escapeHtml(x.condicion || "")}</span>` : "",
        x.hojas ? `<span class="pill">${escapeHtml(String(x.hojas))} hoja(s)</span>` : ""
      ].filter(Boolean).join("");

      const msg = encodeURIComponent(`Hola! Me interesa proponer trueque por: ${x.nombre}.`);
      const wa = `https://wa.me/56955555555?text=${msg}`;

      body.innerHTML = `
        <h2 class="serif item__title">${escapeHtml(x.nombre)}</h2>
        <div class="pills"><span class="pill">${escapeHtml(x.familia)}</span></div>
        <div class="pills">${pills}</div>
        <a class="btn" href="${wa}" target="_blank" rel="noopener noreferrer">Proponer trueque (WhatsApp)</a>
      `;

      card.appendChild(body);
      list.appendChild(card);
    });

    emptyState.hidden = items.length !== 0;
  }

  function clearAll(){
    state = { ...defaults };
    if(search) search.value = "";
    renderChips(chipsDispon, disponOptions, state.dispon, (v)=>{ state.dispon=v; render(); });
    renderChips(chipsCond, condOptions, state.cond, (v)=>{ state.cond=v; render(); });
    renderChips(chipsFamilia, familiaOptions, state.familia, (v)=>{ state.familia=v; render(); });
    render();
  }

  renderChips(chipsDispon, disponOptions, state.dispon, (v)=>{ state.dispon=v; render(); });
  renderChips(chipsCond, condOptions, state.cond, (v)=>{ state.cond=v; render(); });
  renderChips(chipsFamilia, familiaOptions, state.familia, (v)=>{ state.familia=v; render(); });

  if(search){
    search.addEventListener("input", () => {
      state.query = search.value;
      render();
    });
  }
  if(clearBtn) clearBtn.addEventListener("click", clearAll);
  if(emptyClearBtn) emptyClearBtn.addEventListener("click", clearAll);

  render();
}

/* Fonts */
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
  setHeaderHeightVar();
  loadFonts();
  setYear();
  initNav();
  initFiltersToggle();
  initArchivo();
  initTrueque();
});

window.addEventListener("resize", () => {
  setHeaderHeightVar();
});
