export interface Project {
  id: string;
  role: string;
  company: string;
  period: string;
  tags: string[];
  description: {
    mission: string;
    execution: string;
    outcome: string;
  };
  stats: {
    label: string;
    value: string;
    color: string;
  }[];
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    level: number; // 1-100
  }[];
}

export interface Service {
  id: string;
  title: string;
  icon: any; // LucideIcon
  description: string;
  features: string[];
}

export interface TerminalCommand {
  cmd: string;
  output: string;
  color?: string;
}

export enum SectionId {
  HERO = 'hero',
  STATS = 'stats',
  SERVICES = 'services',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  PHILOSOPHY = 'philosophy',
  CONTACT = 'contact'
}