import { gsap, ScrollTrigger } from "../utils/gsapConfig";

export function initServicesAnimation(rootElement) {
  if (!rootElement) return () => {};

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const header = rootElement.querySelector("[data-services-header]");
  const eyebrow = rootElement.querySelector("[data-services-eyebrow]");
  const title = rootElement.querySelector("[data-services-title]");
  const lead = rootElement.querySelector("[data-services-lead]");
  const sticky = rootElement.querySelector("[data-services-sticky]");
  const meter = rootElement.querySelector("[data-services-meter]");
  const orbital = rootElement.querySelector("[data-services-orbital]");
  const items = gsap.utils.toArray(
    rootElement.querySelectorAll("[data-service-item]")
  );

  if (!items.length) return () => {};

  const cleanup = [];

  const setActiveItem = (targetItem) => {
    items.forEach((item) => {
      item.classList.toggle("is-active", item === targetItem);
    });
  };

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(rootElement.querySelectorAll("*"), {
        clearProps: "all",
        autoAlpha: 1,
      });

      items[0]?.classList.add("is-active");
      return;
    }

    gsap.set([eyebrow, title, lead], {
      autoAlpha: 0,
      y: 34,
      filter: "blur(14px)",
      willChange: "transform, opacity, filter",
    });

    gsap.set(sticky, {
      autoAlpha: 0,
      y: 46,
      scale: 0.965,
      filter: "blur(14px)",
      willChange: "transform, opacity, filter",
    });

    items.forEach((item) => {
      const shell = item.querySelector("[data-service-shell]");
      const ambient = item.querySelector("[data-service-ambient]");
      const glow = item.querySelector("[data-service-glow]");
      const number = item.querySelector("[data-service-number]");
      const meta = gsap.utils.toArray(item.querySelectorAll("[data-service-meta]"));
      const line = item.querySelector("[data-service-line]");
      const words = gsap.utils.toArray(item.querySelectorAll("[data-service-word]"));
      const text = item.querySelector("[data-service-text]");
      const result = item.querySelector("[data-service-result]");
      const chips = gsap.utils.toArray(item.querySelectorAll("[data-service-chip]"));
      const signal = item.querySelector("[data-service-signal]");

      gsap.set(item, {
        autoAlpha: 0,
        y: 92,
        scale: 0.965,
        filter: "blur(16px)",
        willChange: "transform, opacity, filter",
      });

      gsap.set(shell, {
        clipPath: "inset(18% 7% 18% 7% round 30px)",
        transformPerspective: 1200,
        rotateX: 7,
        willChange: "transform, clip-path",
      });

      gsap.set(ambient, {
        autoAlpha: 0,
        scale: 0.72,
      });

      gsap.set(glow, {
        autoAlpha: 0,
        scale: 0.72,
      });

      gsap.set(number, {
        autoAlpha: 0,
        y: 24,
        scale: 0.78,
        rotate: -8,
        willChange: "transform, opacity",
      });

      gsap.set(meta, {
        autoAlpha: 0,
        y: 16,
        filter: "blur(7px)",
      });

      gsap.set(line, {
        scaleX: 0,
        transformOrigin: "left center",
        willChange: "transform",
      });

      gsap.set(words, {
        autoAlpha: 0,
        yPercent: 110,
        rotateX: -22,
        filter: "blur(8px)",
        transformPerspective: 900,
        willChange: "transform, opacity, filter",
      });

      gsap.set(text, {
        autoAlpha: 0,
        y: 22,
        filter: "blur(8px)",
      });

      gsap.set(result, {
        autoAlpha: 0,
        y: 26,
        scale: 0.96,
        filter: "blur(9px)",
      });

      gsap.set(chips, {
        autoAlpha: 0,
        y: 16,
        scale: 0.86,
        filter: "blur(6px)",
      });

      gsap.set(signal, {
        autoAlpha: 0,
        y: 18,
        filter: "blur(6px)",
      });
    });

    if (header) {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootElement,
          start: "top 84%",
          end: "top 35%",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      headerTl
        .to(eyebrow, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          title,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
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
            duration: 0.9,
            ease: "power3.out",
          },
          0.18
        );

      cleanup.push(() => headerTl.kill());
    }

    if (sticky) {
      const stickyTl = gsap.timeline({
        scrollTrigger: {
          trigger: sticky,
          start: "top 86%",
          end: "top 42%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      stickyTl.to(sticky, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      });

      cleanup.push(() => stickyTl.kill());
    }

    if (meter) {
      const meterTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootElement,
          start: "top 62%",
          end: "bottom 38%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      meterTl.fromTo(
        meter,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          ease: "none",
        }
      );

      cleanup.push(() => meterTl.kill());
    }

    if (orbital) {
      const orbitalTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      orbitalTl.to(orbital, {
        rotate: 220,
        yPercent: 16,
        ease: "none",
      });

      cleanup.push(() => orbitalTl.kill());
    }

    items.forEach((item, index) => {
      const isRight = index % 2 !== 0;

      const shell = item.querySelector("[data-service-shell]");
      const ambient = item.querySelector("[data-service-ambient]");
      const glow = item.querySelector("[data-service-glow]");
      const number = item.querySelector("[data-service-number]");
      const meta = gsap.utils.toArray(item.querySelectorAll("[data-service-meta]"));
      const line = item.querySelector("[data-service-line]");
      const words = gsap.utils.toArray(item.querySelectorAll("[data-service-word]"));
      const text = item.querySelector("[data-service-text]");
      const result = item.querySelector("[data-service-result]");
      const chips = gsap.utils.toArray(item.querySelectorAll("[data-service-chip]"));
      const signal = item.querySelector("[data-service-signal]");

      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 86%",
          end: "center 48%",
          scrub: 0.82,
          invalidateOnRefresh: true,
          onEnter: () => setActiveItem(item),
          onEnterBack: () => setActiveItem(item),
        },
      });

      enterTl
        .to(
          item,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          0
        )
        .fromTo(
          item,
          {
            x: isRight ? 54 : -54,
            rotateZ: isRight ? -0.9 : 0.9,
          },
          {
            x: 0,
            rotateZ: 0,
            duration: 1,
            ease: "power3.out",
          },
          0
        )
        .to(
          shell,
          {
            clipPath: "inset(0% 0% 0% 0% round 30px)",
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
          },
          0.03
        )
        .to(
          [ambient, glow],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.92,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.06
        )
        .to(
          number,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.72,
            ease: "back.out(1.85)",
          },
          0.08
        )
        .to(
          meta,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.58,
            stagger: 0.045,
            ease: "power2.out",
          },
          0.18
        )
        .to(
          line,
          {
            scaleX: 1,
            duration: 0.92,
            ease: "power3.out",
          },
          0.18
        )
        .to(
          words,
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.78,
            stagger: {
              each: 0.032,
              from: isRight ? "end" : "start",
            },
            ease: "power3.out",
          },
          0.3
        )
        .to(
          text,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.62,
            ease: "power2.out",
          },
          0.48
        )
        .to(
          result,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.64,
            ease: "power2.out",
          },
          0.58
        )
        .to(
          chips,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.48,
            stagger: {
              each: 0.026,
              from: "start",
            },
            ease: "back.out(1.45)",
          },
          0.72
        )
        .to(
          signal,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.52,
            ease: "power2.out",
          },
          0.8
        );

      cleanup.push(() => enterTl.kill());

      const breatheTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 72%",
          end: "bottom 26%",
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => setActiveItem(item),
          onEnterBack: () => setActiveItem(item),
        },
      });

      breatheTl
        .to(
          item,
          {
            yPercent: isRight ? -1.8 : -2.6,
            ease: "none",
          },
          0
        )
        .to(
          ambient,
          {
            xPercent: isRight ? -8 : 8,
            yPercent: -10,
            ease: "none",
          },
          0
        )
        .to(
          glow,
          {
            xPercent: isRight ? -10 : 10,
            yPercent: -8,
            ease: "none",
          },
          0
        );

      cleanup.push(() => breatheTl.kill());

      if (index < items.length - 1) {
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "bottom 60%",
            end: "bottom 30%",
            scrub: 0.72,
            invalidateOnRefresh: true,
          },
        });

        exitTl.to(item, {
          autoAlpha: 0.44,
          scale: 0.985,
          y: -26,
          filter: "blur(2px)",
          duration: 1,
          ease: "none",
        });

        cleanup.push(() => exitTl.kill());
      }
    });

    items[0]?.classList.add("is-active");

    const refreshCall = gsap.delayedCall(0.22, () => {
      ScrollTrigger.refresh();
    });

    cleanup.push(() => refreshCall.kill());
  }, rootElement);

  return () => {
    cleanup.forEach((fn) => fn());
    items.forEach((item) => item.classList.remove("is-active"));
    ctx.revert();
  };
}
