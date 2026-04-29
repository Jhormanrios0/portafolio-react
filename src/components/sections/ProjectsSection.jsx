import { projects } from "../../data/projects";

export default function ProjectsSection() {
  return (
    <div className="cards-grid">
      {projects.map((project) => (
        <article className="mini-card timeline-reveal" key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <div className="mini-card__tags">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
