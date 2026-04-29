import { experiences } from "../../data/experience";

export default function ExperienceSection() {
  return (
    <div className="experience-list">
      {experiences.map((experience) => (
        <article
          className="experience-item timeline-reveal"
          key={`${experience.role}-${experience.company}`}
        >
          <div className="experience-item__header">
            <div>
              <h3>{experience.role}</h3>
              <p>{experience.company}</p>
            </div>

            <span>{experience.period}</span>
          </div>

          <p className="experience-item__description">
            {experience.description}
          </p>

          <div className="mini-card__tags">
            {experience.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}


