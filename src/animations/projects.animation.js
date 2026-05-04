export function initProjectsAnimation({ gsap, ScrollTrigger }) {
  const section = document.querySelector(".section--projects");
  if (!section) return () => {};

  const sectionCard = section.querySelector(".section-card");
  const scene = section.querySelector("[data-projects-scene]");
  const stage = section.querySelector("[data-projects-stage]");
  const intro = section.querySelector("[data-projects-intro]");
  const cards = gsap.utils.toArray(section.querySelectorAll("[data-project-card]"));

  if (!scene || !stage || !cards.length) return () => {};

  ScrollTrigger.getAll().forEach((trigger) => {
    const id = String(trigger.vars?.id || "").toLowerCase();

    if (id.includes("project")) {
      trigger.kill();
    }
  });

  if (sectionCard) {
    gsap.set(sectionCard, {
      clearProps: "transform,opacity,visibility,filter",
    });
  }

  let lowPower = false;

  const setLowPower = (active) => {
    if (lowPower === active) return;

    lowPower = active;
    document.documentElement.classList.toggle("projects-low-power", active);
    section.classList.toggle("is-projects-low-power", active);
  };

  const getLayout = () => {
    const width = window.innerWidth;

    if (width <= 760) {
      return {
        deck: [
          { x: -82, y: -18, r: -14, s: 0.92, z: 1 },
          { x: -74, y: -10, r: -11, s: 0.94, z: 2 },
          { x: -66, y: -2, r: -8, s: 0.96, z: 3 },
          { x: -58, y: 6, r: -5, s: 0.98, z: 4 },
          { x: -50, y: 14, r: -2, s: 0.99, z: 5 },
          { x: -42, y: 22, r: 1, s: 1, z: 6 },
        ],
        final: [
          { x: -92, y: -180, r: -6, s: 0.92, z: 1 },
          { x: 0, y: -180, r: -2, s: 0.94, z: 2 },
          { x: 92, y: -180, r: 3, s: 0.92, z: 3 },
          { x: -92, y: 20, r: -4, s: 0.92, z: 4 },
          { x: 0, y: 20, r: 0, s: 0.94, z: 5 },
          { x: 92, y: 20, r: 4, s: 0.92, z: 6 },
        ],
      };
    }

    if (width <= 1050) {
      return {
        deck: [
          { x: -280, y: 0, r: -14, s: 0.9, z: 1 },
          { x: -266, y: 12, r: -11, s: 0.92, z: 2 },
          { x: -252, y: 24, r: -8, s: 0.94, z: 3 },
          { x: -238, y: 36, r: -5, s: 0.96, z: 4 },
          { x: -224, y: 48, r: -2, s: 0.98, z: 5 },
          { x: -210, y: 60, r: 1, s: 1, z: 6 },
        ],
        final: [
          { x: -190, y: -150, r: -7, s: 0.9, z: 1 },
          { x: 0, y: -150, r: -2, s: 0.94, z: 2 },
          { x: 190, y: -150, r: 4, s: 0.9, z: 3 },
          { x: -190, y: 70, r: -5, s: 0.9, z: 4 },
          { x: 0, y: 70, r: 0, s: 0.94, z: 5 },
          { x: 190, y: 70, r: 5, s: 0.9, z: 6 },
        ],
      };
    }

    return {
      deck: [
        { x: -430, y: 10, r: -15, s: 0.88, z: 1 },
        { x: -412, y: 24, r: -12, s: 0.9, z: 2 },
        { x: -394, y: 38, r: -9, s: 0.92, z: 3 },
        { x: -376, y: 52, r: -6, s: 0.94, z: 4 },
        { x: -358, y: 66, r: -3, s: 0.97, z: 5 },
        { x: -340, y: 80, r: 0, s: 1, z: 6 },
      ],
      final: [
        { x: -280, y: -165, r: -7, s: 0.88, z: 1 },
        { x: 0, y: -165, r: -2, s: 0.94, z: 2 },
        { x: 280, y: -165, r: 5, s: 0.88, z: 3 },
        { x: -280, y: 95, r: -5, s: 0.88, z: 4 },
        { x: 0, y: 95, r: 0, s: 0.94, z: 5 },
        { x: 280, y: 95, r: 5, s: 0.88, z: 6 },
      ],
    };
  };

  const applyBase = () => {
    const { deck, final } = getLayout();

    gsap.set(stage, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      autoAlpha: 1,
      pointerEvents: "auto",
      force3D: true,
      willChange: "transform, opacity",
    });

    gsap.set(intro, {
      y: 0,
      autoAlpha: 1,
      pointerEvents: "auto",
      force3D: true,
      willChange: "transform, opacity",
    });

    cards.forEach((card, index) => {
      const deckItem = deck[index] || deck[deck.length - 1];
      const finalItem = final[index] || final[final.length - 1];

      card.dataset.finalX = finalItem.x;
      card.dataset.finalY = finalItem.y;
      card.dataset.finalR = finalItem.r;
      card.dataset.finalS = finalItem.s;
      card.dataset.finalZ = finalItem.z;

      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        x: deckItem.x,
        y: deckItem.y,
        rotation: deckItem.r,
        scale: deckItem.s,
        zIndex: deckItem.z,
        autoAlpha: 1,
        pointerEvents: "auto",
        filter: "none",
        transformOrigin: "50% 50%",
        force3D: true,
        willChange: "transform",
      });
    });
  };

  applyBase();

  const tl = gsap.timeline({
    defaults: {
      ease: "none",
      overwrite: "auto",
    },
    scrollTrigger: {
      id: "projectsExitLastScrollV16",
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onRefreshInit: applyBase,
      onEnter: () => setLowPower(true),
      onEnterBack: () => setLowPower(true),
      onLeave: () => setLowPower(false),
      onLeaveBack: () => setLowPower(false),
      onUpdate: (self) => {
        setLowPower(self.progress > 0.02 && self.progress < 0.995);
      },
    },
  });

  tl.to({}, { duration: 0.25 });

  tl.to(
    cards,
    {
      x: (index, target) => Number(target.dataset.finalX || 0),
      y: (index, target) => Number(target.dataset.finalY || 0),
      rotation: (index, target) => Number(target.dataset.finalR || 0),
      scale: (index, target) => Number(target.dataset.finalS || 1),
      zIndex: (index, target) => Number(target.dataset.finalZ || index + 1),
      duration: 2.05,
      stagger: {
        each: 0.14,
        from: "start",
      },
      ease: "power3.out",
    },
    0.25
  );

  tl.to(
    cards,
    {
      y: (index, target) => Number(target.dataset.finalY || 0) - (index < 3 ? 5 : 7),
      duration: 0.2,
      stagger: 0.015,
      ease: "sine.inOut",
    },
    2.45
  );

  tl.to(
    cards,
    {
      y: (index, target) => Number(target.dataset.finalY || 0),
      duration: 0.2,
      stagger: 0.015,
      ease: "sine.inOut",
    },
    2.7
  );
  // Mantener Proyectos visible hasta el final real de la sección.
  // No hacemos fade a 0 aquí porque generaba un espacio vacío antes de terminar.
  tl.to({}, { duration: 4.8 }, 3.05);

  tl.set(
    [stage, intro],
    {
      autoAlpha: 1,
      pointerEvents: "auto",
    },
    7.85
  );


  const handleResize = () => {
    applyBase();
    ScrollTrigger.refresh();
  };

  window.addEventListener("resize", handleResize);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    setLowPower(false);
    window.removeEventListener("resize", handleResize);
    tl.kill();
  };
}


