'use client';

import SectionShell from '@/components/core/SectionShell';
import Container from '@/components/core/Container';
import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import { PROJECTS, Project } from '@/data/projects';
import { cn } from '@/lib/cn';
import { useState } from 'react';
import CaseStudyOverlay from './CaseStudyOverlay';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <SectionShell id="projects" data-scene="projects">
            <Container>
                <h2 className="text-3xl font-display font-bold mb-12 text-foreground">Featured Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {PROJECTS.map((project, index) => (
                        <Card
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className={cn(
                                'group flex flex-col justify-end p-8',
                                index === 0 ? 'md:col-span-2 md:row-span-1 lg:col-span-2' : ''
                            )}
                        >
                            <div className="relative z-10 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <Chip key={tag} variant="accent">{tag}</Chip>
                                    ))}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted/80 mt-2 max-w-md">{project.oneLiner}</p>
                                </div>
                            </div>

                            {/* Abstract decorative bg for placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/80 to-transparent z-0" />
                        </Card>
                    ))}
                </div>

                <CaseStudyOverlay
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                    project={selectedProject}
                />
            </Container>
        </SectionShell>
    );
}
