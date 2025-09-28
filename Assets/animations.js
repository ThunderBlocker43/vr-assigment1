import { gsap } from "gsap";

document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.to(".stars", {
        backgroundPosition: "0px -3000px",
        duration: 120,
        ease: "none",
        repeat: -1
    });
});