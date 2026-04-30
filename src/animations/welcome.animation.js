export function initWelcomeAnimation({ gsap, ScrollTrigger }) {
  const section = document.querySelector(".section--welcome");
  if (!section) return () => {};

  const card = section.querySelector(".section-card");
  const content = section.querySelector(".welcome-hero__content");
  const kicker = section.querySelector(".welcome-kicker");
  const titleLines = section.querySelectorAll(".welcome-title-line");
  const lead = section.querySelector(".welcome-lead");
  const actions = section.querySelectorAll(".welcome-action");
  const stats = section.querySelectorAll(".welcome-stats-item");
  const visual = section.querySelector(".welcome-hero__visual");

  const codeCard = section.querySelector(".welcome-code-card");
  const codeCardInner = section.querySelector(".welcome-code-card__inner");
  const codeCardTop = section.querySelector(".welcome-code-card__top");
  const codeCardPre = section.querySelector(".welcome-code-card pre");
  const shine = section.querySelector(".welcome-code-card__shine");

  const orbs = section.querySelectorAll(".welcome-orb");
  const glow = section.querySelector(".welcome-grid-glow");

  const cleanupFns = [];

  gsap.set(card, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  });

  gsap.set([content, visual], {
    autoAlpha: 1,
  });

  gsap.set(kicker, {
    autoAlpha: 0,
    y: 28,
  });

  gsap.set(titleLines, {
    autoAlpha: 0,
    yPercent: 115,
    rotateX: -55,
    transformOrigin: "0% 100%",
  });

  gsap.set(lead, {
    autoAlpha: 0,
    y: 26,
  });

  gsap.set(actions, {
    autoAlpha: 0,
    y: 28,
    scale: 0.94,
  });

  gsap.set(stats, {
    autoAlpha: 0,
    y: 36,
    scale: 0.92,
  });

  gsap.set(visual, {
    autoAlpha: 0,
    x: 60,
    y: 25,
  });

  gsap.set(codeCard, {
    rotateX: 10,
    rotateY: -14,
    rotateZ: 2,
    y: 34,
    x: 0,
    scale: 0.92,
    transformPerspective: 1500,
    transformOrigin: "50% 50%",
    transformStyle: "preserve-3d",
    willChange: "transform",
  });

  gsap.set(codeCardInner, {
    rotationX: 0,
    rotationY: 0,
    x: 0,
    y: 0,
    scale: 1,
    transformPerspective: 1500,
    transformOrigin: "50% 50%",
    transformStyle: "preserve-3d",
    willChange: "transform",
  });

  gsap.set([codeCardTop, codeCardPre], {
    z: 34,
    transformPerspective: 1500,
  });

  gsap.set(orbs, {
    autoAlpha: 0,
    scale: 0.42,
  });

  if (glow) {
    gsap.set(glow, {
      autoAlpha: 0,
      scale: 0.82,
    });
  }

  if (shine) {
    gsap.set(shine, {
      opacity: 0,
      xPercent: -18,
      yPercent: -18,
    });
  }

  const intro = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 78%",
      end: "center 48%",
      scrub: 0.9,
      invalidateOnRefresh: true,
    },
  });

  intro.to(
    orbs,
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
    },
    0
  );

  if (glow) {
    intro.to(
      glow,
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      0.05
    );
  }

  intro
    .to(
      kicker,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.34,
        ease: "power3.out",
      },
      0.08
    )
    .to(
      titleLines,
      {
        autoAlpha: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 0.58,
        stagger: 0.11,
        ease: "power4.out",
      },
      0.16
    )
    .to(
      lead,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.36,
        ease: "power3.out",
      },
      0.46
    )
    .to(
      actions,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.34,
        stagger: 0.1,
        ease: "back.out(2.2)",
      },
      0.58
    )
    .to(
      visual,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 0.44,
        ease: "power3.out",
      },
      0.34
    )
    .to(
      codeCard,
      {
        rotateX: 0,
        rotateY: 0,
        rotateZ: -1,
        y: 0,
        scale: 1,
        duration: 0.72,
        ease: "power3.out",
      },
      0.38
    )
    .to(
      stats,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.34,
        stagger: 0.1,
        ease: "power3.out",
      },
      0.72
    );

  gsap.to(".section--welcome .welcome-orb--main", {
    x: 26,
    y: -18,
    scale: 1.08,
    duration: 4.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".section--welcome .welcome-orb--soft", {
    x: -20,
    y: 18,
    scale: 1.12,
    duration: 5.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  if (codeCard && codeCardInner) {
    let isPointerInside = false;
    let isWelcomeVisible = false;
    let lastPointer = {
      x: window.innerWidth * 0.72,
      y: window.innerHeight * 0.48,
    };

    const rotateXTo = gsap.quickTo(codeCard, "rotationX", {
      duration: 0.55,
      ease: "power3.out",
    });

    const rotateYTo = gsap.quickTo(codeCard, "rotationY", {
      duration: 0.55,
      ease: "power3.out",
    });

    const rotateZTo = gsap.quickTo(codeCard, "rotationZ", {
      duration: 0.55,
      ease: "power3.out",
    });

    const xTo = gsap.quickTo(codeCard, "x", {
      duration: 0.55,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(codeCard, "y", {
      duration: 0.55,
      ease: "power3.out",
    });

    const scaleTo = gsap.quickTo(codeCard, "scale", {
      duration: 0.48,
      ease: "power3.out",
    });

    const innerXTo = gsap.quickTo(codeCardInner, "x", {
      duration: 0.6,
      ease: "power3.out",
    });

    const innerYTo = gsap.quickTo(codeCardInner, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const shineOpacityTo = shine
      ? gsap.quickTo(shine, "opacity", {
          duration: 0.35,
          ease: "power2.out",
        })
      : null;

    const shineXTo = shine
      ? gsap.quickTo(shine, "xPercent", {
          duration: 0.65,
          ease: "power3.out",
        })
      : null;

    const shineYTo = shine
      ? gsap.quickTo(shine, "yPercent", {
          duration: 0.65,
          ease: "power3.out",
        })
      : null;

    const updateCodeCardTilt = () => {
      if (!isWelcomeVisible) return;

      const rect = codeCard.getBoundingClientRect();

      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distanceX = lastPointer.x - cardCenterX;
      const distanceY = lastPointer.y - cardCenterY;

      const normalizedX = gsap.utils.clamp(
        -1,
        1,
        distanceX / (window.innerWidth * 0.34)
      );

      const normalizedY = gsap.utils.clamp(
        -1,
        1,
        distanceY / (window.innerHeight * 0.34)
      );

      const intensity = isPointerInside ? 1.22 : 0.82;

      const rotationY = normalizedX * 22 * intensity;
      const rotationX = normalizedY * -16 * intensity;
      const rotationZ = normalizedX * 2.2;

      const moveX = normalizedX * 16 * intensity;
      const moveY = normalizedY * 12 * intensity;

      rotateXTo(rotationX);
      rotateYTo(rotationY);
      rotateZTo(rotationZ);
      xTo(moveX);
      yTo(moveY);
      scaleTo(isPointerInside ? 1.055 : 1.018);

      innerXTo(normalizedX * -8);
      innerYTo(normalizedY * -6);

      if (shineOpacityTo) {
        shineOpacityTo(isPointerInside ? 0.78 : 0.26);
      }

      if (shineXTo && shineYTo) {
        shineXTo(gsap.utils.mapRange(-1, 1, -34, 34, normalizedX));
        shineYTo(gsap.utils.mapRange(-1, 1, -28, 28, normalizedY));
      }
    };

    const resetCodeCardTilt = () => {
      rotateXTo(0);
      rotateYTo(0);
      rotateZTo(-1);
      xTo(0);
      yTo(0);
      scaleTo(1);
      innerXTo(0);
      innerYTo(0);

      if (shineOpacityTo && shineXTo && shineYTo) {
        shineOpacityTo(0);
        shineXTo(-18);
        shineYTo(-18);
      }
    };

    const handleWindowPointerMove = (event) => {
      lastPointer.x = event.clientX;
      lastPointer.y = event.clientY;
      updateCodeCardTilt();
    };

    const handlePointerEnter = () => {
      isPointerInside = true;

      gsap.to(codeCard, {
        boxShadow:
          "0 42px 110px rgba(0, 0, 0, 0.5), 0 0 58px rgba(var(--color-primary-rgb), 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        duration: 0.35,
        overwrite: "auto",
        ease: "power3.out",
      });

      updateCodeCardTilt();
    };

    const handlePointerLeave = () => {
      isPointerInside = false;

      gsap.to(codeCard, {
        boxShadow:
          "0 30px 90px rgba(0, 0, 0, 0.44), 0 0 42px rgba(var(--color-primary-rgb), 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        duration: 0.4,
        overwrite: "auto",
        ease: "power3.out",
      });

      updateCodeCardTilt();
    };

    const visibilityTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        isWelcomeVisible = true;
        updateCodeCardTilt();
      },
      onEnterBack: () => {
        isWelcomeVisible = true;
        updateCodeCardTilt();
      },
      onLeave: () => {
        isWelcomeVisible = false;
        resetCodeCardTilt();
      },
      onLeaveBack: () => {
        isWelcomeVisible = false;
        resetCodeCardTilt();
      },
      onUpdate: () => {
        updateCodeCardTilt();
      },
    });

    window.addEventListener("pointermove", handleWindowPointerMove);
    codeCard.addEventListener("pointerenter", handlePointerEnter);
    codeCard.addEventListener("pointerleave", handlePointerLeave);

    cleanupFns.push(() => {
      visibilityTrigger.kill();
      window.removeEventListener("pointermove", handleWindowPointerMove);
      codeCard.removeEventListener("pointerenter", handlePointerEnter);
      codeCard.removeEventListener("pointerleave", handlePointerLeave);
    });
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top 40%",
    end: "bottom 45%",
    scrub: 0.8,
    onUpdate: (self) => {
      const progress = self.progress;

      if (visual) {
        gsap.to(visual, {
          y: gsap.utils.mapRange(0, 1, 0, -18, progress),
          duration: 0.35,
          overwrite: "auto",
          ease: "power2.out",
        });
      }

      if (glow) {
        gsap.to(glow, {
          x: gsap.utils.mapRange(0, 1, -10, 18, progress),
          y: gsap.utils.mapRange(0, 1, 0, -12, progress),
          duration: 0.35,
          overwrite: "auto",
          ease: "power2.out",
        });
      }
    },
  });

  return () => {
    cleanupFns.forEach((fn) => fn());
  };
}
