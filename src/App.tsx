import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  MonitorCog,
  Moon,
  Network,
  ServerCog,
  Sparkles,
  SunMedium,
  TerminalSquare,
  X,
} from 'lucide-react';
import { useThemeContext } from './context/ThemeContext';
import { GitHubFeatured } from './components/GitHubFeatured/GitHubFeatured';
import { profile, experience, projects, skills, certifications, education, publication, algorithms, navItems } from './data/profile';

const themeOptions = ['dark', 'light', 'system'] as const;
type ThemeMode = (typeof themeOptions)[number];

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const { theme, setTheme } = useThemeContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const headingText = useMemo(() => ['Backend Engineering', 'Full-Stack Development', 'AI Integrations', 'Problem Solving'], []);

  return (
    <div className="theme-app min-h-screen bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.08),_transparent_35%)] text-[var(--text-primary)] transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--surface-strong)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--surface-strong)]/70">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <button className="font-mono text-lg font-semibold tracking-[0.22em] text-[var(--text-primary)]" onClick={() => scrollToSection('home')}>SAGNIK</button>
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft-strong)]">
              View Resume
              <ArrowRight size={16} />
            </a>
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] lg:hidden" onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Toggle navigation">
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-strong)]/95 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
              {navItems.map((item) => (
                <button key={item.id} className="text-left text-sm text-[var(--text-muted)]" onClick={() => scrollToSection(item.id)}>{item.label}</button>
              ))}
              <div className="flex items-center justify-between gap-3 pt-2">
                <ThemeSwitcher theme={theme} setTheme={setTheme} compact />
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent)]">Resume</a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="home" className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/70 px-6 py-8 shadow-soft sm:px-8 lg:px-10 lg:py-12">
          <div className="absolute inset-0 bg-grid bg-[size:32px_32px] opacity-30" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-200">
                <Sparkles size={14} />
                Available for backend & full-stack roles
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                SAGNIK DUTTA
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-base text-slate-300 sm:text-lg">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Software Engineer</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Backend • Full Stack • AI</span>
              </div>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Building systems with <span className="font-medium text-slate-100">Java</span>, <span className="font-medium text-slate-100">Spring Boot</span>, <span className="font-medium text-slate-100">React</span>, and <span className="font-medium text-slate-100">AI</span>.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => scrollToSection('projects')} className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-300">View Projects <ArrowRight size={16} /></button>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-400/40 hover:bg-sky-500/10"><Download size={16} /> Download Resume</a>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-5 py-3 text-sm font-medium text-sky-100 transition hover:bg-sky-500/20"><ExternalLink size={16} /> View Resume</a>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-sky-950/20">
                <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">terminal</span>
                </div>
                <div className="space-y-4 font-mono text-sm text-slate-200">
                  <div className="flex gap-3"><span className="text-sky-300">$</span><span className="text-slate-100">whoami</span></div>
                  <div className="pl-4 text-slate-300">Sagnik Dutta</div>
                  <div className="flex gap-3"><span className="text-sky-300">$</span><span className="text-slate-100">focus</span></div>
                  <ul className="space-y-2 pl-4 text-slate-300">
                    {headingText.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionHeader title="Developer metrics" eyebrow="Signals" />
        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {profile.metrics.map((metric) => (
            <motion.div key={metric.label} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionFade} transition={{ duration: 0.45 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <div className="font-mono text-3xl font-semibold text-sky-200">{metric.value}</div>
              <div className="mt-3 text-sm uppercase tracking-[0.18em] text-slate-400">{metric.label}</div>
            </motion.div>
          ))}
        </section>

        <SectionHeader title="Profile" eyebrow="About me & principles" />
        <section id="about" className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionFade} transition={{ duration: 0.45 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-7">
            <div className="flex items-center gap-3 text-sky-200"><MonitorCog size={18} /> <span className="text-sm uppercase tracking-[0.18em]">About me</span></div>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              I’m a backend-focused software engineer with hands-on experience in <span className="text-slate-100">Java</span>, <span className="text-slate-100">Spring Boot</span>, and <span className="text-slate-100">Hibernate</span>, paired with product-minded full-stack work in <span className="text-slate-100">React</span> and AI integrations.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              I enjoy turning ambiguous problems into dependable software — clarifying the backend contract, delivering the implementation, and validating it with a clear feedback loop.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionFade} transition={{ duration: 0.5 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-7">
            <div className="flex items-center gap-3 text-sky-200"><Code2 size={18} /> <span className="text-sm uppercase tracking-[0.18em]">Engineering principles</span></div>
            <ul className="mt-5 space-y-4 text-slate-300">
              {[
                'Reliability — Build systems that behave predictably.',
                'Clean Architecture — Keep APIs, services, and data flows understandable.',
                'Practical Engineering — Choose solutions that solve the actual problem.',
                'Continuous Improvement — Improve through building, testing, debugging, and feedback.',
              ].map((item) => (
                <li key={item} className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-300" />{item}</li>
              ))}
            </ul>
          </motion.div>
        </section>

        <SectionHeader title="How I build software" eyebrow="Workflow" />
        <section className="mt-12">
          <WorkflowTimeline />
        </section>

        <div className="mt-16">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-200">Stack</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="mt-5">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">THE STACK</h2>
            <p className="mt-2 max-w-2xl text-base text-slate-300">Technologies I use to build backend, full-stack and AI applications.</p>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-400">A simplified view of my core tech ecosystem.</p>
          </div>
        </div>
        <section className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <TheStack />
        </section>

        <SectionHeader title="Experience" eyebrow="Career" />
        <section id="experience" className="mt-12 space-y-6">
          {experience.map((job) => (
            <ExperienceCard key={job.company + job.role} job={job} />
          ))}
        </section>

        <SectionHeader title="Featured projects" eyebrow="Builds" />
        <section id="projects" className="mt-12 grid gap-6 xl:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </section>

        <SectionHeader title="Code playground" eyebrow="Problem solving" />
        <section className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <CodePlayground />
        </section>

        <SectionHeader title="Featured on GitHub" eyebrow="Code" />
        <section id="github" className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <p className="mb-5 text-sm text-slate-300">Projects and repositories I&apos;ve chosen to showcase.</p>
          <GitHubFeatured />
        </section>

        <SectionHeader title="Problem solving" eyebrow="LeetCode" />
        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-7">
            <div className="font-mono text-3xl font-semibold text-sky-200">300+</div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">Problems solved</div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Dynamic Programming', 'Union-Find', 'Monotonic Stack'].map((topic) => (
                <div key={topic} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-sm text-slate-300">{topic}</div>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="font-mono text-xl text-sky-200">{algorithms.find((a) => a.name === topic)?.count ?? '—'}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Topic</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-7">
            <div className="flex items-center justify-between"><span className="text-slate-400">50-Day streak</span><span className="font-mono text-xl text-sky-200">50</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">100-Day streak</span><span className="font-mono text-xl text-sky-200">100</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">2024–25</span><span className="font-mono text-xl text-sky-200">badge</span></div>
          </div>
        </section>

        <SectionHeader title="Education" eyebrow="Academics" />
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          {education.map((item) => (
            <div key={item.institution} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <div className="flex items-center gap-3 text-sky-200"><GraduationCap size={18} /> <span className="text-sm uppercase tracking-[0.18em]">{item.period}</span></div>
              <h3 className="mt-4 text-xl font-semibold text-white">{item.institution}</h3>
              <p className="mt-2 text-slate-300">{item.degree}</p>
              <p className="mt-2 text-sm text-slate-400">{item.location}</p>
            </div>
          ))}
        </section>

        <SectionHeader title="Certifications" eyebrow="Learning" />
        <section className="mt-12 flex flex-wrap gap-3">
          {certifications.map((cert) => (
            <div key={cert} className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-200">{cert}</div>
          ))}
        </section>

        <SectionHeader title="Publication" eyebrow="Writing" />
        <section className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div>
              <h3 className="text-xl font-semibold text-white">{publication.title}</h3>
              <p className="mt-2 text-slate-300">{publication.journal} • {publication.date}</p>
            </div>
            <a href={publication.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sky-200">View paper <ExternalLink size={16} /></a>
          </div>
        </section>

        <SectionHeader title="Technical skills" eyebrow="Stack" />
        <section id="skills" className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.title}>
                <div className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-400">{group.title}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <button key={item} className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-sm text-sky-100 transition hover:bg-sky-500/20">{item}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionHeader title="Contact" eyebrow="Reach out" />
        <section id="contact" className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-white">Let’s build something useful.</h3>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">Interested in backend engineering, full-stack development, or AI-powered systems?</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-3 text-sm font-medium text-slate-950"><Mail size={16} /> Email Me</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100"><Linkedin size={16} /> LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100"><Github size={16} /> GitHub</a>
          </div>
        </section>
      </main>

      <button onClick={() => setTerminalOpen(true)} aria-label="Open developer terminal" className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/40 bg-slate-900/80 text-sky-200 shadow-lg shadow-sky-950/40 backdrop-blur-md"><TerminalSquare size={18} /></button>

      {terminalOpen && <DeveloperTerminal onClose={() => setTerminalOpen(false)} />}
    </div>
  );
}

function ThemeSwitcher({ theme, setTheme, compact = false }: { theme: ThemeMode; setTheme: (value: ThemeMode) => void; compact?: boolean }) {
  const currentIcon = theme === 'dark' ? <Moon size={16} /> : theme === 'light' ? <SunMedium size={16} /> : <MonitorCog size={16} />;

  return (
    <div className={`flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 ${compact ? 'text-xs' : ''}`}>
      {themeOptions.map((option) => (
        <button
          key={option}
          aria-label={`Set theme to ${option}`}
          onClick={() => setTheme(option)}
          className={`inline-flex items-center gap-2 rounded-full px-2 py-1.5 capitalize transition ${theme === option ? 'bg-sky-400 text-slate-950' : 'text-slate-300'}`}
        >
          {compact ? option.slice(0, 1).toUpperCase() : option}
          {theme === option && currentIcon}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <div className="mt-16 flex items-center gap-4 min-w-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-200">{eyebrow}</span>
      <div className="h-px flex-1 bg-white/10" />
      <h2 className="text-[clamp(1.7rem,4vw,3rem)] font-semibold tracking-tight text-white">{title}</h2>
    </div>
  );
}

function WorkflowTimeline() {
  const steps = [
    { no: '01', title: 'Understand', detail: 'Requirements & problem definition' },
    { no: '02', title: 'Design', detail: 'Architecture & API design' },
    { no: '03', title: 'Build', detail: 'Java, Spring Boot, React' },
    { no: '04', title: 'Test', detail: 'Postman & automated checks' },
    { no: '05', title: 'Ship', detail: 'Git, Jenkins, CI/CD' },
    { no: '06', title: 'Iterate', detail: 'Debug, review, improve' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {steps.map((step, index) => (
        <div key={step.no} className="relative flex flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-5">
          <div className="mb-4 flex items-center justify-between text-sky-200">
            <span className="font-mono text-xl">{step.no}</span>
            {index < steps.length - 1 && <ChevronRight size={16} />}
          </div>
          <div className="text-lg font-semibold text-white">{step.title}</div>
          <div className="mt-2 text-sm text-slate-300">{step.detail}</div>
        </div>
      ))}
    </div>
  );
}

function TheStack() {
  const [selectedTech, setSelectedTech] = useState('Spring Boot');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const technologies = [
    { name: 'Java', category: 'Languages', orbit: 2, angle: 0.08, accent: 'teal', description: 'Backend services and enterprise application logic.', usedIn: ['AI Email Writer', 'Capgemini Fellowship'], related: ['Spring Boot', 'Hibernate', 'REST APIs'] },
    { name: 'JavaScript', category: 'Languages', orbit: 2, angle: 1.35, accent: 'blue', description: 'Interactive frontend logic and product experiences.', usedIn: ['Resumind'], related: ['React', 'CSS', 'Node.js'] },
    { name: 'SQL', category: 'Languages', orbit: 2, angle: 2.7, accent: 'teal', description: 'Relational query work and data modeling.', usedIn: ['Capgemini Fellowship'], related: ['MySQL', 'PostgreSQL'] },
    { name: 'C', category: 'Languages', orbit: 2, angle: 4.15, accent: 'teal', description: 'Problem solving and algorithmic implementation work.', usedIn: ['Problem solving'], related: ['Java', 'Data structures'] },
    { name: 'React', category: 'Frontend', orbit: 2, angle: 0.75, accent: 'blue', description: 'Frontend interfaces for product and dashboard experiences.', usedIn: ['AI Email Writer', 'Resumind'], related: ['JavaScript', 'HTML', 'CSS'] },
    { name: 'HTML', category: 'Frontend', orbit: 2, angle: 2.2, accent: 'blue', description: 'Semantic structure for web interfaces and content layout.', usedIn: ['Portfolio'], related: ['CSS', 'React'] },
    { name: 'CSS', category: 'Frontend', orbit: 2, angle: 3.8, accent: 'blue', description: 'Responsive styling, layout and product polish.', usedIn: ['Portfolio', 'Resumind'], related: ['React', 'HTML'] },
    { name: 'Spring Boot', category: 'Backend', orbit: 2, angle: 5.3, accent: 'purple', description: 'Backend framework used for REST APIs and service development.', usedIn: ['AI Email Writer', 'Capgemini Fellowship'], related: ['REST APIs', 'Hibernate', 'Maven'] },
    { name: 'Hibernate', category: 'Backend', orbit: 2, angle: 5.8, accent: 'purple', description: 'Persistence layer support for Java-based data access patterns.', usedIn: ['Capgemini Fellowship'], related: ['Spring Boot', 'MySQL', 'PostgreSQL'] },
    { name: 'REST APIs', category: 'Backend', orbit: 2, angle: 0.4, accent: 'purple', description: 'API-driven communication between interfaces and services.', usedIn: ['AI Email Writer'], related: ['Spring Boot', 'Postman'] },
    { name: 'Node.js', category: 'Backend', orbit: 2, angle: 4.85, accent: 'purple', description: 'JavaScript runtime support for lightweight backend tooling.', usedIn: ['Portfolio tooling'], related: ['JavaScript', 'Git'] },
    { name: 'MySQL', category: 'Databases', orbit: 1, angle: 0.7, accent: 'violet', description: 'Structured relational data storage for application data.', usedIn: ['Capgemini Fellowship'], related: ['SQL', 'Spring Boot', 'Hibernate'] },
    { name: 'PostgreSQL', category: 'Databases', orbit: 1, angle: 2.2, accent: 'violet', description: 'Relational persistence and data-driven application work.', usedIn: ['Projects'], related: ['SQL', 'Spring Boot'] },
    { name: 'MongoDB', category: 'Databases', orbit: 1, angle: 3.7, accent: 'violet', description: 'Flexible document storage for application data needs.', usedIn: ['Full-stack projects'], related: ['Node.js', 'REST APIs'] },
    { name: 'Git', category: 'Tools & DevOps', orbit: 3, angle: 0.3, accent: 'amber', description: 'Version control and collaborative software delivery.', usedIn: ['Project work'], related: ['GitHub', 'VS Code'] },
    { name: 'Postman', category: 'Tools & DevOps', orbit: 3, angle: 1.6, accent: 'amber', description: 'API testing and validation in backend workflows.', usedIn: ['Capgemini Fellowship'], related: ['REST APIs', 'Spring Boot'] },
    { name: 'Jenkins', category: 'Tools & DevOps', orbit: 3, angle: 2.9, accent: 'amber', description: 'CI/CD automation and deployment workflows.', usedIn: ['Capgemini Fellowship'], related: ['Git', 'Spring Boot'] },
    { name: 'VS Code', category: 'Tools & DevOps', orbit: 3, angle: 4.2, accent: 'amber', description: 'Development environment for coding, testing and iteration.', usedIn: ['Daily engineering work'], related: ['Git', 'JavaScript'] },
    { name: 'IntelliJ IDEA', category: 'Tools & DevOps', orbit: 3, angle: 5.5, accent: 'amber', description: 'Java development productivity and backend debugging workflow.', usedIn: ['Java work'], related: ['Spring Boot', 'Java'] },
  ];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      const height = Math.max(320, Math.min(520, rect.width * 0.8));
      setSize({ width: rect.width, height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const selectedTechnology = technologies.find((technology) => technology.name === selectedTech) ?? technologies[7];

  const orbitRadii = {
    1: Math.min(size.width * 0.2, 78),
    2: Math.min(size.width * 0.32, 126),
    3: Math.min(size.width * 0.42, 160),
  };

  const legendItems = ['Languages', 'Frontend', 'Backend', 'Databases', 'Tools & DevOps'];

  return (
    <div className="stack-orbit-layout">
      <div className="stack-orbit-panel" ref={containerRef}>
        <div className="orbit-glow" aria-hidden="true" />
        <svg className="orbit-svg" viewBox={size.width ? `0 0 ${size.width} ${size.height}` : '0 0 500 420'} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <circle cx={size.width / 2 || 250} cy={size.height / 2 || 210} r={orbitRadii[1]} className="orbit-ring orbit-ring--inner" />
          <circle cx={size.width / 2 || 250} cy={size.height / 2 || 210} r={orbitRadii[2]} className="orbit-ring orbit-ring--middle" />
          <circle cx={size.width / 2 || 250} cy={size.height / 2 || 210} r={orbitRadii[3]} className="orbit-ring orbit-ring--outer" />
        </svg>

        <div className="stack-core" aria-label="Core builder">
          <Code2 size={18} />
          <span>CORE</span>
          <small>BUILDER</small>
        </div>

        {technologies.map((technology, index) => {
          const radius = orbitRadii[technology.orbit as keyof typeof orbitRadii] ?? orbitRadii[2];
          const startDegrees = (technology.angle * 180) / Math.PI;
          const duration = 36 + index * 1.8;

          return (
            <div
              key={technology.name}
              className="stack-node-wrap"
              style={{
                ['--orbit-radius' as string]: `${radius}px`,
                ['--orbit-start' as string]: `${startDegrees}deg`,
                ['--orbit-duration' as string]: `${duration}s`,
                ['--orbit-delay' as string]: `${(index % 5) * 0.8}s`,
              }}
            >
              <button
                type="button"
                aria-label={`Select ${technology.name}`}
                className={`stack-node stack-node--${technology.accent} ${selectedTech === technology.name ? 'is-selected' : ''}`}
                onClick={() => setSelectedTech(technology.name)}
              >
                <span className="stack-node__dot" />
                <span>{technology.name}</span>
              </button>
            </div>
          );
        })}

      </div>

      <aside className="stack-detail-panel">
        <div className="stack-detail-header">
          <span className="stack-detail-label">Selected technology</span>
          <h3>{selectedTechnology.name}</h3>
          <p className="stack-detail-category">{selectedTechnology.category}</p>
        </div>

        <p className="stack-detail-text">{selectedTechnology.description}</p>

        <div className="stack-detail-section">
          <span className="stack-detail-section__label">Used in</span>
          <div className="stack-detail-tags">
            {selectedTechnology.usedIn.map((item) => (
              <span key={item} className="stack-detail-tag">{item}</span>
            ))}
          </div>
        </div>

        <div className="stack-detail-section">
          <span className="stack-detail-section__label">Related</span>
          <div className="stack-detail-tags">
            {selectedTechnology.related.map((item) => (
              <span key={item} className="stack-detail-tag stack-detail-tag--soft">{item}</span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function ExperienceCard({ job }: { job: (typeof experience)[number] }) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div layout initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-start justify-between gap-6 text-left">
        <div>
          <div className="flex items-center gap-3 text-sky-200"><Briefcase size={16} /> <span className="text-xs uppercase tracking-[0.18em]">{job.company}</span></div>
          <h3 className="mt-4 text-xl font-semibold text-white">{job.role}</h3>
          <p className="mt-1 text-sm text-slate-300">{job.program}</p>
        </div>
        <div className="text-right text-sm text-slate-400">
          <div>{job.period}</div>
          <div className="mt-1">{job.location}</div>
        </div>
      </button>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-5 overflow-hidden">
          <ul className="space-y-3 text-slate-300">
            {job.details.map((detail) => (
              <li key={detail} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-300" />{detail}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article layout initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400"><Calendar size={12} /> {project.date}</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">{project.category}</div>
      </div>
      <p className="mt-4 text-slate-300">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="rounded-full border border-white/10 bg-slate-950/40 px-2.5 py-1 text-xs text-slate-200">{tech}</span>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">Architecture</div>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
          <span>{project.flow[0]}</span>
          <ChevronRight size={15} />
          <span>{project.flow[1]}</span>
          <ChevronRight size={15} />
          <span>{project.flow[2]}</span>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {project.github && <a href={project.github} className="inline-flex items-center gap-2 text-sm text-sky-200" target="_blank" rel="noreferrer">GitHub <ExternalLink size={14} /></a>}
        {project.live && <a href={project.live} className="inline-flex items-center gap-2 text-sm text-sky-200" target="_blank" rel="noreferrer">Live Demo <ExternalLink size={14} /></a>}
        <button onClick={() => setOpen(true)} className="ml-auto inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-2 text-sm text-sky-100">Explore Project <ArrowRight size={14} /></button>
      </div>
      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/10 bg-slate-900 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-sky-200">Project</div>
            <h3 className="mt-2 text-3xl font-semibold text-white">{project.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-white/10 p-2 text-slate-200" aria-label="Close project details"><X size={18} /></button>
        </div>
        <div className="mt-6 grid gap-6">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">Overview</div>
            <p className="text-slate-300">{project.description}</p>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">Architecture</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 font-mono text-sm text-slate-200">
              {project.flow.map((step, idx) => (
                <div key={step} className="flex items-center gap-2 py-1">
                  <span className="text-sky-200">{idx + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">Technologies</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (<span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">{tech}</span>))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">Engineering details</div>
            <p className="text-slate-300">Engineering details to be added.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">GitHub <ExternalLink size={14} /></a>}
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">Live Demo <ExternalLink size={14} /></a>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CodePlayground() {
  const [selected, setSelected] = useState(algorithms[0].name);
  const algorithm = algorithms.find((item) => item.name === selected) ?? algorithms[0];

  return (
    <div className="code-playground-grid">
      <div className="code-problem-list">
        {algorithms.map((algo) => (
          <button
            key={algo.name}
            onClick={() => setSelected(algo.name)}
            className={`code-problem-button ${selected === algo.name ? 'is-selected' : ''}`}
          >
            <span className="code-problem-text">{algo.name}</span>
            <span className="code-problem-count">{algo.count}</span>
          </button>
        ))}
      </div>

      <div className="code-panel">
        <div className="code-panel-header">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sky-200">Java</span>
          <span className="text-xs text-slate-400">{algorithm.name}</span>
        </div>

        <pre className="code-block">
          <code>{algorithm.code}</code>
        </pre>

        <div className="code-meta-grid">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Explanation</div>
            <p className="mt-2 text-slate-300">{algorithm.explanation}</p>
          </div>

          <div className="space-y-4">
            <div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Time Complexity</div><div className="mt-2 font-mono text-sky-200">{algorithm.time}</div></div>
            <div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Space Complexity</div><div className="mt-2 font-mono text-sky-200">{algorithm.space}</div></div>
            <div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Sample Input</div><div className="mt-2 font-mono text-sky-200">{algorithm.sampleInput}</div></div>
            <div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Sample Output</div><div className="mt-2 font-mono text-sky-200">{algorithm.sampleOutput}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeveloperTerminal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '$ help',
    'about   experience   projects   skills   github   leetcode   contact   resume   clear',
  ]);

  const commands: Record<string, string> = {
    help: 'about   experience   projects   skills   github   leetcode   contact   resume   clear',
    about: 'Sagnik Dutta — Software Engineer focused on backend, full-stack, and AI systems.',
    experience: 'Capgemini Technology Services India Limited',
    projects: 'AI Email Writer\nResumind',
    skills: 'Java • Spring Boot • Hibernate • React • SQL • AI integrations',
    github: 'github.com/DSagnik24',
    leetcode: '300+ problems solved',
    contact: 'sagnikduttaofficial18@gmail.com',
    resume: 'Resume available from the header links',
    clear: '',
  };

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const response = commands[trimmed] ?? 'Command not found';
    setHistory((prev) => [...prev, `$ ${trimmed}`, ...(response ? [response] : [])]);
    setInput('');
    if (trimmed === 'clear') setHistory([]);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-slate-950 p-4 shadow-2xl">
        <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <button onClick={onClose} className="ml-auto rounded-full border border-white/10 p-1"><X size={14} /></button>
        </div>
        <div className="max-h-[420px] space-y-2 overflow-auto font-mono text-sm text-slate-200">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap">{line}</div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 p-2">
          <span className="text-sky-300">$</span>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }} className="w-full bg-transparent text-slate-100 outline-none" placeholder="Type a command..." aria-label="Terminal command" />
        </div>
      </div>
    </div>
  );
}

export default App;
