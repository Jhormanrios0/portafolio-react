import { useRef, useState } from "react";
import Lenis from "lenis";

import { gsap, ScrollTrigger, useGSAP } from "../utils/gsapConfig";
import { sections } from "../data/sections";
import { initWelcomeAnimation } from "../animations/welcome.animation";
import { initSkillsAnimation } from "../animations/skills.animation";
import { initProjectsAnimation } from "../animations/projects.animation";

import Sidebar from "./Sidebar";
import SectionBlock from "./SectionBlock";

import WelcomeSection from "./sections/WelcomeSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ServicesSection from "./sections/ServicesSection";
import ContactSection from "./sections/ContactSection";

const sectionComponents = {
  welcome: <WelcomeSection />,
  skills: <SkillsSection />,
  projects: <ProjectsSection />,
  experience: <ExperienceSection />,
  services: <ServicesSection />,
  contact: <ContactSection />,
};

const WAVE_VIEWBOX_HEIGHT = 620;

const WAVE_PATH =
  "M32 0 C4 88 72 148 32 232 C-4 324 78 398 32 486 C8 554 62 596 32 620";

const DEFAULT_SECTION_SELECTOR = ".timeline-section:not(.section--skills)";

export default function TimelineLayout() {
  const rootRef = useRef(null);
  const lenisRef = useRef(null);

  const timelineContentRef = useRef(null);
  const timelineLineRef = useRef(null);

  const svgRef = useRef(null);
  const progressPathRef = useRef(null);
  const clipRectRef = useRef(null);
  const travelerRef = useRef(null);

  const [activeId, setActiveId] = useState(sections[0].id);

  const handleNavigate = (id) => {
    const target = document.querySelector(`#${id}`);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -30,
        duration: 1.35,
      });

      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 30;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let lenis;
      let raf;
      let progressTrigger;
      let resizeCall;
      let initialRefreshCall;
      let cleanupWelcomeAnimation;
      let cleanupSkillsAnimation;
      let cleanupProjectsAnimation;

      const allMarkers = gsap.utils.toArray(".timeline-section__marker");
      const allSections = gsap.utils.toArray(".timeline-section");

      const updateTimelineBounds = () => {
        const timelineContent = timelineContentRef.current;
        const timelineLine = timelineLineRef.current;

        if (
          !timelineContent ||
          !timelineLine ||
          !allMarkers.length ||
          !allSections.length
        ) {
          return;
        }

        const contentRect = timelineContent.getBoundingClientRect();
        const firstMarkerRect = allMarkers[0].getBoundingClientRect();
        const lastSectionRect =
          allSections[allSections.length - 1].getBoundingClientRect();

        const startY =
          firstMarkerRect.top -
          contentRect.top +
          firstMarkerRect.height / 2 -
          36;

        const endY = lastSectionRect.bottom - contentRect.top;
        const safeHeight = Math.max(420, endY - startY + 18);

        gsap.set(timelineLine, {
          top: startY,
          height: safeHeight,
          bottom: "auto",
        });
      };

      const turnMarkerOff = (marker, immediate = false) => {
        if (!marker) return;

        marker.dataset.live = "false";

        const pulse = marker.querySelector(".timeline-section__marker-pulse");
        const number = marker.querySelector("span");

        gsap.killTweensOf([marker, pulse, number]);

        gsap.to(marker, {
          autoAlpha: 1,
          scale: 0.82,
          rotate: 0,
          backgroundColor: "rgba(255, 255, 255, 0.055)",
          borderColor: "rgba(255, 255, 255, 0.16)",
          color: "rgba(255, 255, 255, 0.48)",
          boxShadow:
            "0 0 0 0 rgba(77, 163, 255, 0), 0 0 0 rgba(77, 163, 255, 0)",
          duration: immediate ? 0 : 0.5,
          ease: "power3.out",
        });

        if (number) {
          gsap.to(number, {
            scale: 1,
            y: 0,
            duration: immediate ? 0 : 0.35,
            ease: "power3.out",
          });
        }

        if (pulse) {
          gsap.to(pulse, {
            autoAlpha: 0,
            scale: 0.45,
            duration: immediate ? 0 : 0.3,
            ease: "power2.out",
          });
        }
      };

      const turnMarkerOn = (marker) => {
        if (!marker || marker.dataset.live === "true") return;

        allMarkers.forEach((item) => {
          if (item !== marker) {
            turnMarkerOff(item);
          }
        });

        marker.dataset.live = "true";

        const pulse = marker.querySelector(".timeline-section__marker-pulse");
        const number = marker.querySelector("span");

        gsap.killTweensOf([marker, pulse, number]);

        const tl = gsap.timeline();

        tl.set(marker, {
          autoAlpha: 1,
          transformOrigin: "50% 50%",
        });

        if (pulse) {
          tl.set(
            pulse,
            {
              autoAlpha: 0,
              scale: 0.35,
            },
            "<",
          );
        }

        tl.to(marker, {
          scale: 1.42,
          rotate: -7,
          backgroundColor: "var(--color-primary)",
          borderColor: "rgba(var(--color-primary-rgb), 0.95)",
          color: "#111111",
          boxShadow:
            "0 0 0 13px rgba(var(--color-primary-rgb), 0.13), 0 0 34px rgba(var(--color-primary-rgb), 0.58), 0 0 70px rgba(var(--color-primary-rgb), 0.24)",
          duration: 0.22,
          ease: "power4.out",
        });

        if (number) {
          tl.to(
            number,
            {
              scale: 1.22,
              y: -1,
              duration: 0.18,
              ease: "power3.out",
            },
            "<",
          );
        }

        if (pulse) {
          tl.fromTo(
            pulse,
            {
              autoAlpha: 0.95,
              scale: 0.35,
            },
            {
              autoAlpha: 0,
              scale: 3.15,
              duration: 0.85,
              ease: "power3.out",
            },
            "<",
          );
        }

        tl.to(marker, {
          scale: 0.94,
          rotate: 4,
          duration: 0.18,
          ease: "power2.inOut",
        })
          .to(marker, {
            scale: 1.08,
            rotate: -2,
            duration: 0.2,
            ease: "back.out(3)",
          })
          .to(marker, {
            scale: 1,
            rotate: 0,
            duration: 0.22,
            ease: "power3.out",
          });

        if (number) {
          tl.to(
            number,
            {
              scale: 1,
              y: 0,
              duration: 0.22,
              ease: "power3.out",
            },
            "-=0.2",
          );
        }
      };

      const activateMarkerByIndex = (targetIndex) => {
        const marker = allMarkers[targetIndex];
        const section = sections[targetIndex];

        if (!marker || !section) {
          allMarkers.forEach((item) => turnMarkerOff(item));
          return;
        }

        setActiveId(section.id);
        turnMarkerOn(marker);
      };

      allMarkers.forEach((marker) => turnMarkerOff(marker, true));
      activateMarkerByIndex(0);

      if (!prefersReducedMotion) {
        lenis = new Lenis({
          duration: 1.22,
          smoothWheel: true,
          wheelMultiplier: 0.88,
          touchMultiplier: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);

        raf = (time) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      }

      gsap.set(".timeline-section", {
        autoAlpha: 1,
      });

      gsap.set(`${DEFAULT_SECTION_SELECTOR} .section-card`, {
        autoAlpha: 0,
        y: 100,
        scale: 0.96,
      });

      gsap.set(
        [
          `${DEFAULT_SECTION_SELECTOR} .section-card__eyebrow`,
          `${DEFAULT_SECTION_SELECTOR} .section-card h2`,
          `${DEFAULT_SECTION_SELECTOR} .timeline-reveal`,
        ].join(", "),
        {
          autoAlpha: 0,
          y: 36,
        },
      );

      gsap.set(".section--skills .section-card", {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });

      gsap.from(".portfolio-header", {
        y: 36,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
      });

      cleanupWelcomeAnimation = initWelcomeAnimation({ gsap, ScrollTrigger });
      cleanupSkillsAnimation = initSkillsAnimation({ gsap, ScrollTrigger });
      cleanupProjectsAnimation = initProjectsAnimation({ gsap, ScrollTrigger });

      updateTimelineBounds();

      const progressPath = progressPathRef.current;
      const clipRect = clipRectRef.current;
      const traveler = travelerRef.current;
      const svg = svgRef.current;

      const updateWave = (progress = 0) => {
        if (!progressPath || !clipRect || !traveler || !svg) return;

        const safeProgress = gsap.utils.clamp(0, 1, progress);
        const pathLength = progressPath.getTotalLength();
        const currentLength = pathLength * safeProgress;
        const point = progressPath.getPointAtLength(currentLength);

        gsap.set(clipRect, {
          attr: {
            height: WAVE_VIEWBOX_HEIGHT * safeProgress,
          },
        });

        const viewBox = svg.viewBox.baseVal;
        const svgWidth = svg.clientWidth || viewBox.width;
        const svgHeight = svg.clientHeight || viewBox.height;

        const xPx = (point.x / viewBox.width) * svgWidth;
        const yPx = (point.y / viewBox.height) * svgHeight;

        gsap.set(traveler, {
          autoAlpha: safeProgress > 0.01 ? 1 : 0,
          x: xPx,
          y: yPx,
          xPercent: -50,
          yPercent: -50,
        });
      };

      if (progressPath && clipRect && traveler && svg) {
        gsap.set(clipRect, {
          attr: {
            height: 0,
          },
        });

        gsap.set(traveler, {
          autoAlpha: 0,
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
        });

        progressTrigger = ScrollTrigger.create({
          trigger: timelineLineRef.current,
          start: "top 52%",
          end: "bottom 52%",
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            updateTimelineBounds();
          },
          onUpdate: (self) => updateWave(self.progress),
          onRefresh: (self) => {
            updateTimelineBounds();
            updateWave(self.progress);
          },
        });
      }

      allSections.forEach((sectionEl, index) => {
        const marker = sectionEl.querySelector(".timeline-section__marker");
        const isSkillsSection = sectionEl.classList.contains("section--skills");

        if (!isSkillsSection) {
          const card = sectionEl.querySelector(".section-card");
          const eyebrow = sectionEl.querySelector(".section-card__eyebrow");
          const title = sectionEl.querySelector(".section-card h2");
          const revealItems = sectionEl.querySelectorAll(".timeline-reveal");

          const sectionTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 82%",
              end: "bottom 18%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          });

          sectionTimeline
            .to(card, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.42,
              ease: "power3.out",
            })
            .to(
              eyebrow,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.18,
                ease: "power2.out",
              },
              "-=0.18",
            )
            .to(
              title,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.2,
                ease: "power2.out",
              },
              "-=0.1",
            );

          if (revealItems.length) {
            sectionTimeline.to(
              revealItems,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.12,
                ease: "power3.out",
              },
              "-=0.06",
            );
          }

          sectionTimeline.to({}, { duration: 0.18 });

          if (index !== sections.length - 1) {
            sectionTimeline.to(card, {
              autoAlpha: 0,
              y: -70,
              scale: 0.97,
              duration: 0.32,
              ease: "power2.in",
            });
          }
        }

        if (marker) {
          ScrollTrigger.create({
            trigger: marker,
            start: "center 54%",
            end: "center 46%",
            invalidateOnRefresh: true,

            onEnter: () => {
              activateMarkerByIndex(index);
            },

            onEnterBack: () => {
              activateMarkerByIndex(index);
            },

            onLeave: () => {
              activateMarkerByIndex(index);
            },

            onLeaveBack: () => {
              if (index === 0) {
                allMarkers.forEach((item) => turnMarkerOff(item));
                activateMarkerByIndex(0);
                return;
              }

              activateMarkerByIndex(index - 1);
            },
          });
        }
      });

      const handleResize = () => {
        if (resizeCall) resizeCall.kill();

        resizeCall = gsap.delayedCall(0.18, () => {
          updateTimelineBounds();
          ScrollTrigger.refresh();
        });
      };

      window.addEventListener("resize", handleResize);

      initialRefreshCall = gsap.delayedCall(0.1, () => {
        updateTimelineBounds();
        ScrollTrigger.refresh();
      });

      return () => {
        if (typeof cleanupSkillsAnimation === "function") {
          cleanupSkillsAnimation();
        }

        if (typeof cleanupWelcomeAnimation === "function") {
          cleanupWelcomeAnimation();
        }

        window.removeEventListener("resize", handleResize);

        if (initialRefreshCall) {
          initialRefreshCall.kill();
        }

        if (resizeCall) {
          resizeCall.kill();
        }

        if (progressTrigger) {
          progressTrigger.kill();
        }

        if (raf) {
          gsap.ticker.remove(raf);
        }

        if (lenis) {
          lenis.destroy();
          lenisRef.current = null;
        }
      };
    },
    { scope: rootRef },
  );

  return (
    <div className="portfolio-shell" ref={rootRef}>
      <Sidebar activeId={activeId} onNavigate={handleNavigate} />

      <main className="portfolio-main">
        <header className="portfolio-header">
          <p>Portafolio / Desarrollo Web / Animación</p>
          <h1>Interfaces digitales con precisión, movimiento y propósito.</h1>
        </header>

        <div className="timeline-content" ref={timelineContentRef}>
          <div
            className="timeline-line"
            ref={timelineLineRef}
            aria-hidden="true"
          >
            <svg
              ref={svgRef}
              className="timeline-svg"
              viewBox="0 0 76 620"
              preserveAspectRatio="none"
            >
              <defs>
                <clipPath
                  id="timeline-progress-clip"
                  clipPathUnits="userSpaceOnUse"
                >
                  <rect
                    ref={clipRectRef}
                    x="-20"
                    y="0"
                    width="130"
                    height="0"
                  />
                </clipPath>
              </defs>

              <path
                className="timeline-path"
                d={WAVE_PATH}
                vectorEffect="non-scaling-stroke"
              />

              <path
                ref={progressPathRef}
                className="timeline-path-progress"
                d={WAVE_PATH}
                clipPath="url(#timeline-progress-clip)"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div ref={travelerRef} className="timeline-traveler-dot" />
          </div>

          {sections.map((section, index) => (
            <SectionBlock section={section} index={index} key={section.id}>
              {sectionComponents[section.id]}
            </SectionBlock>
          ))}
        </div>
      </main>
    </div>
  );
}





