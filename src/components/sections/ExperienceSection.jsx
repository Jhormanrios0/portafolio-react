import { experiences } from "../../data/experience";

export default function ExperienceSection() {
  return (
    <div className="career-sticky" data-experience-section>
      <p className="career-sticky__lead" data-experience-lead>
        Mi recorrido une formación en ingeniería de software con experiencia
        real desarrollando interfaces, productos web y soluciones digitales.
      </p>

      <div className="career-sticky__list" data-experience-list>
        {experiences.map((experience, index) => {
          const side = index % 2 === 0 ? "left-date" : "right-date";

          return (
            <article
              className={`career-sticky-item career-sticky-item--${side}`}
              data-experience-item
              data-experience-id={experience.id}
              data-experience-side={side}
              key={experience.id}
              style={{ "--career-index": index }}
            >
              <aside className="career-sticky-item__date" data-experience-date>
                <div className="career-sticky-item__date-inner">
                  <span>{experience.number}</span>
                  <strong>{experience.period}</strong>
                  <small>{experience.type}</small>
                </div>
              </aside>

              <div className="career-sticky-card" data-experience-card tabIndex={0}>
                <div className="career-sticky-card__header">
                  <div>
                    <span className="career-sticky-card__mode" data-experience-text>
                      {experience.mode}
                    </span>

                    <h3 data-experience-text>{experience.role}</h3>

                    <p data-experience-text>
                      {experience.company}
                      <span> · {experience.location}</span>
                    </p>
                  </div>

                  <span className="career-sticky-card__index">
                    {experience.number}
                  </span>
                </div>

                <p className="career-sticky-card__summary" data-experience-text>
                  {experience.summary}
                </p>

                <ul className="career-sticky-card__achievements">
                  {experience.achievements.map((achievement) => (
                    <li data-experience-text key={achievement}>
                      {achievement}
                    </li>
                  ))}
                </ul>

                <div
                  className="career-sticky-card__stack"
                  aria-label="Tecnologías usadas"
                >
                  {experience.stack.map((tech) => (
                    <span data-experience-chip key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
