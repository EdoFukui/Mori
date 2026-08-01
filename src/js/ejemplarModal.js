// ============================================
// VISTA DE DETALLE DEL EJEMPLAR — Modal
// ============================================
//
// Muestra el detalle completo de un ejemplar (imagen, especie,
// tamaño, condición y precio o modalidad de trueque) y permite
// volver al catálogo o iniciar contacto por WhatsApp desde ahí.

import { WHATSAPP_URL } from './config.js';

function formatoPrecioCLP(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    }).format(precio);
}

function etiquetaComercial(planta) {
    if (planta.estado === 'reservado') {
        return 'Reservada';
    }
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
            <span class="tag-card${planta.estado === 'reservado' ? ' reservada' : ''}">${etiquetaComercial(planta)}</span>
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

// Selector de elementos focuseables típicos dentro del modal.
const SELECTOR_FOCUSEABLES =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function initEjemplarModal(plantas) {
    const overlay = document.getElementById('modal-ejemplar');
    const contenido = document.getElementById('modal-ejemplar-contenido');
    const modalCaja = overlay ? overlay.querySelector('.modal-caja') : null;
    if (!overlay || !contenido || !modalCaja) return;

    // Elemento que tenía el foco antes de abrir el modal (para devolvérselo al cerrar).
    let elementoAnterior = null;

    function obtenerFocuseables() {
        return Array.from(modalCaja.querySelectorAll(SELECTOR_FOCUSEABLES)).filter(
            (el) => el.offsetParent !== null // descarta elementos ocultos
        );
    }

    function manejarTabDentroDelModal(event) {
        if (event.key !== 'Tab') return;

        const focuseables = obtenerFocuseables();
        if (focuseables.length === 0) {
            event.preventDefault();
            return;
        }

        const primero = focuseables[0];
        const ultimo = focuseables[focuseables.length - 1];

        if (event.shiftKey && document.activeElement === primero) {
            event.preventDefault();
            ultimo.focus();
        } else if (!event.shiftKey && document.activeElement === ultimo) {
            event.preventDefault();
            primero.focus();
        }
    }

    function abrirModal(id) {
        const planta = plantas.find(p => p.id === id);
        if (!planta) return;

        elementoAnterior = document.activeElement;

        contenido.innerHTML = modalContenidoHTML(planta);
        overlay.classList.add('activo');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-abierto');

        const btnCerrar = contenido.querySelector('.btn-cerrar-modal');
        btnCerrar.addEventListener('click', cerrarModal);

        // Mueve el foco al primer elemento focuseable del modal (el botón "X"),
        // en vez de dejarlo en el fondo de la página.
        const focuseables = obtenerFocuseables();
        (focuseables[0] || modalCaja).focus();

        document.addEventListener('keydown', manejarTabDentroDelModal);
    }

    function cerrarModal() {
        overlay.classList.remove('activo');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-abierto');

        document.removeEventListener('keydown', manejarTabDentroDelModal);

        // Devuelve el foco al elemento (tarjeta) que abrió el modal.
        if (elementoAnterior && document.body.contains(elementoAnterior)) {
            elementoAnterior.focus();
        }
        elementoAnterior = null;
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
