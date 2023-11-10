import { Experience } from "./experience";
import { Project } from "./project";

export interface Candidate {
    id? : number;
    name: string;
    surname: string;
    email: string;
    age?: number;
    phone?: string;
    linkedIn?: string;
    experience: Experience;
    previousProjects: Project[];
}
