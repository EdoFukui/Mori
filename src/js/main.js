// ============================================
// MAIN — Punto de entrada. Orquesta la
// inicialización de todos los módulos del sitio.
// ============================================

import { initBackground } from './background.js';
import { createScrollObserver, observeReveals } from './scrollReveal.js';
import { initCatalog } from './catalog.js';
import { initEjemplarModal } from './ejemplarModal.js';
import { initScrollTop } from './scrollTop.js';
import { initWhatsAppLinks } from './whatsappLinks.js';

document.addEventListener('DOMContentLoaded', async () => {
    initBackground();
    initWhatsAppLinks();

    const revealObserver = createScrollObserver(0.2);
    observeReveals(revealObserver);

    const plantas = await initCatalog(revealObserver);
    initEjemplarModal(plantas);

    initScrollTop();
});
