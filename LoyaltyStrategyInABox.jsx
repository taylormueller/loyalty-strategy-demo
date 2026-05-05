import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COMPANY = {
  name: "Ridge & Roam Outfitters",
  industry: "Specialty outdoor apparel and trail gear",
  annualRevenue: "$118M",
  customerCount: "485,000 active customers",
  avgOrderValue: "$124",
  purchaseFrequency: "2.1 per year",
  fiscalYear: "2024",
  headquarters: "Boulder, Colorado",
  founded: "2013",
};

const DATA = {
  firm: {
    name: "Northstar Loyalty Advisors",
    reportDate: "May 5, 2026",
  },
  modules: [
    "Customer Diagnostic",
    "Program Design",
    "Business Case",
    "Member Journey",
    "Data & Roadmap",
  ],
  diagnostic: {
    opportunityScore: 82,
    verdict:
      "Your customer base shows strong loyalty program candidacy. Seasonal purchase cycles, repeat-buyer revenue concentration, and a large cohort of recently active trail customers indicate significant upside from structured engagement.",
    rfm: [
      { segment: "Champions", customers: 58200, revenue: 31, aov: 168, frequency: 4.8, recency: 94, color: "#7C3AED", action: "Protect with early access, repair credits, and guided trip perks" },
      { segment: "Loyal", customers: 126100, revenue: 34, aov: 136, frequency: 3.1, recency: 78, color: "#A78BFA", action: "Nudge toward higher-value kits and seasonal challenges" },
      { segment: "At-Risk", customers: 104300, revenue: 18, aov: 119, frequency: 1.7, recency: 46, color: "#F59E0B", action: "Trigger win-back offers before spring and fall gear windows" },
      { segment: "Lapsed", customers: 87300, revenue: 9, aov: 102, frequency: 0.8, recency: 24, color: "#E11D48", action: "Use replenishment reminders and new-season product stories" },
      { segment: "New", customers: 109100, revenue: 8, aov: 92, frequency: 1.1, recency: 86, color: "#10B981", action: "Convert first purchases into trail-ready onboarding journeys" },
    ],
    deciles: [
      { decile: "Top 10%", revenue: 36, cumulative: 36 },
      { decile: "10-20%", revenue: 22, cumulative: 58 },
      { decile: "20-30%", revenue: 13, cumulative: 71 },
      { decile: "30-40%", revenue: 9, cumulative: 80 },
      { decile: "40-50%", revenue: 7, cumulative: 87 },
      { decile: "50-60%", revenue: 5, cumulative: 92 },
      { decile: "60-70%", revenue: 3, cumulative: 95 },
      { decile: "70-80%", revenue: 2, cumulative: 97 },
      { decile: "80-90%", revenue: 2, cumulative: 99 },
      { decile: "90-100%", revenue: 1, cumulative: 100 },
    ],
    risk: [
      { name: "Active & engaged", value: 38, fill: "#7C3AED" },
      { name: "Active but declining", value: 21, fill: "#A78BFA" },
      { name: "At-risk of lapsing", value: 17, fill: "#F59E0B" },
      { name: "Lapsed", value: 14, fill: "#E11D48" },
      { name: "Churned", value: 10, fill: "#9F1239" },
    ],
    revenueAtRisk: "$22.7M",
    candidateSizing: { percentage: "57%", customers: "276,000", revenue: "$67.4M" },
  },
  program: {
    recommendedTypeId: "tiered",
    recommendation: {
      type: "Tiered Status Program",
      confidence: "Recommended with high confidence based on your customer profile",
      rationale: [
        "Champions and Loyal customers generate 65% of revenue, making status protection more valuable than broad discounts.",
        "A $66 AOV gap between Champions and New customers creates room for aspirational tier benefits to shape next purchases.",
        "Seasonal spring and fall peaks give Ridge & Roam natural moments to accelerate tier progress.",
        "At-risk and lapsed cohorts represent $22.7M in revenue at risk, best addressed with targeted tier-save triggers.",
      ],
    },
    types: [
      { id: "points", name: "Points-Based", description: "Simple earn-and-burn tied to purchases and seasonal events.", bestFor: "Broad repeat accessory purchases.", pros: ["Easy to explain", "Strong campaign fit"], cons: ["Can become discount-led", "Less status motivation"], fit: "Medium", enrollmentRate: "41%", activeRate: "58%", config: { earnRate: "1 point per $1", redemptionRate: "100 points = $5", expiration: "18 months after last purchase", events: ["2x points during spring trail prep", "500-point outerwear trade-in bonus"] } },
      { id: "tiered", name: "Tiered Status", description: "Status levels unlock progressively richer benefits.", bestFor: "Seasonal gear buyers with AOV upside.", pros: ["Clear climb path", "Protects high-value members"], cons: ["Needs clear messaging", "Requires benefit discipline"], fit: "High", enrollmentRate: "46%", activeRate: "64%", config: { tiers: [{ name: "Trailhead", threshold: "$0-$249", projection: "62%", benefits: ["Trail guides", "Birthday repair credit", "Early sale access"] }, { name: "Ridgeline", threshold: "$250-$699", projection: "29%", benefits: ["Free hemming", "Restock alerts", "Quarterly double points"] }, { name: "Summit", threshold: "$700+", projection: "9%", benefits: ["Expedited shipping", "Field testing invites", "$35 gear credit"] }] } },
      { id: "paid", name: "Paid Membership", description: "Annual fee unlocks premium service benefits.", bestFor: "Highly engaged enthusiasts.", pros: ["Upfront commitment", "Funds premium benefits"], cons: ["Narrows audience", "Must prove value fast"], fit: "Selective", enrollmentRate: "12%", activeRate: "72%", config: { fee: "$59 per year", benefits: ["Free two-day shipping", "$50 repair allowance", "Trail clinic access"] } },
      { id: "cashback", name: "Cashback/Credits", description: "Members earn credit for future gear purchases.", bestFor: "Price-sensitive recovery segments.", pros: ["Clear value", "Good win-back mechanic"], cons: ["Margin exposure", "Less distinctive"], fit: "Medium", enrollmentRate: "39%", activeRate: "55%", config: { creditRate: "3% back as gear credit", redemptionWindow: "120 days", events: ["$10 rain shell reactivation", "$15 accessory bundle credit"] } },
      { id: "hybrid", name: "Hybrid", description: "Combines status, points, and selective credits.", bestFor: "Balancing retention with broad participation.", pros: ["Flexible", "Segment-tunable"], cons: ["More complex", "Needs careful launch messaging"], fit: "High", enrollmentRate: "44%", activeRate: "62%", config: { structure: "Tiered status plus lightweight points", earnRate: "1 point per $1; 2x for Summit", benefits: ["Repair credits", "Early drops", "Trail event access"] } },
    ],
    benchmarks: [
      { company: "REI Co-op", type: "Paid co-op membership", earn: "Member rewards + services", differentiator: "Lifetime community credibility", members: "24M+", delta: "Borrow community benefits without paid gate" },
      { company: "Backcountry", type: "Points and cash rewards", earn: "Up to 10% back in campaigns", differentiator: "High-promo earn moments", members: "2M+ est.", delta: "Use seasonal accelerators with tighter economics" },
      { company: "Cotopaxi", type: "Mission-led membership", earn: "Access and impact perks", differentiator: "Social impact connection", members: "600K+ est.", delta: "Lean into trail stewardship and repair benefits" },
      { company: "Fjallraven", type: "Community loyalty", earn: "Experience-led engagement", differentiator: "Outdoor education/events", members: "750K+ est.", delta: "Make local hikes a Summit signature" },
    ],
    names: [
      { name: "Ridgeline Rewards", rationale: "Signals progress, elevation, and a clear path from first hike to high-value member." },
      { name: "Trailmark Club", rationale: "Connects purchases to real outdoor moments." },
      { name: "Base Camp Collective", rationale: "Creates a community frame for events, repairs, and experiences." },
    ],
  },
  businessCase: {
    baseInputs: { eligibleCustomers: 276000, activeCustomers: 485000, aov: 124, purchaseFrequency: 2.1, annualRevenueAtRisk: 22700000, rewardRate: 0.045 },
    scenarios: {
      Conservative: { enrollmentRate: 36, engagementRate: 52, aovLift: 5, frequencyLift: 0.28, churnReduction: 8, redemptionRate: 42, operatingCost: 9, technologyCost: 420000 },
      "Base Case": { enrollmentRate: 46, engagementRate: 64, aovLift: 8, frequencyLift: 0.46, churnReduction: 13, redemptionRate: 48, operatingCost: 11, technologyCost: 520000 },
      Optimistic: { enrollmentRate: 58, engagementRate: 72, aovLift: 12, frequencyLift: 0.64, churnReduction: 19, redemptionRate: 54, operatingCost: 13, technologyCost: 640000 },
    },
    ltv: [
      { segment: "High Value", nonMember: 1180 },
      { segment: "Mid Value", nonMember: 690 },
      { segment: "At-Risk", nonMember: 360 },
    ],
  },
  journey: {
    funnel: [
      { name: "Eligible", value: 276000, conversion: "100%" },
      { name: "Awareness", value: 231800, conversion: "84%" },
      { name: "Enrolled", value: 126900, conversion: "55%" },
      { name: "First Redemption", value: 55800, conversion: "44%" },
      { name: "Engaged", value: 81200, conversion: "64%" },
      { name: "Advocates", value: 14600, conversion: "18%" },
    ],
    lifecycle: [
      { moment: "Enrollment", condition: "Joins program", channels: ["Email", "App"], message: "Welcome series", response: "41%" },
      { moment: "First purchase", condition: "First member order", channels: ["Email", "In-store"], message: "Celebrate + earning education", response: "36%" },
      { moment: "Points milestone", condition: "Within 150 points", channels: ["Push", "App"], message: "Tier progress notification", response: "29%" },
      { moment: "Tier upgrade", condition: "Spend threshold crossed", channels: ["Email", "Push"], message: "Status celebration", response: "44%" },
      { moment: "60 days quiet", condition: "No purchase in 60 days", channels: ["Email", "SMS"], message: "Re-engagement offer", response: "18%" },
      { moment: "Near demotion", condition: "45 days to reset", channels: ["Email", "App"], message: "Urgency/save message", response: "24%" },
      { moment: "Birthday", condition: "Member milestone", channels: ["Email", "SMS"], message: "Bonus points event", response: "33%" },
      { moment: "Lapse", condition: "180+ days quiet", channels: ["Email", "Direct mail"], message: "Win-back campaign", response: "12%" },
      { moment: "Advocacy", condition: "3 purchases + high NPS", channels: ["App", "Email"], message: "Referral invitation", response: "16%" },
    ],
    liability: [
      { month: 0, liability: 0, redemption: 0 },
      { month: 6, liability: 420000, redemption: 120000 },
      { month: 12, liability: 980000, redemption: 410000 },
      { month: 18, liability: 1450000, redemption: 760000 },
      { month: 24, liability: 1780000, redemption: 1120000 },
      { month: 30, liability: 1910000, redemption: 1480000 },
      { month: 36, liability: 1840000, redemption: 1720000 },
    ],
    matrix: [
      { segment: "Champions", Email: 42, Push: 31, SMS: 18, "In-store": 36, App: 39, Mail: 12 },
      { segment: "Loyal", Email: 36, Push: 27, SMS: 16, "In-store": 29, App: 32, Mail: 10 },
      { segment: "At-Risk", Email: 24, Push: 15, SMS: 21, "In-store": 18, App: 14, Mail: 13 },
      { segment: "New", Email: 31, Push: 22, SMS: 14, "In-store": 24, App: 28, Mail: 7 },
    ],
  },
  dataRequirements: {
    title: "Data Requirements to Replicate This Analysis",
    subtitle:
      "To build this loyalty program strategy for Ridge & Roam Outfitters, here is exactly what we would need from your team — and where it typically lives in your organization.",
    opening:
      "This application was built on realistic modeled data. To run this analysis on your actual customer base, we would work with your team to extract and structure the following data. Most mid-market companies have 80-90% of what's needed already — the question is whether it's accessible and clean.",
    sections: [
      {
        title: "Section 1 — Customer Diagnostic Data",
        powers: "RFM segmentation, revenue concentration, churn analysis, program candidate sizing.",
        rows: [
          ["Transaction history", "Customer-level purchase records, 24+ months", "POS / ERP / eComm platform", "CSV / SQL export", "🟢 Usually available"],
          ["Customer master record", "Unique ID, contact info, opt-in/out status", "CRM / loyalty system", "CSV / API", "🟢 Usually available"],
          ["Product/SKU detail", "Item-level detail per transaction", "POS / ERP", "CSV / SQL", "🟡 Often needs cleaning"],
          ["Promotional history", "Discount codes, campaign IDs applied to transactions", "ERP / marketing platform", "CSV", "🟡 Often siloed"],
          ["Customer service interactions", "Support tickets, complaint records", "CRM / helpdesk", "CSV / API", "🟡 Often siloed"],
        ],
      },
      {
        title: "Section 2 — Program Design Inputs",
        powers: "Program type recommendation, tier thresholds, earn/burn calibration, competitive benchmarking.",
        rows: [
          ["Product margin data", "Gross margin % by SKU or category", "ERP / finance system", "CSV", "🟡 Often restricted"],
          ["Existing program data", "If any current rewards/punch card program exists", "Internal / manual", "CSV / spreadsheet", "🟢 If program exists"],
          ["Competitive intelligence", "Known competitor program structures", "Public research / Nielsen", "Manual / report", "🔴 Rarely structured"],
          ["Customer preferences", "Declared interests, communication preferences", "CRM / survey tool", "CSV", "🟡 Often incomplete"],
        ],
      },
      {
        title: "Section 3 — Business Case Modeling Inputs",
        powers: "Program P&L, LTV projections, break-even analysis, scenario modeling.",
        rows: [
          ["Revenue by customer cohort", "Annual revenue segmented by customer vintage", "ERP / BI tool", "CSV / dashboard export", "🟡 Needs BI support"],
          ["Churn / lapse rates", "Historical customer retention by segment", "CRM / analytics", "CSV / SQL", "🟡 Often needs definition"],
          ["Average order value by segment", "AOV split across customer tiers", "POS / eComm", "CSV / SQL", "🟢 Usually available"],
          ["Current marketing spend", "Channel-level spend data", "Finance / marketing ops", "Spreadsheet", "🟢 Usually available"],
          ["Customer acquisition cost", "CAC by channel", "Finance / marketing", "Spreadsheet", "🟡 Often estimated"],
        ],
      },
      {
        title: "Section 4 — Journey & Engagement Architecture",
        powers: "Lifecycle trigger map, channel orchestration, enrollment funnel, re-engagement flows.",
        rows: [
          ["Email engagement data", "Open rates, click rates by campaign type", "ESP (Klaviyo, Salesforce, etc.)", "CSV / API", "🟢 Usually available"],
          ["App / digital behavior", "Session data, feature usage, push opt-in rates", "Mobile analytics / CDP", "API / CSV", "🟡 Varies by maturity"],
          ["In-store visit frequency", "Visit cadence by customer", "POS / loyalty card data", "CSV / SQL", "🟡 Needs ID matching"],
          ["SMS opt-in list", "Customers opted into text communications", "CRM / ESP", "CSV", "🟡 Often incomplete"],
          ["NPS / satisfaction scores", "Survey results tied to customer IDs", "Survey tool / CRM", "CSV", "🔴 Rarely at customer level"],
        ],
      },
      {
        title: "Section 5 — Technology & Implementation Readiness",
        powers: "Platform recommendation, implementation roadmap, team/governance design.",
        rows: [
          ["Current tech stack inventory", "List of active marketing/CRM/POS systems", "IT / marketing ops", "Manual", "🟢 Usually available"],
          ["API documentation", "Whether existing systems have open APIs", "IT", "Technical docs", "🟡 Varies by vendor"],
          ["Data warehouse / CDP status", "Whether a central data layer exists", "IT / data team", "Technical assessment", "🔴 Often absent in mid-market"],
          ["IT resource availability", "Internal bandwidth for integration work", "IT leadership", "Conversation", "N/A"],
          ["Budget envelope (technology)", "Rough budget for platform investment", "Finance / CFO", "Conversation", "N/A"],
        ],
      },
    ],
    summary: [
      ["Data Elements Assessed", "22"],
      ["Typically Available Day 1", "🟢 10 (45%)"],
      ["Require Extraction/Prep", "🟡 9 (41%)"],
      ["Require New Collection", "🔴 3 (14%)"],
    ],
    callout:
      "Most mid-market companies can begin a loyalty diagnostic within 2-4 weeks of engagement start. The primary effort is data extraction and normalization — not new data collection. Our team manages this process end-to-end.",
  },
  roadmap: {
    requirements: [
      { tier: "Tier 1", title: "Required", items: [{ name: "Transaction history", source: "POS + ecommerce", format: "Warehouse table", availability: "Green" }, { name: "Customer identity data", source: "CRM/CDP", format: "Customer master", availability: "Green" }, { name: "Channel interaction data", source: "ESP/app/POS", format: "Event export", availability: "Amber" }, { name: "Promotional history", source: "Commerce/OMS", format: "Order discounts", availability: "Amber" }] },
      { tier: "Tier 2", title: "Strongly Recommended", items: [{ name: "Demographics/preferences", source: "CRM", format: "Profile attributes", availability: "Amber" }, { name: "NPS/satisfaction", source: "Survey tool", format: "Survey export", availability: "Amber" }, { name: "Catalog/margin by SKU", source: "ERP/PIM", format: "SKU master", availability: "Green" }, { name: "Competitor intelligence", source: "Manual research", format: "Benchmark worksheet", availability: "Red" }] },
      { tier: "Tier 3", title: "Optional", items: [{ name: "Service history", source: "Helpdesk", format: "Ticket export", availability: "Amber" }, { name: "Social/UGC signals", source: "Social listening", format: "Engagement export", availability: "Red" }, { name: "Geographic visit data", source: "Events/location", format: "Geo events", availability: "Amber" }, { name: "Partner data", source: "Partner systems", format: "Partner files", availability: "Red" }] },
    ],
    platforms: [
      { name: "Antavo", bestFor: "Flexible tiered loyalty", time: "16-24 weeks", cost: "$180K-$320K/year", fit: "High", recommended: true },
      { name: "Talon.One", bestFor: "Offer experimentation", time: "12-20 weeks", cost: "$150K-$280K/year", fit: "High" },
      { name: "Yotpo Loyalty", bestFor: "Commerce-led points", time: "8-14 weeks", cost: "$60K-$160K/year", fit: "Medium" },
      { name: "Annex Cloud", bestFor: "Advocacy/referrals", time: "14-22 weeks", cost: "$120K-$240K/year", fit: "Medium" },
      { name: "Salesforce Loyalty", bestFor: "Enterprise CRM-native ops", time: "24-36 weeks", cost: "$300K+/year", fit: "Low" },
    ],
    phases: [
      { name: "Foundation", months: "Months 1-3", width: "17%", offset: "0%", deliverables: ["Data audit", "Platform selection", "Program design", "Legal/T&C"] },
      { name: "Build", months: "Months 3-6", width: "20%", offset: "13%", deliverables: ["Implementation", "Data integration", "Journeys", "Staff training"] },
      { name: "Launch", months: "Months 6-9", width: "20%", offset: "33%", deliverables: ["Enrollment campaign", "Comms live", "Monitoring", "Iteration"] },
      { name: "Optimize", months: "Months 9-18", width: "50%", offset: "50%", deliverables: ["A/B testing", "Threshold refinement", "Segmentation", "ROI measurement"] },
    ],
    governance: [
      { role: "Program Owner", owner: "Internal", fte: "0.8 FTE" },
      { role: "Data Analyst", owner: "Internal", fte: "0.5 FTE" },
      { role: "CRM/Email Manager", owner: "Internal + agency", fte: "0.7 FTE" },
      { role: "Technology Lead", owner: "Partner build / internal run", fte: "0.4 FTE" },
      { role: "Finance Controller", owner: "Internal", fte: "0.2 FTE" },
    ],
  },
};

function calculateModel(assumptions) {
  const base = DATA.businessCase.baseInputs;
  const enrolledMembers = base.eligibleCustomers * (assumptions.enrollmentRate / 100);
  const activeMembers = enrolledMembers * (assumptions.engagementRate / 100);
  const baselineRevenue = activeMembers * base.aov * base.purchaseFrequency;
  const frequencyRevenue = activeMembers * base.aov * assumptions.frequencyLift;
  const aovRevenue = baselineRevenue * (assumptions.aovLift / 100);
  const churnRevenue = base.annualRevenueAtRisk * (assumptions.churnReduction / 100);
  const totalRevenue = frequencyRevenue + aovRevenue + churnRevenue;
  const redemptionCost = totalRevenue * base.rewardRate * (assumptions.redemptionRate / 100);
  const operatingCost = enrolledMembers * assumptions.operatingCost;
  const technologyCost = assumptions.technologyCost;
  const totalCosts = redemptionCost + operatingCost + technologyCost;
  const netValue = totalRevenue - totalCosts;
  const roi = totalCosts ? (netValue / totalCosts) * 100 : 0;
  const paybackMonths = Math.min(36, Math.ceil(totalCosts / Math.max(1, netValue / 12)));
  return {
    enrolledMembers,
    activeMembers,
    frequencyRevenue,
    aovRevenue,
    churnRevenue,
    totalRevenue,
    redemptionCost,
    operatingCost,
    technologyCost,
    totalCosts,
    netValue,
    roi,
    paybackMonths,
    threeYearNetValue: netValue * 2.72,
    membersYear3: enrolledMembers * 1.22,
  };
}

const currency = (value, digits = 1) =>
  Math.abs(value) >= 1000000 ? `$${(value / 1000000).toFixed(digits)}M` : `$${Math.round(value / 1000)}K`;
const number = (value) => Math.round(value).toLocaleString();
const label = "text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#9A9A9A]";
const card = "rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sm:p-6";
const sectionTitle = "text-2xl font-extrabold tracking-[-0.01em] text-[#1A1A1A] sm:text-3xl";

export default function LoyaltyStrategyInABox() {
  const [activeTab, setActiveTab] = useState(DATA.modules[0]);
  const [selectedProgramType, setSelectedProgramType] = useState(DATA.program.recommendedTypeId);
  const [activeScenario, setActiveScenario] = useState("Base Case");
  const [sliderValues, setSliderValues] = useState(DATA.businessCase.scenarios["Base Case"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  const model = useMemo(() => calculateModel(sliderValues), [sliderValues]);
  const selectedProgram = DATA.program.types.find((type) => type.id === selectedProgramType);

  const setScenario = (scenario) => {
    setActiveScenario(scenario);
    setSliderValues(DATA.businessCase.scenarios[scenario]);
  };

  const setSlider = (key, value) => setSliderValues((current) => ({ ...current, [key]: Number(value) }));

  return (
    <main className="min-h-screen bg-white px-4 py-4 font-['Inter'] text-[#1A1A1A] sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <style>{`@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");`}</style>
      <section className="mx-auto max-w-[1440px]">
        <nav className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] px-4 pt-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:px-6 sm:pt-5">
          <div className="flex flex-col gap-4 pb-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div>
              <p className={label}>Demo Workspace</p>
              <h1 className="mt-1 text-3xl font-black tracking-[-0.02em] sm:text-4xl lg:text-5xl">Loyalty Strategy in a Box</h1>
              <p className="mt-2 text-sm font-semibold text-[#4B4B4B]">{COMPANY.name}</p>
              <p className="mt-2 max-w-2xl text-sm font-medium text-[#4B4B4B]">A practical strategy workspace that helps your team see where loyalty can grow customer value, what to build, and what it takes to launch with confidence.</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:gap-3">
              <button className="rounded-2xl px-5 py-3 text-sm font-extrabold text-[#7C3AED] transition hover:bg-[#F3F0FF] sm:w-auto" onClick={() => setIsDataModalOpen(true)} type="button">
                Data Requirements
              </button>
              <button className="rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#A78BFA] sm:w-auto" onClick={() => setIsModalOpen(true)} type="button">
                Generate Business Case
              </button>
            </div>
          </div>
          <div className="flex gap-5 overflow-x-auto border-t border-[#E8E6E1] sm:gap-8">
            {DATA.modules.map((module) => (
              <button
                className={`relative min-h-14 whitespace-nowrap text-sm font-bold transition ${activeTab === module ? "text-[#7C3AED] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#7C3AED]" : "text-[#9A9A9A] hover:text-[#A78BFA]"}`}
                key={module}
                onClick={() => setActiveTab(module)}
                type="button"
              >
                {module}
              </button>
            ))}
          </div>
        </nav>

        <section className="pt-6 sm:pt-8">
          {activeTab === "Customer Diagnostic" && <CustomerDiagnostic />}
          {activeTab === "Program Design" && <ProgramDesign selectedProgram={selectedProgram} selectedProgramType={selectedProgramType} setSelectedProgramType={setSelectedProgramType} />}
          {activeTab === "Business Case" && <BusinessCase activeScenario={activeScenario} model={model} setScenario={setScenario} setSlider={setSlider} sliderValues={sliderValues} />}
          {activeTab === "Member Journey" && <MemberJourney />}
          {activeTab === "Data & Roadmap" && <DataRoadmap />}
        </section>
      </section>

      {isModalOpen && <BusinessCaseModal model={model} onClose={() => setIsModalOpen(false)} sliderValues={sliderValues} />}
      {isDataModalOpen && <DataRequirementsModal onClose={() => setIsDataModalOpen(false)} />}
    </main>
  );
}

function ModuleHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="mb-7 max-w-4xl">
      <p className={label}>{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-[#4B4B4B] sm:text-lg">{subtitle}</p>
    </header>
  );
}

function CustomerDiagnostic() {
  const top20 = DATA.diagnostic.deciles[1].cumulative;
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 1" subtitle="Program candidacy, translated: where loyalty can create real incremental lift." title="Customer Diagnostic" />
      <section className={`${card} grid grid-cols-1 items-center gap-6 bg-gradient-to-r from-[#F3F0FF] to-white lg:grid-cols-[0.6fr_1fr] lg:gap-8`}>
        <div>
          <p className={label}>Loyalty Opportunity Score</p>
          <p className="mt-2 text-6xl font-extrabold sm:text-8xl">{DATA.diagnostic.opportunityScore}<span className="text-xl text-[#9A9A9A] sm:text-2xl">/100</span></p>
          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#EDE9FE]"><div className="h-full rounded-full bg-[#7C3AED]" style={{ width: `${DATA.diagnostic.opportunityScore}%` }} /></div>
        </div>
        <p className="text-lg leading-snug text-[#4B4B4B] sm:text-2xl">{DATA.diagnostic.verdict}</p>
      </section>
      <section className={card}>
        <Header labelText="1B. Model-Attributed RFM Segmentation" title="Where loyalty value is concentrated — and where to focus first" />
        <ChartBox>
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid stroke="#F0EEF8" />
              <XAxis dataKey="frequency" name="Purchase Frequency" stroke="#9A9A9A" type="number" unit="x" />
              <YAxis dataKey="aov" name="AOV" stroke="#9A9A9A" type="number" unit="$" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              {DATA.diagnostic.rfm.map((point) => (
                <Scatter data={[point]} fill={point.color} key={point.segment} name={`${point.segment}: ${number(point.customers)}`} shape={(props) => <circle cx={props.cx} cy={props.cy} fill={point.color} opacity="0.82" r={10 + point.recency / 5} />} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </ChartBox>
        <Table headers={["Segment", "Customers", "% Revenue", "AOV", "Frequency", "Recommended Action"]} rows={DATA.diagnostic.rfm.map((s) => [s.segment, number(s.customers), `${s.revenue}%`, `$${s.aov}`, `${s.frequency}x`, s.action])} />
      </section>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className={card}>
          <Header labelText="1C. Revenue Concentration" title="Top customers create the economic case" />
          <ChartBox>
            <ResponsiveContainer>
              <ComposedChart data={DATA.diagnostic.deciles}>
                <CartesianGrid stroke="#F0EEF8" />
                <XAxis dataKey="decile" stroke="#9A9A9A" />
                <YAxis stroke="#9A9A9A" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#DDD8F5" radius={[8, 8, 0, 0]} />
                <Line dataKey="cumulative" stroke="#7C3AED" strokeWidth={3} />
                <ReferenceLine label="Top 20% = 58%" stroke="#7C3AED" strokeDasharray="4 4" x="10-20%" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <p className="mt-4 rounded-2xl bg-[#F3F0FF] p-4 font-bold text-[#5B21B6]">Retention economics are concentrated: the top 20% generate {top20}% of revenue. The action: protect this cohort before funding broad-based rewards.</p>
        </section>
        <section className={card}>
          <Header labelText="1D. Lapse Risk Distribution" title="Revenue at risk — the avoidable leakage pool" />
          <ChartBox>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={DATA.diagnostic.risk} dataKey="value" innerRadius={70} outerRadius={112} label>
                  {DATA.diagnostic.risk.map((entry) => <Cell fill={entry.fill} key={entry.name} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>
          <Kpi labelText="Estimated annual revenue at risk" value={DATA.diagnostic.revenueAtRisk} />
        </section>
      </div>
      <section className={`${card} bg-gradient-to-r from-[#F3F0FF] to-white`}>
        <p className={label}>1E. Loyalty Program Candidate Sizing</p>
        <p className="mt-3 text-xl leading-snug text-[#4B4B4B] sm:text-3xl">Based on this analysis, <strong className="text-[#7C3AED]">{DATA.diagnostic.candidateSizing.percentage}</strong> of your active customer base - approximately <strong className="text-[#7C3AED]">{DATA.diagnostic.candidateSizing.customers}</strong> customers - represent <strong className="text-[#7C3AED]">{DATA.diagnostic.candidateSizing.revenue}</strong> in addressable annual revenue.</p>
      </section>
    </div>
  );
}

function ProgramDesign({ selectedProgram, selectedProgramType, setSelectedProgramType }) {
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 2" subtitle="Engagement architecture, translated: the program design most likely to change behavior." title="Program Design" />
      <section className={`${card} grid grid-cols-1 gap-6 bg-gradient-to-r from-[#F3F0FF] to-white lg:grid-cols-[0.8fr_1.2fr] lg:gap-8`}>
        <div><p className={label}>2A. Recommended Engagement Architecture</p><h3 className="mt-2 text-3xl font-extrabold sm:text-4xl">{DATA.program.recommendation.type}</h3><p className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-800">{DATA.program.recommendation.confidence}</p></div>
        <ul className="list-disc space-y-2 pl-5 text-[#4B4B4B]">{DATA.program.recommendation.rationale.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className={card}>
        <Header labelText="2B. Efficiency Frontier: Program Type Selector" title="Compare alternatives without losing the recommendation" />
        <div className="grid grid-flow-col auto-cols-[220px] gap-4 overflow-x-auto lg:grid-flow-row lg:grid-cols-5">
          {DATA.program.types.map((type) => (
            <button className={`min-w-[220px] rounded-2xl border p-4 text-left transition ${selectedProgramType === type.id ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#E8E6E1] bg-white hover:border-[#A78BFA]"}`} key={type.id} onClick={() => setSelectedProgramType(type.id)} type="button">
              <span className="rounded-full bg-[#EDE9FE] px-2 py-1 text-xs font-extrabold text-[#5B21B6]">{type.fit} fit</span>
              <strong className="mt-4 block text-xl">{type.name}</strong>
              <p className="mt-2 text-sm text-[#4B4B4B]">{type.description}</p>
              <p className="mt-3 text-xs font-bold text-[#1A1A1A]">Best for: {type.bestFor}</p>
              <div className="mt-4 grid gap-2 text-xs text-[#4B4B4B]"><p><b>Pros:</b> {type.pros.join(", ")}</p><p><b>Cons:</b> {type.cons.join(", ")}</p></div>
            </button>
          ))}
        </div>
      </section>
      <section className={card}>
        <Header labelText="2C. Operating Model Configuration" title={`${selectedProgram.name} mechanics — the rules clients and store teams can actually use`} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {selectedProgram.config.tiers ? selectedProgram.config.tiers.map((tier) => <ConfigCard key={tier.name} title={tier.name} value={tier.threshold} lines={[`${tier.projection} projected distribution`, ...tier.benefits]} />) : Object.entries(selectedProgram.config).map(([key, value]) => <ConfigCard key={key} title={key} value={Array.isArray(value) ? value.join(", ") : value} />)}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"><Kpi labelText="Projected enrollment rate" value={selectedProgram.enrollmentRate} /><Kpi labelText="Expected active member rate" value={selectedProgram.activeRate} /></div>
      </section>
      <section className={card}><Header labelText="2D. Competitive Benchmark Panel" title="How peers are playing loyalty — and where not to over-copy them" /><Table headers={["Company", "Type", "Earn Rate", "Differentiator", "Members", "Delta"]} rows={DATA.program.benchmarks.map((b) => [b.company, b.type, b.earn, b.differentiator, b.members, b.delta])} /></section>
      <section className={card}><Header labelText="2E. Program Naming & Identity Suggestion" title="Brand-right names to explore" /><div className="grid grid-cols-1 gap-4 md:grid-cols-3">{DATA.program.names.map((n) => <div className="rounded-2xl bg-[#F7F6F3] p-5" key={n.name}><strong className="text-xl text-[#7C3AED]">{n.name}</strong><p className="mt-2 text-sm text-[#4B4B4B]">{n.rationale}</p></div>)}</div></section>
    </div>
  );
}

function BusinessCase({ activeScenario, model, setScenario, setSlider, sliderValues }) {
  const breakEvenData = useMemo(() => makeBreakEvenData(model), [model]);
  const ltvData = useMemo(() => DATA.businessCase.ltv.map((item) => ({ ...item, member: Math.round(item.nonMember * (1 + sliderValues.aovLift / 100 + sliderValues.frequencyLift / 4.8)) })), [sliderValues]);
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 3" subtitle="Retention economics, translated: how the program pays back and where the risk sits." title="Business Case" />
      <section className={card}>
        <Header labelText="3A. Scenario Selector" title="Choose the financial posture — conservative, base, or upside case" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{Object.keys(DATA.businessCase.scenarios).map((scenario) => <button className={`rounded-2xl border p-4 text-left ${activeScenario === scenario ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#E8E6E1]"}`} key={scenario} onClick={() => setScenario(scenario)} type="button"><strong>{scenario}</strong><p className="mt-1 text-sm text-[#9A9A9A]">{DATA.businessCase.scenarios[scenario].enrollmentRate}% enrollment</p></button>)}</div>
      </section>
      <section className={card}>
        <Header labelText="3B. Sensitivity Controls" title="Model inputs — the levers the CFO will care about" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{assumptionTiles(sliderValues).map((item) => <Kpi key={item.labelText} {...item} />)}</div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">{[["enrollmentRate", "Enrollment Rate", 25, 65], ["churnReduction", "Churn Reduction", 3, 25], ["aovLift", "AOV Lift", 1, 18], ["redemptionRate", "Redemption Rate", 25, 70]].map(([key, name, min, max]) => <Slider key={key} labelText={name} max={max} min={min} onChange={(value) => setSlider(key, value)} value={sliderValues[key]} />)}</div>
      </section>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]"><Pnl model={model} /><Scorecard model={model} /></div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className={card}><Header labelText="3D. Model-Attributed LTV Impact" title="Member economics by segment — the incremental lift case" /><ChartBox><ResponsiveContainer><BarChart data={ltvData}><CartesianGrid stroke="#F0EEF8" /><XAxis dataKey="segment" /><YAxis /><Tooltip /><Legend /><Bar dataKey="nonMember" fill="#DDD8F5" name="Non-member" radius={[8, 8, 0, 0]} /><Bar dataKey="member" fill="#7C3AED" name="Member" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></ChartBox></section>
        <section className={card}><Header labelText="3E. Break-Even Analysis" title="Cumulative value curve — when the investment clears the hurdle" /><ChartBox><ResponsiveContainer><LineChart data={breakEvenData}><CartesianGrid stroke="#F0EEF8" /><XAxis dataKey="month" /><YAxis tickFormatter={(v) => currency(v, 0)} /><Tooltip formatter={(v) => currency(v)} /><ReferenceArea fill="#F3F0FF" x1={model.paybackMonths} x2={36} /><ReferenceLine label={`Break-even month ${model.paybackMonths}`} stroke="#7C3AED" strokeDasharray="4 4" x={model.paybackMonths} /><Line dataKey="revenue" stroke="#7C3AED" strokeWidth={3} /><Line dataKey="cost" stroke="#A78BFA" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartBox></section>
      </div>
    </div>
  );
}

function MemberJourney() {
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 4" subtitle="Journey orchestration, translated: when to act, through which channel, and why." title="Member Journey" />
      <section className={card}>
        <Header labelText="4A. Enrollment Activation Curve" title="From eligible audience to advocates — the activation curve" />
        <ActivationCurve />
        <p className="mt-4 rounded-2xl bg-[#F3F0FF] p-4 font-bold text-[#5B21B6]">Biggest drop-off risk: awareness to enrollment. The action: make store prompts and post-purchase flows unavoidable at launch.</p>
      </section>
      <section className={card}><Header labelText="4B. Lifecycle Trigger Map" title="Engagement architecture — the next best action at each moment" /><div className="flex gap-4 overflow-x-auto">{DATA.journey.lifecycle.map((m, i) => <div className="min-w-[220px] rounded-2xl border border-[#E8E6E1] bg-white p-4" key={m.moment}><span className="grid h-9 w-9 place-items-center rounded-full bg-[#7C3AED] text-sm font-extrabold text-white">{i + 1}</span><h4 className="mt-3 font-extrabold">{m.moment}</h4><p className="mt-2 text-sm text-[#4B4B4B]">{m.condition}</p><p className="mt-3 text-xs font-bold text-[#7C3AED]">{m.channels.join(" / ")}</p><p className="mt-2 text-sm font-bold">{m.message}</p><p className="mt-1 text-sm text-[#9A9A9A]">{m.response} response</p></div>)}</div></section>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className={card}><Header labelText="4C. Redemption Liability Projection" title="Reward balance under control — accounting exposure stays bounded" /><ChartBox><ResponsiveContainer><LineChart data={DATA.journey.liability}><CartesianGrid stroke="#F0EEF8" /><XAxis dataKey="month" /><YAxis tickFormatter={(v) => currency(v, 1)} /><Tooltip formatter={(v) => currency(v)} /><Line dataKey="liability" stroke="#7C3AED" strokeWidth={3} /><Line dataKey="redemption" stroke="#A78BFA" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartBox><p className="mt-4 rounded-2xl bg-[#F3F0FF] p-4 font-bold text-[#5B21B6]">Peak redemption liability of $1.91M is expected at month 30. The implication: the rewards balance is material, but not a balance-sheet surprise.</p></section>
        <section className={card}><Header labelText="4D. Channel Efficiency Frontier" title="Where to invest in channels — not every touchpoint deserves equal funding" /><div className="overflow-x-auto"><div className="grid min-w-[680px] grid-cols-7 gap-2 text-sm"><span />{["Email", "Push", "SMS", "In-store", "App", "Mail"].map((c) => <b className="text-xs text-[#9A9A9A]" key={c}>{c}</b>)}{DATA.journey.matrix.map((row) => <React.Fragment key={row.segment}><b>{row.segment}</b>{["Email", "Push", "SMS", "In-store", "App", "Mail"].map((c) => <span className={`rounded-xl p-3 text-center font-extrabold ${row[c] > 30 ? "bg-[#7C3AED] text-white" : row[c] > 20 ? "bg-[#A78BFA] text-white" : "bg-[#F3F0FF] text-[#4B4B4B]"}`} key={c}>{row[c]}%</span>)}</React.Fragment>)}</div></div></section>
      </div>
    </div>
  );
}

function ActivationCurve() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
      <ChartBox>
        <ResponsiveContainer>
          <BarChart data={DATA.journey.funnel} layout="vertical" margin={{ top: 8, right: 34, bottom: 8, left: 34 }}>
            <CartesianGrid horizontal={false} stroke="#F0EEF8" />
            <XAxis tickFormatter={(value) => `${Math.round(value / 1000)}K`} type="number" />
            <YAxis dataKey="name" tick={{ fill: "#4B4B4B", fontSize: 12, fontWeight: 700 }} type="category" width={116} />
            <Tooltip formatter={(value) => number(value)} />
            <Bar dataKey="value" fill="#7C3AED" name="Projected customers" radius={[0, 10, 10, 0]}>
              {DATA.journey.funnel.map((stage, index) => (
                <Cell fill={index < 2 ? "#7C3AED" : index < 4 ? "#A78BFA" : "#C4B5FD"} key={stage.name} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
      <div className="grid gap-2">
        {DATA.journey.funnel.map((stage, index) => (
          <div className={`rounded-2xl border p-3 ${index === 1 ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#E8E6E1] bg-[#F7F6F3]"}`} key={stage.name}>
            <div className="flex items-center justify-between gap-3">
              <b className="text-sm">{stage.name}</b>
              <span className="text-xs font-extrabold text-[#7C3AED]">{stage.conversion}</span>
            </div>
            <p className="mt-1 text-sm text-[#4B4B4B]">{number(stage.value)} projected customers</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataRoadmap() {
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 5" subtitle="Implementation readiness, translated: what must be true to make the model real." title="Data & Roadmap" />
      <section className={card}><Header labelText="5A. Data Readiness Requirements" title="The minimum viable data spine — what we need before strategy becomes executable" /><div className="grid grid-cols-1 gap-4 lg:grid-cols-3">{DATA.roadmap.requirements.map((tier) => <div className="rounded-2xl bg-[#F7F6F3] p-5" key={tier.tier}><p className={label}>{tier.tier}</p><h4 className="mt-2 text-xl font-extrabold">{tier.title}</h4><div className="mt-4 space-y-3">{tier.items.map((item) => <div className="rounded-xl bg-white p-3" key={item.name}><b>{item.name}</b><p className="text-xs text-[#4B4B4B]">{item.source} | {item.format}</p><span className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-extrabold ${item.availability === "Green" ? "bg-emerald-50 text-emerald-800" : item.availability === "Amber" ? "bg-amber-50 text-amber-800" : "bg-rose-50 text-rose-800"}`}>{item.availability}</span></div>)}</div></div>)}</div></section>
      <section className={card}><Header labelText="5B. Technology Stack Recommendation" title="Platform fit — the fastest path without overbuying enterprise complexity" /><div className="grid grid-flow-col auto-cols-[220px] gap-4 overflow-x-auto lg:grid-flow-row lg:grid-cols-5">{DATA.roadmap.platforms.map((p) => <div className={`rounded-2xl border p-4 ${p.recommended ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#E8E6E1] bg-white"}`} key={p.name}><span className="rounded-full bg-[#EDE9FE] px-2 py-1 text-xs font-extrabold text-[#5B21B6]">{p.recommended ? "Best Fit" : `${p.fit} fit`}</span><h4 className="mt-4 text-xl font-extrabold">{p.name}</h4><p className="mt-2 text-sm text-[#4B4B4B]">{p.bestFor}</p><p className="mt-4 text-sm font-bold">{p.time}</p><p className="text-sm text-[#4B4B4B]">{p.cost}</p></div>)}</div></section>
      <section className={card}><Header labelText="5C. Implementation Roadmap" title="Execution path — from diagnostic to in-market learning loop" /><div className="space-y-4">{DATA.roadmap.phases.map((phase) => <div className="grid grid-cols-1 gap-4 rounded-2xl bg-[#F7F6F3] p-4 lg:grid-cols-[160px_1fr_320px] lg:items-center lg:gap-5" key={phase.name}><div><b>{phase.name}</b><p className="text-sm text-[#4B4B4B]">{phase.months}</p></div><div className="relative h-5 rounded-full bg-white"><span className="absolute top-1 h-3 rounded-full bg-[#7C3AED]" style={{ left: phase.offset, width: phase.width }} /></div><ul className="list-disc pl-5 text-sm text-[#4B4B4B]">{phase.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></div>)}</div></section>
      <section className={card}><Header labelText="5D. Team & Governance" title="Operating model — who owns the economics after launch" /><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">{DATA.roadmap.governance.map((g) => <div className="rounded-2xl bg-[#F7F6F3] p-5" key={g.role}><h4 className="font-extrabold">{g.role}</h4><p className="mt-3 text-sm text-[#4B4B4B]">{g.owner}</p><p className="mt-2 text-xl font-extrabold text-[#7C3AED]">{g.fte}</p></div>)}</div></section>
    </div>
  );
}

function DataRequirementsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-[#E8E6E1] bg-white/95 px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div>
          <b>{COMPANY.name}</b>
          <p className={label}>Data Readiness Diligence | For Discussion Purposes Only</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:gap-3">
          <button className="rounded-2xl border border-[#7C3AED] px-4 py-2 font-extrabold text-[#7C3AED] hover:bg-[#F3F0FF]" onClick={() => window.print()} type="button">
            Download Data Checklist
          </button>
          <button className="rounded-2xl bg-[#7C3AED] px-4 py-2 font-extrabold text-white hover:bg-[#A78BFA]" onClick={onClose} type="button">
            Close
          </button>
        </div>
      </div>
      <article className="mx-auto max-w-[1180px] space-y-8 px-4 py-8 sm:space-y-10 sm:px-8 sm:py-12">
        <header className="border-b border-[#E8E6E1] pb-10">
          <p className={label}>Replication Requirements</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-none tracking-[-0.02em] sm:text-5xl">{DATA.dataRequirements.title}</h2>
          <p className="mt-5 max-w-4xl text-lg font-semibold leading-7 text-[#4B4B4B]">
            {DATA.dataRequirements.subtitle.replace("Ridge & Roam Outfitters", COMPANY.name)}
          </p>
          <p className="mt-6 max-w-4xl rounded-2xl bg-[#F7F6F3] p-5 text-base leading-7 text-[#4B4B4B]">{DATA.dataRequirements.opening}</p>
        </header>

        {DATA.dataRequirements.sections.map((section) => (
          <section className="border-b border-[#E8E6E1] pb-10" key={section.title}>
            <p className={label}>What it powers: {section.powers}</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-3xl">{section.title}</h3>
            <DataRequirementsTable rows={section.rows} />
          </section>
        ))}

        <section className="space-y-5 pb-4">
          <div>
            <p className={label}>Readiness Assessment Summary</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-3xl">The work is mostly extraction, not invention</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {DATA.dataRequirements.summary.map(([name, value]) => (
              <Kpi key={name} labelText={name} value={value} />
            ))}
          </div>
          <div className="rounded-2xl bg-[#F3F0FF] p-6 text-lg font-bold leading-8 text-[#5B21B6]">
            <span className="block text-sm uppercase tracking-widest text-[#7C3AED]">Partner readout</span>
            {DATA.dataRequirements.callout}
          </div>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button className="rounded-2xl border border-[#7C3AED] px-5 py-3 font-extrabold text-[#7C3AED] hover:bg-[#F3F0FF]" onClick={() => window.print()} type="button">
              Download Data Checklist
            </button>
            <button className="rounded-2xl bg-[#7C3AED] px-5 py-3 font-extrabold text-white hover:bg-[#A78BFA]" onClick={onClose} type="button">
              Close
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}

function DataRequirementsTable({ rows }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[980px] text-left text-sm">
        <thead>
          <tr>
            {["Data Element", "Description", "Source System", "Typical Format", "Availability"].map((header) => (
              <th className="border-b border-[#E8E6E1] px-3 py-3 text-xs uppercase tracking-widest text-[#9A9A9A]" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td className={`border-b border-[#F0EEE9] px-3 py-4 align-top ${index === 0 ? "font-extrabold text-[#1A1A1A]" : "text-[#4B4B4B]"}`} key={`${cell}-${index}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BusinessCaseModal({ model, onClose }) {
  const tierOne = DATA.roadmap.requirements[0].items;
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-[#E8E6E1] bg-white/95 px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div><b>{COMPANY.name}</b><p className={label}>For Discussion Purposes Only</p></div>
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:gap-3"><button className="rounded-2xl border border-[#7C3AED] px-4 py-2 font-extrabold text-[#7C3AED]" onClick={() => window.print()} type="button">Download as PDF</button><button className="rounded-2xl px-4 py-2 font-extrabold text-[#7C3AED] hover:bg-[#F3F0FF]" onClick={onClose} type="button">Close</button></div>
      </div>
      <article className="mx-auto max-w-[1120px] space-y-8 px-4 py-8 sm:space-y-10 sm:px-8 sm:py-12">
        <header className="border-b border-[#E8E6E1] pb-10"><p className={label}>Consulting Deliverable</p><h2 className="mt-3 max-w-3xl text-4xl font-black leading-none tracking-[-0.02em] sm:text-6xl">Loyalty Program Business Case</h2><p className="mt-5 font-bold text-[#4B4B4B]">{COMPANY.name} | Prepared by {DATA.firm.name} | {DATA.firm.reportDate}</p></header>
        <ReportSection title="Executive Summary"><p>{COMPANY.name} shows strong program candidacy: revenue is concentrated, lapse risk is measurable, and the customer file has enough behavioral signal to support a structured engagement architecture. The brand does not need a generic rewards layer; it needs a targeted system for protecting the best customers and moving the next cohort up. We recommend a tiered status program. The current model attributes {currency(model.netValue)} in annual net value, {Math.round(model.roi)}% ROI, and payback by month {model.paybackMonths}.</p></ReportSection>
        <ReportSection title="The Opportunity"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><Kpi labelText="Revenue Concentration" value="58%" /><Kpi labelText="Churn Risk" value={DATA.diagnostic.revenueAtRisk} /><Kpi labelText="Candidates" value={DATA.diagnostic.candidateSizing.customers} /><Kpi labelText="Addressable Revenue" value={DATA.diagnostic.candidateSizing.revenue} /></div></ReportSection>
        <ReportSection title="Our Recommendation"><p className="text-2xl font-extrabold text-[#7C3AED]">{DATA.program.recommendation.type}</p><p className="mt-2 font-bold text-[#4B4B4B]">The strategic logic: use status to shift behavior, not discounts to buy transactions.</p><ul className="mt-4 list-disc space-y-2 pl-5">{DATA.program.recommendation.rationale.slice(0, 3).map((r) => <li key={r}>{r}</li>)}</ul></ReportSection>
        <ReportSection title="Financial Model - Base Case"><Pnl model={model} compact /><Scorecard model={model} /></ReportSection>
        <ReportSection title="What We Need From You"><div className="space-y-3">{tierOne.map((item) => <label className="flex gap-3 rounded-2xl bg-[#F7F6F3] p-4" key={item.name}><input checked readOnly type="checkbox" /><span><b>{item.name}</b><br /><span className="text-sm text-[#4B4B4B]">{item.source} | {item.format}</span></span></label>)}</div></ReportSection>
        <ReportSection title="Recommended Next Steps"><ol className="grid grid-cols-1 gap-4 md:grid-cols-3"><NextStep numberText="1" text="Data readiness assessment" time="2 weeks" /><NextStep numberText="2" text="Platform RFP and vendor selection" time="4-6 weeks" /><NextStep numberText="3" text="Pilot program design and launch" time="3 months" /></ol></ReportSection>
      </article>
    </div>
  );
}

function Header({ labelText, title }) {
  return <div className="mb-5"><p className={label}>{labelText}</p><h3 className={`${sectionTitle} mt-1`}>{title}</h3></div>;
}

function ChartBox({ children }) {
  return <div className="h-[280px] rounded-2xl bg-[#F7F6F3] p-3 sm:h-[330px] sm:p-4">{children}</div>;
}

function Table({ headers, rows }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead><tr>{headers.map((h) => <th className="border-b border-[#E8E6E1] px-3 py-3 text-xs uppercase tracking-widest text-[#9A9A9A]" key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.join("|")}>{row.map((cell, i) => <td className={`border-b border-[#F0EEE9] px-3 py-4 ${i === 0 ? "font-extrabold text-[#1A1A1A]" : "text-[#4B4B4B]"}`} key={`${cell}-${i}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Kpi({ labelText, value }) {
  return <div className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-4 sm:p-5"><p className={label}>{labelText}</p><strong className="mt-2 block text-3xl font-extrabold text-[#7C3AED] sm:text-4xl">{value}</strong></div>;
}

function ConfigCard({ title, value, lines = [] }) {
  return <article className="rounded-2xl bg-[#F7F6F3] p-5"><p className={label}>{title}</p><h4 className="mt-2 text-2xl font-extrabold">{value}</h4>{lines.length > 0 && <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[#4B4B4B]">{lines.map((line) => <li key={line}>{line}</li>)}</ul>}</article>;
}

function Slider({ labelText, value, min, max, onChange }) {
  return <label className="rounded-2xl bg-[#F7F6F3] p-4 sm:p-5"><span className="flex justify-between gap-3 text-xs font-extrabold uppercase tracking-widest text-[#9A9A9A]">{labelText}<b className="text-[#7C3AED]">{value}%</b></span><input className="mt-4 w-full accent-[#7C3AED]" max={max} min={min} onChange={(e) => onChange(e.target.value)} type="range" value={value} /></label>;
}

function assumptionTiles(a) {
  return [
    { labelText: "Program Enrollment Rate", value: `${a.enrollmentRate}%` },
    { labelText: "Active Engagement Rate", value: `${a.engagementRate}%` },
    { labelText: "AOV Lift", value: `+${a.aovLift}%` },
    { labelText: "Frequency Lift", value: `+${a.frequencyLift}` },
    { labelText: "Churn Reduction", value: `-${a.churnReduction}%` },
    { labelText: "Redemption Rate", value: `${a.redemptionRate}%` },
    { labelText: "Operating Cost", value: `$${a.operatingCost}` },
    { labelText: "Technology Cost", value: currency(a.technologyCost, 2) },
  ];
}

function Pnl({ model, compact = false }) {
  const rows = [["REVENUE IMPACT", ""], ["+ Incremental lift from frequency", currency(model.frequencyRevenue)], ["+ Incremental lift from AOV", currency(model.aovRevenue)], ["+ Retention economics from churn reduction", currency(model.churnRevenue)], ["= Total Revenue Impact", currency(model.totalRevenue)], ["PROGRAM COSTS", ""], ["- Redemption liability", currency(model.redemptionCost)], ["- Operating costs", currency(model.operatingCost)], ["- Technology costs", currency(model.technologyCost, 2)], ["= Total Program Costs", currency(model.totalCosts)]];
  return <section className={compact ? "" : card}><Header labelText="3C. Program P&L" title="Annual value creation — the CFO view, without the spreadsheet fog" /><div className="divide-y divide-[#E8E6E1] border-y border-[#E8E6E1]">{rows.map(([name, val]) => <div className={`grid grid-cols-[1fr_auto] gap-3 py-3 ${val ? "text-[#4B4B4B]" : "text-xs font-extrabold uppercase tracking-widest text-[#9A9A9A]"}`} key={name}><span>{name}</span>{val && <b className="text-right text-[#1A1A1A]">{val}</b>}</div>)}</div><div className="mt-5 rounded-2xl bg-[#F3F0FF] p-5"><p className={label}>Net Program Value</p><strong className="mt-2 block text-4xl font-extrabold text-[#7C3AED] sm:text-6xl">{currency(model.netValue)}</strong></div><div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"><Kpi labelText="Program ROI" value={`${Math.round(model.roi)}%`} /><Kpi labelText="Payback Period" value={`${model.paybackMonths} mo`} /></div></section>;
}

function Scorecard({ model }) {
  return <section className={card}><Header labelText="3F. 3-Year Summary Scorecard" title="Board-ready outcome — the headline case in four numbers" /><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><Kpi labelText="Total 3-Year Net Value" value={currency(model.threeYearNetValue)} /><Kpi labelText="ROI" value={`${Math.round(model.roi)}%`} /><Kpi labelText="Break-even" value={`Month ${model.paybackMonths}`} /><Kpi labelText="Members at Year 3" value={number(model.membersYear3)} /></div></section>;
}

function makeBreakEvenData(model) {
  const monthlyRevenue = model.totalRevenue / 12;
  const monthlyRunCost = (model.redemptionCost + model.operatingCost) / 12;
  return Array.from({ length: 37 }, (_, month) => ({ month, revenue: monthlyRevenue * month, cost: model.technologyCost + monthlyRunCost * month }));
}

function ReportSection({ title, children }) {
  return <section className="border-b border-[#E8E6E1] pb-8 sm:pb-10"><h3 className="text-2xl font-black tracking-[-0.02em] sm:text-3xl">{title}</h3><div className="mt-5 text-base leading-7 text-[#4B4B4B]">{children}</div></section>;
}

function NextStep({ numberText, text, time }) {
  return <li className="list-none rounded-2xl border border-[#E8E6E1] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#7C3AED] font-extrabold text-white">{numberText}</span><b className="mt-4 block">{text}</b><span className="mt-2 block text-sm font-extrabold text-[#7C3AED]">{time}</span></li>;
}
