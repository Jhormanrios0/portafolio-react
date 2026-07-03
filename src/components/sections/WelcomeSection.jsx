export default function WelcomeSection() {
  return (
    <div className="welcome-cinematic">
      <div className="welcome-orb welcome-orb--main" aria-hidden="true" />
      <div className="welcome-orb welcome-orb--soft" aria-hidden="true" />
      <div className="welcome-grid-glow" aria-hidden="true" />

      <div className="welcome-hero">
        <div className="welcome-hero__content">
          <p className="welcome-kicker">Ingeniero de Software.</p>

          <h3
            className="welcome-title"
            aria-label="Hola, soy Jhorman. Construyo soluciones digitales completas."
          >
            <span className="welcome-title-line">Hola, soy Jhorman.</span>
            <span className="welcome-title-line">Construyo soluciones</span>
            <span className="welcome-title-line welcome-title-line--accent">
              digitales completas.
            </span>
          </h3>

          <p className="welcome-lead">
            Diseño y desarrollo productos digitales con una base técnica clara:
            interfaces modernas, lógica de negocio, consumo de APIs, datos,
            rendimiento y estructura para que sean mantenibles, funcionales y
            escalables.
          </p>

          <div className="welcome-actions">
            <a
              className="btn btn--primary welcome-action"
              href="#projects"
              data-cursor="button"
              data-cursor-fit
              data-cursor-padding-x="18"
              data-cursor-padding-y="12"
            >
              Ver proyectos
            </a>

            <a
              className="btn btn--ghost welcome-action"
              href="#contact"
              data-cursor="button"
              data-cursor-fit
              data-cursor-padding-x="18"
              data-cursor-padding-y="12"
            >
              Hablemos
            </a>
          </div>
        </div>

        <div className="welcome-hero__visual" aria-hidden="true">
          <div className="welcome-code-card" data-welcome-profile>
            <div className="welcome-code-card__inner" data-welcome-profile>
              <div className="welcome-code-card__shine" />

              <div className="welcome-code-card__top" data-welcome-profile>
                <span />
                <span />
                <span />
              </div>

              <pre>
                {`const profile = {
  name: "Jhorman",
  role: "Software Engineer",
  core: "Frontend strong",
  scope: ["APIs", "Data", "Product", "Architecture"],
  mindset: "Build useful, scalable systems"
};`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-stats">
        <div className="welcome-stats-item">
          <strong>Software</strong>
          <span>Diseño, lógica y estructura técnica</span>
        </div>

        <div className="welcome-stats-item">
          <strong>Frontend</strong>
          <span>Interfaces modernas y experiencias cuidadas</span>
        </div>

        <div className="welcome-stats-item">
          <strong>Producto & datos</strong>
          <span>Decisiones técnicas orientadas a valor</span>
        </div>
      </div>
    </div>
  );
}
