import { skills } from "../../data/skills";

export default function SkillsSection() {
  return (
    <div className="skills-grid">
      {skills.map((skill) => (
        <span className="skill-pill timeline-reveal" key={skill}>
          {skill}
        </span>
      ))}
    </div>
  );
}


