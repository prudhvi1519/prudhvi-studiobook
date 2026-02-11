'use client';

import SectionShell from '../core/SectionShell';
import Container from '../core/Container';
import SceneWrapper from '../core/SceneWrapper';
import Card from '../ui/Card';
import Chip from '../ui/Chip';
import { PROJECTS } from '../../data/projects';
import { useState } from 'react';
import CaseStudyOverlay from './CaseStudyOverlay';
import { Project } from '../../data/projects';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <SceneWrapper id="projects-wrapper" scrubLength={1000}>
            {(progress) => (
                <div className="relative min-h-screen bg-background z-10">
                    <SectionShell id="projects" data-scene="projects">
                        <Container>
                            <h2 className="text-3xl font-display font-bold mb-12 text-foreground">Selected Works</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {PROJECTS.map((project) => (
                                    <Card
                                        key={project.id}
                                        onClick={() => setSelectedProject(project)}
                                        className="group"
                                    >
                                        <div className="aspect-video bg-panel rounded-lg mb-4 overflow-hidden border border-white/5">
                                            {/* Image placeholder */}
                                            <div className="w-full h-full bg-white/5 group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-muted mb-4 line-clamp-2">
                                            {project.oneLiner}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <Chip key={tag} variant="outline" className="text-[10px]">
                                                    {tag}
                                                </Chip>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
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
