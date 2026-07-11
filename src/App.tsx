import LiquidEther from './LiquidEther';

const LINKEDIN_URL = 'https://www.linkedin.com/in/vaishnavi-sanap/';
const GITHUB_URL = 'https://github.com/shnavii11';
const TWITTER_URL = 'https://x.com/pixelpetal59558';
const EMAIL = 'vaishnavisanap1811@gmail.com';

/* ---------- Inline icons (fill = currentColor) ---------- */
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: IconMail, external: false },
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: IconLinkedIn, external: true },
  { label: 'GitHub', href: GITHUB_URL, Icon: IconGitHub, external: true },
  { label: 'X (Twitter)', href: TWITTER_URL, Icon: IconX, external: true },
];

const clips = ['/videos/v1.mp4', '/videos/v2.mp4', '/videos/v3.mp4'];

const projects = [
  {
    name: 'Chebyshev Q-KAN',
    stack: 'PennyLane · PyTorch',
    blurb:
      'A Chebyshev-polynomial Quantum Kolmogorov–Arnold Network benchmarked against SineKAN on Higgs-Boson classification. A parameter-matched 4-qubit, 757-parameter framework that reached AUC 0.6452 — a +1.85% gain in background rejection.',
  },
  {
    name: 'Speech Translation System',
    stack: 'PyTorch · CUDA',
    blurb:
      'A multilingual speech-to-English pipeline: a CNN + BiLSTM + CTC acoustic model feeding a neural machine-translation module. Reached a 0.21 word error rate, accelerated end-to-end with CUDA.',
  },
  {
    name: 'AlgoSweeped',
    stack: 'FastAPI · React/TS · Supabase · Redis',
    blurb:
      'A full-stack DSA-prep platform aggregating 15,000+ LeetCode/Codeforces problems, with a per-topic “readiness” weakness-scoring engine, Gemini recommendations, and Redis caching.',
  },
  {
    name: 'opportunity-finder',
    stack: 'Claude Code Plugin · Python',
    blurb:
      'A Claude Code plugin that parses a resume into a keyword profile and surfaces matched hackathons and internships from four live sources, ranked transparently.',
  },
];

export default function App() {
  return (
    <div className="page">
      {/* Water-like ripple background — fixed, reacts to the cursor everywhere */}
      <div className="ripple-bg">
        <LiquidEther
          colors={['#5B8DEF', '#8FBFFF', '#C7E4FF']}
          mouseForce={28}
          cursorSize={120}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          dt={0.014}
          BFECC={true}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={3.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <main className="content">
        {/* Hero — photo on the left, info beside it */}
        <section className="hero">
          <img className="hero-photo" src="/me.jpg" alt="Vaishnavi" />

          <div className="hero-info">
            <h1 className="name">Vaishnavi</h1>
            <p className="tagline">creative · tech · whimsical</p>
            <p className="role">Electronics Engineer · VJTI</p>
            <p className="currently">ML Intern @ NeoSOFT · Secretary, Project X</p>

            <nav className="socials" aria-label="Social links">
              {socials.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <Icon />
                </a>
              ))}
            </nav>
          </div>

          <a className="scroll-cue" href="#work" aria-label="Scroll to projects">
            <span>scroll</span>
          </a>
        </section>

        {/* Projects */}
        <section className="section" id="work">
          <h2 className="section-title">Selected Work</h2>
          <ul className="project-list">
            {projects.map((p) => (
              <li className="project" key={p.name}>
                <div className="project-head">
                  <h3 className="project-name">{p.name}</h3>
                  <span className="project-stack">{p.stack}</span>
                </div>
                <p className="project-blurb">{p.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Hobbies */}
        <section className="section" id="beyond">
          <h2 className="section-title">Beyond the Screen</h2>
          <p className="hobbies">Gardening · Wall painting · Reading mythology</p>

          <div className="video-grid">
            {clips.map((src) => (
              <video
                key={src}
                className="clip"
                src={src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
