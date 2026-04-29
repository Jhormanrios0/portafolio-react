const markerOffsets = ["0px", "-7px", "9px", "-9px", "7px", "0px"];

export default function SectionBlock({ section, index = 0, children }) {
  const markerShift = markerOffsets[index % markerOffsets.length];

  return (
    <section
      className={`timeline-section section--${section.id}`}
      id={section.id}
      data-section={section.id}
      style={{ "--marker-shift": markerShift }}
    >
      <div className="timeline-section__marker-wrap">
        <div className="timeline-section__marker">
          <i className="timeline-section__marker-pulse" aria-hidden="true" />
          <span>{section.index}</span>
        </div>
      </div>

      <article className="section-card">
        <p className="section-card__eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        {children}
      </article>
    </section>
  );
}
