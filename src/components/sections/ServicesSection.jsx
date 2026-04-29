import { services } from "../../data/services";

export default function ServicesSection() {
  return (
    <div className="cards-grid">
      {services.map((service) => (
        <article className="mini-card timeline-reveal" key={service.title}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </article>
      ))}
    </div>
  );
}
