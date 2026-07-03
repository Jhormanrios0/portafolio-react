import { gsap, ScrollTrigger } from "../utils/gsapConfig";

export function initContactAnimation(rootElement) {
  if (!rootElement) return () => {};

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const eyebrow = rootElement.querySelector("[data-contact-eyebrow]");
  const title = rootElement.querySelector("[data-contact-title]");
  const lead = rootElement.querySelector("[data-contact-lead]");
  const kicker = rootElement.querySelector("[data-contact-kicker]");
  const statementWords = gsap.utils.toArray(
    rootElement.querySelectorAll("[data-contact-word]")
  );
  const copyText = rootElement.querySelector("[data-contact-copy]");
  const points = gsap.utils.toArray(
    rootElement.querySelectorAll("[data-contact-point]")
  );
  const consoleWrap = rootElement.querySelector("[data-contact-console]");
  const shell = rootElement.querySelector("[data-contact-shell]");
  const ambient = rootElement.querySelector("[data-contact-ambient]");
  const hudMeta = gsap.utils.toArray(
    rootElement.querySelectorAll("[data-contact-meta]")
  );
  const radar = rootElement.querySelector("[data-contact-radar]");
  const rings = gsap.utils.toArray(rootElement.querySelectorAll("[data-radar-ring]"));
  const grid = gsap.utils.toArray(rootElement.querySelectorAll("[data-radar-grid]"));
  const sweep = rootElement.querySelector("[data-radar-sweep]");
  const beam = rootElement.querySelector("[data-radar-beam]");
  const beamEnd = rootElement.querySelector("[data-radar-beam-end]");
  const core = rootElement.querySelector("[data-radar-core]");
  const pulse = rootElement.querySelector("[data-radar-pulse]");
  const nodes = gsap.utils.toArray(rootElement.querySelectorAll("[data-radar-node]"));
  const center = rootElement.querySelector("[data-radar-center]");
  const hint = rootElement.querySelector("[data-contact-hint]");

  const cleanup = [];

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(rootElement.querySelectorAll("*"), {
        clearProps: "all",
        autoAlpha: 1,
      });
      return;
    }

    gsap.set([eyebrow, title, lead], {
      autoAlpha: 0,
      y: 30,
      filter: "blur(12px)",
    });

    gsap.set([kicker, copyText], {
      autoAlpha: 0,
      y: 20,
      filter: "blur(8px)",
    });

    gsap.set(statementWords, {
      autoAlpha: 0,
      yPercent: 110,
      rotateX: -20,
      filter: "blur(8px)",
      transformPerspective: 900,
    });

    gsap.set(points, {
      autoAlpha: 0,
      y: 16,
      scale: 0.97,
      filter: "blur(6px)",
    });

    gsap.set(consoleWrap, {
      autoAlpha: 0,
      y: 56,
      scale: 0.97,
      filter: "blur(12px)",
    });

    gsap.set(shell, {
      clipPath: "inset(10% 8% 10% 8% round 34px)",
      rotateX: 8,
      transformPerspective: 1200,
    });

    gsap.set(ambient, {
      autoAlpha: 0,
      scale: 0.8,
    });

    gsap.set(hudMeta, {
      autoAlpha: 0,
      y: 12,
      filter: "blur(6px)",
    });

    gsap.set(radar, {
      autoAlpha: 0,
      scale: 0.94,
      filter: "blur(8px)",
    });

    gsap.set(rings, {
      autoAlpha: 0,
      scale: 0.76,
    });

    gsap.set(grid, {
      autoAlpha: 0,
      scaleX: 0.7,
      scaleY: 0.7,
    });

    gsap.set(sweep, {
      autoAlpha: 0,
    });

    gsap.set(beam, {
      autoAlpha: 0,
      scaleX: 0,
      transformOrigin: "left center",
    });

    gsap.set(beamEnd, {
      autoAlpha: 0,
      scale: 0,
    });

    gsap.set(core, {
      autoAlpha: 0,
      scale: 0.8,
    });

    gsap.set(nodes, {
      autoAlpha: 0,
      scale: 0.7,
      y: 10,
    });

    gsap.set(center, {
      autoAlpha: 0,
      xPercent: -50,
      yPercent: -50,
      scale: 0.92,
      y: 16,
      filter: "blur(10px)",
    });

    gsap.set(hint, {
      autoAlpha: 0,
      y: 12,
      filter: "blur(6px)",
    });

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: "top 84%",
        end: "top 36%",
        scrub: 0.75,
        invalidateOnRefresh: true,
      },
    });

    headerTl
      .to(eyebrow, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out",
      })
      .to(
        title,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
        },
        0.08
      )
      .to(
        lead,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
        },
        0.16
      );

    cleanup.push(() => headerTl.kill());

    const copyTl = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: "top 76%",
        end: "center 48%",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    copyTl
      .to(kicker, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      })
      .to(
        statementWords,
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: {
            each: 0.028,
            from: "start",
          },
          ease: "power3.out",
        },
        0.08
      )
      .to(
        copyText,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        },
        0.42
      )
      .to(
        points,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.46,
          stagger: 0.06,
          ease: "back.out(1.35)",
        },
        0.52
      );

    cleanup.push(() => copyTl.kill());

    const consoleTl = gsap.timeline({
      scrollTrigger: {
        trigger: consoleWrap,
        start: "top 82%",
        end: "center 48%",
        scrub: 0.78,
        invalidateOnRefresh: true,
      },
    });

    consoleTl
      .to(consoleWrap, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.95,
        ease: "power3.out",
      })
      .to(
        shell,
        {
          clipPath: "inset(0% 0% 0% 0% round 34px)",
          rotateX: 0,
          duration: 0.95,
          ease: "power3.out",
        },
        0.04
      )
      .to(
        ambient,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.85,
          ease: "power2.out",
        },
        0.08
      )
      .to(
        hudMeta,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
        0.14
      )
      .to(
        radar,
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power3.out",
        },
        0.18
      )
      .to(
        rings,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.62,
          stagger: 0.06,
          ease: "power2.out",
        },
        0.24
      )
      .to(
        grid,
        {
          autoAlpha: 1,
          scaleX: 1,
          scaleY: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
        },
        0.3
      )
      .to(
        sweep,
        {
          autoAlpha: 1,
          duration: 0.62,
          ease: "power2.out",
        },
        0.34
      )
      .to(
        beam,
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.56,
          ease: "power3.out",
        },
        0.4
      )
      .to(
        beamEnd,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.8)",
        },
        0.44
      )
      .to(
        core,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.58,
          ease: "back.out(1.7)",
        },
        0.42
      )
      .to(
        nodes,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.46,
          stagger: {
            each: 0.04,
            from: "random",
          },
          ease: "back.out(1.6)",
        },
        0.46
      )
      .to(
        center,
        {
          autoAlpha: 1,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.62,
          ease: "power3.out",
        },
        0.5
      )
      .to(
        hint,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power2.out",
        },
        0.62
      );

    cleanup.push(() => consoleTl.kill());

    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    parallaxTl
      .to(
        consoleWrap,
        {
          yPercent: -2.2,
          ease: "none",
        },
        0
      )
      .to(
        ambient,
        {
          xPercent: 6,
          yPercent: -10,
          ease: "none",
        },
        0
      );

    cleanup.push(() => parallaxTl.kill());

    const pulseLoop = gsap.fromTo(
      pulse,
      {
        scale: 0.72,
        autoAlpha: 0.58,
      },
      {
        scale: 2.1,
        autoAlpha: 0,
        duration: 2.35,
        repeat: -1,
        ease: "power1.out",
      }
    );

    cleanup.push(() => pulseLoop.kill());

    const coreLoop = gsap.to(core, {
      scale: 1.04,
      duration: 1.9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    cleanup.push(() => coreLoop.kill());

    const beamLoop = gsap.to([beam, beamEnd], {
      autoAlpha: 0.48,
      duration: 1.45,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    cleanup.push(() => beamLoop.kill());

    rings.forEach((ring, index) => {
      const ringLoop = gsap.to(ring, {
        scale: 1.018 + index * 0.01,
        autoAlpha: 0.3 - index * 0.035,
        duration: 2.9 + index * 0.26,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      cleanup.push(() => ringLoop.kill());
    });

    const refreshCall = gsap.delayedCall(0.22, () => {
      ScrollTrigger.refresh();
    });

    cleanup.push(() => refreshCall.kill());
  }, rootElement);

  return () => {
    cleanup.forEach((fn) => fn());
    ctx.revert();
  };
}

