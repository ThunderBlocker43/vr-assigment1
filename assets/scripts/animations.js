import { gsap } from "gsap";

document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.to(".stars-s", {
        backgroundPosition: "0px -3000px",
        duration: 120,
        ease: "none",
        repeat: -1
    });

    gsap.to(".stars-m", {
        backgroundPosition: "0px -4000px",
        duration: 160,
        ease: "none",
        repeat: -1
    });

    gsap.to(".stars-l", {
        backgroundPosition: "0px -5000px",
        duration: 200,
        ease: "none",
        repeat: -1
    });


    gsap.to(".earth", {
        x: -10,
        y: -20,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // Earth Rotation
    gsap.to(".earth", {
        "--land-x": "100%",
        duration: 120,
        ease: "none",
        repeat: -1
    });

    // Cloud Drift
    gsap.to(".earth", {
        "--cloud-x": "120%",
        duration: 90,
        ease: "none",
        repeat: -1,
    });

    orbitAround(".moon", ".earth", 180, 300, 30);

    gsap.to(".mars", {
        x: 10,
        y: 20,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // Mars Rotation
    gsap.to(".mars", {
        "--land-x": "100%",
        duration: 120,
        ease: "none",
        repeat: -1
    })
});

function orbitAround(orbitingEl, centerEl, startAngle, radius, duration) {
    const orbitingElement = typeof orbitingEl === "string" ? document.querySelector(orbitingEl) : orbitingEl
    const centerElement   = typeof centerEl === "string" ? document.querySelector(centerEl)   : centerEl;
    const container  = document.querySelector(".background");
    if (!orbitingElement || !centerElement || !container) return;

    gsap.set(orbitingElement, {
        position: "absolute",
        left: 0,
        top: 0,
        xPercent: -50,
        yPercent: -50,
        willChange: "transform"
    });

    const state = { angle: startAngle };

    gsap.to(state, {
        angle: startAngle + 360,
        duration,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
            const containerRect = container.getBoundingClientRect();
            const elementRect = centerElement.getBoundingClientRect();

            const cx = (elementRect.left - containerRect.left) + elementRect.width / 2;
            const cy = (elementRect.top  - containerRect.top)  + elementRect.height / 2;

            const tx = Number(gsap.getProperty(centerElement, "x")) || 0;
            const ty = Number(gsap.getProperty(centerElement, "y")) || 0;

            const rad = (state.angle * Math.PI) / 180;
            const x = cx + tx + Math.cos(rad) * radius;
            const y = cy + ty + Math.sin(rad) * radius;

            gsap.set(orbitingElement, {
                x,
                y,
                rotate: state.angle + 90 // optional: tidal lock look
            });
        }
    });
}
