// ============================================
// ENLACES DE WHATSAPP — Sincroniza los enlaces
// estáticos del HTML con la fuente única de verdad
// ============================================
//
// Los enlaces de WhatsApp en el HTML estático (sección de contacto,
// footer) llevan el número real como href por defecto, para que
// funcionen aunque JS no llegue a ejecutarse. Este módulo los
// sobreescribe con el valor de config.js al cargar la página, de
// forma que actualizar el número en un solo lugar (config.js) sea
// suficiente para todo el sitio, sin tener que tocar el HTML.

import { WHATSAPP_URL } from './config.js';

export function initWhatsAppLinks() {
    document.querySelectorAll('[data-whatsapp-link]').forEach(enlace => {
        enlace.href = WHATSAPP_URL;
    });
}
