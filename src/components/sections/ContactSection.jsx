import { useEffect, useMemo, useRef, useState } from "react";
import { initContactAnimation } from "../../animations/contact.animation";

const contactChannels = [
  {
    id: "email",
    label: "Enviar correo",
    short: "Email",
    href: "mailto:tu-correo@correo.com",
    kind: "Canal directo",
    state: "Disponible",
    use: "Proyectos y propuestas",
    message:
      "Cuéntame qué quieres construir, mejorar o resolver. Este es el canal más directo para iniciar una conversación.",
    angle: "-90deg",
    x: "50%",
    y: "10%",
  },
  {
    id: "linkedin",
    label: "Ver LinkedIn",
    short: "LinkedIn",
    href: "https://www.linkedin.com/in/tu-perfil",
    kind: "Canal profesional",
    state: "Abierto",
    use: "Networking y oportunidades",
    message:
      "Conectemos profesionalmente para hablar de oportunidades, colaboraciones o contexto de experiencia.",
    angle: "0deg",
    x: "84%",
    y: "50%",
  },
  {
    id: "github",
    label: "Ir a GitHub",
    short: "GitHub",
    href: "https://github.com/tu-usuario",
    kind: "Código y proyectos",
    state: "Activo",
    use: "Repositorios y trabajo técnico",
    message:
      "Explora proyectos, estructura de código, componentes y soluciones técnicas que he trabajado.",
    angle: "90deg",
    x: "50%",
    y: "90%",
  },
  {
    id: "cv",
    label: "Descargar CV",
    short: "CV",
    href: "/cv.pdf",
    kind: "Perfil resumido",
    state: "Listo",
    use: "Resumen profesional",
    message:
      "Descarga una versión resumida de mi perfil, habilidades, experiencia y enfoque como desarrollador.",
    angle: "180deg",
    x: "16%",
    y: "50%",
  },
];

const signalPoints = [
  "Frontend fuerte y visualmente cuidado",
  "Interacciones, scroll y motion con intención",
  "Criterio para estructurar soluciones digitales",
];

function StatementWords({ text }) {
  return text.split(" ").map((word, index) => (
    <span className="contact-signal__word-mask" key={`${word}-${index}`}>
      <span data-contact-word>{word}</span>
    </span>
  ));
}

export default function ContactSection() {
  const rootRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeChannel = useMemo(
    () => contactChannels[activeIndex] || contactChannels[0],
    [activeIndex]
  );

  useEffect(() => {
    const cleanup = initContactAnimation(rootRef.current);

    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % contactChannels.length);
    }, 9500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activateChannel = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="contact-signal" data-contact-section ref={rootRef}>
      <header className="contact-signal__header" data-contact-header>
        <span className="contact-signal__eyebrow" data-contact-eyebrow>
          Hablemos
        </span>

        <h2 className="contact-signal__title" data-contact-title>
          Construyamos algo juntos
        </h2>

        <p className="contact-signal__lead" data-contact-lead>
          Si tienes una idea, una interfaz por mejorar o un proyecto por
          estructurar, podemos convertirlo en una solución clara, visual y
          funcional.
        </p>
      </header>

      <div className="contact-signal__layout">
        <div className="contact-signal__copy" data-contact-copy-wrap>
          <span className="contact-signal__kicker" data-contact-kicker>
            Señal activa
          </span>

          <h3 className="contact-signal__statement" data-contact-statement>
            <StatementWords text="Tienes una idea. Yo puedo ayudarte a convertirla en algo real, claro y bien construido." />
          </h3>

          <p className="contact-signal__text" data-contact-copy>
            Me gusta colaborar en proyectos donde el detalle visual, la lógica y
            la estructura se sienten conectados.
          </p>

          <div className="contact-signal__points">
            {signalPoints.map((point) => (
              <div className="contact-signal__point" data-contact-point key={point}>
                <span />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-signal__console" data-contact-console>
          <div
            className="contact-signal__shell"
            data-contact-shell
            style={{
              "--active-angle": activeChannel.angle,
              "--active-x": activeChannel.x,
              "--active-y": activeChannel.y,
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <span className="contact-signal__ambient" data-contact-ambient />
            <span className="contact-signal__noise" aria-hidden="true" />

            <div className="contact-signal__hud" data-contact-hud>
              <span className="contact-signal__hud-tag" data-contact-meta>
                Radar de contacto
              </span>

              <span className="contact-signal__hud-status" data-contact-meta>
                {activeChannel.kind}
              </span>
            </div>

            <div className="contact-signal__radar" data-contact-radar>
              <span className="contact-signal__ring contact-signal__ring--1" data-radar-ring />
              <span className="contact-signal__ring contact-signal__ring--2" data-radar-ring />
              <span className="contact-signal__ring contact-signal__ring--3" data-radar-ring />
              <span className="contact-signal__ring contact-signal__ring--4" data-radar-ring />

              <span className="contact-signal__cross contact-signal__cross--x" data-radar-grid />
              <span className="contact-signal__cross contact-signal__cross--y" data-radar-grid />

              <span className="contact-signal__sweep" data-radar-sweep />
              <span className="contact-signal__beam" data-radar-beam />
              <span className="contact-signal__beam-end" data-radar-beam-end />

              <span className="contact-signal__core" data-radar-core>
                <span className="contact-signal__pulse" data-radar-pulse />
                <span className="contact-signal__core-dot" />
              </span>

              {contactChannels.map((channel, index) => (
                <button
                  type="button"
                  className={`contact-signal__orbit-item ${
                    activeIndex === index ? "is-active" : ""
                  }`}
                  key={channel.id}
                  style={{
                    "--node-x": channel.x,
                    "--node-y": channel.y,
                  }}
                  onMouseEnter={() => activateChannel(index)}
                  onFocus={() => activateChannel(index)}
                  onClick={() => activateChannel(index)}
                  data-radar-node
                  data-cursor="button"
                  data-cursor-fit
                  data-cursor-padding-x="12"
                  data-cursor-padding-y="8"
                  aria-label={`Seleccionar ${channel.short}`}
                >
                  <span className="contact-signal__orbit-dot" />
                  <span className="contact-signal__orbit-label">{channel.short}</span>
                </button>
              ))}

              <div className="contact-signal__center-card" data-radar-center key={activeChannel.id}>
                <span>{activeChannel.state}</span>
                <strong>{activeChannel.short}</strong>
                <small>{activeChannel.use}</small>
                <p>{activeChannel.message}</p>

                <a
                  href={activeChannel.href}
                  target={activeChannel.id === "email" || activeChannel.id === "cv" ? "_self" : "_blank"}
                  rel={activeChannel.id === "email" || activeChannel.id === "cv" ? undefined : "noreferrer"}
                  data-cursor="button"
                  data-cursor-fit
                  data-cursor-padding-x="14"
                  data-cursor-padding-y="10"
                  data-cursor-label={activeChannel.short}
                >
                  {activeChannel.label}
                </a>
              </div>
            </div>

            <p className="contact-signal__hint" data-contact-hint>
              La señal cambia lentamente. También puedes seleccionar un canal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

