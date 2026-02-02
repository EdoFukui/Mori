/* =========================
   Datos (demo / placeholders)
   ========================= */

const DATA = {
  archivo: [
    { id: "a1", nombre: "Monstera deliciosa", familia: "Monstera", tags: ["interior", "luz media"], nota: "Ficha placeholder (sin imágenes por ahora)." },
    { id: "a2", nombre: "Philodendron hederaceum", familia: "Philodendron", tags: ["trepadora", "semisombra"], nota: "Ficha placeholder (sin imágenes por ahora)." },
    { id: "a3", nombre: "Epipremnum aureum", familia: "Epipremnum", tags: ["resistente", "rápida"], nota: "Ficha placeholder (sin imágenes por ahora)." },
    { id: "a4", nombre: "Alocasia (sp.)", familia: "Alocasia", tags: ["humedad", "luz indirecta"], nota: "Ficha placeholder (sin imágenes por ahora)." },
    { id: "a5", nombre: "Anthurium (sp.)", familia: "Anthurium", tags: ["ornamental", "luz indirecta"], nota: "Ficha placeholder (sin imágenes por ahora)." }
  ],
  trueque: [
    { id: "t1", nombre: "Monstera deliciosa", familia: "Monstera", disponible: true,  condicion: "Corte fresco", tags: ["1 nodo"], meta: "en agua • comuna por definir" },
    { id: "t2", nombre: "Philodendron hederaceum", familia: "Philodendron", disponible: true,  condicion: "Enraizado", tags: ["2 hojas"], meta: "en perlita • comuna por definir" },
    { id: "t3", nombre: "Epipremnum aureum", familia: "Epipremnum", disponible: false, condicion: "Enraizado", tags: ["var."], meta: "registro / no disponible" },
    { id: "t4", nombre: "Alocasia (sp.)", familia: "Alocasia", disponible: true,  condicion: "Corte fresco", tags: ["1 hoja"], meta: "en agua • comuna por definir" },
    { id: "t5", nombre: "Anthurium (sp.)", familia: "Anthurium", disponible: false, condicion: "Corte fresco", tags: ["n/a"], meta: "registro / no disponible" }
  ]
};

/* =========================
   Orden editorial (familias)
   ========================= */

const FAMILY_ORDER = ["Alocasia", "Philodendron", "Monstera", "Epipremnum", "Anthurium", "Otros"];
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

  // sinónimos simples (ampliables)
  const synonyms = [
    ["philo", "philodendron"],
    ["monstera albo", "albo variegata"],
    ["albo", "variegata"],
  ];

  let expanded = q;
  for(const [a,b] of synonyms){
    if(expanded.includes(a)) expanded = expanded.replaceAll(a, b);
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

  // Cierra el menú al tocar un link (móvil)
  qsa(".nav__list a").forEach(a => {
    a.addEventListener("click", () => {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
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

/* =========================
   Página Archivo
   ========================= */

function initArchivo(){
  const root = qs("[data-page='archivo']");
  if(!root) return;

  const search = qs("#search", root);
  const chipsFamilia = qs("#chipsFamilia", root);
  const resultCount = qs("#resultCount", root);
  const list = qs("#list", root);

  const familiaOptions = buildFamilyOptions(DATA.archivo);

  let state = {
    familia: "__all",
    query: ""
  };

  function render(){
    const items = DATA.archivo
      .filter(x => state.familia === "__all" ? true : x.familia === state.familia)
      .filter(x => matchesQuery(x, state.query));

    resultCount.textContent = `${items.length} resultado(s)`;

    list.innerHTML = "";
    items.forEach(x => {
      const card = document.createElement("article");
      card.className = "card item";

      const ph = document.createElement("div");
      ph.className = "ph";
      ph.setAttribute("aria-hidden","true");

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
      meta.textContent = x.nota || "Ficha placeholder.";

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

      card.appendChild(ph);
      card.appendChild(body);

      list.appendChild(card);
    });

    renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
      state.familia = v;
      render();
    });
  }

  search.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });

  render();
}

/* =========================
   Página Trueque
   ========================= */

function initTrueque(){
  const root = qs("[data-page='trueque']");
  if(!root) return;

  const search = qs("#search", root);
  const chipsDispon = qs("#chipsDispon", root);
  const chipsCond = qs("#chipsCond", root);
  const chipsFamilia = qs("#chipsFamilia", root);
  const resultCount = qs("#resultCount", root);
  const list = qs("#list", root);

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

  // Default user-first: Disponible
  let state = {
    dispon: "disponible",
    condicion: "__any",
    familia: "__all",
    query: ""
  };

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
        // condición solo aplica a disponibles
        return x.disponible === true && x.condicion === state.condicion;
      })
      .filter(x => matchesQuery(x, state.query));

    resultCount.textContent = `${items.length} resultado(s)`;

    list.innerHTML = "";
    items.forEach(x => {
      const card = document.createElement("article");
      card.className = "card item";

      const ph = document.createElement("div");
      ph.className = "ph";
      ph.setAttribute("aria-hidden","true");

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

      // Estado principal
      const st = document.createElement("span");
      st.className = "pill pill--wine";
      st.textContent = x.disponible ? "Disponible" : "No disponible";
      tags.appendChild(st);

      // Condición secundaria SOLO si disponible
      if(x.disponible){
        const cd = document.createElement("span");
        cd.className = "pill";
        cd.textContent = x.condicion;
        tags.appendChild(cd);
      }

      // tags extra (máx 2)
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

      // Atenuar si no disponible
      if(!x.disponible){
        btn.classList.add("btn--ghost");
      }

      actions.appendChild(btn);

      body.appendChild(titleRow);
      body.appendChild(tags);
      body.appendChild(meta);
      body.appendChild(actions);

      card.appendChild(ph);
      card.appendChild(body);

      list.appendChild(card);
    });

    renderChips(chipsDispon, disponOptions, state.dispon, (v) => {
      state.dispon = v;
      // si se elige "No disponible", la condición deja de tener sentido -> reseteo
      if(state.dispon === "nodisponible") state.condicion = "__any";
      render();
    });

    renderChips(chipsCond, condOptions, state.condicion, (v) => {
      // condición solo aplica a disponibles
      if(state.dispon === "nodisponible") return;
      state.condicion = v;
      render();
    });

    renderChips(chipsFamilia, familiaOptions, state.familia, (v) => {
      state.familia = v;
      render();
    });
  }

  search.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });

  render();
}

/* =========================
   Fuentes + Init global
   ========================= */

function loadFonts(){
  // Fraunces (serif) + Inter (sans)
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
  initArchivo();
  initTrueque();
});
