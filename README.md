# Plantas Mori

**Archivo vivo + Espacio de trueque de esquejes**

Una plataforma educativa y comunitaria para documentar plantas y facilitar el intercambio de esquejes.

## 📋 Características

- **Archivo**: Catálogo de plantas con buscador y filtros por familia
- **Trueque**: Inventario vivo de esquejes disponibles + integración WhatsApp
- **Fotos reales**: UI vertical tipo Instagram (aspect-ratio 4:5)
- **Mobile-first**: Totalmente responsivo
- **Accesible**: WCAG 2.1, aria-labels, skip link, semantic HTML

## 🗂️ Estructura

```
Mori/
├── index.html          # Página principal
├── archivo.html        # Catálogo de plantas
├── trueque.html        # Inventario de esquejes
├── app.js              # Datos + lógica (JS vanilla)
├── styles.css          # Estilos (mobile-first)
├── assets/
│   └── img/
│       ├── alocasia-silver-dragon.jpeg
│       ├── epipremnum-manjula.jpeg
│       ├── cordatum-brasil.jpeg
│       ├── monstera-siltepecana.jpeg
│       ├── philodendron-glorious.jpeg
│       └── syngonium-holly.jpeg
└── README.md           # Este archivo
```

## 🚀 Cómo usar

1. **Clonar o descargar**
   ```bash
   git clone <tu-repo>
   cd Mori
   ```

2. **Abrir en navegador**
   - Abre `index.html` en el navegador (cualquier servidor local funciona)
   - O usa VS Code Live Server

3. **Editar plantas**
   - Los datos están en `app.js` (objeto `DATA`)
   - Cada planta tiene: `id`, `nombre`, `familia`, `img`, `tags`, `nota`
   - Para trueque: añade `disponible`, `condicion`, `meta`

## 📝 Agregar una planta nueva

En `app.js`, dentro de `DATA.archivo`:

```javascript
{
  id: "a7",
  nombre: "Tu Planta sp. Variedad",
  familia: "Familia",
  img: "assets/img/nombre-archivo.jpeg",
  tags: ["tag1", "tag2"],
  nota: "Descripción breve..."
}
```

Para trueque, agrega los campos adicionales:
```javascript
{
  id: "t7",
  nombre: "Tu Planta sp. Variedad",
  familia: "Familia",
  img: "assets/img/nombre-archivo.jpeg",
  disponible: true,
  condicion: "Enraizado", // o "Corte fresco"
  tags: ["tag1"],
  meta: "en sustrato • comuna por definir"
}
```

## 🎨 Paleta de colores

- **Fondo**: `#DED7D1` (piedra/beige)
- **Papel**: `#FBF7F3`
- **Texto**: `#1A1416` (negro)
- **Acento**: `#7E0F22` (vino roto)
- **Muted**: `#554B4E` (gris)

## 🔗 Integración WhatsApp

El número WhatsApp está en `app.js`:
```javascript
const WHATSAPP_NUMBER = "56955555555"; // Reemplazar con número real
```

Los mensajes se rellenan automáticamente con info de la planta.

## 📱 Filtros y búsqueda

- **Buscador**: Busca por nombre, familia, tags, condición, etc.
- **Sinónimos**: Detecta abreviaciones (ej: "philo" → "philodendron")
- **Chips**: Filtros visuales por familia, disponibilidad, condición
- **Sticky**: Controles pegados al top (mobile-friendly)

## ✅ Estado actual

**Fase cero**: Maqueta funcional. Componentes listos para expandir.

- [ ] Fichas individuales por especie
- [ ] Galería de fotos por planta
- [ ] Sistema de comentarios/reseñas
- [ ] Histórico de trueques
- [ ] Backend + base de datos

## 🛠️ Tecnologías

- **HTML5**: Semántico + accesible
- **CSS3**: Mobile-first, variables CSS, flexbox, grid
- **JavaScript**: Vanilla (sin frameworks)
- **Fonts**: Inter (sans) + Fraunces (serif) via Google Fonts

## 📄 Licencia

Proyecto de código abierto. Úsalo libremente. 🌱

---

**Última actualización**: Feb 2026 | **UI**: 2 | **Fotos reales**
