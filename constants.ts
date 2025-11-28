import { Project } from './types';
import { 
  Cloud, 
  Container, 
  Code2, 
  Terminal, 
  ShieldCheck, 
  Activity,
  Layers,
  Cpu
} from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    id: "LOG_2023_PRESENT",
    role: "Team Lead",
    company: "Rabbit Care",
    period: "2023 - Present",
    tags: ["GCP", "GKE", "Cost Optimization"],
    description: {
      mission: "Scale infrastructure for Thailand’s leading insurance marketplace while controlling budget bleed.",
      execution: "Orchestrated GKE migration and implemented automated rightsizing policies. Designed Disaster Recovery (DR) protocols.",
      outcome: "Slashed GCP bills by 18%, achieved 99.99% availability, and mentored the junior DevOps squad."
    },
    stats: [
      { label: "SAVINGS", value: "18%", color: "#00f2ff" },
      { label: "ROLE", value: "LEAD", color: "#ffffff" },
      { label: "STATUS", value: "ACTIVE", color: "#00ff00" }
    ]
  },
  {
    id: "LOG_2022_2023",
    role: "DevOps Engineer",
    company: "Brikl",
    period: "2022 - 2023",
    tags: ["AWS", "Landing Zones", "GitHub Actions"],
    description: {
      mission: "Stabilize microservices deployments and secure the AWS perimeter.",
      execution: "Built AWS Landing Zones using Terraform. Standardized CI/CD pipelines to enforce testing gates before production.",
      outcome: "Reduced deployment failure rate by 60% and secured the platform against common vulnerabilities."
    },
    stats: [
      { label: "ERRORS", value: "-60%", color: "#ff5e00" },
      { label: "STACK", value: "AWS", color: "#ffffff" },
      { label: "STATUS", value: "ARCHIVED", color: "#666666" }
    ]
  },
  {
    id: "LOG_2020_2022",
    role: "DevOps Engineer",
    company: "Intertrust & BYJU'S",
    period: "2020 - 2022",
    tags: ["ECS", "Python", "Large Scale"],
    description: {
      mission: "Support massive scale EdTech and Security workloads.",
      execution: "Managed ECS-based container workloads and automated environment spin-ups using Python & Terraform.",
      outcome: "Enabled rapid environment provisioning for development teams, reducing wait times from days to minutes."
    },
    stats: [
      { label: "SCALE", value: "HIGH", color: "#ff5e00" },
      { label: "TYPE", value: "CONTAINER", color: "#ffffff" },
      { label: "STATUS", value: "ARCHIVED", color: "#666666" }
    ]
  }
];

export const TECH_STACK = [
  "KUBERNETES", "GCP", "AWS", "TERRAFORM", "HELM", "ARGOCD", 
  "GITHUB ACTIONS", "PYTHON", "PROMETHEUS", "ISTIO", "DOCKER", "LINUX"
];

export const PHILOSOPHY_CARDS = [
  {
    title: "Immutable Infrastructure",
    icon: Layers,
    desc: "Treating infrastructure as software. Servers are never patched manually; they are replaced. Full version control over the entire stack."
  },
  {
    title: "Shift-Left Security",
    icon: ShieldCheck,
    desc: "Security isn't an afterthought. Compliance checks, vulnerability scanning, and policy enforcement happen before deployment, not after."
  },
  {
    title: "Observability First",
    icon: Activity,
    desc: "If you can't measure it, you can't improve it. Deep instrumentation with Prometheus and Grafana to guarantee the four golden signals."
  }
];

export const COST_DATA = [
  { name: 'Jan', cost: 100 },
  { name: 'Feb', cost: 95 },
  { name: 'Mar', cost: 92 },
  { name: 'Apr', cost: 88 },
  { name: 'May', cost: 85 },
  { name: 'Jun', cost: 82 },
];
