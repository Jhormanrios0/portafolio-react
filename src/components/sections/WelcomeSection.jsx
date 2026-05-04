export default function WelcomeSection() {
  return (
    <div className="welcome-cinematic">
      <div className="welcome-orb welcome-orb--main" aria-hidden="true" />
      <div className="welcome-orb welcome-orb--soft" aria-hidden="true" />
      <div className="welcome-grid-glow" aria-hidden="true" />

      <div className="welcome-hero">
        <div className="welcome-hero__content">
          <p className="welcome-kicker">Ingeniero de Software / Frontend Developer</p>

          <h3
            className="welcome-title"
            aria-label="Hola, soy Jhorman. Desarrollo productos web memorables."
          >
            <span className="welcome-title-line">Hola, soy Jhorman.</span>
            <span className="welcome-title-line">Desarrollo productos</span>
            <span className="welcome-title-line welcome-title-line--accent">
              web memorables.
            </span>
          </h3>

          <p className="welcome-lead">
            Transformo ideas en interfaces limpias, funcionales y animadas,
            cuidando cada detalle de experiencia, rendimiento y diseño.
          </p>

          <div className="welcome-actions">
            <a className="btn btn--primary welcome-action" href="#projects">
              Ver proyectos
            </a>

            <a className="btn btn--ghost welcome-action" href="#contact">
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
  craft: "Frontend Development",
  focus: ["UI", "Motion", "Performance"],
  mindset: "Build with detail"
};`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-stats">
        <div className="welcome-stats-item">
          <strong>Frontend</strong>
          <span>Interfaces modernas y responsive</span>
        </div>

        <div className="welcome-stats-item">
          <strong>Motion</strong>
          <span>Animaciones fluidas con GSAP</span>
        </div>

        <div className="welcome-stats-item">
          <strong>Producto</strong>
          <span>Experiencias pensadas para usuarios</span>
        </div>
      </div>
    </div>
  );
}




