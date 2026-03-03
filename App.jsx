import { useState } from "react";

const SERIF_FONT = "'Lora', Georgia, serif";

const C = {
  bg: "#F7F8FA", white: "#FFFFFF", border: "#E5E7EB", borderLight: "#F3F4F6",
  text: "#111827", textMid: "#374151", textSoft: "#6B7280", textFaint: "#9CA3AF",
  indigo: { bg: "#EEF2FF", border: "#C7D2FE", text: "#4F46E5" },
  green:  { bg: "#ECFDF5", border: "#A7F3D0", text: "#059669" },
  orange: { bg: "#FFF7ED", border: "#FED7AA", text: "#EA580C" },
  red:    { bg: "#FFF1F2", border: "#FECDD3", text: "#E11D48" },
  blue:   { bg: "#EFF6FF", border: "#BFDBFE", text: "#2563EB" },
  gray:   { bg: "#F9FAFB", border: "#E5E7EB", text: "#6B7280" },
  yellow: { bg: "#FEFCE8", border: "#FDE68A", text: "#92400E" },
};

const PERF_C = { "Active": C.green, "Winner": C.green, "Learning": C.blue, "Underperformer": C.red, "Paused": C.gray, "Inconclusive": C.gray };
const STATUS_C = { "Research": C.indigo, "In Testing": C.green, "Concluded": C.orange, "Paused": C.red };
const LAYER_C = { ideas: C.yellow, testing: C.green, inventory: C.indigo, learnings: C.orange };

// ─── DATA ────────────────────────────────────────────────────────────────────

const SEGMENTS = [
  { id: "S1", label: "IOP Comparers",      desc: "Knows what IOP is, comparing options" },
  { id: "S2", label: "Unaware Seekers",    desc: "Looking for something, doesn't know IOP exists" },
  { id: "S3", label: "Program Skeptics",   desc: "Understands CH, skeptical about groups" },
  { id: "S4", label: "Logistics Blockers", desc: "Skeptical about time commitment / scheduling" },
  { id: "S5", label: "Insurance Unsure",   desc: "Won't move without clarity on cost/coverage" },
];

const STRATEGY = {
  summary: "This framework defines the core prospect segments we're driving from Meta D2C and the message strategy needed to drive qualified conversions. Informed by recurring themes from admissions calls and observed paid social behavior.",
  why: "Meta prospects enter the funnel with different levels of treatment awareness, confidence, and decision friction. One-size-fits-all messaging over-explains to high-intent prospects and under-clarifies for people who are uneducated or skeptical. By segmenting into a small number of real, repeatable entry mindsets, we can create clearer creative hypotheses, address the most common blockers earlier, and improve lead quality by setting better expectations.",
  segmentObjectives: [
    { id: "S1", label: "IOP Comparers",      objective: "Convince audience that Charlie Health is the best-in-class option for intensive care and push to action." },
    { id: "S2", label: "Unaware Seekers",    objective: "Educate on virtual intensive therapy programs and encourage a next qualifying step." },
    { id: "S3", label: "Program Skeptics",   objective: "Validate concerns and show how Charlie Health is personalized to the client." },
    { id: "S4", label: "Logistics Blockers", objective: "Emphasize virtual programming and flexible scheduling." },
    { id: "S5", label: "Insurance Unsure",   objective: "Confirm Charlie Health's extensive in-network and Medicaid coverage." },
  ],
};

const IDEAS_CONTENT = `## Active brainstorm — D2C Sales Campaign

---

### Angles worth exploring

**S1 — "More than weekly therapy" framing**
Most people don't know IOP means 9+ hrs/week. That alone is a differentiator against standard therapy. Hook idea: *"Your therapist sees you once a week. Charlie Health sees you every day."* — came up in admissions call context, feels real.

**S1 — Fast + Flexible as the core S1 pitch**
Comparison ads are working early but the angle might be too rational. What if we led with speed of healing as the emotional hook, then used the comparison as proof? Test: lead with outcome first, structure second.

**S2 — Mental health rehab reframe**
PSA format positioning IOP as "mental health rehab" — same way people understand physical rehab after injury. Reframes intensity as appropriate, not scary. Source: Reddit r/mentalhealth thread. Strong for S2 who has no IOP vocabulary yet.

**S3 — Pull back the curtain on group therapy**
Saw a TikTok organic doing well with a creator walking through their weekly group schedule day by day. Felt like a DITL but more structured. Good format for normalizing what group therapy actually looks like before someone imagines the worst.

---

### Hooks to test

- *"I almost didn't call because I thought I couldn't afford it."* — verbatim from two admissions calls. Already became C004, worked well.
- *"I never thought I'd end up in group therapy."* — good entry for S3
- *"Most people wait until they're in crisis. You don't have to."* — broad, could work for S1 or general awareness

---

### References & swipe

- [TikTok DITL group therapy organic](https://tiktok.com) — strong format reference for S3
- [Foreplay board — mental health ads](https://foreplay.co) — ongoing swipe
- Competitor: Brightside running heavy "therapy on your schedule" messaging — worth a direct comparison callout

---

### Open questions

- Should we be running any creative specifically for the "loved one" audience (people searching for a family member)? Admissions says a significant % of calls come from parents/partners.
- K6 High Acuity kit — 2 UGC done, 3 statics remaining. IOP comparison, IOP differentiator, direct CTA. Where does this sit in the segment map?`;

const INVENTORY = [
  {
    id: "AD001", name: "Avoid A Crisis", segment: "S1", format: "UGC Video",
    angle: "Avoid a crisis before it happens", hook: "By the time you're in crisis, it's too late to plan.",
    status: "Active", launchedAt: "2024-11-15",
    ctr: "2.4%", cac: "$980", bps: "62",
    assetLink: "https://drive.google.com/file/d/1jMwF721kMTix88zKqpvqBNVlremc4Mb0/view",
    thumbnailId: "1jMwF721kMTix88zKqpvqBNVlremc4Mb0",
    uploadedThumb: "data:image/jpeg;base64,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",
    whyOff: null,
  },
  {
    id: "AD005", name: "Comparison Chart Static", segment: "S1", format: "Static",
    angle: "CH vs therapy platforms vs brick-and-mortar IOP", hook: "Not all intensive therapy is the same.",
    status: "Active", launchedAt: "2024-12-01",
    ctr: "1.8%", cac: "$1,340", bps: "14",
    assetLink: "https://drive.google.com/file/d/PLACEHOLDER_ID2/view",
    thumbnailId: "PLACEHOLDER_ID2",
    whyOff: null,
  },
  {
    id: "AD007", name: "Static Group Overview", segment: "S1", format: "Static",
    angle: "What group therapy at Charlie Health actually looks like", hook: "Group therapy, reimagined.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD008", name: "Alum Story - Jayla", segment: "S1", format: "UGC Video",
    angle: "Charlie Health saved my life", hook: "I was skeptical at first. I'm glad I wasn't.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD009", name: "Program Overview Carousel - High Acuity", segment: "S1", format: "Carousel",
    angle: "Intensive care for people who've already tried everything", hook: "For when weekly therapy isn't enough.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD010", name: "Avoid A Crisis - Ravi", segment: "S1", format: "UGC Video",
    angle: "Avoid a crisis before it happens", hook: "By the time you're in crisis, it's too late to plan.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD011", name: "Group Matching - Hailey", segment: "S3", format: "UGC Video",
    angle: "Pulling back the curtain on group therapy", hook: "I didn't know what group therapy really was until I tried it.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD012", name: "High Acuity - Hailey", segment: "S1", format: "UGC Video",
    angle: "Intensive care for people who've already tried everything", hook: "I'd been in therapy for years. It wasn't working.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD013", name: "Group Text Convo Static", segment: "S1", format: "Static",
    angle: "Pulling back the curtain on group therapy", hook: "Real messages from real group sessions.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD014", name: "High Acuity - Nick", segment: "S1", format: "UGC Video",
    angle: "Intensive care for people who've already tried everything", hook: "Nothing was working until I found something different.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD015", name: "Insurance - Severe Depression Static", segment: "S5", format: "Static",
    angle: "We take insurance", hook: "Don't let cost be the reason you don't get help.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD016", name: "Avoid A Crisis - Karla", segment: "S1", format: "UGC Video",
    angle: "Avoid a crisis before it happens", hook: "By the time you're in crisis, it's too late to plan.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD017", name: "TikTok Comments Static", segment: "S1", format: "Static",
    angle: "Social proof via real comments", hook: "What people are saying.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD018", name: "Amount of Care - Caitlyn", segment: "S2", format: "UGC Video",
    angle: "More than weekly therapy", hook: "I didn't realize how much support was actually available.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD019", name: "Avoid A Crisis - Nicholas", segment: "S1", format: "UGC Video",
    angle: "Avoid a crisis before it happens", hook: "By the time you're in crisis, it's too late to plan.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD020", name: "Comparison IOP Static", segment: "S1", format: "Static",
    angle: "CH vs therapy platforms vs brick-and-mortar IOP", hook: "Not all intensive therapy is the same.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD021", name: "Group DITL - Nick", segment: "S3", format: "UGC Video",
    angle: "Pulling back the curtain on group therapy", hook: "Here's what a week in Charlie Health actually looks like.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
  {
    id: "AD022", name: "Alum Story - Maddy", segment: "S1", format: "UGC Video",
    angle: "Charlie Health saved my life", hook: "I didn't think I'd make it to 25.",
    status: "Active", launchedAt: "2025-01-01",
    ctr: "—", cac: "—", bps: "—",
    assetLink: "https://drive.google.com/", thumbnailId: "", uploadedThumb: null, whyOff: null,
  },
];

const PERSONAS = [
  {
    id: "P001", segment: "S1", kit: "K1", personaName: "High Intent IOP Comparer",
    hypothesis: "Users actively comparing IOP options will respond to a direct head-to-head comparison framing CH as best-in-class. Key objection: why CH over a local IOP or a cheaper telehealth platform.",
    researchSources: "Admissions call themes (Q1), Meta Ad Library competitor audit, Reddit r/mentalhealth IOP threads",
    status: "In Testing", createdAt: "2024-11-01",
    concepts: [
      { id: "C001", name: "Comparison Chart", format: "Static", angle: "CH vs therapy platforms vs brick-and-mortar IOP", hook: "Not all intensive therapy is the same.", copyNotes: "Lead with comparison table. CH wins on speed, virtual access, centralized care.", briefLink: "https://figma.com/...", assetLink: "https://drive.google.com/...", adRef: "AD005", performance: { label: "Learning", ctr: "1.8%", cac: "$1,340", bps: "14", notes: "Early data. CTR solid but volume too low to call. Let run to 50 BPS." } },
      { id: "C002", name: "Avoid A Crisis UGC", format: "UGC Video", angle: "Avoid a crisis before it happens", hook: "By the time you're in crisis, it's too late to plan.", copyNotes: "Urgent but not fear-mongering. End with CTA to schedule.", briefLink: "", assetLink: "https://drive.google.com/...", adRef: "AD001", performance: { label: "Winner", ctr: "2.4%", cac: "$980", bps: "62", notes: "Top performer in K1. Crisis avoidance outperforming alum stories. Prioritize next iteration." } },
      { id: "C003", name: "Maddy Alum Story", format: "UGC Video", angle: "Charlie Health saved my life", hook: "I didn't think I'd make it to 25.", copyNotes: "Authentic testimonial. No heavy scripting.", briefLink: "", assetLink: "https://drive.google.com/...", adRef: "AD002", performance: { label: "Underperformer", ctr: "0.9%", cac: "$2,100", bps: "28", notes: "Alum story not cutting through for S1. Audience wants differentiation, not validation." } },
    ],
    learnings: "Crisis avoidance is the strongest S1 signal. Alum stories mismatched — S1 wants differentiation not proof. Next: Fast + Flexible angle with new UGC.",
  },
  {
    id: "P003", segment: "S2", kit: "K2", personaName: "Mental Health Awareness Seeker",
    hypothesis: "PSA-style UGC and program overview formats should build enough awareness to generate a qualified next step for people who know something is wrong but don't know IOP exists.",
    researchSources: "Quora questions on therapy alternatives, organic TikTok content audit",
    status: "Research", createdAt: "2024-12-01",
    concepts: [],
    learnings: "",
  },
];

const LEARNINGS = [
  { id: "L001", title: "Crisis avoidance beats alum validation for high-intent segments", segments: ["S1"], formats: ["UGC Video"], finding: "S1 users already believe CH works — they're comparing options. Alum stories answer a question they're not asking. Differentiation and urgency outperform.", evidence: ["AD001 Active: 2.4% CTR, $980 CAC", "AD002 Paused: 0.9% CTR, $2,100 CAC"], implication: "For high-intent segments, lead with 'why CH over alternatives' not 'CH works'. Reserve alum stories for S2/S3.", addedAt: "2024-12-01", linkedPersonas: ["P001"] },
  { id: "L002", title: "Verbatim admissions call language outperforms written hooks", segments: ["S5"], formats: ["UGC Video"], finding: "The hook 'I almost didn't call because I thought I couldn't afford it' came verbatim from call recordings. It became the strongest CAC performer across all kits. Real objection language converts better than constructed hooks.", evidence: ["AD004 Active: 2.1% CTR, $890 CAC, 88 BPS"], implication: "Systematize mining admissions calls for exact prospect language. Treat recordings as a copywriting source.", addedAt: "2024-10-01", linkedPersonas: ["P002"] },
  { id: "L003", title: "Carousel underperforms as a cold awareness format for S2", segments: ["S2"], formats: ["Carousel"], finding: "S2 users don't click on what looks like a product explainer. The format reads as an ad, not a story, and doesn't create enough of a pull to drive a first click from someone with low awareness.", evidence: ["AD006 Paused: 0.7% CTR, $2,800 CAC"], implication: "Carousel may work as a retargeting format once awareness is built, but don't use it as a cold entry point for unaware segments.", addedAt: "2024-09-20", linkedPersonas: ["P003"] },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 16 }) => {
  const paths = {
    plus:     <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    chevron:  <polyline points="6 9 12 15 18 9"/>,
    link:     <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    bar:      <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    doc:      <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    target:   <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    lightbulb:<><path d="M9 21h6"/><path d="M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V17H9v-2.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6z"/></>,
    arrow:    <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    book:     <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
    sparkle:  <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"/>,
    check:    <polyline points="20 6 9 17 4 12"/>,
    grid:     <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    pause:    <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    x:        <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────

const Badge = ({ label, scheme }) => {
  const s = scheme || C.gray;
  return <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>;
};

const SL = ({ icon, text, mt }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: mt ? 16 : 0, marginBottom: 7 }}>
    <span style={{ color: C.textFaint }}><Icon name={icon} size={12} /></span>
    <span style={{ color: C.textFaint, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{text}</span>
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, ...style }}>{children}</div>
);

// ─── STRATEGY DRAWER ─────────────────────────────────────────────────────────

const StrategyDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: C.white, border: `1px solid ${C.border}`,
          borderRadius: open ? "12px 12px 0 0" : 12,
          padding: "12px 18px", cursor: "pointer",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="book" size={14} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textMid }}>Campaign Strategy</span>
          <span style={{ fontSize: 12, color: C.textFaint }}>— segmentation framework & objectives</span>
        </div>
        <span style={{ color: C.textFaint, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-flex" }}>
          <Icon name="chevron" size={14} />
        </span>
      </div>

      {open && (
        <div style={{
          background: C.white,
          border: `1px solid ${C.border}`, borderTop: "none",
          borderRadius: "0 0 12px 12px",
          padding: "22px 26px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}>
          <h2 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: C.text }}>Meta D2C Segmentation Framework</h2>
          <p style={{ margin: "0 0 18px", color: C.textSoft, fontSize: 13, lineHeight: 1.7 }}>{STRATEGY.summary}</p>
          <h3 style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700, color: C.textMid }}>Why we're doing this</h3>
          <p style={{ margin: "0 0 20px", color: C.textSoft, fontSize: 13, lineHeight: 1.7 }}>{STRATEGY.why}</p>
          <h3 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: C.textMid }}>Segments & Core Objectives</h3>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
            {STRATEGY.segmentObjectives.map((s, i) => (
              <div key={s.id} style={{ display: "grid", gridTemplateColumns: "70px 130px 1fr", alignItems: "start", gap: 16, padding: "11px 16px", borderBottom: i < STRATEGY.segmentObjectives.length - 1 ? `1px solid ${C.borderLight}` : "none", background: i % 2 === 0 ? C.white : C.bg }}>
                <Badge label={s.id} scheme={C.indigo} />
                <span style={{ fontSize: 12, fontWeight: 600, color: C.textMid, paddingTop: 2 }}>{s.label}</span>
                <span style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.6 }}>{s.objective}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── NAV ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "testing",   label: "Testing",   icon: "target",    desc: "Active personas" },
  { id: "learnings", label: "Learnings", icon: "sparkle",   desc: "What we know" },
  { id: "inventory", label: "Inventory", icon: "grid",      desc: "All ads ever made" },
  { id: "ideas",     label: "Ideas",     icon: "lightbulb", desc: "Freeform brainstorm" },
];

const Nav = ({ active, setActive }) => (
  <div style={{ display: "flex", marginBottom: 24, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
    {TABS.map((t, i) => {
      const isActive = active === t.id;
      const lc = LAYER_C[t.id];
      return (
        <button key={t.id} onClick={() => setActive(t.id)} style={{ flex: 1, padding: "13px 12px", cursor: "pointer", border: "none", borderRight: i < TABS.length - 1 ? `1px solid ${C.border}` : "none", background: isActive ? lc.bg : C.white, transition: "background 0.15s", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
            <span style={{ color: isActive ? lc.text : C.textFaint }}><Icon name={t.icon} size={13} /></span>
            <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? lc.text : C.textMid }}>{t.label}</span>
          </div>
          <div style={{ fontSize: 11, color: isActive ? lc.text : C.textFaint, paddingLeft: 20, opacity: 0.8 }}>{t.desc}</div>
        </button>
      );
    })}
  </div>
);

// ─── IDEAS VIEW ──────────────────────────────────────────────────────────────

const renderMarkdown = (text) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 16px", paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>{line.slice(3)}</h2>;
    if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: 14, fontWeight: 700, color: C.textMid, margin: "20px 0 8px" }}>{line.slice(4)}</h3>;
    if (line.startsWith("---")) return <hr key={i} style={{ border: "none", borderTop: `1px solid ${C.borderLight}`, margin: "20px 0" }} />;
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} style={{ margin: "10px 0 4px", fontSize: 13, fontWeight: 700, color: C.textMid }}>{line.slice(2, -2)}</p>;
    }
    if (line.startsWith("- ")) return <li key={i} style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.7, marginLeft: 16, marginBottom: 2 }}>{line.slice(2)}</li>;
    if (line.startsWith("*") && line.endsWith("*")) return <p key={i} style={{ margin: "4px 0", fontSize: 13, color: C.textSoft, fontStyle: "italic", lineHeight: 1.7 }}>{line.slice(1, -1)}</p>;
    if (line === "") return <div key={i} style={{ height: 6 }} />;
    // Handle inline bold with **text**
    const boldParts = line.split(/\*\*(.*?)\*\*/g);
    if (boldParts.length > 1) {
      return <p key={i} style={{ margin: "4px 0", fontSize: 13, color: C.textSoft, lineHeight: 1.7 }}>{boldParts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: C.textMid }}>{part}</strong> : part)}</p>;
    }
    return <p key={i} style={{ margin: "4px 0", fontSize: 13, color: C.textSoft, lineHeight: 1.7 }}>{line}</p>;
  });
};

const IdeasView = () => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(IDEAS_CONTENT);
  const [draft, setDraft] = useState(content);

  return (
    <Card style={{ padding: "28px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Brainstorm</div>
          <div style={{ fontSize: 12, color: C.textFaint, marginTop: 2 }}>Freeform — angles, hooks, references, open questions</div>
        </div>
        {editing ? (
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setContent(draft); setEditing(false); }} style={{ background: C.indigo.bg, border: `1px solid ${C.indigo.border}`, color: C.indigo.text, padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Save</button>
            <button onClick={() => { setDraft(content); setEditing(false); }} style={{ background: C.white, border: `1px solid ${C.border}`, color: C.textSoft, padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} style={{ background: C.white, border: `1px solid ${C.border}`, color: C.textSoft, padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>Edit</button>
        )}
      </div>

      {editing ? (
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          style={{ width: "100%", minHeight: 480, fontFamily: "inherit", fontSize: 13, color: C.textMid, lineHeight: 1.7, border: `1px solid ${C.indigo.border}`, borderRadius: 10, padding: "16px", background: C.indigo.bg, resize: "vertical", outline: "none", boxSizing: "border-box" }}
        />
      ) : (
        <div style={{ maxWidth: 680 }}>
          {renderMarkdown(content)}
        </div>
      )}
    </Card>
  );
};

// ─── INVENTORY VIEW ──────────────────────────────────────────────────────────

const AssetThumbnail = ({ thumbnailId, assetLink, format, uploadedThumb }) => {
  const [errored, setErrored] = useState(false);
  const hasThumb = !!uploadedThumb;
  const thumbUrl = uploadedThumb || `https://drive.google.com/thumbnail?id=${thumbnailId}&sz=w400`;
  const isVideo = format?.toLowerCase().includes("video");
  const showFallback = !hasThumb && errored;

  return (
    <a href={assetLink} target="_blank" rel="noreferrer" style={{ display: "block", textDecoration: "none" }}>
      <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`, background: C.bg, aspectRatio: "9/16", maxWidth: 140 }}>
        {!showFallback ? (
          <img
            src={thumbUrl}
            alt="Ad preview"
            onError={() => { if (!hasThumb) setErrored(true); }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 12 }}>
            <Icon name="link" size={18} />
            <span style={{ fontSize: 10, color: C.textFaint, textAlign: "center" }}>View asset →</span>
          </div>
        )}

      </div>
      <div style={{ fontSize: 10, color: C.indigo.text, marginTop: 5, textAlign: "center", maxWidth: 140 }}>Open in Drive →</div>
    </a>
  );
};

const AdCard = ({ ad }) => {
  const [open, setOpen] = useState(false);
  const pc = PERF_C[ad.status] || C.gray;
  const seg = SEGMENTS.find(s => s.id === ad.segment);
  const isPaused = ad.status === "Paused";

  const perfSummary = isPaused
    ? `Ran from ${ad.launchedAt} to ${ad.pausedAt}. CTR came in at ${ad.ctr} with a CAC of ${ad.cac} over ${ad.bps} BPS — ${parseFloat(ad.cac.replace('$','').replace(',','')) > 1500 ? "above target, which contributed to the decision to pause" : "within range, but other factors led to pausing"}.`
    : `Currently active since ${ad.launchedAt}. Tracking at ${ad.ctr} CTR, ${ad.cac} CAC across ${ad.bps} BPS.`;

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", background: C.white, marginBottom: 8, opacity: isPaused ? 0.85 : 1 }}>
      <div onClick={() => setOpen(!open)} style={{ display: "grid", gridTemplateColumns: "1fr 100px 24px", alignItems: "center", gap: 16, padding: "14px 18px", cursor: "pointer" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
            {ad.name}
            {isPaused && <span style={{ color: C.textFaint }}><Icon name="pause" size={11} /></span>}
          </div>
          <div style={{ fontSize: 11, color: C.textFaint, marginTop: 1 }}>{seg?.label} · {ad.format}</div>
        </div>
        <Badge label={ad.status} scheme={pc} />
        <span style={{ color: C.textFaint, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><Icon name="chevron" size={13} /></span>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: "16px 18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 20, alignItems: "start" }}>
            <div>
              <SL icon="target" text="Angle" />
              <p style={{ margin: "0 0 10px", color: C.textMid, fontSize: 13, lineHeight: 1.6 }}>{ad.angle}</p>
              <SL icon="sparkle" text="Hook" />
              <p style={{ margin: "0 0 14px", color: C.textMid, fontSize: 13, fontStyle: "italic" }}>"{ad.hook}"</p>
              <SL icon="bar" text="Performance" />
              <p style={{ margin: "0 0 12px", color: C.textSoft, fontSize: 13, lineHeight: 1.7 }}>{perfSummary}</p>
              {isPaused && ad.whyOff && (
                <>
                  <SL icon="x" text="Why it was turned off" />
                  <div style={{ background: C.red.bg, border: `1px solid ${C.red.border}`, borderRadius: 10, padding: "12px 14px" }}>
                    <p style={{ margin: 0, color: C.red.text, fontSize: 13, lineHeight: 1.7 }}>{ad.whyOff}</p>
                  </div>
                </>
              )}
            </div>
            <AssetThumbnail thumbnailId={ad.thumbnailId} assetLink={ad.assetLink} format={ad.format} uploadedThumb={ad.uploadedThumb} />
          </div>
        </div>
      )}
    </div>
  );
};

const InventoryView = () => {
  const [filter, setFilter] = useState("All");
  const [segFilter, setSegFilter] = useState("All");
  const filtered = INVENTORY
    .filter(a => filter === "All" || a.status === filter)
    .filter(a => segFilter === "All" || a.segment === segFilter);
  const activeCount = INVENTORY.filter(a => a.status === "Active").length;
  const pausedCount = INVENTORY.filter(a => a.status === "Paused").length;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total Ads", val: INVENTORY.length, scheme: C.gray },
          { label: "Active", val: activeCount, scheme: C.green },
          { label: "Paused", val: pausedCount, scheme: C.red },
        ].map(({ label, val, scheme }) => (
          <div key={label} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ color: C.textFaint, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
            <div style={{ color: scheme.text, fontSize: 22, fontWeight: 800, marginTop: 4 }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
        {["All", "Active", "Paused"].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ background: filter === s ? (s === "Active" ? C.green.bg : s === "Paused" ? C.red.bg : C.indigo.bg) : C.white, border: `1px solid ${filter === s ? (s === "Active" ? C.green.border : s === "Paused" ? C.red.border : C.indigo.border) : C.border}`, color: filter === s ? (s === "Active" ? C.green.text : s === "Paused" ? C.red.text : C.indigo.text) : C.textFaint, padding: "4px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 500 }}>{s}</button>
        ))}
        <div style={{ width: 1, background: C.border, margin: "0 4px" }} />
        {["All", ...SEGMENTS.map(s => s.id)].map(s => (
          <button key={s} onClick={() => setSegFilter(s)} style={{ background: segFilter === s ? C.gray.bg : C.white, border: `1px solid ${segFilter === s ? C.gray.border : C.border}`, color: segFilter === s ? C.textMid : C.textFaint, padding: "4px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 500 }}>{s}</button>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        {filtered.map(ad => <AdCard key={ad.id} ad={ad} />)}
      </div>
    </div>
  );
};

// ─── TESTING VIEW ─────────────────────────────────────────────────────────────

const ConceptRow = ({ concept, onGoToInventory }) => {
  const [open, setOpen] = useState(false);
  const pc = PERF_C[concept.performance?.label] || C.gray;
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6, background: C.white }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", cursor: "pointer", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ color: C.textFaint, fontSize: 11 }}>{concept.id}</span>
          <span style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{concept.name}</span>
          <span style={{ background: C.gray.bg, border: `1px solid ${C.gray.border}`, color: C.textSoft, padding: "1px 8px", borderRadius: 6, fontSize: 11 }}>{concept.format}</span>
          {concept.performance?.label && <Badge label={concept.performance.label} scheme={pc} />}
        </div>
        <span style={{ color: C.textFaint, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}><Icon name="chevron" size={13} /></span>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: "14px 14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <SL icon="target" text="Angle" />
              <p style={{ margin: "0 0 10px", color: C.textMid, fontSize: 13, lineHeight: 1.6 }}>{concept.angle}</p>
              <SL icon="sparkle" text="Hook" />
              <p style={{ margin: "0 0 10px", color: C.textMid, fontSize: 13, fontStyle: "italic" }}>"{concept.hook}"</p>
              <SL icon="doc" text="Copy Direction" />
              <p style={{ margin: 0, color: C.textSoft, fontSize: 13, lineHeight: 1.6 }}>{concept.copyNotes}</p>
            </div>
            <div>
              {concept.performance?.label && (
                <>
                  <SL icon="bar" text="Performance" />
                  <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    {[["CTR", concept.performance.ctr], ["CAC", concept.performance.cac], ["BPS", concept.performance.bps]].map(([l, v]) => (
                      <div key={l} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", textAlign: "center" }}>
                        <div style={{ color: C.textFaint, fontSize: 10, fontWeight: 600 }}>{l}</div>
                        <div style={{ color: C.text, fontSize: 14, fontWeight: 700, marginTop: 1 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ color: C.textSoft, fontSize: 12, lineHeight: 1.6, margin: "0 0 12px" }}>{concept.performance.notes}</p>
                </>
              )}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {concept.briefLink && <a href={concept.briefLink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, background: C.bg, border: `1px solid ${C.border}`, color: C.textSoft, padding: "4px 10px", borderRadius: 7, fontSize: 11, textDecoration: "none" }}><Icon name="doc" size={11} /> Brief</a>}
                {concept.adRef && (
                  <button onClick={() => onGoToInventory(concept.adRef)} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: C.indigo.bg, border: `1px solid ${C.indigo.border}`, color: C.indigo.text, padding: "4px 10px", borderRadius: 7, fontSize: 11, cursor: "pointer" }}>
                    <Icon name="grid" size={11} /> View in Inventory →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TestingView = ({ onNavigateToLearnings, onGoToInventory }) => {
  const [openPersona, setOpenPersona] = useState(null);
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PERSONAS : PERSONAS.filter(p => p.status === filter);

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["All", "Research", "In Testing", "Concluded"].map(s => {
          const sc = s !== "All" ? STATUS_C[s] : null;
          const isActive = filter === s;
          return <button key={s} onClick={() => setFilter(s)} style={{ background: isActive ? (sc?.bg || C.indigo.bg) : C.white, border: `1px solid ${isActive ? (sc?.border || C.indigo.border) : C.border}`, color: isActive ? (sc?.text || C.indigo.text) : C.textFaint, padding: "4px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 500 }}>{s}</button>;
        })}
      </div>

      {filtered.map(persona => {
        const seg = SEGMENTS.find(s => s.id === persona.segment);
        const isOpen = openPersona === persona.id;
        const sc = STATUS_C[persona.status] || C.indigo;
        const winners = persona.concepts.filter(c => c.performance?.label === "Winner").length;
        const under = persona.concepts.filter(c => c.performance?.label === "Underperformer").length;
        const relatedLearnings = LEARNINGS.filter(l => l.segments.includes(persona.segment));

        return (
          <Card key={persona.id} style={{ marginBottom: 10, overflow: "hidden", boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div onClick={() => setOpenPersona(isOpen ? null : persona.id)} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto auto", alignItems: "center", gap: 12, padding: "16px 20px", cursor: "pointer" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{persona.personaName}</div>
                <div style={{ color: C.textFaint, fontSize: 11, marginTop: 1 }}>{seg?.desc}</div>
              </div>
              <Badge label={persona.status} scheme={sc} />
              {[["Creatives", persona.concepts.length, C.text], ["Winners", winners, C.green.text], ["Under", under, C.red.text]].map(([l, v, col]) => (
                <div key={l} style={{ textAlign: "center", minWidth: 52 }}>
                  <div style={{ color: C.textFaint, fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{l}</div>
                  <div style={{ color: col, fontSize: 16, fontWeight: 700, marginTop: 1 }}>{v}</div>
                </div>
              ))}
              <span style={{ color: C.textFaint, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><Icon name="chevron" size={14} /></span>
            </div>

            {isOpen && (
              <div style={{ borderTop: `1px solid ${C.borderLight}` }}>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 20 }}>
                    <div>
                      <SL icon="target" text="Hypothesis" />
                      <p style={{ margin: "0 0 12px", color: C.textMid, fontSize: 13, lineHeight: 1.7 }}>{persona.hypothesis}</p>
                      <SL icon="book" text="Research Sources" />
                      <p style={{ margin: 0, color: C.textSoft, fontSize: 13, lineHeight: 1.6 }}>{persona.researchSources}</p>
                    </div>
                    <div>
                      {persona.learnings && (
                        <>
                          <SL icon="sparkle" text="Learnings" />
                          <div style={{ background: C.green.bg, border: `1px solid ${C.green.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
                            <p style={{ margin: 0, color: "#166534", fontSize: 13, lineHeight: 1.7 }}>{persona.learnings}</p>
                          </div>
                        </>
                      )}
                      {relatedLearnings.length > 0 && (
                        <div>
                          <SL icon="arrow" text="Related Learnings" />
                          {relatedLearnings.map(l => (
                            <button key={l.id} onClick={() => onNavigateToLearnings(l.id)} style={{ display: "block", width: "100%", textAlign: "left", background: C.orange.bg, border: `1px solid ${C.orange.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 6, cursor: "pointer" }}>
                              <div style={{ fontSize: 12, fontWeight: 600, color: C.orange.text }}>{l.title} →</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <SL icon="doc" text={`Creatives (${persona.concepts.length})`} />
                  {persona.concepts.length === 0
                    ? <div style={{ border: `1px dashed ${C.border}`, borderRadius: 10, padding: "18px", textAlign: "center", color: C.textFaint, fontSize: 13 }}>No concepts yet.</div>
                    : persona.concepts.map(c => <ConceptRow key={c.id} concept={c} onGoToInventory={onGoToInventory} />)
                  }
                </div>
              </div>
            )}
          </Card>
        );
      })}

      <button style={{ display: "flex", alignItems: "center", gap: 8, background: C.white, border: `1px dashed ${C.border}`, color: C.textFaint, padding: "13px 20px", borderRadius: 12, cursor: "pointer", fontSize: 13, width: "100%", justifyContent: "center", marginTop: 4 }}>
        <Icon name="plus" size={13} /> Add New Persona / Audience Test
      </button>
    </div>
  );
};

// ─── LEARNINGS VIEW ───────────────────────────────────────────────────────────

const LearningsView = ({ focusId, onNavigateToTesting }) => {
  const [openId, setOpenId] = useState(focusId || null);
  return (
    <div>
      <p style={{ margin: "0 0 16px", color: C.textSoft, fontSize: 13 }}>Proven signals across all tests. Reference before briefing new concepts.</p>
      {LEARNINGS.map(l => {
        const isOpen = openId === l.id;
        const relatedPersonas = PERSONAS.filter(p => l.linkedPersonas?.includes(p.id));
        const relatedAds = INVENTORY.filter(a => l.segments.includes(a.segment));
        return (
          <Card key={l.id} style={{ marginBottom: 10, overflow: "hidden" }}>
            <div onClick={() => setOpenId(isOpen ? null : l.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", cursor: "pointer", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  {l.segments.map(s => <Badge key={s} label={s} scheme={C.gray} />)}
                  {l.formats.map(f => <Badge key={f} label={f} scheme={C.indigo} />)}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{l.title}</div>
              </div>
              <span style={{ color: C.textFaint, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}><Icon name="chevron" size={14} /></span>
            </div>
            {isOpen && (
              <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: "18px 20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
                  <div>
                    <SL icon="book" text="Finding" />
                    <p style={{ margin: "0 0 14px", color: C.textMid, fontSize: 13, lineHeight: 1.7 }}>{l.finding}</p>
                    <SL icon="sparkle" text="Implication" />
                    <div style={{ background: C.orange.bg, border: `1px solid ${C.orange.border}`, borderRadius: 10, padding: "12px 14px" }}>
                      <p style={{ margin: 0, color: C.orange.text, fontSize: 13, lineHeight: 1.7 }}>{l.implication}</p>
                    </div>
                  </div>
                  <div>
                    <SL icon="bar" text="Evidence" />
                    {l.evidence.map(e => (
                      <div key={e} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                        <span style={{ color: C.green.text }}><Icon name="check" size={11} /></span>
                        <span style={{ fontSize: 12, color: C.textMid }}>{e}</span>
                      </div>
                    ))}
                    {relatedPersonas.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <SL icon="target" text="From Persona Tests" />
                        {relatedPersonas.map(p => (
                          <button key={p.id} onClick={() => onNavigateToTesting(p.id)} style={{ display: "block", width: "100%", textAlign: "left", background: C.green.bg, border: `1px solid ${C.green.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 6, cursor: "pointer" }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: C.green.text }}>← {p.personaName}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        );
      })}
      <button style={{ display: "flex", alignItems: "center", gap: 8, background: C.white, border: `1px dashed ${C.border}`, color: C.textFaint, padding: "13px 20px", borderRadius: 12, cursor: "pointer", fontSize: 13, width: "100%", justifyContent: "center", marginTop: 4 }}>
        <Icon name="plus" size={13} /> Add Learning
      </button>
    </div>
  );
};

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("testing");
  const [focusPersona, setFocusPersona] = useState(null);
  const [focusLearning, setFocusLearning] = useState(null);
  const [focusInventoryAd, setFocusInventoryAd] = useState(null);

  const goToTesting = (personaId) => { setFocusPersona(personaId); setTab("testing"); };
  const goToLearnings = (learningId) => { setFocusLearning(learningId); setTab("learnings"); };
  const goToInventory = (adId) => { setFocusInventoryAd(adId); setTab("inventory"); };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", padding: "32px 40px", maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 600, color: C.text, letterSpacing: "-0.01em", fontFamily: SERIF_FONT }}>Meta Ops Tracker</h1>
            <Badge label="D2C Sales" scheme={C.indigo} />
          </div>
          <svg width="26" height="26" viewBox="0 0 66 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64.8859 7.80183C64.5073 3.69125 61.1342 0.436177 57.0401 0.217888C51.5734 -0.0726292 13.7609 -0.0726292 8.28945 0.217888C4.20008 0.436177 0.826974 3.69125 0.44675 7.80504C-1.31395 27.1108 2.13488 42.009 10.7017 52.0824C19.9139 62.9198 31.685 63.9294 32.3713 63.9791L32.6285 64L32.944 63.9856C33.3779 63.9551 42.3691 63.2504 50.8082 55.9458L51.3636 55.4546C52.523 54.405 53.6134 53.279 54.6278 52.084C63.1994 42.0202 66.6482 27.1252 64.8859 7.80183ZM4.59923 20.2234C4.46975 16.2228 4.59412 12.2179 4.97157 8.23359C5.06325 7.29804 5.50087 6.43286 6.19585 5.81315L28.7142 21.3582L17.8566 28.902L4.59923 20.2234ZM13.7845 31.7318L7.21504 36.295C6.15713 32.948 5.42732 29.5028 5.03625 26.0097L13.7845 31.7318ZM32.7579 24.1478L43.401 31.4942L32.5796 38.5212L22.009 31.6098L32.7579 24.1478ZM36.792 21.347L59.1447 5.81796C59.8347 6.43548 60.2697 7.29547 60.3627 8.22556C60.7425 12.2124 60.869 16.22 60.7413 20.2234L47.5755 28.78L36.792 21.347ZM60.2996 26.0017C59.915 29.434 59.2049 32.8204 58.1792 36.1136L51.6602 31.6194L60.2996 26.0017ZM52.6573 4.72812L32.75 18.5558L12.7133 4.72652C17.4543 4.65429 25.0587 4.61737 32.6648 4.61737C40.2708 4.61737 47.9179 4.65429 52.6573 4.72812ZM8.91264 40.7137L17.9354 34.4539L28.3656 41.2739L14.9552 49.9894C14.6807 49.6908 14.4077 49.3843 14.1379 49.0665C12.0157 46.5484 10.2563 43.7359 8.91264 40.7137ZM32.7026 59.3694H32.69C32.3382 59.3453 25.3758 58.798 18.4119 53.2204L32.5717 44.0185L46.7993 53.3279C40.113 58.6198 33.4631 59.3068 32.7026 59.3694ZM51.1963 49.0633C50.8923 49.4217 50.5858 49.7668 50.2765 50.0985L36.7857 41.2707L47.4887 34.3191L56.5005 40.5388C55.1457 43.6256 53.3591 46.4968 51.1963 49.0633Z" fill="#161A3D"/>
          </svg>
        </div>
        <StrategyDrawer />
      </div>

      <Nav active={tab} setActive={(t) => { setTab(t); setFocusPersona(null); setFocusLearning(null); }} />

      {tab === "ideas"     && <IdeasView />}
      {tab === "testing"   && <TestingView onNavigateToLearnings={goToLearnings} onGoToInventory={goToInventory} />}
      {tab === "inventory" && <InventoryView focusId={focusInventoryAd} />}
      {tab === "learnings" && <LearningsView focusId={focusLearning} onNavigateToTesting={goToTesting} />}
    </div>
  );
}
