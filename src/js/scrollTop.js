// ============================================
// SCROLL TOP — Botón flotante para volver
// al inicio de la página
// ============================================

export function initScrollTop() {
    const btnArriba = document.getElementById('btn-arriba');
    if (!btnArriba) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnArriba.classList.add('visible');
        } else {
            btnArriba.classList.remove('visible');
        }
    });

    btnArriba.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
