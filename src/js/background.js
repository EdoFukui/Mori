// ============================================
// FONDO ANIMADO — Canvas timelapse controlado
// por scroll (GSAP + ScrollTrigger)
// ============================================
//
// Mobile-first: en pantallas de hasta 900px de ancho se usa una
// imagen estática de fondo en vez del timelapse animado, para
// priorizar rendimiento y simplicidad en móvil. El canvas solo
// se activa por encima de ese ancho.
//
// La imagen estática (assets/hero-movil.webp) tiene una composición
// pensada para que el texto del Hero centrado tenga buen contraste
// sobre una franja de sombra oscura en el tercio central. El fondo
// estático se resuelve por CSS (ver base.css, clase .fondo-estatico).

const BREAKPOINT_ESTATICO = 900;

export function initBackground() {
    if (window.innerWidth <= BREAKPOINT_ESTATICO) {
        // En móvil/tablet no se inicializa el canvas: el fondo estático
        // se resuelve por CSS (ver base.css, clase .fondo-estatico).
        document.body.classList.add('fondo-estatico');
        return;
    }

    const canvas = document.getElementById('fondo-timelapse');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const frameCount = 80;
    const frames = [];
    let currentFrame = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (frames[currentFrame]) render(currentFrame);
    }

    function frameSrc(index) {
        return `assets/frames/fondo_${String(index + 1).padStart(6, '0')}.webp`;
    }

    function preloadImages() {
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();

            // El primer frame es crítico para el primer render;
            // el resto se marca como baja prioridad para no competir
            // con CSS/fuentes/JS en conexiones lentas (Etapa de performance).
            if (i === 0) {
                img.fetchPriority = 'high';
                img.onload = () => render(0);
            } else {
                img.fetchPriority = 'low';
            }

            img.src = frameSrc(i);
            frames.push(img);
        }
    }

    function render(index) {
        currentFrame = index;
        const img = frames[index];
        if (!img || !img.complete) return;

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width * scale) / 2;
        const y = (canvas.height / 2) - (img.height * scale) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    function initTimelapse() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to({}, {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const frameIndex = Math.floor(progress * (frameCount - 1));
                    if (frameIndex !== currentFrame) {
                        render(frameIndex);
                    }
                }
            }
        });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    preloadImages();
    initTimelapse();
}
