import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { featuredProjects } from "../../data/projects";

function getProjectLiveUrl(project) {
  return project.liveUrl || project.demoUrl || project.deployUrl || project.siteUrl || "";
}

function getProjectRepoUrl(project) {
  return project.repoUrl || project.repositoryUrl || project.githubUrl || "";
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const modalPanelRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isClosingRef = useRef(false);

  const selectedLinks = useMemo(() => {
    if (!selectedProject) {
      return {
        liveUrl: "",
        repoUrl: "",
      };
    }

    return {
      liveUrl: getProjectLiveUrl(selectedProject),
      repoUrl: getProjectRepoUrl(selectedProject),
    };
  }, [selectedProject]);

  const lockPageScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

    scrollPositionRef.current = scrollY;

    document.documentElement.classList.add("project-detail-scroll-lock");
    document.body.classList.add("project-detail-open");

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockPageScroll = () => {
    const scrollY = scrollPositionRef.current || 0;

    document.documentElement.classList.remove("project-detail-scroll-lock");
    document.body.classList.remove("project-detail-open");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  useEffect(() => {
    if (!selectedProject) return undefined;

    lockPageScroll();

    return () => {
      unlockPageScroll();
      isClosingRef.current = false;
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const modal = modalRef.current;
    const panel = modalPanelRef.current;

    if (!modal || !panel) return undefined;

    gsap.set(modal, {
      autoAlpha: 0,
    });

    gsap.set(panel, {
      autoAlpha: 0,
      y: 22,
      scale: 0.965,
      rotateX: 3,
      filter: "blur(14px)",
      transformOrigin: "50% 50%",
      force3D: true,
    });

    const items = panel.querySelectorAll("[data-project-detail-item]");

    gsap.set(items, {
      autoAlpha: 0,
      y: 16,
      filter: "blur(8px)",
    });

    const tl = gsap.timeline({
      defaults: {
        overwrite: true,
      },
    });

    tl.to(modal, {
      autoAlpha: 1,
      duration: 0.18,
      ease: "power2.out",
    })
      .to(
        panel,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.46,
          ease: "power3.out",
        },
        0.04
      )
      .to(
        items,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.36,
          stagger: 0.04,
          ease: "power2.out",
        },
        0.18
      );

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeProjectDetail();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      tl.kill();
    };
  }, [selectedProject]);

  const openProjectDetail = (project) => {
    isClosingRef.current = false;
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    if (isClosingRef.current) return;

    const modal = modalRef.current;
    const panel = modalPanelRef.current;

    if (!selectedProject || !modal || !panel) {
      setSelectedProject(null);
      return;
    }

    isClosingRef.current = true;

    gsap.timeline({
      defaults: {
        overwrite: true,
      },
      onComplete: () => {
        setSelectedProject(null);
      },
    })
      .to(panel, {
        autoAlpha: 0,
        y: 18,
        scale: 0.965,
        filter: "blur(12px)",
        duration: 0.22,
        ease: "power2.in",
      })
      .to(
        modal,
        {
          autoAlpha: 0,
          duration: 0.18,
          ease: "power2.in",
        },
        0.05
      );
  };

  const handleCardKeyDown = (event, project) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectDetail(project);
    }
  };

  const projectDetailModal = selectedProject ? (
    <div
      className="project-detail"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      onClick={closeProjectDetail}
    >
      <div
        className="project-detail__panel"
        ref={modalPanelRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="project-detail__close"
          type="button"
          onClick={closeProjectDetail}
          data-cursor="button"
          data-cursor-fit
          data-cursor-padding-x="10"
          data-cursor-padding-y="10"
          aria-label="Cerrar detalle del proyecto"
        >
          <span />
          <span />
        </button>

        <div className="project-detail__media" data-project-detail-item>
          {selectedProject.cover ? (
            <img src={selectedProject.cover} alt={selectedProject.title} />
          ) : (
            <div
              className={`project-detail__mock project-stable-card__mock--${selectedProject.accent}`}
            >
              <span>{selectedProject.number}</span>
              <strong>{selectedProject.title}</strong>
            </div>
          )}
        </div>

        <div className="project-detail__content">
          <div className="project-detail__head" data-project-detail-item>
            <span>Proyecto {selectedProject.number}</span>

            <h3 id="project-detail-title">{selectedProject.title}</h3>

            <p>
              {selectedProject.detail ||
                selectedProject.description ||
                selectedProject.shortDescription}
            </p>
          </div>

          <div className="project-detail__grid" data-project-detail-item>
            <div>
              <span>Enfoque</span>
              <strong>
                {selectedProject.role ||
                  "Desarrollo de interfaz y estructura técnica"}
              </strong>
            </div>

            <div>
              <span>Objetivo</span>
              <strong>
                {selectedProject.problem ||
                  "Crear una experiencia clara, usable y mantenible"}
              </strong>
            </div>

            <div>
              <span>Resultado</span>
              <strong>
                {selectedProject.result ||
                  "Producto funcional con base visual y técnica sólida"}
              </strong>
            </div>
          </div>

          <div className="project-detail__stack" data-project-detail-item>
            {selectedProject.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          {(selectedLinks.liveUrl || selectedLinks.repoUrl) && (
            <div className="project-detail__actions" data-project-detail-item>
              {selectedLinks.liveUrl && (
                <a
                  href={selectedLinks.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail__button project-detail__button--primary"
                  data-cursor="button"
                  data-cursor-fit
                  data-cursor-padding-x="16"
                  data-cursor-padding-y="12"
                >
                  Ver proyecto
                  <span aria-hidden="true">↗</span>
                </a>
              )}

              {selectedLinks.repoUrl && (
                <a
                  href={selectedLinks.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail__button project-detail__button--ghost"
                  data-cursor="button"
                  data-cursor-fit
                  data-cursor-padding-x="16"
                  data-cursor-padding-y="12"
                >
                  Ver repositorio
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="projects-stable" data-projects-scene>
      <div className="projects-stable__sticky">
        <div className="projects-stable__intro" data-projects-intro>
          <p className="projects-stable__eyebrow">Proyectos destacados</p>

          <h2 className="projects-stable__title">
            Soluciones digitales con intención técnica y visual.
          </h2>

          <p className="projects-stable__description">
            Una selección de proyectos donde combino interfaz, estructura,
            rendimiento e integración. Cada card muestra lo esencial y permite
            ampliar el contexto técnico del trabajo.
          </p>
        </div>

        <div className="projects-stable__stage" data-projects-stage>
          <div className="projects-stable__ambient" aria-hidden="true" />

          {featuredProjects.map((project) => (
            <article
              className="project-stable-card"
              data-project-card
              data-cursor="card"
              data-cursor-fit
              data-cursor-padding-x="14"
              data-cursor-padding-y="12"
              data-cursor-magnetic="0.01"
              key={project.id}
              tabIndex={0}
              role="button"
              aria-label={`Ampliar información de ${project.title}`}
              onClick={() => openProjectDetail(project)}
              onKeyDown={(event) => handleCardKeyDown(event, project)}
            >
              <div className="project-stable-card__surface">
                <div className="project-stable-card__visual">
                  {project.cover ? (
                    <img
                      className="project-stable-card__image"
                      src={project.cover}
                      alt={project.title}
                    />
                  ) : (
                    <div
                      className={`project-stable-card__mock project-stable-card__mock--${project.accent}`}
                    >
                      <span className="project-stable-card__mock-number">
                        {project.number}
                      </span>

                      <div className="project-stable-card__mock-window">
                        <div className="project-stable-card__mock-top">
                          <span />
                          <span />
                          <span />
                        </div>

                        <div className="project-stable-card__mock-body">
                          <div className="project-stable-card__mock-preview" />

                          <div className="project-stable-card__mock-lines">
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="project-stable-card__body">
                  <div className="project-stable-card__header">
                    <span className="project-stable-card__number">
                      {project.number}
                    </span>

                    <h3>{project.title}</h3>
                  </div>

                  <p>{project.shortDescription || project.description}</p>

                  <div className="project-stable-card__tech">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <span className="project-stable-card__more">
                    Ver detalle
                    <i aria-hidden="true">↗</i>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && typeof document !== "undefined"
        ? createPortal(projectDetailModal, document.body)
        : null}
    </div>
  );
}
