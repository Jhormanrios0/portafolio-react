import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaNpm,
  FaCode,
  FaServer,
  FaDatabase,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiVite,
  SiTailwindcss,
  SiVuedotjs,
  SiAstro,
  SiExpress,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFigma,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiDocker,
} from "react-icons/si";
import { MdDevices } from "react-icons/md";
import { TbApi } from "react-icons/tb";

const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    label: "Base principal",
    tone: "frontend",
    items: [
      { name: "HTML", meta: "Estructura web", Icon: FaHtml5 },
      { name: "CSS", meta: "Layout y estilos", Icon: FaCss3Alt },
      { name: "JavaScript", meta: "Lógica cliente", Icon: SiJavascript },
      { name: "TypeScript", meta: "Tipado práctico", Icon: SiTypescript },
      { name: "React", meta: "Fuerte principal", Icon: FaReact },
      { name: "Vue", meta: "Base práctica", Icon: SiVuedotjs },
      { name: "Astro", meta: "Sitios rápidos", Icon: SiAstro },
      { name: "Tailwind CSS", meta: "Utility first", Icon: SiTailwindcss },
      { name: "Responsive UI", meta: "Mobile first", Icon: MdDevices },
      { name: "Vite", meta: "Build moderno", Icon: SiVite },
    ],
  },
  {
    number: "02",
    title: "Backend",
    label: "APIs y lógica",
    tone: "backend",
    items: [
      { name: "Node.js", meta: "Runtime JS", Icon: FaNodeJs },
      { name: "Express", meta: "APIs base", Icon: SiExpress },
      { name: "APIs REST", meta: "Servicios HTTP", Icon: TbApi },
      { name: "Python", meta: "Backend base", Icon: SiPython },
      { name: "C#", meta: "Bases del lenguaje", Icon: FaCode },
      { name: ".NET básico", meta: "APIs en práctica", Icon: FaServer },
      { name: "Auth básica", meta: "Tokens / sesiones", Icon: TbApi },
      { name: "Integraciones", meta: "Servicios externos", Icon: TbApi },
    ],
  },
  {
    number: "03",
    title: "Datos",
    label: "Persistencia",
    tone: "motion",
    items: [
      { name: "MySQL", meta: "Base relacional", Icon: SiMysql },
      { name: "PostgreSQL", meta: "SQL relacional", Icon: SiPostgresql },
      { name: "MongoDB", meta: "NoSQL básico", Icon: SiMongodb },
      { name: "CRUD", meta: "Flujos de datos", Icon: FaDatabase },
      { name: "Consultas SQL", meta: "Filtros y joins", Icon: SiMysql },
      { name: "Modelado básico", meta: "Tablas y relaciones", Icon: SiPostgresql },
    ],
  },
  {
    number: "04",
    title: "Workflow",
    label: "Entrega",
    tone: "workflow",
    items: [
      { name: "Git", meta: "Versionamiento", Icon: FaGitAlt },
      { name: "GitHub", meta: "Repositorios", Icon: FaGithub },
      { name: "NPM", meta: "Paquetes", Icon: FaNpm },
      { name: "Postman", meta: "Pruebas API", Icon: SiPostman },
      { name: "Docker básico", meta: "Entornos simples", Icon: SiDocker },
      { name: "Figma", meta: "Lectura UI", Icon: SiFigma },
      { name: "Vercel", meta: "Deploy frontend", Icon: SiVercel },
      { name: "Netlify", meta: "Deploy web", Icon: SiNetlify },
    ],
  },
];

const skillCards = skillGroups.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    groupNumber: group.number,
    groupTitle: group.title,
    groupLabel: group.label,
    tone: group.tone,
  }))
);

export default function SkillsSection() {
  return (
    <section className="skills-orbit" data-skills-orbit>
      <div className="skills-orbit__field" aria-hidden="true" />

      <div className="skills-orbit__copy" data-skills-copy>
        <p className="skills-orbit__eyebrow">02 / Stack técnico</p>

        <h2 className="skills-orbit__title" data-skills-title>
          Stack técnico full stack.
        </h2>

        <p className="skills-orbit__lead" data-skills-lead>
          Mi base más fuerte está en frontend, especialmente construyendo
          interfaces modernas con React, JavaScript, TypeScript y CSS. También
          tengo experiencia práctica conectando productos con APIs, backend
          base, bases de datos, integraciones y herramientas de entrega. Es un
          stack en crecimiento, orientado a construir soluciones funcionales,
          mantenibles y reales.
        </p>
      </div>

      <div
        className="skills-orbit__timeline"
        data-skills-timeline
        aria-hidden="true"
      >
        <div className="skills-orbit__timeline-track">
          <span
            className="skills-orbit__timeline-progress"
            data-skills-progress
          />
        </div>

        <div className="skills-orbit__steps">
          {skillGroups.map((group) => (
            <span
              className="skills-orbit-step"
              data-skills-step
              data-skill-tone={group.tone}
              key={group.title}
            >
              <b>{group.number}</b>
              <strong>{group.title}</strong>
              <small>{group.label}</small>
            </span>
          ))}
        </div>
      </div>

      <div className="skills-orbit__cards" data-skills-cards>
        {skillCards.map(
          ({ name, meta, Icon, groupNumber, groupTitle, tone }, index) => (
            <article
              className="skills-orbit-card"
              data-skill-card
              data-skill-tone={tone}
              key={`${groupTitle}-${name}`}
              style={{ "--skill-index": index }}
            >
              <span className="skills-orbit-card__badge">{groupNumber}</span>

              <span className="skills-orbit-card__icon">
                <Icon />
              </span>

              <span className="skills-orbit-card__body">
                <strong>{name}</strong>
                <small>{meta}</small>
              </span>

              <span className="skills-orbit-card__group">{groupTitle}</span>
            </article>
          )
        )}
      </div>
    </section>
  );
}

