import React from 'react';
import { DATA } from '../data/resume';

interface TerminalOutputProps {
    command: string;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ command }) => {

    const renderOutput = () => {
        const cmd = command.trim().toLowerCase();

        switch (cmd) {
            case 'help':
                return (
                    <div className="cmd-output">
                        <p className="section-heading">Available Commands</p>
                        <div className="help-grid">
                            {['about', 'skills', 'projects', 'hackathons', 'education', 'contact', 'clear'].map(c => (
                                <div key={c} className="help-item">$ {c}</div>
                            ))}
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '12px' }}>
                            Type any command and press Enter.
                        </p>
                    </div>
                );

            case 'about':
                return (
                    <div className="cmd-output">
                        <div className="about-name">{DATA.name}</div>
                        <div className="about-location">{DATA.location}</div>
                        <p className="about-desc">{DATA.description}</p>
                        <p className="about-summary">{DATA.summary}</p>
                    </div>
                );

            case 'skills':
                return (
                    <div className="cmd-output">
                        <p className="section-heading">Technical Skills</p>
                        <div className="skills-grid">
                            {DATA.skills.map((skill, i) => (
                                <span key={i} className="skill-badge">{skill}</span>
                            ))}
                        </div>
                    </div>
                );

            case 'projects':
                return (
                    <div className="cmd-output">
                        <p className="section-heading">Projects</p>
                        <div className="card-list">
                            {DATA.projects.map((project, i) => (
                                <div key={i} className="card">
                                    <div className="card-header">
                                        <span className="card-title">▶ {project.title}</span>
                                        <span className="card-date">{project.dates}</span>
                                    </div>
                                    <p className="card-desc">{project.description}</p>
                                    <div className="card-stack">
                                        <span className="stack-label">Tech:</span>
                                        {project.technologies.map((t, ti) => (
                                            <span key={ti} className="stack-tag">{t}</span>
                                        ))}
                                    </div>
                                    <a href={project.link} target="_blank" rel="noreferrer" className="card-link">
                                        ↗ View Source
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'hackathons':
                return (
                    <div className="cmd-output">
                        <p className="section-heading">Hackathons</p>
                        <div className="card-list">
                            {DATA.hackathons.map((h, i) => (
                                <div key={i} className="card">
                                    <div className="card-header">
                                        <span className="card-title">🏆 {h.title}</span>
                                        <span className="card-date">{h.dates}</span>
                                    </div>
                                    <p className="card-desc">{h.description}</p>
                                    <a href={h.link} target="_blank" rel="noreferrer" className="card-link">
                                        ↗ View Project
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'education':
                return (
                    <div className="cmd-output">
                        <p className="section-heading">Education</p>
                        <div className="edu-card">
                            {DATA.education.map((edu, i) => (
                                <div key={i}>
                                    <div className="edu-school">{edu.school}</div>
                                    <div className="edu-degree">{edu.degree}</div>
                                    <div className="edu-years">{edu.start} — {edu.end}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div className="cmd-output">
                        <p className="section-heading">Contact</p>
                        <div className="contact-list">
                            <div className="contact-item">
                                <span className="contact-label">email</span>
                                <a href={`mailto:${DATA.contact.email}`} className="contact-link">{DATA.contact.email}</a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">phone</span>
                                <span className="contact-value">{DATA.contact.tel}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">github</span>
                                <a href={DATA.contact.social.GitHub} target="_blank" rel="noreferrer" className="contact-link">{DATA.contact.social.GitHub}</a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">twitter (X)</span>
                                <a href={DATA.contact.social.X} target="_blank" rel="noreferrer" className="contact-link">{DATA.contact.social.X}</a>
                            </div>
                        </div>
                    </div>
                );

            case '':
                return null;

            default:
                return (
                    <div className="cmd-output">
                        <p className="cmd-error">
                            command not found: <span>{command}</span>. Type <span>'help'</span> to see available commands.
                        </p>
                    </div>
                );
        }
    };

    return <>{renderOutput()}</>;
};
