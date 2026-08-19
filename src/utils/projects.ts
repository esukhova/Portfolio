import data from '@/data/projects.json'
import {ProjectType, ProjectCategory} from "@/types/Project.type";

const projects = data as ProjectType[];

export const getProjects = (category?: ProjectCategory): ProjectType[] =>
    category ? projects.filter(p => p.category === category) : projects;