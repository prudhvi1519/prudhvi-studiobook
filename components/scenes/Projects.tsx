'use client';

import SectionShell from '../core/SectionShell';
import Container from '../core/Container';
import SceneWrapper from '../core/SceneWrapper';
import Card from '../ui/Card';
import Tag from '../ui/Tag';
import { PROJECTS, Project } from '../../data/projects';
import { useState } from 'react';
import CaseStudyOverlay from './CaseStudyOverlay';
import { cn } from '../../lib/cn';
import { useCursor } from '../core/cursor/useCursor';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { setLabel, setActive, setMode, reset } = useCursor();

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCardEnter = () => {
        setActive(true);
        setMode('label');
        setLabel('View');
    };

    const handleCardLeave = () => {
        reset();
    };

    return (
        <SceneWrapper id="projects-wrapper" scrubLength={1000}>
            {(progress) => (
                <div className="relative min-h-screen bg-background z-10 py-20">
                    <SectionShell id="projects" data-scene="projects">
                        <Container>
                            <h2 className="text-4xl font-display font-bold mb-12 text-foreground">
                                Selected Works
                            </h2>

                            {/* Bento Grid: Hero (span-2) + Others */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
                                {PROJECTS.map((project, index) => {
                                    const isHero = index === 0;
                                    return (
                                        <Card
                                            key={project.id}
                                            onClick={() => handleProjectClick(project)}
                                            onMouseEnter={handleCardEnter}
                                            onMouseLeave={handleCardLeave}
                                            className={cn(
                                                "group relative overflow-hidden flex flex-col justify-end p-6 transition-all duration-500 hover:border-accent/40 cursor-pointer",
                                                isHero ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
                                            )}
                                            id={`project-card-${project.id}`}
                                        >
                                            {/* Background Image / Gradient Placeholder */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500 z-0" />

                                            {/* Content */}
                                            <div className="relative z-20 transform transition-transform duration-300 group-hover:-translate-y-2">
                                                <div className="mb-2 flex flex-wrap gap-2">
                                                    {project.tags.slice(0, 3).map(tag => (
                                                        <Tag key={tag} className={isHero ? "bg-accent/20 text-accent border-accent/20" : ""}>
                                                            {tag}
                                                        </Tag>
                                                    ))}
                                                </div>
                                                <h3 className={cn("font-bold text-foreground mb-1", isHero ? "text-3xl" : "text-xl")}>
                                                    {project.title}
                                                </h3>
                                                <p className="text-muted text-sm line-clamp-2">
                                                    {project.oneLiner}
                                                </p>
                                            </div>

                                            {/* Action Hint */}
                                            <div className="absolute bottom-6 right-6 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <span className="text-xs font-mono text-accent uppercase tracking-wider">View Case</span>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </Container>
                    </SectionShell>
                    <CaseStudyOverlay
                        isOpen={!!selectedProject}
                        onClose={() => setSelectedProject(null)}
                        project={selectedProject}
                    />
                </div>
            )}
        </SceneWrapper>
    );
}
