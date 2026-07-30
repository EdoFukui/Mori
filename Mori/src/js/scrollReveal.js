// ============================================
// SCROLL REVEAL — Anima la aparición de
// elementos marcados con la clase .reveal
// ============================================

export function createScrollObserver(threshold = 0.2) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold });

    return observer;
}

export function observeReveals(observer, root = document) {
    const reveals = root.querySelectorAll('.reveal');
    reveals.forEach(reveal => observer.observe(reveal));
}
