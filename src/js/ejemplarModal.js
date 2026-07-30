// ============================================
// VISTA DE DETALLE DEL EJEMPLAR — Modal
// ============================================
//
// Decisión congelada por el usuario: la Vista de Detalle se
// implementa como modal (Guía de Implementación, sección 6,
// dejaba esta elección libre).
//
// Requisitos funcionales cubiertos:
// - Muestra toda la información aprobada del ejemplar
//   (Catálogo, sección 9).
// - Permite volver al catálogo e iniciar contacto
//   (Navegación, sección 5).

// TODO CRÍTICO: reemplazar por el número real en formato internacional sin '+' (ej: 56912345678)
const WHATSAPP_URL = 'https://wa.me/1234567890';

function formatoPrecioCLP(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    }).format(precio);
}

function etiquetaComercial(planta) {
    if (planta.categoria === 'venta' && typeof planta.precio === 'number') {
        return formatoPrecioCLP(planta.precio);
    }
    return 'Disponible para trueque';
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function modalContenidoHTML(planta) {
    return `
        <div class="modal-imagen">
            <img src="${planta.imagen}" alt="${planta.nombre}">
        </div>
        <div class="modal-info">
            <span class="tag-card">${etiquetaComercial(planta)}</span>
            <h3>${planta.nombre}</h3>
            <p class="modal-especie">${planta.especie}</p>
            <ul class="modal-detalles">
                <li><strong>Tamaño:</strong> ${capitalizar(planta.tamaño)}</li>
                <li><strong>Condición:</strong> ${planta.condicion}</li>
            </ul>
            <div class="modal-acciones">
                <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="btn-contacto">Contactar por este ejemplar</a>
                <button type="button" class="btn-cerrar-modal">Volver al catálogo</button>
            </div>
        </div>
    `;
}

export function initEjemplarModal(plantas) {
    const overlay = document.getElementById('modal-ejemplar');
    const contenido = document.getElementById('modal-ejemplar-contenido');
    if (!overlay || !contenido) return;

    function abrirModal(id) {
        const planta = plantas.find(p => p.id === id);
        if (!planta) return;

        contenido.innerHTML = modalContenidoHTML(planta);
        overlay.classList.add('activo');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-abierto');

        const btnCerrar = contenido.querySelector('.btn-cerrar-modal');
        btnCerrar.addEventListener('click', cerrarModal);
    }

    function cerrarModal() {
        overlay.classList.remove('activo');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-abierto');
    }

    // Delegación de eventos: cualquier tarjeta con data-id abre su modal.
    // El botón "Consultar" (enlace directo a WhatsApp) queda excluido para
    // no competir con la acción de abrir el modal.
    document.addEventListener('click', (event) => {
        if (event.target.closest('.btn-card')) return;

        const tarjeta = event.target.closest('.card');
        if (tarjeta && tarjeta.dataset.id) {
            abrirModal(tarjeta.dataset.id);
        }
    });

    // Cerrar al hacer clic fuera del contenido o en el botón "X"
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay || event.target.classList.contains('modal-cerrar-x')) {
            cerrarModal();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overlay.classList.contains('activo')) {
            cerrarModal();
        }
    });
}
