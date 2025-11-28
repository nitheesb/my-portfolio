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

export interface Skill {
  name: string;
  icon: string;
}

export interface TerminalCommand {
  cmd: string;
  output: string;
  color?: string;
}

export enum SectionId {
  HERO = 'hero',
  STATS = 'stats',
  STACK = 'stack',
  PHILOSOPHY = 'philosophy',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}