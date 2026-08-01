# 🌿 Mori — Tienda de plantas exóticas

Sitio web para **Mori**, una tienda familiar de plantas exóticas en Santiago
de Chile dedicada a la venta y el trueque de ejemplares. Es un sitio estático
de una sola página: catálogo con filtros, ficha de detalle por ejemplar, y
contacto directo por WhatsApp.

> Proyecto de portafolio. Muestra un frontend cuidado (diseño, animación,
> accesibilidad, SEO básico) construido sin frameworks ni build step.

## ✨ Características

- **Catálogo filtrable** por categoría (venta / trueque), cargado de forma
  asíncrona desde un archivo JSON (`src/data/plantas.json`).
- **Ficha de detalle** de cada ejemplar en un modal accesible: atrapa el foco
  con `Tab`/`Shift+Tab`, lo devuelve al elemento que abrió el modal al
  cerrarse, y es completamente operable por teclado.
- **Fondo animado** tipo timelapse en el Hero, con reveal de secciones al
  hacer scroll (Intersection Observer).
- **Contacto directo por WhatsApp**, sin backend ni formularios: no se
  recolecta ningún dato personal en el sitio.
- **SEO y metadatos** básicos: Open Graph, Twitter Card, JSON-LD,
  `sitemap.xml` y `robots.txt`.
- Favicon SVG con fallback PNG (`16x16`/`32x32`) y `apple-touch-icon` para
  iOS.
- Responsive, pensado primero para móvil.

## 🧱 Stack

HTML5, CSS3 y JavaScript con módulos ES nativos — **sin frameworks, sin
bundler, sin dependencias de build**. Todo corre directo en el navegador.

## 📂 Estructura del proyecto

```
├── index.html                # Punto de entrada
├── robots.txt / sitemap.xml  # SEO
├── assets/
│   ├── ejemplares/           # Fotos del catálogo
│   ├── frames/               # Secuencia de imágenes del fondo animado
│   ├── fonts/                 # Tipografías
│   └── favicon.svg, apple-touch-icon.png, favicon-16/32.png
└── src/
    ├── css/
    │   ├── base.css           # Variables globales, reset
    │   ├── layout.css         # Estructura general
    │   ├── components.css     # Botones, tarjetas, filtros, skeleton loader
    │   ├── sections.css        # Hero, catálogo, contacto, footer
    │   └── modal.css           # Modal de detalle
    ├── js/
    │   ├── main.js             # Inicialización general
    │   ├── config.js           # Valores compartidos (ej. WhatsApp)
    │   ├── background.js       # Fondo animado del Hero
    │   ├── catalog.js          # Carga y render del catálogo + filtros
    │   ├── ejemplarModal.js    # Modal de detalle (con focus trap)
    │   ├── whatsappLinks.js    # Sincroniza enlaces estáticos de WhatsApp
    │   ├── scrollReveal.js     # Animaciones al hacer scroll
    │   └── scrollTop.js        # Botón flotante "ir arriba"
    └── data/
        └── plantas.json        # Datos del catálogo
```

## 🚀 Cómo correrlo localmente

El catálogo se carga con `fetch()`, así que **no funciona abriendo
`index.html` con doble clic** (el protocolo `file://` bloquea esa petición
por CORS). Necesitas servirlo con un servidor local, por ejemplo:

```bash
# Opción 1: extensión Live Server de VS Code
# clic derecho sobre index.html → "Open with Live Server"

# Opción 2: servidor HTTP simple de Python
python3 -m http.server 5500
# luego abrir http://127.0.0.1:5500
```

## 🗺️ Roadmap

Este proyecto se mantiene deliberadamente como un sitio de vitrina/catálogo,
sin carrito ni pagos. La versión con checkout, pasarela de pago e inventario
dinámico se está desarrollando como un proyecto aparte: **Mori 2.0**.

## 📄 Licencia

Repositorio publicado con fines de portafolio. El código puede visualizarse
libremente, pero no está autorizado su uso, copia ni redistribución sin
permiso previo del autor — ver [`LICENSE`](./LICENSE) para el detalle. Las
fotografías de plantas en `assets/ejemplares/` pertenecen a Mori y tampoco
están cubiertas para su reutilización.

## ✍️ Autor

**Eduardo Hidalgo S.**
