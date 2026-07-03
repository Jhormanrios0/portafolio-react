import { useEffect, useRef } from "react";
import { services } from "../../data/services";
import { initServicesAnimation } from "../../animations/services.animation";

function TitleWords({ title }) {
  return title.split(" ").map((word, index) => (
    <span className="service-track__word-mask" key={`${word}-${index}`}>
      <span data-service-word>{word}</span>
    </span>
  ));
}

function getServiceAccent(index) {
  const accents = [
    "Interface",
    "Motion",
    "Sistema",
    "Integración",
    "Datos",
    "Plan",
    "Base",
    "Mejora",
  ];

  return accents[index] || "Servicio";
}

export default function ServicesSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const cleanup = initServicesAnimation(rootRef.current);

    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  return (
    <div className="services-premium" data-services-section ref={rootRef}>
      <header className="services-premium__header" data-services-header>
        <span className="services-premium__eyebrow" data-services-eyebrow>
          Qué puedo hacer
        </span>

        <h2 className="services-premium__title" data-services-title>
          Servicios como desarrollador
        </h2>

        <p className="services-premium__lead" data-services-lead>
          Construyo soluciones digitales desde la interfaz hasta la lógica que
          las sostiene, combinando frontend, integraciones, datos, planeación
          técnica y bases de arquitectura de software.
        </p>
      </header>

      <div className="services-premium__layout">
        <aside className="services-premium__sticky" data-services-sticky>
          <div className="services-orbital" data-services-orbital aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <span className="services-premium__sticky-kicker">
            Perfil técnico
          </span>

          <strong>
            Frontend fuerte, visión full stack y criterio para ordenar ideas.
          </strong>

          <p>
            2 años creando interfaces, componentes, experiencias visuales,
            integraciones y soluciones web con enfoque práctico.
          </p>

          <div className="services-premium__stack-map" aria-hidden="true">
            <span>Frontend</span>
            <span>Motion</span>
            <span>Backend</span>
            <span>Datos</span>
            <span>Arquitectura</span>
          </div>

          <div className="services-premium__meter">
            <span data-services-meter />
          </div>
        </aside>

        <div className="services-rails" data-services-list>
          {services.map((service, index) => (
            <article
              className={`service-track ${
                index % 2 === 0
                  ? "service-track--left"
                  : "service-track--right"
              } ${service.featured ? "is-featured" : ""}`}
              data-service-item
              data-cursor="card"
              data-cursor-fit
              data-cursor-padding-x="14"
              data-cursor-padding-y="12"
              data-cursor-magnetic="0.01"
              key={service.id}
              tabIndex={0}
            >
              <span className="service-track__ambient" data-service-ambient />
              <span className="service-track__noise" aria-hidden="true" />
              <span className="service-track__glow" data-service-glow />

              <div className="service-track__shell" data-service-shell>
                <div className="service-track__top">
                  <div className="service-track__identity">
                    <span className="service-track__number" data-service-number>
                      {service.number}
                    </span>

                    <div>
                      <span className="service-track__accent" data-service-meta>
                        {getServiceAccent(index)}
                      </span>

                      <span className="service-track__eyebrow" data-service-meta>
                        {service.eyebrow}
                      </span>
                    </div>
                  </div>

                  <span className="service-track__status" data-service-meta>
                    {service.featured ? "Foco principal" : "Disponible"}
                  </span>
                </div>

                <div className="service-track__line" aria-hidden="true">
                  <span data-service-line />
                </div>

                <div className="service-track__body">
                  <div className="service-track__content">
                    <h3 data-service-heading>
                      <TitleWords title={service.title} />
                    </h3>

                    <p className="service-track__description" data-service-text>
                      {service.description}
                    </p>
                  </div>

                  <div className="service-track__result" data-service-result>
                    <span>Resultado</span>
                    <strong>{service.outcome}</strong>
                  </div>
                </div>

                <div className="service-track__footer">
                  <div className="service-track__tags">
                    {service.tags.map((tag) => (
                      <span data-service-chip key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="service-track__signal" data-service-signal>
                    {service.signal}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
