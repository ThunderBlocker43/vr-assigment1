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


    gsap.to(".planet", {
        x: -10,
        y: -20,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // Earth Rotation
    gsap.to(".planet", {
        "--land-x": "100%",
        duration: 120,
        ease: "none",
        repeat: -1
    });

    // Cloud Drift
    gsap.to(".planet", {
        "--cloud-x": "120%",
        duration: 90,
        ease: "none",
        repeat: -1,
    });
});