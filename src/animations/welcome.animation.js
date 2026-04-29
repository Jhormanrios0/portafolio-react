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
    rotateY: -12,
    rotateZ: 2,
    y: 34,
    scale: 0.92,
    transformPerspective: 1200,
    transformOrigin: "50% 50%",
  });

  gsap.set(codeCardInner, {
    rotationX: 0,
    rotationY: 0,
    x: 0,
    y: 0,
    scale: 1,
    transformPerspective: 1400,
    transformOrigin: "50% 50%",
    transformStyle: "preserve-3d",
  });

  gsap.set([codeCardTop, codeCardPre], {
    z: 24,
    transformPerspective: 1400,
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
      xPercent: -14,
      yPercent: -14,
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
    const rotateXTo = gsap.quickTo(codeCardInner, "rotationX", {
      duration: 0.45,
      ease: "power3.out",
    });

    const rotateYTo = gsap.quickTo(codeCardInner, "rotationY", {
      duration: 0.45,
      ease: "power3.out",
    });

    const xTo = gsap.quickTo(codeCardInner, "x", {
      duration: 0.45,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(codeCardInner, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const scaleTo = gsap.quickTo(codeCardInner, "scale", {
      duration: 0.45,
      ease: "power3.out",
    });

    const shineOpacityTo = shine
      ? gsap.quickTo(shine, "opacity", {
          duration: 0.28,
          ease: "power2.out",
        })
      : null;

    const shineXTo = shine
      ? gsap.quickTo(shine, "xPercent", {
          duration: 0.55,
          ease: "power3.out",
        })
      : null;

    const shineYTo = shine
      ? gsap.quickTo(shine, "yPercent", {
          duration: 0.55,
          ease: "power3.out",
        })
      : null;

    const handleEnter = () => {
      scaleTo(1.03);

      gsap.to(codeCard, {
        boxShadow:
          "0 34px 90px rgba(0, 0, 0, 0.42), 0 0 42px rgba(var(--color-primary-rgb), 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        duration: 0.35,
        overwrite: "auto",
        ease: "power3.out",
      });

      if (shineOpacityTo) {
        shineOpacityTo(0.78);
      }
    };

    const handleMove = (event) => {
      const rect = codeCard.getBoundingClientRect();

      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      const rotateY = gsap.utils.mapRange(0, 1, -12, 12, px);
      const rotateX = gsap.utils.mapRange(0, 1, 10, -10, py);

      const moveX = gsap.utils.mapRange(0, 1, -8, 8, px);
      const moveY = gsap.utils.mapRange(0, 1, -8, 8, py);

      rotateXTo(rotateX);
      rotateYTo(rotateY);
      xTo(moveX);
      yTo(moveY);

      if (shineXTo && shineYTo) {
        shineXTo(gsap.utils.mapRange(0, 1, -24, 24, px));
        shineYTo(gsap.utils.mapRange(0, 1, -22, 22, py));
      }
    };

    const handleLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      xTo(0);
      yTo(0);
      scaleTo(1);

      gsap.to(codeCard, {
        boxShadow:
          "0 26px 80px rgba(0, 0, 0, 0.42), 0 0 34px rgba(var(--color-primary-rgb), 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        duration: 0.4,
        overwrite: "auto",
        ease: "power3.out",
      });

      if (shineOpacityTo && shineXTo && shineYTo) {
        shineOpacityTo(0);
        shineXTo(-14);
        shineYTo(-14);
      }
    };

    codeCard.addEventListener("mouseenter", handleEnter);
    codeCard.addEventListener("mousemove", handleMove);
    codeCard.addEventListener("mouseleave", handleLeave);

    cleanupFns.push(() => {
      codeCard.removeEventListener("mouseenter", handleEnter);
      codeCard.removeEventListener("mousemove", handleMove);
      codeCard.removeEventListener("mouseleave", handleLeave);
    });
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top 40%",
    end: "bottom 45%",
    scrub: 0.8,
    onUpdate: (self) => {
      const progress = self.progress;

      gsap.to(codeCard, {
        rotateY: gsap.utils.mapRange(0, 1, -5, 6, progress),
        rotateX: gsap.utils.mapRange(0, 1, 2, -4, progress),
        y: gsap.utils.mapRange(0, 1, 0, -18, progress),
        duration: 0.35,
        overwrite: "auto",
        ease: "power2.out",
      });

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


