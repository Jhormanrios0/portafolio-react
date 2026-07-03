const heroStats = [
  {
    value: "2+",
    label: "años construyendo soluciones digitales",
  },
  {
    value: "Ingeniería",
    label: "especialidad principal",
  },
  {
    value: "Full product",
    label: "visión técnica de producto",
  },
];

const heroCapabilities = [
  "Ingeniería moderno",
  "React",
  "APIs",
  "Arquitectura base",
  "Optimización",
  "Datos",
  "Mantenimiento",
  "Planeación técnica",
];

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="hero-professional"
      aria-labelledby="hero-professional-title"
    >
      <div className="hero-professional__ambient" aria-hidden="true">
        <span className="hero-professional__orb hero-professional__orb--one" />
        <span className="hero-professional__orb hero-professional__orb--two" />
        <span className="hero-professional__grid" />
        <span className="hero-professional__line hero-professional__line--one" />
        <span className="hero-professional__line hero-professional__line--two" />
      </div>

      <div className="hero-professional__shell">
        <div className="hero-professional__copy">
          <div className="hero-professional__badge">
            <span className="hero-professional__badge-dot" />
            Ingeniero de Software
          </div>

          <h1
            id="hero-professional-title"
            className="hero-professional__title"
          >
            Construyo productos digitales modernos con ingeniería, diseño y
            experiencia.
          </h1>

          <p className="hero-professional__lead">
            Soy Jhorman David Rodríguez Ríos, Ingeniero de Software con fuerte
            especialidad en frontend. Desarrollo interfaces cuidadas,
            interactivas y funcionales, pero mi perfil va más allá de la capa
            visual: también participo en lógica de producto, integración con
            servicios, consumo de APIs, optimización, mantenimiento y planeación
            técnica.
          </p>

          <div className="hero-professional__actions">
            <a
              href="#proyectos"
              className="hero-professional__button hero-professional__button--primary"
              data-cursor="button"
              data-cursor-fit
              data-cursor-padding-x="18"
              data-cursor-padding-y="12"
            >
              Ver proyectos
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#contacto"
              className="hero-professional__button hero-professional__button--ghost"
              data-cursor="button"
              data-cursor-fit
              data-cursor-padding-x="18"
              data-cursor-padding-y="12"
            >
              Hablemos
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <aside
          className="hero-professional__panel"
          aria-label="Resumen profesional"
          data-cursor="card"
          data-cursor-fit
          data-cursor-padding-x="16"
          data-cursor-padding-y="16"
          data-cursor-magnetic="0.01"
        >
          <div className="hero-professional__panel-header">
            <span>Perfil profesional</span>
            <span className="hero-professional__panel-status">
              Disponible
            </span>
          </div>

          <div className="hero-professional__panel-title">
            Software Engineer
          </div>

          <p className="hero-professional__panel-text">
            Mi mayor fortaleza está en crear experiencias frontend sólidas,
            fluidas y visualmente precisas, conectando diseño, rendimiento,
            estructura técnica y necesidades reales del producto.
          </p>

          <div className="hero-professional__stats">
            {heroStats.map((item) => (
              <div className="hero-professional__stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div
        className="hero-professional__capabilities"
        aria-label="Capacidades principales"
      >
        {heroCapabilities.map((capability) => (
          <span
            className="hero-professional__capability"
            key={capability}
            data-cursor="button"
            data-cursor-fit
            data-cursor-padding-x="12"
            data-cursor-padding-y="8"
          >
            {capability}
          </span>
        ))}
      </div>
    </section>
  );
}

