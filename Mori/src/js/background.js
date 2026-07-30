// ============================================
// FONDO ANIMADO — Canvas timelapse controlado
// por scroll (GSAP + ScrollTrigger)
// ============================================

export function initBackground() {
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
            img.src = frameSrc(i);
            frames.push(img);

            if (i === 0) {
                img.onload = () => render(0);
            }
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
