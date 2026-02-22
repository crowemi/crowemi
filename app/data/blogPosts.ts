export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  blurb: string;
  image: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Modern Workspace: Tools and Tips for Productivity",
    author: "Crowemi",
    date: "February 15, 2026",
    readTime: "7 min read",
    blurb:
      "Discover the essential tools and strategies I use to create an efficient and inspiring workspace. From desk setup to digital tools, learn how to optimize your environment for maximum productivity and creativity.",
    image:
      "https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc3MTQ3NDY3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Productivity", "Workspace", "Tools"],
    content: `
      <p>Your workspace shapes your focus more than you think. Whether you work from home or a studio, the right setup can unlock deeper concentration and better creative output.</p>
      <h3>Start with physical clarity</h3>
      <p>A clean desk reduces decision fatigue. Keep only what supports your current task: laptop, notebook, water, and one anchor object that keeps you grounded.</p>
      <ul>
        <li>Use cable management to remove visual noise.</li>
        <li>Position your monitor at eye level to reduce strain.</li>
        <li>Choose lighting that is bright but warm.</li>
      </ul>
      <h3>Design your digital environment</h3>
      <p>Minimal tabs, clear folder structures, and intentional notifications can make your day feel lighter. Create default workflows so starting work takes seconds, not minutes.</p>
      <p>Ultimately, a modern workspace is less about expensive gear and more about intentional systems that protect your energy.</p>
    `,
  },
  {
    id: "2",
    title: "The Art of Mindful Work: Finding Balance in the Digital Age",
    author: "Crowemi",
    date: "February 10, 2026",
    readTime: "6 min read",
    blurb:
      "In our always-connected world, finding balance is more important than ever. Explore techniques for mindful work, including how to disconnect, set boundaries, and create space for deep thinking and creativity.",
    image:
      "https://images.unsplash.com/photo-1650735311937-1876825e971b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXB0b3AlMjBub3RlYm9va3xlbnwxfHx8fDE3NzE0NzgxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Mindfulness", "Focus", "Wellbeing"],
    content: `
      <p>Mindful work is the practice of being fully present with one task at a time. In the digital age, this is both difficult and essential.</p>
      <h3>Set boundaries that protect attention</h3>
      <p>Every notification competes with your thinking. By defining communication windows, you reclaim long stretches of uninterrupted focus.</p>
      <ul>
        <li>Batch email and chat responses twice daily.</li>
        <li>Use focus blocks for deep work sessions.</li>
        <li>Schedule recovery time between meetings.</li>
      </ul>
      <h3>Build rituals, not willpower</h3>
      <p>A short pre-work routine can cue your brain into focus mode. Try 5 minutes of breathing, writing intentions, or reviewing your top priorities.</p>
      <p>Balance is not accidental. It is the result of small, repeatable choices made with intention.</p>
    `,
  },
  {
    id: "3",
    title: "Lessons from Nature: How Natural Patterns Inspire Design",
    author: "Scooter",
    date: "February 5, 2026",
    readTime: "8 min read",
    blurb:
      "Nature has been the greatest designer for billions of years. Learn how natural patterns, from fractals to the golden ratio, can inform and enhance our approach to digital design and user experience.",
    image:
      "https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzcxNDc0NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Design", "Nature", "UX"],
    content: `
      <p>Nature solves complex problems with elegant, efficient patterns. Designers can learn a lot by observing how these systems evolve.</p>
      <h3>Patterns that feel intuitive</h3>
      <p>Fractals, rhythm, and asymmetry create visual harmony without monotony. Interfaces inspired by these principles often feel more human and less mechanical.</p>
      <ul>
        <li>Use repetition with subtle variation.</li>
        <li>Create hierarchy that mirrors natural flow.</li>
        <li>Favor organic spacing over rigid density.</li>
      </ul>
      <h3>Design for adaptation</h3>
      <p>Natural systems are resilient because they adapt. Great digital products do the same by meeting users where they are and evolving with real behavior.</p>
      <p>When we design with nature in mind, we build experiences that feel timeless, calm, and intuitive.</p>
    `,
  },
];

export function getBlogPostById(postId: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === postId);
}
