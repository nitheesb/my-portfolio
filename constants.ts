
import { Project, Service, SkillCategory } from './types';
import { 
  ShieldCheck, 
  Activity,
  Layers,
  Cloud,
  Server,
  Zap,
  Code,
  Database,
  Lock,
  Home,
  Briefcase,
  Terminal,
  Cpu,
  Mail,
  Github,
  Linkedin,
  FileText
} from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    id: "LOG_2023_PRESENT",
    role: "DevOps Team Lead",
    company: "Rabbit Care",
    period: "Mar 2023 - Present",
    tags: ["GCP", "GKE", "Terraform", "Helm"],
    description: {
      mission: "Scale infrastructure for Thailand’s leading insurance marketplace.",
      execution: "Orchestrated GKE migration and implemented automated rightsizing policies. Designed Disaster Recovery (DR) protocols.",
      outcome: "Slashed GCP bills by 18%, achieved 99.99% uptime, and reduced incident response time by 30%."
    },
    stats: [
      { label: "SAVINGS", value: "18%", color: "#00f2ff" },
      { label: "UPTIME", value: "99.99%", color: "#00ff00" },
      { label: "RESPONSE", value: "-30%", color: "#ff5e00" }
    ],
    colSpan: "md:col-span-2" // Bento Feature Card
  },
  {
    id: "LOG_2022_2023",
    role: "DevOps Engineer",
    company: "Brikl",
    period: "May 2022 - Jan 2023",
    tags: ["AWS", "Landing Zones", "GitHub Actions"],
    description: {
      mission: "Stabilize microservices deployments.",
      execution: "Built AWS Landing Zones using Terraform. Standardized CI/CD pipelines to enforce testing gates before production.",
      outcome: "Reduced deployment failure rate by 60% and secured the platform."
    },
    stats: [
      { label: "ERRORS", value: "-60%", color: "#ff5e00" },
      { label: "STACK", value: "AWS", color: "#171717" }
    ],
    colSpan: "md:col-span-1"
  },
  {
    id: "LOG_2021_2022",
    role: "DevOps Engineer",
    company: "Intertrust",
    period: "Aug 2021 - Apr 2022",
    tags: ["AWS", "Terraform", "REST API"],
    description: {
      mission: "Enable rapid environment provisioning.",
      execution: "Automated AWS infrastructure with Terraform for spin-up/down capability.",
      outcome: "Boosted reliability and uptime while significantly reducing manual provisioning time."
    },
    stats: [
      { label: "SCALE", value: "HIGH", color: "#ff5e00" },
      { label: "IAC", value: "100%", color: "#00f2ff" }
    ],
    colSpan: "md:col-span-1"
  },
  {
    id: "LOG_2020_2021",
    role: "DevOps Engineer",
    company: "BYJU'S",
    period: "Dec 2020 - Aug 2021",
    tags: ["AWS", "ECS", "GCP DR"],
    description: {
      mission: "Support massive scale EdTech workloads.",
      execution: "Orchestrated large-scale ECS container workloads. Created GCP replicas of key production services.",
      outcome: "Tuned cloud resources to drive high performance."
    },
    stats: [
      { label: "SCALE", value: "MASSIVE", color: "#ff5e00" },
      { label: "TYPE", value: "EDTECH", color: "#171717" }
    ],
    colSpan: "md:col-span-2"
  },
  {
    id: "LOG_2016_2020",
    role: "DevOps Engineer",
    company: "Binfex Tech",
    period: "Sep 2016 - Dec 2020",
    tags: ["Jenkins", "Nagios", "Splunk"],
    description: {
      mission: "Design highly available CI/CD pipelines.",
      execution: "Implemented Jenkins pipelines and automated monitoring/alerting.",
      outcome: "Ensured zero-downtime operations."
    },
    stats: [
      { label: "EXP", value: "4 YRS", color: "#00f2ff" },
      { label: "CI/CD", value: "JENKINS", color: "#171717" }
    ],
    colSpan: "md:col-span-1"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "CLOUD INFRASTRUCTURE",
    items: [
      { name: "AWS", level: 95 },
      { name: "Google Cloud", level: 90 },
      { name: "Azure", level: 75 },
      { name: "Hybrid Cloud", level: 85 }
    ]
  },
  {
    category: "CONTAINER ORCHESTRATION",
    items: [
      { name: "Kubernetes (GKE/EKS)", level: 98 },
      { name: "Docker", level: 95 },
      { name: "Helm Charts", level: 92 },
      { name: "Istio Service Mesh", level: 80 }
    ]
  },
  {
    category: "INFRASTRUCTURE AS CODE",
    items: [
      { name: "Terraform", level: 95 },
      { name: "Ansible", level: 85 },
      { name: "CloudFormation", level: 80 },
      { name: "Pulumi", level: 70 }
    ]
  },
  {
    category: "CI/CD & AUTOMATION",
    items: [
      { name: "GitHub Actions", level: 95 },
      { name: "Jenkins", level: 90 },
      { name: "ArgoCD (GitOps)", level: 92 },
      { name: "GitLab CI", level: 88 }
    ]
  },
  {
    category: "OBSERVABILITY",
    items: [
      { name: "Prometheus", level: 90 },
      { name: "Grafana", level: 90 },
      { name: "NewRelic", level: 85 },
      { name: "ELK Stack", level: 80 }
    ]
  },
  {
    category: "LANGUAGES & SCRIPTING",
    items: [
      { name: "Python", level: 90 },
      { name: "Bash/Shell", level: 95 },
      { name: "Go", level: 75 },
      { name: "SQL", level: 80 }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: "SVC_CLOUD_ARCH",
    title: "Cloud Architecture",
    icon: Cloud,
    description: "Designing resilient, scalable, and cost-efficient cloud environments on AWS, GCP, or Azure.",
    features: ["Migration Strategy", "Multi-Cloud Design", "High Availability", "Disaster Recovery"]
  },
  {
    id: "SVC_K8S",
    title: "Kubernetes Ops",
    icon: Server,
    description: "Production-grade Kubernetes management. From cluster zero to service mesh hero.",
    features: ["Cluster Hardening", "Helm Management", "Istio/Linkerd", "Auto-scaling"]
  },
  {
    id: "SVC_CICD",
    title: "CI/CD Automation",
    icon: Zap,
    description: "Building zero-touch deployment pipelines that ship code from commit to production in minutes.",
    features: ["GitOps (ArgoCD)", "Automated Testing", "Canary Deployments", "Secret Management"]
  },
  {
    id: "SVC_IAC",
    title: "Infrastructure as Code",
    icon: Code,
    description: "Codifying your entire stack. Immutable infrastructure that prevents drift and enables rapid recovery.",
    features: ["Terraform Modules", "State Management", "Policy as Code", "Drift Detection"]
  },
  {
    id: "SVC_FINOPS",
    title: "Cost Optimization",
    icon: Database,
    description: "Analyzing and reducing cloud spend without compromising on performance or reliability.",
    features: ["Spot Instances", "Resource Rightsizing", "Budget Alerts", "Reserved Instances"]
  },
  {
    id: "SVC_SEC",
    title: "DevSecOps",
    icon: Lock,
    description: "Embedding security into every stage of the lifecycle. Shift-left security for modern stacks.",
    features: ["Container Scanning", "Compliance Checks", "IAM Hardening", "Network Policies"]
  },
  {
    id: "SVC_IOT",
    title: "IoT Systems",
    icon: Cpu,
    description: "Architecting reliable backends for large-scale IoT networks with real-time data processing.",
    features: ["MQTT Brokers", "Edge Computing", "Device Management", "Real-time Telemetry"]
  }
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

export const TECH_STACK = [
  "Kubernetes",
  "Terraform",
  "AWS",
  "Google Cloud",
  "Docker",
  "Python",
  "Go",
  "Jenkins",
  "ArgoCD",
  "Prometheus",
  "Grafana",
  "Ansible",
  "Linux",
  "GitOps"
];

export const DOCK_ITEMS = [
  { icon: Home, label: 'Home', href: '#hero' },
  { icon: Cpu, label: 'Skills', href: '#skills' },
  { icon: Briefcase, label: 'Projects', href: '#projects' },
  { icon: Cloud, label: 'Services', href: '#services' },
  { icon: Mail, label: 'Contact', href: 'mailto:nitheesbalaji@gmail.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/nitheesb', external: true },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/nithees-balaji', external: true },
  { icon: FileText, label: 'Resume', href: 'https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing', external: true },
];
