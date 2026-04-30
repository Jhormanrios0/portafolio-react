export function initSkillsAnimation({ gsap, ScrollTrigger }) {
  const section = document.querySelector(".section--skills");

  if (!section || !gsap || !ScrollTrigger) {
    return () => {};
  }

  const cleanups = [];

  const context = gsap.context(() => {
    const sectionCard = section.querySelector(".section-card");
    const orbit = section.querySelector("[data-skills-orbit]");
    const copy = section.querySelector("[data-skills-copy]");
    const title = section.querySelector("[data-skills-title]");
    const lead = section.querySelector("[data-skills-lead]");
    const timeline = section.querySelector("[data-skills-timeline]");
    const progress = section.querySelector("[data-skills-progress]");
    const steps = gsap.utils.toArray(section.querySelectorAll("[data-skills-step]"));
    const cards = gsap.utils.toArray(section.querySelectorAll("[data-skill-card]"));

    if (!orbit || !copy || !timeline || !progress || !cards.length) {
      return;
    }

    const prefersStatic = window.matchMedia(
      "(max-width: 760px), (prefers-reduced-motion: reduce)"
    ).matches;

    const showTimelineChrome = () => {};

    const hideTimelineChrome = () => {};

    const forceCleanSectionCard = () => {
      if (!sectionCard) return;

      gsap.set(sectionCard, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        clearProps: "transform",
      });
    };

    const viewportWidth = () =>
      window.innerWidth || document.documentElement.clientWidth || 1200;

    const viewportHeight = () =>
      window.innerHeight || document.documentElement.clientHeight || 800;

    const scatterX = (index) => {
      const width = viewportWidth();

      const positions = [
        -0.48, 0.38, -0.28, 0.5, -0.12, 0.24, -0.54, 0.14, 0.44, -0.36,
        0.08, -0.18,
      ];

      return positions[index % positions.length] * width;
    };

    const scatterY = (index) => {
      const height = viewportHeight();

      const positions = [
        -0.18, 0.16, 0.38, -0.06, 0.52, 0.24, -0.24, 0.44, 0.08, 0.6,
        -0.12, 0.3,
      ];

      return positions[(index * 5) % positions.length] * height;
    };

    const scatterRotation = (index) => {
      const rotations = [-12, 8, -7, 11, -5, 6, -10, 9, -4, 13, -8, 5];

      return rotations[index % rotations.length];
    };

    forceCleanSectionCard();

    if (prefersStatic) {
      showTimelineChrome();

      gsap.set([orbit, copy, title, lead, timeline], {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        clearProps: "transform",
      });

      gsap.set(progress, {
        scaleX: 1,
        transformOrigin: "left center",
      });

      gsap.set([...steps, ...cards], {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        clearProps: "transform",
      });

      return;
    }

    gsap.set(orbit, {
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(copy, {
      autoAlpha: 0,
      y: 34,
      scale: 0.985,
      force3D: true,
    });

    gsap.set([title, lead], {
      force3D: true,
    });

    gsap.set(timeline, {
      autoAlpha: 0,
      y: 18,
      force3D: true,
    });

    gsap.set(progress, {
      scaleX: 0,
      transformOrigin: "left center",
      force3D: true,
    });

    gsap.set(steps, {
      autoAlpha: 0.42,
      y: 10,
      scale: 0.94,
      force3D: true,
    });

    gsap.set(cards, {
      autoAlpha: 0.18,
      x: (index) => scatterX(index),
      y: (index) => scatterY(index),
      scale: 0.78,
      rotate: (index) => scatterRotation(index),
      transformOrigin: "50% 50%",
      force3D: true,
    });

    const chromeTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 82%",
      end: "bottom 14%",
      invalidateOnRefresh: true,
      onEnter: hideTimelineChrome,
      onEnterBack: hideTimelineChrome,
      onLeave: showTimelineChrome,
      onLeaveBack: showTimelineChrome,
      onRefresh: (self) => {
        if (self.isActive) {
          hideTimelineChrome();
        }
      },
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: section,
        start: "top 76%",
        end: "bottom 16%",
        scrub: 0.68,
        invalidateOnRefresh: true,
        onRefreshInit: forceCleanSectionCard,
        onEnter: hideTimelineChrome,
        onEnterBack: hideTimelineChrome,
        onLeave: showTimelineChrome,
        onLeaveBack: showTimelineChrome,
      },
    });

    tl.to(
      orbit,
      {
        autoAlpha: 1,
        duration: 0.35,
      },
      0
    );

    tl.to(
      copy,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      },
      0.08
    );

    tl.to(
      timeline,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
      },
      0.52
    );

    tl.to(
      progress,
      {
        scaleX: 1,
        duration: 4.7,
        ease: "none",
      },
      0.72
    );

    tl.to(
      steps,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: {
          amount: 0.5,
          from: "start",
        },
        ease: "power3.out",
      },
      0.88
    );

    tl.to(
      cards,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 3.25,
        stagger: {
          amount: 1.65,
          from: "random",
        },
        ease: "power3.out",
      },
      1.05
    );

    tl.to(
      cards,
      {
        y: (index) => (index % 2 === 0 ? -4 : 4),
        duration: 0.58,
        stagger: {
          amount: 0.24,
          from: "center",
        },
        ease: "sine.inOut",
      },
      4.7
    );

    tl.to(
      cards,
      {
        y: 0,
        duration: 0.58,
        stagger: {
          amount: 0.24,
          from: "center",
        },
        ease: "sine.inOut",
      },
      5.28
    );

    tl.to(
      copy,
      {
        autoAlpha: 0.78,
        y: -12,
        duration: 0.65,
        ease: "power2.out",
      },
      5.72
    );

    tl.to(
      cards,
      {
        autoAlpha: 0,
        x: (index) => scatterX(index) * 0.62,
        y: (index) => -viewportHeight() * 0.38 + (index % 6) * 24,
        scale: 0.84,
        rotate: (index) => scatterRotation(index) * 0.65,
        duration: 1.35,
        stagger: {
          amount: 0.7,
          from: "edges",
        },
        ease: "power2.in",
      },
      6.25
    );

    tl.to(
      [timeline, copy],
      {
        autoAlpha: 0,
        y: -26,
        duration: 0.65,
        ease: "power2.in",
      },
      6.85
    );

    tl.to(
      orbit,
      {
        autoAlpha: 0,
        duration: 0.35,
      },
      7.42
    );

    tl.to({}, { duration: 0.35 }, 7.78);

    const refresh = () => {
      forceCleanSectionCard();
      ScrollTrigger.refresh();
    };

    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh, { once: true });

    cleanups.push(() => {
      chromeTrigger.kill();
      window.removeEventListener("load", refresh);
      showTimelineChrome();
    });
  }, section);

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    
    context.revert();
  };
}


