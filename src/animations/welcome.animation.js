export function initWelcomeAnimation({ gsap, ScrollTrigger }) {
  const section = document.querySelector(".section--welcome");
  if (!section) return () => {};

  const profileCard =
    section.querySelector("[data-welcome-profile]") ||
    section.querySelector("[data-welcome-tilt]") ||
    section.querySelector(".profile-card") ||
    section.querySelector(".welcome-code-card") ||
    section.querySelector(".welcome-code") ||
    section.querySelector(".profile-window") ||
    section.querySelector(".code-window");

  if (!profileCard) return () => {};

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (prefersReducedMotion || !isFinePointer) {
    return () => {};
  }

  const cleanup = [];
  const clamp = gsap.utils.clamp;

  let isSectionActive = false;
  let rafId = 0;

  const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  gsap.set(profileCard, {
    transformPerspective: 1200,
    transformOrigin: "50% 50%",
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
    force3D: true,
    willChange: "transform",
  });

  const rotationXTo = gsap.quickTo(profileCard, "rotationX", {
    duration: 0.62,
    ease: "power3.out",
  });

  const rotationYTo = gsap.quickTo(profileCard, "rotationY", {
    duration: 0.62,
    ease: "power3.out",
  });

  const zTo = gsap.quickTo(profileCard, "z", {
    duration: 0.62,
    ease: "power3.out",
  });

  const resetTilt = () => {
    rotationXTo(0);
    rotationYTo(0);
    zTo(0);
  };

  const updateTilt = () => {
    rafId = 0;

    if (!isSectionActive) {
      resetTilt();
      return;
    }

    const rect = profileCard.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (pointer.x - centerX) / (rect.width / 2);
    const distanceY = (pointer.y - centerY) / (rect.height / 2);

    const px = clamp(-1.18, 1.18, distanceX);
    const py = clamp(-1.18, 1.18, distanceY);

    rotationYTo(px * 13);
    rotationXTo(py * -10);
    zTo(26);
  };

  const requestTiltUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(updateTilt);
  };

  const handlePointerMove = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    requestTiltUpdate();
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("scroll", requestTiltUpdate, { passive: true });
  window.addEventListener("resize", requestTiltUpdate, { passive: true });

  cleanup.push(() => {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("scroll", requestTiltUpdate);
    window.removeEventListener("resize", requestTiltUpdate);
  });

  const tiltTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    invalidateOnRefresh: true,

    onEnter: () => {
      isSectionActive = true;
      requestTiltUpdate();
    },

    onEnterBack: () => {
      isSectionActive = true;
      requestTiltUpdate();
    },

    onLeave: () => {
      isSectionActive = false;
      resetTilt();
    },

    onLeaveBack: () => {
      isSectionActive = false;
      resetTilt();
    },

    onUpdate: () => {
      requestTiltUpdate();
    },

    onRefresh: () => {
      requestTiltUpdate();
    },
  });

  cleanup.push(() => {
    tiltTrigger.kill();
  });

  requestTiltUpdate();

  return () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    gsap.killTweensOf(profileCard);
    resetTilt();

    cleanup.forEach((fn) => fn());
  };
}


