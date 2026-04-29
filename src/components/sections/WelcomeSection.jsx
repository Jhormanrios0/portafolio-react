export default function WelcomeSection() {
  return (
    <div className="welcome">
      <p className="timeline-reveal">
        Soy ingeniero de software y desarrollador frontend enfocado en crear
        interfaces modernas, limpias, responsivas y con animaciones cuidadas.
      </p>

      <div className="welcome__actions">
        <a href="#projects" className="btn btn--primary timeline-reveal">
          Ver proyectos
        </a>
        <a href="#contact" className="btn btn--secondary timeline-reveal">
          Contactarme
        </a>
      </div>
    </div>
  );
}
