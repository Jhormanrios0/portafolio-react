export function initExperienceAnimation({ gsap, ScrollTrigger }) {
  const section = document.querySelector(".section--experience");
  if (!section) return () => {};

  const root = section.querySelector("[data-experience-section]");
  if (!root) return () => {};

  const lead = root.querySelector("[data-experience-lead]");
  const items = gsap.utils.toArray(
    root.querySelectorAll("[data-experience-item]")
  );

  if (!items.length) return () => {};

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const cleanup = [];

  const setActiveItem = (targetItem) => {
    items.forEach((item) => {
      item.classList.toggle("is-active", item === targetItem);
    });
  };

  const ctx = gsap.context(() => {
    const allCards = items
      .map((item) => item.querySelector("[data-experience-card]"))
      .filter(Boolean);

    const allDates = items
      .map((item) => item.querySelector("[data-experience-date]"))
      .filter(Boolean);

    const allDateInners = items
      .map((item) => item.querySelector(".career-sticky-item__date-inner"))
      .filter(Boolean);

    const allText = gsap.utils.toArray(
      root.querySelectorAll("[data-experience-text]")
    );

    const allChips = gsap.utils.toArray(
      root.querySelectorAll("[data-experience-chip]")
    );

    if (prefersReducedMotion) {
      gsap.set([lead, allCards, allDates, allDateInners, allText, allChips], {
        clearProps: "all",
        autoAlpha: 1,
      });

      items[0]?.classList.add("is-active");
      return;
    }

    gsap.set(lead, {
      autoAlpha: 0,
      y: 34,
      filter: "blur(12px)",
    });

    gsap.set(allDates, {
      autoAlpha: 0,
      filter: "blur(12px)",
      willChange: "transform, opacity, filter",
    });

    gsap.set(allDateInners, {
      y: -36,
      scale: 0.96,
      willChange: "transform",
    });

    gsap.set(allCards, {
      autoAlpha: 0,
      y: 86,
      scale: 0.935,
      rotateX: 7,
      transformPerspective: 1300,
      transformOrigin: "50% 50%",
      force3D: true,
      filter: "blur(16px)",
      willChange: "transform, opacity, filter",
    });

    gsap.set(allText, {
      autoAlpha: 0,
      y: 22,
      filter: "blur(8px)",
    });

    gsap.set(allChips, {
      autoAlpha: 0,
      y: 18,
      scale: 0.86,
      filter: "blur(6px)",
    });

    if (lead) {
      const leadTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 38%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      leadTl.to(lead, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      });

      cleanup.push(() => leadTl.kill());
    }

    items.forEach((item, index) => {
      const side = item.dataset.experienceSide;
      const isRightDate = side === "right-date";

      const card = item.querySelector("[data-experience-card]");
      const date = item.querySelector("[data-experience-date]");
      const dateInner = item.querySelector(".career-sticky-item__date-inner");

      const itemText = gsap.utils.toArray(
        item.querySelectorAll("[data-experience-text]")
      );

      const itemChips = gsap.utils.toArray(
        item.querySelectorAll("[data-experience-chip]")
      );

      if (!card || !date || !dateInner) return;

      const dateFromX = isRightDate ? 54 : -54;
      const cardFromX = isRightDate ? -78 : 78;
      const rotateZ = isRightDate ? -1.4 : 1.4;

      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          end: "center 48%",
          scrub: 0.9,
          invalidateOnRefresh: true,
          onEnter: () => setActiveItem(item),
          onEnterBack: () => setActiveItem(item),
        },
      });

      enterTl
        .fromTo(
          date,
          {
            x: dateFromX,
            autoAlpha: 0,
            filter: "blur(12px)",
          },
          {
            x: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
          },
          0
        )
        .fromTo(
          card,
          {
            x: cardFromX,
            y: 92,
            scale: 0.925,
            rotateX: 8,
            rotateZ,
            autoAlpha: 0,
            filter: "blur(16px)",
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateZ: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.08,
            ease: "power3.out",
          },
          0.06
        )
        .to(
          itemText,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.62,
            stagger: {
              each: 0.045,
              from: "start",
            },
            ease: "power2.out",
          },
          0.48
        )
        .to(
          itemChips,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.52,
            stagger: {
              each: 0.035,
              from: "start",
            },
            ease: "back.out(1.55)",
          },
          0.72
        );

      cleanup.push(() => enterTl.kill());

      const floatTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 66%",
          end: "bottom 42%",
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => setActiveItem(item),
          onEnterBack: () => setActiveItem(item),
        },
      });

      floatTl
        .fromTo(
          dateInner,
          {
            y: -36,
            scale: 0.96,
          },
          {
            y: () => {
              const itemHeight = item.offsetHeight;
              const dateHeight = dateInner.offsetHeight;
              const maxMove = Math.max(80, itemHeight - dateHeight - 150);

              return Math.min(maxMove, 260);
            },
            scale: 1,
            ease: "none",
          },
          0
        )
        .fromTo(
          card,
          {
            yPercent: 0,
          },
          {
            yPercent: -3,
            ease: "none",
          },
          0
        );

      cleanup.push(() => floatTl.kill());

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "bottom 62%",
          end: "bottom 26%",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      if (index < items.length - 1) {
        exitTl
          .to(
            card,
            {
              autoAlpha: 0.18,
              x: isRightDate ? 34 : -34,
              y: -54,
              scale: 0.94,
              rotateZ: isRightDate ? 1 : -1,
              filter: "blur(8px)",
              duration: 1,
              ease: "none",
            },
            0
          )
          .to(
            date,
            {
              autoAlpha: 0.14,
              x: isRightDate ? -22 : 22,
              y: -34,
              scale: 0.95,
              filter: "blur(8px)",
              duration: 1,
              ease: "none",
            },
            0
          );
      }

      cleanup.push(() => exitTl.kill());
    });

    const refreshCall = gsap.delayedCall(0.25, () => {
      ScrollTrigger.refresh();
    });

    cleanup.push(() => refreshCall.kill());

    items[0]?.classList.add("is-active");
  }, section);

  return () => {
    cleanup.forEach((fn) => fn());
    items.forEach((item) => item.classList.remove("is-active"));
    ctx.revert();
  };
}
