import { featuredProjects } from "../../data/projects";

export default function ProjectsSection() {
  return (
    <div className="projects-stable" data-projects-scene>
      <div className="projects-stable__sticky">
        <div className="projects-stable__intro" data-projects-intro>
          <p className="projects-stable__eyebrow">Proyectos destacados</p>

          <h2 className="projects-stable__title">
            Trabajo real convertido en cards visuales.
          </h2>

          <p className="projects-stable__description">
            Cada card presenta una imagen, una descripción clara y el stack
            técnico usado. Al entrar a la sección, los proyectos aparecen como
            una baraja en la esquina izquierda; con el scroll se organizan en
            una composición diagonal mientras la línea temporal sigue avanzando.
          </p>
        </div>

        <div className="projects-stable__stage" data-projects-stage>
          <div className="projects-stable__ambient" aria-hidden="true" />

          {featuredProjects.map((project) => (
            <article
              className="project-stable-card"
              data-project-card
              key={project.id}
             tabIndex={0}>
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

                  <p>{project.description}</p>

                  <div className="project-stable-card__tech">
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}


