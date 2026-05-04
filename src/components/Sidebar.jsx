import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "../utils/gsapConfig";
import { sections } from "../data/sections";

export default function Sidebar({ activeId, onNavigate }) {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeId) || sections[0],
    [activeId]
  );

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const handleNavigate = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useGSAP(
    () => {
      gsap.set(".menu-backdrop", {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      gsap.set(".menu-panel", {
        autoAlpha: 0,
        x: 90,
        y: -20,
        scale: 0.92,
        filter: "blur(16px)",
        pointerEvents: "none",
        transformOrigin: "top right",
      });

      gsap.set(".menu-panel__link", {
        autoAlpha: 0,
        x: 36,
      });

      gsap.from(".menu-fab", {
        y: -18,
        scale: 0.86,
        autoAlpha: 0,
        duration: 0.9,
        ease: "back.out(1.7)",
      });
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      if (isOpen) {
        timeline
          .set(".menu-backdrop", {
            pointerEvents: "auto",
          })
          .set(".menu-panel", {
            pointerEvents: "auto",
          })
          .to(".menu-backdrop", {
            autoAlpha: 1,
            duration: 0.28,
          })
          .to(
            ".menu-fab",
            {
              scale: 0.96,
              duration: 0.25,
            },
            "<"
          )
          .to(
            ".menu-fab__bar:nth-child(1)",
            {
              y: 6,
              rotate: 45,
              duration: 0.28,
            },
            "<"
          )
          .to(
            ".menu-fab__bar:nth-child(2)",
            {
              scaleX: 0,
              autoAlpha: 0,
              duration: 0.22,
            },
            "<"
          )
          .to(
            ".menu-fab__bar:nth-child(3)",
            {
              y: -6,
              rotate: -45,
              duration: 0.28,
            },
            "<"
          )
          .to(
            ".menu-panel",
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.58,
              ease: "expo.out",
            },
            "-=0.12"
          )
          .to(
            ".menu-panel__link",
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.44,
              stagger: 0.055,
              ease: "power3.out",
            },
            "-=0.28"
          );

        return;
      }

      timeline
        .to(".menu-panel__link", {
          autoAlpha: 0,
          x: 28,
          duration: 0.22,
          stagger: {
            each: 0.025,
            from: "end",
          },
          ease: "power2.in",
        })
        .to(
          ".menu-panel",
          {
            autoAlpha: 0,
            x: 85,
            y: -16,
            scale: 0.94,
            filter: "blur(14px)",
            duration: 0.38,
            ease: "power3.inOut",
          },
          "-=0.08"
        )
        .to(
          ".menu-backdrop",
          {
            autoAlpha: 0,
            duration: 0.24,
          },
          "<"
        )
        .to(
          ".menu-fab",
          {
            scale: 1,
            duration: 0.22,
          },
          "<"
        )
        .to(
          ".menu-fab__bar:nth-child(1)",
          {
            y: 0,
            rotate: 0,
            duration: 0.25,
          },
          "<"
        )
        .to(
          ".menu-fab__bar:nth-child(2)",
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.22,
          },
          "<"
        )
        .to(
          ".menu-fab__bar:nth-child(3)",
          {
            y: 0,
            rotate: 0,
            duration: 0.25,
          },
          "<"
        )
        .set(".menu-backdrop", {
          pointerEvents: "none",
        })
        .set(".menu-panel", {
          pointerEvents: "none",
        });
    },
    {
      scope: rootRef,
      dependencies: [isOpen],
      revertOnUpdate: false,
    }
  );

  return (
    <div
      className={`floating-nav ${isOpen ? "is-open" : ""}`}
      ref={rootRef}
    >
      <button
        className="menu-fab"
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        <span className="menu-fab__glow" />

        <span className="menu-fab__current">
          {activeSection.index}
        </span>

        <span className="menu-fab__label">
          Menú
        </span>

        <span className="menu-fab__icon" aria-hidden="true">
          <span className="menu-fab__bar" />
          <span className="menu-fab__bar" />
          <span className="menu-fab__bar" />
        </span>
      </button>

      <button
        className="menu-backdrop"
        type="button"
        aria-label="Cerrar menú"
        onClick={closeMenu}
      />

      <aside
        className="menu-panel"
        ref={panelRef}
        aria-hidden={!isOpen}
      >
        <div className="menu-panel__header">
          <div>
            <span>Explorar</span>
            <strong>{activeSection.label}</strong>
          </div>

          <button
            className="menu-panel__close"
            type="button"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            <span />
            <span />
          </button>
        </div>

        <nav className="menu-panel__nav" aria-label="Navegación del portafolio">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`menu-panel__link ${
                activeId === section.id ? "is-active" : ""
              }`}
              onClick={() => handleNavigate(section.id)}
            >
              <span>{section.index}</span>

              <div>
                <strong>{section.label}</strong>
                <small>{section.eyebrow}</small>
              </div>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}



