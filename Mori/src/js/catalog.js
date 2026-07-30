// ============================================
// CATÁLOGO — Carga de ejemplares, render de
// tarjetas y filtros por categoría
// ============================================
//
// Esquema de datos aprobado (Etapa 4): cada ejemplar tiene
// id, nombre, especie, categoria (venta|trueque), precio
// (CLP o null si es trueque), estado (disponible|reservado|
// retirado), tamaño, condicion, imagen.
//
// Regla funcional (Especificación del Catálogo, sección 6):
// los ejemplares en estado "retirado" desaparecen del
// catálogo público, por lo que se filtran antes de renderizar.

const WHATSAPP_URL = 'https://wa.me/1234567890';

function formatoPrecioCLP(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    }).format(precio);
}

function skeletonCardHTML() {
    return `
        <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-info">
                <div class="skeleton-line medium"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
    `;
}

function etiquetaComercial(planta) {
    if (planta.categoria === 'venta' && typeof planta.precio === 'number') {
        return formatoPrecioCLP(planta.precio);
    }
    return 'Trueque';
}

function cardHTML(planta) {
    return `
        <div class="card reveal" data-categoria="${planta.categoria}" data-id="${planta.id}">
            <div class="card-imagen">
                <img src="${planta.imagen}" alt="${planta.nombre}" loading="lazy">
                <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="btn-card">Consultar</a>
            </div>
            <div class="card-info">
                <h3>${planta.nombre}</h3>
                <span class="tag-card">${etiquetaComercial(planta)}</span>
            </div>
        </div>
    `;
}

export async function initCatalog(observer) {
    const contenedor = document.getElementById('contenedor-plantas');
    if (!contenedor) return [];

    let tarjetas = [];

    // 1. Skeletons mientras cargan los datos
    contenedor.innerHTML = Array.from({ length: 3 }, skeletonCardHTML).join('');

    // 2. Carga de datos reales
    let plantas = [];
    try {
        const response = await fetch('src/data/plantas.json');
        plantas = await response.json();
    } catch (error) {
        contenedor.innerHTML = '<p class="error-catalogo">No fue posible cargar el catálogo. Intenta nuevamente más tarde.</p>';
        return [];
    }

    // 3. Filtrar ejemplares retirados del inventario activo (Catálogo, sección 6)
    const plantasActivas = plantas.filter(planta => planta.estado !== 'retirado');

    contenedor.innerHTML = plantasActivas.map(cardHTML).join('');

    tarjetas = document.querySelectorAll('.card');
    tarjetas.forEach(tarjeta => observer.observe(tarjeta));

    // 4. Filtros por categoría
    const botones = document.querySelectorAll('.btn-filtro');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            botones.forEach(b => {
                b.classList.remove('activo');
                b.setAttribute('aria-pressed', 'false');
            });
            boton.classList.add('activo');
            boton.setAttribute('aria-pressed', 'true');

            const filtro = boton.dataset.filtro;

            tarjetas.forEach(tarjeta => {
                const categoria = tarjeta.dataset.categoria;
                tarjeta.style.display = (filtro === 'todas' || filtro === categoria) ? 'flex' : 'none';
            });
        });
    });

    return plantasActivas;
}
